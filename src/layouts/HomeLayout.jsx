import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const HomeLayout = () => {
    return (
        <>
        <header>
           {/* navbar */}
           <Navbar></Navbar>
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