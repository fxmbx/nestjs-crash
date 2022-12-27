import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  minNumberOfChar: number = 8;
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('value');
    console.log(value);
    console.log('meatadata: ', metadata);

    if (value.password.length < this.minNumberOfChar) {
      throw new HttpException(
        'password length too short',
        HttpStatus.BAD_REQUEST,
      );
    }
    var passwordRegEx = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (!value.password.match(passwordRegEx)) {
      throw new HttpException(
        'password not strong enough. password must contain at least 8 characters, at least 1 lovercase alphabet and 1 uppercase alphabet, at least 1 number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const parseAgeInt = parseInt(value.age.toString());
    if (isNaN(parseAgeInt)) {
      console.log(`${value.age} is not a number`);
      throw new HttpException(
        'Invalid Data Type for property age. Expected Number',
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
