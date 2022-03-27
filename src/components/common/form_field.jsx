import React from 'react';
import { REGISTER } from "../../utils/constants";

const FormFields = (props) => {

    const renderFormNameField = () => {
		return (
			<input
				onChange={props.handleName}
				className={"w-full p-2 text-black border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"}
				value={props.displayName}
				type="text"
				placeholder="Enter your Name"
			/>
		)
	}

    const renderFormEmailField = () => {
        return (
            <input
                onChange={props.handleEmail}
                className={"w-full p-2 text-black border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"}
                value={props.email}
                type="email"
                placeholder="Enter your Email"
            />
        )
    }
    
    const renderFormPasswordField = () => {
        return(
            <input
                onChange={props.handlePassword}
                className={"w-full p-2 text-black border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"}
                value={props.password}
                type="password"
                placeholder="Enter your Password"
            />
        )
    }

    const renderFormLoginBtn = () => {
		return(
			<div className="flex items-center mt-3 justify-center">
				<button
					className={"bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"}
					onClick={props.handleSubmit}
					type="submit"
				>
					{props.mode == REGISTER ? "Create Account" : "Log In"}
				</button>
			</div>
		)
	}

    return (
        <form>
            {
                props.mode == REGISTER ? 
                <>
                    {renderFormNameField()}
                </>
                : ""
            }
            {renderFormEmailField()}
            {renderFormPasswordField()}
            {renderFormLoginBtn()}
        </form>
    )
};
export default FormFields;