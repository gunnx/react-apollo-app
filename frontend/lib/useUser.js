import { useQuery, gql, useMutation } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            name
            description
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

const LOGOUT_USER_MUTATION = gql`
  mutation LOGOUT_USER_MUTATION {
    endSession
  }
`;

function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  const [logout] = useMutation(LOGOUT_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return { logout, user: data?.authenticatedItem };
}

export default useUser;
