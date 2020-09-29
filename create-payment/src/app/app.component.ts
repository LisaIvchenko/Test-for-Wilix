import {Component, OnInit} from '@angular/core';
import {emptyMonths, IMonthPayment, IPayment, months, payments} from './data';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentsService} from './payments.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public payments: IPayment[];
  public months = months;
  public total$ = new BehaviorSubject<number>(0);
  public formPayment: FormGroup;

  constructor(private paymentsService: PaymentsService) {
  }

  public ngOnInit(): void {
    this.getPayments();
    this.getTotal();
    this.formPayment = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.pattern(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/),
        Validators.required,
      ])
    });
  }

  public getPayments(): void {
    this.paymentsService.getPayments().subscribe(
      res => this.payments = res
    );
  }

  public getTotal(): void {
    this.total$.next(this.paymentsService.getTotal());
  }

  public changePayment(event, payment: IPayment, monthCheckbox: IMonthPayment): void {
    this.paymentsService.changePayment(event.target.checked, payment, monthCheckbox.monthNum);
    this.getTotal();
    this.getPayments();
  }

  public deletePayment(payment: IPayment): void {
    this.paymentsService.deletePayment(payment);
    this.getTotal();
    this.getPayments();
  }

  public createPayment(): void {
    if (this.formPayment.valid) {
      this.paymentsService.createPayment(this.formPayment);
      this.formPayment.reset();
    }
    this.getPayments();
    this.getTotal();
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
