import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import AppComponent from './components/app/app.component';
import SitesComponent from './components/sites/sites.component';
import SitesFormComponent from './components/sites/sites.form.component';
import SitesHomeComponent from './components/sites/sites.home.component';
import SitesViewComponent from './components/sites/sites.view.component';

const routes: Routes = [
  { path: '', component: SitesComponent, children: [
    { path: '', component: SitesHomeComponent },
    { path: 'sites', children: [
      { path: 'new', component: SitesFormComponent },
      { path: ':id', component: SitesViewComponent }
    ]},
  ]}
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
