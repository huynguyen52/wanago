import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/registerDto';
import bcrypt from 'bcrypt';
import { postgresErrorCodes } from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UsersService) {}

  async register(registerData: RegisterDto) {
    console.log(registerData);
    const hashedPassword = registerData.password;
    try {
      const createUser = await this.userService.create({
        ...registerData,
        password: hashedPassword,
      });
      createUser.password = undefined;
      return createUser;
    } catch (error) {
      if (error?.code === postgresErrorCodes.UniqueViolation) {
        throw new HttpException(
          'Username already exist!',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Sonething went wrong!!!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
