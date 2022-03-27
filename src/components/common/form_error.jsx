import React from 'react';

const FormError = ({hasError}) => {
    return (
        <div
            className="error"
            style={{
                display: hasError ? '' : 'none',
            }}>
            <h5 className = "text-red-600">Please enter all the fields</h5>
        </div>
    );
};

export default FormError;
