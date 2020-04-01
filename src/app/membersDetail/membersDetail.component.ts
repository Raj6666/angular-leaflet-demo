/**
 * <b><code>membersDetailComponent</code></b>
 * <p/>
 * @Description: 用户详情页业务逻辑TypeScript
 * <p/>
 * @Creation Time: 2018/10/15 13:01.
 *
 * @Author: husiyuan
 * @Since: angularPractiseDemo 0.1.0
 */
import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-member-detail-table',
  templateUrl: './membersDetail.component.html',
  styleUrls: ['./membersDetail.component.scss']
})
export class MembersDetailComponent implements OnInit, OnChanges {
  @Input() module: string ;
  constructor(private http: HttpClient) {}
  searchValue = '';
  sortMap = {
    name   : null,
    gender : null,
    age    : null,
    address: null
  };
  pageSize = 6;
  sortName = null;
  sortValue = null;
  loading = false;
  data = [];
  displayData = [];
  ngOnInit(): void {
  }
  ngOnChanges(): void {
    console.log(666 + this.module);
    this.getMembers(this.module);
    this.searchValue = '';
    this.sortName = null;
    this.sortValue = null;
    this.sortMap = {
      name   : null,
      gender : null,
      age    : null,
      address: null
    };
  }
  /**
   *@desc 根据模块获取对应会员数据
   *@param module 模块
   *@author husiyuan
   *@date 2018/11/13 17:20:48
   */
  getMembers(module) {
    this.http.get('members', { params: { currentModule: module}})
      .subscribe((res: any) => {
        this.data = res;
        this.displayData = [ ...this.data ];
      });
  }
  /**
   *@desc 按年龄排序
   *@param sortName 排序对象
   *@param value 排序顺序
   *@author husiyuan
   *@date 2018/11/13 11:29:10
   */
  sort(sortName: string, value: boolean): void {
    this.loading = true;
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      if (this.sortMap.hasOwnProperty(key)) {
        this.sortMap[ key ] = (key === sortName ? value : null);
      }
    }
    this.search();
  }
  /**
   *@desc 按用户查找
   *@param item 数据对象
   *@author husiyuan
   *@date 2018/11/13 17:18:55
   */
  filterFunc(item) {
    return item.name.indexOf(this.searchValue) !== -1;
  }

  /**
   *@desc 搜索与排序的统一出口
   *@author husiyuan
   *@date 2018/11/13 17:19:55
   */
  search(): void {
    this.displayData = [];
    const data = this.data.filter(item => this.filterFunc(item));
    this.displayData = data.sort((a, b) =>
      (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    this.loading = false;
  }
}
