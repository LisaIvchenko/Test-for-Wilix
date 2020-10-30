import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMonthPayment, IPayment } from '../data';
import { PaymentsService } from '../payments.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  public changePayment(id: number, monthNum: number): void {
    this.paymentsService.changePayment(id, monthNum);
    this.updateTable.emit();
  }

  public deletePayment(id: number): void {
    this.paymentsService.deletePayment(id);
    this.updateTable.emit();
  }
}
