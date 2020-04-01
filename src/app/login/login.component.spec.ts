/**
 * <b><code>loginComponent</code></b>
 * <p/>
 * @Description: 登录页单元测试
 * <p/>
 * @Creation Time: 2018/10/15 12:03.
 *
 * @Author: husiyuan
 * @Since: angularPractiseDemo 0.1.0
 */
import { BrowserModule, By } from '@angular/platform-browser';
import {async, ComponentFixture,  TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../_mock';


describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let originalTimeout;

  beforeEach(async(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const MOCKMODULE =  [ DelonMockModule.forRoot({ data: MOCKDATA, log: true}) ];
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        HttpClientTestingModule,
        ...MOCKMODULE
      ],
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });

  }));

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('form call the onSubmit method', () => {
    fixture.detectChanges();
    spyOn(comp, 'submitForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click(); // 模拟在html界面上点击onSubmit，此时是不能被点击的，因为没有输入，所以次数应该是0
    expect(comp.submitForm).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid', async(() => {
    fixture.detectChanges();
    console.log(comp.validateForm);
    comp.validateForm.controls['userName'].setValue('');
    comp.validateForm.controls['password'].setValue('');
    expect(comp.validateForm.valid).toBeFalsy();
  }));

  it('form should be vaild', async(() => {
    fixture.detectChanges();
    console.log(comp.validateForm);
    comp.validateForm.controls['userName'].setValue('admin');
    comp.validateForm.controls['password'].setValue('admin');
    expect(comp.validateForm.valid).toBeTruthy();
  }));

  it('login success', (done: DoneFn) => {
    fixture.detectChanges();
    comp.validateForm.controls['userName'].setValue('man');
    comp.validateForm.controls['password'].setValue('man');

    // el = fixture.debugElement.query(By.css('button')).nativeElement;
    // console.log(el);
    // el.click(); // 模拟在html界面上点击onSubmit，此时是可以被点击的， 应该登录成功
    comp.submitForm();
    comp.httpPostSubscriber.subscribe(() => {
      fixture.detectChanges();
      console.log(comp.submitted);
      expect(comp.submitted).toBeTruthy();
      done();
    });
   });
});
