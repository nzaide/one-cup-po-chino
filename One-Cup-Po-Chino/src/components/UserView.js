import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Col, Row } from 'react-bootstrap';

export default function UserView({productsData}) {

	const [ products, setProducts ] = useState([])

	
	useEffect(() => {
		const productsArr = productsData.map(product => {
			if(product.isActive === true) {
				return(
					<Col xs={12} md={3} className="">
						<ProductCard key={product._id} productProp={product}/>
					</Col>
					)
			}else {
				return null;
			}
		})

		//set the products state to the result of our map function, to bring our return product component outside of the scope of our useEffect where our return statement below can see.
		setProducts(productsArr)
	}, [productsData])

	return(
		<Row>
			{ products }
		</Row>
		)
}