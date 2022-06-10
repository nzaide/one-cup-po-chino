//Highlights.js

import { Row, Col, Card } from 'react-bootstrap';


export default function Highlights(){
	return(

		<Row>
			<Col xs={12} md={3}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2>{`𝗛𝗼𝘂𝘀𝗲 𝗕𝗹𝗲𝗻𝗱 ☕`}</h2>
						</Card.Title>

						<Card.Text>
						A cappuccino is the perfect balance of espresso, steamed milk and foam. This coffee is all about the structure and the even splitting of all elements into equal thirds. An expertly made cappuccino should be rich, but not acidic and have a mildly sweet flavouring from the milk.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2>{ `𝗖𝗮𝗳𝗲 𝗠𝗼𝗰𝗵𝗮𝗰𝗵𝗶𝗻𝗼 ☕`}</h2>
						</Card.Title>

						<Card.Text>
							Another variant is a mochaccino which is an espresso shot (double) with either a combination of steamed milk and cocoa powder or chocolate milk. Both mochaccinos and caffè mocha can have chocolate syrup, whipped cream and added toppings such as cinnamon, nutmeg or chocolate sprinkles.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

		</Row>

		
		)
}