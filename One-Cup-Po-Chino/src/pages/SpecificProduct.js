
import { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, Form, FormControl } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GrFormPreviousLink } from "react-icons/gr";
import CartView from '../pages/CartView';

export default function SpecificProduct() {

	const navigate = useNavigate();

	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [cart, setCart] = useState([]);

	useEffect(() => {

		fetch(`http://localhost:4000/products/findproduct/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setSubTotal(quantity * price)

	}, [subTotal, quantity, cart])

	const { user } = useContext(UserContext);

	function decrementQuantity () {
		setQuantity(prevQuantity => prevQuantity - 1)
		if(quantity === 0) {
			setQuantity(0)
		}
	}

	function incrementQuantity () {
		setQuantity(prevQuantity => prevQuantity + 1)
	}

	const addToCart =  (itemId, quant, sub) => {
		if( quant === 0) {
			Swal.fire({
				title: 'Quantity cannot be zero',
				icon: 'error'
			})
		} else {
			console.log(sub)
			console.log(subTotal)
			//new data every time addToCart is invoked
			let newCartItem = {
				productId: itemId,
				name: name,
				price: price,
				quantity: quant,
				subTotal: sub
			}
			console.log(newCartItem)

			//save an empty array if nothing is stored yet
			if(localStorage.getItem('cartitems') == null){
				localStorage.setItem('cartitems', '[]')
			}

			//gets previously stored data if there's any
			let storedData = JSON.parse(localStorage.getItem('cartitems'));

			let newCartArray = [];
			let isExisting = false;

			for (let i = 0; i < storedData.length ; i++) {
				if (storedData[i].productId === itemId){
					storedData[i].quantity += quant;
					storedData[i].subTotal += subTotal;
					isExisting = true;
				}
				newCartArray.push(storedData[i])
			}

			if (isExisting === false) {
				newCartArray.push(newCartItem)
			}

			localStorage.setItem('cartitems', JSON.stringify(newCartArray));
			
			Swal.fire({
			  position: 'top-end',
			  icon: 'success',
			  title: `Successfully added ${name} to your cart!`,
			  showConfirmButton: false,
			  timer: 1500
			})
		}
		
	}



	return(
		<Container>
			<Card>
				<Card.Header>
					<h4 className="p-2"  variant="warning" style={{fontWeight: 'bold'}}>{ name }</h4>
				</Card.Header>

				<Card.Body>
					<Card.Text><h5> { description } </h5></Card.Text>
					<h4>Price:  <span>&#8369;</span>{ price } </h4>

				</Card.Body>

				<Card.Footer>
				{ user.accessToken !== null ?
					<>
					<Button variant="dark" onClick={decrementQuantity}> - </Button>
							 <span> {` ${quantity} `} </span>
					<Button variant="dark" onClick={incrementQuantity}> + </Button> 
						<h4>Subtotal: <span>&#8369;</span>{subTotal} </h4>
					<Button className="text-danger mx-2" style={{fontWeight: 'bold'}} variant="warning" as={Link} to="/products" > {<GrFormPreviousLink />} </Button>
					<Button className="bg-dark text-warning mx-1" style={{fontWeight: 'bold'}} variant="dark" onClick={() => addToCart(productId, quantity, subTotal)}> Add to Cart </Button>
					<Button className="bg-dark text-warning mx-1" style={{fontWeight: 'bold'}} variant="dark" as={ Link } to={`/mycart`}> View Cart</Button>
					</>
					:
					<Button variant="dark" as={ Link } to="/login"><h4>Login to Purchase</h4></Button>
				 }
					
					
				</Card.Footer>
			</Card>
		</Container>

		)
}