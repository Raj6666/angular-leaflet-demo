/**
 * <b><code>IndexComponent</code></b>
 * <p/>
 * @Description: 首页单元测试
 * <p/>
 * @Creation Time: 2018/10/15 11:01.
 *
 * @Author: husiyuan
 * @Since: angularPractiseDemo 0.1.0
 */
import { BrowserModule, By } from '@angular/platform-browser';
import {async, ComponentFixture,  TestBed} from '@angular/core/testing';
import { IndexComponent } from './index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {DelonACLModule} from '@delon/acl';
import {CapitalPipe} from '../../service/capital.pipe';
import {MembersDetailComponent} from '../membersDetail/membersDetail.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../_mock';


////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let component: IndexComponent;
let fixture: ComponentFixture<IndexComponent>;
let ul: HTMLElement;
let lis: HTMLCollection;
// let page: Page;

////// Tests //////
describe('IndexComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    const routerSpy = createRouterSpy();
    const MOCKMODULE =  [ DelonMockModule.forRoot({ data: MOCKDATA, log: true}) ];

    TestBed.configureTestingModule({
      imports:
        [ BrowserModule,
          NgZorroAntdModule,
          FormsModule,
          HttpClientTestingModule,
          DelonACLModule.forRoot(),
          ...MOCKMODULE],
      declarations:
        [ IndexComponent,
          MembersDetailComponent,
          CapitalPipe], // NO!  DOUBLE DECLARATION
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useValue: routerSpy},
      ]
    })
      .compileComponents();
  });

  describe('when navigate to user', () => {

    beforeEach(() => {
      activatedRoute.setParamMap({username: 'man'});
      createComponent();
    });

    it('login user should be man', () => {
      console.log(lis);
      console.log(lis);
      expect(component.username).toBe('man');
    });
    it('member module and woman module should be hidden', () => {
      console.log(lis);
      expect(lis[0].classList.contains('acl__hide')).toBeTruthy();
      expect(lis[2].classList.contains('acl__hide')).toBeTruthy();
    });
    it('man module should be showed', () => {
      expect(lis[1].classList.contains('acl__hide')).toBeFalsy();
    });
  });

});

function createComponent() {
  fixture = TestBed.createComponent(IndexComponent);
  component = fixture.componentInstance;
  ul =  fixture.debugElement.query(By.css('.headerNav')).nativeElement;
  lis = ul.children;
  // page = new Page(fixture);

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
  });
}

function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}
