
import './Card.css'
// React utilities
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Styles
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { remove } from '../../components/Toast/Toast';
import { Card } from 'react-bootstrap';

export default function ShopCard({ id, model, stock, price, image, deleteItem, updateQuantity, quantity }) {
  const [qua, setQua] = useState(quantity);

  const plus = () => {
    if (qua < stock) {
      const cartList = JSON.parse(localStorage.getItem('cartList'))
      let found = cartList.find(e => e.id === id)
      found.quantity += 1
      localStorage.setItem('cartList', JSON.stringify(cartList))
      setQua(qua + 1)
      updateQuantity()
    }
  }
  const minus = () => {
    if (qua > 1) {
      const cartList = JSON.parse(localStorage.getItem('cartList'))
      let found = cartList.find(e => e.id === id)
      found.quantity -= 1
      localStorage.setItem('cartList', JSON.stringify(cartList))
      setQua(qua - 1)
      updateQuantity()
    }
  }

  const delet = (id) => {
    remove();
    deleteItem(id);
  }

  return (
    <Card style={{ width: "16rem", boxShadow: "0px 0px 12px -6px" }}>
      {/* IMG */}
      <div className='container-image'>
        <Link to={"/detail/" + id}>
          <img src={image} alt={model} />
        </Link>
      </div>
      {/* BODY */}
      <div className='containerBodySC'>
        <h5>{model}</h5>
        <p><span className='priceSC'>${(price).toFixed(2)}</span></p>
        <p><span className='priceSC'>${(qua * price).toFixed(2)}</span> ({qua} Unidades)</p>
        <div className='containerButtonsSC'>
          <div className='selectQuantity'>
            <AddCircleIcon onClick={plus} />
            <p>{qua}</p>
            <RemoveCircleIcon onClick={minus} />
          </div>
          <div>
            <DeleteIcon onClick={() => delet(id)} />
          </div>
        </div>
      </div>
    </Card>
  )
}
