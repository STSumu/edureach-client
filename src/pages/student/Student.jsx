import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './student.css'
import CartPage from '../CartPage';
import MyCourses from '../MyCourses';
import WishPage from '../WishPage';
const Student = () => {
    return (
         <div className="mt-15 md:mt-9">
      <div className="p-4 md:p-10 md:px-20 lg:px-30 bg-[#471608] min-h-[100px] text-white flex justify-center flex-col">
        <h1 className='text-4xl font-bold'>My Learning</h1>
            </div>
            <Tabs>
    <TabList style={{backgroundColor:'#471608',color : '#f3dbc8'}} className="px-4 md:px-20 lg:px-30 flex gap-6">
      <Tab className="tab-item text-xl font-bold cursor-pointer">My courses</Tab>
      <Tab className="tab-item text-xl font-bold cursor-pointer">Cart</Tab>
      <Tab className="tab-item text-xl font-bold cursor-pointer">WishList</Tab>
    </TabList>

    <TabPanel className="container">
      <MyCourses></MyCourses>
    </TabPanel>
    <TabPanel>
      <CartPage></CartPage>
    </TabPanel>
    <TabPanel>
      <WishPage></WishPage>
    </TabPanel>
  </Tabs>
        </div>
    );
};

export default Student;