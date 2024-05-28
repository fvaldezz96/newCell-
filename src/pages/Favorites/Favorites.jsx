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
    }, []);

    const deleteFav = (id) => {
        let arr = favorites.filter(e => e.id !== id);
        localStorage.setItem('favList', JSON.stringify(arr));
        setFavorites(arr);
    };

    const createGridRows = (favorites) => {
        const rows = [];
        for (let i = 0; i < favorites.length; i += 3) {
            const row = favorites.slice(i, i + 3);
            rows.push(
                <div className="row d-flex justify-content-center" key={i}>
                    {row.map((favorite) => (
                        <div className="col-md-3" key={favorite.id}>
                            <FavCard
                                {...favorite}
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
                <div className="d-flex flex-wrap justify-content-between">
                    {createGridRows(favorites)}
                </div>
            )}
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}
