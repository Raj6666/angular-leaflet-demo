/** Create async observable that emits-once and completes
 *  after a JS engine turn */

import {defer} from 'rxjs/index';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
