import { QueryBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  Req,
} from '@nestjs/common';
import { SignInRequest } from '../../../dto/SignInRequest';
import { SignInResponse } from '../../../dto/SignInResponse';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from '../../../utils/authentication';
import { FindByUserNameQuery } from '@zdm/user/application/findByUserName/FindByUserName.query';
import { FindByUserNameResponse } from '@zdm/user/application/findByUserName/FindByUserNameResponse';
import { UserDto } from '../../../dto/UserDto';
import { JwtService } from '@nestjs/jwt';

@Controller('v1/user')
@ApiTags('/user')
@Injectable()
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('/signIn')
  @ApiResponse({
    type: SignInResponse,
  })
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    const queryUser = new FindByUserNameQuery(body.username);

    const user = await this.queryBus.execute<
      FindByUserNameQuery,
      FindByUserNameResponse | undefined
    >(queryUser);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // validate password
    if (user.password !== body.password) {
      throw new HttpException('Invalid password', HttpStatus.NOT_FOUND);
    }

    const payload: UserDto = {
      name: user.name,
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
