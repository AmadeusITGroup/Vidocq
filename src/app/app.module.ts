import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/Rx';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { DatabaseComponent } from './database/database.component';
import { HeaderComponent } from './header/header.component';
import { CollectionComponent } from './collection/collection.component';
import { TruncatePipe } from './truncate.pipe';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';

import { HttpErrorService } from './services/http-error.service';
import { DatabaseService } from './services/database.service';
import { CollectionService } from './services/collection.service';
import { ServerService } from './services/server.service';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    DatabaseComponent,
    HeaderComponent,
    CollectionComponent,
    TruncatePipe,
    JsonViewerComponent,
    MonacoEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    HttpErrorService,
    DatabaseService,
    CollectionService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
