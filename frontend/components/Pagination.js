import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

function Pagination(props) {
  const { page } = props;

  const { data, error, loading } = useQuery(PAGINATION_QUERY);
  const { count } = data?._allProductsMeta ?? 0;
  const pageCount = Math.ceil(count / perPage);

  return !loading ? (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`} passHref>
        <a aria-disabled={page === 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`} passHref>
        <a aria-disabled={page === pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  ) : null;
}

export default Pagination;
