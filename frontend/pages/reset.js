import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

function ResetPage() {
  const { query } = useRouter();
  const { token } = query;

  return token ? (
    <Reset token={token} />
  ) : (
    <>
      <p>You need to supply a token.</p>
      <RequestReset />
    </>
  );
}

export default ResetPage;
