import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import EnrollNav from '../components/enrolled/EnrollNav';
import Footer from '../components/Footer';


const EnrollLayout = () => {
    const param=useParams();
    const location=useLocation();
    return (
        <>
        <header>

            <EnrollNav courseId={param?.courseId || location.state.split('/')[2]}>

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