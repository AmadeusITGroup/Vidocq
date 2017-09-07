import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DatabaseComponent } from './database/database.component';
import { CollectionComponent } from './collection/collection.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/database', pathMatch: 'full' },
    { path: 'database', component: DatabaseComponent },
    { path: 'collection/:collection/:database', component: CollectionComponent },
];

export const AppRouting = RouterModule.forRoot(appRoutes, { useHash: true });
