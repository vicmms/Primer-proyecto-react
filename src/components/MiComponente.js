import React, { Component } from 'react';

class MiComponente extends Component {
    render() {//metodo que se encarga de mostrar o pintar el componente
        let receta = {
            nombre: 'pizza',
            ingrediente: ['masa', 'pure', 'queso'],
            calorias: 400
        };
        return (
/*Etiqueta vacia para agrupar*/ <React.Fragment>
                <h1>{receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                {this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                }
                {
                    receta.ingrediente.map((ingrediente, i) => {
                        return (
                            <li key={i}>
                                {ingrediente}
                            </li>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}

//exoptar para usarlo en otras vistas
export default MiComponente;