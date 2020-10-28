import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMonthPayment, IPayment } from '../data';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {

  @Input() public payment: IPayment;
  @Output() public updateTable: EventEmitter<any> = new EventEmitter<any>();

  constructor(private paymentsService: PaymentsService) {
  }

  public changePayment(event, payment: IPayment, monthCheckbox: IMonthPayment): void {
    this.paymentsService.changePayment(event.target.checked, payment, monthCheckbox.monthNum);
    this.updateTable.emit();
  }

  public deletePayment(payment: IPayment): void {
    this.paymentsService.deletePayment(payment);
    this.updateTable.emit();
  }
}
