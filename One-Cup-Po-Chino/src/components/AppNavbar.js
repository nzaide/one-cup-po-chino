//AppNavbar.js


import { useState, useContext, useEffect } from 'react';
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
import { FaRegUserCircle } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function AppNavbar() {


	const { user } = useContext(UserContext);

	const [name, setName] = useState('');
	
	useEffect(() => {
		fetch('https://cup-po-chino.herokuapp.com/users/details', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			let name = data.email.split('@')
			setName(name[0].charAt(0).toUpperCase() + name[0].slice(1))
		})
		
	}, [])
	

	return(

		<Navbar bg="light" expand="lg" variant="light" className="m-2">
			<Navbar.Brand className="ms-4" as={Link} to="/" ><h1>{`Ⲟⲛⲉ-Ⲥ𐌵ⲣ-Ⲣⲟ-Ⲥⲏⲓⲛⲟ`}   <GiCoffeeBeans /></h1>  </Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/"><h6><AiOutlineHome /> {`𝗛𝗼𝗺𝗲`}</h6></Nav.Link>
					<Nav.Link as={Link} to="/products"><h6><SiBuymeacoffee /> {`𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝘀`}</h6></Nav.Link>

					{ (user.accessToken === null)
					  ? <>
							<Nav.Link as={Link} to="/login"><h6>{`𝗟𝗼𝗴𝗶𝗻`}</h6></Nav.Link>
							<Nav.Link as={Link} to="/register"><h6>{`𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿`}</h6></Nav.Link>
						</>
					  : <>
					      {(user.isAdmin === true)
					        ? 
					        <>
					          <Nav.Link as={Link} to="/logout"><h6><BiLogOut /> {`𝗟𝗼𝗴𝗼𝘂𝘁`}</h6></Nav.Link>
					          <Nav.Link as={Link} to="/"><h6> <FaRegUserCircle /> {`Hello, ${name}`} </h6></Nav.Link>
					         </>
					        : 
					        	<>
					        <Nav.Link as={Link} to="/mycart"><h6><AiOutlineShoppingCart/> {`𝗖𝗮𝗿𝘁`} </h6></Nav.Link>
					        <Nav.Link as={Link} to="/myorders"><h6><MdProductionQuantityLimits/> {`𝗢𝗿𝗱𝗲𝗿𝘀`}</h6></Nav.Link>
							<Nav.Link as={Link} to="/logout"><h6><BiLogOut /> {`𝗟𝗼𝗴𝗼𝘂𝘁`}</h6></Nav.Link>
							<Nav.Link as={Link} to="/"><h6> <FaRegUserCircle /> {`Hello, ${name}`} </h6></Nav.Link>
							</>
					      }
					    </>
					}


					<Nav.Link as={Link} to="/products"><h6><MdDarkMode /></h6></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		)
}

