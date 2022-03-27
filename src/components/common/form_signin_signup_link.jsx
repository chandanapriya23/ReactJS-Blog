import React from 'react';
import { Link } from "@reach/router";
import { REGISTER } from "../../utils/constants";

const SignInSignUpLink = (props) => {
    return (
        <div className="flex items-center mt-3 justify-center">
            <button className={"justify-center text-blue-500"}>
                {props.mode == REGISTER ? "Already have an account?" : "Need to register?"}
                {props.mode == REGISTER ? 
                    <Link to="/"> Sign In </Link>
                    :
                    <Link to="/register"> Sign up </Link>
                }
            </button>
        </div>
    )
};

export default SignInSignUpLink;