class CORAZON extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material =  new THREE.MeshPhongMaterial({color: 0xCF0000});
    this.material.flatShading=true;
    this.material.needsUpdate=true;
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
    var base = this.Crear_corazon();
    base.position.set(0,0.5,0);

    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
    //this.movil = this.createMovil();

    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    this.add (base);
    //this.add (this.movil);
  }

  Crear_corazon() {

    var heartShape = new THREE.Shape();
    heartShape.moveTo( 0, -7 );
    //DERECHA
      heartShape.bezierCurveTo(1,-3,4,-4,5,0);
      heartShape.bezierCurveTo(5, 0, 3,6, 0,0);
    //IZQUIERDA
      heartShape.bezierCurveTo(0, 0, -3,6, -5,0);
      heartShape.bezierCurveTo(-4,-4,-1,-3,0,-7);



    var opciones = {depth: 1, steps: 1, bevelSize: 1, bevelThickness: 1, bevelSegments: 7};
    var corazonlGeo = new THREE.ExtrudeGeometry (heartShape, opciones);
    var jeje = new THREE.Mesh(corazonlGeo, this.material)

    return jeje;

  //  this.points = [];

    //heartShape.moveTo(0,0)

    //puntos CORAZON
    /*
    this.points.push (new THREE.Vector2 (0,-7));
    this.points.push (new THREE.Vector2 (7,0));
    this.points.push (new THREE.Vector2 (7,3));
    this.points.push (new THREE.Vector2 (5,5));
    this.points.push (new THREE.Vector2 (2,5));
    this.points.push (new THREE.Vector2 (0,3));
    this.points.push (new THREE.Vector2 (-2,5));
    this.points.push (new THREE.Vector2 (-5,5));
    this.points.push (new THREE.Vector2 (-7,3));
    this.points.push (new THREE.Vector2 (-7,0));
    var heartShape = new THREE.Shape(this.points);
    //this.points.push (new THREE.Vector2 (,));
    var options={amount: 1,steps: 2,curveSegments: 4, bevelThickness: 4, bevelSize: 2,bevelSegments :   60};
    var geometriaCorazon = new THREE.ExtrudeGeometry(heartShape, options);
    var corazon = new THREE.Mesh(geometriaCorazon, this.material)
    return corazon;*/


    /*
    //array de los puntos
    this.points = [];
    var segmentos=6;
    var base= new THREE.Object3D();
    var compelto=new THREE.Object3D();
    var parcial=new THREE.Object3D();
    var lineGeometry = new THREE.Geometry();


    var latheObjectpar = new THREE.Mesh (new THREE.LatheGeometry (this.points,segmentos,Math.PI/2,0.6), this.material);
    parcial.add(latheObjectpar);

    line.add(new THREE.AxesHelper (3));
    line.position.set (-10,0,0)
    base.add(line);
    base.add(compelto);
    base.add(parcial);

    return base;*/
  }

  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    /*this.guiControls = new function () {
      this.segmentos=3;
      this.angulo=0.6;

    }

    // Se crea una sección para los controles de la caja
    var folder2 = gui.addFolder ("Control Peon");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    //folder.add (this.guiControls, 'rotacion', -0.1, 0.125, 0.001).name ('Apertura : ');
    folder2.add (this.guiControls, 'segmentos', 3, 15, 1).name ('segmentos : ');
    folder2.add (this.guiControls, 'angulo', 0.6, 2*Math.PI, 0.1).name ('angulo : ');*/
  }

  update () {
    //this.rotation.y += 0.01;

    // Se actualiza el nodo  this.movil  con el valor de la variable rotacion de la GUI
    //this.movil.rotation.z = this.guiControls.rotacion;
  /*  this.material.flatShading=this.guiControls.flatShading;
    this.Dimension_X=this.guiControls.Dimension_X;
    this.Dimension_Y=this.guiControls.Dimension_Y;
    this.Dimension_Z=this.guiControls.Dimension_Z;
    this.scale.set(this.Dimension_X,this.guiControls.Dimension_Y,this.guiControls.Dimension_Z);*/
  //  this.children[1]= new THREE.Mesh (new THREE.LatheGeometry (this.points,this.guiControls.segmentos,0,this.guiControls.angulo), this.material)
    //this.children[0].children[2]=new THREE.Mesh (new THREE.LatheGeometry (this.points,this.guiControls.segmentos,Math.PI/2,this.guiControls.angulo), this.material)
  }
}
