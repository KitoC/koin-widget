import styled from "styled-components";
import Amount from "./Amount";

const StyledContainer = styled.div(({ theme }) => ({
  background: theme.colors.card,
  boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
}));

const AmountSection = ({ amounts }) => {
  return (
    <div className="section flex p1">
      {amounts.map((amount, index) => {
        return (
          <Amount
            key={amount.label}
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
    // profit,
    // percentage_difference,
    short_name,
    // aud_balance,
    // balance,
    rate,
    // total_aud_spent,
    // total_buy_order_amount,
    // total_sell_order_amount,
    unrealized_profit,
    // fiat_value,
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
      <StyledContainer className="coin-data-card">
        <div className="section flex p1">
          <h4 className="bold">
            {short_name} - ${rate}
          </h4>
          {/* <img
            width="32px"
            src="https://www.coinspot.com.au/public/img/coinmd/ravencoin.png"
          /> */}
        </div>

        {amountSections.map((amountSection, index) => (
          <AmountSection key={index} amounts={amountSection} />
        ))}
      </StyledContainer>
    </div>
  );
};

export default CoinDataCard;
