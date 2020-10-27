import {Component, OnInit} from '@angular/core';
import {IPayment, months} from './data';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentsService} from './payments.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public payments: IPayment[];
  public months = months;
  public total = 0;
  public formPayment: FormGroup;

  constructor(private paymentsService: PaymentsService) {
    this.createForm();
  }

  public ngOnInit(): void {
    this.updateTable();
  }

  public createForm(): void {
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
    this.total = this.paymentsService.getTotal();
  }

  public createPayment(): void {
    if (this.formPayment.valid) {
      this.paymentsService.createPayment(this.formPayment.value);
      this.formPayment.reset();
    }
    this.updateTable();
  }

  public updateTable(): void {
    this.getPayments();
    this.getTotal();
  }
}
