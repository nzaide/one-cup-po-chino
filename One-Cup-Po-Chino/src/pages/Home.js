import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

export default function Home() {
	
	return (

		<>
			<Banner name ="Coffee Lovers" /*age={25}*//>
			<Highlights />
			<Footer />
		</>
		)
}