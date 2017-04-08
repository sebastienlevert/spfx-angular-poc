import { Component  } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import SimpleComponentInner from './simple.component.inner';

export default class SimpleComponent {
  public description: string;
  public static getComponent(selectorId: string): any {
    return Component({
      selector: `angular-${selectorId}`,
      template: `
      <h1>{{ description }}</h1>
      <input type="text" [(ngModel)]="name" /> {{ name }} 
      <child></child>`
    })(SimpleComponentInner);
  }
}