//AppNavbar.js


import { useState, useContext } from 'react';
//React bootstrap components
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
//react-router
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import React, { Component } from 'react';
import { GiCoffeeBeans } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiBuymeacoffee } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

export default function AppNavbar() {


	const { user } = useContext(UserContext);

	//Store the user information (email) in the state
	//getItem gets the key in the localStorage
	// const [ user, setUser ] = useState(localStorage.getItem('email'))
	// console.log(user)


	console.log(user.accessToken)

	return(
		<Navbar bg="light" expand="lg" variant="light" className="mb-5">
			<Navbar.Brand className="ms-4" as={Link} to="/" ><h1>{`Ⲟⲛⲉ-Ⲥ𐌵ⲣ-Ⲣⲟ-Ⲥⲏⲓⲛⲟ`}   <GiCoffeeBeans /></h1>  </Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/"><h5>{`𝗛𝗼𝗺𝗲`}     <AiOutlineHome /></h5></Nav.Link>
					<Nav.Link as={Link} to="/products"><h5>{`𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝘀`}   <SiBuymeacoffee /></h5></Nav.Link>

{/*					{(user.isAdmin === true)
						? <>
							<NavDropdown title="Orders" id="nav-dropdown">
							  <NavDropdown.Item eventKey="4.1">All Pending Orders</NavDropdown.Item>
							  <NavDropdown.Item eventKey="4.2">Find Specific Order</NavDropdown.Item>
							  <NavDropdown.Divider />
							  <NavDropdown.Item eventKey="4.4">Cancelled Orders</NavDropdown.Item>
							</NavDropdown>
						</>
						: <> 
							<NavDropdown title="Orders" id="nav-dropdown">
							  <NavDropdown.Item eventKey="4.1">My Cart</NavDropdown.Item>
							  <NavDropdown.Item eventKey="4.2">Order History</NavDropdown.Item>
							  <NavDropdown.Divider />
							  <NavDropdown.Item eventKey="4.4">Check Out</NavDropdown.Item>
							</NavDropdown>
						</>
					}*/}

					{(user.accessToken === null)
						? <>
							<Nav.Link as={Link} to="/login"><h5>{`𝗟𝗼𝗴𝗶𝗻`}</h5></Nav.Link>
							<Nav.Link as={Link} to="/register"><h5>{`𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿`}</h5></Nav.Link>
						</>
						: <> 
							<Nav.Link as={Link} to="/mycart"><h5>Cart <AiOutlineShoppingCart /></h5></Nav.Link>
							<Nav.Link as={Link} to="/logout"><h5>{`𝗟𝗼𝗴𝗼𝘂𝘁`}   <BiLogOut /></h5></Nav.Link>
						</>

					}

					<Nav.Link as={Link} to="/products"><h5><MdDarkMode /></h5></Nav.Link>
				</Nav>
			</Navbar.Collapse>
			
		</Navbar>

		)
}

