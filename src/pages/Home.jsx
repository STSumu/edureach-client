import Courses from '../sections/Courses';
import BlueBox from '../components/BlueBox.jsx'
import Chooseus from '../components/Chooseus.jsx'            
import Banner from '../components/Banner.jsx';

const Home = () => {
    return (
        <>
        <main className='container px-2 md:px-25 flex flex-col gap-4 md:gap-10'>
            <BlueBox></BlueBox>
            <Chooseus></Chooseus>
            <Courses></Courses>
        </main>
        </>
    );
};

export default Home;