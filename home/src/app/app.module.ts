import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import {HttpClientModule} from "@angular/common/http";
import {LinkService} from "./link.service";
import { LinkDetailComponent } from './link-detail/link-detail.component';
import {FormsModule} from "@angular/forms";
import { MessagesComponent } from './messages/messages.component';
import {MessageService} from "./message.service";


@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    LinkDetailComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [LinkService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
