import React, { Component } from 'react'
import Sidebar from './Sidebar';

class Formulario extends Component {
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {}
    }

    render() {
        if (this.state.user.nombre) {
            var user = this.state.user;
        }
        return (
            <div id="formulario">

                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>

                        {/* datos del form  */}
                        {this.state.user.nombre &&
                            <div id="userData">
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellidos: <strong>{user.apellidos}</strong></p>
                                <p>Bio: <strong>{user.bio}</strong></p>
                                <p>Genero: <strong>{user.genero}</strong></p>
                            </div>
                        }


                        {/* listado de articulos desde api */}
                        <form action="" className="md-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" id="" ref={this.nombreRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" id="" ref={this.apellidosRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef} ></textarea>
                            </div>
                            <div className="form-group radiobuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} /> No especificado
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" name="" id="" />
                        </form>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>

            </div>
        )
    }

    recibirFormulario = (e) => {
        e.preventDefault();//evita recargar la pagina al enviar form
        var genero = '';
        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value;
        } else {
            if (this.generoMujerRef.current.checked) {
                genero = this.generoMujerRef.current.value;
            } else {
                genero = this.generoOtroRef.current.value;
            }
        }
        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero,

        }
        this.setState({
            user: user
        })

    }
}

export default Formulario;