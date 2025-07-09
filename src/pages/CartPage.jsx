import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { authContext } from '../context/AuthProvider';

const CartPage = () => {
  const [cart,setCart]=useState([]);
  const {dbUser}=useContext(authContext);
  const [total,setTotal]=useState(0);
  useEffect(() => {
      fetch(`http://localhost:4000/cart/${dbUser.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          let t=0;
          data.map((item)=>t+=Number(item.price));
          setTotal(t);
        });   
  }, []);
  
  const handleRemove = (id) => {
    console.log('Remove', id);
    // TODO: Remove logic
  };

  const handleWishlist = (id) => {
    console.log('Move to Wishlist', id);
    // TODO: Wishlist logic
  };
  const handleAddOrder=(success)=>{
        if(success==-1){

        }
        else if(success ==1){
          
        }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div>
        {
          cart.map((cartItem,idx)=><CartItem
        courseId={cartItem.course_id} key={idx}
        handleRemove={handleRemove}
        handleWishList={handleWishlist}
      />)
        }
      </div>
      <div>
        <div>
          <h3>Cart Total</h3>
          <p>
            ${total}
          </p>
        </div>
        <button
            to="/auth/login"
            className="btn bg-[#B14E0F] hidden md:flex text-white text-lg rounded-lg" onClick={()=>document.getElementById('my_modal_5').showModal()}
          >
            Buy
          </button>
      </div>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn" onClick={()=>handleAddOrder(1)}>Close</button>
        <button className='btn' onClick={()=>handleAddOrder(-1)}>Buy</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
};

export default CartPage;
