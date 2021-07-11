
class PelotaHelicoidal extends THREE.Object3D {
  constructor(anchuraCilindro, alturaCilindro) {
    super();
    var geometry =  new THREE.SphereGeometry( 0.5, 48, 32 );
    this.material = new THREE.MeshNormalMaterial();

    this.cilindro = new THREE.Mesh (geometry, this.material );
  //  this.cilindro.position.x=anchuraCilindro;
  this.position.y =alturaCilindro/2 ;

    this.anchura=anchuraCilindro;
    this.add(this.cilindro);

  }

  update (anchuraCilindro) {
    var timestamp = Date.now() * 0.001;
    this.position.x = Math.cos(timestamp) * anchuraCilindro;
    this.position.z = Math.sin(timestamp) * this.anchura;
  }
}
