import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Point} from '../../assets/leafletLocalMap/leaflet';
import {MapOptions} from './map.interface';

declare let L: any;

@Injectable()
export class MapApi {
  private myMap = null;
  private greenIcon = null;
  constructor() { }

  init(opts: MapOptions) {
    const { contain, f_type } = opts;
    this.myMap = L.map(contain, {
      minZoom: 0,
      maxZoom: 21
    }).setView([23.080332, 114.419185], 9);

    // 由于需要把地图对像传入闭包函数，所以用一个变量保存
    const map = this.myMap;

    // 设置栅格图层
    const gridLayerOptions = {};
    gridLayerOptions['tileSize'] = 150;  // 栅格像素大小
    gridLayerOptions['opacity'] = 0.8;   // 栅格图层透明度
    const tiles = new L.GridLayer(gridLayerOptions);
    tiles.createTile = function(coords) {// 创建栅格图层
      const tile = L.DomUtil.create('canvas', 'leaflet-tile');
      const ctx = tile.getContext('2d');
      const size = this.getTileSize();
      tile.width = size.x;
      tile.height = size.y;

      // 获取当前栅格左上角经纬度坐标点-------------------------------------
      // 将切片号乘以切片分辨率，默认为256pixel,得到切片左上角的绝对像素坐标
      const firstAbsPoint = coords.scaleBy(size);
      // 根据绝对像素坐标，以及缩放层级，反投影得到其经纬度
      const firstPoint = map.unproject(firstAbsPoint, coords.z);
      // 获取当前栅格右下角经纬度坐标点-------------------------------------
      const originLastPoint = new Point(coords.x + 1, coords.y + 1);
      const lastAbsPoint = originLastPoint.scaleBy(size);
      const lastPoint = map.unproject(lastAbsPoint, coords.z);

      // 默认栅格填充绿色
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(0, 0, size.x, size.y);

      // 若该点在指定区域内，则栅格填充红色
      const testPoint = [114.435142, 23.080344];
      if (firstPoint.lng <= testPoint[0] && testPoint[0] <= lastPoint.lng && firstPoint.lat >= testPoint[1] && testPoint[1] >= lastPoint.lat) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, size.x, size.y);
      }

      const actualCoords = map.unproject(firstAbsPoint, coords.z);

      ctx.fillStyle = 'black';
      ctx.fillText('x: ' + coords.x + ', y: ' + coords.y + ', zoom: ' + coords.z, 20, 20);
      ctx.fillText('lat: ' + actualCoords.lat , 20, 40);
      ctx.fillText('lon: ' + actualCoords.lng, 20, 60);
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size.x - 1, 0);
      ctx.lineTo(size.x - 1, size.y - 1);
      ctx.lineTo(0, size.y - 1);
      ctx.closePath();
      ctx.stroke();
      return tile;
    };


    // 设置瓦片图链接
    L.tileLayer(environment.tileLayer).addTo(this.myMap);

    // 把栅格图层添加至地图
    tiles.addTo(this.myMap);

    // 创建地图新窗格（控制不同图层的zIndex）
    this.renderF_Type(f_type);

    // 定位图标
    this.greenIcon = L.icon({
      iconUrl: './assets/leafletLocalMap/images/marker-icon.png', // 图标路径
      iconSize:     [20, 30], // icon定位图标长宽大小
      iconAnchor:   [10, 30], // 图标偏移位置
    });
  }

  renderF_Type(el: HTMLDivElement) {
    const F_Type = this.myMap.createPane('F_Type', el);
    console.log(F_Type);
  }
}
