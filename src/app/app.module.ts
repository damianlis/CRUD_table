import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {SharedModule} from './shared/shared.module';
import {ShellComponent} from './shell/shell.component';
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {CreateUpdateDialogComponent} from './dialogs/create-update-dialog/create-update-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ShellComponent,
    DeleteDialogComponent,
    CreateUpdateDialogComponent
  ],
  entryComponents: [
    CreateUpdateDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
