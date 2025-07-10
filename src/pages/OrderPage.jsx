// import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
// import { authContext } from '../context/AuthProvider';
// import OrderItem from '../components/OrderItem';

// const OrderPage = () => {
//   const location = useLocation();
//   const { cart, total } = location.state || { cart: [], total: 0 };
//   const { courses } = useContext(authContext);

//   const orderedCourses = cart
//     .map((item) => courses.find((course) => course.course_id === item.course_id))
//     .filter(Boolean);

//   return (
//     <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

//         {/* ✅ Left Column: User Info & Billing */}
//         <div>
//           <div className="col-span-2 flex items-center gap-2 mb-6">
//             <FaShoppingCart className="text-2xl text-blue-600" />
//             <h2 className="text-3xl font-bold">Checkout</h2>
//           </div>

//           {/* Email */}
//           <div className="mb-6">
//             <label className="block mb-2 font-semibold">Email</label>
//             <input type="email" placeholder="you@example.com" className="w-full p-3 border rounded" />
//             <label className="flex items-center mt-2">
//               <input type="checkbox" className="mr-2" />
//               <span className="text-sm">Please send me emails with exclusive info</span>
//             </label>
//           </div>

//           {/* Billing Fields */}
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input type="text" placeholder="First name" className="p-3 border rounded w-full" />
//               <input type="text" placeholder="Last name" className="p-3 border rounded w-full" />
//             </div>
//             <input type="text" placeholder="Country (Optional)" className="p-3 border rounded w-full" />
//             <input type="text" placeholder="Mobile number" className="p-3 border rounded w-full" />
//             <label className="flex items-center mt-2">
//               <input type="checkbox" className="mr-2" />
//               <span className="text-sm">Create an account</span>
//             </label>
//             <input type="password" placeholder="Password" className="p-3 border rounded w-full" />
//           </div>
//         </div>

//         {/* ✅ Right Column: Order Summary */}
//         <div className="space-y-6">
//           <div className="border rounded p-4">
//             <h3 className="text-lg font-semibold mb-4">Your Order</h3>

//             {/* Render Ordered Courses */}
//             {orderedCourses.map((course, idx) => (
//               <OrderItem key={idx} course={course} />
//             ))}

//             {/* Totals */}
//             <hr className="my-2" />
//             <div className="flex justify-between text-sm text-gray-600">
//               <p>Subtotal</p>
//               <p>${total}</p>
//             </div>
//             <div className="flex justify-between text-sm font-bold">
//               <p>Total</p>
//               <p>${total}</p>
//             </div>

//             <button className="text-blue-500 text-sm mt-2 hover:underline">
//               Redeem Coupon
//             </button>
//           </div>

//           {/* Payment Method */}
//           <div className="border rounded p-4">
//             <h3 className="text-lg font-semibold mb-4">Payment method</h3>
//             <div className="space-y-3">
//               <label className="flex items-center">
//                 <input type="radio" name="payment" className="mr-2" />
//                 PayPal
//               </label>
//               <label className="flex items-center">
//                 <input type="radio" name="payment" className="mr-2" />
//                 Credit/Debit Card
//               </label>
//               <input type="text" placeholder="Card number" className="p-3 border rounded w-full" />
//               <div className="grid grid-cols-2 gap-4">
//                 <input type="text" placeholder="MM/YY" className="p-3 border rounded w-full" />
//                 <input type="text" placeholder="CVC" className="p-3 border rounded w-full" />
//               </div>
//             </div>
//           </div>

//           <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">
//             Process to payment →
//           </button>

//           <p className="text-xs text-gray-500 mt-2">
//             Your personal data will be used to process your order, support your experience, and for other purposes described in our <a href="#" className="underline">privacy policy</a>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { authContext } from '../context/AuthProvider';
import OrderItem from '../components/OrderItem';
import  bKAsh from '../assets/bKasht.jpg';
import rocket from '../assets/rocket.png';

const OrderPage = () => {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };
  const { courses } = useContext(authContext);

  const orderedCourses = cart
    .map((item) => courses.find((course) => course.course_id === item.course_id))
    .filter(Boolean);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* ✅ Left Column: Personal Info + Order Summary */}
        <div>
          {/* Checkout Heading */}
          <div className="col-span-2 flex items-center gap-2 mb-6">
            <FaShoppingCart className="text-2xl text-blue-600" />
            <h2 className="text-3xl font-bold">Checkout</h2>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full p-3 border rounded" />
            <label className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Please send me emails with exclusive info</span>
            </label>
          </div>

          {/* Billing Fields */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="p-3 border rounded w-full" />
              <input type="text" placeholder="Last name" className="p-3 border rounded w-full" />
            </div>
            <input type="text" placeholder="Country (Optional)" className="p-3 border rounded w-full" />
            <input type="text" placeholder="Mobile number" className="p-3 border rounded w-full" />
            <label className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Create an account</span>
            </label>
            <input type="password" placeholder="Password" className="p-3 border rounded w-full" />
          </div>

          {/* ✅ Your Order Section (moved under form) */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Your Order</h3>

            {orderedCourses.map((course, idx) => (
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
        <div className="space-y-6">
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Payment method</h3>
            <div className="space-y-3">

              {/* Bkash */}
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-pink-600" />
                 <img src={bKAsh} alt="Logo" className="w-6 h-6"/>
      
                <span className="text-sm">Bkash</span>
              </label>

              {/* Rocket */}
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-purple-600" />
                <img
        src={rocket}
        alt="Rocket"
        className="w-6 h-6"
      />
                <span className="text-sm">Rocket</span>
              </label>

              <input type="text" placeholder="Bkash / Rocket number" className="p-3 border rounded w-full" />
              <input type="text" placeholder="Transaction ID (if applicable)" className="p-3 border rounded w-full" />
            </div>
          </div>


             <label className="flex items-center">
                 <input type="radio" name="payment" className="mr-2" />
                 Credit/Debit Card
              </label>
              <input type="text" placeholder="Card number" className="p-3 border rounded w-full" />
               <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="MM/YY" className="p-3 border rounded w-full" />
                 <input type="text" placeholder="CVC" className="p-3 border rounded w-full" />

</div>
          <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">
            Process to payment →
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Your personal data will be used to process your order, support your experience, and for other purposes described in our <a href="#" className="underline">privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
