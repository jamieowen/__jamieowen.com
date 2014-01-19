
Polygon = require "geometry/Polygon"
Vertex = require "geometry/Vertex"

module.exports = class Comp1

  constructor:()->
    @polygons = []

  build:()->
    center = new Vertex(0,0)
    iterations = 6
    divisions = 12
    radius = 40
    radians = Math.PI / (divisions/2)
    offset = 0

    pastVertices = [center]

    for i in [0...iterations]
      for d in [0...divisions]
        poly = new Polygon()
        v1 = center.clone()
        v2 = new Vertex(Math.cos((radians*d)+offset)*radius,Math.sin((radians*d)+offset)*radius)
        v3 = new Vertex(Math.cos((radians*(d+1))+offset)*radius,Math.sin((radians*(d+1))+offset)*radius)
        poly.vertices.push v1,v2,v3

        @polygons.push poly

      if i%2 == 1
        offset = 0
      else
        offset = radians/2

      radius+= (Math.random()*10) + 10









