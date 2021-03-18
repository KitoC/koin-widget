import Amount from "./Amount";

const CoinDataCard = ({ coin }) => {
  const {
    profit,
    percentage_difference,
    shortName,
    audbalance,
    balance,
    rate,
    total_aud_spent,
  } = coin;

  return (
    <div className="coin-data">
      <div className="coin-data-card">
        <div className="section flex p1">
          <h4 className="bold">{shortName}</h4>
        </div>

        <div className="section flex p1">
          <Amount
            precision={null}
            profit={profit}
            label="balance"
            amount={balance}
          />
          <Amount profit={profit} prefix="$" label="rate" amount={rate} />
        </div>

        <div className="section flex p1">
          <Amount
            profit={profit}
            prefix="$"
            label="AUD balance"
            amount={audbalance}
          />
          <Amount
            profit={profit}
            prefix="$"
            label="AUD spent"
            amount={total_aud_spent}
          />
          <Amount
            profit={profit}
            prefix="$"
            label="profit"
            amount={profit}
            showColor
          />
          <Amount
            profit={profit}
            affix="%"
            label="difference"
            amount={percentage_difference}
            showColor
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDataCard;
