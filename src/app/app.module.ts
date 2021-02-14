import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LanguageService } from './services/language.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuakerLogoComponent } from './ui/quaker-logo/quaker-logo.component';
import { HeaderComponent } from './ui/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HomeComponent, QuakerLogoComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [LanguageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
