import { Component, OnInit } from '@angular/core';
import { IPayment, months } from './data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from './payments.service';
import { amountValidator } from './validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public payments$: Observable<IPayment[]>;
  public months = months;
  public total$: Observable<number>;
  public formPayment: FormGroup;

  constructor(private paymentsService: PaymentsService) {
    this.formPayment = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        amountValidator(),
        Validators.required,
      ]),
    });
  }

  public ngOnInit(): void {
    this.getPayments();
  }

  public getPayments(): void {
    this.payments$ = this.paymentsService.getPayments();
    this.total$ = this.paymentsService.getTotal();
  }

  public createPayment(): void {
    this.paymentsService.createPayment(this.formPayment.value);
    this.formPayment.reset();
    this.getPayments();
  }
}
