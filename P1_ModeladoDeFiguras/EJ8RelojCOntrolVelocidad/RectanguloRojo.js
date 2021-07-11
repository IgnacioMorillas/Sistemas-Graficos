
class RECTANGULOROJO extends THREE.Object3D {
  constructor(gui) {
    super();

    //this.createGUI(gui);

    this.material = new THREE.MeshBasicMaterial( {color: 0xd50000} );

    var cajamovil = new THREE.BoxGeometry( 1,1,1 );

    //cajafija1.translate(0,-this.alturaverde/2,0);
    cajamovil.translate(4,0.5,0);


    this.cajaroja = new THREE.Mesh (cajamovil, this.material);

    this.add(this.cajaroja);
  }

  createGUI (gui) {

  }

  update () {


  }
}
