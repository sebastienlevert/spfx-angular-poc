import { Component, Input, Inject } from '@angular/core';
import AppComponentInner from './app.component.inner';
import { ConfigurationService } from "./../../services/configuration.service";

export default class AppComponent {
  @Input()
  public description: string;
  @Input()
  public functionKey: string;
  @Input()
  public functionUrl: string;

    public static getComponent(selectorId: string): any {
      return Component({
            selector: `angular-${selectorId}`,
            template: `<router-outlet></router-outlet>`
      })(AppComponentInner);
    }
}