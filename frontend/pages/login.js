import styled from 'styled-components';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

function LoginPage() {
  return (
    <Grid>
      <Login />
      <SignUp />
      <RequestReset />
    </Grid>
  );
}

export default LoginPage;
