
class TIERRA extends THREE.Object3D {
  constructor(gui) {
    super();
    var geometry = new THREE.SphereGeometry(1);
    var texture = new THREE.TextureLoader().load('../../imgs/tierra.jpg');
    this.material = new THREE.MeshPhongMaterial ({map: texture});
    this.cilindro = new THREE.Mesh (geometry, this.material );

    this.add(this.cilindro);

  }

  createGUI (gui) {

  }


  update () {
    this.rotation.y+=0.005;
  }
}
