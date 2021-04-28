import get from "lodash/get";
import startCase from "lodash/startCase";
import { useEffect, useState } from "react";
import { SelectPicker, Input } from "rsuite";
import styled from "styled-components";
import Amount from "./Amount";
import CoinDataCard from "./CoinDataCard";
import Menu from "./Menu";

const StyledContainer = styled.div(({ theme }) => ({
  maxWidth: "1024px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const keyMapping = {
  balance: "balance",
  aud_balance: "aud_balance",
  aud_spent: "total_aud_spent",
  profit: "profit",
  rate: "rate",
  difference: "percentage_difference",
};

const displayedValues = [
  [
    { precision: null, label: "balance" },
    { precision: null, label: "fiat_value", prefix: "$" },
  ],
  [
    { label: "unrealized_profit", prefix: "$" },
    { label: "unrealized_cost_basis", prefix: "$" },
  ],
  [
    { label: "realized_profit", prefix: "$" },
    { label: "realized_cost_basis", prefix: "$" },
  ],
];

const createFilterOptions = (coin) => {
  const createOptions = (label) => [
    { label: `${startCase(label)} -- ASC`, value: `${label}:ASC` },
    { label: `${startCase(label)} -- DSC`, value: `${label}:DSC` },
  ];

  return displayedValues
    .flat()
    .map(({ label }) => createOptions(label))
    .flat();

  return [
    ...createOptions("aud_balance"),
    ...createOptions("profit"),
    ...createOptions("balance"),
    ...createOptions("aud_spent"),
    ...createOptions("rate"),
    ...createOptions("difference"),
  ];
};

const OverView = ({ data }) => {
  const options = createFilterOptions();
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
      balance.short_name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const {
    total_fiat = 0,
    total_unrealized_profit = 0,
    net_fiat_invested = 0,
    total_unrealized_cost_basis = 0,
  } = data || {};

  const totals = [
    [
      {
        prefix: "$",
        label: "total holdings",
        amount: total_fiat,
        profit: total_fiat,
        size: "large",
      },
    ],
    [
      {
        prefix: "$",
        label: "unrealized profit",
        amount: total_unrealized_profit,
        profit: total_unrealized_profit,
        size: "medium",
      },
      {
        prefix: "$",
        label: "unrealized cost basis",
        amount: total_unrealized_cost_basis,
        profit: -total_unrealized_cost_basis,
        size: "medium",
      },
    ],
    [
      {
        prefix: "$",
        label: "net fiat invested",
        amount: net_fiat_invested,
        profit: -net_fiat_invested,
        size: "medium",
      },
    ],
  ];

  return (
    <StyledContainer>
      <div className="overview">
        <div className="totals-container">
          {totals.map((totalSection) => (
            <div
              className={`totals ${
                totalSection.length > 1 ? "flex-between" : "flex-center"
              }`}
            >
              {totalSection.map((total) => (
                <Amount {...total} />
              ))}
            </div>
          ))}
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
          <CoinDataCard
            key={coin.short_name}
            coin={coin}
            displayedValues={displayedValues}
          />
        ))}
      </div>

      <Menu></Menu>
    </StyledContainer>
  );
};

export default OverView;
