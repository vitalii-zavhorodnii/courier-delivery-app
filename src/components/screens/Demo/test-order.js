const orders = [
  {
    address: {
      apartment: '',
      city: 'Львів',
      comment: 'Львів, Садибна вул., дім 44',
      entrance: '',
      floor: '5',
      home: '44',
      housing: '1',
      index: '',
      street: 'Садибна вул.',
    },
    comment:
      'Мобільний Додаток; | Можете не телефонувати мені для підтвердження замовлення',
    customer: {name: 'Роман', phone: '+38099000000'},
    delivery_terminal_id: '77e9b916-6bb3-32aa-0171-0490af7c04a1',
    expected_delivery_at: '2021-11-08 11:12:02',
    items: [
      {
        name: 'Преміум Кілограм',
        amount: 1,
        sum: 609,
        comment: null,
      },
    ],
    order_id: 4489,
    order_uuid: '72c985c2',
    payment: {
      code: 'CASH',
      title: 'Наличные',
      sum: 609,
      prepareChangeFrom: 700,
    },
    restaurant: 'smaki',
    status: 'waiting',
  },
  {
    address: {
      apartment: '',
      city: 'Львів',
      comment: 'Львів, Богдана Хмельницького вул., дім 33',
      entrance: '',
      floor: '',
      home: '33',
      housing: '',
      index: '',
      street: 'Богдана Хмельницького вул.',
    },
    comment:
      'Мобільний Додаток; | Можете не телефонувати мені для підтвердження замовлення',
    customer: {name: 'Марина', phone: '+38099000000'},
    delivery_terminal_id: '77e9b916-6bb3-32aa-0171-0490af7c04a1',
    expected_delivery_at: '2021-11-08 11:19:02',
    items: [
      {
        name: 'Преміум Кілограм',
        amount: 1,
        sum: 609,
        comment: null,
      },
    ],
    order_id: 1305,
    order_uuid: '72c985c1-299a-d227-09af-7067edb2e65d',
    payment: {
      code: 'CASH',
      title: 'Онлайн',
      sum: 210,
      prepareChangeFrom: 700,
    },
    restaurant: 'smaki',
    status: 'waiting',
  },
  {
    address: {
      apartment: '',
      city: 'Львів',
      comment: 'Львів, Центральна вул., дім 211',
      entrance: '1',
      floor: '1',
      home: '34',
      housing: '34',
      index: '',
      street: 'Центральна вул.',
    },
    comment:
      'Мобільний Додаток; | Можете не телефонувати мені для підтвердження замовлення',
    customer: {name: 'Артур', phone: '+38099000000'},
    delivery_terminal_id: '77e9b916-6bb3-32aa-0171-0490af7c04a1',
    expected_delivery_at: '2021-11-08 11:23:02',
    items: [
      {
        name: 'Преміум Кілограм',
        amount: 1,
        sum: 609,
        comment: null,
      },
    ],
    order_id: 2101,
    order_uuid: '72c985c4299a-d227-09af-7067edb2e65d',
    payment: {
      code: 'CARD',
      title: 'Карта',
      sum: 445,
      prepareChangeFrom: 700,
    },
    restaurant: 'go',
    status: 'waiting',
  },
];

export default orders;
