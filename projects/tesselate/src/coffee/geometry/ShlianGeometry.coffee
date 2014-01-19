
module.exports = class ShlianGeometry extends THREE.Geometry

  constructor:( sides,innerRadius,maxRadius,ringRatio,ringDivisorSteps)->
    super()

    console.log "SET RING DIVSORORRRR",ringDivisorSteps
    @innerRadius = innerRadius || 10
    @maxRadius = maxRadius || 100
    @sides = sides || 6
    @ringRatio = ringRatio || ( Math.PI )
    @ringDivisorSteps = ringDivisorSteps || [2,-5,1,2,-2,1,2,3]

    @update()

  update:()->

    # Polygon shapes created and stacked on top of each other.
    #    /.\     - topRadius
    #   /   \
    #  /     \
    # /       \
    # .   .   .  - middleRadius
    # \       /
    #  \     /
    #   \   /
    #    \./     - bottomRadius

    bottomRadius = middleRadius = topRadius = 0
    vi = 0

    # z height
    height = 0
    ringCount = 0

    console.log "update"
    while topRadius < @maxRadius
      # get the ring radius
      if ringCount is 0
        topRadius = @innerRadius
      else
        ratioIndex = (ringCount-1) % (@ringDivisorSteps.length-1)
        topRadius = bottomRadius + ( bottomRadius / ( @ringDivisorSteps[ ratioIndex ] * @ringRatio ) )

      console.log "THICKNESS", ringCount, topRadius-bottomRadius
      midRadius = (( topRadius - bottomRadius )*.5)+bottomRadius
      theta = (Math.PI*2)/@sides

      console.log topRadius

      # draw each shape
      for i in [0...@sides]

        centerVertex = new THREE.Vector3 Math.cos(i*theta)*midRadius,Math.sin(i*theta)*midRadius,height
        leftVertex = new THREE.Vector3 Math.cos((theta*i)-(theta/2))*midRadius,Math.sin((theta*i)-(theta/2))*midRadius,0
        topVertex = new THREE.Vector3 Math.cos(i*theta)*topRadius,Math.sin(i*theta)*topRadius,0
        rightVertex = new THREE.Vector3 Math.cos((theta*i)+(theta/2))*midRadius,Math.sin((theta*i)+(theta/2))*midRadius,0
        bottomVertex = new THREE.Vector3 Math.cos(i*theta)*bottomRadius,Math.sin(i*theta)*bottomRadius,0
        #topRightVertex = new THREE.Vector3 Math.cos(i*(theta+theta))*topRadius,Math.sin(i*(theta+theta))*topRadius,0

        @vertices.push centerVertex
        @vertices.push leftVertex
        @vertices.push topVertex
        @vertices.push rightVertex
        @vertices.push bottomVertex
        #@vertices.push topRightVertex

        @faces.push new THREE.Face3 vi,vi+1,vi+2
        @faces.push new THREE.Face3 vi,vi+2,vi+3
        @faces.push new THREE.Face3 vi,vi+3,vi+4
        @faces.push new THREE.Face3 vi,vi+4,vi+1
        #@faces.push new THREE.Face3 vi,vi+4,vi+1

        vi+=5

      bottomRadius = topRadius
      ringCount++


    @mergeVertices()

    @computeFaceNormals()
    @computeVertexNormals()
    @computeCentroids()




