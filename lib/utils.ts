// lib/utils.ts

export function addCommas(x: any) {
  if (x === undefined) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
