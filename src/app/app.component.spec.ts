import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IPayment, payments } from './data';
import { PaymentsService } from './payments.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: MockService;
  let app;

  let dummyPayments: IPayment[];

  class MockService {
    paymentsChange$: Subject<IPayment[]> = new Subject<IPayment[]>();
    public total: number;
    public payments = [...payments];

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
    fixture = TestBed.createComponent(AppComponent);
    dummyPayments = [...payments];
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('ngOnInit создает запись', () => {
    spyOn(service, 'paymentsChange$').and.returnValue(of(response))

    app.ngOnInit();

    // spyOnProperty(service.paymentsChange$,  'subscribe', 'get').and.returnValue({})
    expect(service.paymentsChange$.subscribe()).toHaveBeenCalled();
    expect(app.payments).toBeDefined();
    expect(app.ngOnInit).toBeTruthy();
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
