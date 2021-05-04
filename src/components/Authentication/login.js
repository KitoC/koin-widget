import { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormBuilder } from "../Form";
import styled from "styled-components";
import api, { endpoint } from "../../_config/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/authentication/authenticationSlice.js";
import getError from "../../utils/getError";

const Container = styled.div(({ theme }) => ({
  ...theme.utils.flexCenter,
  ...theme.utils.fitParent,
}));

const Card = styled.div(({ theme }) => {
  return {
    maxWidth: "400px",
    minWidth: "350px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: theme.bRadius.l,
    borderRadius: theme.bRadius.s,
    display: "flex",
    flexDirection: "column",
  };
});

const StyledLink = styled(Link)(({ theme }) => {
  return {
    marginTop: "1rem",
  };
});

const validateEmail = ({ email }) => {
  if (!email) {
    return "Required";
  }

  return undefined;
};

const validatePassword = ({ password }) => {
  if (!password) {
    return "Required";
  }

  return undefined;
};

const formConfig = ({ dispatch, history }) => ({
  title: "Sign in",
  validateOnChange: false,
  validate: (values) => {
    const errors = {};

    errors.email = validateEmail(values);
    errors.password = validatePassword(values);

    return errors;
  },
  onSubmit: async (values, actions) => {
    try {
      actions.setSubmitting(true);

      const { data } = await api.post(
        endpoint.api.v1.authentication.login,
        values
      );

      dispatch(login(data.data.token));

      history.push("/");
    } catch (error) {
      const submissionError = getError(error).message;

      actions.setErrors({ submissionError });
    }
  },
  buttons: [
    {
      text: "Sign In",
      props: { block: true, appearance: "primary", type: "submit" },
    },
  ],
  sections: [
    {
      fields: [
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
      ],
    },
  ],
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const config = useMemo(() => formConfig({ dispatch, history }), [
    dispatch,
    history,
  ]);

  return (
    <Container>
      <Card shaded>
        <FormBuilder formConfig={config} />
        <StyledLink to={`/auth/register`}>
          Need an account? Register now.
        </StyledLink>
      </Card>
    </Container>
  );
};

export default Login;
