
module.exports = class GeomTest
  constructor:(@scene,@camera)->
    #---

  build:()->
    @geom = new THREE.TetrahedronGeometry 20
    @material = new THREE.MeshBasicMaterial
      color: 0xff0000
      wireframe:true


    @mesh = new THREE.Mesh @geom,@material
    @matrix = new THREE.Matrix4()

    @scene.add @mesh


  update:()->
    @matrix.identity()
    #@matrix.translate( 0,0,100 )
    @matrix.lookAt( @camera.position,new THREE.Vector3(0,0,0),@mesh.up )


    @mesh.position.copy @camera.position
    @mesh.setRotationFromMatrix( @matrix )
    @mesh.translateZ -100



    #console.log @mesh.position
    #console.log @camera.position.length()

    #
    #@matrix.lookAt new THREE.Vector3(0,0,0),@camera.position,@mesh.up


