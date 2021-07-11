class Ala extends THREE.Mesh {
  constructor() {
    super();

    this.geometry = new THREE.CylinderGeometry (1,3,8,4);
    this.geometry.scale(1,1,0.1);

    this.material = new THREE.MeshBasicMaterial({color: 0xe68a00});

    //this.base = new THREE.Mesh (this.geometry, this.material);
    //this.base.scale.z=2;
  }

  update () {
  }
}