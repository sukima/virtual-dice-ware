'use strict';

define('virtual-dice-ware/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/dice-code.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/dice-code.js should pass ESLint\n\n');
  });

  QUnit.test('components/entropy-meter.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/entropy-meter.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/paginate-controls.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/paginate-controls.js should pass ESLint\n\n');
  });

  QUnit.test('components/tab-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/tab-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/words-search.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/words-search.js should pass ESLint\n\n1:20 - \'observer\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/about.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application-error.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application-error.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/entropy.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/entropy.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/words.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/words.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/minus.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/minus.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('services/ajax.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/ajax.js should pass ESLint\n\n');
  });

  QUnit.test('services/random.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/random.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });

  QUnit.test('utils/errors/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/errors/application.js should pass ESLint\n\n');
  });

  QUnit.test('utils/errors/missing-word-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/errors/missing-word-list.js should pass ESLint\n\n');
  });
});
define('virtual-dice-ware/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('virtual-dice-ware/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'virtual-dice-ware/tests/helpers/start-app', 'virtual-dice-ware/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name, options = {}) {
    (0, _qunit.module)(name, {
      beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _destroyApp.default)(this.application);
      }
    });
  };
});
define('virtual-dice-ware/tests/helpers/resolver', ['exports', 'virtual-dice-ware/resolver', 'virtual-dice-ware/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('virtual-dice-ware/tests/helpers/start-app', ['exports', 'virtual-dice-ware/app', 'virtual-dice-ware/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    let application;

    let attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    Ember.run(() => {
      application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('virtual-dice-ware/tests/test-helper', ['virtual-dice-ware/app', 'virtual-dice-ware/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('virtual-dice-ware/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
define('virtual-dice-ware/config/environment', [], function() {
  var prefix = 'virtual-dice-ware';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('virtual-dice-ware/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
