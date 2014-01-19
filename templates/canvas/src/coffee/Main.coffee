
module.exports = class Main
  constuctor:()->

  startup:()->
    @setup()


  setup:()->
    @canvas = document.getElementById "canvas"
    @context = @canvas.getContext "2d"

    @context.fillStyle = '#ff0000'
    @context.fillRect 100,100,125,125
