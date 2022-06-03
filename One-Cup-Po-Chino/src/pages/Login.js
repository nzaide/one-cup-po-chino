//Login.js

import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {

	/*
	Note for fetch()
		- it is a method in JS, which allows to send a request to an api and process its response.

	fetch('url', {optional object})
	-url from the API (http://localhost:4000/users/login)(https://heroku.com/users/login)
	-{optional objects} objects which contains additional information about our requests such as method, the body and the headers: content-type , authorization

	//getting a response is usually a two-stage process
	.then(response => response.json()) ====> parse the response as JSON
	.then(actualData => console.log(actualData)) =====> process the result of the response
	*/
	const navigate = useNavigate();

	//Consume the User Context object and it's properties to use for user validation and to get the email coming from the login
	const { user, setUser } = useContext(UserContext);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	//button
	const [ isActive, setIsActive ] = useState(true);

	useEffect(() => {
		if(email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password])

	function authentication(e) {
		e.preventDefault();

		fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)

			if(data.accessToken !== undefined){
				localStorage.setItem('accessToken', data.accessToken);
				setUser({
					accessToken: data.accessToken
				})

				//get user's details from our token
				fetch('http://localhost:4000/users/details', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {

					if(data.isAdmin === true) {
						localStorage.setItem('isAdmin', data.isAdmin)

						setUser({
							isAdmin: data.isAdmin
						})

						Swal.fire({
						  position: 'top-end',
						  icon: 'success',
						  title: `Welcome, Admin ${data.email}!`,
						  showConfirmButton: false,
						  timer: 1500
						})

						//push to the /products
						navigate('/products')
					}else {
						//if not an admin, push to '/' (homepage)
						navigate('/')
					}

				})

			}else {
				Swal.fire({
					title: 'Ooopsss',
					icon: 'error',
					text: 'Something went wrong. Check your Credentials'
				})
			}

			setEmail('')
			setPassword('')
		})

	}

	return(

		(user.accessToken !== null) ?

		<Navigate to="/products" />

		:
		<div className="container w-100">
		<div className="d-flex justify-content-center align-items-center">
		<Form className="w-100 " onSubmit={e => authentication(e)}>
            <h1>{`𝕃𝕠𝕘𝕚𝕟`}</h1>
			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
				    type="email"
				    placeholder="Enter email"
				    required
				    value={email}
				    onChange={e => setEmail(e.target.value)}
				    />
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control 
				    type="password"
				    placeholder="Enter your Password"
				    required
				    value={password}
				    onChange={e => setPassword(e.target.value)}
				    />
			</Form.Group>
			{ isActive ?
			<Button variant="dark" type="submit" className="mt-3">
				Submit
			</Button>
			:
			<Button variant="muted" type="submit" className="mt-3" disabled>
				
			</Button>
			}
		</Form>
		</div>
		</div>
		)
}