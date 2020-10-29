import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';
import { IMonthPayment, IPayment } from './data';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const dummyPayments: IPayment[] = [
    {
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

  const dummyMonthsData: IMonthPayment[] = [
    {
      monthNum: 1,
      isPayed: true,
    },
    {
      monthNum: 2,
      isPayed: false,
    },
    {
      monthNum: 3,
      isPayed: false,
    },
    {
      monthNum: 4,
      isPayed: false,
    },
    {
      monthNum: 5,
      isPayed: false,
    },
    {
      monthNum: 6,
      isPayed: false,
    },
    {
      monthNum: 7,
      isPayed: false,
    },
    {
      monthNum: 8,
      isPayed: false,
    },
    {
      monthNum: 9,
      isPayed: false,
    },
    {
      monthNum: 10,
      isPayed: false,
    },
    {
      monthNum: 11,
      isPayed: false,
    },
    {
      monthNum: 12,
      isPayed: false,
    },
  ];

  const emptyMonths: IMonthPayment[] = [
    {
      monthNum: 1,
      isPayed: false,
    },
    {
      monthNum: 2,
      isPayed: false,
    },
    {
      monthNum: 3,
      isPayed: false,
    },
    {
      monthNum: 4,
      isPayed: false,
    },
    {
      monthNum: 5,
      isPayed: false,
    },
    {
      monthNum: 6,
      isPayed: false,
    },
    {
      monthNum: 7,
      isPayed: false,
    },
    {
      monthNum: 8,
      isPayed: false,
    },
    {
      monthNum: 9,
      isPayed: false,
    },
    {
      monthNum: 10,
      isPayed: false,
    },
    {
      monthNum: 11,
      isPayed: false,
    },
    {
      monthNum: 12,
      isPayed: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPayments()', () => {
    const payments: IPayment[] = [
      {
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
    service.payments = payments;
    service.getPayments().subscribe(res => {
      expect(res).toEqual(payments);
    });
  });

  it('countTotalOfPayment()', () => {
    expect(service.countTotalOfPayment(dummyMonthsData, 2)).toBe(62);
  });

  it('getTotal()', () => {
    const payments: IPayment[] = [
      {
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
    service.payments = payments;
    expect(service.getTotal()).toBe(21700);
  });

  it('deletePayment()', () => {
    const payments: IPayment[] = [
      {
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
    service.payments = payments;
    service.total = 21700;
    service.deletePayment(payments[0]);
    expect(service.payments.length).toBe(1);
    expect(service.payments[0].title).toBe('TV');
  });

  it('changePayment()', () => {
    const payments: IPayment[] = [
      {
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
    service.payments = payments;
    // service.total = 21700;
    service.changePayment(false, payments[0], 1);
    expect(service.payments[0].months[0].isPayed).toBe(false);
  });

  it('createPayment()', () => {
    const payments: IPayment[] = [];
    service.payments = payments;
    service.total = 0;
    service.emptyMonths = emptyMonths;
    service.createPayment({title: 'test payment', price: 2});
    expect(service.payments.length).toBe(1);
    expect(service.payments[0].title).toBe('test payment');
    expect(service.payments[0].months).toEqual(emptyMonths);
  });

  it('daysInMonth возвращает верное количество дней в месяцах', () => {
    const year = new Date().getFullYear();
    expect(service.daysInMonth(1)).toBe(31);
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      expect(service.daysInMonth(2)).toBe(29);
    } else {
      expect(service.daysInMonth(2)).toBe(28);
    }
  });
});
