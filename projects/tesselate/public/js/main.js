
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
}).call(this)({"Builder": function(exports, require, module) {(function() {
  var Builder, PolygonGeometry;

  PolygonGeometry = require("geometry/PolygonGeometry");

  module.exports = Builder = (function() {
    function Builder(numberOfShapes, alternating) {
      this.repeatedShapes = [];
      this.numberOfShapes = numberOfShapes || 5;
      this.alternating = alternating || true;
      this.meshes = [];
      this.guiFolder = null;
    }

    Builder.prototype.build = function() {
      var i, material, poly, shapeCount, _i;
      if (this.alternating) {
        shapeCount = this.numberOfShapes * 2;
      }
      material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });
      for (i = _i = 0; 0 <= shapeCount ? _i < shapeCount : _i > shapeCount; i = 0 <= shapeCount ? ++_i : --_i) {
        poly = new PolygonGeometry();
        poly.randomise();
        poly.build();
        this.repeatedShapes.push(poly);
        this.meshes.push(new THREE.Mesh(poly, material));
      }
      return null;
    };

    Builder.prototype.addAndPosition = function(scene) {
      var i, mesh, offset, _i, _len, _ref;
      offset = (this.meshes.length / 2) * 100;
      _ref = this.meshes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        mesh = _ref[i];
        mesh.position.x = i * 100 - offset;
        scene.add(mesh);
      }
      return null;
    };

    Builder.prototype.addToDatGui = function(gui) {
      var folder, groupFolder, i, shape, _i, _len, _ref;
      this.gui = gui;
      if (this.guiFolder) {
        this.guiFolder.remove();
      }
      this.guiFolder = this.gui.addFolder("Builder");
      _ref = this.repeatedShapes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        shape = _ref[i];
        if (i === 0) {
          groupFolder = this.guiFolder.addFolder("Geometry 1");
        } else if (i === this.numberOfShapes) {
          groupFolder = this.guiFolder.addFolder("Geometry 2");
        }
        folder = groupFolder.addFolder("Shape " + (i + 1));
        folder.add(shape, "outerRadius");
        folder.add(shape, "innerRadius");
        folder.add(shape, "sides");
        folder.add(shape, "scaleX");
        folder.add(shape, "scaleY");
        folder.add(shape, "zHeight");
      }
      return null;
    };

    Builder.prototype.update = function() {};

    return Builder;

  })();

}).call(this);
}, "GeomTest": function(exports, require, module) {(function() {
  var GeomTest;

  module.exports = GeomTest = (function() {
    function GeomTest(scene, camera) {
      this.scene = scene;
      this.camera = camera;
    }

    GeomTest.prototype.build = function() {
      this.geom = new THREE.TetrahedronGeometry(20);
      this.material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });
      this.mesh = new THREE.Mesh(this.geom, this.material);
      this.matrix = new THREE.Matrix4();
      return this.scene.add(this.mesh);
    };

    GeomTest.prototype.update = function() {
      this.matrix.identity();
      this.matrix.lookAt(this.camera.position, new THREE.Vector3(0, 0, 0), this.mesh.up);
      this.mesh.position.copy(this.camera.position);
      this.mesh.setRotationFromMatrix(this.matrix);
      return this.mesh.translateZ(-100);
    };

    return GeomTest;

  })();

}).call(this);
}, "Main": function(exports, require, module) {(function() {
  var Builder, GeomTest, Main, PolygonGeometry, ShlianGeometry,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ShlianGeometry = require("geometry/ShlianGeometry");

  PolygonGeometry = require("geometry/PolygonGeometry");

  Builder = require("Builder");

  GeomTest = require("GeomTest");

  module.exports = Main = (function() {
    function Main() {
      this.animate = __bind(this.animate, this);
    }

    Main.prototype.startup = function() {
      this.setup();
      return this.animate();
    };

    Main.prototype.setup = function() {
      var material;
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.z = 100;
      this.ambient = new THREE.AmbientLight(0x404040);
      this.light = new THREE.PointLight(0xFFFFFF, 1, 400);
      this.light.position.set(-150, 150, 150);
      this.scene = new THREE.Scene();
      this.scene.add(this.camera);
      this.scene.add(this.ambient);
      this.scene.add(this.light);
      this.builder = new Builder();
      this.builder.build();
      this.builder.addAndPosition(this.scene);
      material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
      this.test = new GeomTest(this.scene, this.camera);
      this.test.build();
      this.addGui();
      return null;
    };

    Main.prototype.animate = function() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.test.update();
      return this.render();
    };

    Main.prototype.addGui = function() {
      this.gui = new dat.GUI({
        autoPlace: false
      });
      this.builder.addToDatGui(this.gui);
      this.debug = $('<div></div>');
      this.debug.attr({
        'id': 'god'
      });
      this.debug.addClass('debug');
      this.debug.append(this.gui.domElement);
      $('body').append(this.debug);
      return this.gui.open();
    };

    Main.prototype.render = function() {
      return this.renderer.render(this.scene, this.camera);
    };

    return Main;

  })();

}).call(this);
}, "geometry/PolygonGeometry": function(exports, require, module) {(function() {
  var PolygonGeometry,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = PolygonGeometry = (function(_super) {
    __extends(PolygonGeometry, _super);

    function PolygonGeometry(outerRadius, scaleX, scaleY, sides, zHeight, innerRadius) {
      PolygonGeometry.__super__.constructor.call(this);
      this.outerRadius = outerRadius || 100;
      this.innerRadius = innerRadius || 70;
      this.scaleX = scaleX || 1;
      this.scaleY = scaleY || 1;
      this.sides = sides || 6;
      this.zHeight = zHeight || 30;
    }

    PolygonGeometry.prototype.randomise = function() {
      this.innerRadius = Math.round(Math.random() * 50 + 20);
      this.outerRadius = Math.round(this.innerRadius + (Math.random() * 50));
      this.scaleX = 1;
      this.scaleY = 1;
      this.sides = Math.round((Math.random() * 9) + 3);
      return null;
    };

    PolygonGeometry.prototype.build = function() {
      var face, i, sides, theta, thetaOffset, vertex, _i, _j, _k;
      thetaOffset = Math.PI / 2;
      if (this.innerRadius === this.outerRadius) {
        theta = (Math.PI * 2) / this.sides;
        sides = this.sides;
        for (i = _i = 0; 0 <= sides ? _i < sides : _i > sides; i = 0 <= sides ? ++_i : --_i) {
          vertex = new THREE.Vector3(Math.cos(theta * i + thetaOffset) * this.outerRadius * this.scaleX, Math.sin(theta * i + thetaOffset) * this.outerRadius * this.scaleY, 0);
          this.vertices.push(vertex);
        }
      } else {
        theta = (Math.PI * 2) / (this.sides * 2);
        sides = this.sides * 2;
        for (i = _j = 0; 0 <= sides ? _j < sides : _j > sides; i = 0 <= sides ? ++_j : --_j) {
          if (i % 2 === 0) {
            vertex = new THREE.Vector3(Math.cos(theta * i + thetaOffset) * this.outerRadius * this.scaleX, Math.sin(theta * i + thetaOffset) * this.outerRadius * this.scaleY, 0);
            this.vertices.push(vertex);
          } else {
            vertex = new THREE.Vector3(Math.cos(theta * i + thetaOffset) * this.innerRadius * this.scaleX, Math.sin(theta * i + thetaOffset) * this.innerRadius * this.scaleY, 0);
            this.vertices.push(vertex);
          }
        }
      }
      vertex = new THREE.Vector3(0, 0, this.zHeight);
      this.vertices.push(vertex);
      for (i = _k = 0; 0 <= sides ? _k < sides : _k > sides; i = 0 <= sides ? ++_k : --_k) {
        console.log(i, i + 1, this.vertices.length);
        face = new THREE.Face3(i, (i + 1) % sides, this.vertices.length - 1);
        this.faces.push(face);
      }
      this.computeFaceNormals();
      this.computeVertexNormals();
      return this.computeCentroids();
    };

    return PolygonGeometry;

  })(THREE.Geometry);

}).call(this);
}, "geometry/ShlianGeometry": function(exports, require, module) {(function() {
  var ShlianGeometry,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = ShlianGeometry = (function(_super) {
    __extends(ShlianGeometry, _super);

    function ShlianGeometry(sides, innerRadius, maxRadius, ringRatio, ringDivisorSteps) {
      ShlianGeometry.__super__.constructor.call(this);
      console.log("SET RING DIVSORORRRR", ringDivisorSteps);
      this.innerRadius = innerRadius || 10;
      this.maxRadius = maxRadius || 100;
      this.sides = sides || 6;
      this.ringRatio = ringRatio || Math.PI;
      this.ringDivisorSteps = ringDivisorSteps || [2, -5, 1, 2, -2, 1, 2, 3];
      this.update();
    }

    ShlianGeometry.prototype.update = function() {
      var bottomRadius, bottomVertex, centerVertex, height, i, leftVertex, midRadius, middleRadius, ratioIndex, rightVertex, ringCount, theta, topRadius, topVertex, vi, _i, _ref;
      bottomRadius = middleRadius = topRadius = 0;
      vi = 0;
      height = 0;
      ringCount = 0;
      console.log("update");
      while (topRadius < this.maxRadius) {
        if (ringCount === 0) {
          topRadius = this.innerRadius;
        } else {
          ratioIndex = (ringCount - 1) % (this.ringDivisorSteps.length - 1);
          topRadius = bottomRadius + (bottomRadius / (this.ringDivisorSteps[ratioIndex] * this.ringRatio));
        }
        console.log("THICKNESS", ringCount, topRadius - bottomRadius);
        midRadius = ((topRadius - bottomRadius) * .5) + bottomRadius;
        theta = (Math.PI * 2) / this.sides;
        console.log(topRadius);
        for (i = _i = 0, _ref = this.sides; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          centerVertex = new THREE.Vector3(Math.cos(i * theta) * midRadius, Math.sin(i * theta) * midRadius, height);
          leftVertex = new THREE.Vector3(Math.cos((theta * i) - (theta / 2)) * midRadius, Math.sin((theta * i) - (theta / 2)) * midRadius, 0);
          topVertex = new THREE.Vector3(Math.cos(i * theta) * topRadius, Math.sin(i * theta) * topRadius, 0);
          rightVertex = new THREE.Vector3(Math.cos((theta * i) + (theta / 2)) * midRadius, Math.sin((theta * i) + (theta / 2)) * midRadius, 0);
          bottomVertex = new THREE.Vector3(Math.cos(i * theta) * bottomRadius, Math.sin(i * theta) * bottomRadius, 0);
          this.vertices.push(centerVertex);
          this.vertices.push(leftVertex);
          this.vertices.push(topVertex);
          this.vertices.push(rightVertex);
          this.vertices.push(bottomVertex);
          this.faces.push(new THREE.Face3(vi, vi + 1, vi + 2));
          this.faces.push(new THREE.Face3(vi, vi + 2, vi + 3));
          this.faces.push(new THREE.Face3(vi, vi + 3, vi + 4));
          this.faces.push(new THREE.Face3(vi, vi + 4, vi + 1));
          vi += 5;
        }
        bottomRadius = topRadius;
        ringCount++;
      }
      this.mergeVertices();
      this.computeFaceNormals();
      this.computeVertexNormals();
      return this.computeCentroids();
    };

    return ShlianGeometry;

  })(THREE.Geometry);

}).call(this);
}});
