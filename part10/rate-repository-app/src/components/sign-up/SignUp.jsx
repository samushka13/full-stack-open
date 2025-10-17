import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";

import useSignIn from "../../hooks/useSignIn";
import { SIGN_UP } from "../../graphql/mutations";

import SignUpContainer from "./SignUpContainer";

const SignUp = () => {
  const [createUser] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    const user = { username, password };

    try {
      await createUser({ variables: { user } });
      await signIn(user);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
