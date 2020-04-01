/**
 * <b><code>loginComponent</code></b>
 * <p/>
 * @Description: 登录业务逻辑TypeScript
 * <p/>
 * @Creation Time: 2018/10/15 11:41.
 *
 * @Author: husiyuan
 * @Since: angularPractiseDemo 0.1.0
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { ACLService } from '@delon/acl';
import { HttpService } from '../../service/http.service';
import {Observable} from 'rxjs/Observable';


@Component({
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  submitted = false;
  httpPostSubscriber: Observable<Object>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http2: HttpClient,
    private message: NzMessageService,
    // private http: HttpService
  ) {   }

  /**
   *@desc 登录
   *@author husiyuan
   *@date 2018/11/13 18:49:29
   */
  submitForm() {
    if (this.validateForm.invalid) {
      console.log('登录失败');
      return false;
    }
    console.log('尝试登录');
    // if ( this.http.abc()) {
    //   console.log('abc登录成功');
    //   this.http.post('login', {
    //     'username': this.validateForm.value['userName'],
    //     'password': this.validateForm.value['password']
    //   }, null, {headers: {'Content-Type': 'application/json'}
    //   }).subscribe((result: boolean) => {
    //     console.log('登录结果:' + result);
    //     if (result) {
    //       console.log('登录成功');
    //       this.submitted = true;
    //     }
    //     // if (result.isLogined) {
    //     //   console.log('登录成功');
    //     //   this.submitted = true;
    //     //   // 登录成功
    //     //   this.router.navigate(['/index', this.validateForm.value['userName']]);
    //     //   this.createMessage('success');
    //     // } else {
    //     //   // 登录失败
    //     //   this.createMessage('error');
    //     // }
    //   });
    // }
    const httpPostFunc = this.http2.post('login', {
      'username': this.validateForm.value['userName'],
      'password': this.validateForm.value['password']
    });
    this.httpPostSubscriber = httpPostFunc;
    httpPostFunc.subscribe((result: boolean) => {
      console.log('httpClient登录结果:' + result);
      if (result) {
        // 登录成功
        console.log('httpClient登录成功');
        this.submitted = true;
        this.router.navigate(['/index', this.validateForm.value['userName']]);
        this.createMessage('success');
      } else {
        // 登录失败
        this.createMessage('error');
      }
    });

    // const httpPostFunc = this.http.post('login', {
    //   'username': this.validateForm.value['userName'],
    //   'password': this.validateForm.value['password']
    // }, null, {headers: {'Content-Type': 'application/json'}
    // });
    // this.httpPostSubscriber = httpPostFunc;
    // httpPostFunc.subscribe((result: boolean) => {
    //   console.log('登录结果:' + result);
    //   if (result) {
    //     console.log('登录成功');
    //     this.submitted = true;
    //   }
    //   // if (result.isLogined) {
    //   //   console.log('登录成功');
    //   //   this.submitted = true;
    //   //   // 登录成功
    //   //   this.router.navigate(['/index', this.validateForm.value['userName']]);
    //   //   this.createMessage('success');
    //   // } else {
    //   //   // 登录失败
    //   //   this.createMessage('error');
    //   // }
    // });
  }

  /**
   *@desc 实现登录结果弹窗
   *@param type 登录结果
   *@author husiyuan
   *@date 2018/11/13 18:31:50
   */
  createMessage(type: string): void {
    if (type === 'success') {
      this.message.create(type, this.validateForm.value['userName'] + ` 登录成功，欢迎使用本系统`);
    } else {
      this.message.create(type, `登录失败，请重试！`);
    }
  }
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ false ]
    });
  }
}
