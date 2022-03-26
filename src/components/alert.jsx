import React from 'react';

export default props => {
    console.log("ALERTT", props);
    return(
        // <>
            <div className="flex justify-between text-green-100 shadow-inner rounded p-3 bg-green-600" id = "alert-id">
                <p className="self-center mb-[0em]"><strong>{props.message} </strong></p>
            </div>
        // </>
    )
}