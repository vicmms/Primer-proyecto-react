import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Global from '../Global'
import Sidebar from './Sidebar'
import SimpleReactValidator from 'simple-react-validator'
import swal from 'sweetalert'
import defaultImg from '../assets/images/defaultImg.png';
//Validacion de forms y alertas

// obtener id de articulo a editaar por url
// crear metodo para sacar el objeto del backend
// rellenar form esos datos 
// actualizar el objeto con peticion al backend

class EditArticle extends Component {

    url = Global.url;
    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Campo requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })
        this.validator.showMessages();
        this.forceUpdate();//forzar actualizacion de form
    }

    saveArticle = (e) => {
        e.preventDefault();
        this.changeState();//rellenar state con form

        if (this.validator.allValid()) {
            // peticion http post para guardar el articulo
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        })

                        swal(
                            'Articulo creado',
                            'El articulo se ha creado correctamente',
                            'success'
                        )

                        //subir la imagen
                        if (this.state.selectedFile !== null) {
                            // sacar id de articulo y guardarlo 
                            var articleId = this.state.article._id;
                            // crear form data y aniadir fichero
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            )
                            // peticion ajax
                            axios.post(this.url + 'uploadImage/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        })
                                        console.log(res.data)
                                    }
                                })
                        } else {
                            this.setState({
                                status: 'success'
                            })
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })

        } else {
            this.setState({
                status: 'failed'
            })
            this.validator.showMessages();
            this.forceUpdate();//forzar actualizacion de form
        }



    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {
        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulo</h1>
                    {this.state.article.title &&
                        <form className="md-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} defaultValue={article.title} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" ref={this.contentRef} onChange={this.changeState} defaultValue={article.content}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {
                                        article.image !== null ? (
                                            <img src={this.url + 'getImage/' + article.image} alt={article.title} className="thumb" />
                                        ) : (
                                            <img src={defaultImg} alt="Default" className="thumb" />
                                        )
                                    }
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }
                </section>
                <Sidebar />
            </div>
        )
    }
}

export default EditArticle;