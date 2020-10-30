import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';
import { IPayment, payments } from './data';
import { PaymentsService } from './payments.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: MockService;

  let dummyPayments: IPayment[];

  class MockService {
    public createdPayment: IPayment;

    public getPayments(): Observable<IPayment[]> {
      return of(dummyPayments) as any;
    }

    public getTotal(): number {
      return dummyPayments.length;
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
    dummyPayments = [...payments];
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

  it('getPayments', () => {
    // arrange
    const app = fixture.componentInstance;

    // act
    app.getPayments();

    // assert
    expect(app.getPayments).toBeTruthy();
  });

  it('createPayment создает запись', () => {
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
