
class ESFERA extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,"Dimensiones Esfera");

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading=true;
    this.material.needsUpdate=true;
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
    var base = this.createBase();

    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
    //this.movil = this.createMovil();

    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    this.add (base);
    //this.add (this.movil);
  }

  createBase() {
    // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver

    var base = new THREE.Object3D();
    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaBase = new THREE.Mesh (new THREE.SphereGeometry (1,5,5), this.material);
    //cajaBase.position.y = 0;
    // La componente geometría se puede compartir entre varios meshes
    //var geometriaPivote = new THREE.ConeGeometry (0.25, 0.6);
    //var pivote1 = new THREE.Mesh (geometriaPivote, this.material);
    //var pivote2 = new THREE.Mesh (geometriaPivote, this.material);
    // Se posicionan los pivotes con respecto a la base
    //pivote1.position.set (2.25, 0.3+0.4,  0.25);
    //pivote2.position.set (2.25, 0.3+0.4, -0.25);
    base.add(cajaBase);
    //base.add(pivote1);
    //base.add(pivote2);
    return base;
  }

  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
      this.Radio=1;
      this.ResEcuador=5;
      this.ResMeridiano=5;
    }

    // Se crea una sección para los controles de la caja
    var folder2 = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    //folder.add (this.guiControls, 'rotacion', -0.1, 0.125, 0.001).name ('Apertura : ');*/
    folder2.add (this.guiControls, 'Radio', 0.2, 3, 0.001).name ('Radio : ');
    folder2.add (this.guiControls, 'ResEcuador', 5, 15, 1).name ('ResEcuador : ');
    folder2.add (this.guiControls, 'ResMeridiano', 5, 15, 1).name ('ResMeridiano : ');
  }

  update () {
    // Se actualiza el nodo  this.movil  con el valor de la variable rotacion de la GUI
    //this.movil.rotation.z = this.guiControls.rotacion;
    this.Radio=this.guiControls.Radio;
    this.ResEcuador=this.guiControls.ResEcuador;
    this.ResMeridiano=this.guiControls.ResMeridiano;
    //this.scale.set(this.RadioSuperior,this.RadioInferior,this.Altura,this.resolucion);
    this.remove(this.children[0]);
    var base = new THREE.Object3D();
    var cajaBase = new THREE.Mesh (new THREE.SphereGeometry (this.Radio,this.ResEcuador,this.ResMeridiano), this.material);
    base.add(cajaBase);

    this.add(base);
  }
}
