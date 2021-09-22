import {Component, OnInit} from '@angular/core';
import {RefuellingService} from '../shared/service/refuelling.service';
import {forkJoin} from 'rxjs';
import {RideService} from '../shared/service/ride.service';
import {Ride} from '../shared/model/ride.model';
import {Refuelling} from '../shared/model/refuelling.model';
import {UserService} from '../shared/service/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public rides: Ride[] = [];
  public refuellings: Refuelling[] = [];

  public getElementType(element: Ride | Refuelling): string {
    return (typeof element);
  }

  constructor(private refuellingService: RefuellingService,
              private rideService: RideService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loadHistory()
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

}
