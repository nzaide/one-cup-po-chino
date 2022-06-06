//Register.js

import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register() {

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ verifyPassword, setVerifyPassword ] = useState('');
	const [ passwordStatus, setPasswordStatus ] = useState('');
	const [ isButtonActive, setButtonActive ] = useState(true);

	useEffect(() => {

		if(email !== '' && password !== '' && verifyPassword !== ''){
			if (password !== verifyPassword) {
				setPasswordStatus("Password does not match!");
				setButtonActive(false);
			} else {
				setPasswordStatus("Password match!");
				setButtonActive(true);
			}

		}else {
			setButtonActive(false);
		}
	}, [email, password, verifyPassword, passwordStatus])

	//[REGISTER FUNCTION]
				function registerUser(e) {
					e.preventDefault();

						fetch('http://localhost:4000/users/register', {
							method: 'POST',
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify({
								email: email,
								password: password
							})
						})
						.then(res => res.json())
						.then(data => {
							console.log(data.message)

							if(data){

								if(data.message === `Email already existed. Do you wish to login?`) {
									Swal.fire({
									title: 'error',
									icon: 'error',
									text: 'Email already existed. Do you wish to login?'
									})

								} else {
									Swal.fire({
									  title: 'Registration Successful! You may now Login.',
									  width: 600,
									  padding: '3em',
									  color: '#716add',
									  background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
									  backdrop: `
									    rgba(0,0,123,0.4)
									    url("https://sweetalert2.github.io/images/nyan-cat.gif")
									    left top
									    no-repeat
									  `
									})
									navigate('/login')
								}

							} 
							else {
								Swal.fire({
									title: 'error',
									icon: 'error',
									text: 'Please try again'
								})
							}

						})

				}


	
	return(

		<div className="container w-100">
		<div className="justify-content-center align-items-center">
			<Form onSubmit={e => registerUser(e)}>
			    <h1>{`ℝ𝕖𝕘𝕚𝕤𝕥𝕖𝕣`}</h1>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control 
					    type="email"
					    placeholder="Enter email"
					    required
					    value={email}
					    onChange={e => setEmail(e.target.value)}
					    />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
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

				<Form.Group>
					<Form.Label>Verify Password</Form.Label>
					<Form.Control 
					    type="password"
					    placeholder="Verify Password"
					    required
					    value={verifyPassword}
					    onChange={e => setVerifyPassword(e.target.value)}
					    />
				</Form.Group>
				{passwordStatus === "Password match!" ?
					<p class="text-success"><strong>{passwordStatus}</strong></p>
					:
					<p class="text-danger"><strong>{passwordStatus}</strong></p>
				}

				
				{isButtonActive ?
					<Button variant="dark" type="submit" className="mt-3">Submit</Button>
					:
					<Button variant="dark" type="submit" className="mt-3" disabled>Submit</Button>
				}
				
			</Form>
		</div>
		</div>
		)
}