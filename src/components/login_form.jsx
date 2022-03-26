import { useState } from 'react';
import { Link, navigate } from "@reach/router";
import { loginUserAccount } from "../services/posts";
import FormTitle from "./common/form_title";
import FormLabel from "./common/form_label";
import FormError from "./common/form_error";
import FormFields from "./common/form_field";
import SignInSignUpLink from "./common/form_signin_signup_link";

export default function Form() {

	// States for Login
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

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
		if (email === '' || password === '') {
			setError(true);
			return;
		}
		try {
			const payload = {
				"user": {
					"email": email,
					"password": password
				}
			};
			const response = await loginUserAccount(payload);
			setSubmitted(true);
			navigate('/home',
				{
					state:
					{
						data: response ?.data,
						token: response ?.headers ?.authorization,
						status: response ?.status
					}
				});
			setError(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
			{/* <FormTitle/> */}
			<div className="text-primary m-6">
				<FormLabel data="Sign in to Brivtter"/>
				<div className="messages">
					<FormError hasError = {error}/>
				</div>
				<FormFields email = {email} handleEmail = {handleEmail} password = {password} handlePassword = {handlePassword} handleSubmit = {handleSubmit}/>
				<SignInSignUpLink/>
			</div>
		</div>
	);
}