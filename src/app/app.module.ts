import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './app-routing.module';
import { DelonACLModule } from '@delon/acl';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from './_mock';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import {TestComponent} from './test/test.component';
import {MembersDetailComponent} from './membersDetail/membersDetail.component';

import {HttpService} from '../service/http.service';
import {CapitalPipe} from '../service/capital.pipe';

import {MapApi} from './map/map.service';

const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA, log: true }) ] : [];

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    TestComponent,
    MembersDetailComponent,
    CapitalPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    DelonACLModule.forRoot(),
    ...MOCKMODULE
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HttpService,
    MapApi
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
