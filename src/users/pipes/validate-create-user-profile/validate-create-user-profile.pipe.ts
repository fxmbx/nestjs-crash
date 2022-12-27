import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserProfileDto } from 'src/users/dto/createuserprofile.dto';

@Injectable()
export class ValidateCreateUserProfilePipe implements PipeTransform {
  transform(value: CreateUserProfileDto, metadata: ArgumentMetadata) {
    if (value.age < 18) {
      throw new HttpException('user is under aged', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
