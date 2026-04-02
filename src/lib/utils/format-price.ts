export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function priceToPence(pounds: number): number {
  return Math.round(pounds * 100);
}

export function penceToPrice(pence: number): number {
  return pence / 100;
}
