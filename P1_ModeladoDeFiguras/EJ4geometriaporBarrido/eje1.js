
class EJErotatorio extends THREE.Object3D {
  constructor(gui) {
    super();

    //this.add(this.axis);
    //AÑADIMOS CAJA
    this.add(this.constructor_parteCORAZON(this.gui));
    this.add(this.constructor_parteROMBO(this.gui));
    this.add(this.constructor_partePICA(this.gui));
    this.add(this.constructor_parteTREBOL(this.gui));
  }

  constructor_parteCORAZON(gui){
    var parteCORAZON = new THREE.Object3D();
    this.CORAZON = new CORAZON(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    parteCORAZON.add (this.CORAZON);
    parteCORAZON.position.set(20,0,0);
    return parteCORAZON;
  }

  constructor_parteROMBO(gui){
    var parteROMBO = new THREE.Object3D();
    this.ROMBO = new ROMBO(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    parteROMBO.add (this.ROMBO);
    parteROMBO.position.set(0,20,0);
    return parteROMBO;
  }
  constructor_partePICA(gui){
    var partePICA = new THREE.Object3D();
    this.PICA = new PICA(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    partePICA.add (this.PICA);
    partePICA.position.set(-20,0,0);
    return partePICA;
  }

  constructor_parteTREBOL(gui){
    var parteTREBOL = new THREE.Object3D();
    this.TREBOL = new TREBOL(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    parteTREBOL.add (this.TREBOL);
    parteTREBOL.position.set(0,-20,0);
    return parteTREBOL;
  }
  /*  this.points = [];

    //heartShape.moveTo(0,0)

    //puntos TREBOL
    this.points.push (new THREE.Vector2 (0,-3));
    this.points.push (new THREE.Vector2 (5,3));
    this.points.push (new THREE.Vector2 (-5,3));

    var heartShape = new THREE.Shape(this.points);
    //this.points.push (new THREE.Vector2 (,));
    var options={depth: 1,amount: 1,steps: 60,curveSegments: 6, bevelThickness: 6, bevelSize: 6,bevelSegments :   60,curveSegments : 60};
    var geometriaTREBOL = new THREE.ExtrudeGeometry(heartShape, options);
    var TREBOL = new THREE.Mesh(geometriaTREBOL, this.material)
    return TREBOL;


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
    //this.parteCORAZON.rotacion.y=0.01;

/*    this.ROMBO.rotation.y += 0.01;
    this.PICA.rotation.y += 0.01;
    this.TREBOL.rotation.y += 0.01;*/
    }
}
