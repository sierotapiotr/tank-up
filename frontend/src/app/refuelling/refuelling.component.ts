import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuelType} from '../shared/model/fuel-type.enum';
import {RefuellingService} from '../shared/service/refuelling.service';
import {Refuelling} from '../shared/model/refuelling.model';
import {SnackbarService} from '../shared/service/snackbar.service';
import {UserService} from '../shared/service/user.service';
import {FuelTypeNames} from '../shared/model/fuel-type-names';

@Component({
  selector: 'app-refuelling',
  templateUrl: './refuelling.component.html',
  styleUrls: ['./refuelling.component.scss']
})
export class RefuellingComponent implements OnInit {


  public form: FormGroup = this.formBuilder.group({
    price: '',
    fuelType: FuelType.PETROL
  });
  public fuelTypes = Object.keys(FuelType);
  public fuelTypeNames = FuelTypeNames.NAMES;

  constructor(private formBuilder: FormBuilder,
              private refuellingService: RefuellingService,
              private snackbarService: SnackbarService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  addRefuelling() {
    const refuelling = new Refuelling().fromForm(this.form.value);
    refuelling.userId = this.userService.currentUserId.getValue();
    this.refuellingService.addRefuelling(refuelling).subscribe(value => {
      this.snackbarService.positive('Tankowanie dodane')
    }, error => {
      this.snackbarService.negative('Nie udało się dodać tankowania')
    })
  }
}
