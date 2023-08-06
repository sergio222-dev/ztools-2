import { QueryBus } from '@nestjs/cqrs';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { SignInRequest } from '../../../dto/SignInRequest';
import { SignInQuery } from '@zdm/user/application/signIn/SignIn.query';
import { SignInResult } from '@zdm/user/application/signIn/SignIn.result';
import { SignInResponse } from '../../../dto/SignInResponse';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from '../../../utils/authentication';

@Controller('v1/user')
@ApiTags('/user')
@Injectable()
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Post('/signIn')
  @ApiResponse({
    type: SignInResponse,
  })
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    const query = new SignInQuery(body.username, body.password);

    const result = await this.queryBus.execute<SignInQuery, SignInResult>(
      query,
    );

    return {
      accessToken: result.accessToken,
    };
  }
}
