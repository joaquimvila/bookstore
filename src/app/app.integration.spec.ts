import {render, screen} from "@testing-library/angular";
import {AppComponent} from "./app.component";
import {ItemComponent} from "./item/item.component";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {booksReducer} from "./state/books.reducer";
import {EffectsModule} from "@ngrx/effects";
import {BooksEffects} from "./state/books.effects";

describe("Integration tests", () => {

  beforeEach(async () => {
    await render(AppComponent, {
      declarations: [AppComponent, ItemComponent],
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
        ReactiveFormsModule,
        StoreModule.forRoot({bookStore: booksReducer}),
        EffectsModule.forRoot([BooksEffects])],
    })
  })

  it('should load 5 rows of data and 1 row of header', async() => {
    expect((await screen.findByText("Finding Me"))).toBeTruthy()
    expect((await screen.findByText("Killing the Killers"))).toBeTruthy()
    expect((await screen.findByText("A Sacred Oath"))).toBeTruthy()
    expect((await screen.findByText("The Palace Papers"))).toBeTruthy()
    expect((await screen.findByText("This Will Not Pass"))).toBeTruthy()
  })

});
