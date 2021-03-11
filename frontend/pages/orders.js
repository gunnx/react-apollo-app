import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import OrderStyles from '../components/styles/OrderStyles';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

function countItems(order) {
  const num = order.items.reduce((acc, item) => item.quantity + acc, 0);

  if (num === 1) {
    return `${num} Item`;
  }
  return `${num} Items`;
}

const OrderUL = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function OrdersPage() {
  const router = useRouter();
  const id = router.query?.id;

  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (data) {
    const orders = data.allOrders;
    const totalOrders = orders.length;
    return (
      <>
        <Head>
          <title>Your orders ({orders.length})</title>
        </Head>
        <h2>
          You have {`${totalOrders} ${totalOrders === 1 ? 'Order' : 'Orders'}`}
        </h2>
        <OrderUL>
          {orders.map((order) => {
            const totalProducts = order.items.length;
            return (
              <OrderItemStyles>
                <Link href={`/order/${order.id}`}>
                  <a>
                    <div className="order-meta">
                      <p>{countItems(order)}</p>
                      <p>{`${totalProducts} Product${
                        totalProducts === 1 ? '' : 's'
                      }`}</p>
                      <p>{formatMoney(order.total)}</p>
                    </div>
                    <div className="images">
                      {order.items.map((item) => (
                        <img
                          key={`image-${item.id}`}
                          src={item.photo?.image?.publicUrlTransformed}
                          alt={item.name}
                        />
                      ))}
                    </div>
                  </a>
                </Link>
              </OrderItemStyles>
            );
          })}
        </OrderUL>
      </>
    );
  }

  return null;
}

export default OrdersPage;
