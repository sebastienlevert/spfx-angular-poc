import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  constructor() {

  }

  private _functionUrl: string = "https://sebastienlevert-functions.azurewebsites.net/api/PS-Create-ModernSite";
  set functionUrl(functionUrl: string) {
    this._functionUrl = functionUrl;
  }
  get functionUrl() {
    return this._functionUrl;
  }

  private _functionKey: string = "CK0RapJSHYtYiM2sGEoRtWKoZnbzCaMwhfsSNk04a3G10tgyYMafSA==";
  set functionKey(functionKey: string) {
    this._functionKey = functionKey;
  }
  get functionKey() {
    return this._functionKey;
  }
}