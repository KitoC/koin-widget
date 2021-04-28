import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "rsuite";
import { Formik, Field, Form } from "formik";
import { Input, FormBuilder } from "../Form";
import styled from "styled-components";
import api from "../../_config/api";

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

const formConfig = (props) => ({
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

    console.log({ errors });
    return errors;
  },
  onSubmit: async (values, actions) => {
    console.log({ actions });
    try {
      actions.setSubmitting(true);

      const res = await api.post("/api/v1/authentication/register", values);
    } catch (error) {}
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
  const config = useMemo(() => formConfig());

  return (
    <Container>
      <Card shaded>
        <h4>Create your Account</h4>
        <FormBuilder formConfig={config} />
        <StyledLink to={`/login`}>Have an account already? Sign In.</StyledLink>
      </Card>
    </Container>
  );
};

export default Register;
