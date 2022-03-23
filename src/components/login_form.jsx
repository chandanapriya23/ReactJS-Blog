import { useState } from 'react';
import { Link, navigate } from "@reach/router";
import { loginUserAccount } from "../services/posts";

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
	const handleSubmit = async(e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setError(true);
			return;
		}
		try {
			const payload = {"user": {
				"email": email,
				"password": password
		   	}};
			const response = await loginUserAccount(payload);
			console.log("RESPONSEEEE",response);
			setSubmitted(true);
			navigate('/home');
			setError(false);
        } catch (err) {
			console.log("ERROR", err);
        }
	};

	// Showing success message
	const successMessage = () => {
		return (
		<div
			className="success"
			style={{
			display: submitted ? '' : 'none',
			}}>
			<h1>User Login successful!!</h1>
		</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
		<div
			className="error"
			style={{
			display: error ? '' : 'none',
			}}>
			<h1>Please enter all the fields</h1>
		</div>
		);
	};

	return (

		<div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
		<blockquote className="text-2xl font-medium text-center">
			<p className="text-lg font-semibold">Welcome to My-App</p>
		</blockquote>

		<div className="text-primary m-6">
			<div className="flex items-center mt-3 justify-center">
				<h1 className="text-2xl font-medium text-primary mt-4 mb-2">
				User Login
				</h1>
			</div>

			{/* Calling to the methods */}
			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>

		<form>
			{/* Labels and inputs for form data */}

			<label className="text-left">Email</label>
				<input 
					onChange={handleEmail} 
					className={"w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"}      
					value={email} 
					type="email"
					placeholder="e.g. some.example"
				/>

			<label className="label">Password</label>
				<input 
					onChange={handlePassword} 
					className={"w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"}
					value={password} 
					type="password" 
				/>

			<div className="flex items-center mt-3 justify-center">
				<button
					className={"bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"}
					// value="Login"
					onClick={handleSubmit}
					type="submit"
				>
				Login
				</button>
			</div>
		</form>
			<div className="flex items-center mt-3 justify-center">
			<button className={"justify-center text-blue-500"}>
				Need to register? 
				<Link to="/register"> Sign up </Link>
			</button>	
			</div>
		</div>
		</div>
	);
}
