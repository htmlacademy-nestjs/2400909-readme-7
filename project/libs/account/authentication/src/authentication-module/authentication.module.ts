import { Module } from '@nestjs/common';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@project/blog-user';
import { BcryptHasher } from '../hashers/bcrypt.hasher';

@Module({
  imports: [BlogUserModule],
  controllers: [AuthenticationController],
  providers:
  [
    AuthenticationService,
    BcryptHasher,
  ],
})
export class AuthenticationModule {}
