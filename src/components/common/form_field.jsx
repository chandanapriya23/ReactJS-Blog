import React from 'react';

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
					className={"bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"}
					// value="Login"
					onClick={props.handleSubmit}
					type="submit"
				>
					{props.mode == "register" ? "Create Account" : "Log In"}
				</button>
			</div>
		)
	}

    return (
        <form>
            {
                props.mode == "register" ? 
                <>
                    {/* <label className="text-left">Name</label> */}
                    {renderFormNameField()}
                </>
                : ""
            }
            {/* <label className="text-left">Email</label> */}
            {renderFormEmailField()}
            {/* <label className="label">Password</label> */}
            {renderFormPasswordField()}
            {renderFormLoginBtn()}
        </form>
    )
};
export default FormFields;