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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPayments()', () => {
    service.getPayments().subscribe(res => {
      expect(res).toEqual(dummyPayments);
    });
  });

  it('countTotalOfPayment()', () => {
    expect(service.countTotalOfPayment(dummyMonthsData, 2)).toBe(62);
  });

  it('countTotalOfPayment()', () => {
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
    expect(service.getTotal()).toBe(21700);
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
