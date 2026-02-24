export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const formatCurrencyFull = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

export const formatPercent = (n: number, decimals = 1) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
  }).format(n / 100);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(Math.round(n));

export const formatCompact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
