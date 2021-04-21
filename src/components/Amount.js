import round from "lodash/round";
import startCase from "lodash/startCase";

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
    className,
    label,
    profit,
    prefix,
    affix,
    precision = 2,
  } = props;

  const value = precision ? round(amount, precision) : amount;

  console.log(label, value, amount);

  return (
    <p className={`amount bold  ${className}`}>
      <span className={`value ${getAmountClass(profit)}`}>
        {prefix}
        {numberWithCommas(value)}
        {affix}
      </span>
      {label && <span className="label">{startCase(label)} </span>}
    </p>
  );
};

export default Amount;
