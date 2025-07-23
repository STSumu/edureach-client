import Courses from '../sections/Courses';
import Banner from '../components/Banner.jsx';
import Chooseus from './../sections/Chooseus';
import BlueBox from '../sections/BlueBox.jsx';

const Home = () => {
    return (
        <>
        <main className='container mx-auto px-2 md:px-6 lg:px-25 flex flex-col gap-4 md:gap-10'>
            <BlueBox></BlueBox>
            <Chooseus></Chooseus>
            <Courses></Courses>
        </main>
        </>
    );
};

export default Home;