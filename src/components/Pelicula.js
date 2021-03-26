import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Pelicula extends Component {
    render() {
        const { titulo, image } = this.props.pelicula;

        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo} />
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                </span>
                <Link to="/blog">Leer mas</Link>
                <button onClick={this.marcar}>
                    Marcar como favorita
                </button>
                <div className="clearfix"></div>
            </article>
        )
    }

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula)
    }
}

export default Pelicula;