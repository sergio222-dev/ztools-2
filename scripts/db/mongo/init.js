ztools = db.getSiblingDB('ztools');

ztools.createCollection('transactions');

transactions = ztools.getCollection('transactions');

transactions.insertMany([
  {
    _id: ObjectId(),
    inflow: 3984,
    outflow: 4391,
    payee: '',
    memo: 'Comida para llevar',
    date: '2022-06-12T17:39:25.000Z',
    createdAt: '2021-08-08T08:12:36.000Z',
    updatedAt: '2022-07-01T19:52:10.000Z',
  },
  {
    _id: ObjectId(),
    inflow: 0,
    outflow: 2956,
    payee: '',
    memo: 'Gasolina',
    date: '2023-01-22T02:18:05.000Z',
    createdAt: '2022-03-10T12:45:57.000Z',
    updatedAt: '2023-01-23T15:26:01.000Z',
  },
  {
    _id: ObjectId(),
    inflow: 0,
    outflow: 2054,
    payee: '',
    memo: 'Compras en línea',
    date: '2022-02-11T19:54:22.000Z',
    createdAt: '2021-12-16T09:24:03.000Z',
    updatedAt: '2022-02-12T06:45:56.000Z',
  },
  {
    _id: ObjectId(),
    inflow: 0,
    outflow: 7142,
    payee: '',
    memo: 'Cena con amigos',
    date: '2021-11-27T06:21:39.000Z',
    createdAt: '2021-06-03T23:57:13.000Z',
    updatedAt: '2021-11-27T08:32:47.000Z',
  },
  {
    _id: ObjectId(),
    inflow: 0,
    outflow: 6034,
    payee: '',
    memo: 'Ropa nueva',
    date: '2022-03-03T09:56:18.000Z',
    createdAt: '2021-07-18T15:24:41.000Z',
    updatedAt: '2022-03-03T15:05:49.000Z',
  },
  {
    _id: ObjectId(),
    inflow: 0,
    outflow: 5483,
    payee: '',
    memo: 'Cine con amigos',
    date: '2021-12-08T11:03:51.000Z',
    createdAt: '2021-04-15T17:28:30.000Z',
    updatedAt: '2021-12-09T00:26:16.000Z',
  },
  {
    _id: ObjectId(),
    inflow: 156,
    outflow: 0,
    payee: '',
    memo: 'Ingreso extra',
    date: '2023-01-12T21:06:35.000Z',
    createdAt: '2021-11-19T08:27:46.000Z',
    updatedAt: '2023-01-14T02:47:22.000Z',
  },
]);
