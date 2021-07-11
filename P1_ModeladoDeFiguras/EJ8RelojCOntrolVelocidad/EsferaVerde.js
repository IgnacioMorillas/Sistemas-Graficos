
class ESFERAVERDE extends THREE.Object3D {
  constructor(rotY) {
    super();

    //this.createGUI(gui);

    this.material = new THREE.MeshBasicMaterial( {color: 0x1B5E20} );

    var cajamovil = new THREE.SphereGeometry(0.5);

    //cajafija1.translate(0,-this.alturaverde/2,0);
    cajamovil.translate(5,0,0);

    this.rotation.set (0,rotY,0);


    this.cajaroja = new THREE.Mesh (cajamovil, this.material);

    this.add(this.cajaroja);
  }

  createGUI (gui) {

  }

  update () {


  }
}
