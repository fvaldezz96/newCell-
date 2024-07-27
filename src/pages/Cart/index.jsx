import React from 'react';
import DbCart from "./DbCart";
import LocalCart from "./LocalCart";
import Loading from "../../components/Loading/Loading"
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { user, isLoading } = useAuth0()
  const users = useSelector(state => state.allUser);

  const isRegistered = () => {
    if (!user || !users) { return false }
    return users.some(e => e.email === user.email)
  }

  if (isLoading) {
    return (<Loading />)
  }
  return (user && isRegistered()) ? <DbCart user={user} /> : <LocalCart registered={!!user} />
}

export default Cart
