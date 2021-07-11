
class CAJA extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la taza
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);


    // Tres objetos para construir la taza
    // Cilindro de la taza
    var esfera = new THREE.SphereGeometry( 7.5, 32, 32);

    var cilindro = new THREE.CylinderGeometry( 5, 5, 10, 6 );
    var cilindro1 = new THREE.CylinderGeometry( 2, 2, 10, 20 );

    // Cilindro para restar al cilindro de la taza
    // Agarradera de la taza
    var toroide = new THREE.TorusGeometry( 2.2, 0.85, 16, 20 );
    var toroide2 = new THREE.TorusGeometry( 2.2, 0.85, 16, 20 );
    var toroide3 = new THREE.TorusGeometry( 2.2, 0.85, 16, 20 );
    var toroide4 = new THREE.TorusGeometry( 2.2, 0.85, 16, 20 );
    var toroide5 = new THREE.TorusGeometry( 2.2, 0.85, 16, 20 );
    var toroide6 = new THREE.TorusGeometry( 2.2, 0.85, 16, 20 );


    // Transformaciones para que estén en posición
    toroide.rotateX(-1.5);
    //toroide.scale(0.8,0.8,0.8);
    toroide.translate(0,0,0);

    toroide2.rotateX(-1.5);
    toroide2.scale(1,0.8,1);
    toroide2.translate(0,1,0);

    toroide3.rotateX(-1.5);
    toroide3.scale(1,0.8,1);
    toroide3.translate(0,2,0);

    toroide4.rotateX(-1.5);
    toroide4.scale(1,0.8,1);
    toroide4.translate(0,3,0);

    toroide5.rotateX(-1.5);
    toroide5.scale(1,0.8,1);
    toroide5.translate(0,-1,0);

    toroide6.rotateX(-1.5);
    toroide6.scale(1,0.8,1);
    toroide6.translate(0,-2,0);


  //  toroide.translate(5,5,0);

    cilindro.scale(1.5,0.5,1.5);
    cilindro1.scale(1.5,0.5,1.5);
    //cilindro.translate(0,1,0);

    // Creación de los objetos para hacer las operaciones booleanas
    var esderea_bps = new ThreeBSP(esfera);
    var cilindro_bps = new ThreeBSP(cilindro);
    var cilindro_bps1 = new ThreeBSP(cilindro1);

    var toroide_bps = new ThreeBSP(toroide);
    var toroide_bps2 = new ThreeBSP(toroide2);
    var toroide_bps3 = new ThreeBSP(toroide3);
    var toroide_bps4 = new ThreeBSP(toroide4);
    var toroide_bps5 = new ThreeBSP(toroide5);
    var toroide_bps6 = new ThreeBSP(toroide6);


    // Operaciones para crear la taza
    var resultado_final = cilindro_bps.subtract(cilindro_bps1);
    resultado_final = resultado_final.subtract(toroide_bps);
    resultado_final = resultado_final.subtract(toroide_bps2);
    resultado_final = resultado_final.subtract(toroide_bps3);
    resultado_final = resultado_final.subtract(toroide_bps4);
    resultado_final = resultado_final.subtract(toroide_bps5);
    resultado_final = resultado_final.subtract(toroide_bps6);
    resultado_final = resultado_final.intersect(esderea_bps);





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
