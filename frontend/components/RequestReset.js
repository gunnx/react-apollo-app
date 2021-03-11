import { gql, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';

const PASSWORD_RESET_REQUEST_MUTATION = gql`
  mutation PASSWORD_RESET_REQUEST_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [requestReset, { data, error, loading }] = useMutation(
    PASSWORD_RESET_REQUEST_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await requestReset();
      console.log('reset', data);
    } catch (err) {
      console.error(err);
    }
    resetForm();
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Request password reset</h2>
      {data?.sendUserPasswordResetLink === null && <p>Reset email sent!</p>}
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
