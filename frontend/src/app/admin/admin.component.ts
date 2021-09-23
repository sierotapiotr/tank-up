import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/model/user.model';
import {FormControl} from '@angular/forms';
import {Car} from '../shared/model/car.model';
import {CarService} from '../shared/service/car.service';
import {CarStatus} from '../shared/model/car-status.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public userNameControl = new FormControl();
  public carNameControl = new FormControl();

  constructor(private carService: CarService,
              public userService: UserService) {
  }

  ngOnInit() {
  }

  get activeCars(): Car[] {
    return this.carService.cars.getValue().filter(value => value.status === CarStatus.ACTIVE);
  };

  private addUser(name: string): void {
    const user = new User().fromForm({name});
    this.userService.create(user).subscribe(user => {
      this.userService.users.getValue().push(user);
    });
  }

  private deleteUser(id: string): void {
    this.userService.delete(id).subscribe(() => {
      const users = this.userService.users.getValue().filter(user => user.id !== id);
      this.userService.users.next(users);
    });
  }

  public addCar(name: string) {
    this.carService.create(name).subscribe(car => {
      this.carService.cars.getValue().push(car);
    })
  }

  public deleteCar(id: string) {
    this.carService.delete(id).subscribe(() => {
      const cars = this.carService.cars.getValue().filter(car => car.id !== id);
      this.carService.cars.next(cars);
    });

  }
}
