import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService 
  ){
    this.page_title = "Ajustes de usuario";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.token = this.identity;
   }

  ngOnInit() {
  }

}
