import { useState, useEffect } from 'react';
import { Form, Table, Button, TextField } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiCoffeeBeans } from "react-icons/gi";

export default function CartView() {

	const [cart, setCart] = useState([]);
	const [quantity, setQuantity] = useState('');
	const [name, setName] = useState('');
	const [grandTotal, setGrandTotal] = useState(0);
	const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem('cartitems')));
	const navigate = useNavigate();

	useEffect(() => {

		//[incrementQuantity Fucntion]
				function incrementQuantity (prodId) {
					let updatedCartArray = [];
					for (let i = 0; i < storedData.length ; i++) {
						if (storedData[i].productId === prodId){
							storedData[i].quantity += 1;
							storedData[i].subTotal = storedData[i].quantity * storedData[i].price
						}
						updatedCartArray.push(storedData[i])
						
					}
					localStorage.setItem('cartitems', JSON.stringify(updatedCartArray));
					window.location.reload(false);
				}
		//[decrementQuantity Fucntion]
				function decrementQuantity (prodId) {
					let updatedCartArray = [];
					for (let i = 0; i < storedData.length ; i++) {
						if (storedData[i].productId === prodId){
							if(storedData[i].quantity === 1) {
								storedData[i].quantity = 1
							} else {
								storedData[i].quantity -= 1;
								storedData[i].subTotal = storedData[i].quantity * storedData[i].price
							}
						}
						updatedCartArray.push(storedData[i])
					}
					localStorage.setItem('cartitems', JSON.stringify(updatedCartArray));
					window.location.reload(false);
				}
		//[removeAnItem Function]
				function removeItem (prodId) {
					let updatedCartArray = [];
					for (let i = 0; i < storedData.length ; i++) {
						if (storedData[i].productId === prodId){
								continue;
							}
						updatedCartArray.push(storedData[i])
					}
					localStorage.setItem('cartitems', JSON.stringify(updatedCartArray));
					window.location.reload(false);
				}

		if(localStorage.getItem('cartitems') == null){
			localStorage.setItem('cartitems', '[]')
			Swal.fire({
				title: 'Nothing Here yet. Wanna add a coffee?',
				icon: 'question',
				confirmButtonColor: "#b36b14",
			})

			navigate('/products')
		} else {
			const cartArr = storedData.map(cartitem => {
					setGrandTotal(prevGrandTotal => prevGrandTotal + cartitem.subTotal)
					return(
						<tr key={cartitem.productId}>
							<td Colspan="8" className="bg-light text-success" style={{fontWeight: 'bold'}}> <GiCoffeeBeans /> {cartitem.name}
							</td>
							<td className="bg-light text-dark" style={{fontWeight: 'bold'}}><span>&#8369;</span> {cartitem.price}
							</td>
							<td>
							<Button className="mx-2" variant="dark" onClick={() => decrementQuantity(cartitem.productId)}> - </Button>
									 <span> {` ${cartitem.quantity} `} </span>
							<Button className="mx-2" variant="dark" onClick={() => incrementQuantity(cartitem.productId)}> + </Button>

							</td>
							<td className="bg-light text-danger" style={{fontWeight: 'bold'}} ><span>&#8369;</span>  {cartitem.subTotal}
							</td>
							<td>
							<Button className="mx-2" variant="dark" onClick={() => removeItem(cartitem.productId)}> Remove </Button>
							</td>

						</tr>
						)
			})
			setStoredData(JSON.parse(localStorage.getItem('cartitems')))
			setCart(cartArr)
		}
	}, [quantity])

	//[ADD TO ORDER FUNCTION]
			const addToOrders = () => {
					if(storedData.length === 0) {
							Swal.fire({
							title: 'Nothing Here yet. Wanna add a coffee?',
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
								navigate('/myorders')
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
						<th>{` `}</th>
					</tr>
				</thead>

				<tbody>
					{ cart }
				</tbody>
			</Table>
			<Button className="p-3"  variant="warning" style={{float: "right", fontWeight: 'bold'}} onClick={() => addToOrders(cart)}> CHECKOUT </Button>
			<div className="bg-dark text-warning mx-2 p-2" style={{fontWeight: 'bold'}} style={{float: "right"}}> <h3>{`𝗚𝗿𝗮𝗻𝗱 𝗧𝗼𝘁𝗮𝗹: `} <span>&#8369;</span > {grandTotal} </h3>  </div>
		</>

		)
}