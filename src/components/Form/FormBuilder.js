import { Formik, Field, Form } from "formik";
import { Button } from "rsuite";
import getComponent from "./getComponent";

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
        return (
          <Form>
            {formConfig.sections.map((section, index) => (
              <FormSection key={section.name || index} section={section} />
            ))}

            {formConfig.buttons.map((button) => (
              <Button
                disabled={props.isSubmitting}
                key={button.text}
                {...button.props}
              >
                {button.text}
              </Button>
            ))}
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBuilder;
