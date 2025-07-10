import React from 'react';
import { useParams } from 'react-router-dom';

const Material = () => {
    const params=useParams();
    console.log(params.materialId)
    return (
        <div>
           {params.materialId} 
        </div>
    );
};

export default Material;