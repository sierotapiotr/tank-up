import {FormTransformer} from './form-transformer';

export class User extends FormTransformer<User> {
  id: string;
  name: string;
}
