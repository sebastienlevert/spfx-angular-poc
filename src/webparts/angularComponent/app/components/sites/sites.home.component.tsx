import { Component, Inject } from '@angular/core';
import { ConfigurationService } from "./../../services/ConfigurationService";

@Component({
  selector: "sites-home",
  template: require("./templates/sites.home.template.html") as string
})
export default class SitesHomeComponent {
  private title: string = "";
  constructor(@Inject(ConfigurationService) private configurationService: ConfigurationService) {
    this.title = configurationService.description;
  }
}