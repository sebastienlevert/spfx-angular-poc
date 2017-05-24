import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigurationService } from "./ConfigurationService";
import { DataService } from "./DataService";
import { ISitesService } from "./ISitesService";
import { ISiteCreationInformation, ISiteCreationResponse } from "./../models";

@Injectable()
export class SitesService extends DataService implements ISitesService {
  constructor(@Inject(Http) private http: Http, @Inject(ConfigurationService) private configurationService: ConfigurationService) {
    super();
  }

  public createSite(siteInformation: ISiteCreationInformation): Observable<ISiteCreationResponse> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
 
    let functionUrl = `${this.configurationService.functionUrl}?code=${this.configurationService.functionKey}`;
    return this.http.post(functionUrl, siteInformation, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}