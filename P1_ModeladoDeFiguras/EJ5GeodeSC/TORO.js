
class TORO extends THREE.Object3D {
  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la taza
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI();


    // Tres objetos para construir la taza
    // Cilindro de la taza
    var caja = new THREE.BoxGeometry( 5, 5, 3);
    var caja1 = new THREE.BoxGeometry( 4, 2.1, 3);
    var caja2 = new THREE.BoxGeometry( 5, 4.2, 3);
    var caja3 = new THREE.BoxGeometry( 5, 4.2, 3);
    var esfera1 = new THREE.SphereGeometry( 0.5, 32, 32);
    var esfera2 = new THREE.SphereGeometry( 0.5, 32, 32);

    var cilindro = new THREE.CylinderGeometry(  1, 1, 20, 25 );

    //caja.rotateX(-1.5);
    //caja.scale(1,0.8,1);
    //caja.translate(0,1,0);
    caja1.translate(1,-0.95,0);
    caja2.translate(0.5,1.1,0);
    caja3.translate(1.5,0.75,0);

    cilindro.rotateX(-1.57);
    cilindro.translate(-1,-1,0);

    esfera1.translate(1,-2.2,0);
    esfera2.translate(-2.2,1,0);

    // Creación de los objetos para hacer las operaciones booleanas
    var caja_bps = new ThreeBSP(caja);
    var caja_bps1 = new ThreeBSP(caja1);
    var caja_bps2 = new ThreeBSP(caja2);
    var caja_bps3 = new ThreeBSP(caja3);
    var caja_esfera1 = new ThreeBSP(esfera1);
    var caja_esfera2 = new ThreeBSP(esfera2);


    var cilindro_bps = new ThreeBSP(cilindro);

    // Operaciones para crear la taza
    var resultado_final = caja_bps.subtract(cilindro_bps);
    resultado_final = resultado_final.subtract(caja_bps1);
    resultado_final = resultado_final.subtract(caja_bps2);
    resultado_final = resultado_final.subtract(caja_bps3);
    resultado_final = resultado_final.subtract(caja_esfera1);
    resultado_final = resultado_final.subtract(caja_esfera2);

    this.material = new THREE.MeshPhongMaterial();

    var resultado = resultado_final.toMesh(this.material);

    resultado.geometry.computeFaceNormals();
    resultado.geometry.computeVertexNormals();

    // Un Mesh se compone de geometría y material
    this.geometry = resultado.geometry;
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.add(new THREE.Mesh(this.geometry, this.material));
  }

  createGUI (gui) {

  }

  update () {

  }
}
