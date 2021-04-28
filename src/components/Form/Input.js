import { Input, ErrorMessage } from "rsuite";
import get from "lodash/get";
import styled from "styled-components";

const StyledErrorMessage = styled(ErrorMessage)({
  width: "fit-content !important",
  "& .rs-error-message": {
    width: "fit-content !important",
  },
});

const WrappedInput = ({ field, ...props }) => {
  const onChange = (v, e) => field.onChange(e);
  const error = get(props, `form.errors.${field.name}`);
  const showError = error && get(props, `form.touched.${field.name}`);

  return (
    <label htmlFor={props.name}>
      {props.label && <span>{props.label}</span>}
      <Input {...field} onChange={onChange} {...props} />

      <div
        className={"rs-form-control-wrapper"}
        style={{ marginBottom: showError ? "1rem" : 0 }}
      >
        <StyledErrorMessage show={showError} placement="bottomStart">
          {error}
        </StyledErrorMessage>
      </div>
    </label>
  );
};

export default WrappedInput;
