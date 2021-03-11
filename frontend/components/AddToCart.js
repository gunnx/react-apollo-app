import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../lib/useUser';
import { useCart } from '../lib/cartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;
function AddToCart(props) {
  const { productId } = props;
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      productId,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      type="button"
      onClick={() => {
        addToCart();
        openCart();
      }}
      disabled={loading}
      aria-busy={loading}
    >
      Add{loading && 'ing'} to Cart 🛒
    </button>
  );
}

export default AddToCart;
