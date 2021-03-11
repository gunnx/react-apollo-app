import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function RemoveFromCart(props) {
  const { id } = props;
  const [removeItem, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
    update(cache, payload) {
      cache.evict(cache.identify(payload.data.deleteCartItem));
    },
    // BELOW: NOT WORKING :(
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });

  return (
    <BigButton
      disabled={loading}
      aria-busy={loading}
      type="button"
      aria-label="Remove item from cart"
      onClick={removeItem}
    >
      x
    </BigButton>
  );
}

export default RemoveFromCart;
