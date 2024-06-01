// React utilities
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Files
import iconSearch from './search_FILL0.png';
//Styles
import 'bootstrap/dist/css/bootstrap.css';
import './SearchBar.css';
import { Tooltip } from '@mui/material';


export default function SearchBar() {
    // Hooks
    const navigate = useNavigate();
    const [model, setModel] = useState('')
    // Save every change that occurs in the SearchBar
    function handleInputChange(e) {
        e.preventDefault();
        setModel(e.target.value);
    }
    // Send the content that is in the SearchBar
    function handleSubmit(e) {
        e.preventDefault();
        if (model) {
            navigate(`/home?model=${model}`)
        }
    }

    return (
        <div className='containerSearchBar d-flex'>
            <form className="d-flex input-group" role="search" onSubmit={(e) => { handleSubmit(e) }}>
                <Tooltip title="search" aria-label="add">
                    <button
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                        type='submit'
                    >
                        <img src={iconSearch} alt="search Icon" width="25" height="25" />
                    </button>
                </Tooltip>
                <input
                    className="form-control me-2"
                    value={model}
                    name={"model"}
                    onChange={(e) => { handleInputChange(e) }}
                    placeholder='Type your search...'
                />
            </form>
        </div>
    )
}