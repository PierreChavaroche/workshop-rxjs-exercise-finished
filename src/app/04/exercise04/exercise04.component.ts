import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { defer } from 'rxjs/internal/observable/defer';
import { Observable, iif, of } from 'rxjs';
import { IComment } from './comment.interface';

@Component({
  selector: 'app-exercise04',
  templateUrl: './exercise04.component.html',
  styleUrls: ['./exercise04.component.scss']
})
export class Exercise04Component implements OnInit {
  comments$: Observable<IComment>

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /**
     * Exercise: Listen to the query params and get the param "id". In this case the param "id" is a post-id.
     * Request to comments in JSONPlaceholder servers and get all comments of the given post-id.
     * Display the response in the markup

     * Hints: 
     *   - Example request: http://jsonplaceholder.typicode.com/comments?postId=1
     *   - Use Observable "queryParams" from "ActivatedRoute"
     *   - Consider the case that there is no post-id as query param available. Use "iif" from RxJS if necessary.
     */
    const urlBase = 'http://jsonplaceholder.typicode.com/comments';

    this.comments$ = this.route.queryParams.pipe(
      map(queryParams => queryParams['id'] as string),
      switchMap(id => iif(
        () => !!id,
        defer(() => fetch(`${urlBase}?postId=${id}`)).pipe(
          switchMap(res => res.json())
        ),
        of(null)
      ))      
    );
  }

}
