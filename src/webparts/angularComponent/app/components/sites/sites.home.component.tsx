import { Component } from '@angular/core';

@Component({
  selector: "sites-home",
  template: `
    <div class="ms-Grid">
      <div class="ms-Grid-row">
        <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <span class="ms-font-su">Angular Webpart using SharePoint Framework</span>
        </div>
        <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <span class="ms-font-xl">Overview</span>
        </div>
        <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <p>This sample shows how to integrate Angular with the SharePoint Framework without breaking everything! This is a prototype and more testing would be necessary but it's a great starting point.</p>
        </div>
      </div>
    </div>`
})
export default class SitesHomeComponent {
}
