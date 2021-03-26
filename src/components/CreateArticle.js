import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Global from '../Global'
import Sidebar from './Sidebar'
import SimpleReactValidator from 'simple-react-validator'
import swal from 'sweetalert'
//Validacion de forms y alertas

class CreateArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Campo requerido'
            }
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url + 'save', this.state.article)
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
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear articulo</h1>
                    <form className="md-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>

                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        )
    }
}

export default CreateArticle;