//import './Card.css'
import { Link, useNavigate } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import React from 'react'
import { cart, remove } from '../../components/Toast/Toast'
import { BsCartFill } from 'react-icons/bs';

export default function FavCard({ id, brand, line, model, price, stock, capacity, image, memoryRAM, deleteFav }) {

  const navigate = useNavigate();
  const handleDelete = (id) => {
    remove();
    deleteFav(id);
  };

  const handleAddToCart = (id, brand, line, model, price, stock, capacity, image, memoryRAM) => {
    cart(id, brand, line, model, price, stock, capacity, image, memoryRAM);
  };
  const delet = (id) => {
    remove()
    deleteFav(id)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Product Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to={`/detail/${id}`}>{model}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Brand: {brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {stock}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capacity: {capacity}GB
        </Typography>
        <Typography variant="body2" color="text.secondary">
          RAM: {memoryRAM}GB
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
        <TiDelete />
      </IconButton>
      <IconButton aria-label="add to cart" onClick={() => handleAddToCart(id, brand, line, model, price, stock, capacity, image, memoryRAM)}>
        <BsCartFill />
      </IconButton>
    </Card>
  )
}
