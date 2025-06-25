import Courses from '../sections/Courses';
import BlueBox from '../components/BlueBox.jsx'
import Chooseus from '../components/Chooseus.jsx'            
import Banner from '../components/Banner';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <BlueBox></BlueBox>
            <Chooseus></Chooseus>
            <Courses></Courses>
        </>
    );
};

export default Home;