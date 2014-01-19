
module.exports = class PolygonGeometry extends THREE.Geometry

  # innerRadius is ignored if same as outerradius
  constructor:(outerRadius,scaleX,scaleY,sides,zHeight,innerRadius)->
    super()

    @outerRadius = outerRadius || 100
    @innerRadius = innerRadius || 70
    @scaleX = scaleX || 1
    @scaleY = scaleY || 1
    @sides  = sides || 6
    @zHeight = zHeight || 30

  randomise:()->
    @innerRadius = Math.round( Math.random() * 50 + 20 )
    @outerRadius = Math.round( @innerRadius + ( Math.random() * 50 ) )
    @scaleX       = 1
    @scaleY       = 1
    @sides        = Math.round( (Math.random()*9)+3 )
    null

  build:()->
    thetaOffset = Math.PI/2

    if @innerRadius is @outerRadius
      # basic polygon
      theta = (Math.PI*2)/@sides
      sides = @sides
      for i in [0...sides]
        vertex = new THREE.Vector3 Math.cos(theta*i+thetaOffset)*@outerRadius*@scaleX,Math.sin(theta*i+thetaOffset)*@outerRadius*@scaleY,0
        @vertices.push vertex
    else
      # polygon star
      theta = (Math.PI*2)/(@sides*2)

      sides = @sides*2
      for i in [0...sides]
        if i%2 is 0
          vertex = new THREE.Vector3 Math.cos(theta*i+thetaOffset)*@outerRadius*@scaleX,Math.sin(theta*i+thetaOffset)*@outerRadius*@scaleY,0
          @vertices.push vertex
        else
          vertex = new THREE.Vector3 Math.cos(theta*i+thetaOffset)*@innerRadius*@scaleX,Math.sin(theta*i+thetaOffset)*@innerRadius*@scaleY,0
          @vertices.push vertex

    # add center vertex with zHeight
    vertex = new THREE.Vector3 0,0,@zHeight
    @vertices.push vertex

    # create faces.
    for i in [0...sides]
      console.log i,i+1,@vertices.length
      face = new THREE.Face3 i,(i+1)%sides,@vertices.length-1
      @faces.push face

    @computeFaceNormals()
    @computeVertexNormals()
    @computeCentroids()











