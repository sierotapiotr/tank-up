import {Component, OnInit} from '@angular/core';
import {RefuellingService} from '../shared/service/refuelling.service';
import {forkJoin} from 'rxjs';
import {RideService} from '../shared/service/ride.service';
import {Ride} from '../shared/model/ride.model';
import {Refuelling} from '../shared/model/refuelling.model';
import {UserService} from '../shared/service/user.service';
import * as moment from 'moment';
import {FuelTypeNames} from '../shared/model/fuel-type-names';
import {CarService} from '../shared/service/car.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public rides: Ride[] = [];
  public refuellings: Refuelling[] = [];
  private userIdToUserNameMap = new Map();
  public fuelTypeNames = FuelTypeNames.NAMES;
  private carIdToCarNameMap = new Map();

  constructor(private carService: CarService,
              private refuellingService: RefuellingService,
              private rideService: RideService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUserId.subscribe(() => this.loadHistory());
    this.userService.users.getValue().forEach(user => this.userIdToUserNameMap.set(user.id, user.name));
    this.carService.cars.getValue().forEach(car => this.carIdToCarNameMap.set(car.id, car.name));
  }

  private sortByDate() {
    return (elementA, elementB) => moment(elementA.date).valueOf() - moment(elementB.date).valueOf();
  }

  private loadHistory(): void {
    const currentUserId = this.userService.currentUserId.getValue();
    forkJoin([this.refuellingService.getRefuellings(currentUserId),
      this.rideService.getRides(currentUserId)])
      .subscribe(([refuellings, rides]) => {
        this.refuellings = refuellings.sort(this.sortByDate());
        this.rides = rides.sort(this.sortByDate());
      });
  }

  public getPassengerNames(passengerIds: string[]): string {
    return passengerIds.map(passengerId => this.userIdToUserNameMap.get(passengerId)).join(', ');
  }

  public getCarName(carId: string): string {
    return this.carIdToCarNameMap.get(carId);
  }
}
