import {TestBed} from "@angular/core/testing";
import {BooksEffects} from "./books.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {Observable, of} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import {initialState} from "./books.reducer";
import {BooksService} from "../books.service";
import {Store} from "@ngrx/store";
import {BookStoreActions} from "./books.actions";
import {HttpClientModule} from "@angular/common/http";

describe("Effects", () => {
  let actions$: Observable<any>
  let effects: BooksEffects
  let store: Store
  let booksService: BooksService

  const books = [
    {id: 1, title: "Finding Me", author: "Viola Davis", description: "The multiple award-winning actress describes the difficulties she encountered before claiming her sense of self and achieving professional success."},
    {id: 2, title: "Killing the Killers", author: "Bill O'Reilly; Martin Dugard", description: "The 11th book in the conservative commentator’s Killing series gives an account of the global war against terrorists."},
    {id: 3, title: "A Sacred Oath", author: "Mark T. Esper", description: "The former secretary of defense gives an account of serving in his post until he was fired by the president after the 2020 election."},
    {id: 4, title: "The Palace Papers", author: "Tina Brown", description: "This follow-up to “The Diana Chronicles” details how the royal family reinvented itself after the death of Princess Diana."},
    {id: 5, title: "This Will Not Pass", author: "Jonathan Martin; Alexander Burns", description: "Two New York Times correspondents chronicle the 2020 election and the first year of the Biden presidency."}
  ];
  const sampleNewBook = {id: 6, title: "Sample Title", author: "Sample Author", description: "Sample Description"}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
      ],
      imports: [HttpClientModule]
    })
    booksService = TestBed.inject(BooksService)
    effects = TestBed.inject(BooksEffects)
    store = TestBed.inject(Store)
  })

  describe('getBooks action', function () {
    it("should call getBooks and redirect to booksLoaded action", (done) => {
      spyOn(booksService, "getBooks").and.returnValue(of(books))
      actions$ = of(BookStoreActions.loadBooks);
      effects.loadBooks$.subscribe(res => {
        expect(booksService.getBooks).toHaveBeenCalled()
        expect(res).toEqual(BookStoreActions.booksLoaded({books: books}))
        done()
      })
    })
  });

  describe('saveBook action', function () {
    it("should call saveBook and redirected to bookSaved action", (done) => {
      spyOn(booksService, "saveBook").and.returnValue(of(sampleNewBook));
      actions$ = of(BookStoreActions.saveBook({book: sampleNewBook}))
      effects.saveBook$.subscribe(res => {
        expect(booksService.saveBook).toHaveBeenCalled()
        expect(res).toEqual(BookStoreActions.bookSaved({book: sampleNewBook}))
        done()
      })
    })
  });

  describe('bookSaved action', function(){
    it("should redirect to loadBook action", (done)=> {
      actions$ = of(BookStoreActions.bookSaved)
      effects.bookSaved$.subscribe(res => {
        expect(res).toEqual(BookStoreActions.loadBooks())
        done()
      })
    })
  })

  describe("deleteBook action", function(){
    it("deleteBook action should call deleteBook and redirected to bookDeleted action", (done) => {
      spyOn(booksService, "deleteBook").and.returnValue(of(sampleNewBook))
      actions$ = of(BookStoreActions.deleteBook)
      effects.deleteBook$.subscribe(res => {
        expect(booksService.deleteBook).toHaveBeenCalled()
        expect(res).toEqual(BookStoreActions.bookDeleted({book: sampleNewBook}))
        done()
      })
    })
  })

  describe('bookDeleted action', function () {
    it("should redirect to loadBooks action", (done) => {
      actions$ = of(BookStoreActions.bookDeleted)
      effects.bookDeleted$.subscribe((res) => {
        expect(res).toEqual(BookStoreActions.loadBooks())
        done()
      })
    })
  });

})
