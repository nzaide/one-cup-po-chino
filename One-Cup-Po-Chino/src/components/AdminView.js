import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductStatus from './ProductStatus';

import { GiCoffeeBeans } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";

export default function AdminView(props) {

	const { productsData, fetchData } = props;

	const [ products, setProducts ] = useState([])


	useEffect(() => {

		const productsArr = productsData.map(product => {
			return(
				<tr key={product._id}>
					<td colSpan="2" className="bg-light text-success" style={{fontWeight: 'bold'}}><AiOutlineFieldNumber /> {product._id}</td>
					<td>
						<img 
						src={product.image}
						width="200px"
						/>
					</td>
					<td className="bg-light text-dark"><GiCoffeeBeans /> {product.name}</td>
					<td>{product.description}</td>
					<td className="bg-light text-danger" style={{fontWeight: 'bold'}}><span>&#8369;</span>{product.price}</td>
					<td className={
						product.isActive ? 
							"text-success bg-light" : "text-danger bg-light" 
						}>
						{
							product.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<EditProduct specificProduct={product._id} fetchData={fetchData}/>
					</td>
					<td>
						<ProductStatus specificProductStatus={product._id}isActive={product.isActive} fetchData={fetchData}/>
					</td>
				</tr>
				)
		})
		setProducts(productsArr)
	}, [productsData])


	return(
		<>
			<div className="my-2">
				<h1>Admin Dashboard</h1>
				<AddProduct fetchData={fetchData} />
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-warning">
					<tr>
						<th colSpan="2">ID</th>
						<th>IMAGE</th>
						<th>NAME</th>
						<th>DESCRIPTION</th>
						<th>PRICE</th>
						<th>AVAILABILITY</th>
						<th colSpan="2">ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{ products }
				</tbody>
			</Table>

		</>

		)
}