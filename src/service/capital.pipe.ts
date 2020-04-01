/**
 * <b><code>CapitalPipe</code></b>
 * <p/>
 * @Description: 字符串转大写——管道过滤器
 * <p/>
 * @Creation Time: 2018/10/15 11:41.
 *
 * @Author: husiyuan
 * @Since: angularPractiseDemo 0.1.0
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capital'})
export class CapitalPipe implements PipeTransform {
  transform(val: string, all: boolean) {
    if (all) {
      return val.toLocaleUpperCase();
    }
    return val.substring(0, 1).toUpperCase() + val.substring(1);
  }
}
