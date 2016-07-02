import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AbilitiesService{
  private info;

  public min_base_score: number;
  public max_base_score: number;
  public min_score: number;
  public max_score: number;

  constructor (private http: Http) {
    this.min_base_score = 3;
    this.max_base_score = 18;
    this.min_score = this.min_base_score;
    this.max_score = 20;
  }

  getInfo (fn) {
    if (this.info != null) {
      fn(this.info);
      return;
    }

    this.http.get('/characters/abilities/get-info')
      .map(response => response.json())
      .subscribe(
        result => {
          this.info = result;
          fn(this.info);
        },
        this.handleError
      )
    ;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}