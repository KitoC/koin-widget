import round from "lodash/round";
import startCase from "lodash/startCase";
import styled from "styled-components";
import classnames from "classnames";

const StyledAmount = styled.p(({ theme, ...props }) => {
  const { alignment = "center" } = props;

  let alignments = { center: "center", left: "flex-start", right: "flex-end" };

  return {
    ...theme.utils.flexColumn,
    fontSize: "1rem",
    fontWeight: 600,
    alignItems: alignments[alignment],
    "&.large": {
      fontSize: "2rem",
    },
    "&.medium": {
      fontSize: "1.4rem",
    },
    "& .increase": {
      color: theme.colors.increase,
    },
    "& .decrease": {
      color: theme.colors.decrease,
    },
    "& .label": {
      color: "rgba(255, 255, 255, 0.5)",
      textTransform: "uppercase",
      fontSize: "0.7rem",
    },
  };
});

const isIncrease = (number) => !(number < 0);

const numberWithCommas = (x) => {
  const parts = x.toString().split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};

const getAmountClass = (amount) => {
  if (amount === undefined) {
    return "";
  }

  if (isIncrease(amount)) {
    return "increase";
  } else {
    return "decrease";
  }
};

const Amount = (props) => {
  const {
    amount,
    label,
    profit,
    prefix = "",
    affix = "",
    precision = 2,
    size,
    ...rest
  } = props;

  const value = precision ? round(amount, precision) : amount;

  const valueString = `${prefix}${numberWithCommas(value)}${affix}`;

  return (
    <StyledAmount {...rest} className={classnames("amount", "bold", size)}>
      <span className={`value ${getAmountClass(profit)}`}>{valueString}</span>

      {label && <span className="label">{startCase(label)} </span>}
    </StyledAmount>
  );
};

export default Amount;
