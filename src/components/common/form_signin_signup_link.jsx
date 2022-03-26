import React from 'react';
import { Link } from "@reach/router";

const SignInSignUpLink = (props) => {
    return (
        <div className="flex items-center mt-3 justify-center">
            <button className={"justify-center text-blue-500"}>
                {props.mode == "register" ? "Already have an account?" : "Need to register?"}
                {props.mode == "register" ? 
                    <Link to="/"> Sign In </Link>
                    :
                    <Link to="/register"> Sign up </Link>
                }
            </button>
        </div>
    )
};

export default SignInSignUpLink;