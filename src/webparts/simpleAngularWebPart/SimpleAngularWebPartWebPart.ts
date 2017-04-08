import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import BaseAngularWebPart from './../../core/BaseAngularWebPart';

import * as strings from 'simpleAngularWebPartStrings';
import { ISimpleAngularWebPartWebPartProps } from './ISimpleAngularWebPartWebPartProps';
import SimpleComponent from './app/components/simple/simple.component';
import ChildComponent from './app/components/child/child.component';

export default class SimpleAngularWebPartWebPart extends BaseAngularWebPart<ISimpleAngularWebPartWebPartProps> {

  protected get rootComponentType(): any {
    return SimpleComponent;
  }

  protected get appDeclarationTypes(): any {
    return [ChildComponent];
  }
  
  protected get routes(): any {
    return [];
  }

  public onBeforeSerialize() {
    this.properties.description = this.rootComponent.description;
  }
  
  public onPropertyChange(propertyPath: string, newValue: any): void {
    if (propertyPath === "description") {
      this.rootComponent.description = newValue;
    }

    super.onPropertyChange(propertyPath, newValue);
  }

  protected updateChanges(): void {
    this.rootComponent.description = this.properties.description;
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
