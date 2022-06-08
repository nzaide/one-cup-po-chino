//ProductsPage.js

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import { SiBuymeacoffee } from "react-icons/si";

export default function ProductsPage() {

	const [ allProducts, setAllProducts ] = useState([])

	const fetchData = () => {
		fetch('https://cup-po-chino.herokuapp.com/products/allproducts')
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
				<>
					<div className="my-4">
						<h1>Fancy a Cuppa'? <SiBuymeacoffee /></h1>
					</div>
					<UserView productsData={allProducts} />
				</>
			}
			

		</>


		)
}