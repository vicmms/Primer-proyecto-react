import React, { Component } from 'react';
import MiComponente from './MiComponente';


class SeccionPruebas extends Component {
    contador = 0;
    /*
    constructor(props) {
        super(props);
        this.state = {
            contador: 0
        }
    }
    */
    state = {
        contador: 0
    }
    render() {
        return (
            <section id="content">
                <h2 className="subheader">Ultimos articulos</h2>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <h2>Funciones y JSX basico</h2>
                {this.holaMundo('Vic', 23)}
                <h2>componentes</h2>
                <section className="componentes">
                    <MiComponente />
                </section>
                <h2>Estado componente</h2>
                <p>
                    Contador: {this.state.contador}
                </p>
                <input type="button" value="Sumar" onClick={this.sumar} />
                <input type="button" value="Restar" onClick={this.restar} />
            </section>
        )
    }

    sumar = (e) => {
        // this.contador++;
        this.setState({
            contador: (this.state.contador + 1)
        })
    }

    restar = (e) => {
        // this.contador--;
        this.setState({
            contador: (this.state.contador - 1)
        })
    }

    holaMundo(nombre, edad) {
        var presentacion = <div>
            <h2>Hola, soy {nombre} </h2>
            <h3>tengo {edad} anios</h3>
        </div>;
        return presentacion;
    }
}

export default SeccionPruebas;