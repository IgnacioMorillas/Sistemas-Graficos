
class COMPLETO extends THREE.Object3D {
  constructor() {
    super();

    //Cuerpo de la nave
    this.Cuerpo = new Cuerpo();
    this.Cuerpo.box3.min.x=-10-this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.max.x/4;
    this.Cuerpo.box3.max.x=-10-this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.min.x/4;

    //ALAS DE LA NAVE
    this.AlaDER = new Ala();
    this.AlaDER.rotation.x=Math.PI / 2;
    this.AlaDER.position.z=6;
    this.AlaIZQ = new Ala();
    this.AlaIZQ.rotation.x=-Math.PI / 2;
    this.AlaIZQ.position.z=-6;

    //PICO
    this.PICO = new PICO();
    this.PICO.position.x=5;

    //PROPULSORES
    this.PROPULSORES = new PROPULSORES();
    this.PROPULSORES.position.x=-4;

    //PISTOLAS
    this.PISTOLADER = new PISTOLA();
    this.PISTOLAIZQ = new PISTOLA();
    this.PISTOLADER.position.x=6;
    this.PISTOLADER.position.z=1.8;

    this.PISTOLAIZQ.position.x=6;
    this.PISTOLAIZQ.position.z=-1.8;

    //escudo
    this.escudogeometry = new THREE.SphereBufferGeometry(7.5,12,12 );
    this.escudomaterial = new THREE.MeshBasicMaterial( {color:0xf9ff34, opacity: 0.5,
      transparent: true});

    this.escudo = new THREE.Mesh( this.escudogeometry, this.escudomaterial );
    this.add(this.escudo);
    this.escudo.visible = false;
    

    this.add (this.Cuerpo);

    this.add (this.AlaDER);
    this.add (this.AlaIZQ);

    this.add (this.PICO);

    this.add (this.PROPULSORES);

    this.add (this.PISTOLADER);
    this.add (this.PISTOLAIZQ);
    
    //Escala
    this.scale.z=0.1;
    this.scale.y=0.1;
    this.scale.x=0.1;
    
    //POSICION CON RESPECTO AL EJE
    this.position.x=-10;
    this.position.y=0;
    this.position.z=1;

    //this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.max.x=-10;
    //this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.min.x=-14;

    //this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.max.z=  2;
    //this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.min.z= -2;


    this.upperBound = 7.2;
    this.lowerBound = -7.5;
    this.x=-10;
    this.y=0;
    this.z=1;

    // Variables de las animaciones
    this.ascent = 0.180;          // Incrementado o decrementado de posicion
    this.rotZ = 0;              // Vuelve a poner la rotacion en 0
    this.ascentDuration = 250;     // Duracion de la animacion de subida
    this.clockwiseAnimationDuration = 50; // Duracion de la animacion de rotacion
    this.descentDuration = 250;         // Animacion estandar de la bajada
    this.rotationBound = 0.5;  // Limite superior e inferior de rotacion en Z
    this.incrementalY = 0.75;   // Siguiente posicion en la que va a estar en Y: posActual = posActual + this.incrementalY

    // Instanciacion de variables para la subida y bajada

    this.actualPosition = {y: 0};
    this.newPosition = {y: 0};
    // Creacion del cubo de PATO sin definir limites
    //this.instanciateAnimations();

    this.box = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    

  }

  update () {
    TWEEN.update();
  }

  // Comprobar posición superior PATO
  outOfUpperBound(){
    return this.y >= this.upperBound;
  }

  // Comprobar posición inferior PATO
  outOfLowerBound(){
    return this.y <= this.lowerBound;
  }

  // Acción de volar del pato
  fly(code){
    // Se eliminan antiguas animaciones
    TWEEN.removeAll();
    // Definicion de las animaciones
    var that = this;
    this.descentAnimation = new TWEEN.Tween(that.actualPosition)
                    .to(that.newPosition, this.ascentDuration)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function() {
                        // Se define la nueva posicion en Y segun TWEEN y la actualiza
                        that.y = that.actualPosition.y;
                        that.position.set (that.x,that.actualPosition.y,that.z);
                        that.rotation.set (0,0,-that.rotationBound);
                    })
                    // Al completar la funcion almacena la nueva Y
                    .onComplete( function () {
                      that.actualPosition.y = that.y;
                      that.rotation.set (0,0,0);
                     // that.ascentDuration=this.ascentDuration;
                    });



    this.ascentAnimation = new TWEEN.Tween(that.actualPosition)
                    .to(that.newPosition, this.ascentDuration)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function() {
                        // Se define la nueva posicion en Y segun TWEEN y la actualiza
                        that.y = that.actualPosition.y;
                        that.position.set (that.x,that.actualPosition.y,that.z);
                        // Pone a PATO sin rotaciones
                        that.rotation.set (0,0,that.rotationBound);
                    })
                    // Al completar la funcion almacena la nueva Y
                    .onComplete( function () {
                      that.actualPosition.y = that.y;
                      that.rotation.set (0,0,0);
                  //    that.ascentDuration=this.ascentDuration;
                    });

    if(code=='w'||code=='W'){
      // Se define la nueva posicion
      this.newPosition.y = this.y+this.incrementalY;
      
      // Si la nueva posicion supera al limite establecido...
      if(this.newPosition.y > this.upperBound){
      //  document.write("hola");
        this.newPosition.y = this.upperBound;
      }
      this.y = this.newPosition.y;
      this.Cuerpo.box3.max.y=this.y+this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.max.y*0.1;
      this.Cuerpo.box3.min.y=this.y+this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.min.y*0.1;



     // this.ascentAnimation.to(this.newPosition, this.ascentDuration);
      this.ascentAnimation.start();
    }
    if(code=='s'||code=='S'){
      // Se define la nueva posicion
      this.newPosition.y = this.y-this.incrementalY;
      // Si la nueva posicion supera al limite establecido...
      if(this.newPosition.y < this.lowerBound){
        this.newPosition.y = this.lowerBound;
      }
      this.y = this.newPosition.y;
      this.Cuerpo.box3.min.y=this.y-this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.max.y*0.1;
      this.Cuerpo.box3.max.y=this.y-this.Cuerpo.cuerpoPrincipal.geometry.boundingBox.min.y*0.1;



      this.descentAnimation.start();
    }
    //console.log("-->"+this.y);

    //console.log(this.Cuerpo.box3.max.y);
    //console.log(this.Cuerpo.box3.min.y);
    
    
  }

  getXPosition(){
    return this.position.x;
  }

  // Devuelve la posicion en Y de PATO
  getYPosition(){
    return this.y;
  }
  
  // Devuelve la caja de colision de PATO
  getBox(){
    //this.position.set(0,0,0);
    //this.receiveShadow = true;

    return this.Cuerpo.getboxWorld();
  }

  // Pone a PATO en su posicion original
  reset(){
    TWEEN.removeAll();
    this.position.set (0,0,this.z);
    this.rotation.set (0,0,0);
    this.y = 0;
    this.actualPosition.y = 0;
  }

  resize(){
    //cambiar el comando de escala
    /*this.scaleX += 0.01;
    this.scaleY += 0.01;
    this.scaleZ += 0.01;
    this.scale.set(this.scaleX ,this.scaleY ,this.scaleZ);*/
    this.ascentDuration-=50;
    if(this.ascentDuration<0)
      this.ascentDuration=0;
  }
}