
class SATELITE extends THREE.Object3D {
  constructor(gui) {
    super();
    var geometry = new THREE.SphereGeometry(1);
    var texture = new THREE.TextureLoader().load('../../imgs/cara.jpg');
    this.material = new THREE.MeshPhongMaterial ({map: texture});

    this.cilindro = new THREE.Mesh (geometry, this.material );
    this.cilindro.rotation.y=-Math.PI/2;
    this.add(this.cilindro);
  }

  createGUI (gui) {

  }

  update () {

  }
}
