import { 
  Version,
  Environment,
  EnvironmentType 
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import BaseAngularWebPart from './../../core/BaseAngularWebPart';
import { APP_INITIALIZER } from '@angular/core';

import styles from './AngularComponent.module.scss';
import * as strings from 'angularComponentStrings';
import { IAngularComponentWebPartProps } from './IAngularComponentWebPartProps';
import AppComponent from './app/components/app/app.component';
import SitesComponent from './app/components/sites/sites.component';
import SitesHomeComponent from './app/components/sites/sites.home.component';
import SitesFormComponent from './app/components/sites/sites.form.component';
import SitesViewComponent from './app/components/sites/sites.view.component';
import { DialogComponent } from './app/components/sites/dialog.component';
import { appRoutes } from "./app/app.routes"
import { ConfigurationService } from "./app/services/ConfigurationService";
import { SitesService, MockSitesService } from "./app/services";

export default class AngularComponentWebPart extends BaseAngularWebPart<IAngularComponentWebPartProps> {

  protected get rootComponentType(): any {
    return AppComponent;
  }

  protected get appDeclarationTypes(): any {
    return [
      DialogComponent,
      SitesComponent, 
      SitesHomeComponent, 
      SitesFormComponent, 
      SitesViewComponent];
  }

  protected get providers(): any {
    if (Environment.type === EnvironmentType.Local) {
      return [
        ConfigurationService,
        { provide: SitesService, useClass: MockSitesService },
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          functionUrl: this.properties.functionUrl,
          functionKey: this.properties.functionKey,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      return [
        ConfigurationService,
        { provide: SitesService, useClass: SitesService },
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          functionUrl: this.properties.functionUrl,
          functionKey: this.properties.functionKey,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    }

    
  }

  protected get routes(): any {
    return appRoutes;
  }
  
  public onPropertyChange(propertyPath: string, newValue: any): void {
    if (propertyPath === "description") {
      this.rootComponent.description = newValue;
    }

    if (propertyPath === "functionUrl") {
      this.rootComponent.functionUrl = newValue;
    }

    if (propertyPath === "functionKey") {
      this.rootComponent.functionKey = newValue;
    }

    super.onPropertyChange(propertyPath, newValue);
  }

  protected updateChanges(): void {
    this.rootComponent.description = this.properties.description;
    this.rootComponent.functionUrl = this.properties.functionUrl;
    this.rootComponent.functionKey = this.properties.functionKey;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Angular Webpart"
          },
          groups: [
            {
              groupName: "General Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Home Title"
                })
              ]
            },
            {
              groupName: "API Configuration",
              groupFields: [
                PropertyPaneTextField('functionUrl', {
                  label: "Function URL"
                }),
                PropertyPaneTextField('functionKey', {
                  label: "Function Key"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
