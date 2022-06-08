import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { GiCoffeeBeans } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";

export default function OrdersPage() {

	const [ myOrders, setMyOrders ] = useState([]);
	const [ orderHistory, setOrderHistory ] = useState([]);

	useEffect(() => {
	
	fetch('http://localhost:4000/orders/getmyorders', {
		headers: { 
			'Content-Type': 'application/json', 
			Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
		}
	})
	.then(response => response.json())
	.then(data => {
		setMyOrders(data)
	})
//
	const ordersArr = myOrders.map(order => {
		let tempArray = [];
		for(let i = 0; i < order.products.length; i++){
			tempArray.push(` ${order.products[i].productName} - Quantity: ${order.products[i].quantity} | `)
		}
		let orderedProducts = tempArray.join('\r\n');
		return(
			<tr key={order._id} >
				<td className="bg-light text-success" style={{fontWeight: 'bold'}}><AiOutlineFieldNumber /> {order._id}</td>
				<td className="bg-light text-dark">
					<GiCoffeeBeans /> {orderedProducts}
				</td>
				<td className="bg-light text-danger" style={{fontWeight: 'bold'}}><span>&#8369;</span> {order.totalAmount}</td>
				<td className="bg-light text-dark">{order.purchasedOn}</td>
			</tr>
			)
	})
	setOrderHistory(ordersArr)
//
	}, [myOrders])

	return(
		<>
			<div className="my-4">
				<h1>Order History</h1>
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-warning">
					<tr>
						<th >ORDER ID</th>
						<th>PRODUCTS</th>
						<th>TOTAL AMOUNT</th>
						<th>DATE OF PURCHASE</th>
					</tr>
				</thead>

				<tbody>
					{ orderHistory }
				</tbody>
			</Table>

		</>

		)
}