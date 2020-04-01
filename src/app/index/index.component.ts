/**
 * <b><code>IndexComponent</code></b>
 * <p/>
 * @Description: 首页业务逻辑TypeScript
 * <p/>
 * @Creation Time: 2018/10/15 11:01.
 *
 * @Author: husiyuan
 * @Since: angularPractiseDemo 0.1.0
 */
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { ACLService } from '@delon/acl';
import {MapApi} from '../map/map.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('f_type') f_type_element: ElementRef;
  constructor(
    private map: MapApi,
    private route: ActivatedRoute,
    private router: Router,
    // private http: HttpClient,
    private aclService: ACLService) {}
    username: string;
    currentModule: string;

  /**
   *@desc 登出
   *@author husiyuan
   *@date 2018/11/13 18:50:01
   */
  logout() {
    this.aclService.setFull(false);
    this.aclService.setAbility([0]);
    this.router.navigate(['/login']);
  }
  /**
   *@desc 切换模块
   *@param module 模块
   *@author husiyuan
   *@date 2018/11/13 18:50:17
   */
  switchModule(module) {
    this.currentModule = module;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
    });
    // 根据用户设置模块权限点
    switch (this.username) {
      case 'admin': {
        this.aclService.setFull(true);
        break;
      }
      case 'man': {
        this.aclService.setAbility([1, 2]);
        break;
      }
      case 'woman': {
        this.aclService.setAbility([2]);
        break;
      }
      case 'visitor': {
        this.aclService.setAbility([3]);
        break;
      }
      default: break;
    }
    // 设置当前访问模块
    this.currentModule = this.username === 'admin' ? 'members' : this.username;
  }

  ngAfterViewInit() {
    this.map.init({
      contain: this.mapElement.nativeElement,
      f_type: this.f_type_element.nativeElement
    });
  }
}
