import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RideService} from '../shared/service/ride.service';
import {SnackbarService} from '../shared/service/snackbar.service';
import {Ride} from '../shared/model/ride.model';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private rideService: RideService,
              private snackbarService: SnackbarService) {
  }

  public form: FormGroup = this.formBuilder.group({
    distance: null,
    passengerIds: []
  });

  ngOnInit() {
  }

  addRide() {
    this.rideService.addRide(new Ride().fromForm(this.form.value)).subscribe(value => {
      this.snackbarService.positive('Tankowanie dodane')
    }, error => {
      this.snackbarService.negative('Nie udało się dodać tankowania')
    })
  }
}
