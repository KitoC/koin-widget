import get from "lodash/get";
import startCase from "lodash/startCase";
import { useEffect, useState } from "react";
import { SelectPicker, Input } from "rsuite";
import Amount from "./Amount";
import CoinDataCard from "./CoinDataCard";

const createOptions = (label) => [
  { label: `${startCase(label)} -- ASC`, value: `${label}:ASC` },
  { label: `${startCase(label)} -- DSC`, value: `${label}:DSC` },
];

const options = [
  ...createOptions("aud_balance"),
  ...createOptions("profit"),
  ...createOptions("balance"),
  ...createOptions("aud_spent"),
  ...createOptions("rate"),
  ...createOptions("difference"),
];

const keyMapping = {
  balance: "balance",
  aud_balance: "audbalance",
  aud_spent: "total_aud_spent",
  profit: "profit",
  rate: "rate",
  difference: "percentage_difference",
};

const OverView = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(options[0].value);

  const sortBalances = (current, next) => {
    const [key, direction] = filterValue.split(":");
    const isAscending = direction === "ASC";
    const KEY = keyMapping[key] || key;

    if (current[KEY] > next[KEY]) {
      return isAscending ? -1 : +1;
    }

    return isAscending ? +1 : -1;
  };

  const sortedBalances = get(data, "balances", [])
    .sort(sortBalances)
    .filter((balance) =>
      balance.shortName.toLowerCase().includes(searchValue.toLowerCase())
    );

  const {
    total_coin_balance_in_aud = 0,
    total_profit = 0,
    total_aud_spent = 0,
    total_percentage_difference = 0,
  } = data || {};

  return (
    <>
      <div className="overview">
        <div className="totals-container">
          <div className="totals balance flex-center">
            <Amount
              prefix="$"
              label="total balance"
              className="large"
              profit={total_coin_balance_in_aud}
              amount={total_coin_balance_in_aud}
            />
          </div>

          <div className="totals flex-between">
            <Amount
              showColor
              prefix="$"
              label="spent to date"
              className="medium"
              profit={-Math.abs(total_aud_spent)}
              amount={Math.abs(total_aud_spent)}
            />
            <Amount
              showColor
              prefix="$"
              label="profit to date"
              className="medium"
              profit={total_profit}
              amount={total_profit}
            />
            <Amount
              showColor
              affix="%"
              label="change to date"
              className="medium"
              profit={total_percentage_difference}
              amount={total_percentage_difference}
            />
          </div>
        </div>

        <div className="inputs">
          <Input
            placeholder="search"
            value={searchValue}
            onChange={setSearchValue}
          />

          <SelectPicker
            value={filterValue}
            searchable={false}
            cleanable={false}
            onChange={setFilterValue}
            data={options}
          />
        </div>
      </div>

      <div className="coin-data-container flex-auto">
        {sortedBalances.map((coin) => (
          <CoinDataCard key={coin.shortName} coin={coin} />
        ))}
      </div>
    </>
  );
};

export default OverView;
