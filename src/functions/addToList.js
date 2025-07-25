
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const useAddtoList = () => {
  const { baseUrl,getTokenHeader} = useContext(authContext);
  const navigate = useNavigate();

  const handleAddCart = async(cartItem) => {
    // cartItem={
    //   userId,
    // course_id
    // }
    const headers = await getTokenHeader();
    fetch(`${baseUrl}/cart`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.cart_id) {
          Swal.fire({
            title: 'Added to Cart!',
            text: 'Do you want to go to your cart now?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Go to Cart',
            cancelButtonText: 'Stay here',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/cart');
            }
          });
        } else {
          alert('Failed to add to cart.');
        }
      });
  };
  const handleAddWishList = async(wishItem) => {
    const headers = await getTokenHeader();
      fetch(`${baseUrl}/wish`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...headers,
        },
        body: JSON.stringify(wishItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.cart_id) {
            Swal.fire({
              title: 'Added to WishList!',
              text: 'Do you want to go to your WishList now?',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Go to WishList',
              cancelButtonText: 'Stay here',
            })
            .then((result) => {
      if (result.isConfirmed) {
        
        navigate('/wish');
      }
    });
          }
          else {
            alert('failed');
          }
        });
    }
  const handleCartRemove=async(crsId)=>{
        const headers = await getTokenHeader();
        fetch(`${baseUrl}/cart/${crsId}`, {
        method: "DELETE",
        headers:{
          ...headers,
        }
        })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
       Swal.fire({
              title: 'Added to WishList!',
              text: 'Do you want to go to your WishList now?',
              icon: 'success',
              showCloseButton: true,
            })
          } 
  });

  }
  const handleWishRemove=async(crsId)=>{
        const headers = await getTokenHeader();
        fetch(`${baseUrl}/wish/${crsId}`, {
        method: "DELETE",
        headers:{
          ...headers,
        }
        })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
       Swal.fire({
              title: 'Added to WishList!',
              text: 'Do you want to go to your WishList now?',
              icon: 'success',
              showCloseButton: true,
            })
          } 
  });


  }
  const handleAddOrder = async ({courseId}) => {
   try {
    // orderItem={
    //   userId,
    //   courseId,
    // }
    const headers = await getTokenHeader();
    const res = await fetch(`${baseUrl}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({courseId}),
    });

    const data = await res.json();

    if (data.order_id) {
      navigate('/order');
    } else {
      console.error('Order creation failed:', data);
    }
  } catch (err) {
    console.error('Order error:', err);
  }
}

 

  return {handleAddCart,handleAddWishList,handleCartRemove,handleWishRemove,handleAddOrder};
};

export default useAddtoList;
