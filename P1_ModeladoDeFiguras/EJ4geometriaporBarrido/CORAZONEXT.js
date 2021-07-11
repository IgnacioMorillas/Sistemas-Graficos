class CORAZONEXT extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material =  new THREE.MeshPhongMaterial({color: 0x36ad40 });
    this.material.flatShading=true;
    this.material.needsUpdate=true;
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
    var base = this.Crear_CORAZONEXT();

    this.add (base);
    //this.add (this.movil);
  }

  Crear_CORAZONEXT() {
    /*  this.pts=[];

      this.pts.push (new THREE.Vector3( -10, 0, 10 ));
      this.pts.push (new THREE.Vector3( -5, 5, 5 ));
      this.pts.push (new THREE.Vector3( 0, 0, 0 ));
      this.pts.push (new THREE.Vector3( 5, -5, 5 ));
      this.pts.push (new THREE.Vector3( 10, 0, 10 ));

    */
    var curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( -10, 0, 10 ),
    new THREE.Vector3( -5, 5, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, -5, 5 ),
    new THREE.Vector3( 10, 0, 10 )
    ] );
      //var points = curve.getPoints( 50 );
      //var geometry = new THREE.BufferGeometry().setFromPoints( points );

      /*var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

      // Create the final object to add to the scene
      var curveObject = new THREE.Line( geometry, material );*/


      var heartShape = new THREE.Shape();
      heartShape.moveTo( 0, -7 );
      //DERECHA
        heartShape.bezierCurveTo(1,-3,4,-4,5,0);
        heartShape.bezierCurveTo(5, 0, 3,6, 0,0);
      //IZQUIERDA
        heartShape.bezierCurveTo(0, 0, -3,6, -5,0);
        heartShape.bezierCurveTo(-4,-4,-1,-3,0,-7);

      //PALITO

      var opciones = {depth: 1, steps: 40, bevelSize: 1, bevelThickness: 1, bevelSegments: 7, extrudePath: curve,  curveSegments :15};
      var trevolGeo = new THREE.ExtrudeGeometry (heartShape, opciones);
      var jeje = new THREE.Mesh(trevolGeo, this.material)

      return jeje;
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
