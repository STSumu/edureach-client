
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const useAddtoList = () => {
  const { baseUrl } = useContext(authContext);
  const navigate = useNavigate();

  const handleAddCart = (cartItem) => {
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

  return {handleAddCart,handleAddWishList,handleCartRemove,handleWishRemove};
};

export default useAddtoList;
