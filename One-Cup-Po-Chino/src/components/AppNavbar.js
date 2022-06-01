//AppNavbar.js


import { useState, useContext } from 'react';
//React bootstrap components
import { Navbar, Nav } from 'react-bootstrap';
//react-router
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import React, { Component } from 'react';
import { GiCoffeeBeans } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";

export default function AppNavbar() {


	const { user } = useContext(UserContext);
	//Store the user information (email) in the state
	//getItem gets the key in the localStorage
	// const [ user, setUser ] = useState(localStorage.getItem('email'))
	// console.log(user)

	return(
		<Navbar bg="light" expand="lg" variant="light" className="mb-5">
			<Navbar.Brand className="ms-4" as={Link} to="/" ><h1>{`Ⲟⲛⲉ-Ⲥ𐌵ⲣ-Ⲣⲟ-Ⲥⲏⲓⲛⲟ`}   <GiCoffeeBeans /></h1>  </Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/"><h4>{`𝗛𝗼𝗺𝗲`}</h4></Nav.Link>
					<Nav.Link as={Link} to="/products"><h4>{`𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝘀`}</h4></Nav.Link>
					<Nav.Link as={Link} to="/aboutus"><h4>{`𝗔𝗯𝗼𝘂𝘁 𝗨𝘀`}</h4></Nav.Link>

					{(user.accessToken === null)
						? <>
							<Nav.Link as={Link} to="/login"><h4>{`𝗟𝗼𝗴𝗶𝗻`}</h4></Nav.Link>
							<Nav.Link as={Link} to="/register"><h4>{`𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿`}</h4></Nav.Link>
						</>
						: <Nav.Link as={Link} to="/logout"><h4>{`𝗟𝗼𝗴𝗼𝘂𝘁`}</h4></Nav.Link>

					}
					<Nav.Link as={Link} to="/products"><h4><MdDarkMode /></h4></Nav.Link>
				</Nav>
			</Navbar.Collapse>
			
		</Navbar>

		)
}

