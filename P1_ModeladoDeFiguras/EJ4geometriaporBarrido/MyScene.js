
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) {
    //Llama al contructor de la clase three.Scene
    super();

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Se crea la interfaz gráfica de usuario
   this.gui = this.createGUI ();

    // Construimos los distinos elementos que tendremos en la escena

    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    // Un suelo
    //this.createGround ();
    this.axis= new THREE.AxesHelper (6);
    this.add(this.axis);
    //AÑADIMOS CAJA
  this.add(this.constructor_parteEJErotatorio(this.gui));
  this.add(this.constructor_parteTREBOLEXT(this.gui));
  this.add(this.constructor_parteCORAZONEXT(this.gui));


  }

  constructor_parteEJErotatorio(gui){
    var parteEJErotatorio = new THREE.Object3D();
    this.EJErotatorio = new EJErotatorio(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    parteEJErotatorio.add (this.EJErotatorio);
    //parteEJErotatorio.position.set(-40,0,0);
    return parteEJErotatorio;
  }

  constructor_parteTREBOLEXT(gui){
    var parteTREBOLEXT = new THREE.Object3D();
    this.TREBOLEXT = new TREBOLEXT(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    parteTREBOLEXT.add (this.TREBOLEXT);
    parteTREBOLEXT.rotation.z = 90;

  parteTREBOLEXT.position.set(-50,0,0);
    return parteTREBOLEXT;
  }

  constructor_parteCORAZONEXT(gui){
    var parteCORAZONEXT = new THREE.Object3D();
    this.CORAZONEXT = new CORAZONEXT(gui);
    //this.figura.position.set(-9,5,9);
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    //this.axisCORAZON = new THREE.AxesHelper (3);
    /*this.axisfigura.rotation.z=-0.6;
    this.axisfigura.rotation.y=0.79;
    this.axisfigura.rotation.x=0.5;
    this.axisfigura.position.set (-9,5,9);*/
    //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  //  parteCORAZON.add (this.axisCORAZON);
    parteCORAZONEXT.add (this.CORAZONEXT);
    parteCORAZONEXT.rotation.z = 90;
   parteCORAZONEXT.position.set(50,0,0);
    return parteCORAZONEXT;
  }

  /*
  var partetoro = new THREE.Object3D();
  this.toro = new TORO(gui, "Luz y Ejes");
  this.toro.position.set(3,-2,-3);
  // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
  this.axistoro = new THREE.AxesHelper (3);
  this.axistoro.rotation.z=-0.3;
  this.axistoro.rotation.y=-0.2;
  this.axistoro.rotation.x=0.4;
  this.axistoro.position.set (3,-2,-3);
  //this.mover_objeto_eje=(this.caja,this.axis,-20,0,0)
  partetoro.add (this.axistoro);
  partetoro.add (this.toro);
*/
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 0, 100);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);

    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }

  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();

    // La escena le va a añadir sus propios controles.
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    /*this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');

    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');*/

    return gui;
  }

  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    //var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    //this.add (ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.5);
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    // (COLOR DEL FONDO(BLANCO))
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    // (ANCHO Y LARGO)
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }

  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    //this.spotLight.intensity = this.guiControls.lightIntensity;

    // Se muestran o no los ejes según lo que idique la GUI
    //this.axis.visible = this.guiControls.axisOnOff;

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    // Se actualiza el resto del modelo
    //ACTUALIZACION CAJA
    /*this.caja.rotation.y += 0.01;
    this.caja.rotation.x += 0.01;*/
    /*this.CORAZON.rotation.y += 0.01;
    this.CORAZON.update();
    this.ROMBO.rotation.y += 0.01;
    this.ROMBO.update();
    this.PICA.rotation.y += 0.01;
    this.PICA.update();
    this.TREBOL.rotation.y += 0.01;
    this.TREBOL.update();*/
    this.EJErotatorio.rotation.z += 0.01;
    this.EJErotatorio.children[0].rotation.z += -0.01;
    this.EJErotatorio.children[0].children[0].rotation.y += 0.01;

    this.EJErotatorio.children[1].rotation.z += -0.01;
    this.EJErotatorio.children[1].children[0].rotation.y += 0.01;

    this.EJErotatorio.children[2].rotation.z += -0.01;
    this.EJErotatorio.children[3].rotation.z += -0.01;

    this.EJErotatorio.children[2].children[0].rotation.y += 0.01;

    this.EJErotatorio.children[3].children[0].rotation.y += 0.01;
 this.EJErotatorio.update();

  this.TREBOLEXT.rotation.x += 0.01;
  this.CORAZONEXT.rotation.x += 0.01;

  }
}


/// La función   main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
