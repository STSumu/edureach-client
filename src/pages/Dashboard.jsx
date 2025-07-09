import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CartPage from './CartPage';
import WishPage from './WishPage';
const Dashboard = () => {
    return (
        <div className='mt-10'>
            <Tabs>
    <TabList>
      <Tab>Cart</Tab>
      <Tab>WishList</Tab>
    </TabList>

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

export default Dashboard;
