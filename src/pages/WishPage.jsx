import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import WishItem from '../components/WishItem';

const WishPage = () => {
    const [wish,setWish]=useState([]);
  const {dbUser}=useContext(authContext);

  useEffect(() => {
      fetch(`http://localhost:4000/wish/${dbUser.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          setWish(data);
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

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4">Your WishList</h2>
      <div>
        {
          wish.length===0 ? <div>
            <p>Nothing to show</p>
            <Link className='btn' to='/'>Back to Home</Link>
          </div>
          :
          wish.map((cartItem,idx)=><WishItem
        courseId={cartItem.course_id} key={idx}
        handleRemove={handleRemove}
        handleWishList={handleWishlist}
      />)
        }
      </div>
    </div>
  );
};

export default WishPage;