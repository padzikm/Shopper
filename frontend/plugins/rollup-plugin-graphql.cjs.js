'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var loader = _interopDefault(require('graphql-tag/loader'));
var os = require('os');

var toESModules = function (source) {
  if (typeof source !== "string") {
    return source;
  }

  return replaceRequires(replaceModuleExports(source));
};

function replaceModuleExports(source) {
  return source;//.replace('module.exports = doc', 'export default doc');
}

function replaceRequires(source) {
  var imports = {};
  var index = 0;
  
  // replace a require statement with a variable
  source = source.replace(/require\(([^)]+)\)/ig, function (match, path) {
    path = path.replace(/[\"\']+/g, '');
    
    if (!imports[path]) {
      imports[path] = "frgmt" + (++index);
    }
    
    return imports[path];
  });

  // prepare import statements
  var importsOutput = Object.keys(imports)
    .map(function (path) { return ("import " + (imports[path]) + " from \"" + path + "\";"); })
    .join(os.EOL);

  return importsOutput + os.EOL + source;
}

function graphql (options) {
	if ( options === void 0 ) options = {};

	// path filter
	var filter = rollupPluginutils.createFilter(options.include, options.exclude);
	// only .graphql and .gql files
	var filterExt = /\.(graphql|gql)$/i;

	return {
		name: 'graphql',
		transform: function transform (source, id) {
			if (!filter(id)) { return null; }
			if (!filterExt.test(id)) { return null; }
      
			// XXX: this.cachable() in graphql-tag/loader
			var code = toESModules(loader.call({cacheable: function cacheable () {}}, source));
      
			return { code: code };
		}
	};
}

module.exports = graphql;
//# sourceMappingURL=rollup-plugin-graphql.cjs.js.map
