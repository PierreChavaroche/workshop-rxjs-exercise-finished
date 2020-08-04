import { Component, OnInit } from '@angular/core';
import { fromEvent, from } from 'rxjs';
import { map, switchAll, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-exercise03',
  templateUrl: './exercise03.component.html',
  styleUrls: ['./exercise03.component.scss']
})
export class Exercise03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /**
     * Exercise: on every click, make a request to a random user in
     * JSONPlaceholder servers and deliver the response in the `responses`
     * observable.
     *
     * Example: for a random number NUM (from 1 to 10) in
     *    https://jsonplaceholder.typicode.com/users/NUM
     */
    const click$ = fromEvent(document, 'click');
    const urlBase = 'http://jsonplaceholder.typicode.com/users/';

    const response$ = click$.pipe(
      switchMap(() => from(fetch(urlBase + Math.ceil(Math.random() * 10)))), // or "defer" instead of "from"
      switchMap(res => res.json())
    );

    response$.subscribe({
      next: (data) => { console.log(data) },
      error: (err) => { console.log('error ' + err) },
      complete: () => { console.log('done') },
    });
  }

}
