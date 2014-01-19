
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
  var Main,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  module.exports = Main = (function() {
    function Main() {
      this.animate = __bind(this.animate, this);
    }

    Main.prototype.constuctor = function() {};

    Main.prototype.startup = function() {
      this.setup();
      return this.animate();
    };

    Main.prototype.setup = function() {
      var geometry, material;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.z = 1000;
      this.scene.add(this.camera);
      geometry = new THREE.CubeGeometry(200, 200, 200);
      material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
      this.renderer = new THREE.CanvasRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      return document.body.appendChild(this.renderer.domElement);
    };

    Main.prototype.animate = function() {
      requestAnimationFrame(this.animate);
      return this.render();
    };

    Main.prototype.render = function() {
      this.mesh.rotation.x += 0.02;
      this.mesh.rotation.y += 0.01;
      return this.renderer.render(this.scene, this.camera);
    };

    return Main;

  })();

}).call(this);
}, "app1/App1Main": function(exports, require, module) {(function() {
  var App1Main;

  App1Main = (function() {
    function App1Main() {}

    return App1Main;

  })();

}).call(this);
}});
