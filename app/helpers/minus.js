import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function([a, b]) {
  return a - b;
});
