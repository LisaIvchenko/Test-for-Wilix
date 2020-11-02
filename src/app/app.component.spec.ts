import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IPayment, payments } from './data';
import { PaymentsService } from './payments.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: MockService;
  let app;
  let paymentsService: PaymentsService;

  let dummyPayments: IPayment[];

  class MockService {
    paymentsChange$: Subject<IPayment[]> = new Subject<IPayment[]>();

    public createdPayment: IPayment;

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
    paymentsService = TestBed.inject(PaymentsService);
    fixture = TestBed.createComponent(AppComponent);
    dummyPayments = [...payments];
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('ngOnInit()', () => {
    app.ngOnInit();
    expect(app.ngOnInit).toBeTruthy();
  });

  it('в ngOnInit() происходит подписка на payments и total', () => {
    // act
    app.ngOnInit();
    paymentsService.paymentsChange$.next(payments);

    // assert
    paymentsService.paymentsChange$.subscribe(
      res => {
        expect(res).toEqual(dummyPayments);
        expect(app.payments).toEqual(dummyPayments);
        expect(paymentsService.total).toBeDefined();
      }
    );
  });

  it('createPayment создает запись', () => {
    // arrange
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
