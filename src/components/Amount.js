import round from "lodash/round";

const isIncrease = (number) => !(number < 0);

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
  const { amount, label, profit, prefix, affix, precision = 2 } = props;

  const value = precision ? round(amount, precision) : amount;

  return (
    <p className="amount bold">
      {label && <span className="label">{label} </span>}

      <span className={getAmountClass(profit)}>
        {prefix}
        {value}
        {affix}
      </span>
    </p>
  );
};

export default Amount;
