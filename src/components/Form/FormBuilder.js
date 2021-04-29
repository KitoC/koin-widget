import { Formik, Field, Form } from "formik";
import { MessageBox, Button } from "../UI";
import getComponent from "./getComponent";
import styled from "styled-components";
import classNames from "classnames";

const StyledForm = styled(Form)(({ theme }) => ({
  "& .form-title": {
    marginBottom: theme.spacings.m,
  },
}));

const FormField = (props) => {
  return <Field {...props} component={getComponent(props.component)} />;
};

const FormSection = ({ section }) => {
  return section.fields.map((field) => (
    <FormField key={field.name} {...field} />
  ));
};

const getInitialValues = (formConfig) => {
  const initialValues = {};

  formConfig.sections.forEach((section) =>
    section.fields.forEach((field) => {
      initialValues[field.name] = field.initialValue || "";
    })
  );

  return initialValues;
};

const FormBuilder = ({ formConfig }) => {
  const initialValues = getInitialValues(formConfig);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formConfig.onSubmit}
      validate={(...args) => {
        let errors = {};

        if (formConfig.validate) {
          errors = formConfig.validate(...args);

          Object.keys(errors).forEach((key) => {
            if (!errors[key]) {
              delete errors[key];
            }
          });
        }

        return errors;
      }}
      validateOnChange={formConfig.validateOnChange}
    >
      {(props) => {
        const { errors } = props;

        return (
          <StyledForm>
            {formConfig.title && (
              <h4 className={classNames("form-title")}>{formConfig.title}</h4>
            )}

            {formConfig.sections.map((section, index) => (
              <FormSection key={section.name || index} section={section} />
            ))}

            {errors.submissionError && (
              <MessageBox type="error" description={errors.submissionError} />
            )}

            {formConfig.buttons.map((button) => (
              <Button
                disabled={props.isSubmitting}
                key={button.text}
                {...button.props}
              >
                {button.text}
              </Button>
            ))}
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default FormBuilder;
