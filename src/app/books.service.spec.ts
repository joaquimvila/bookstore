import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('BooksService', () => {
  let service: BooksService;
  let httpClient: HttpClient;
  let httpTestController: HttpTestingController;
  const books = [
    {id: 1, title: "Finding Me", author: "Viola Davis", description: "The multiple award-winning actress describes the difficulties she encountered before claiming her sense of self and achieving professional success."},
    {id: 2, title: "Killing the Killers", author: "Bill O'Reilly; Martin Dugard", description: "The 11th book in the conservative commentator’s Killing series gives an account of the global war against terrorists."},
    {id: 3, title: "A Sacred Oath", author: "Mark T. Esper", description: "The former secretary of defense gives an account of serving in his post until he was fired by the president after the 2020 election."},
    {id: 4, title: "The Palace Papers", author: "Tina Brown", description: "This follow-up to “The Diana Chronicles” details how the royal family reinvented itself after the death of Princess Diana."},
    {id: 5, title: "This Will Not Pass", author: "Jonathan Martin; Alexander Burns", description: "Two New York Times correspondents chronicle the 2020 election and the first year of the Biden presidency."}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(BooksService);
    httpClient = TestBed.inject(HttpClient);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get books', () => {
    service.getBooks().subscribe(books => {
      expect(books.length).toBe(5);
    });

    const req = httpTestController.expectOne(BooksService.booksUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(books);
  });

  it('should be able to add book', () => {
    const book = {id: 9, title: 'Book Title', author: 'Book Author', description: 'Book Description'}
    service.addBook(book).subscribe(book => {
      expect(book).toEqual(book);
    });

    const req = httpTestController.expectOne(BooksService.booksUrl);
    expect(req.request.method).toBe('POST');
    req.flush(book);
  });

  it('should be able to update book', () => {
    const book = {id: 1, title: 'Book Title', author: 'Book Author', description: 'Book Description'};
    spyOn(service.http, 'put');
    service.updateBook(book);
    expect(service.http.put).toHaveBeenCalledWith(BooksService.booksUrl, book, jasmine.any(Object));
  });

  it('should be able to get book', () => {
    const expectedUrl = BooksService.booksUrl + "/1";
    spyOn(service.http, 'get');
    service.getBook(1);
    expect(service.http.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should be able to delete book', () => {
    const expectedUrl = BooksService.booksUrl + "/1";
    spyOn(service.http, "delete");
    service.deleteBook(1);
    expect(service.http.delete).toHaveBeenCalledWith(expectedUrl, jasmine.any(Object));
  });

  it('should be able to determine save book or add book', () => {
    spyOn(service.http, 'put');
    spyOn(service.http, 'post');
    const existingBook = {id: 1, title: 'Book Title', author: 'Book Author', description: 'Book Description'};
    service.saveBook(existingBook);
    expect(service.http.put).toHaveBeenCalled();
    expect(service.http.post).not.toHaveBeenCalled();
  });
});
