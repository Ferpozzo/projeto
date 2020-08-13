import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { LoadComponent } from './components/load/load/load.component';
import { RegisterComponent } from './components/register/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/home/home/home.component';
import { ChartComponent } from './components/chart/chart/chart.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './reducers/chart.reducer';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { ChartEffects } from './effects/chart.effects';
import { UserComponent } from './user/user/user.component';
import { userReducer } from './reducers/user.reducer';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoadComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ChartComponent,
    UserComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      count: counterReducer,
      user: userReducer
    }),
    EffectsModule.forRoot([UserEffects]),
    /* StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }), */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
