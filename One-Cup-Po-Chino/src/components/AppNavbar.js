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
import { BiLogInCircle } from "react-icons/bi";
import { BiRegistered } from "react-icons/bi";

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
		setName(name)
	}, [name])
	

	return(


		<Navbar bg="light" expand="lg" variant="light" className="m-2">
			<Navbar.Brand className="ms-4" as={Link} to="/" ><h1>{`β²β²β²-β²€π΅β²£-β²’β²-β²€β²β²β²β²`}   <GiCoffeeBeans /></h1>  </Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/"><h6><AiOutlineHome /> {`ππΌπΊπ²`}</h6></Nav.Link>
					<Nav.Link as={Link} to="/products"><h6><SiBuymeacoffee /> {`π£πΏπΌπ±ππ°ππ`}</h6></Nav.Link>

					{ (user.accessToken === null)
					  ? <>
							<Nav.Link as={Link} to="/login"><h6><BiLogInCircle /> {`ππΌπ΄πΆπ»`} </h6></Nav.Link>
							<Nav.Link as={Link} to="/register"><h6><BiRegistered /> {`π₯π²π΄πΆπππ²πΏ`} </h6></Nav.Link>
						</>
					  : <>
					      {(user.isAdmin === true)
					        ? 
					        <>
					          <Nav.Link as={Link} to="/logout"><h6><BiLogOut /> {`ππΌπ΄πΌππ`}</h6></Nav.Link>
					          <Nav.Link as={Link} to="/"><h6> <FaRegUserCircle /> {`Hello, ${name}`} </h6></Nav.Link>
					         </>
					        : 
					        	<>
					        <Nav.Link as={Link} to="/mycart"><h6><AiOutlineShoppingCart/> {`ππ?πΏπ`} </h6></Nav.Link>
					        <Nav.Link as={Link} to="/myorders"><h6><MdProductionQuantityLimits/> {`π’πΏπ±π²πΏπ`}</h6></Nav.Link>
							<Nav.Link as={Link} to="/logout"><h6><BiLogOut /> {`ππΌπ΄πΌππ`}</h6></Nav.Link>
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

