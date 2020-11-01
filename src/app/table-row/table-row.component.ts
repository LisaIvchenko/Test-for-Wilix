import { Component, Input } from '@angular/core';
import { IPayment } from '../data';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {

  @Input() public payment: IPayment;

  constructor(private paymentsService: PaymentsService) {
  }

  public changePayment(id: number, monthNum: number): void {
    this.paymentsService.changePayment(id, monthNum);
  }

  public deletePayment(id: number): void {
    this.paymentsService.deletePayment(id);
  }
}
