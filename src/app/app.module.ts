import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from  './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/public/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.modules';
import { EventsComponent } from './components/public/events/events/events.component';
import { CreateEventComponent } from './components/public/events/create-event/create-event.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { JwtAuthorization } from './interceptors/JWTAuthorization';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { ErrorNotifierComponent } from './components/common/notification/error/error-notifier/error-notifier.component';
import { EventDetailsComponent } from './components/public/events/event-details/event-details.component';
import { LocationsComponent } from './components/public/locations/locations.component';
import { EditEventComponent } from './components/public/events/edit-event/edit-event.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/public/about/about.component';
import { JoinedEventsComponent } from './components/public/events/joined-events/joined-events.component';
import { InterstedEventsComponent } from './components/public/events/intersted-events/intersted-events.component';
import { MyEventsComponent } from './components/public/events/my-events/my-events.component';
import { ProfileComponent } from './components/public/user/profile/profile/profile.component';
import { RoleManagerComponent } from './components/admin/role-manager/role-manager.component';
import { AccountModeratorComponent } from './components/admin/account-moderator/account-moderator.component';
import { LocationManagerComponent } from './components/admin/location-manager/location-manager.component';
import { EventModeratorComponent } from './components/admin/event-moderator/event-moderator.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    EventsComponent,
    CreateEventComponent,
    UnauthorizedComponent,
    ErrorNotifierComponent,
    EventDetailsComponent,
    LocationsComponent,
    EditEventComponent,
    IndexComponent,
    AboutComponent,
    JoinedEventsComponent,
    InterstedEventsComponent,
    MyEventsComponent,
    ProfileComponent,
    RoleManagerComponent,
    AccountModeratorComponent,
    LocationManagerComponent,
    EventModeratorComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthorization, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppModule { }
