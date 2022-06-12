import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {

	ProductCard.propTypes = {
		productProp: PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			image: PropTypes.string.isRequired
		})
	}

	const { _id, name, description, price, image } = productProp;

	return(
				<Card className="m-2" style={{height: "38rem"}}>
				<Card.Img className="w-100" variant="top" src={image} />

				<Card.Body>
					<Card.Title className="bg-light text-dark" style={{fontWeight: 'bold'}}> { name } </Card.Title>

					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text><span>&#8369;</span>  { price } </Card.Text>

					<Button variant="warning" className="bg-dark text-warning" style={{fontWeight: 'bold'}} as={ Link } to={`/products/findproduct/${_id}`}>See More</Button>
				</Card.Body>
			</Card>
		)
}


















