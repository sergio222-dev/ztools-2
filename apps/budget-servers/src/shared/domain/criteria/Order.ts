export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export class Order {
  constructor(public readonly orderBy: string, public readonly orderType: OrderTypes) {}

  static fromValues(orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return Order.none();
    }

    let orderTypeValueEnum: OrderTypes | undefined;

    for (const orderTypeValue of Object.values(OrderTypes)) {
      if (orderType === orderTypeValue.toString()) {
        orderTypeValueEnum = orderTypeValue;
      }
    }

    if (!orderTypeValueEnum) throw new Error('Invalid order type');

    return new Order(orderBy, orderTypeValueEnum);
  }

  static none(): Order {
    return new Order('', OrderTypes.NONE);
  }

  static desc(orderBy: string): Order {
    return new Order(orderBy, OrderTypes.DESC);
  }

  static asc(orderBy: string): Order {
    return new Order(orderBy, OrderTypes.ASC);
  }

  hasOrder() {
    return this.orderType !== OrderTypes.NONE;
  }
}
