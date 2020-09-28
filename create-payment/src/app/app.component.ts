import {Component, OnInit} from '@angular/core';
import {emptyMonths, IMonthPayment, IPayment, months, payments} from './data';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public payments = payments;
  public months = months;
  public total = 0;
  public emptyMonths = emptyMonths;
  public formPayment: FormGroup;

  constructor() {
  }

  public ngOnInit(): void {
    this.formPayment = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.pattern(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/),
        Validators.required,
      ])
    });
    this.payments.forEach(el => this.total += this.countTotalOfPayment(el.months, el.price));
  }

  public changePayment(event, price: number, monthNum: number): void {
    const monthPayment = this.daysInMonth(monthNum) * price;
    event.currentTarget.checked ? this.total += monthPayment : this.total -= monthPayment;
  }

  public daysInMonth(monthNumber: number): number {
    const year = new Date().getFullYear();
    return new Date(year, monthNumber, 0).getDate();
  }

  public countTotalOfPayment(monthsData: IMonthPayment[], price: number): number {
    return price * monthsData
      .filter(el => el.isPayed)
      .map(el => this.daysInMonth(el.monthNum))
      .reduce((acc, curr) => acc + curr, 0);
  }

  public deletePayment(payment: IPayment): void {
    this.payments = this.payments.filter(el => el.title !== payment.title);
    this.total -= this.countTotalOfPayment(payment.months, payment.price);
  }

  public createPayment(): void {
    if (this.formPayment.valid) {
      const newPayment: IPayment = {...this.formPayment.value, months: this.emptyMonths};
      this.payments.push(newPayment);
      this.formPayment.reset();
    }
  }

  public markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
