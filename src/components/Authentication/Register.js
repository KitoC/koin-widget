import { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { FormBuilder } from "../Form";
import getError from "../../utils/getError";
import { register } from "../../store/authentication/authenticationSlice";

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
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "Invalid email address";
  }

  return undefined;
};

const validatePassword = ({ password }) => {
  if (!password) {
    return "Required";
  }

  return undefined;
};

const validatePasswordConfirm = ({ confirmPassword, password }) => {
  if (confirmPassword !== password) {
    return "Passwords must match";
  }

  return undefined;
};

const formConfig = ({ dispatch, history }) => ({
  title: "Create your account",
  validateOnChange: false,
  validate: (values) => {
    const errors = {};

    errors.email = validateEmail(values);
    errors.password = validatePassword(values);
    errors.confirmPassword = validatePasswordConfirm(values);

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  },
  onSubmit: (values, actions) => {
    actions.setSubmitting(true);

    dispatch(register(values))
      .then(unwrapResult)
      .then(() => {
        history.push("/setup");
      })
      .catch((error) => {
        const submissionError = getError(error).message;

        actions.setErrors({ submissionError });
        actions.setSubmitting(false);
      });
  },
  buttons: [
    {
      text: "Create Account",
      props: { block: true, appearance: "primary", type: "submit" },
    },
  ],
  sections: [
    {
      fields: [
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
        },
      ],
    },
  ],
});

const Register = () => {
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
        <StyledLink to={`/auth`}>Have an account already? Sign In.</StyledLink>
      </Card>
    </Container>
  );
};

export default Register;
