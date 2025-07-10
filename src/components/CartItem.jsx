import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const OrderPage = () => {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left: User Info Placeholder */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaShoppingCart className="text-blue-600" />
            Checkout
          </h2>

          {/* You can add user info/billing here later */}
          <p className="text-sm text-gray-500">Please confirm your order.</p>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-6">
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Your Order</h3>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3"
              >
                <div>
                  <p className="font-medium">{item.course_name}</p>
                  <p className="text-sm text-gray-500">
                    Instructor: {item.instructor}
                  </p>
                </div>
                <p className="font-bold text-purple-700">${item.price}</p>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between text-sm font-semibold">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">
            Process to Payment →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
