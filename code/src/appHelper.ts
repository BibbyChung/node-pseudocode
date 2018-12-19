import { from, GroupedObservable } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray, bufferCount } from 'rxjs/operators';

export class AppHelper {
  static async groupBy<T>(data: T[], func: (obj: T) => any) {
    return new Promise<T[][]>((resolve, reject) => {
      const arr: any[] = [];
      from(data).pipe(
        groupBy(func),
        mergeMap<GroupedObservable<T[][], T>, T[]>(group$ => group$.pipe(toArray())),
        // mergeMap<GroupedObservable<T[][], T>, T[]>(group$ => group$.pipe(
        //   reduce<T>((acc, cur) => [...acc, cur], [])
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
    return new Promise<T[][]>((resolve, reject) => {
      const arr: T[][] = [];
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