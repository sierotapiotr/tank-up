import {Component, OnInit} from '@angular/core';
import {RefuellingService} from '../shared/service/refuelling.service';
import {forkJoin} from 'rxjs';
import {RideService} from '../shared/service/ride.service';
import {Ride} from '../shared/model/ride.model';
import {Refuelling} from '../shared/model/refuelling.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public rides: Ride[];
  public refuellings: Refuelling[];

  constructor(private refuellingService: RefuellingService,
              private rideService: RideService) {
  }

  ngOnInit() {
    this.loadHistory()
  }

  private loadHistory() {
    forkJoin([this.refuellingService.getRefuellings('1'),
      this.rideService.getRides('1')])
      .subscribe(([refuellings, rides]) => {
        this.refuellings = refuellings;
        this.rides = rides;
      });
  }

}
