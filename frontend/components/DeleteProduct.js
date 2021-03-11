import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

function DeleteProduct(props) {
  const { id, children } = props;
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update: (cache, payload) => {
      cache.evict(cache.identify(payload.data.deleteProduct));
    },
  });

  async function onClick() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // delete
      await deleteProduct(id).catch((err) => alert(err));
    }
  }

  return (
    <button disabled={loading} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default DeleteProduct;
