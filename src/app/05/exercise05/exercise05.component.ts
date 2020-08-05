import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, combineLatest, Observable, defer } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-exercise05',
  templateUrl: './exercise05.component.html',
  styleUrls: ['./exercise05.component.scss']
})
export class Exercise05Component implements OnInit, AfterViewInit {
  data$: Observable<any>;
  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild('select', { static: false }) select: ElementRef;

  constructor() { }

  ngOnInit(): void {
    /**
     * Exercise: We want to give our users the possibility to type in a user ID (input) and to select the 
     * type of the resource they want to display (select). But, what is important is that the request is 
     * supposed to be issued only after both fields are filled in. After that, the app should automatically 
     * re-render whenever any of the fields is changed.
     * 
     * Hints: 
     *    - Use "@ViewChild" to get the input and select element
     *    - Use "debounceTime" and "distinctUntilChanged" when listening to the input event
     *    - `https://jsonplaceholder.typicode.com/${resource}?userId=${id}`
     */
  }

  ngAfterViewInit(): void {
    if (this.input && this.select) {
      const id$ = fromEvent(this.input.nativeElement, 'input').pipe(
        map(e => (this.input.nativeElement.value)),
        filter(id => id >= 1 && id <= 10),
        distinctUntilChanged(),
        debounceTime(500)
      );

      const resource$ = fromEvent(this.select.nativeElement, 'change').pipe(
        map(e => (this.select.nativeElement.value))
      );

      this.data$ = combineLatest([
        id$,
        resource$
      ]).pipe(
        switchMap(this.getResources)
      );
    }
  }

  private getResources([id, resource]) {
    return defer(() => fetch(
      `https://jsonplaceholder.typicode.com/${resource}?userId=${id}`
    )).pipe(
      switchMap(res => res.json())
    );
  }
}
