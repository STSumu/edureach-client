import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { authContext } from '../context/AuthProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import OrderItem from './../components/cart/OrderItem';
import useFetch from '../functions/fetch';


const OrderPage = () => {
  const { dbUser, baseUrl,getTokenHeader } = useContext(authContext);
  const [total, setTotal] = useState(0);
  const { courses } = useContext(authContext);
  const [items, setItems] = useState([]);
  const [loading,setLoading]=useState(true);
  const [payMethod, setPaymethod] = useState('');
  const disc = 0;
  const navigate = useNavigate();
  const {fetchOrder,fetchOrderTotal}=useFetch();

  useEffect(() => {
    const fetchData=async ()=>{
        const data=await fetchOrder();
        const pendingOnly = data.filter(item => item.status === 'pending');
        setItems(pendingOnly);
        const data2=await fetchOrderTotal();
        setTotal(data2.total);
        setLoading(false);
    }
    fetchData();
  }, [])

  

  const handleSelect = (e) => {
    setPaymethod(e.target.value);
  }
  const handleOrderConfirm = async() => {
    const headers = await getTokenHeader();
    if (!payMethod) {
    Swal.fire({
      icon: 'warning',
      title: 'Select a Payment Method',
      text: 'Please choose a payment method before proceeding.',
    });
    return;
  }
    const confirmItem = {
      stdId: dbUser.user_id,
      method: payMethod,
    }
    fetch(`${baseUrl}/order/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         ...headers,
      },
      body: JSON.stringify(confirmItem)
    })
      .then(res => res.json())
      .then(data => {
        if (data.orderid) {
          navigate('/pay')
        }
      })
  }


  if (loading) {
    return <Loading></Loading>
  }
  const orderItems = courses.filter(course => items.map(item => item.course_id).includes(course.course_id));
  

  return (
    <div className="min-h-screen mt-20 md:mt-9 bg-white">
      <div className="rounded-lg flex flex-col md:flex-row gap-8 mx-4 md:mx-8 lg:mx-16">

        {/* ✅ Left Column: Personal Info + Order Summary */}
        <div className='p-4 md:py-8 w-full md:w-3/5 px-4 md:pl-8 lg:pl-25 md:pr-10'>
          {/* Checkout Heading */}
          <div className="col-span-2 flex items-center gap-2 mb-6">
            <FaShoppingCart className="text-2xl text-[#B14E0F]" />
            <h2 className="text-3xl font-bold">Checkout</h2>
          </div>
          <div className='my-5 space-y-2 border-b border-black/50 py-4'>
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="px-4">
              <label className="block mb-2 font-semibold">Select Payment Method</label>
              <form
                onChange={handleSelect}
                className="border border-gray-300 rounded px-3 py-2 space-y-2"
              >
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="bank" className="radio radio-xs" />
                  Bank
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="online" className="radio radio-xs" />
                  Online
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="card" className="radio radio-xs" />
                  Card
                </label>

                {payMethod && (
                  <p className="text-sm text-gray-600 pt-2">
                    You selected: <strong>{payMethod}</strong>
                  </p>
                )}
              </form>

              {payMethod && (
                <p className="mt-2 text-sm text-gray-600">
                  You selected: <strong>{payMethod}</strong>
                </p>
              )}
            </div>
          </div>

          {/* ✅ Your Order Section (moved under form) */}
          <div className="rounded">
            <h3 className="text-lg font-semibold mb-4">Order details(<span className='font-light text-sm'>{orderItems.length} courses</span>)</h3>

            {orderItems.map((course, idx) => (
              <OrderItem key={idx} course={course} />
            ))}

            <hr className="my-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <p>Total</p>
              <p>${total}</p>
            </div>

            <button className="text-blue-500 text-sm mt-2 hover:underline">
              Redeem Coupon
            </button>
          </div>
        </div>

        {/* ✅ Right Column: Payment Method */}
        <div className="bg-[#F2EEEC] md:h-screen p-4 md:p-10 lg:p-16 md:fixed right-0 w-full md:w-2/5">
          <div className='md:max-w-3/4'>
            <div className="flex mb-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
            </div>
            <div>
              <div className='space-y-4 *:flex *:justify-between my-4 pb-2 border-b border-black/50'>
                <div>
                  <h5>Original Price:</h5>
                  <p>{total}</p>
                </div>
                <div>
                  <h5>Discounts({disc}% off):</h5>
                  <p>{total * disc}</p>
                </div>
              </div>
              <div className='flex justify-between mb-6'>
                <h5>Total:</h5>
                <p>{total + total * disc}</p>
              </div>
            </div>
            <p className='text-xs text-gray-500 mb-2'>By completing your purchase, you agree to these Terms of Use.</p>
            <button onClick={handleOrderConfirm}  className="btn btn-md mt-2 bg-[#B14E0F] w-full text-white py-3 rounded font-semibold hover:bg-white hover:text-[#B14E0F] hover:border-[#B14E0F] border-1 transition">
              Process to payment →
            </button>

            {/* <p className="text-xs text-gray-500 mt-2">
            Your personal data will be used to process your order, support your experience, and for other purposes described in our <a href="#" className="underline">privacy policy</a>.
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
