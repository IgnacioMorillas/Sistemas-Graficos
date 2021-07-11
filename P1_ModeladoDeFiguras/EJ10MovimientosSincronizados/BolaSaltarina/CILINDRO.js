
class CILINDRO extends THREE.Object3D {
  constructor(gui) {
    super();
    this.createGUI(gui);
    var geometry = new THREE.CylinderGeometry( 5, 5, 5, 32 );
  //  var geometry2 = new THREE.CylinderGeometry( 20,20, 5, 32 );

    this.anchura=5;
    this.material = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    geometry.translate(0,2.5,0);

    var cilindtro = new THREE.Mesh (geometry, this.material);
    //var cilindtro2 = new THREE.Mesh (geometry2, this.material);

    this.add(cilindtro);
  //  this.add(cilindtro2);

  }

  createGUI (gui) {

    this.guiControls = new function() {
      this.anchura = 5;
    }
    var otraFolder = gui.addFolder('Cilindro: ')

    otraFolder.add (this.guiControls, 'anchura', 5, 20, 1).name('Anchura : ');

  }


  update () {
    this.children[0].scale.x=this.guiControls.anchura/this.anchura;
    this.children[0].scale.z=this.guiControls.anchura/this.anchura;
    //this.anchura=this.guiControls.anchura*this.anchura;
  }

  getAnchura(){
    return this.guiControls.anchura;
  }
  getAltura(){
    return 5;
  }
}
