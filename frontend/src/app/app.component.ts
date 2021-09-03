import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tank up';

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAll().subscribe(users => {
      this.userService.users.next(users);
    });
  }

  setCurrentUserId(id: string) {
    this.userService.currentUserId.next(id);
  }
}
