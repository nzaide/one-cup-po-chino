
import { useState, useContext, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams, Link, useNavigate } from 'react-router-dom';
//useParams() contains any values we are trying to pass in the URL stored
//useParams is how we receive the productId passed via the URL

export default function SpecificProduct() {

	const navigate = useNavigate();

	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);


	useEffect(() => {

		fetch(`http://localhost:4000/products/findproduct/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

	}, [])

	const { user } = useContext(UserContext);


	//enroll function
	const enroll = (productId) => {

		fetch('http://localhost:4000/products/users/enroll', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				productId: productId
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
					<h6>Price: Php { price } </h6>
				</Card.Body>

				<Card.Footer>
				{ user.accessToken !== null ?
					<Button variant="dark" onClick={() => enroll(productId)}>Buy Now</Button>
					:
					<Button variant="dark" as={ Link } to="/login">Login to Purchase</Button>
				 }
					
					
				</Card.Footer>
			</Card>
		</Container>

		)
}