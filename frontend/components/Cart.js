import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import useUser from '../lib/useUser';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalCartPrice from '../lib/calcTotalCartPrice';
import { useCart } from '../lib/cartState';
import CloseButton from './styles/CloseButton';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

function Cart() {
  const { user } = useUser();
  const { isCartOpen, closeCart } = useCart();
  if (!user) {
    return null;
  }
  return (
    <CartStyles open={isCartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>X</CloseButton>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalCartPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}

const CartItemStyles = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;
    width: 100px;
  }

  h3,
  p {
    margin: 0;
  }
`;

function CartItem(props) {
  const { item } = props;
  const { product } = item;
  return (
    <CartItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * item.quantity)} -{' '}
          <em>
            {item.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={item.id} />
    </CartItemStyles>
  );
}

export default Cart;
