import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { IMonthPayment, IPayment, payments, emptyMonths } from './data';
import { countTotalOfPayment, generateFalseMonths, generateId } from './utils';
import { concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  public total: number;
  public payments = [...payments];
  paymentsChange$: Subject<IPayment[]> = new Subject<IPayment[]>();

  constructor() {
    this.total = this.countTotal();
    this.paymentsChange$.subscribe(value => {
      this.payments = value;
      this.total = this.countTotal();
    });
  }

  public countTotal(): number {
    return this.payments.reduce((acc, prev) => acc + countTotalOfPayment(prev.months, prev.price), 0);
  }

  public deletePayment(id: number): void {
    this.paymentsChange$.next(this.payments.filter(el => el.id !== id));
  }

  public createPayment(formPayment: { title: string; price: number }): void {
    const newId = generateId(this.payments);
    const falseMonths = generateFalseMonths();
    const newPayment: IPayment = {...formPayment, id: newId, months: falseMonths};
    this.paymentsChange$.next([...this.payments, newPayment]);
  }

  public changePayment(id: number, monthNum: number): void {
    this.paymentsChange$.next(this.payments.map(payment => {
      if (payment.id === id) {
        payment.months[monthNum - 1].isPayed = !payment.months[monthNum - 1].isPayed;
      }
      return payment;
    }));
  }
}
