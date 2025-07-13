import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import WishItem from '../components/WishItem';
import useAddtoList from '../functions/addToList';

const WishPage = () => {
    const [wish,setWish]=useState([]);
  const {dbUser}=useContext(authContext);
 const {handleWishRemove}=useAddtoList();
  useEffect(() => {
      fetch(`http://localhost:4000/wish/${dbUser.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          setWish(data);
        });   
  }, []);

  const handleRemove = (crsId) => {
        handleWishRemove(dbUser.user_id,crsId);
        const newWish=wish.filter((wishitem)=>wishitem.course_id !== crsId);
        setWish(newWish);
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
          wish.map((wishItem,idx)=><WishItem
        wishitem={wishItem} key={idx}
        handleRemove={handleRemove}
      />)
        }
      </div>
    </div>
  );
};

export default WishPage;