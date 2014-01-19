
ShlianGeometry  = require "geometry/ShlianGeometry"
PolygonGeometry = require "geometry/PolygonGeometry"
Builder         = require "Builder"
GeomTest        = require "GeomTest"

module.exports = class Main
  constructor:()->

  startup:()->
    @setup()
    @animate()

  setup:()->

    @camera = new THREE.PerspectiveCamera 75, window.innerWidth / window.innerHeight, 1, 10000
    @camera.position.z = 100
    @ambient = new THREE.AmbientLight 0x404040
    @light = new THREE.PointLight(0xFFFFFF,1,400)
    @light.position.set -150,150,150

    @scene = new THREE.Scene()
    @scene.add @camera
    @scene.add @ambient
    @scene.add @light

    @builder = new Builder()
    @builder.build()
    @builder.addAndPosition @scene


    # helpers
    #@scene.add( new THREE.FaceNormalsHelper( @mesh, 10 ) )
    #@scene.add( new THREE.VertexNormalsHelper( @mesh, 10 ) )

    #@helper = new THREE.WireframeHelper( @mesh )
    #@helper.material.depthTest = false
    #@helper.material.opacity = 0.25
    #@helper.material.transparent = true
    #@scene.add( @helper )
    #@scene.add( new THREE.BoxHelper( @mesh ) )

    material = new THREE.MeshBasicMaterial
      color: 0xff0000
      wireframe: true

    @renderer = new THREE.WebGLRenderer
      antialias: true

    #@renderer.setClearColor(new THREE.Color( 0xEFEFEF ),1)

    #@renderer = new THREE.SVGRenderer()
    @renderer.setSize window.innerWidth, window.innerHeight
    document.body.appendChild @renderer.domElement

    @controls = new THREE.TrackballControls @camera,@renderer.domElement

    @test = new GeomTest(@scene,@camera)
    @test.build()

    #canvas = document.createElement "canvas"
    #canvas.width = canvas.height = 500
    #document.body.appendChild canvas

    @addGui()
    null


  animate:()=>
    requestAnimationFrame @animate
    @controls.update()
    @test.update()

    @render()

  addGui:()->
    @gui = new dat.GUI({autoPlace:false})

    @builder.addToDatGui @gui
    @debug = $('<div></div>')
    @debug.attr {'id': 'god'}
    @debug.addClass 'debug'
    @debug.append @gui.domElement

    $('body').append @debug

    @gui.open()

  render:()->
    @renderer.render @scene,@camera

