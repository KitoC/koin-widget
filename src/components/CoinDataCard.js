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
          <h4 className="bold">
            {shortName} - ${rate}
          </h4>
        </div>

        <div className="section flex p1">
          <Amount
            precision={null}
            profit={profit}
            label="balance"
            amount={balance}
          />

          {/* <Amount
            precision={null}
            profit={profit}
            prefix="$"
            label="rate"
            amount={rate}
          /> */}
          <Amount
            profit={profit}
            prefix="$"
            label="Value"
            amount={audbalance}
          />
        </div>

        <div className="section flex p1">
          <Amount
            profit={profit}
            prefix="$"
            label="spent to date"
            amount={Math.abs(total_aud_spent)}
          />
          <Amount
            profit={profit}
            prefix="$"
            label="profit to date"
            amount={profit}
          />
          <Amount
            profit={profit}
            affix="%"
            label="change to date"
            amount={percentage_difference}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDataCard;
