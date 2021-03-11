import { useRouter } from 'next/router';
import SingleProduct from '../../components/SingleProduct';

function SingleProductPage() {
  const router = useRouter();

  const id = router.query?.id;

  return id ? <SingleProduct id={router.query.id} /> : null;
}

export default SingleProductPage;
