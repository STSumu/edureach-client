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
           <Banner></Banner>
           {/* banner */}
        </header>
        <main className='container mx-auto bg-[#F2EEEC] px-2 md:px-25 text-black'>
           <Outlet></Outlet>
        </main>
        <footer className='bg-[#F2EEEC] px-2 md:px-25' style={{ backgroundImage: `url(/herobg2.svg)`,backgroundPosition:'right'}} > 
            <Footer></Footer>
        </footer>
        </>
    );
};

export default HomeLayout;