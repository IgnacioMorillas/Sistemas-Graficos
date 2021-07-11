
class PENDULOPRINCIPAL extends THREE.Object3D {
  constructor(gui) {
    super();

    this.createGUI(gui);

    var materialrojo = new THREE.MeshBasicMaterial( {color: 0xd50000} );
    var materialverde = new THREE.MeshBasicMaterial( {color: 0x1B5E20} );
    this.material = materialrojo;

    this.alturaverde= 4;
    this.alturaRojoActual=5;
    var cajamovil = new THREE.BoxGeometry( 2,this.alturaRojoActual,2 );
    var cajafija1 = new THREE.BoxGeometry( 2,this.alturaverde,2 );
    var cajafija2 = new THREE.BoxGeometry( 2,this.alturaverde,2 );
    var cilindro = new THREE.CylinderGeometry (0.5,0.5,32,32);
    this.pendulo2 = new PENDULOSECUNDARIO(gui);

    cilindro.scale(1,0.1,1);
    cilindro.rotateX(3.14/2);

    //cajafija1.translate(0,-this.alturaverde/2,0);
    cajamovil.translate(0,(-this.alturaRojoActual/2)-this.alturaverde/2,0);
    cajafija2.translate(0,(-this.alturaverde/2)-this.alturaverde/2-this.alturaRojoActual,0);
    this.pendulo2.position.set(0,-(this.alturaverde/2+this.alturaRojoActual*0.1),2);


    this.cajaroja = new THREE.Mesh (cajamovil, this.material);
    this.cajaverdeO = new THREE.Mesh (cajafija1, materialverde);
    this.cajaverdeF = new THREE.Mesh (cajafija2, materialverde);
    this.cilindro = new THREE.Mesh (cilindro, new THREE.MeshBasicMaterial( {color: 0xe2ed14} ));

    this.Pendulo = new THREE.Object3D();

    this.Pendulo.add(this.cajaverdeO);
    this.Pendulo.add(this.cajaroja);
    this.Pendulo.add(this.cajaverdeF);
    this.Pendulo.add(this.cilindro);
    this.Pendulo.add(this.pendulo2);
    this.add(this.Pendulo);
  }

  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.alturaRojoActual=1;
      this.rotationZ=0;
      this.alturapen2=0.1;
      this.animate = false;
      this.retorno=1;
      this.escala=1;
      this.posicion=1;


      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.alturaRojoActual=1;
        this.rotationZ=0;
        this.alturapen2=0.1;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Control Pendulo Principal");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'alturaRojoActual', 1.0,2.0, 0.1).name ('Escala superior : ').listen();
    folder.add (this.guiControls, 'rotationZ', -0.5, 0.5, 0.1).name ('Rotacion superior : ').listen();
    folder.add (this.guiControls, 'alturapen2', 0.1, 0.9, 0.1).name ('Posicion pendulo2 : ').listen();
    folder.add (this.guiControls, 'animate', 0,1).name('[ Animate ]').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  createMovil () {

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
        this.guiControls.alturaRojoActual=this.guiControls.alturaRojoActual+ 0.01;
      }
      else{
        this.guiControls.alturaRojoActual=this.guiControls.alturaRojoActual- 0.01;
      }
      //pendulo2
      if(this.guiControls.alturapen2>=0.9){
      this.posicion=0;
      }
      if(this.guiControls.alturapen2<=0.1){
        this.posicion=1;
      }

      if(this.posicion){
        this.guiControls.alturapen2=this.guiControls.alturapen2+ 0.01;
      }
      else{
        this.guiControls.alturapen2=this.guiControls.alturapen2- 0.01;
      }

    }
    this.cajaroja.scale.y=this.guiControls.alturaRojoActual;
    this.cajaroja.position.y = (((this.alturaRojoActual * this.guiControls.alturaRojoActual)-this.alturaRojoActual)/2)-(this.guiControls.alturaRojoActual-1)/2;

  // this.cajaroja.position.y = ((this.alturaRojoActual* this.guiControls.alturaRojoActual)-this.alturaRojoActual-this.guiControls.alturaRojoActual+1);
    this.cajaverdeF.position.y=-((this.alturaRojoActual* this.guiControls.alturaRojoActual)-this.alturaRojoActual-this.guiControls.alturaRojoActual+this.guiControls.alturaRojoActual);
    this.Pendulo.rotation.z=(this.guiControls.rotationZ);

    this.pendulo2.position.set(0,-(this.alturaverde/2+(this.alturaRojoActual* this.guiControls.alturaRojoActual*this.guiControls.alturapen2)),2);
    this.pendulo2.update();

  }
}
