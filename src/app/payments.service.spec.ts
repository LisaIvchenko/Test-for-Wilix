import { TestBed } from '@angular/core/testing';
import { PaymentsService } from './payments.service';
import { IMonthPayment, IPayment, payments } from './data';

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
    service.payments = [
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPayments() возвращает Observable<IPayment[]>', () => {
    // service.payments = [...dummyPayments];
    // console.log(service.payments)
    service.getPayments().subscribe(res => {
      console.log(res)
      console.log(dummyPayments)
      expect(res).toEqual(dummyPayments);
    });
  });

  it('countTotalOfPayment() получает информацию о 12 месяцах оплаты конкретной услуги и корректно считает сумму платежей', () => {
    const totalOfPayment = 18600;
    expect(service.countTotalOfPayment(dummyPayments[0].months, dummyPayments[0].price)).toBe(totalOfPayment);
  });

  it('getTotal() корректно считает сумму всех платежей за все услуги', () => {
    const total = 21700;
    // service.payments = [...dummyPayments];
    service.getTotal().subscribe(res => expect(res).toBe(total));
  });

  it('deletePayment() удаляет строку по имени', () => {
    const deleteId = dummyPayments[0].id;
    // service.payments = [...dummyPayments];
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
    console.log(service.payments);
    expect(service.payments.length).toBe(1);
    expect(service.payments[0].title).toBe('test payment');
    expect(service.payments.filter(el => el.id === id).length).toBe(1);
  });

  it('daysInMonth возвращает верное количество дней в месяцах', () => {
    const year = new Date().getFullYear();
    expect(service.daysInMonth(1)).toBe(31);
  });
});
