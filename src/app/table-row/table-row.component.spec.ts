import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './table-row.component';
import { IMonthPayment, IPayment } from '../data';
import { Observable, of } from 'rxjs';
import { PaymentsService } from '../payments.service';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TableRowComponent', () => {
  let fixture: ComponentFixture<TableRowComponent>;
  let service: MockService;
  const payment = {
    title: 'Интернет',
    price: 600,
    months: [
      {
        monthNum: 1,
        isPayed: false
      },
      {
        monthNum: 2,
        isPayed: true
      },
      {
        monthNum: 3,
        isPayed: false
      },
      {
        monthNum: 4,
        isPayed: false
      },
      {
        monthNum: 5,
        isPayed: false
      },
      {
        monthNum: 6,
        isPayed: false
      },
      {
        monthNum: 7,
        isPayed: false
      },
      {
        monthNum: 8,
        isPayed: false
      },
      {
        monthNum: 9,
        isPayed: false
      },
      {
        monthNum: 10,
        isPayed: false
      },
      {
        monthNum: 11,
        isPayed: false
      },
      {
        monthNum: 12,
        isPayed: false
      }
    ]
  };

  const demoPayments: IPayment[] = [{
    title: 'Интернет',
    price: 600,
    months: [
      {
        monthNum: 1,
        isPayed: false,
      },
    ],
  }];

  const trueEvent = {
    target: {
      checked: true,
    },
  };

  const falseEvent = {
    target: {
      checked: false,
    },
  };

  const monthPayment: IMonthPayment = {
    monthNum: 1,
    isPayed: false,
  };

  class MockService {
    public createdPayment: IPayment;

    public getPayments(): Observable<IPayment[]> {
      return of(demoPayments) as any;
    }

    public getTotal(): number {
      return demoPayments.length;
    }

    public createPayment(data): void {
      this.createdPayment = data;
    }
  }

  beforeEach(async () => {
    service = new MockService();
    await TestBed.configureTestingModule({
      declarations: [TableRowComponent],
      providers: [
        {provide: PaymentsService, useValue: service},
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TableRowComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('компонент должен иметь метод changePayment', () => {
    const component = fixture.componentInstance;
    expect(component.changePayment).toBeTruthy();
  });

  it('компонент должен иметь метод deletePayment', () => {
    const component = fixture.componentInstance;
    expect(component.deletePayment).toBeTruthy();
  });

  it('компонент должен иметь cобственное событие updateTable ', () => {
    const component = fixture.componentInstance;
    expect(component.updateTable).toBeTruthy();
    expect(component.updateTable).toBeInstanceOf(EventEmitter);
  });

  it('при нажатии на кнопку с селектором .change-payment-checkbox ' +
    'должен вызываться метод changePayment и срабатывать собстевнное событие updateTable',
    () => {
      const component = fixture.componentInstance;
      component.payment = payment;
      fixture.detectChanges();
      spyOn(component, 'changePayment').and.callThrough();
      spyOn(component?.updateTable, 'emit').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('input.change-payment-checkbox'))[0];
      console.log(checkbox);

      checkbox.triggerEventHandler('change', payment.months[0].isPayed);
      expect(component?.changePayment).toHaveBeenCalledTimes(1);
      expect(component?.updateTable.emit).toHaveBeenCalledTimes(1);
    });

  // it('changePayment', () => {
  //   const app = fixture.componentInstance;
  //   app.changePayment(trueEvent, demoPayments[0], monthPayment);
  //   expect(app.total).toEqual(demoPayments.length);
  // });

  // it('should emit on click', () => {
  //   spyOn(component.updateTable, 'emit');
  //
  //   // trigger the click
  //   const nativeElement = fixture.nativeElement;
  //   const button = nativeElement.querySelector('button');
  //   button.dispatchEvent(new Event('click'));
  //
  //   fixture.detectChanges();
  //
  //   expect(component.updateTable.emit).toHaveBeenCalledWith();
  // });
});
