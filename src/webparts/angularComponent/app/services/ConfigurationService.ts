import { Injectable } from '@angular/core';
import { IApplicationConfigurationProps } from './IApplicationConfigurationProps';

@Injectable()
export class ConfigurationService {
  public functionUrl: string = "";
  public functionKey: string = "";
  public description: string = "";
  public styles: any = null;

  public load(data: IApplicationConfigurationProps) {
    this.functionUrl = data.functionUrl ? data.functionUrl : "";
    this.functionKey = data.functionKey ? data.functionKey : "";
    this.description = data.description ? data.description : "";
    this.styles = data.styles;
  }

  public isConfigured() : boolean {
    return !(this.functionKey == "" || this.functionUrl == "");
  }
}