import { Component, OnInit } from '@angular/core';
import { fromEvent, concat } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-exercise02',
  templateUrl: './exercise02.component.html',
  styleUrls: ['./exercise02.component.scss']
})
export class Exercise02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /**
     * Exercise: make an Observable that emits the first 3 clicks as "CLICK",
     * then the next 3 clicks as "click", then completes.
     * Hint: Use "concat" to concatenate two or more Observables
     */
    const click$ = fromEvent(document, "click");
    const threeClicks$ = click$.pipe(take(3));

    const firstPart$ = threeClicks$.pipe(map(() => 'CLICK'));
    const secondPart$ = threeClicks$.pipe(map(() => 'click'));

    const result$ = concat(firstPart$, secondPart$);

    result$.subscribe(x => console.log(x));
  }

}
