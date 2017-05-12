import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Component, Input, OnInit, ElementRef, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton, Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { DialogComponent } from "./dialog.component";
import { SitesService } from "./../../services/sites.service";
import { ConfigurationService } from "./../../services/configuration.service";

@Component({
  selector: `sites-classic-form`,
  template: require("./templates/sites.form.template.html") as string,
  providers: [SitesService]
})
export default class SitesClassicFormComponent implements OnInit {
  @ViewChild('siteTitle') siteTitleElement: ElementRef;
  @ViewChild('siteDescription') siteDescriptionElement: ElementRef;
  @ViewChild('siteUrl') siteUrlElement: ElementRef;
  @ViewChild('sitePrivate') sitePrivateElement: ElementRef;
  @ViewChild('buttonSection') buttonSectionElement: ElementRef;
  @ViewChild(DialogComponent) dialogComponent: DialogComponent;

  private siteTitle: string = "";
  private siteDescription: string = "";
  private siteUrl: string = "";
  private sitePrivate: boolean = true;
  private siteAbsoluteUrl: string = "";

  public dialog = {
    title: "Creating Modern Site",
    description: "Hold on. That should be quick! (Well... That's what the SharePoint Team promised!)",
    isOpen: false
  }

  public errorMessage = "";

  constructor(@Inject(Router) private router: Router, @Inject(SitesService) private sitesService: SitesService) {
  }

  ngOnInit() {
    ReactDOM.render(<TextField label='Site Title' required={ true } onChanged={ this._onSiteTitleChanged } />, this.siteTitleElement.nativeElement);
    ReactDOM.render(<TextField label='Site Description' multiline rows={ 4 } onChanged={ this._onSiteDescriptionChanged } />, this.siteDescriptionElement.nativeElement);
    ReactDOM.render(<TextField label='Site URL' required={ true } onChanged={ this._onSiteUrlChanged } />, this.siteUrlElement.nativeElement);
    ReactDOM.render(<Toggle defaultChecked={ true } label='Site is Private' onText='Yes' offText='No' onChanged={ this._onSitePrivateChanged } />, this.sitePrivateElement.nativeElement);
    ReactDOM.render(
      <div>
        <Button buttonType={ ButtonType.primary } text='Create Site' onClick={ this._onCreateSite } />
        <Button text='Cancel' onClick={ this._onCancel } />
      </div>, this.buttonSectionElement.nativeElement);
  }

  private resetForm() {
    this.siteDescription = "";
    this.siteTitle = "";
    this.siteUrl = "";
  }
  @autobind
  private _onCreateSite() {
    let siteInformation: any = {
      title: this.siteTitle,
      description: this.siteDescription,
      url: this.siteUrl,
      private: this.sitePrivate
    };

    this.dialogComponent.toggle();
    this.sitesService
      .createSite(this.siteTitle, this.siteDescription, this.siteUrl)
      .subscribe(
        site => {
          this.dialogComponent.toggle();
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "data": JSON.stringify(site)
            },
            skipLocationChange: true
          };
          this.router.navigate(["/sites", site.id], navigationExtras);
        },
        error =>  this.errorMessage = error);
  }

  @autobind
  private _onCancel() {
    this.router.navigateByUrl("/");
  }

  @autobind
  private _onSiteTitleChanged(value: any) {
    this.siteTitle = value;
  }
  
  @autobind
  private _onSiteDescriptionChanged(value: any) {
    this.siteDescription = value;
  }
  
  @autobind
  private _onSiteUrlChanged(value: any) {
    this.siteUrl = value;
  }
  
  @autobind
  private _onSitePrivateChanged(value: any) {
    this.sitePrivate = value;
  }
}
