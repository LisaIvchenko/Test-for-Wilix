import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';
import { IPayment, payments } from '../data';
import { PaymentsService } from '../payments.service';
import { By } from '@angular/platform-browser';

describe('TableRowComponent', () => {
  let fixture: ComponentFixture<TableRowComponent>;
  let service: PaymentsService;
  let component;
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
    component = fixture.componentInstance;
    service = TestBed.inject(PaymentsService);
    fixture.detectChanges();
    dummyPayments = [...payments];
    component.payment = Object.assign({}, dummyPayments[0]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('при нажатии на input.change-payment-checkbox ' +
    'должен вызываться метод changePayment, внутри которого происходит обращение к методу changePayment в service ',
    () => {
      // arrange
      fixture.detectChanges();
      spyOn(component, 'changePayment').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('input.change-payment-checkbox'))[0];

      // act
      checkbox.nativeElement.click();

      // assert
      expect(component.changePayment).toHaveBeenCalled();
      expect(service.changePayment).toHaveBeenCalled();
    });

  it('при нажатии на button.delete-btn ' +
    'должен вызываться метод deletePayment, внутри которого происходит обращение к методу deletePayment в service ',
    () => {
      // arrange
      fixture.detectChanges();
      spyOn(component, 'deletePayment').and.callThrough();
      const checkbox = fixture.debugElement.queryAll(By.css('.delete-btn'))[0];

      // act
      checkbox.nativeElement.click();

      // assert
      expect(component.deletePayment).toHaveBeenCalled();
      expect(service.deletePayment).toHaveBeenCalled();
    });
});
