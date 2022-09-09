import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {Balance} from '../shared/model/balance.model';
import {CarService} from '../shared/service/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private carService: CarService,
              private userService: UserService) {
  }

  public balance: Balance;
  private carIdToCarNameMap = new Map();

  ngOnInit() {
    this.loadBalance();
    this.carService.cars.subscribe(cars => {
      cars.forEach(car => this.carIdToCarNameMap.set(car.id, car.name));
    });
    this.userService.currentUserId.subscribe(() => this.loadBalance());
  }

  public getCarName(carId: string): string {
    return this.carIdToCarNameMap.get(carId);
  }

  private loadBalance(): void {
    this.userService.getBalance(this.userService.currentUserId.getValue()).subscribe(balance => {
      this.balance = balance;
    });
  }

}
