import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { allUser, postUser } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
import NotFound from '../../pages/NotFound/NotFound';
import './PostUser.css'

export default function CreateUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0()
    console.log(user, 'user img de front')
    const image = user.picture || ""
    // console.log("Esto es: " + isAuthenticated)
    // console.log(user)
    // console.log(image)

    const [input, setInput] = useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: "",
        image: user ? image : "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
        location: "",
        direction: "",
        rol: ""
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postUser(input))
            .then(() => {

                dispatch(allUser())
            })
            .then(() => {
                navigate("/home")
            })
    }

    return (
        isAuthenticated ? (
            <div className="container user-edit-form" sx={{ padding: "20px" }}>
                <div className="row">
                    <div className="col-md-4 col-sm-12 user-info">
                        <img src={input.image} alt="Imagen de usuario" />
                        <div>
                            <h4>{input.name}</h4>
                            <p>{input.email}</p>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12 form-section">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="location">Ubicación</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={input.location}
                                    onChange={handleChange}
                                    placeholder="Ciudad, Estado"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="direction">Dirección</label>
                                <input
                                    type="text"
                                    id="direction"
                                    name="direction"
                                    value={input.direction}
                                    onChange={handleChange}
                                    placeholder="Calle, número, colonia"
                                    className="form-control"
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={input.phone || ''} // Asigna un string vacío si 'phone' no existe en 'input'
                                    onChange={handleChange}
                                    placeholder="Ej.: 55 1234-5678"
                                    className="form-control"
                                />
                            </div> */}
                            <button type="submit" className="btn btn-primary">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        ) : <NotFound />
    )
}