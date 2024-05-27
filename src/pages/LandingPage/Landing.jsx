
// import React, { useState, useEffect } from 'react';
// import { Carousel } from 'react-bootstrap';
// import '../CarouselPage/LandingPage.css'
// import items from '../CarouselPage/JsonData';
// import items1 from './data'
// import items2 from './data.1'
// import items3 from './data.2'
import React, { useState } from 'react';
import './Landing.css'; // Optional for custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselComponent from '../../components/CarouselPage/CarouselComponent';

// const dataJson1 = items1
// const dataJson2 = items2
// const dataJson3 = items3
// const dataJson = items
const Landing = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        // Implement your search logic here (e.g., redirect to search results page)
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
                        <a href="#" className="btn btn-primary">Comprar ahora</a>
                    </div>
                </section>

                <section className="products">
                    <div className="container">
                        <h2>Productos destacados</h2>
                        {/* Placeholder for product listings (you'll need to fetch and display your products here) */}
                        <div className="product-card">
                            <CarouselComponent />
                            <h3>Nombre del producto</h3>
                            <p>Descripción breve del producto</p>
                            <a href="#" className="btn btn-secondary">Ver detalles</a>
                        </div>
                        {/* ... more product cards */}
                    </div>
                </section>

                <section className="categories">
                    <div className="container">
                        <h2>Explora por categorías</h2>
                        <CarouselComponent />
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 Tu Ecommerce</p>
                </div>
            </footer>
        </div>
    );
}

export default Landing
