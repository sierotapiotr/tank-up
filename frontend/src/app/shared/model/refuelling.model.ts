import {FuelType} from './fuel-type.enum';
import {FormTransformer} from './form-transformer';

export class Refuelling extends FormTransformer<Refuelling> {
  price: number;
  fuelType: FuelType;
}
