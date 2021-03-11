import { useRouter } from 'next/router';
import UpdateProduct from '../components/UpdateProduct';

function UpdatePage() {
  const router = useRouter();
  const id = router.query?.id;
  return id ? <UpdateProduct id={id} /> : null;
}

export default UpdatePage;
