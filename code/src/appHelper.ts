import { from } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray, bufferCount } from 'rxjs/operators';

export class AppHelper {
  static async groupBy<T>(data: T[], func: (obj: T) => any) {
    return new Promise((resolve, reject) => {
      const arr: any[] = [];
      from(data).pipe(
        groupBy(func),
        mergeMap<any, any>(group$ => group$.pipe(toArray())),
        // mergeMap<any, any>(group$ => group$.pipe(
        //   reduce((acc, cur) => [...acc, cur], [])
        // ))
      ).subscribe(obj => {
        arr.push(obj);
      }, (err) => {
        reject(err);
      }, () => {
        resolve(arr);
      });
    });
  }

  static async chunk<T>(data: T[], chunkSize: number) {
    return new Promise((resolve, reject) => {
      const arr: any[] = [];
      from(data).pipe(
        bufferCount(chunkSize)
      ).subscribe(a => {
        arr.push(a);
      }, (err) => {
        reject(err);
      }, () => {
        resolve(arr);
      });
    });
  }
}