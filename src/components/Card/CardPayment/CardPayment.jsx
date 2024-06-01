import './CardPayment.css'
import React from 'react'


export default function CardHover({ name, image, price, quantity }) {
	return (
		<div className="wrapper">
			<div className="cards">
				<figure>
					<div className='imgCard'>
						<img src={`${image}`} alt='imagen' />
					</div>
					<div className='capCard01'>
						<figcaption>{name}</figcaption>
					</div>
					<div className='capCard01'>
						<figcaption>Price {price ? `$ ${price}` : null}</figcaption>
					</div>
					<div className='capCard01'>
						<figcaption>Qty {quantity}</figcaption>
					</div>
				</figure>
			</div>
		</div>
	)
}