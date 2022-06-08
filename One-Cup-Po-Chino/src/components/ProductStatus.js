import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ProductStatus({ specificProductStatus, isActive, fetchData}) {

	const archiveToggle = (productId) => {
		fetch(`https://cup-po-chino.herokuapp.com/products/archive/${ productId }`,{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data =>{
			if(data === true) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Product successfully disabled'
				})
				fetchData()
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong'
				})
				fetchData()
			}
		})
	}

	//for activating the product
	const activateToggle = (productId) => {
		console.log(productId)
		fetch(`https://cup-po-chino.herokuapp.com/products/activate/${ productId }`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Product successfully enabled'
				})
				fetchData()
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong'
				})
				fetchData()
			}
		})
	}

	return(

		<>

			{isActive  ?
				<Button variant="dark" size="sm" style={{fontWeight: 'bold'}} onClick={() => archiveToggle(specificProductStatus)}>Archive</Button>

				:

				<Button variant="warning" size="sm" style={{fontWeight: 'bold'}} onClick={() => activateToggle(specificProductStatus)}>Activate</Button>

			}
			
		</>
		)
}