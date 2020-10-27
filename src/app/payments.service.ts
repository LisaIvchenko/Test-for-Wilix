import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IMonthPayment, IPayment, payments, emptyMonths} from './data';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  public total = 0;
  public payments = payments;
  public emptyMonths = emptyMonths;

  public getPayments(): Observable<IPayment[]> {
    return of(this.payments);
  }

  public getTotal(): number {
    return this.payments.reduce((acc, prev) => acc + this.countTotalOfPayment(prev.months, prev.price), 0);
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

  public deletePayment(payment: IPayment): void {
    this.total -= this.countTotalOfPayment(payment.months, payment.price);
    this.payments = this.payments.filter(el => el.title !== payment.title);
  }

  public createPayment(formPayment: {title: string; price: number}): void {
    const newPayment: IPayment = {...formPayment, months: this.emptyMonths};
    this.payments.push(newPayment);
  }

  public changePayment(checkbox: boolean, payment: IPayment, monthNum: number): void {
    const paymentIndex = this.payments.findIndex(obj => obj.title === payment.title);
    const newMonthValue = {
      isPayed: checkbox,
      monthNum,
    };
    const changedMonth = payment.months.map(el => el.monthNum === monthNum ? newMonthValue : el);
    this.payments[paymentIndex] = {...payment, months: changedMonth};
  }
}
