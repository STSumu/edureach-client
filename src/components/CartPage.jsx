import React from 'react';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const sampleCourse = {
    course_id: 1,
    image: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    rating: 4.7,
    totalRatings: 444377,
    duration: '61.5',
    lectures: 374,
    level: 'All Levels',
    discountPrice: 12.99,
    originalPrice: 74.99,
  };

  const handleRemove = (id) => {
    console.log('Remove', id);
    // TODO: Remove logic
  };

  const handleWishlist = (id) => {
    console.log('Move to Wishlist', id);
    // TODO: Wishlist logic
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <CartItem
        course={sampleCourse}
        onRemove={handleRemove}
        onWishlist={handleWishlist}
      />
    </div>
  );
};

export default CartPage;
