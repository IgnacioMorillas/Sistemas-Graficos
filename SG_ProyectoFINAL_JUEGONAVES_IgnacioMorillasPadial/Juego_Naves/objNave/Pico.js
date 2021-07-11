class PICO extends THREE.Mesh {
  constructor() {
    super();

    this.geometry = new THREE.CylinderGeometry (2.83,1,4,4);

    this.material = new THREE.MeshBasicMaterial({color: 0xe68a00});
    this.rotateZ(Math.PI / 2);
    this.rotateY(Math.PI / 4);

  }

  update () {
  }
}