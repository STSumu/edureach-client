import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <>
        <header className='bg-cover bg-center text-black' style={{ backgroundImage: `url(/herobg2.svg)`}}>
           {/* navbar */}
           <Navbar></Navbar>
           {/* banner */}
           <Banner></Banner>
        </header>
        <main className='bg-[#F2EEEC] text-black py-4 md:py-8'>
           <Outlet></Outlet>
        </main>
        <footer className='bg-[#F2EEEC]'> 
            <Footer></Footer>
        </footer>
        </>
    );
};

export default HomeLayout;