import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers:[TopicService]
})
export class SearchComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public no_paginate;
  public identity;
  public token;
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
  ) { 
    this.page_title;
    this.no_paginate = true;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngOnInit() {
    this._route.params.subscribe(params =>{
      var search = params['search'];
      this.page_title = 'Buscar: ' + search;
      this.getTopics(search);
    })
  }
  getTopics(search){
    this._topicService.search(search).subscribe(
      response =>{
        if(response.topics){
          this.topics = response.topics;
        }
      },
      error =>{
        console.log(error);
      });
  }
}
