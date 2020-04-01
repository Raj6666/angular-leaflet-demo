// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'angularPractiseDemo'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('angularPractiseDemo');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to angularPractiseDemo!');
//   }));
// });


//  若干的测试用例，因此将这些测试用例集合在一个分类下就叫Test Suite。
//  Jasmine 就是使用 describe 全局函数来表示，它的第一个字符串参数用来表示Suite的名称或标题，第二个方法参数就是实现Suite代码了。
// describe('sample suite', function() {
//   let foo;
//   beforeEach(function() {
//     foo = 0;
//     foo += 1;
//   });
//
//   afterEach(function() {
//     foo = 1;
//   });
//
//   // 一个Specs，相当于测试用例
//   // Jasmine 就是使用 it 全局函数来表示，和 describe 类似，字符串和方法两个参数。
//   // 而每个 Spec 内包括多个 expectation 来测试需要测试的代码，只要任何一个 expectation 结果为 false 就表示该测试用例为失败状态。
//   it('contains spec with an expectation', function() {
//
//     // 断言，使用 expect 全局函数来表示，只接收一个代表要测试的实际值，并且需要与 Matcher 代表期望值。
//     expect(foo).toBe(1);
//     expect(true).not.toBe(false);
//   });
// });


// Spy 可以用于监测函数是否被调用

// 当我们需要写一段Angular单元测试时，是需要先提供一个测试模块，
// 即：使用 TestBed.configureTestingModule 来构建，
// Angular工具集提供的用于快速创建一个测试 NgModule，并且他接受的参数，跟 NgModule 并无任何差异。
