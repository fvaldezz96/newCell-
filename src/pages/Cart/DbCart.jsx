import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, getUserCart, changeQuantity } from "../../redux/actions";
import NothingFound from "../../components/NothingFound/NothingFound";
import DbShopCard from "./DbShopCard";
import Loading from "../../components/Loading/Loading";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Card.css'
import totalCompra from "../../redux/utils/selectors";

const DbCart = ({ user }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const isLoading = useSelector(state => state.isLoading);
    const resultTotalCarrito = totalCompra()
    const totalPrice = useSelector(resultTotalCarrito);

    const updateQuantity = (id, quantity) => {
        let found = cart.find(e => e.id === id)
        found.quantity = quantity
        dispatch(changeQuantity(id, quantity))
        totalCompra()
    }

    const deleteItem = async (id) => {
        dispatch(deleteFromCart(user.email, id))
        dispatch(getUserCart(user.email))
        totalCompra()
    }

    useEffect(() => {
        if (user) {
            dispatch(getUserCart(user.email))
        }
    }, [dispatch])

    if (isLoading || !cart) { return (<Loading />) }
    if (!cart.length) { return (<NothingFound />) }

    return (
        <div className="container">
            <h2 className="font-weight-bold">Monto carrito de compras: ${totalPrice.toFixed(2)}</h2>
            <div>
                <div className="principalSC">
                    {cart?.map((e) =>
                        <DbShopCard
                            key={e.id}
                            id={e.id}
                            model={e.model}
                            stock={e.stock}
                            price={e.price}
                            image={e.image}
                            deleteItem={deleteItem}
                            updateQuantity={updateQuantity}
                            quantity={e.quantity || 1}
                        />)}
                </div>
                <div className="d-flex justify-content-center align-items-end">
                    <Link to={"/cart/paymentForm"}><button className="btn btn-success text-decoration-none"><ShoppingCartIcon />Comprar: ${totalPrice.toFixed(2)}</button></Link>
                    <Toaster position="bottom-right" reverseOrder={false} />
                </div>
            </div>
        </div>
    );
}
export default DbCart