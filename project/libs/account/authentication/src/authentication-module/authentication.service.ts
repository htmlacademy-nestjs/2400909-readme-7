import { ConflictException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '@project/shared-core';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, firstname, lastname, avatarUrl, password, dateBirth} = dto;

    const blogUser = {
      email, firstname, lastname,
      avatarUrl: '', passwordHash: '',
      dateOfBirth: dayjs(dateBirth).toDate(),
      role: UserRole.User,
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    this.blogUserRepository.save(userEntity);
    return userEntity;
  }
}
