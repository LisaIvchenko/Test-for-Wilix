import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './table-row.component';
import { IPayment, payments } from '../data';
import { PaymentsService } from '../payments.service';
import { By } from '@angular/platform-browser';

describe('TableRowComponent', () => {
  let fixture: ComponentFixture<TableRowComponent>;
  let service: PaymentsService;

  let dummyPayments: IPayment[];

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
    dummyPayments = [...payments];
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('при нажатии на input с селектором .change-payment-checkbox ' +
    'должен вызываться метод changePayment, внутри которого происходит обращение к методу changePayment в service ' +
    'и срабатывает собстевнное событие updateTable',
    () => {
      // arrange
      const component = fixture.componentInstance;
      component.payment = Object.assign({}, dummyPayments[0]);
      fixture.detectChanges();
      spyOn(component, 'changePayment').and.callThrough();
      spyOn(component.updateTable, 'emit').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('input.change-payment-checkbox'))[0];

      // act
      checkbox.nativeElement.click();

      // assert
      expect(component.changePayment).toHaveBeenCalled();
      expect(service.changePayment).toHaveBeenCalled();
      expect(component.updateTable.emit).toHaveBeenCalled();
    });

  it('при нажатии на кнопку с селектором .delete-btn ' +
    'должен вызываться метод deletePayment, внутри которого происходит обращение к методу deletePayment в service ' +
    'и срабатывает собстевнное событие updateTable',
    () => {
      // arrange
      const component = fixture.componentInstance;
      component.payment = Object.assign({}, dummyPayments[0]);
      fixture.detectChanges();
      spyOn(component, 'deletePayment').and.callThrough();
      spyOn(component.updateTable, 'emit').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('.delete-btn'))[0];

      // act
      checkbox.nativeElement.click();

      // assert
      expect(component.deletePayment).toHaveBeenCalled();
      expect(service.deletePayment).toHaveBeenCalled();
      expect(component.updateTable.emit).toHaveBeenCalled();
    });

});
