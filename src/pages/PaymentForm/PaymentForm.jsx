import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CardPayment from "../../components/Card/CardPayment/CardPayment";
import "./PaymentForm.css";
import { allUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";
//MERCADO PAGO
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import NothingFound from "../../components/NothingFound/NothingFound";

const PaymentForm = () => {

  //PUBLIK KEY SELL
  const REACT_APP_MERCADO_PAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY;
  const API_URL = process.env.REACT_APP_API;
  // PUBLIK KEY SELL
  useEffect(() => {
    initMercadoPago(REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, [REACT_APP_MERCADO_PAGO_PUBLIC_KEY]);
  const dispatch = useDispatch()
  //QUANTITY PRODUCTO

  const users = useSelector(state => state.allUser);
  const items = useSelector(state => state.cart)
  const isLoading = useSelector(state => state.isLoading);
  const { user } = useAuth0()
  const [preferenceId, setPreferenceID] = useState(null)

  let total = 0
  items.map(element => {
    total += element.price * (element.quantity ? element.quantity : 1)
  });

  const title = items?.map((e) => e.line)

  const createPreference = async () => {
    try {
      const response = await axios.post(`${API_URL}/payment`, {
        title: title[0],
        quantity: items.map(e => e.quantity),
        unit_price: total,
        currency_id: "ARS",
        userIdName: theUser?.id,
        mail: user?.email,
        name: user?.name,
        arr: items
      })
      const { id } = response?.data
      return id
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    const id = await createPreference()
    if (id) {
      setPreferenceID(id)
    }
  }

  useEffect(() => {
    if (user) {
      dispatch(allUser());
    }
  }, [dispatch])

  let theUser = {}
  if (user !== undefined) {
    for (let i in users) {
      if (users[i].email === user.email) {
        theUser = users[i];
      }
    }
  }

  let history = useNavigate();
  function handleRegresar(e) {
    history("/cart");
  }

  if (!users.length || !items) { return (<Loading />) }
  if (isLoading) { return (<Loading />) }
  if (!items) { return (<NothingFound />) }
  return (
    <div className="container-absolut">
      <div className="conteiner-card">
        <div className="subcontainer01">
          <button className="btn btn-secondary" type="submit" key="index" value={'Continue Shopping'} onClick={(e) => handleRegresar(e)}>Continue Shopping</button>
          <div className="container">
            {items?.map(product => {
              return (
                <CardPayment
                  key={product.id}
                  image={product.image}
                  name={product.model}
                  price={product.price.toFixed(2)}
                  quantity={product.quantity}
                />
              )
            })}
          </div>
          <button onClick={handleBuy} className="btn btn-success">{`Total de Comprar : $${total.toFixed(2)}`}</button>
          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
      </div>
    </div>
  )
}


export default PaymentForm