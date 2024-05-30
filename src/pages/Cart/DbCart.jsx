import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, getUserCart, changeQuantity } from "../../redux/actions";
import NothingFound from "../../components/NothingFound/NothingFound";
import DbShopCard from "./DbShopCard";
import Loading from "../../components/Loading/Loading";
import './Card.css'

export default function DbCart({ user }) {

    const [totalPrice, setTotalPrice] = useState(0);
    const cart = useSelector(state => state.cart);
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch()

    const setPrice = () => {
        let total = 0
        cart.forEach(e => { total += e.price * (e.quantity ? e.quantity : 1) })
        localStorage.setItem("totalPrice", total)
        setTotalPrice(total.toFixed(2))
    }

    useEffect(() => {
        localStorage.setItem("carrrito", JSON.stringify(cart))
        dispatch(getUserCart(user.email))
        setPrice()
    }, [dispatch])

    const updateQuantity = (id, quantity) => {
        let found = cart.find(e => e.id === id)
        found.quantity = quantity
        dispatch(changeQuantity(id, quantity))
        setPrice()
    }

    const deleteItem = async (id) => {
        dispatch(deleteFromCart(user.email, id))
        dispatch(getUserCart(user.email))
        setPrice()
    }

    // console.log(isLoading, 'isLoanding data!');
    // console.log(cart, 'cart.length front');
    if (isLoading || !cart) { return (<Loading />) }
    // console.log(cart.length, 'cart.length front');
    if (!cart.length) { return (<NothingFound />) }

    return (
        <div className="containerGeneralLogin">
            <div className="shoppingCart">
                <h2>Your Shopping Cart: {totalPrice}</h2>
                <div className="principalSC">
                    {cart?.map((e) => <DbShopCard
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
                <div>
                    <Link to={"/cart/paymentForm"}><button className="btn btn-success text-decoration-none">Buy now !</button></Link>
                    <Toaster position="bottom-right" reverseOrder={false} />
                </div>
            </div>
        </div>
    );
}
