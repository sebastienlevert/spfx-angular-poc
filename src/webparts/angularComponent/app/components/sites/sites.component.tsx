import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, Input, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

@Component({
  selector: "sites",
  template: '<div #commandBar></div><router-outlet></router-outlet>'
})
export default class SitesComponent implements OnInit {
  @ViewChild('commandBar') commandBarElement: ElementRef;

  private menuItems = [
     {
      key: 'homeSite',
      name: 'Home',
      icon: 'Home',
      onClick: () => { this.router.navigateByUrl('/', { skipLocationChange: true }); },
    },
    {
      key: 'newItem',
      name: 'New Site',
      icon: 'Add',
      onClick: () => { this.router.navigateByUrl('sites/new', { skipLocationChange: true }); },
    }
  ];

  constructor(@Inject(Router) private router: Router) {
    this.router = router;
  }

  ngOnInit() {
    ReactDOM.render(<CommandBar items={ this.menuItems } />, this.commandBarElement.nativeElement);
  }
}
