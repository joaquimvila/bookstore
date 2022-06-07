import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {provideMockStore} from "@ngrx/store/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
