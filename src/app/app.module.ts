import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import { ItemComponent } from './item/item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {booksReducer} from "./state/books.reducer";
import {EffectsModule} from "@ngrx/effects";
import {BooksEffects} from "./state/books.effects";

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    ReactiveFormsModule,
    StoreModule.forRoot({bookStore: booksReducer}),
    EffectsModule.forRoot([BooksEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
