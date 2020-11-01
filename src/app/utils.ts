import { IMonthPayment, IPayment } from './data';

export function countTotalOfPayment(monthsData: IMonthPayment[], price: number): number {
  return price * monthsData
    .filter(el => el.isPayed)
    .map(el => daysInMonth(el.monthNum))
    .reduce((acc, curr) => acc + curr, 0);
}

export function daysInMonth(monthNumber: number): number {
  const year = new Date().getFullYear();
  return new Date(year, monthNumber, 0).getDate();
}

export function generateFalseMonths(): IMonthPayment[] {
  return new Array(12)
    .fill({
      monthNum: null,
      isPayed: false,
    })
    .map((e, i) => ({...e, monthNum: i + 1}));
}

export function generateId(payments: IPayment[]): number {
  return Math.max(0, ...payments.map(o => o.id)) + 1;
}
