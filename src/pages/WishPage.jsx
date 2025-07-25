import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import useAddtoList from '../functions/addToList';
import WishItem from './../components/cart/WishItem';
import useFetch from '../functions/fetch';

const WishPage = () => {
    const [wish,setWish]=useState([]);
 const {handleWishRemove}=useAddtoList();
 const {fetchWish}=useFetch();
 
  useEffect(() => {
      const fetchData=async ()=>{
        const data=await fetchWish();
        setWish(data);
      }
      fetchData();    
  }, []);

  const handleRemove = (crsId) => {
        handleWishRemove(crsId);
        const newWish=wish.filter((wishitem)=>wishitem.course_id !== crsId);
        setWish(newWish);
  };



  return (
    <div className="p-4 md:p-10 md:px-20 lg:px-30 mx-auto mt-15">
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