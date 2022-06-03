
import { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, Form, FormControl } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "../App.css";

export default function SpecificProduct() {

	const navigate = useNavigate();

	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [subTotal, setSubTotal] = useState(0);

	useEffect(() => {

		fetch(`http://localhost:4000/products/findproduct/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setSubTotal(quantity * price)

	}, [subTotal, quantity])

	const { user } = useContext(UserContext);

	function decrementQuantity () {
		setQuantity(prevQuantity => prevQuantity - 1)
		setSubTotal(setSubTotal => quantity * price)
		if(quantity === 0) {
			setQuantity(0)
			setSubTotal(0)
		}

	}

	function incrementQuantity () {
		setQuantity(prevQuantity => prevQuantity + 1)
		setSubTotal(setSubTotal => quantity * price)
	}


	//enroll function
	const enroll = (productId) => {

		fetch('http://localhost:4000/products/users/enroll', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: 'Successfully enrolled!',
					icon: 'success',
					text: `You have successfully enrolled for this ${ name } product`
				})

				navigate('/products')
			} else {
				Swal.fire({
					title: 'error!',
					icon: 'error',
					text: 'Something went wrong, please try again'
				})
			}
		})
	}

	return(
		<Container>
			<Card>
				<Card.Header>
					<h4>{ name }</h4>
				</Card.Header>

				<Card.Body>
					<Card.Text>{ description }</Card.Text>
					<h6>Price:  <span>&#8369;</span> { price } </h6>
					<h6>
							 <Button variant="dark" onClick={decrementQuantity}> - </Button>
							 <span> {` ${quantity} `} </span>
						<Button variant="dark" onClick={incrementQuantity}> + </Button> 
					</h6>

					<h6>Subtotal: <span>&#8369;</span> {subTotal} </h6>
				</Card.Body>

				<Card.Footer>
				{ user.accessToken !== null ?
					<Button variant="dark" onClick={() => enroll(productId)}>Add to Cart</Button>
					:
					<Button variant="dark" as={ Link } to="/login">Login to Purchase</Button>
				 }
					
					
				</Card.Footer>
			</Card>
		</Container>

		)
}