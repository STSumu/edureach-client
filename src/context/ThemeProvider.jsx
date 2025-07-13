import React, { createContext } from 'react';

const ThemeContext=createContext();
const ThemeProvider = ({children}) => {
    const theme={

    }
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;