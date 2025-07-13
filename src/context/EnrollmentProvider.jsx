import React, { Children, createContext, useEffect, useState } from 'react';

const EnrollContext=createContext();
const EnrollmentProvider = ({children}) => {
    
    useEffect(()=>{
},[])
    const enroll={

    }
    return (
        <EnrollContext.Provider value={enroll}>
            {children}
        </EnrollContext.Provider>
    );
};

export default EnrollmentProvider;