import { TestBed } from '@angular/core/testing';
import { PaymentsService } from './payments.service';
import { IPayment } from './data';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const dummyPayments: IPayment[] = [
    {
      id: 0,
      title: 'Интернет',
      price: 600,
      months: [
        {
          monthNum: 1,
          isPayed: true
        },
        {
          monthNum: 2,
          isPayed: false
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
    },
    {
      id: 1,
      title: 'TV',
      price: 100,
      months: [
        {
          monthNum: 1,
          isPayed: false
        },
        {
          monthNum: 2,
          isPayed: false
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentsService]
    });
    service = TestBed.get(PaymentsService);
    service.payments = [...dummyPayments];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deletePayment() удаляет строку по имени', () => {
    const deleteId = dummyPayments[0].id;
    service.deletePayment(deleteId);
    expect(service.payments.length).toBe(dummyPayments.length - 1);
    expect(service.payments.find(el => el.id === deleteId)).toBeUndefined();
  });

  it('changePayment() изменяет значение заданного чекбокса', () => {
    const changingPayment = dummyPayments[0].id;
    const prevValue = service.payments.filter(el => el.id === changingPayment)[0].months[0].isPayed;
    // service.payments = [...dummyPayments];
    service.changePayment(changingPayment, 1);
    expect(service.payments.filter(el => el.id === changingPayment)[0].months[0].isPayed)
      .toBe(!prevValue);
  });

  it('createPayment() создает новый платеж', () => {
    const id = 1;
    service.payments = [];
    service.createPayment({title: 'test payment', price: 2});
    expect(service.payments.length).toBe(1);
    expect(service.payments[0].title).toBe('test payment');
    expect(service.payments.filter(el => el.id === id).length).toBe(1);
  });
});
