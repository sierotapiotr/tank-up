import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuelType} from '../shared/model/fuel-type.enum';
import {RefuellingService} from '../shared/service/refuelling.service';
import {Refuelling} from '../shared/model/refuelling.model';
import {SnackbarService} from '../shared/service/snackbar.service';

@Component({
  selector: 'app-refuelling',
  templateUrl: './refuelling.component.html',
  styleUrls: ['./refuelling.component.scss']
})
export class RefuellingComponent implements OnInit {


  public form: FormGroup = this.formBuilder.group({
    price: '',
    fuelType: ''
  });
  public fuelTypes = Object.keys(FuelType);

  constructor(private formBuilder: FormBuilder,
              private refuellingService: RefuellingService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
  }

  addRefuelling() {
    this.refuellingService.addRefuelling(new Refuelling().fromForm(this.form.value)).subscribe(value => {
      this.snackbarService.positive('Tankowanie dodane')
    }, error => {
      this.snackbarService.negative('Nie udało się dodać tankowania')
    })
  }
}
