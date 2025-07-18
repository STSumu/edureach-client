import React from 'react';
import Footer from '../components/Footer';

const UserLayout = () => {
    return (
        <>
        <header>
            <Navbar></Navbar>
            <Banner></Banner>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
        </>
    );
};

export default UserLayout;