import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubspecializationpageComponent } from './subspecializationpage.component';

describe('SubspecializationpageComponent', () => {
  let component: SubspecializationpageComponent;
  let fixture: ComponentFixture<SubspecializationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubspecializationpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubspecializationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
