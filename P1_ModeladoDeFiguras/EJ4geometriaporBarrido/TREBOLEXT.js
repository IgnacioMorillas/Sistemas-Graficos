
class TREBOLEXT extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material =  new THREE.MeshPhongMaterial({color: 0x36ad40  });
    this.material.flatShading=true;
    this.material.needsUpdate=true;
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
    var hola  =this.Crear_TREBOLEXT();

    this.add (hola);
    //this.add(palito);
    //this.add (this.movil);
  }

  Crear_TREBOLEXT() {
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
    heartShape.moveTo( 0, 0 );
    heartShape.bezierCurveTo(5, -4.5, 7,3.5, 1.5,3);
    heartShape.bezierCurveTo(4.6,9, -4.6,9, -1.5,3 );
    heartShape.bezierCurveTo( -7,3.5, -4.5, -5, 0,0 );

    //PALITO

    var opciones = {depth: 1, steps: 40, bevelSize: 1, bevelThickness: 1, bevelSegments: 7, extrudePath: curve,  curveSegments :15};
    var trevolGeo = new THREE.ExtrudeGeometry (heartShape, opciones);
    var jeje = new THREE.Mesh(trevolGeo, this.material)

    return jeje;

  /*  this.points = [];

    //heartShape.moveTo(0,0)

    //puntos TREBOLEXT
    this.points.push (new THREE.Vector2 (0,-3));
    this.points.push (new THREE.Vector2 (5,3));
    this.points.push (new THREE.Vector2 (-5,3));

    var heartShape = new THREE.Shape(this.points);
    //this.points.push (new THREE.Vector2 (,));
    var options={depth: 1,amount: 1,steps: 60,curveSegments: 6, bevelThickness: 6, bevelSize: 6,bevelSegments :   60,curveSegments : 60};
    var geometriaTREBOLEXT = new THREE.ExtrudeGeometry(heartShape, options);
    var TREBOLEXT = new THREE.Mesh(geometriaTREBOLEXT, this.material)
    return TREBOLEXT;


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
