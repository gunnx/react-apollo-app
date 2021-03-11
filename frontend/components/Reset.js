import { gql, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';

const PASSWORD_RESET_MUTATION = gql`
  mutation PASSWORD_RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

function Reset(props) {
  const { token } = props;
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    PASSWORD_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await resetPassword();
    } catch (err) {
      console.error(err);
    }
    resetForm();
  }

  const validError = data?.redeemUserPasswordResetToken.code
    ? data.redeemUserPasswordResetToken
    : undefined;

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      {data?.redeemUserPasswordResetToken === null && (
        <p>Password reset. You can now login.</p>
      )}
      <ErrorMessage error={error || validError} />
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
        <label htmlFor="password">
          New Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign up</button>
      </fieldset>
    </Form>
  );
}

export default Reset;
