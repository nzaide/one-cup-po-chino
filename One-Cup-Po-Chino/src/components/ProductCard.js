import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {

	ProductCard.propTypes = {
		productProp: PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired
		})
	}

	const { _id, name, description, price } = productProp;

	return(
		<Card className="m-2">
			<Card.Body>
				<Card.Title> { name } </Card.Title>

				<Card.Subtitle>Description:</Card.Subtitle>
				<Card.Text> { description } </Card.Text>

				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text>Php  { price } </Card.Text>

				<Button variant="dark" as={ Link } to={`/products/findproduct/${_id}`}>See More</Button>

			</Card.Body>
		</Card>



		)
}


















