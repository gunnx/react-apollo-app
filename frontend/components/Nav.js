import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUser from '../lib/useUser';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

function Nav() {
  const { logout, user } = useUser();
  const { openCart } = useCart();

  const numCartItems = user?.cart?.reduce(
    (acc, item) => acc + (item?.product ? item.quantity : 0),
    0
  );

  return (
    <NavStyles>
      {user ? (
        <>
          <Link href="/products">Products</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button onClick={logout}>Logout</button>
          <button type="button" onClick={openCart}>
            My Cart <CartCount count={numCartItems} />
          </button>
        </>
      ) : (
        <>
          <Link href="/products">Products</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </NavStyles>
  );
}

export default Nav;
