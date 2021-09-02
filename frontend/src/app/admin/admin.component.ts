import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/model/user.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users: User[];
  public userNameControl = new FormControl();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAll().subscribe(value => {
      this.users = value;
    });
  }

  private addUser(name: string): void {
    const user = new User().fromForm({name});
    this.userService.create(user).subscribe(value => {
      this.users.push(value);
    });
  }

  private deleteUser(id: string): void {
    this.userService.delete(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

}
