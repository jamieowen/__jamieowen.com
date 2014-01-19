
Comp1 = require "comp/Comp1"

module.exports = class Main
  constuctor:()->

  startup:()->
    @setup()


  setup:()->
    @canvas = document.getElementById "canvas"
    @canvas.width = @canvas.height = 500

    @context = @canvas.getContext "2d"

    comp1 = new Comp1()
    comp1.build()

    @render comp1


  render:( comp )->
    @context.translate 150,150

    for polygon in comp.polygons
      @context.fillStyle = "#ff0000"
      @context.lineStyle = "#ff0000"
      @context.beginPath()

      for vertex, i in polygon.vertices
        if i is 0
          @context.moveTo vertex.x,vertex.y
        else
          @context.lineTo vertex.x,vertex.y

      @context.lineTo polygon.vertices[0].x,polygon.vertices[0].y
      @context.stroke()
      #@context.fill()








