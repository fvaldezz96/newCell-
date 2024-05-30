import React, { useState } from 'react';
import './Landing.css'; // Optional for custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselComponent from '../../components/CarouselPage/CarouselComponent';
// import { Col, Row } from 'react-bootstrap';
const Landing = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="landing-page">
            <header className="header">
                <div className="container">
                    <h1 className="logo">Tu Ecommerce</h1>
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {/* <button type="submit">
                            <SlMagnifyingGlass />
                        </button> */}
                    </form>
                </div>
            </header>
            <main className="main">
                <section className="hero">
                    <div className="container">
                        <h2 className="hero-title">Encuentra todo lo que necesitas</h2>
                        <p className="hero-description">
                            Explora nuestra amplia gama de productos y descubre ofertas increíbles.
                        </p>
                        <a href="img buy" className="btn btn-primary">Comprar ahora</a>
                    </div>
                </section>
                <section>
                    <div className="product-card">
                        <CarouselComponent />
                        <div>
                            <h2>Productos destacados</h2>
                            <h3>Nombre del producto</h3>
                            <p>Descripción breve del producto</p>
                            <a href="img detail product" className="btn btn-secondary">Ver detalles</a>
                        </div>
                    </div>
                </section>

                <section className="categories">
                    <div className="container">
                        <h2>Explora por categorías</h2>
                        <CarouselComponent />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Landing
