import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvitationComponent } from './components/admin/invitation/invitation.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { path: 'invite', component: InvitationComponent }
];
