export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(Math.round(value));

export const formatPercent = (value: number, digits = 1) =>
  `${value.toFixed(digits)}%`;
