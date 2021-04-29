import { Input, ErrorMessage } from "rsuite";
import get from "lodash/get";
import styled from "styled-components";
import classNames from "classnames";

const InputContainer = styled.div(({ theme }) => ({
  ...theme.utils.flexColumn,
  width: "100%",
  marginBottom: theme.spacings.m,
  "& .input-label": {
    width: "fit-content",
    fontWeight: "bold",
    marginBottom: theme.spacings.xs,
  },
}));

const BelowContainer = styled.div({
  marginTop: "10px",
});

const StyledLabel = styled.label({
  marginBottom: "10px",
  padding: "0 !important",
});

const StyledErrorMessage = styled(ErrorMessage)({
  width: "fit-content !important",
  "& .rs-error-message": {
    width: "fit-content !important",
  },
});

const WrappedInput = ({ field, Below, ...props }) => {
  const onChange = (v, e) => field.onChange(e);
  const error = get(props, `form.errors.${field.name}`);
  const showError = error && get(props, `form.touched.${field.name}`);

  return (
    <InputContainer>
      {props.label && (
        <label className={classNames("input-label")} htmlfor={props.name}>
          {props.label}
        </label>
      )}

      <Input {...field} onChange={onChange} {...props} />

      <div
        className={"rs-form-control-wrapper"}
        style={{ marginBottom: showError ? "1rem" : 0 }}
      >
        <StyledErrorMessage show={showError} placement="bottomStart">
          {error}
        </StyledErrorMessage>
      </div>

      {Below && (
        <BelowContainer>
          <Below />
        </BelowContainer>
      )}
    </InputContainer>
  );
};

export default WrappedInput;
