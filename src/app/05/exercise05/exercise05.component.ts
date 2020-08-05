import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, Subject, Observable, of, from, defer } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap, switchMap, filter } from 'rxjs/operators';
import { IUser } from './user.interface';

@Component({
  selector: 'app-exercise05',
  templateUrl: './exercise05.component.html',
  styleUrls: ['./exercise05.component.scss']
})
export class Exercise05Component implements OnInit, AfterViewInit, OnDestroy {
  userResults$: Observable<IUser[]>;
  @ViewChild('inputUserSearch', { static: false }) inputUserSearch: ElementRef;
  private inputSubscription: Subscription;
  private userResultsSource: Subject<Observable<IUser[]>> = new Subject();
  private users: IUser[] = [];

  constructor() { }

  ngOnInit(): void {
    /**
     * Exercise: When typing to an input element, request to users in JSONPlaceholder servers,
     * filter the user names by the typed text of the input element and display the response in the markup.
     * Like autocomplete.
     * 
     * Hints: 
     *    - Use "debounceTime" when listening to the input event
     *    - Only request JSONPlaceholder servers for users once. Cache the result in private variable.
     *    - Use a "Subject" to emit new search results
     *    - Don't forget to unsubscribe in OnDestroy if necessary
     */
    this.userResults$ = this.userResultsSource.asObservable().pipe(
      switchMap(users$ => users$ ? users$ : of(null))
    );
  }

  ngAfterViewInit(): void {
    if (this.inputUserSearch) {
      this.inputSubscription = fromEvent(this.inputUserSearch.nativeElement, 'input')
          .pipe(
            debounceTime(500),
            map(() => this.inputUserSearch.nativeElement.value),
            distinctUntilChanged(),
            tap(value => {
              this.search(value);
            })
          )
          .subscribe()
    }
  }

  private search(searchValue: string) {
    if (searchValue) {
      const userResults$ = this.getUsers$().pipe(
        map(users => users.filter(userLoop => userLoop.name.includes(searchValue)))
      );

      this.userResultsSource.next(userResults$);
    } else {
      this.userResultsSource.next(of([]));
    }
  }

  private getUsers$(): Observable<IUser[]> {
    let users$: Observable<IUser[]> = of(this.users);

    if (!this.users || !this.users.length) {
      const urlBase = 'http://jsonplaceholder.typicode.com/users';

      users$ = defer(() => (fetch(urlBase))).pipe(
        switchMap(res => res.json()),
        tap(users => console.log(users)),
        map((users: any[]) => users.map(userLoop => {
          const user: IUser = {
            ...userLoop
          };

          return user;
        })),
        tap(users => this.users = users)
      );
    }

    return users$;
  }

  ngOnDestroy() {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
  }
}
