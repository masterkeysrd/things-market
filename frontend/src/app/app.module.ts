import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GraphQLModule } from './graphql.module';
import { WidgetsModule } from './components/widgets/widgets.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgbModule,
    WidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
