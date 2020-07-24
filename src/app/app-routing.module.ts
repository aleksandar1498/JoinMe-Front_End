import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/public/home/home.component';
import { RoleAuthGuardService } from './auth/role-auth-guard.service';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CreateEventComponent } from './components/public/events/create-event/create-event.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { EventDetailsComponent } from './components/public/events/event-details/event-details.component';
import { EventsComponent } from './components/public/events/events/events.component';
import { LocationsComponent } from './components/public/locations/locations.component';
import { EditEventComponent } from './components/public/events/edit-event/edit-event.component';
import { IndexComponent } from './components/index/index.component';
import { ProfileComponent } from './components/public/user/profile/profile/profile.component';
import { RoleManagerComponent } from './components/admin/role-manager/role-manager.component';
import { LocationManagerComponent } from './components/admin/location-manager/location-manager.component';
import { LocationCreateComponent } from './components/public/locations/create/location-create/location-create.component';
import { LocationUpdateComponent } from './components/public/locations/update/location-update/location-update.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['USER', 'ADMIN']
    }
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'create', component: CreateEventComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['USER', 'ORGANIZER']
    }
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent
  },
  {
    path: 'events/edit/:id',
    component: EditEventComponent
  },
  { path: 'locations', component: LocationsComponent },
  {
    path: 'locations/edit/:id', component: LocationUpdateComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['ADMIN', 'ORGANIZER']
    },
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['ADMIN']
    },
  },
  {
    path: 'admin/accounts/roles', component: RoleManagerComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['ADMIN']
    }
  },
  {
    path: 'admin/locations', component: LocationManagerComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['ADMIN']
    }
  },
  {
    path: 'admin/locations/new', component: LocationCreateComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['ADMIN']
    }
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [RoleAuthGuardService], data: {
      expectedRoles: ['USER', 'ORGANIZER']
    },
  },
  { path: 'unauthorized', component: UnauthorizedComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }