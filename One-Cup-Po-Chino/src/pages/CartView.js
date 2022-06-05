import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartView() {

	const [cart, setCart] = useState([]);
	const [quantity, setQuantity] = useState('');
	const [name, setName] = useState('');
	const [grandTotal, setGrandTotal] = useState(0);
	const navigate = useNavigate();

	let storedData = JSON.parse(localStorage.getItem('cartitems'));
	console.log(storedData)


	useEffect(() => {

		if(localStorage.getItem('cartitems') == null){
			localStorage.setItem('cartitems', '[]')
			Swal.fire({
				title: 'Nothing Here yet. Want to add a coffee?',
				icon: 'info'
			})
			navigate('/products')
		} else {
			const cartArr = storedData.map(cartitem => {
				console.log(cartitem)
			//[FETCH]
				// fetch(`http://localhost:4000/products/findproduct/${ cartitem.productId }`)
				// .then(res => res.json())
				// .then(data => {
					// console.log(data)
					let subtotal = cartitem.price * cartitem.quantity
					return(
						<tr key={cartitem.productId}>
							<td>{cartitem.name}</td>
							<td>{cartitem.price}</td>
							<td>{cartitem.quantity}</td>
							<td>{subtotal}</td>
						</tr>
						)

				// })
			})
			console.log(cartArr)
			setCart(cartArr)
		}
	}, [])

		const addToOrders = async () => {
			console.log(storedData)

			let newOrder = [];

			for(let i= 0; i<storedData.length; i++) {
				let cartItem = {
					productId: storedData[i].productId,
					quantity: storedData[i].quantity
				}
				newOrder.push(cartItem)
				console.log(cartItem)
			}

			console.log(newOrder)
			
			if(await quantity === 0) {
				Swal.fire({
					title: 'Quantity cannot be zero',
					icon: 'error'
				})
			} else {
				fetch('http://localhost:4000/orders/createorder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
				},
				body: JSON.stringify(newOrder)
			})
			.then(res => res.json())
			.then(data => {

				if(data){

					Swal.fire({
					  position: 'top-end',
					  icon: 'success',
					  title: `You have successfully checkout all your cart items!`,
					  showConfirmButton: false,
					  timer: 3000
					})
					localStorage.removeItem('cartitems');
					navigate('/')
				} else {
					Swal.fire({
						title: 'error!',
						icon: 'error',
						text: 'Something went wrong. Please try again :('
					})
				}
			})	
		}
	}


	return(
		<>
			<div className="my-4" >
				<h1>My Cart <AiOutlineShoppingCart /></h1>
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-warning">
					<tr>
						<th>NAME</th>
						<th>PRICE</th>
						<th>QUANTITY</th>
						<th>SUBTOTAL</th>
					</tr>
				</thead>

				<tbody>
					{ cart }
				</tbody>
			</Table>
			<Button variant="dark" style={{float: "right"}} onClick={() => addToOrders(cart)}> CHECKOUT </Button>
			<div className="m-2" style={{float: "right"}}> Grand Total: {} </div>
		</>

		)
}