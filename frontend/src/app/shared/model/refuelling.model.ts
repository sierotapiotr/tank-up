import {FuelType} from './fuel-type.enum';
import {FormTransformer} from './form-transformer';

export class Refuelling extends FormTransformer<Refuelling> {
  price: number;
  date: string;
  userId: string;
  fuelType: FuelType;
  carId: string;
}
