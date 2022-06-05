import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductStatus from './ProductStatus';


export default function AdminView(props) {

	const { productsData, fetchData } = props;

	const [ products, setProducts ] = useState([])


	useEffect(() => {

		const productsArr = productsData.map(product => {
			return(
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={
						product.isActive ? 
							"text-success" : "text-danger" 
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
			<div className="my-4">
				<h1>Admin Dashboard</h1>
				<AddProduct fetchData={fetchData} />
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-warning">
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>DESCRIPTION</th>
						<th>PRICE</th>
						<th>AVAILABILITY</th>
						<th Colspan="2">ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{ products }
				</tbody>
			</Table>

		</>

		)
}