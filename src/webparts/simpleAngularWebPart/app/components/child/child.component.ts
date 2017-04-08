import { Component, Input, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';

@Component({
  selector: "child",
  template: `
    <div>
      <input #newItem (keyup.enter)="addItem(newItem.value)" (blur)="addItem(newItem.value); newItem.value=''">
      <button (click)=addItem(newItem.value)>Add</button>
      
      <ul>
        <li *ngFor="let item of items; let i = index">
          Item #{{ i }} - {{ item }}
        </li>
      </ul>
    </div>`
})
export default class ChildComponent {
  @Input() public items: string[] = [];

  addItem(newItem: string) {
    if (newItem) {
      this.items.push(newItem);
    }
  }
}
