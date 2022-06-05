import { useState, useEffect } from 'react';
import { Form, Table, Button, TextField } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlineShoppingCart } from "react-icons/ai";

import EditCartQuantity from '../components/EditCartQuantity';

export default function CartView() {

	const [cart, setCart] = useState([]);
	const [quantity, setQuantity] = useState('');
	const [name, setName] = useState('');
	const [grandTotal, setGrandTotal] = useState(0);
	const navigate = useNavigate();

	let storedData = JSON.parse(localStorage.getItem('cartitems'));

	useEffect(() => {
		//[incrementQuantity Fucntion]
				function incrementQuantity (prodId) {

					let dataToIncrement = JSON.parse(localStorage.getItem('cartitems'));
					let updatedCartArray = [];
					for (let i = 0; i < dataToIncrement.length ; i++) {
						if (dataToIncrement[i].productId === prodId){
							dataToIncrement[i].quantity += 1;
							dataToIncrement[i].subTotal = dataToIncrement[i].quantity * dataToIncrement[i].price
						}
						updatedCartArray.push(dataToIncrement[i])
					}
					localStorage.setItem('cartitems', JSON.stringify(updatedCartArray));
					let updatedStoredData = JSON.parse(localStorage.getItem('cartitems')); 

					const cartArr = updatedStoredData.map(cartitem => {
							
							return(
								<tr key={cartitem.productId}>
									<td  Colspan="8">{cartitem.name}</td>
									<td><span>&#8369;</span> {cartitem.price}</td>
									<td>
									<Button className="mx-2" variant="dark" onClick={() => decrementQuantity(cartitem.productId)}> - </Button>
											 <span> {` ${cartitem.quantity} `} </span>
									<Button className="mx-2" variant="dark" onClick={() => incrementQuantity(cartitem.productId)}> + </Button>
									</td>
									<td><span>&#8369;</span>  {cartitem.subTotal}
									</td>
								</tr>
								)
					})
					setCart(cartArr)
					window.location.reload(false);
				}
		//[decrementQuantity Fucntion]
				function decrementQuantity (prodId) {

					let dataToDecrement = JSON.parse(localStorage.getItem('cartitems'));
					let updatedCartArray = [];
					for (let i = 0; i < dataToDecrement.length ; i++) {
						if (dataToDecrement[i].productId === prodId){
							if(dataToDecrement[i].quantity === 0) {
								dataToDecrement[i].quantity = 0
							} else {
								dataToDecrement[i].quantity -= 1;
								dataToDecrement[i].subTotal = dataToDecrement[i].quantity * dataToDecrement[i].price
							}
						}
						updatedCartArray.push(dataToDecrement[i])
					}
					localStorage.setItem('cartitems', JSON.stringify(updatedCartArray));
					let updatedStoredData = JSON.parse(localStorage.getItem('cartitems')); 

					const cartArr = updatedStoredData.map(cartitem => {
							
							return(
								<tr key={cartitem.productId}>
									<td  Colspan="8">{cartitem.name}</td>
									<td><span>&#8369;</span> {cartitem.price}</td>
									<td>
									<Button className="mx-2" variant="dark" onClick={() => decrementQuantity(cartitem.productId)}> - </Button>
											 <span> {` ${cartitem.quantity} `} </span>
									<Button className="mx-2" variant="dark" onClick={() => incrementQuantity(cartitem.productId)}> + </Button>
									</td>
									<td><span>&#8369;</span>  {cartitem.subTotal}
									</td>
								</tr>
								)
					})
					setCart(cartArr)
					window.location.reload(false);
				}
		//[removeAnItem Function]

		if(localStorage.getItem('cartitems') == null){
			localStorage.setItem('cartitems', '[]')
			Swal.fire({
				title: 'Nothing Here yet. Wanna to add a coffee?',
				icon: 'question',
				confirmButtonColor: "#b36b14",
			})

			navigate('/products')
		} else {
			const cartArr = storedData.map(cartitem => {
					setGrandTotal(prevGrandTotal => prevGrandTotal + cartitem.subTotal)
					return(
						<tr key={cartitem.productId}>
							<td  Colspan="8">{cartitem.name}</td>
							<td><span>&#8369;</span> {cartitem.price}</td>
							<td>
							<Button className="mx-2" variant="dark" onClick={() => decrementQuantity(cartitem.productId)}> - </Button>
									 <span> {` ${cartitem.quantity} `} </span>
							<Button className="mx-2" variant="dark" onClick={() => incrementQuantity(cartitem.productId)}> + </Button>

							</td>
							<td><span>&#8369;</span>  {cartitem.subTotal}
							</td>
						</tr>
						)
			})
			setCart(cartArr)
		}
	}, [quantity])

	//[ADD TO ORDER FUNCTION]
			const addToOrders = () => {
					if(storedData.length === 0) {
							Swal.fire({
							title: 'Nothing Here yet. Wanna to add a coffee?',
							icon: 'question',
							confirmButtonColor: "#b36b14",
						})
					} else {

						let newOrder = [];

						for(let i = 0; i < storedData.length; i++) {
							let cartItem = {
								productId: storedData[i].productId,
								quantity: storedData[i].quantity
							}
							newOrder.push(cartItem)
							
						}

						console.log(newOrder)
						
						if( quantity === 0) {
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
								  confirmButtonColor: "#b36b14",
								  showConfirmButton: false,
								  timer: 3000
								})
								localStorage.removeItem('cartitems');
								navigate('/')
							} else {
								Swal.fire({
									title: 'error!',
									icon: 'error',
									confirmButtonColor: "#b36b14",
									text: 'Something went wrong. Please try again :('
								})
							}
						})	
					}
				}
			}


	return(
		<>
			<div className="my-4" >
				<h1> {`𝗠𝗬 𝗖𝗔𝗥𝗧`} <AiOutlineShoppingCart /></h1>
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-warning">
					<tr>
						<th Colspan="8">{`𝗡𝗔𝗠𝗘`}</th>
						<th>{`𝗣𝗥𝗜𝗖𝗘`}</th>
						<th>{`𝗤𝗨𝗔𝗡𝗧𝗜𝗧𝗬`}</th>
						<th>{`𝗦𝗨𝗕𝗧𝗢𝗧𝗔𝗟`}</th>
					</tr>
				</thead>

				<tbody>
					{ cart }
				</tbody>
			</Table>
			<Button variant="dark" style={{float: "right"}} onClick={() => addToOrders(cart)}> {`𝗖𝗛𝗘𝗖𝗞𝗢𝗨𝗧`} </Button>
			<div className="m-2" style={{float: "right"}}> <h3>{`𝗚𝗿𝗮𝗻𝗱 𝗧𝗼𝘁𝗮𝗹: `} <span>&#8369;</span> {grandTotal} </h3>  </div>
		</>

		)
}