import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers:[TopicService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) { 
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          if(response.topic){
            this.topic = response.topic;
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error =>{
          console.log(error);
        });
    });
  }
}
