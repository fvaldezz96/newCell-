
import './Card.css'
// React utilities
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Styles
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { remove } from '../../components/Toast/Toast';
import { Card, CardBody, CardTitle,  Button } from 'react-bootstrap';
const DbShopCard = ({ id, model, stock, price, image, deleteItem, updateQuantity, quantity }) => {
  const [qua, setQua] = useState(quantity);

  const plus = () => {
    if (qua < stock) {
      setQua(qua + 1)
      updateQuantity(id, quantity + 1)
    }
  }
  const minus = () => {
    if (qua > 1) {
      setQua(qua - 1)
      updateQuantity(id, quantity - 1)
    }
  }

  const delet = (id) => {
    remove();
    deleteItem(id);
  }

  return (
    <>
      <Card className="mb-3 shadow-sm px-5 mb-5 bg-white rounded">
        <Link className="card-link" to={`/detail/${id}`}>
          <div style={{ objectFit: 'cover', height: '20rem' }}>
            <img src={image} alt={model} className="img-fluid rounded" style={{ height: '100%', width: '100%' }} />
          </div>
        </Link>
        <CardBody className="d-flex flex-column align-items-center">
          <CardTitle>{model}</CardTitle>
          <div className="d-flex">
            <AddCircleIcon onClick={() => plus(id, quantity + 1)} />
            <span>{quantity}</span>
            <RemoveCircleIcon onClick={() => minus(id, quantity - 1)} />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <span className='cursor-pointer'>Precio unitario: ${price.toFixed(2)}</span>
            <span className='cursor-pointer'>Precio total: ${parseFloat(price * quantity).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            {/* <Button variant="primary">Comprar</Button> */}
            <Button variant="danger" onClick={() => delet(id)}>Eliminar</Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default DbShopCard