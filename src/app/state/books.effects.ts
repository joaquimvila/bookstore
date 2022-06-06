import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BooksService} from "../books.service";
import {BookStoreActions} from "./books.actions";
import {catchError, EMPTY, map, mergeMap} from "rxjs";

@Injectable()
export class BooksEffects {

  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookStoreActions.loadBooks),
    mergeMap(() => this.booksService.getBooks().pipe(
      map(books => BookStoreActions.booksLoaded({books})),
      catchError(() => EMPTY)
    ))
  ));

  saveBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookStoreActions.saveBook),
    mergeMap((action) => this.booksService.saveBook(action.book).pipe(
      map(book => BookStoreActions.bookSaved({book})),
      catchError(() => EMPTY)
    ))
  ));

  bookSaved$ = createEffect(() => this.actions$.pipe(
    ofType(BookStoreActions.bookSaved),
    map(() => BookStoreActions.loadBooks())
  ));

  deleteBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookStoreActions.deleteBook),
    mergeMap((action) => this.booksService.deleteBook(action.id).pipe(
      map(book => BookStoreActions.bookDeleted({book})),
      catchError(() => EMPTY)
    ))
  ));

  bookDeleted$ = createEffect(() => this.actions$.pipe(
    ofType(BookStoreActions.bookDeleted),
    map(() => BookStoreActions.loadBooks())
  ));

  constructor (private actions$: Actions, private booksService: BooksService){}
}
