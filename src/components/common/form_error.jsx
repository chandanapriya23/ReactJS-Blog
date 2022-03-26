import React from 'react';

const FormError = ({hasError}) => {
    return (
        <div
            className="error"
            style={{
                display: hasError ? '' : 'none',
            }}>
            <h4>Please enter all the fields</h4>
        </div>
    );
};

export default FormError;
