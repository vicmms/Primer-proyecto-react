import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Global from '../Global'
import Sidebar from './Sidebar'
import Moment from 'react-moment'
import 'moment/locale/es'
import defaultImg from '../assets/images/defaultImg.png';


class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            }).catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            })

    }

    deleteArticle = (id) => {

        swal({
            title: "Confirmar borrar articulo",
            text: "Borraras permanentemente el articulo seleccionado",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            })
                            swal(
                                'Articulo borrado',
                                'El articulo ha sido borrado',
                                'success'
                            )
                        })
                } else {
                    swal(
                        'Operacion cancelada',
                        'El articulo no se ha borrado',
                        'success'
                    )
                }
            });

    }

    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image != null ? (
                                        <img src={this.url + 'getImage/' + article.image} alt={article.title} />
                                    ) : (
                                        <img src={defaultImg} alt="Default" />
                                    )
                                }
                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <Link to={"/blog/editar/" + article._id} className="btn btn-warning">Editar</Link>
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            }
                                className="btn btn-danger">Eliminar</button>

                            <div className="clearfix"></div>
                        </article>
                    }
                    {!article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Verifica los datos</p>
                        </div>

                    }
                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando</h2>
                            <p>Espera...</p>
                        </div>
                    }
                </section>
                <Sidebar />
            </div>
        )
    }
}

export default Article;