import React from 'react';

const FormLabel = ({data}) => (
    <div className="flex items-center mt-3 justify-center">
        <blockquote className="text-2xl font-medium text-center">
            <p className="text-3xl font-semibold">{data}</p>
        </blockquote>
    </div>
);

export default FormLabel;