import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="text-2xl text-black hover:text-black transition duration-200"
      onClick={() => navigate('/cart')}
    >
      <FaShoppingCart />
    </button>
  );
};

export default CartButton;
