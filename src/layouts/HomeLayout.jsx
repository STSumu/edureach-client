import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <>
        <header>
           {/* navbar */}
           {/* banner */}
        </header>
        <main>
           <Outlet></Outlet>
        </main>
        <footer> 

        </footer>
        </>
    );
};

export default HomeLayout;