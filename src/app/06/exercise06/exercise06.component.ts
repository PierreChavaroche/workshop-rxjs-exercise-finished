import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, Subject, Observable, of, from, defer, iif } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap, switchMap, filter } from 'rxjs/operators';
import { IUser } from './user.interface';

@Component({
  selector: 'app-exercise06',
  templateUrl: './exercise06.component.html',
  styleUrls: ['./exercise06.component.scss']
})
export class Exercise06Component implements OnInit, AfterViewInit, OnDestroy {
  userResults$: Observable<IUser[]>;
  @ViewChild('inputUserSearch', { static: false }) inputUserSearch: ElementRef;
  private users: IUser[] = [];

  constructor() { }

  ngOnInit(): void {
    /**
     * Exercise: When typing to an input element, request to users in JSONPlaceholder servers,
     * filter the user names by the typed text of the input element and display the response in the markup.
     * Like autocomplete.
     * 
     * Hints: 
     *    - Use "@ViewChild" to get the input element
     *    - Use "debounceTime" and "distinctUntilChanged" when listening to the input event
     *    - Only request JSONPlaceholder servers for users once. Cache the result in private variable.
     *    - Implement interface "IUser" if necessary
     */
  }

  ngAfterViewInit(): void {
    if (this.inputUserSearch) {
      this.userResults$ = fromEvent(this.inputUserSearch.nativeElement, 'input')
        .pipe(
          debounceTime(500),
          map(() => this.inputUserSearch.nativeElement.value),
          distinctUntilChanged(),
          switchMap(searchValue => iif(
            () => !!searchValue,
            this.getUsers$().pipe(
              map(users => users.filter(userLoop => userLoop.name.includes(searchValue)))
            ),
            of([])
          ))
        )
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
    
  }
}
