import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ProductStatus({ specificProductStatus, isActive, fetchData}) {

	const archiveToggle = (productId) => {
		fetch(`http://localhost:4000/products/archive/${ productId }`,{
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
		fetch(`http://localhost:4000/products/activate/${ productId }`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
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
				<Button variant="danger" size="sm" onClick={() => archiveToggle(specificProductStatus)}>Archive</Button>

				:

				<Button variant="success" size="sm" onClick={() => activateToggle(specificProductStatus)}>Activate</Button>

			}
			
		</>
		)
}