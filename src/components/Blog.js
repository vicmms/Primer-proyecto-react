import React, { Component } from 'react'
import Slider from './Slider'
import Sidebar from './Sidebar';
import Articles from './Articles'
class Blog extends Component {
    state = {
        articles: {},
        status: null
    }
    render() {
        // prueba de peticion

        return (
            <div id="blog">
                <Slider
                    titulo="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* listado de articulos desde api */}

                        <Articles />

                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>

            </div>
        )
    }
}

export default Blog;