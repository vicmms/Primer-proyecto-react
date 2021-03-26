import React, { Component } from 'react';
import logo from '../assets/images/logo.svg'
import { NavLink } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    {/*Logo*/}
                    <div id="logo">
                        <img src={logo} alt="logotipo" className="app-logo" />
                        <span id="brand">
                            <strong>Curso</strong> React
                    </span>
                    </div>
                    {/**Menu */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink exact to="/home" activeClassName="active">Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog" activeClassName="active">Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formulario" activeClassName="active">Formulario</NavLink>
                            </li>
                            <li>
                                <NavLink to="/peliculas" activeClassName="active">Peliculas</NavLink>
                            </li>
                            <li>
                                <NavLink to="/pruebas/Victor" activeClassName="active">Pagina 2</NavLink>
                            </li>
                        </ul>
                    </nav>
                    {/*limpiar floats*/}
                    <div className="claerfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;