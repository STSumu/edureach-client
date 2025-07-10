import React, { Children, createContext, useEffect, useState } from 'react';

const EnrollContext=createContext();
const EnrollmentProvider = ({children}) => {
    const [enLoading,setEnLoading]=useState();
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