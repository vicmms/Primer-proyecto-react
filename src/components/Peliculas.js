import React, { Component } from 'react';
import Pelicula from './Pelicula'
import Slider from './Slider'
import Sidebar from './Sidebar';
class Peliculas extends Component {
    state = {}
    //Antes de cargar componente
    componentWillMount() {
        this.setState({
            peliculas: [
                { titulo: "Batman v Superman", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReODSjWBwqVosDa3xL_iAyL2eehwx25784ww&usqp=CAU" },
                { titulo: "Gran torino", image: "https://assets.puzzlefactory.pl/puzzle/265/858/original.jpg" },
                { titulo: "Looper", image: "https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg" }
            ],
            nombre: "Victor Morales",
            favorita: {}
        })
    }

    //componente ya cargado
    componentDidMount() {

    }
    //componente desmontado pe al ocultarlo o cambiar de ruta
    componentWillUnmount() {

    }



    render() {
        var favorita
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={{
                    background: 'green',
                    color: 'white',
                    padding: '10px'
                }}>
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            )
        } else {
            favorita = <p>No hay pelicula favorita</p>;
        }
        return (
            <React.Fragment>
                <Slider
                    titulo="Peliculas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>Cambiar titulo</button>
                        </p>
                        {/* {this.state.favorita.titulo ?
                    <p className="favorita" style={{
                        background: 'green',
                        color: 'white',
                        padding: '10px'
                    }}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p> :
                    <p>No hay pelicula favorita</p>
                } */}
                        {favorita}
                        {/*Crear componente pelicula*/}
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div >
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>


        )
    }

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        peliculas[0].titulo = "Bataman VS Superman"
        this.setState({
            peliculas
        })
    }
    favorita = (pelicula) => {
        console.log(pelicula)
        this.setState({
            favorita: pelicula
        });
    }
}

export default Peliculas;