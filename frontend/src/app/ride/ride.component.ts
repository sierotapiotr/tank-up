import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RideService} from '../shared/service/ride.service';
import {SnackbarService} from '../shared/service/snackbar.service';
import {Ride} from '../shared/model/ride.model';
import {UserService} from '../shared/service/user.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private rideService: RideService,
              private snackbarService: SnackbarService,
              public userService: UserService) {
  }

  public form: FormGroup = this.formBuilder.group({
    distance: null,
    passengerIds: this.formBuilder.array([])
  });

  ngOnInit() {
    this.userService.users.subscribe(users => {
      this.passengerIdsFormArray.clear();
      users.forEach(() => this.passengerIdsFormArray.push(new FormControl(false)));
    })
  }

  get passengerIdsFormArray(): FormArray {
    return this.form.controls.passengerIds as FormArray;
  }

  addRide() {
    const checkedPassengerIds = this.userService.users.getValue()
      .filter((user, index) => !!this.passengerIdsFormArray.value[index])
      .map(user => user.id);
    const ride = Object.assign(new Ride(), this.form.value, {passengerIds: checkedPassengerIds});
    this.rideService.addRide(ride).subscribe(value => {
      this.snackbarService.positive('Przejazd dodany')
    }, error => {
      this.snackbarService.negative('Nie udało się dodać przejazdu.')
    })
  }
}
