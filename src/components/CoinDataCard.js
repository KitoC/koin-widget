import Amount from "./Amount";

const AmountSection = ({ amounts }) => {
  return (
    <div className="section flex p1">
      {amounts.map((amount, index) => {
        return (
          <Amount
            alignment={index ? "right" : "left"}
            precision={amount.precision}
            profit={amount.profit}
            label={amount.label}
            amount={amount.amount}
            prefix={amount.prefix}
            affix={amount.affix}
          />
        );
      })}
    </div>
  );
};

const CoinDataCard = ({ coin, displayedValues }) => {
  const {
    profit,
    percentage_difference,
    short_name,
    // aud_balance,
    balance,
    rate,
    // total_aud_spent,
    // total_buy_order_amount,
    // total_sell_order_amount,
    unrealized_profit,
    fiat_value,
  } = coin;

  const amountSections = displayedValues.map((section) =>
    section.map((amount) => ({
      ...amount,
      amount: coin[amount.key || amount.label],
      profit: unrealized_profit,
    }))
  );

  return (
    <div className="coin-data">
      <div className="coin-data-card">
        <div className="section flex p1">
          <h4 className="bold">
            {short_name} - ${rate} (${fiat_value})
          </h4>
          {/* <img
            width="32px"
            src="https://www.coinspot.com.au/public/img/coinmd/ravencoin.png"
          /> */}
        </div>

        {amountSections.map((amountSection) => (
          <AmountSection amounts={amountSection} />
        ))}
      </div>
    </div>
  );
};

export default CoinDataCard;
