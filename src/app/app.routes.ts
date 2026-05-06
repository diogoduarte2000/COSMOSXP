import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'CosmosXP | Home'
  },
  {
    path: 'solar-system',
    loadComponent: () => import('./features/solar-system/solar-system.component').then(m => m.SolarSystemComponent),
    title: 'CosmosXP | Solar System'
  },
  {
    path: 'galaxy',
    loadComponent: () => import('./features/galaxy/galaxy.component').then(m => m.GalaxyComponent),
    title: 'CosmosXP | Galaxy'
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/events.component').then(m => m.EventsComponent),
    title: 'CosmosXP | Cosmic Events'
  },
  {
    path: 'apod',
    loadComponent: () => import('./features/apod/apod.component').then(m => m.ApodComponent),
    title: 'CosmosXP | Astronomy Picture of the Day'
  },
  {
    path: 'explore',
    loadComponent: () => import('./features/explore/explore.component').then(m => m.ExploreComponent),
    title: 'CosmosXP | Explore'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
