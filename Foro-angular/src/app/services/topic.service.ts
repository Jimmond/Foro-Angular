import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable()
export class TopicService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;

    }
    prueba(){
        return "Hola mundo desde el topic service";
    }

    addTopic(token, topic):Observable<any>{
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.post(this.url+'topic', params, {headers: headers});

    }
}