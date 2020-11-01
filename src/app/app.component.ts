import { Component, OnInit } from '@angular/core';
import { IPayment, months } from './data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from './payments.service';
import { amountValidator } from './validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public payments: IPayment[];
  public months = months;
  public total: number;
  public formPayment: FormGroup;

  constructor(private paymentsService: PaymentsService) {
    this.payments = this.paymentsService.payments;
    this.total = this.paymentsService.total;
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
    this.paymentsService.paymentsChange$.subscribe(
      res => {
        this.payments = res;
        this.total = this.paymentsService.total;
      }
    );
  }

  public createPayment(): void {
    this.paymentsService.createPayment(this.formPayment.value);
    this.formPayment.reset();
  }
}
