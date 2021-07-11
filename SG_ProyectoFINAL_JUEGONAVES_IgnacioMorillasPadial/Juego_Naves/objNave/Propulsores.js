class PROPULSORES extends THREE.Mesh {
  constructor() {
    super();

    this.geometry = new THREE.CylinderGeometry (2.83/2,1,4/2,6);

    this.material = new THREE.MeshBasicMaterial({color: 0x3e3b41});
    this.rotateZ(Math.PI / 2);
    this.rotateY(Math.PI / 4);

  }

  update () {
  }
}