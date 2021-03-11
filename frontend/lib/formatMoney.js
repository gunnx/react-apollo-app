function formatMoney(amount = 0) {
  const opts = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  };

  const formatter = Intl.NumberFormat('en-GB', opts);

  return formatter.format(amount / 100);
}

export default formatMoney;
