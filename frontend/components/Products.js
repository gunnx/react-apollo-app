import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`;

function Products(props) {
  const { page } = props;
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ProductsList>
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductsList>
  );
}

export default Products;