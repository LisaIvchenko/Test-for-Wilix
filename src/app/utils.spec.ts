import { emptyMonths, IPayment, payments } from './data';
import { countTotalOfPayment, daysInMonth, generateFalseMonths, generateId } from './utils';

describe('utils', () => {

  let dummyPayments: IPayment[];

  beforeEach(async () => {
    dummyPayments = [...payments];
  });

  it('countTotalOfPayment() получает информацию о 12 месяцах оплаты конкретной услуги и корректно считает сумму платежей', () => {
    const totalOfPayment = 18600;
    expect(countTotalOfPayment(dummyPayments[0].months, dummyPayments[0].price)).toBe(totalOfPayment);
  });

  it('daysInMonth возвращает верное количество дней в месяцах', () => {
    const year = new Date().getFullYear();
    expect(daysInMonth(1)).toBe(31);
    expect(daysInMonth(4)).toBe(30);
  });

  it('daysInMonth возвращает верное количество дней в месяцах', () => {
    const months = emptyMonths;
    expect(generateFalseMonths()).toEqual(months);
  });

  it('daysInMonth возвращает верное количество дней в месяцах', () => {
    const id = dummyPayments.length;
    expect(generateId(dummyPayments)).toEqual(id);
  });
});
