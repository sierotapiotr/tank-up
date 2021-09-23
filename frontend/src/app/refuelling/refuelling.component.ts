import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuelType} from '../shared/model/fuel-type.enum';
import {RefuellingService} from '../shared/service/refuelling.service';
import {Refuelling} from '../shared/model/refuelling.model';
import {SnackbarService} from '../shared/service/snackbar.service';
import {UserService} from '../shared/service/user.service';
import {FuelTypeNames} from '../shared/model/fuel-type-names';
import {CarService} from '../shared/service/car.service';
import {Car} from '../shared/model/car.model';
import {CarStatus} from '../shared/model/car-status.enum';

@Component({
  selector: 'app-refuelling',
  templateUrl: './refuelling.component.html',
  styleUrls: ['./refuelling.component.scss']
})
export class RefuellingComponent implements OnInit {


  public form: FormGroup = this.formBuilder.group({
    price: '',
    fuelType: FuelType.PETROL,
    carId: this.carService.currentCarId.getValue(),
  });
  public fuelTypes = Object.keys(FuelType);
  public fuelTypeNames = FuelTypeNames.NAMES;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private refuellingService: RefuellingService,
              private snackbarService: SnackbarService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  get activeCars(): Car[] {
    return this.carService.cars.getValue().filter(value => value.status === CarStatus.ACTIVE);
  }

  addRefuelling() {
    const refuelling = new Refuelling().fromForm(this.form.value);
    refuelling.userId = this.userService.currentUserId.getValue();
    this.carService.setCurrentCar(refuelling.carId);
    this.refuellingService.addRefuelling(refuelling).subscribe(value => {
      this.snackbarService.positive('Tankowanie dodane')
    }, error => {
      this.snackbarService.negative('Nie udało się dodać tankowania')
    })
  }
}
