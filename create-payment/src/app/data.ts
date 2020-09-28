export interface IPayment {
  title: string;
  price: number;
  months: IMonthPayment[];
}

export interface IMonthPayment {
  monthNum: number;
  isPayed: boolean;
}

export const payments: IPayment[] = [
  {
    title: 'Интернет',
    price: 600,
    months: [
      {
        monthNum: 1,
        isPayed: false,
      },
      {
        monthNum: 2,
        isPayed: true,
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
    ],
  },
  {
    title: 'TV',
    price: 100,
    months: [
      {
        monthNum: 1,
        isPayed: false,
      },
      {
        monthNum: 2,
        isPayed: true,
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
        isPayed: true,
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
    ],
  },
];

export const emptyMonths: IMonthPayment[] = [
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

export const months = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

