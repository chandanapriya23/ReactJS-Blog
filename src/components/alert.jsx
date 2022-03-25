import React from 'react';

export default props => {

    const handleClose = (e) => {
        // var x = document.querySelectorAll('.alert-del')[0];
        document.getElementById("alert-id").style.display = 'none';
        // console.log("ALERT DEL", document.getElementById("alert-id"));
        // alert_del.forEach((x) =>
            // x.addEventListener('click', function () {
                // console.log("CHECKIG");
                // e.parentElement.classList.add('hidden');
            // })
        // );
    }
    
    return(
        <>
            <div className="flex justify-between text-green-200 shadow-inner rounded p-2 bg-green-600" id = "alert-id">
                <p className="self-center"><strong>{props.message} </strong></p>
                <strong className="text-xl align-center cursor-pointer alert-del" onClick= {handleClose}>&times;</strong>
            </div>
        </>
    )
}