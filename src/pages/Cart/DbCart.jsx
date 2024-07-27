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
import { createSelector } from "reselect";

const DbCart = ({ user }) => {

    const selectCartItems = state => state.cart;

    const selectTotalPrice = createSelector(
        selectCartItems,
        (cartItems) => {
            return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
        }
    );
    // const [totalPrice, setTotalPrice] = useState(0);
    const cart = useSelector(state => state.cart);
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch()

    // const dataResultCart = () => {
    //     const data = localStorage.setItem("carrrito", JSON.stringify(cart));
    //     return data;
    // }

    // const setPrice = () => {
    //     let total = 0
    //     cart.forEach(e => { total += e.price * (e.quantity ? e.quantity : 1) })
    //     localStorage.setItem("totalPrice", total)
    //     setTotalPrice(total.toFixed(2))
    // }
    const totalPrice = useSelector(selectTotalPrice);
    useEffect(() => {
        // setPrice()
        if (user) {
            dispatch(getUserCart(user.email))
        }
        // dataResultCart()
    }, [dispatch])

    const updateQuantity = (id, quantity) => {
        let found = cart.find(e => e.id === id)
        found.quantity = quantity
        dispatch(changeQuantity(id, quantity))
        // setPrice()
    }

    const deleteItem = async (id) => {
        dispatch(deleteFromCart(user.email, id))
        dispatch(getUserCart(user.email))
        // setPrice()
    }

    // console.log(isLoading, 'isLoanding data!');
    // console.log(cart, 'cart.length front');
    if (isLoading || !cart) { return (<Loading />) }
    // console.log(cart.length, 'cart.length front');
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