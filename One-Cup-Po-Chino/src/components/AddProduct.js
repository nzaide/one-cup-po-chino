import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddProduct({fetchData}) {

	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [image, setImage] = useState();

	const [ showAdd, setShowAdd ] = useState(false);

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	const addProduct = (e) => {
		e.preventDefault();

		let formData = new FormData()

		formData.append('name', name)
		formData.append('description', description)
		formData.append('price', price)
		formData.append('image', image)

		fetch('http://localhost:4000/products/create', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: formData
		})
		.then(data => {

			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully added'
				})

				//Close our modal
				closeAdd()
				//you can use this as an alternative to refresh the whole document and get the updated data.
				// window.location.reload()
				fetchData()
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong! :('
				})

				fetchData()
			}

			//reset all states input
			setName('')
			setDescription('')
			setPrice(0)
		})


	}

	return(
		<>
			<Button className="bg-warning text-dark" variant="dark" size="lg" style={{fontWeight: 'bold'}} onClick={openAdd}>Add New Product</Button>

			{/* Add Modal */}

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
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
						<Button variant="dark" onClick={closeAdd}>Close</Button>
						<Button variant="warning" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>
		</>
		)
}