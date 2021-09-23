import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RideService} from '../shared/service/ride.service';
import {SnackbarService} from '../shared/service/snackbar.service';
import {Ride} from '../shared/model/ride.model';
import {UserService} from '../shared/service/user.service';
import {CarService} from '../shared/service/car.service';
import {Car} from '../shared/model/car.model';
import {CarStatus} from '../shared/model/car-status.enum';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private rideService: RideService,
              private snackbarService: SnackbarService,
              public userService: UserService) {
  }

  public form: FormGroup = this.formBuilder.group({
    distance: null,
    passengerIds: this.formBuilder.array([]),
    carId: this.carService.currentCarId.getValue(),
  });

  get activeCars(): Car[] {
    return this.carService.cars.getValue().filter(value => value.status === CarStatus.ACTIVE);
  }

  ngOnInit() {
    this.userService.users.subscribe(users => {
      this.passengerIdsFormArray.clear();
      users.forEach(user => this.passengerIdsFormArray.push(new FormControl(this.isUserTheCurrentUser(user.id))));
    })
  }

  private isUserTheCurrentUser(id: string): boolean {
    return id === this.userService.currentUserId.getValue();
  }

  get passengerIdsFormArray(): FormArray {
    return this.form.controls.passengerIds as FormArray;
  }

  public addRide(): void {
    const checkedPassengerIds = this.userService.users.getValue()
      .filter((user, index) => !!this.passengerIdsFormArray.value[index])
      .map(user => user.id);
    const ride = Object.assign(new Ride(), this.form.value, {passengerIds: checkedPassengerIds});
    this.carService.setCurrentCar(ride.carId);
    this.rideService.addRide(ride).subscribe(value => {
      this.snackbarService.positive('Przejazd dodany')
    }, () => {
      this.snackbarService.negative('Nie udało się dodać przejazdu.')
    })
  }
}
