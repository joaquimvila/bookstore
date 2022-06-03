import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { HttpClientModule } from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})
      ]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get books', () => {
    spyOn(service.http, "get");
    service.getBooks();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should be able to add book', () => {
    const book = {id: 9, title: 'Book Title', author: 'Book Author', description: 'Book Description'}
    spyOn(service.http, "post");
    service.addBook(book);
    expect(service.http.post).toHaveBeenCalled();
  });

  it('should be able to update book', () => {
    const book = {id: 1, title: 'Book Title', author: 'Book Author', description: 'Book Description'};
    spyOn(service.http, "put");
    service.updateBook(book);
    expect(service.http.put).toHaveBeenCalled();
  });

  it('should be able to delete book', () => {
    spyOn(service.http, "delete");
    service.deleteBook(1);
    expect(service.http.delete).toHaveBeenCalled();
  });
});
