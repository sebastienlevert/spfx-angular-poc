import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import BaseAngularWebPart from './../../core/BaseAngularWebPart';

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

  protected get routes(): any {
    return appRoutes;
  }

  public onBeforeSerialize() {
    this.properties.description = this.rootComponent.description;
    this.properties.functionUrl = this.rootComponent.functionUrl;
    this.properties.functionKey = this.rootComponent.functionKey;
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
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
