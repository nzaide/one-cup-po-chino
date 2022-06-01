import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }){

	const [ showEdit, setShowEdit ] = useState(false)

	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const openEdit = (productId) => {
		fetch(`http://localhost:4000/products/findproduct/${ productId }`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			//populate all input values with the product information that we fetched
			setProductId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setShowEdit(true)
	}


	//Function to handle the closing of modal and reset all relevant states back to their default value
	const closeEdit = () => {
		setShowEdit(false)

	}

	//a function to change or update the specific product
	const editProduct = (e, productId) => {
		e.preventDefault();
		console.log(productId)
		fetch(`http://localhost:4000/products/editProduct/${ productId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully updated'
				})
				fetchData()
				closeEdit()
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong! :('
				})

				fetchData()
				closeEdit()
			}
		})
	}


	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
							      type="text"
							      required
							      value={name}
							      onChange={e => setName(e.target.value)}
							 />
						</Form.Group>

						<Form.Group
						    className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows={4} required value={description} onChange={e => setDescription(e.target.value)}/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
							      type="number"
							      required
							      value={price}
							      onChange={e => setPrice(e.target.value)}
							 />
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>


		)
}