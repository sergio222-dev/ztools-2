import { Document, Filter as MongoFilter } from 'mongodb';

import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, Operator } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order, OrderTypes } from '@shared/domain/criteria/Order';

// type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex';
// type MongoFilterValue = boolean | string | number;
// type MongoFilterOperation = { [operator in MongoFilterOperator]?: MongoFilterValue };
// type MongoFilter = { [field: string]: MongoFilterOperation } | { [field: string]: { $not: MongoFilterOperation } };
type MongoDirection = 1 | -1;
type MongoSort = { [field: string]: MongoDirection };
type MongoDocument = Document;

interface TransformerFunction<T, K> {
  (value: T): K;
}

interface MongoQuery<D> {
  filter: MongoFilter<D>;
  sort: MongoSort;
  skip: number;
  limit: number;
}

export class MongoCriteriaConverter<D extends MongoDocument = MongoDocument> {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, MongoFilter<D>>>;

  constructor() {
    this.filterTransformers = new Map([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
      [Operator.IN, this.inFilter],
    ]);
  }

  convert(criteria: Criteria): MongoQuery<D> {
    return {
      filter: criteria.hasFilter() ? this.generateFilter(criteria.filters) : {},
      sort: criteria.order.hasOrder() ? this.generateSort(criteria.order) : { _id: -1 },
      skip: criteria.offset || 0,
      limit: criteria.limit || 0,
    };
  }

  protected generateFilter(filters: Filters): MongoFilter<D> {
    const filter = filters.filters.map(filter => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw new Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });

    return Object.assign({}, ...filter);
  }

  protected generateSort(order: Order): MongoSort {
    return {
      [order.orderBy === 'id' ? '_id' : order.orderBy]: order.orderType === OrderTypes.ASC ? 1 : -1,
    };
  }

  private equalFilter(filter: Filter): MongoFilter<D> {
    return {
      [filter.field]: { $eq: filter.value },
    } as MongoFilter<D>;
  }

  private notEqualFilter(filter: Filter): MongoFilter<D> {
    return { [filter.field]: { $ne: filter.value } } as MongoFilter<D>;
  }

  private greaterThanFilter(filter: Filter): MongoFilter<D> {
    return { [filter.field]: { $gt: filter.value } } as MongoFilter<D>;
  }

  private lowerThanFilter(filter: Filter): MongoFilter<D> {
    return { [filter.field]: { $lt: filter.value } } as MongoFilter<D>;
  }

  private containsFilter(filter: Filter): MongoFilter<D> {
    return { [filter.field]: { $regex: filter.value } } as MongoFilter<D>;
  }

  private notContainsFilter(filter: Filter): MongoFilter<D> {
    return { [filter.field]: { $not: { $regex: filter.value } } } as MongoFilter<D>;
  }

  private inFilter(filter: Filter): MongoFilter<D> {
    return {
      [filter.field]: { $in: filter.value },
    } as MongoFilter<D>;
  }
}
