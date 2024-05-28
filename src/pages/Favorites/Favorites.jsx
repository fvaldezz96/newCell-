import React, { useState, useEffect } from "react";
import './Favorites.css';
import FavCard from "./FavCard";
import { Toaster } from "react-hot-toast";
import NothingFound from "../../components/NothingFound/NothingFound";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavs = JSON.parse(localStorage.getItem('favList'));
        if (storedFavs) {
            setFavorites(storedFavs);
        }
    }, []); // Empty dependency array to fetch data only once on component mount

    const deleteFav = (id) => {
        let arr = favorites.filter(e => e.id !== id);
        localStorage.setItem('favList', JSON.stringify(arr));
        setFavorites(arr);
    };

    // Helper function to create grid rows (adjust grid classes for responsiveness)
    const createGridRows = (favorites) => {
        const rows = [];
        for (let i = 0; i < favorites.length; i += 3) { // Adjust the increment (e.g., +4 for 4 columns)
            const row = favorites.slice(i, i + 3); // Get a slice of 3 elements for each row
            rows.push(
                <div className="row" key={i}>
                    {row.map((favorite) => (
                        <div className="col-md-4" key={favorite.id}>
                            <FavCard
                                {...favorite} // Spread all properties using ... operator
                                deleteFav={deleteFav}
                            />
                        </div>
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="containerHome">
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
                <NothingFound />
            ) : (
                <div className="favoriteCards d-flex flex-wrap justify-content-between">
                    {createGridRows(favorites)}
                </div>
            )}
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}
