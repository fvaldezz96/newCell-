import React, { useState, useEffect } from "react";
import './Favorites.css';
import FavCard from "./FavCard";
import { Toaster } from "react-hot-toast";
import NothingFound from "../../components/NothingFound/NothingFound";
// import { Margin, Padding } from "@mui/icons-material";

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
                <div className="row" key={i} >
                    {row.map((favorite) => (
                        <div key={favorite.id} className="col" >
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
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
                <NothingFound />
            ) : (
                <>
                    {createGridRows(favorites)}
                </>
            )}
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}
