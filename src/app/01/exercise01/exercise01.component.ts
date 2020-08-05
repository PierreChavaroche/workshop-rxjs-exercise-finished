import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-exercise01',
  templateUrl: './exercise01.component.html',
  styleUrls: ['./exercise01.component.scss']
})
export class Exercise01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /**
  * Exercise: from interval(1000), make an Observable with 10 EVEN numbers
  * multiplied by 100. Then, subscribe to it and show the values
  * in console.log.
  */

    const obs = interval(1000).pipe(
      filter(x => x % 2 === 0),
      map(x => x * 100),
      take(10)
    );

    obs.subscribe(x => console.log(x));
  }

}
