import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "./state/books.state";
import {Selector} from "./state/books.selectors";
import {DefaultProjectorFn, MemoizedSelector} from "@ngrx/store";
import {Book} from './book';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore<AppState>;
  let mockBooksSelector: MemoizedSelector<any, readonly Book[], DefaultProjectorFn<readonly Book[]>>;
  const sampleBooks = [
    {id: 1, title: "Finding Me", author: "Viola Davis", description: "The multiple award-winning actress describes the difficulties she encountered before claiming her sense of self and achieving professional success."},
    {id: 2, title: "Killing the Killers", author: "Bill O'Reilly; Martin Dugard", description: "The 11th book in the conservative commentator’s Killing series gives an account of the global war against terrorists."},
    {id: 3, title: "A Sacred Oath", author: "Mark T. Esper", description: "The former secretary of defense gives an account of serving in his post until he was fired by the president after the 2020 election."},
    {id: 4, title: "The Palace Papers", author: "Tina Brown", description: "This follow-up to “The Diana Chronicles” details how the royal family reinvented itself after the death of Princess Diana."},
    {id: 5, title: "This Will Not Pass", author: "Jonathan Martin; Alexander Burns", description: "Two New York Times correspondents chronicle the 2020 election and the first year of the Biden presidency."}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    mockBooksSelector = store.overrideSelector(Selector.books, sampleBooks);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bookstore'`, () => {
    expect(app.title).toEqual('Bookstore');
  });

  it('should show the books from the store', () => {
    mockBooksSelector.setResult(sampleBooks);
    store.refreshState();
    fixture.detectChanges()
    expect(app.books$.length).toBe(5);
  });


});
