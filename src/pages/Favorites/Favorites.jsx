import React, { useState, useEffect } from "react";
import './Favorites.css';
import FavCard from "./FavCard";
import { Toaster } from "react-hot-toast";
import NothingFound from "../../components/NothingFound/NothingFound";

const Favorites = () => {
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
                <div className="row gap-3" key={i} >
                    {row.map((favorite) => (
                        <div key={favorite.id} className="col d-flex align-items-center justify-content-center" >
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

    const rowStyle = {
        display: 'grid',
        gap: '20px',
        gridRowGap: '40px',
    };
    return (
        <div className="container" style={{ ...rowStyle, padding: '20px' }}>
            <h1>Favoritos</h1>
            <div>
                {favorites.length === 0 ? (
                    <NothingFound />
                ) : (
                    <>
                        {createGridRows(favorites)}
                    </>
                )}
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}

export default Favorites
