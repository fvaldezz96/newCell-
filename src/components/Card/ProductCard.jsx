import React from 'react';
import { BsCartFill, BsStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from 'react-router-dom'
import './Card.css'
import { fav, cart } from '../Toast/Toast'
import { Col, Row } from 'react-bootstrap';
import { FcLike } from 'react-icons/fc';

export default function ProductCard({ id, brand, line, model, price, stock, capacity, image, memoryRAM }) {
  return (
    <Card>
      {/* CARD BODY */}
      <Card.Body>
        {/* TITLE  */}
        <Row>
          <div className='container-image'>
            <Link to={"/detail/" + id}>
              <img className='img-card-component' src={image} alt="" />
            </Link>
          </div>
          <Col>
            <div className='container-title-buttom'>
              <div>
                {/* TITLE */}
                <Link to={"/detail/" + id} className="linkStyle">
                  <Card.Title className=''>{model}</Card.Title>
                </Link>
              </div>
              {/* BUTTONS */}
              <div className='containerButton'>
                <FcLike className='button-like' onClick={() => fav(id, brand, line, model, price, stock, capacity, image, memoryRAM)} />
                <BsCartFill className='button-add-shop' onClick={() => cart(id, brand, line, model, price, stock, capacity, image, memoryRAM)} />
              </div>
            </div>
            {/* INFO */}
            <ListGroup variant="flush">
              <ListGroup.Item>Line: {line}</ListGroup.Item>
              <ListGroup.Item>RAM {memoryRAM}GB</ListGroup.Item>
              <ListGroup.Item>Memory {capacity}GB</ListGroup.Item>
              <ListGroup.Item>Stock: {stock}</ListGroup.Item>
              <ListGroup.Item>${price.toFixed(2)}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}