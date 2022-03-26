import React from 'react';

const FormLabel = ({data}) => (
    <div className="flex items-center mt-3 justify-center">
        {/* <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
          {data}
        </h1> */}
        <blockquote className="text-2xl font-medium text-center">
            <p className="text-2xl font-semibold">{data}</p>
        </blockquote>
    </div>
);

export default FormLabel;

// export default function Label({data, onChildClick}) {
//     return (
//       <div className="child">
//        <button onClick={onChildClick}>{data}</button>
//       </div>
//     );
//   }

