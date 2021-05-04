const sizeUnit = "rem";

const addSizeUnit = (obj) => {
  let withSizeUnit = { ...obj };

  Object.entries(withSizeUnit).forEach(([key, value]) => {
    withSizeUnit[key] = `${value}${sizeUnit}`;
  });

  return withSizeUnit;
};

const theme = {
  //   --spacing-xs: 0.33rem;
  // --spacing-s: 0.5rem;
  // --spacing-m: 1rem;
  // --spacing-l: 1.5rem;
  // --spacing-xl: 2.5rem;
  // --border-radius: 1.2rem;

  // --linear-theme-1: linear-gradient(
  //   -190deg,
  //   rgb(34, 32, 48) 0%,
  //   rgb(13, 13, 26) 50%
  // );

  // --color-theme-1: #0075ce;
  // --theme-bg: rgba(255, 255, 255, 0.05);
  // --color-theme-2: #05386e;
  // --color-increase: rgb(25, 248, 107);
  // --color-decrease: rgb(255, 63, 4);
  // --color-card: var(--theme-bg);
  // --color-inputs: var(--theme-bg);
  gradients: {
    theme1: `linear-gradient(-190deg, rgb(34, 32, 48) 0%, rgb(13, 13, 26) 50%)`,
  },
  colors: {
    theme1: "#0075ce",
    theme2: "#05386e",
    increase: "rgb(25, 248, 107)",
    decrease: "rgb(255, 63, 4)",
    card: "rgba(255, 255, 255, 0.05)",
    // card: "rgba(255, 255, 255, 0.05)",
    themeBG: "rgba(255, 255, 255, 0.05)",
  },
  spacings: addSizeUnit({ xs: 0.33, s: 0.5, m: 1, l: 1.5, xl: 2.5 }),
  bRadius: addSizeUnit({ s: 0.5, m: 1, l: 2 }),

  utils: {
    flexAuto: {
      "-webkit-box-flex": "1",
      "-ms-flex": "1 1 auto",
      flex: "1 1 auto",
      minWidth: "0",
      minHeight: "0",
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
    },
    flexCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    fitParent: {
      height: "100%",
      width: "100%",
    },
  },
};

export default theme;
