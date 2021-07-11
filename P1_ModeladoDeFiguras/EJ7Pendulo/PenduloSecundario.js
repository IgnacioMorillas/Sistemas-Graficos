
class PENDULOSECUNDARIO extends THREE.Object3D {
  constructor(gui) {
    super();

    this.createGUI(gui);

    this.material= new THREE.MeshBasicMaterial( {color: 0x383cb1} );

    this.alturaRojoActual=10;
    var cajamovil = new THREE.BoxGeometry( 1.5,this.alturaRojoActual,1.3 );
    var cilindro = new THREE.CylinderGeometry (0.3,0.3,32,32);

    cilindro.scale(1,0.07,1);
    cilindro.rotateX(3.14/2);
    cajamovil.translate(0,(-this.alturaRojoActual/2)+2,0);

    this.cajaazul = new THREE.Mesh (cajamovil, this.material);
    this.cilindro = new THREE.Mesh (cilindro, new THREE.MeshBasicMaterial( {color: 0xc446a9} ));

    this.add(this.cajaazul );
    this.add(this.cilindro );
  }

  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.alturaRojoActual=1;
      this.rotationZ=0;
      this.animate = false;

      this.retorno=1;
      this.escala=1;
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.alturaRojoActual=7;
        this.rotationZ=0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Control Pendulo Secundario");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'alturaRojoActual', 1.0,2.0, 0.1).name ('Escala superior : ').listen();
    folder.add (this.guiControls, 'rotationZ', -0.5, 0.5, 0.1).name ('Rotacion superior : ').listen();
    folder.add (this.guiControls, 'animate', 0,1).name('[ Animate ]').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');

  }

  update () {
    if(this.guiControls.animate){
      //movimiento Pendulo
      if(this.guiControls.rotationZ>=0.5){
        this.retorno=0;
      }
      if(this.guiControls.rotationZ<=-0.5){
        this.retorno=1;
      }

      if(this.retorno){
        this.guiControls.rotationZ=this.guiControls.rotationZ+ 0.01;
      }
      else{
        this.guiControls.rotationZ=this.guiControls.rotationZ- 0.01;
      }


      //movimiento escala abajo

      if(this.guiControls.alturaRojoActual>=2){
        this.escala=0;
      }
      if(this.guiControls.alturaRojoActual<=1){
        this.escala=1;
      }

      if(this.escala){
        this.guiControls.alturaRojoActual=this.guiControls.alturaRojoActual+ 0.001;
      }
      else{
        this.guiControls.alturaRojoActual=this.guiControls.alturaRojoActual- 0.001;
      }
    }
    this.cajaazul.scale.y=this.guiControls.alturaRojoActual;
    this.cajaazul.position.y = -(((this.alturaRojoActual * this.guiControls.alturaRojoActual)-this.alturaRojoActual)/2)+(this.guiControls.alturaRojoActual-1)+(2*(this.guiControls.alturaRojoActual-1));
    this.rotation.z=(this.guiControls.rotationZ);


  }
}
