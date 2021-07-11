
class CILINDRO extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la taza
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);


    // Tres objetos para construir la taza
    // Cilindro de la taza
    var cilindro = new THREE.CylinderGeometry( 5, 5, 10, 20 );
    // Cilindro para restar al cilindro de la taza
    var cilindro2 = new THREE.CylinderGeometry( 4, 4, 12, 20 );
    // Agarradera de la taza
    var toroide = new THREE.TorusGeometry( 2.5, 1.5, 16, 20 );


    // Transformaciones para que estén en posición
    toroide.scale(0.8,0.8,0.8);
    toroide.translate(5,5,0);
    cilindro2.translate(0,7,0);
    cilindro.translate(0,5,0);

    // Creación de los objetos para hacer las operaciones booleanas
    var cilindro_bps = new ThreeBSP(cilindro);
    var cilindro2_bps = new ThreeBSP(cilindro2);
    var toroide_bps = new ThreeBSP(toroide);

    // Operaciones para crear la taza
    var partir_toroide = toroide_bps.subtract(cilindro2_bps);
    var resultado_parcial = cilindro_bps.subtract(cilindro2_bps);
    var resultado_final = resultado_parcial.union(partir_toroide);

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
