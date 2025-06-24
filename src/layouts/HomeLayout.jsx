import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Banner from '../components/Banner';
import BlueBox from '../components/BlueBox';
import Chooseus from '../components/Chooseus';

const HomeLayout = () => {
    return (
        <>
        <header>
           {/* navbar */}
           <Navbar></Navbar>
           <Banner></Banner>
           <BlueBox></BlueBox>
           <Chooseus></Chooseus>
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