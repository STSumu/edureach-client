import React from 'react';
import { Outlet } from 'react-router-dom';
import EnrollNav from '../components/enrolled/EnrollNav';
import Footer from '../components/Footer';


const EnrollLayout = () => {
    return (
        <>
        <header>

            <EnrollNav>

            </EnrollNav>
        </header>
        <main className='pt-20 md:pt-17'>
           <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>

        </>
    )
};

export default EnrollLayout;