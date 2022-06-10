import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({ specificProduct, fetchData }){

	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState();

	const [ showEdit, setShowEdit ] = useState(false)

	const openEdit = (productId) => {
		fetch(`http://localhost:4000/products/findproduct/${ productId }`)
		.then(res => res.json())
		.then(data => {
			//populate all input values with the course information that we fetched
			setProductId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
			setImage(data.image)
		})

		setShowEdit(true)
	}


	//Function to handle the closing of modal and reset all relevant states back to their default value
	const closeEdit = () => {
		setShowEdit(false)
		setName('')
		setDescription('')
		setPrice(0)
		setImage()
	}

	//a function to change or update the specific course
	const editProduct = (e, productId) => {
		e.preventDefault();

		let formData = new FormData()

		formData.append('name', name)
		formData.append('description', description)
		formData.append('price', price)
		formData.append('image', image)
		console.log(formData)
		fetch(`http://localhost:4000/products/editProduct/${ productId }`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully updated!'
				})
				fetchData()
				closeEdit()
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong :('
				})

				fetchData()
				closeEdit()
			}
		})
	}


	return(
		<>
			<Button className="bg-warning text-dark" variant="dark" size="sm" style={{fontWeight: 'bold'}} onClick={() => openEdit(specificProduct)}>Update</Button>

		{/*Edit Modal*/}

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
						    className="">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows={5} required value={description} onChange={e => setDescription(e.target.value)}/>
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

						<Form.Group controlId="formFile">
							<Form.Label>Upload Image</Form.Label>
							<Form.Control 
							      type="file"
							      required
							      onChange={e => setImage(e.target.files[0])}
							 />
						</Form.Group>

					</Modal.Body>

					<Modal.Footer>
						<Button variant="dark" style={{fontWeight: 'bold'}} onClick={closeEdit}>Close</Button>
						<Button variant="warning" style={{fontWeight: 'bold'}} type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>


		)
}