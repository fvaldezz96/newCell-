import React from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CardPayment from "../../components/Card/CardPayment/CardPayment";
import "./PaymentForm.css";
import { allUser, getUserCart } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";

export default function PaymentForm() {

  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)
  const users = useSelector(state => state.allUser);
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
  const items = JSON.parse(localStorage.getItem("carrrito"))
  const { user } = useAuth0()
  console.log(user, "data user!")

  useEffect(() => {
    if (user) {
      dispatch(getUserCart(user.email))
      dispatch(allUser());
    }
  }, [user, dispatch])

  let theUser = {}
  if (user !== undefined) {
    for (let i in users) {
      if (users[i].email === user.email) {
        theUser = users[i];
        console.log(theUser, "email the user!!")
      }
    }
  }
  //FOR DEFAULT
  let history = useNavigate();
  function handleRegresar(e) {
    history("/cart");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    console.log(paymentMethod, "payment method!!!")
    setLoading(true)
    if (!error) {
      const { id } = paymentMethod
      try {
        const data = await axios.post(`http://localhost:3001/checkout`, {
          id,
          amount: (Number(totalPrice)),
          userIdName: theUser.id,
          mail: user.email,
          arr: items,

        })
        if (data.status === 200) {
          localStorage.removeItem("totalPrice")
          localStorage.removeItem("carrrito")
          await axios.delete('/cart', { data: { userId: theUser.id } })
          alert(`You have pay $ ${totalPrice} successfully`)
        }
        setLoading(false)
        history("/")
      } catch (error) {
        setLoading(false)
      }
    }
  }
  if (!users.length || !items) {
    return (<Loading />)
  }

  return (
    <div className="conteiner-card">
      <div className="subcontainer01">
        <div className="shopping_button">
          <button className="btn btn-secondary" type="submit" value={'Continue Shopping'} onClick={(e) => handleRegresar(e)}>Continue Shopping</button>
          {/* <input type="submit" value={'Continue Shopping'} onClick={(e) => handleRegresar(e)} /> */}
        </div>
        <hr></hr>
        <div className="container">
          {items && items.length ? items.map(product => {
            return (
              <CardPayment
                key={product.id}
                image={product.image}
                name={product.model}
                price={product.price}
                quantity={product.quantity}
              />
            )
          }) : <div>has no items selected!</div>}
        </div>
      </div>
      <hr />
      <div className="rounded" style={{ width: "40rem", backgroundColor: "white" }}>
        <div className="container">
          <h2 className="h2">Datos Tarjeta</h2>
          <h4> Card Number </h4>
          <CardNumberElement className="cardNumb" />
          <h4> Date </h4>
          <CardExpiryElement className="cardExpi" />
          <h4> CVV </h4>
          <CardCvcElement className="cardCvc" />
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <button className="btn btn-success" onClick={(e) => handleSubmit(e)} disabled={loading ? true : false}>
          {loading ? <p>Loading</p> : <p>Comprar: {`$${totalPrice.toFixed(0)}.00`}</p>}
        </button>
      </div>
    </div>
  )
}