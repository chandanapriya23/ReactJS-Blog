import { useState } from 'react';
import { Link, navigate } from "@reach/router";
import { createUserAccount } from "../services/posts";
import FormLabel from "./common/form_label";
import FormError from "./common/form_error";
import FormFields from "./common/form_field";
import SignInSignUpLink from "./common/form_signin_signup_link";

export default props => {

	// States for registration
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Handling the name change
	const handleName = (e) => {
		setDisplayName(e.target.value);
		setSubmitted(false);
	};

	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (displayName === '' || email === '' || password === '') {
			setError(true);
			return;
		}
		try {
			const payload = {
				"user": {
					"email": email,
					"password": password,
					"display_name": displayName
				}
			};
			await createUserAccount(payload);
			setSubmitted(true);
			navigate('/');
			setError(false);
		} catch (err) {
			console.log("ERROR", err);
		}
	};

	return (
		<div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
			<div className="text-primary m-6">
				<FormLabel data="Join Brivtter"/>
				<div className="messages">
					<FormError hasError = {error}/>
				</div>
				<FormFields mode = "register" displayName = {displayName} handleName = {handleName} email = {email} handleEmail = {handleEmail} password = {password} handlePassword = {handlePassword} handleSubmit = {handleSubmit}/>
				<SignInSignUpLink mode = "register"/>
			</div>
		</div>
	);
}