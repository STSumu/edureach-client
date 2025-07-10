import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { authContext } from '../context/AuthProvider';
import useAddtoList from '../functions/addToList';
import { FaArrowRight } from 'react-icons/fa';


const CartPage = () => {
  const [cart,setCart]=useState([]);
  const {dbUser}=useContext(authContext);
  const [total,setTotal]=useState(0);
  const {handleCartRemove}=useAddtoList();
  useEffect(() => {
      fetch(`http://localhost:4000/cart/${dbUser.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
        });   
  }, []);
  useEffect(() => {
      fetch(`http://localhost:4000/cart/total/${dbUser.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          setTotal(data[0].total);
        })
  }, []);

  const handleRemove=(userId,courseId)=>{
    handleCartRemove(userId,courseId);
    const newCart=cart.filter((cartitem)=>cartitem.course_id !== courseId);
    setCart(newCart);
    let newTotal = 0;
newCart.forEach((item) => {
  newTotal += Number(item.price);
});
setTotal(newTotal);
  }
  const handleAddOrder=(status)=>{
    console.log(status);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
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
            className="btn bg-[#B14E0F] md:flex text-white text-sm font-semibold rounded-lg" onClick={handleAddOrder}
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
