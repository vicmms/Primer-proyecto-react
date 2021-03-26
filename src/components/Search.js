import React, { Component } from 'react'
import Slider from './Slider'
import Sidebar from './Sidebar';
import Articles from './Articles'
class Search extends Component {
    state = {
        articles: {},
        status: null
    }
    render() {
        // prueba de peticion
        var searched = this.props.match.params.search;
        return (
            <div id="blog">
                <Slider
                    titulo={"Busqueda: " + searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* listado de articulos desde api */}

                        <Articles
                            search={searched}
                        />

                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>

            </div>
        )
    }
}

export default Search;