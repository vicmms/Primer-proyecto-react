import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Global from '../Global'
import defaultImg from '../assets/images/defaultImg.png';
import Moment from 'react-moment';
import 'moment/locale/es'

class Article extends Component {
    url = Global.url;
    state = {
        articles: [],
        status: null
    }

    getArticles = () => {
        axios.get(this.url + 'articles')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log(this.state)
            })
    }

    getLastArticles = () => {
        axios.get(this.url + 'articles/last')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log(this.state)
            })
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + 'search/' + searched)
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                })


            }).catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            })
    }

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;
        if (home === "true") {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search);
        } else {
            this.getArticles();
        }
    }

    render() {
        if (this.state.articles.length >= 1) {
            var listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item" id="article-template" key={article._id}>
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url + 'getImage/' + article.image} alt={article.title} />
                                ) : (
                                    <img src={defaultImg} alt="Default" />
                                )
                            }

                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow locale="es">{article.date}</Moment>
                        </span>
                        <Link to={'blog/articulo/' + article._id}>Leer mas</Link>
                        <div className="clearfix"></div>
                    </article>
                );
            })
            return (
                <div id="articles">
                    {listArticles}
                </div>
            )
        } else {
            if (this.state.articles.length === 0 && this.state.status === 'success') {
                return (
                    <div id="articles">
                        <h2 className="subheader">No hay articulos para mostrar</h2>
                        <p>Todavia no hay contenido en esta seccion</p>
                    </div>
                )
            } else {
                return (
                    <div id="articles">
                        <h2 className="subheader">Cargando...</h2>
                        <p>Espere mientras carga el contenido</p>
                    </div>
                )
            }
        }

    }
}

export default Article;