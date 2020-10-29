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
        {
          provide: PaymentsService,
          useValue: service,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });


  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('компонент должен иметь метод ngOnInit', () => {
    // arrange
    const app = fixture.componentInstance;

    // act
    app.ngOnInit();

    // assert
    expect(app.ngOnInit).toBeTruthy();
  });

  it('getPayments возвращает payments', () => {
    // arrange
    const app = fixture.componentInstance;

    // act
    app.getPayments();

    // assert
    expect(app.payments).toEqual(demoPayments);
  });

  it('getTotal корректно считает сумму всех платежей', () => {
    // arrange
    const app = fixture.componentInstance;

    // act
    app.getTotal();

    // assert
    expect(app.total).toEqual(demoPayments.length);
  });

  it('createPayment создает запись при валидной форме', () => {
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

  it('createPayment не создает запись при невалидной форме', () => {
    // arrange
    const app = fixture.componentInstance;
    app.formPayment.setValue({
      title: 'Test',
      price: '-1',
    });

    // act
    app.createPayment();

    // assert
    expect(service.createdPayment).toBeUndefined();
  });
});
