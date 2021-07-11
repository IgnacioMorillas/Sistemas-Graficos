
class Cuerpo extends THREE.Object3D {
  constructor() {
    super();
    
    var geometry = new THREE.BoxGeometry (6,4,4);
    this.material = new THREE.MeshBasicMaterial({color: 0xeb0002});
    this.cuerpoPrincipal = new THREE.Mesh (geometry, this.material);
    this.cuerpoPrincipal.geometry.computeBoundingBox();

    var geometry2 = new THREE.BoxGeometry (2,2,4);
    this.cabina = new THREE.Mesh (geometry2, this.material);
    this.cabina.position.y=2;
    this.cabina.position.x=-1;

    var geometry3 = new THREE.BoxGeometry (0.1,1,1.6);
    this.cristal = new THREE.Mesh (geometry3, new THREE.MeshBasicMaterial({color: 0x009af2}));
    this.cristal.position.y=2.5;
    this.cristal.position.x=0.05;

    this.add(this.cuerpoPrincipal)
    this.add(this.cabina)
    this.add(this.cristal)

    this.box3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.box3.setFromObject(this.cuerpoPrincipal);

  }

  getboxWorld(){
    return this.cuerpoPrincipal;
  }
}