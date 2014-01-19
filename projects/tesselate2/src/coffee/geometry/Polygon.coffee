
Vertex = require "geometry/Vertex"


module.exports = class Polygon

  @createTriangle:(radius,radians)->

    poly = new Polygon()
    poly.vertices.push new Vertex(0,0)
    poly.vertices.push new Vertex(Math.cos(-radians/2)*radius,Math.sin(-radians/2)*radius)
    poly.vertices.push new Vertex(Math.cos(radians/2)*radius,Math.sin(radians/2)*radius)

    return poly

  constructor:()->
    @vertices = []

  getVertexCount:()->
    @vertices.length

  computeEdges:()->
    null



