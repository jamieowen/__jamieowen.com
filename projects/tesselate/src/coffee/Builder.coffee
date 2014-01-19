PolygonGeometry = require "geometry/PolygonGeometry"

module.exports = class Builder
  constructor:(numberOfShapes,alternating)->
    @repeatedShapes = []
    @numberOfShapes = numberOfShapes || 5
    @alternating    = alternating || true
    @meshes         = []
    @guiFolder      = null


  build:()->
    if @alternating
      shapeCount = @numberOfShapes*2

    material = new THREE.MeshBasicMaterial
      color: 0xff0000
      wireframe: true

    for i in [0...shapeCount]
      poly = new PolygonGeometry()
      poly.randomise()
      poly.build()
      @repeatedShapes.push poly
      @meshes.push new THREE.Mesh(poly,material)

    null

  addAndPosition:(scene)->
    offset = (@meshes.length/2)*100
    for mesh,i in @meshes
      mesh.position.x = i*100-offset
      scene.add mesh

    null

  addToDatGui:( @gui )->
    if @guiFolder
      @guiFolder.remove()

    @guiFolder = @gui.addFolder "Builder"

    for shape, i in @repeatedShapes
      if i is 0
        groupFolder = @guiFolder.addFolder "Geometry 1"
      else if i is @numberOfShapes
        groupFolder = @guiFolder.addFolder "Geometry 2"

      folder = groupFolder.addFolder "Shape " + (i+1)
      folder.add shape,"outerRadius"
      folder.add shape,"innerRadius"
      folder.add shape,"sides"
      folder.add shape,"scaleX"
      folder.add shape,"scaleY"
      folder.add shape,"zHeight"


    null

  update:()->






