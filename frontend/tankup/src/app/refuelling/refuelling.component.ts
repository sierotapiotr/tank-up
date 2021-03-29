import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

}
