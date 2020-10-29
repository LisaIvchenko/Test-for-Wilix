import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';
import { IPayment } from './data';
import { PaymentsService } from './payments.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: MockService;

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
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: PaymentsService, useValue: service},
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });


  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('компонент должен иметь метод ngOnInit', () => {
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.ngOnInit).toBeTruthy();
  });

  it('getPayments', () => {
    const app = fixture.componentInstance;
    app.getPayments();
    expect(app.payments).toEqual(demoPayments);
  });

  it('getTotal', () => {
    const app = fixture.componentInstance;
    app.getTotal();
    expect(app.total).toEqual(demoPayments.length);
  });

  it('createPayment', () => {
    // arrange
    const app = fixture.componentInstance;
    app.formPayment.setValue({
      title: 'Test',
      price: '123.123',
    });
    expect(app.formPayment.valid).toBeTrue();

    // act
    app.createPayment();

    // assert
    expect(service.createdPayment).toEqual({
      title: 'Test',
      price: '123.123',
    } as any);
  });
});
