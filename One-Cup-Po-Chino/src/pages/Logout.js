//Logout.js


import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

	const { unsetUser, setUser } = useContext(UserContext);

	//Clear the localStorage of the user's information
	unsetUser();

	//Set the user state back to it's original value
	useEffect(() => {
		setUser({
			accessToken: null
		})
	}, [])


	return(

		<Navigate to="/" />
		
		)
}