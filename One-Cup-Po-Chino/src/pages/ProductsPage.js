//ProductsPage.js

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';


export default function ProductsPage() {

	const [ allProducts, setAllProducts ] = useState([])

	const fetchData = () => {
		fetch('http://localhost:4000/products/allproducts')
		.then(res => res.json())
		.then(data => {
			setAllProducts(data)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])

	
	const { user } = useContext(UserContext);

	return(
		<>
			

			{(user.isAdmin === true) ?

				<AdminView productsData={allProducts} fetchData={fetchData}/>

				:

				<UserView productsData={allProducts} />
			}
			

		</>


		)
}