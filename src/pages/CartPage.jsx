import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthProvider';
import useAddtoList from '../functions/addToList';
import { FaArrowRight } from 'react-icons/fa';
import CartItem from './../components/cart/CartItem';
import useFetch from '../functions/fetch';



const CartPage = () => {
  const [cart,setCart]=useState([]);
  const {dbUser,baseUrl}=useContext(authContext);
  const [total,setTotal]=useState(0);
  const {handleCartRemove,handleAddOrder}=useAddtoList();
  const {fetchCart,fetchCartTotal}=useFetch();

  useEffect(() => {
      const fetchData=async ()=>{
        const fetchcart=await fetchCart();
        setCart(fetchcart);
        const fetchcarttotal=await fetchCartTotal();
        setTotal(fetchcarttotal[0].total);

      }
      fetchData();  
  }, []);
  



  const handleRemove=(courseId)=>{
    handleCartRemove(courseId);
    const newCart=cart.filter((cartitem)=>cartitem.course_id !== courseId);
    setCart(newCart);
    let newTotal = 0;
newCart.forEach((item) => {
  newTotal += Number(item.price);
});
setTotal(newTotal);
  }

  
    const handleOrder = () => {
        const orderItems = cart.map((cartitem) => ({
      courseId: cartitem.course_id,
    }));
    for(const item of orderItems){
        handleAddOrder({courseId: item.courseId });
    }
        
    }
  
  return (
    <div className="p-4 md:p-10 md:px-20 lg:px-30 mx-auto mt-15">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div>
        {
          cart.map((cartItem,idx)=><CartItem
        courseId={cartItem.course_id} handleRemove={handleRemove} key={idx}
        
      />)
        }
      </div>
      <div className='flex flex-col px-2'>
        <div className='flex justify-between items-center py-5 border-b border-gray-400'>
          <h3 className='font-bold text-gray-800'>Cart Total :</h3>
          <p>
            ${total}
          </p>
        </div>
        <div className="flex justify-end pt-5">
          <button
            className="btn bg-[#B14E0F] md:flex text-white text-sm font-semibold rounded-lg" onClick={handleOrder}
          >
            Proceed to Checkout <FaArrowRight></FaArrowRight>
          </button>
          
          </div>
          <p className='text-xs text-right text-black/70 pt-1'>You won't be charged yet.</p>
      </div>

    </div>
  );
};

export default CartPage;
