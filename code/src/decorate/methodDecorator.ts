function myMethodDecorator(postfix: number) {
  console.log(`sum(): evaluated ==> ${postfix}`);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
    console.log(`sum(): called ===> ${postfix}`);

    return Object.assign({}, descriptor, {
      value: function (...args: any[]) {
        const result = descriptor.value.apply(this, args);
        console.log('decorator => ', result);
        return 'no execute';
      }
    });
  }
}

export class Caculator {
  baseV = 10

  @myMethodDecorator(0)
  @myMethodDecorator(1)
  sum(a: number, b: number) {
    return this.baseV + a + b;
  }
}