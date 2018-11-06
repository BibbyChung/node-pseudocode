import { Caculator } from "./decorate/methodDecorator";

const fn = () => {
  const c = new Caculator();
  const result = c.sum(3, 2);
  console.log('real world => ', result);

};
fn();
