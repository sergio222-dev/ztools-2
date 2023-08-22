import { PgBaseRepositoryRepository } from '@shared/infrastructure/pg/PgBaseRepository.repository';
import { User } from '@zdm/user/domain/User.aggregate';
import {
  mapToAggregate,
  mapToSchema,
  UserSchema,
  UserSchemaType,
} from '@zdm/user/infrastructure/pg/User.schema';
import { UserRepository } from '@zdm/user/domain/User.repository';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PgUserRepository
  extends PgBaseRepositoryRepository<User, UserSchemaType>
  implements UserRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource, UserSchema, mapToAggregate, mapToSchema);
  }
  async findByUserName(userName: IdObject): Promise<User | undefined> {
    const result = await this.repository.findOneBy({
      username: userName.value,
    });

    return result ? this.mapToAggregate(result) : undefined;
  }
}
