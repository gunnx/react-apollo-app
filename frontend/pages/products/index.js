import { useRouter } from 'next/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

function ProductPage() {
  const { query } = useRouter();

  const page = query?.page ?? 1;

  return (
    <>
      <Pagination page={Number(page)} />
      <Products page={Number(page)} />;
      <Pagination page={Number(page)} />
    </>
  );
}

export default ProductPage;
