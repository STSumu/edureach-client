
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const useAddtoList = () => {
  const { baseUrl} = useContext(authContext);
  const navigate = useNavigate();

  const handleAddCart = (cartItem) => {
    // cartItem={
    //   userId,
    // course_id
    // }
    fetch(`${baseUrl}/cart`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
  const handleAddWishList = (wishItem) => {
      fetch(`${baseUrl}/wish`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
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
  const handleCartRemove=(stdId,crsId)=>{
        fetch(`${baseUrl}/cart/${stdId}?crsId=${crsId}`, {
        method: "DELETE",
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
  const handleWishRemove=(stdId,crsId)=>{
        fetch(`${baseUrl}/wish/${stdId}?crsId=${crsId}`, {
        method: "DELETE",
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
  const handleAddOrder = async ({userId,courseId}) => {
   try {
    // orderItem={
    //   userId,
    //   courseId,
    // }
    console.log(userId,courseId);
    const res = await fetch(`${baseUrl}/order/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId,courseId}),
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
