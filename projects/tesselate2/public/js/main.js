
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"Main": function(exports, require, module) {(function() {
  var Comp1, Main;

  Comp1 = require("comp/Comp1");

  module.exports = Main = (function() {
    function Main() {}

    Main.prototype.constuctor = function() {};

    Main.prototype.startup = function() {
      return this.setup();
    };

    Main.prototype.setup = function() {
      var comp1;
      this.canvas = document.getElementById("canvas");
      this.canvas.width = this.canvas.height = 500;
      this.context = this.canvas.getContext("2d");
      comp1 = new Comp1();
      comp1.build();
      return this.render(comp1);
    };

    Main.prototype.render = function(comp) {
      var i, polygon, vertex, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.context.translate(150, 150);
      _ref = comp.polygons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polygon = _ref[_i];
        this.context.fillStyle = "#ff0000";
        this.context.lineStyle = "#ff0000";
        this.context.beginPath();
        _ref1 = polygon.vertices;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          vertex = _ref1[i];
          if (i === 0) {
            this.context.moveTo(vertex.x, vertex.y);
          } else {
            this.context.lineTo(vertex.x, vertex.y);
          }
        }
        this.context.lineTo(polygon.vertices[0].x, polygon.vertices[0].y);
        _results.push(this.context.stroke());
      }
      return _results;
    };

    return Main;

  })();

}).call(this);
}, "comp/Comp1": function(exports, require, module) {(function() {
  var Comp1, Polygon, Vertex;

  Polygon = require("geometry/Polygon");

  Vertex = require("geometry/Vertex");

  module.exports = Comp1 = (function() {
    function Comp1() {
      this.polygons = [];
    }

    Comp1.prototype.build = function() {
      var center, d, divisions, i, iterations, offset, pastVertices, poly, radians, radius, v1, v2, v3, _i, _j, _results;
      center = new Vertex(0, 0);
      iterations = 6;
      divisions = 12;
      radius = 40;
      radians = Math.PI / (divisions / 2);
      offset = 0;
      pastVertices = [center];
      _results = [];
      for (i = _i = 0; 0 <= iterations ? _i < iterations : _i > iterations; i = 0 <= iterations ? ++_i : --_i) {
        for (d = _j = 0; 0 <= divisions ? _j < divisions : _j > divisions; d = 0 <= divisions ? ++_j : --_j) {
          poly = new Polygon();
          v1 = center.clone();
          v2 = new Vertex(Math.cos((radians * d) + offset) * radius, Math.sin((radians * d) + offset) * radius);
          v3 = new Vertex(Math.cos((radians * (d + 1)) + offset) * radius, Math.sin((radians * (d + 1)) + offset) * radius);
          poly.vertices.push(v1, v2, v3);
          this.polygons.push(poly);
        }
        if (i % 2 === 1) {
          offset = 0;
        } else {
          offset = radians / 2;
        }
        _results.push(radius += (Math.random() * 10) + 10);
      }
      return _results;
    };

    return Comp1;

  })();

}).call(this);
}, "geometry/Edge": function(exports, require, module) {(function() {
  var Edge;

  module.exports = Edge = (function() {
    function Edge() {}

    return Edge;

  })();

}).call(this);
}, "geometry/Polygon": function(exports, require, module) {(function() {
  var Polygon, Vertex;

  Vertex = require("geometry/Vertex");

  module.exports = Polygon = (function() {
    Polygon.createTriangle = function(radius, radians) {
      var poly;
      poly = new Polygon();
      poly.vertices.push(new Vertex(0, 0));
      poly.vertices.push(new Vertex(Math.cos(-radians / 2) * radius, Math.sin(-radians / 2) * radius));
      poly.vertices.push(new Vertex(Math.cos(radians / 2) * radius, Math.sin(radians / 2) * radius));
      return poly;
    };

    function Polygon() {
      this.vertices = [];
    }

    Polygon.prototype.getVertexCount = function() {
      return this.vertices.length;
    };

    Polygon.prototype.computeEdges = function() {
      return null;
    };

    return Polygon;

  })();

}).call(this);
}, "geometry/Vertex": function(exports, require, module) {(function() {
  var Vertex;

  module.exports = Vertex = (function() {
    function Vertex(x, y) {
      this.x = x;
      this.y = y;
    }

    Vertex.prototype.set = function(x, y) {
      this.x = x;
      this.y = y;
      return null;
    };

    Vertex.prototype.clone = function() {
      return new Vertex(this.x, this.y);
    };

    return Vertex;

  })();

}).call(this);
}});
