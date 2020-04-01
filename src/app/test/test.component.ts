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
import { Component, OnInit, OnChanges, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
// import { HttpClient } from '@angular/common/http';
// import { HttpService } from '../../service/http.service';

declare let document;

@Component({
  selector: 'app-test-component',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnChanges {
  constructor(private elementRef: ElementRef) {}

  selectedValue1 = 'jack';
  selectedValue2 = null;
  ranges1 = { 'Today': [ new Date(), new Date() ], 'This Month': [ new Date(), new Date() ] };
  // questionTypeSelector = this.elementRef.nativeElement.querySelector('nz-select');
  @ViewChild('questionTypeSelector') questionTypeSelector: ElementRef;
  // document.getElementById('questionTypeSelector')
  @ViewChild('domainSelector') domainSelector: ElementRef;
  @ViewChild('datePicker') datePicker: ElementRef;

  @ViewChild('waitSelectTreeCom') waitSelectTreeCom;
  @ViewChild('selectedTreeCom') selectedTreeCom;

  searchValue = '';

  waitSelectTreeNodes = [ {
    title   : '全部指标',
    key     : '100',
    children: [ {
      title   : 'HTTP类型指标',
      key     : '1001',
      children: [
        { title: 'HTTP请求次数', key: '10010', isLeaf: true},
        { title: 'HTTP请求成功次数', key: '10011', isLeaf: true}
      ]
    }, {
      title   : 'TCP类型指标',
      key     : '1002',
      children: [
        { title: 'TCP请求次数', key: '10020', isLeaf: true },
        { title: 'TCP时延类型指标', key: '10021', children: [
          { title: 'TCP请求时延', key: '100210', isLeaf: true},
          { title: 'TCP返回时延', key: '100211', isLeaf: true}
        ] },
        { title: 'TCP请求成功次数', key: '10022', isLeaf: true }
      ]
    } ]
  } ];

  selectedTreeNodes = [ {
    title   : '全部指标',
    key     : '100'
  } ];

  transNodes = [];
  maxLevelOfNodes = 0;

  checkedNode = ['10010'];
  selectedNode = [];

  nzCheck(event) {
    console.log(event);
  }

  check() {
    // console.log(this.waitSelectTreeNodes[0]);
    // console.log(this.waitSelectTreeCom.nzNodes[0]);
    // this.readTreeData(this.waitSelectTreeCom.nzNodes[0]);
    // this.addNode(this.selectedTreeCom.nzNodes[0]);
    // this.removeNode(this.waitSelectTreeCom.nzNodes[0]);
    // // this.removeNode(this.waitSelectTreeCom.nzNodes[0]);
    // this.transNodes = [];
    // console.log(this.transNodes);
    // console.log(this.maxLevelOfNodes);
    // this.waitSelectTreeCom.nzNodes[0].addChildren([
    //   { title: 'Child Node', key: `666` }]);

    this.removeSpecNode(this.selectedTreeCom.nzNodes[0], '100211', false);
    this.addNode(this.waitSelectTreeCom.nzNodes[0]);
    this.removeNode(this.selectedTreeCom.nzNodes[0]);
    this.transNodes = [];
  }
  treeData(data) {
    const tree = data.filter((father) => {              // 循环所有项
      const branchArr = data.filter((child) => {
        return father.id === child.parentId;      // 返回每一项的子级数组
      });
      if (branchArr.length > 0 && (branchArr.isChecked || branchArr.isHalfChecked)) {
        father.children = branchArr;    // 如果存在子级，则给父级添加一个children属性，并赋值
      }
      return father.parentId === 0;      // 返回第一层
    });
    return tree;     // 返回树形数据
  }


  readTreeData(node) {
    // 把需要转换的节点放到一个数组中
    if (node.isChecked === true || node.isHalfChecked) {
      // console.log(node); // 单个节点
      this.transNodes.push(node);
    }
    // 更新树的最大级数
    if (node.level >= this.maxLevelOfNodes) {
      this.maxLevelOfNodes = node.level;
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        this.readTreeData(node.children[i]);
      }
    }
  }

  addNode(node) {
    if (!node.isLeaf) {
      // console.log(node.level);
      for (let i = 1; i <= this.maxLevelOfNodes; i++) {
        if ((node.level + 1) === i) {
          this.transNodes.forEach(transNode => {
            if (transNode.level === i && node.key === transNode.parentNode.key) {
              let nodeIsExist = false;
              // 判断是否已添加该节点
              node.children.forEach(child => {
                if (child.key === transNode.key) {
                  nodeIsExist = true;
                }
              });
              if (!nodeIsExist) {
                node.addChildren([{title: transNode.title, key: transNode.key}]);
              }
            }
          });
        }
      }
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        this.addNode(node.children[i]);
      }
    }
  }

  removeNode(node) {
    // 把半选状态都去掉
    node.isHalfChecked = false;
    // 把已选择的点进行删除
    if (node.isChecked === true && node.parentNode !== null) {
       // console.log(node); // 单个节点
      node.parentNode.children.forEach((child) => {
        if (node.key === child.key) {
          const index = node.parentNode.children.indexOf(child);
          node.parentNode.children.splice(index, 1);
          this.removeNode(node.parentNode);
        }
      });
    }
    // 当删除至最后一个点时，把‘全部指标’的状态恢复至未选
    if (node.key === '100') {
      node.isChecked = false;
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        this.removeNode(node.children[i]);
      }
    }
  }

  removeSpecNode(node, key, finded) {
    // 把需要转换的节点放到一个数组中
    if (node.key === key || finded) {
      // 找到要删除的对应节点
      if (node.key === key) {
        node.setChecked(true, false);
        this.transNodes.push(node);
      }
      // 递归遍历他的父节点
      if (node.parentNode !== null) {
        node.parentNode.isHalfChecked = true;
        this.transNodes.push(node);
        this.removeSpecNode(node.parentNode, key, true);
      }
    }

    // 更新树的最大级数
    if (node.level >= this.maxLevelOfNodes) {
      this.maxLevelOfNodes = node.level;
    }

    //  递归查找需要删除的对应节点
    if (node.children && node.children.length > 0 && !finded) {
      for (let i = 0; i < node.children.length; i++) {
        this.removeSpecNode(node.children[i], key, false);
      }
    }
  }

  toLeft() {
    this.readTreeData(this.selectedTreeCom.nzNodes[0]);
    this.addNode(this.waitSelectTreeCom.nzNodes[0]);
    this.removeNode(this.selectedTreeCom.nzNodes[0]);
    this.transNodes = [];
  }
  toRight() {
    this.readTreeData(this.waitSelectTreeCom.nzNodes[0]);
    this.addNode(this.selectedTreeCom.nzNodes[0]);
    this.removeNode(this.waitSelectTreeCom.nzNodes[0]);
    this.transNodes = [];
  }



  ngOnInit(): void {
    // console.log(this.elementRef.nativeElement);
    console.log(document.querySelector('nz-select').classList);
    console.log(document.getElementsByClassName('ant-calendar-picker-input'));
    console.log(document.querySelector('nz-range-picker').className = 'warning');

  }
  ngOnChanges(): void {
  }
}
