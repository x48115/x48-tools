const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const formatTokenAmount = (amount) =>
  Number.parseFloat(amount).toFixed(4);

export const formatUsdc = (amount) => formatter.format(amount / 10 ** 6);
