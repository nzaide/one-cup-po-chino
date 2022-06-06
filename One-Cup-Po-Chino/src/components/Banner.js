//Banner.js

//React bootstrap components
import { Button, Row, Col } from 'react-bootstrap';
import { SiCoffeescript } from "react-icons/si";
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';


export default function Banner(props) {

	const [name, setName] = useState('');

	useEffect(() => {
		fetch('http://localhost:4000/users/details', {
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



	return (
		<Row>
			<Col className="p-5">

				<h1 className="mb-3">{`𝗜 𝗱𝗼𝗻❜𝘁 𝗻𝗲𝗲𝗱 𝗮𝗻 𝗶𝗻𝘀𝗽𝗶𝗿𝗮𝘁𝗶𝗼𝗻𝗮𝗹 𝗾𝘂𝗼𝘁𝗲, 𝗜 𝗻𝗲𝗲𝗱 𝗰𝗼𝗳𝗳𝗲𝗲.`}</h1>
				<h3 className="mb-3"> {`We brew the perfect cup for you.`} </h3>
				{/*<p className="mb-3">Opportunities for everyone, everywhere.</p>*/}
				<Button variant="dark" as={Link} to="/products"><h1>{`𝑻𝒐𝒅𝒂𝒚❜𝒔 𝑺𝒑𝒆𝒄𝒊𝒂𝒍`} <SiCoffeescript /></h1></Button>
			</Col>
		</Row>
		)
}