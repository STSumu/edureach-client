import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Banner from '../components/Banner';

const HomeLayout = () => {
    return (
        <>
        <header>
           {/* navbar */}
           <Navbar></Navbar>
           <Banner></Banner>
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