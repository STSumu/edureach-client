import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer';

const AuthLayout = () => {
    return (
        <div className='bg-[#F2EEEC]'>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='h-screen py-4'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;