import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMonthPayment, IPayment, payments, emptyMonths } from './data';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  public total = 0;
  public payments = [...payments];

  public getPayments(): Observable<IPayment[]> {
    return of(this.payments);
  }

  public getTotal(): Observable<number> {
    return of(this.payments.reduce((acc, prev) => acc + this.countTotalOfPayment(prev.months, prev.price), 0));
  }

  public countTotalOfPayment(monthsData: IMonthPayment[], price: number): number {
    return price * monthsData
      .filter(el => el.isPayed)
      .map(el => this.daysInMonth(el.monthNum))
      .reduce((acc, curr) => acc + curr, 0);
  }

  public daysInMonth(monthNumber: number): number {
    const year = new Date().getFullYear();
    return new Date(year, monthNumber, 0).getDate();
  }

  public deletePayment(id: number): void {
    this.payments = this.payments.filter(el => el.id !== id);
  }

  public createPayment(formPayment: { title: string; price: number }): void {
    let newId;
    newId = Math.max.apply(Math, [...this.payments.map(o => o.id), 0]) + 1;

    const falseMonths = new Array(12)
      .fill({
        monthNum: null,
        isPayed: false,
      })
      .map((e, i) => {
        return {
          ...e,
          monthNum: i + 1
        };
      });
    const newPayment: IPayment = {...formPayment, id: newId, months: falseMonths};
    this.payments.push(newPayment);
  }

  public changePayment(id: number, monthNum: number): void {
    this.payments = this.payments.map(payment => {
      if (payment.id === id) {
        payment.months[monthNum - 1].isPayed = !payment.months[monthNum - 1].isPayed;
      }
      return payment;
    });
  }
}
