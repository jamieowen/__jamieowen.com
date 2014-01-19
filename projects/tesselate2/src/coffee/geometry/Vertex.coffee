
module.exports = class Vertex
  constructor:(@x,@y)->

  set:(@x,@y)->
    null

  clone:()->
    return new Vertex @x,@y

