
class PALITO extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI();

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material =  new THREE.MeshPhongMaterial({color: 0x3b83bd});
    this.material.flatShading=true;
    this.material.needsUpdate=true;
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
    var base = this.Crear_PALITO();

    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
    //this.movil = this.createMovil();

    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    this.add (base);
    //this.add (this.movil);
  }

  Crear_PALITO() {
    //array de los puntos
    this.points = [];
    var segmentos=30;
    var base= new THREE.Object3D();
    //var compelto=new THREE.Object3D();
    //var parcial=new THREE.Object3D();
    //var lineGeometry = new THREE.Geometry();


    //Se añaden los puntos
    /*this.points.push (new THREE.Vector3 (0,1.4,  0));
    this.points.push (new THREE.Vector3 (-1.0,-1.4,  0));
    this.points.push (new THREE.Vector3 (-1.0,-1.1,  0));
    this.points.push (new THREE.Vector3 (-0.5,-0.7,  0));
    this.points.push (new THREE.Vector3 (-0.4,-0.4,  0));
    this.points.push (new THREE.Vector3 (0.4,0.5,  0));
    this.points.push (new THREE.Vector3 (0.5,0.6,  0));
    this.points.push (new THREE.Vector3 (0.3,0.6,  0));
    this.points.push (new THREE.Vector3 (0.5,0.8,  0));*/
    this.points.push (new THREE.Vector3 (0,-1.0,  0));
    this.points.push (new THREE.Vector3 (0.5,-1.0,  0));
    this.points.push (new THREE.Vector3 (0.2,-0.95,  0));
    this.points.push (new THREE.Vector3 (0.15,-0.9,  0));
    this.points.push (new THREE.Vector3 (0.10,-0.85,  0));
    this.points.push (new THREE.Vector3 (0.05,-0.8,  0));

    //this.points.push (new THREE.Vector3 (0.2,0.4,  0));
    this.points.push (new THREE.Vector3 (0.02,0,  0));
    this.points.push (new THREE.Vector3 (0,0,  0));


    //Creamos la figura por revolución
    var latheObject = new THREE.Mesh (new THREE.LatheGeometry (this.points,segmentos,0), this.material);
    //compelto.add(latheObject);
    //compelto.add(new THREE.AxesHelper (3));
    latheObject.position.set (10,0,0)

    //var latheObjectpar = new THREE.Mesh (new THREE.LatheGeometry (this.points,segmentos,Math.PI/2,0.6), this.material);
    //parcial.add(latheObjectpar);


    // Para crear una línea visible
    //lineGeometry.vertices = this.points;
    //var line = new THREE.Line (lineGeometry, this.material);
    //line.add(new THREE.AxesHelper (3));
    //line.position.set (-10,0,0)
    //base.add(line);
    //base.add(compelto);
    //base.add(parcial);

    return latheObject;
  }

  createGUI (gui,titleGui) {
  }

  update () {
  }
}
