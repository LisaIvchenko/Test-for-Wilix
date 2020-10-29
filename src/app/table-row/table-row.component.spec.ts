import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './table-row.component';
import { IPayment } from '../data';
import { PaymentsService } from '../payments.service';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TableRowComponent', () => {
  let fixture: ComponentFixture<TableRowComponent>;
  let service: PaymentsService;
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

  const demoPayments: IPayment[] = [
    {
      title: 'TV',
      price: 100,
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
          isPayed: true
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
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableRowComponent],
      providers: [
        {
          provide: PaymentsService,
          useValue: {
            changePayment: jasmine.createSpy('changePayment'),
            deletePayment: jasmine.createSpy('deletePayment'),
          }
        },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TableRowComponent);
    service = TestBed.inject(PaymentsService);
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

  it('при нажатии на input с селектором .change-payment-checkbox ' +
    'должен вызываться метод changePayment, внутри которого происходит обращение к методу changePayment в service ' +
    'и срабатывает собстевнное событие updateTable',
    () => {
      // arrange
      const component = fixture.componentInstance;
      component.payment = payment;
      fixture.detectChanges();
      spyOn(component, 'changePayment').and.callThrough();
      spyOn(component.updateTable, 'emit').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('input.change-payment-checkbox'))[0];

      // act
      checkbox.nativeElement.click();

      // assert
      expect(component.changePayment).toHaveBeenCalledTimes(1);
      expect(service.changePayment).toHaveBeenCalledTimes(1);
      expect(component.updateTable.emit).toHaveBeenCalledTimes(1);
    });

  it('при нажатии на кнопку с селектором .delete-btn ' +
    'должен вызываться метод deletePayment, внутри которого происходит обращение к методу deletePayment в service ' +
    'и срабатывает собстевнное событие updateTable',
    () => {
      // arrange
      const component = fixture.componentInstance;
      component.payment = payment;
      fixture.detectChanges();
      spyOn(component, 'deletePayment').and.callThrough();
      spyOn(component.updateTable, 'emit').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('.delete-btn'))[0];

      // act
      checkbox.nativeElement.click();

      // assert
      expect(component.deletePayment).toHaveBeenCalledTimes(1);
      expect(service.deletePayment).toHaveBeenCalledTimes(1);
      expect(component.updateTable.emit).toHaveBeenCalledTimes(1);
    });

});
