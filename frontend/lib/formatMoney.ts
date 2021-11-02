export function formatMoney(money: number): string {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  if (money % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formattor = Intl.NumberFormat('en-US', options);
  return formattor.format(money / 100);
}
