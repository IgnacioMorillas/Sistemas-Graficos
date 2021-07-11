
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Construimos los distinos elementos que tendremos en la escena
    this.createBackGround();


    // Construimos los distinos elementos que tendremos en la escena

    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
   // this.axis = new THREE.AxesHelper (5);
    
    //this.add (this.axis);
    this.parar=false;
    ////////////////////////////////////////////////*
    //OBSTACULOS
    this.next_obstacle = 7; //numero de obstaculos
    this.obstacle1 = new Obstacle();
    //this.obstacle1.position.x=0;
    this.add(this.obstacle1);
    
    this.obstacle2 = new Obstacle();
    this.obstacle2.position.x=this.next_obstacle+this.obstacle1.position.x;
    this.add(this.obstacle2);

    this.obstacle3 = new Obstacle();
    this.obstacle3.position.x=this.next_obstacle+this.obstacle2.position.x;
    this.add(this.obstacle3);

    this.obstacle4 = new Obstacle();
    this.obstacle4.position.x=this.next_obstacle+this.obstacle3.position.x;
    this.add(this.obstacle4);

    this.obstacle5 = new Obstacle();
    this.obstacle5.position.x=this.next_obstacle+this.obstacle4.position.x;
    this.add(this.obstacle5);
    this.obstacle6 = new Obstacle();
    this.obstacle6.position.x=this.next_obstacle+this.obstacle5.position.x;
    this.add(this.obstacle6);

    //////////////////////////////*

    // creamos el modelo.
    this.COMPLETO = new COMPLETO();
    this.add (this.COMPLETO);

    // Objetos bonus
    this.heart_mesh = new Heart();
    this.bonusLeft = new Bonus(1, new Heart());
    this.add(this.bonusLeft);

    this.bonusRight = new Bonus(2, new Coin());
    this.add(this.bonusRight);
    this.bonusrojo = new Bonus(3, new Coinrojo());
    this.add(this.bonusrojo);
    this.bonusrosa = new Bonus(4, new Coinrosa());
    this.add(this.bonusrosa);
      // Limite inferior
      this.lowerBound = -5.3;
    
    // Variable que determina cuando el juego se inicia o no
    this.startedGame = false;
    this.endGame = false;
    this.scoreP = 0;
    this.lifes = 1;
    this.inmortal = 1;

    this.points = 1;
    this.detectCollisions = true;
    this.canGetBonus = false;
    this.canGetBonusSeconds = 2.5;
    this.iniStopCollisions = null;
    this.timeBonusReference = new Date();
    this.offsetBonus = 0.5;

    // Umbral para determinar si ha pasado un obstaculo
    this.threshold = -0.1;
    this.offset = 0.2;

  //USUARIO
  // Callbacks para actualizar interfaz de usuario (script.js)
  this.changeScore(this.scoreP);
  this.changeLifes(true);
  multiplicador.innerHTML =("x " + 1);
  inmortal.innerHTML =("Inmortal[space] " + this.inmortal);
  speed_nave.innerHTML =("V. Nave " + parseInt(((Math.abs(this.COMPLETO.ascentDuration-250)+100))) + "Km/h");
  speed_objetos.innerHTML =("V. meteoritos " + parseInt((this.obstacle1.speed *1000)) + "Km/h");
  
  instruciones.innerHTML = "<b>"+"<p style="+"color:White;>----------------------------------------------------REGLAS--------------------------------------------------------</b><br>" + 
  "<br>"+ "Pulsa <b>'W'</b> o <b>'S'</b> para empezar a moverte arriba y abajo. [Se aconseja no mantener el boton pulsado, si no hacer varias pulsaciones]<br>"+
  "<br>"+ "Tu <b>puntuación</b> aumenta segun vas superando obstaculos, pero tambien irá aumentando la velocidad de los meteoritos!. <br>"+
  "<br>"+ "<b>Recoge los distintos bonus que van a apreciendo para llegar mas lejos:</b> <br></p>"+
  "<br>"+ "<p style="+"color:Red;> <b>Corazones</b>= Cuentas con una vida mas.</p> <br>"+
  "<br>"+ "<p style="+"color:Green;> <b>Monedas Verdes</b>= +10 puntos</p><br>"+
  "<br>"+ "<p style="+"color:Orange;> <b>Monedas Amarillas</b>= El bonus mas importante! ya que este te proporciona: <br>"+
          "         + Mas velocidad en los movimientos de arriba/abajo.<br>" + 
          "         + Un multiplicador en la obtencion de puntosen consecuencia aumenta la velocidad de los meteoritos. <br>"+
          "         + CONSECUENCIA aumenta la velocidad de los meteoritos.</p><br>"+
  "<br>"+ "<p style="+"color:Violet;"+"> <b> Monedas Rosa</b>= Obtienes un escudo que te hace inmortal durante 2s. <b>[pulsa espacio para usarlo]</b> </p><br>";


  }

    
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 0, 20);//21
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
   /*this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;*/
  }

  createBackGround () {
    // Valor para mover el fondo
    this.time = 0;
    // Una figura es un Mesh
    this.background = new THREE.Mesh ();
    // Un Mesh se compone de geometría y material
    var size_x_background = 34;
    var size_y_background = 18;
    this.background.geometry = new THREE.BoxGeometry(size_x_background, size_y_background);
    // Las primitivas básicas se crean centradas en el origen
    // Como material se crea uno a partir de una textura
    this.texture = new THREE.TextureLoader().load('imgs/cielo1.jpg');
    this.texture.wrapS = THREE.RepeatWrapping;
    this.background.material = new THREE.MeshBasicMaterial ({map: this.texture});
    // Por último se añade el suelo a la escena
    this.add (this.background);


    // Bandas negras laterales, superior e inferior
    var geometry = new THREE.PlaneGeometry(33, 50, 1);
    var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    this.black_right_side = new THREE.Mesh(geometry, material);
    this.black_left_side = new THREE.Mesh(geometry, material);
    this.black_right_side.position.x = size_x_background-1;
    this.black_right_side.position.z = 1;
    this.black_left_side.position.x = -size_x_background+1;
    this.black_left_side.position.z = 1;

    var geometry2 = new THREE.PlaneGeometry(50, 20, 1);
    this.black_up_side = new THREE.Mesh(geometry2, material);
    this.black_down_side = new THREE.Mesh(geometry2, material);
    this.black_up_side.position.y = size_y_background;
    this.black_up_side.position.z = 1;
    this.black_down_side.position.y = -size_y_background;
    this.black_down_side.position.z = 1;
    
    this.add(this.black_right_side);
    this.add(this.black_left_side);
    this.add(this.black_up_side);
    this.add(this.black_down_side);
  }


  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, 1 );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
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

  update () {
    if(this.parar==false){
    requestAnimationFrame(() => this.update())

    //this.cameraControl.update();
        // Actualizar posición de los divs score y lifes

    this.renderer.render (this, this.getCamera());
    score.style.top = window.innerHeight*0.05 + 'px';
    score.style.left = window.innerWidth*0.85+ 'px';

    multiplicador.style.top = window.innerHeight*0.05 + 'px';
    multiplicador.style.left = window.innerWidth*0.8+ 'px';
    
    lifes.style.top = window.innerHeight*0.1 + 'px';
    lifes.style.left = window.innerWidth*0.05 + 'px';

    inmortal.style.top = window.innerHeight*0.05 + 'px';
    inmortal.style.left = window.innerWidth*0.05 + 'px';

    speed_nave.style.top = window.innerHeight*0.9 + 'px';
    speed_nave.style.left = window.innerWidth*0.05 + 'px';
    

    speed_objetos.style.top = window.innerHeight*0.9 + 'px';
    speed_objetos.style.left = window.innerWidth*0.8 + 'px';


    //this.COMPLETO.update();

    // Si aún no han pasado this.canGetBonusSeconds desde el inicio los bonus estarán desactivados
    if(!this.canGetBonus){
      var currentTime = new Date();
      if((currentTime.getTime() - this.timeBonusReference.getTime())/1000 >= this.canGetBonusSeconds){
        this.canGetBonus = true;
        this.timeBonusReference = new Date();
        this.setRandomBonusVisible();
      }
    }
    // Despues de this.canGetBonusSeconds segundos ya pueden empezar a aparecer los bonus
    else{
      var currentTime = new Date();
      if((currentTime.getTime() - this.timeBonusReference.getTime())/1000 >= this.canGetBonusSeconds){
        this.timeBonusReference = new Date();
        this.setRandomBonusVisible();
      }
    } 

    // Si la detección de colisiones está desactivada...
    if(!this.detectCollisions){
      // Esperamos 2 segundo hasta activar la detección de nuevo
      var finStopCollisions = new Date();
      if((finStopCollisions.getTime() - this.iniStopCollisions.getTime())/2000 >= 1.0){
        this.detectCollisions = true;
        this.COMPLETO.visible = true;
        this.COMPLETO.escudo.visible = false;

      }
      else {
        // Hacemos parpadear el NAVE
        if(!this.endGame){
          var module_value = ((finStopCollisions.getTime() - this.iniStopCollisions.getTime())/1000)%0.1;
          if(module_value <= 0.02){
            this.COMPLETO.visible = !this.COMPLETO.visible;
            this.COMPLETO.escudo.visible = true;
          }
        }
        else{
          this.COMPLETO.visible = true;
          this.COMPLETO.escudo.visible = false;

          this.showFinalScore();
        }
      }
    }
    
    // Si el juego ha iniciado se actualiza el resto del modelo
    if(this.startedGame){
      instruciones.style.display ="none";
      //.style.display 
      // Actualizar NAVE
      this.COMPLETO.update();
      
      // Mientras tenga vidas...
      if(this.lifes > 0){
        // Actualizar movimiento de los obstaculos
        this.updateObstacleMovement();
        this.bonusLeft.update();
        this.bonusRight.update();
        this.bonusrojo.update();
        this.bonusrosa.update();

        

        // Comprobar que no se producen colisiones entre los obstaculos y el NAVE
        if(this.detectCollisions){
          this.checkObstaclesCollisions();
        }

        // Comprueba las colisiones entre el NAVE y los bonus
        if(this.canGetBonus){
          //console.log("555");
          this.checkBonusCollisions();
        }
      }
      // Si me quedo sin vidas
      else {
        this.endGame = true;
      }
    }
    if(!this.endGame){
      // Mover el fondo
      this.updateBackgroundMovement();
    }
  }

  THREE.Sphere.__closest = new THREE.Vector3();
	THREE.Sphere.prototype.intersectsBox = function(box) {
	    // get box closest point to sphere center by clamping
	    THREE.Sphere.__closest.set(this.center.x, this.center.y, this.center.z);
	    THREE.Sphere.__closest.clamp(box.min, box.max);

      var distance = this.center.distanceToSquared(THREE.Sphere.__closest);
      //console.log("distance " + distance + "--- radios" + (this.radius * this.radius));
	    return distance < (this.radius * this.radius);
  };
  
  }
  intersect(sphere, box) {
    // get box closest point to sphere center by clamping
    var x = Math.max(box.min.x, Math.min(sphere.center.x, box.max.x));
    //console.log(box.min.x + "   "+ sphere.center.x+ "    " +box.max.x);
  
    //console.log(x);
  
    var y = Math.max(box.min.y, Math.min(sphere.center.y, box.max.y));
    //console.log(box.min.y + "   "+ sphere.center.y+ "    " +box.max.y);

    //console.log(y);
  
    var z = Math.max(box.min.z, Math.min(sphere.center.z, box.max.z));
    //console.log(box.min.z + "   "+ sphere.center.z+ "    " +box.max.z);

    //console.log(z);
  
  
    // this is the same as isPointInsideSphere
    var distance = Math.sqrt((x - sphere.center.x) * (x - sphere.center.x) +
                             (y - sphere.center.y) * (y - sphere.center.y) +
                             (z - sphere.center.z) * (z - sphere.center.z));
    //console.log(distance + "  distancia - radio " + (sphere.radius ));
    return distance < (sphere.radius/2 );
  }
  // Función encargada de comprobar si el NAVE colisiona con los obstaculos
  checkObstaclesCollisions(){
    // Calculamos las distancias del NAVE a los obstaculos
    var distanceToObs1 = this.obstacle1.getXPosition() - this.COMPLETO.getXPosition();
    var distanceToObs2 = this.obstacle2.getXPosition() - this.COMPLETO.getXPosition();
    var distanceToObs3 = this.obstacle3.getXPosition() - this.COMPLETO.getXPosition();
    var distanceToObs4 = this.obstacle4.getXPosition() - this.COMPLETO.getXPosition();
    var distanceToObs5 = this.obstacle5.getXPosition() - this.COMPLETO.getXPosition();
    var distanceToObs6 = this.obstacle6.getXPosition() - this.COMPLETO.getXPosition();

    //var distanceToObs2 = this.obstacle2.getXPosition() - this.COMPLETO.getXPosition();

    // Siempre que la distancia al obstaculo sea positiva
    // Esto quiere decir que el obstaculo esta delante de NAVE

    //Cuando NAVE esta cerca de el obstaculo 1
    ////console.log(this.distanceToObs1);

    if(distanceToObs1 < this.obstacle1.getWidthObstacle()/2 + 2 && distanceToObs1 > -(this.obstacle1.getWidthObstacle()/2)){
      
      this.COMPLETOBox = this.COMPLETO.Cuerpo.box3;

      let obstacleBoxes = this.obstacle1.getBoxes();

      //console.log( this.COMPLETO.Cuerpo.box3);
      ////console.log(obstacleBoxes);
    if( this.obstacle1.esfera_sup.box.intersectsBox(this.COMPLETOBox)|| this.obstacle1.esfera_inf.box.intersectsBox(this.COMPLETOBox)|| this.obstacle1.esfera_ext.box.intersectsBox(this.COMPLETOBox)|| this.obstacle1.esfera_rell.box.intersectsBox(this.COMPLETOBox)|| this.obstacle1.esfera_rella.box.intersectsBox(this.COMPLETOBox)){

      ////console.log("CHOCO! en el 1");
      this.loseLife();
      //}
    }
      // Si el NAVE pasa la tubería 1 incrementamos el score
      if(distanceToObs1 < 0 && distanceToObs1 > this.threshold){
        this.increaseScore();
      }
    
    }
    if(distanceToObs2 < this.obstacle2.getWidthObstacle()/2 + 2 && distanceToObs2 > -(this.obstacle2.getWidthObstacle()/2)){
      
      this.COMPLETOBox = this.COMPLETO.Cuerpo.box3;

      let obstacleBoxes = this.obstacle2.getBoxes();

      ////console.log(this.COMPLETO.Cuerpo.box3);
      ////console.log(obstacleBoxes);
    if( this.obstacle2.esfera_sup.box.intersectsBox(this.COMPLETOBox)|| this.obstacle2.esfera_inf.box.intersectsBox(this.COMPLETOBox)|| this.obstacle2.esfera_ext.box.intersectsBox(this.COMPLETOBox)|| this.obstacle2.esfera_rell.box.intersectsBox(this.COMPLETOBox)|| this.obstacle2.esfera_rella.box.intersectsBox(this.COMPLETOBox)){

      //console.log("CHOCO! en el 1");
      this.loseLife();
      //}
    }
      // Si el NAVE pasa la tubería 1 incrementamos el score
      if(distanceToObs2 < 0 && distanceToObs2 > this.threshold){
        this.increaseScore();
      }
    
    }
    if(distanceToObs3 < this.obstacle3.getWidthObstacle()/2 + 2 && distanceToObs3 > -(this.obstacle3.getWidthObstacle()/2)){
      
      this.COMPLETOBox = this.COMPLETO.Cuerpo.box3;

      let obstacleBoxes = this.obstacle3.getBoxes();

      ////console.log(this.COMPLETO.Cuerpo.box3);
      ////console.log(obstacleBoxes);
    if( this.obstacle3.esfera_sup.box.intersectsBox(this.COMPLETOBox)|| this.obstacle3.esfera_inf.box.intersectsBox(this.COMPLETOBox)|| this.obstacle3.esfera_ext.box.intersectsBox(this.COMPLETOBox)|| this.obstacle3.esfera_rell.box.intersectsBox(this.COMPLETOBox)|| this.obstacle3.esfera_rella.box.intersectsBox(this.COMPLETOBox)){

      //console.log("CHOCO! en el 1");
      this.loseLife();
      //}
    }
      // Si el NAVE pasa la tubería 1 incrementamos el score
      if(distanceToObs3 < 0 && distanceToObs3 > this.threshold){
        this.increaseScore();
      }
    
    }
    if(distanceToObs4 < this.obstacle4.getWidthObstacle()/2 + 2 && distanceToObs4 > -(this.obstacle4.getWidthObstacle()/2)){
      
      this.COMPLETOBox = this.COMPLETO.Cuerpo.box3;

      let obstacleBoxes = this.obstacle4.getBoxes();

      ////console.log(this.COMPLETO.Cuerpo.box3);
      ////console.log(obstacleBoxes);
    if( this.obstacle4.esfera_sup.box.intersectsBox(this.COMPLETOBox)|| this.obstacle4.esfera_inf.box.intersectsBox(this.COMPLETOBox)|| this.obstacle4.esfera_ext.box.intersectsBox(this.COMPLETOBox)|| this.obstacle4.esfera_rell.box.intersectsBox(this.COMPLETOBox)|| this.obstacle4.esfera_rella.box.intersectsBox(this.COMPLETOBox)){

      ////console.log("CHOCO! en el 1");
      this.loseLife();
      //}
    }
      // Si el NAVE pasa la tubería 1 incrementamos el score
      if(distanceToObs4 < 0 && distanceToObs4 > this.threshold){
        this.increaseScore();
      }
    
    }
    if(distanceToObs5 < this.obstacle5.getWidthObstacle()/2 + 2 && distanceToObs5 > -(this.obstacle1.getWidthObstacle()/2)){
      
      this.COMPLETOBox = this.COMPLETO.Cuerpo.box3;

      let obstacleBoxes = this.obstacle5.getBoxes();

      //console.log(this.COMPLETO.Cuerpo.box3);
      //console.log(obstacleBoxes);
    if( this.obstacle5.esfera_sup.box.intersectsBox(this.COMPLETOBox)|| this.obstacle5.esfera_inf.box.intersectsBox(this.COMPLETOBox)|| this.obstacle5.esfera_ext.box.intersectsBox(this.COMPLETOBox)|| this.obstacle5.esfera_rell.box.intersectsBox(this.COMPLETOBox)|| this.obstacle5.esfera_rella.box.intersectsBox(this.COMPLETOBox)){

      //console.log("CHOCO! en el 1");
      this.loseLife();
      //}
    }
      // Si el NAVE pasa la tubería 1 incrementamos el score
      if(distanceToObs5 < 0 && distanceToObs5 > this.threshold){
        this.increaseScore();
      }
    
    }
    if(distanceToObs6< this.obstacle1.getWidthObstacle()/2 + 2 && distanceToObs6 > -(this.obstacle6.getWidthObstacle()/2)){
      
      this.COMPLETOBox = this.COMPLETO.Cuerpo.box3;

      let obstacleBoxes = this.obstacle6.getBoxes();

      //console.log(this.COMPLETO.Cuerpo.box3);
      //console.log(obstacleBoxes);
    if( this.obstacle6.esfera_sup.box.intersectsBox(this.COMPLETOBox)|| this.obstacle6.esfera_inf.box.intersectsBox(this.COMPLETOBox)|| this.obstacle6.esfera_ext.box.intersectsBox(this.COMPLETOBox)|| this.obstacle6.esfera_rell.box.intersectsBox(this.COMPLETOBox)|| this.obstacle6.esfera_rella.box.intersectsBox(this.COMPLETOBox)){

      //console.log("CHOCO! en el 1");
      this.loseLife();
      //}
    }
      // Si el NAVE pasa la tubería 1 incrementamos el score
      if(distanceToObs6 < 0 && distanceToObs6 > this.threshold){
        this.increaseScore();
      }
    
    }
  }

  // Función encargada de comprobar si el NAVE colisiona con los bonus
  checkBonusCollisions(){
    // Calculamos las distancias del NAVE a los bonus
    var distanceBonus1 = this.bonusRight.getXPosition() - this.COMPLETO.getXPosition();
    var distanceBonus2 = this.bonusLeft.getXPosition() - this.COMPLETO.getXPosition();
    var distanceBonus3 = this.bonusrojo.getXPosition() - this.COMPLETO.getXPosition();
    var distanceBonus4 = this.bonusrosa.getXPosition() - this.COMPLETO.getXPosition();


   ////console.log("1111");
    // Siempre que la distancia al bonus sea positiva
    // Esto quiere decir que el bonus esta delante de NAVE

    //Cuando NAVE esta cerca de el bonus 1
    if(this.bonusRight.visible){
     ////console.log("22222");

      if(distanceBonus1 < this.bonusRight.getWidth()/2 && distanceBonus1 > -(this.bonusRight.getWidth()/2)){
        //console.log("33333");

        //Se actualiza la caja de NAVE y las cajas del bonus
        let COMPLETOBox = this.COMPLETO.Cuerpo.box3;
        let bonusBox = this.bonusRight.getBox();
    //   //console.log("NAVE");
     ////console.log(this.COMPLETO.Cuerpo.box3);
     ////console.log("CORAZON");
    // //console.log(bonusBox);
        //Si choca con alguna de ella
        if(bonusBox.intersectsBox(COMPLETOBox)){
         //console.log("CHOCO! en el Der");
          this.applyBonus(this.bonusRight.type);
          this.bonusRight.visible = false;
          this.bonusRight.unsetVisibleNextGoToRightBound(); 
        }
      }
    }

    //Cuando NAVE esta cerca de el bonus 2
    if(this.bonusLeft.visible){
      if(distanceBonus2 < this.bonusLeft.getWidth()/2 && distanceBonus2 > -(this.bonusLeft.getWidth()/2)){
        
        //Se actualiza la caja de NAVE y las cajas del bonus
        let COMPLETOBox = this.COMPLETO.Cuerpo.box3;
        let bonusBox = this.bonusLeft.getBox();

        //Si choca con alguna de ella
        if(bonusBox.intersectsBox(COMPLETOBox)){
         //console.log("CHOCO en el Izq");
          this.applyBonus(this.bonusLeft.type);
          this.bonusLeft.visible = false;
          this.bonusLeft.unsetVisibleNextGoToRightBound();
        }
      }
    }

    if(this.bonusrojo.visible){
      if(distanceBonus3 < this.bonusrojo.getWidth()/2 && distanceBonus3 > -(this.bonusrojo.getWidth()/2)){
        
        //Se actualiza la caja de NAVE y las cajas del bonus
        let COMPLETOBox = this.COMPLETO.Cuerpo.box3;
        let bonusBox = this.bonusrojo.getBox();

        //Si choca con alguna de ella
        if(bonusBox.intersectsBox(COMPLETOBox)){
         //console.log("CHOCO en el Izq");
          this.applyBonus(this.bonusrojo.type);
          this.bonusrojo.visible = false;
          this.bonusrojo.unsetVisibleNextGoToRightBound();
        }
      }
    }

    if(this.bonusrosa.visible){
      if(distanceBonus4 < this.bonusrosa.getWidth()/2 && distanceBonus4 > -(this.bonusrosa.getWidth()/2)){
        
        //Se actualiza la caja de NAVE y las cajas del bonus
        let COMPLETOBox = this.COMPLETO.Cuerpo.box3;
        let bonusBox = this.bonusrosa.getBox();

        //Si choca con alguna de ella
        if(bonusBox.intersectsBox(COMPLETOBox)){
         //console.log("CHOCO en el Izq");
          this.applyBonus(this.bonusrosa.type);
          this.bonusrosa.visible = false;
          this.bonusrosa.unsetVisibleNextGoToRightBound();
        }
      }
    }
  }

    // Callback para decrementar las vidas
    loseLife(){
      this.lifes -= 1;
      this.changeLifes(false);
      //console.log("LIFES:" + this.lifes);
      this.detectCollisions = false;
      this.iniStopCollisions = new Date();
    }
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }
//-----------------------------------------------
  // Función que se encarga de iniciar el juego
  startGame(code){
    this.startedGame = true;
    this.COMPLETO.fly(code);
  }

  // Función que devuelve si el juego a terminado o no
  getEndGame(){
    return this.endGame;
  }

  // Función encargada de actualizar el movimiento del fondo
  updateBackgroundMovement(){
    this.time++;
    this.texture.offset.x = this.time*0.0035;
  }

//-----------------------------------------------

  //SCRIPT
  changeScore(value){
    score.innerHTML = ("PUNTOS "+ value);
   //console.log("5555");

  }

  
  changeLifes(sumar){
  if(sumar){
    lifes.innerHTML += "♥";
   //console.log("33333");

  }
  else{
    lifes.innerHTML = lifes.innerHTML.slice(0, lifes.innerHTML.length-1);
 //console.log("22222");
  }

  }

  onDocumentKeyDown(event) {
    var y = event.charCode;
    var code = String.fromCharCode(y);
    if ((code == "w" ||code == "s"||code == "W"||code == "S") && !scene.getEndGame()) {
        scene.startGame(code);
    }
    else if ((code == "w" ||code == "s"||code == "W"||code == "S") && scene.getEndGame()){
      // alert("Puntuación: " + score.innerHTML);
      scene.createNewScene();
    }
    else if(code==' ' && !scene.getEndGame() && scene.startedGame && scene.inmortal>0){
      scene.inmortal -=1;
      inmortal.innerHTML =("Inmortal[space] " + scene.inmortal);
      scene.detectCollisions = false;
      scene.iniStopCollisions = new Date();  
    }
  }

  createNewScene(){
    location.reload();
  }

  showFinalScore(){
   //console.log("11111");
    document.body.appendChild(finalScore);

    if (typeof(Storage) !== "undefined") {

      if (!localStorage.score) {
        localStorage.score = 0;
      }
  
      if (Number.parseInt === undefined){
        Number.parseInt = window.parseInt;
      }
      
      var scoreInt = Number.parseInt(score.innerHTML);
  
      if (localStorage.score < scoreInt) {
        localStorage.score = scoreInt;
      }
  
     //console.log("holi");

      finalScore.innerHTML = "<center>Tu puntuacion ha sido:<br><br><b><h1 font-size: 40px;> " + score.innerHTML  + "</h1></b><br><br>"+ "Pulsa 'W' o 'S' para volver a empezar <br>";
    }
    else {
      finalScore.innerHTML = "Tu puntuacion ha sido: " + score.innerHTML + "<br>" + "Pulsa 'W' o 'S' para volver a empezar <br>";
    }
   finalScore.style.display = "block";
  }
  //-----------------------------------------------
  //OBSTACULOS
  // Función que hace visible o no los obstaculos que estén invisibles de forma aleatoria
  setRandomBonusVisible(){
    var randomNumber = Math.random();
    // Bonus de la izquierda
    if(randomNumber >= this.offsetBonus && !this.bonusLeft.visible){
      this.bonusLeft.setVisibleNextGoToRightBound();
    }
    
    randomNumber = Math.random();
    // Bonus de la derecha
    if(randomNumber >= this.offsetBonus && !this.bonusRight.visible){
      this.bonusRight.setVisibleNextGoToRightBound();
    }
    randomNumber = Math.random();
    // Bonus de la derecha
    if(randomNumber >= this.offsetBonus && !this.bonusrojo.visible){
      this.bonusrojo.setVisibleNextGoToRightBound();
    }

    randomNumber = Math.random();
    // Bonus de la derecha
    if(randomNumber >= this.offsetBonus && !this.bonusrosa.visible){
      this.bonusrosa.setVisibleNextGoToRightBound();
    }
  }

  // Función encargada de actualizar el movimiento de los obstaculos
  updateObstacleMovement(){
    /*if(this.obstacle1.gethasPassedMiddleOneTime()){
      this.obstacle1.updateMovement();
      this.obstacle2.updateMovement();
      this.obstacle3.updateMovement();
      this.obstacle4.updateMovement();

    } else {*/
      this.obstacle1.updateMovement();
      this.obstacle2.updateMovement();
      this.obstacle3.updateMovement();
      this.obstacle4.updateMovement();
      this.obstacle5.updateMovement();
      this.obstacle6.updateMovement();


  }

  //BONUS
  // Función que se encarga de añadir un nuevo corazon al juego
  winLife(){
    this.lifes += 1;
    this.changeLifes(true);
  }

  applyBonus(type){
    switch(type){
      case "Coin":
        this.increaseAmountScore();
        break;
      case "Heart":
        this.winLife();
        break;
      case "Coinrojo":
        this.scoreP+=10;
        this.changeScore(this.scoreP);

        break;
      case "Coinrosa":
        this.inmortal += 1;    
        inmortal.innerHTML =("Inmortal[space] " + this.inmortal);
  
      break;
    }


  }
  // Callback para incrementar el score
  increaseScore(){
    this.scoreP +=1*this.points; 
   //console.log("SCORE:"+ this.scoreP);
    this.changeScore(this.scoreP);
      this.obstacle1.speed +=0.001;
      this.obstacle2.speed +=0.001;
      this.obstacle3.speed +=0.001;
      this.obstacle4.speed +=0.001;
      this.obstacle5.speed +=0.001;
      this.obstacle6.speed +=0.001;
      this.bonusRight.speed +=0.001;
      this.bonusLeft.speed +=0.001;
      this.bonusrojo.speed +=0.001;
      this.bonusrosa.speed +=0.001;
    //  speed_nave.innerHTML =("Velocidad Nave " + parseInt(((Math.abs(this.COMPLETO.ascentDuration-250)+100))) + "Km/h");
      speed_objetos.innerHTML =("V. meteoritos " + parseInt((this.obstacle1.speed *1000)) + "Km/h");
    
      
    //callback(this.scoreP);
    //this.winLife();
  }

  increaseAmountScore(){
    this.points*=2;
   // this.multiplicador=this,points;
    multiplicador.innerHTML = ("x " + this.points);

    this.COMPLETO.resize();
    this.obstacle1.speed +=0.005;
    this.obstacle2.speed +=0.005;
    this.obstacle3.speed +=0.005;
    this.obstacle4.speed +=0.005;
    this.obstacle5.speed +=0.005;
    this.obstacle6.speed +=0.005;
    this.bonusRight.speed +=0.005;
    this.bonusLeft.speed +=0.005;
    this.bonusrojo.speed +=0.005;
    this.bonusrosa.speed +=0.005;

    speed_nave.innerHTML =("V. Nave " + parseInt(((Math.abs(this.COMPLETO.ascentDuration-250)+100))) + "Km/h");
    speed_objetos.innerHTML =("V. meteoritos " + parseInt((this.obstacle1.speed *1000)) + "Km/h");
  
    
    


  }
  

}


THREE.Sphere.__closest = new THREE.Vector3();
THREE.Sphere.prototype.intersectsBox = function (box) {
  //console.log("parche");

    // get box closest point to sphere center by clamping
    THREE.Sphere.__closest.set(this.center.x, this.center.y, this.center.z);
    THREE.Sphere.__closest.clamp(box.min, box.max);

    var distance =  this.center.distanceToSquared(THREE.Sphere.__closest);
    return distance < (this.radius * this.radius);
};

score = null;
lifes = null;
multiplicador = null;
inmortal = null;
speed_objetos = null;
speed_nave = null;
instruciones =null;




//-----------------------------------------------------------
/// La función   main
$(function () {

  // DIV para la puntuacion
  instruciones = document.createElement('div');
  instruciones.classList.add('instruciones');
  instruciones.setAttribute("id", "instruciones");
  document.body.appendChild(instruciones);

  // DIV para la puntuacion
  score = document.createElement('div');
  score.classList.add('score');
  score.setAttribute("id", "score");
  document.body.appendChild(score);

  // DIV para las vidas
  lifes = document.createElement('div');
  lifes.classList.add('lifes');
  lifes.setAttribute("id", "lifes");
  document.body.appendChild(lifes);

  // DIV para las vidas
  multiplicador = document.createElement('div');
  multiplicador.classList.add('multiplicador');
  multiplicador.setAttribute("id", "multiplicador");
  document.body.appendChild(multiplicador);
  // DIV para las vidas
  inmortal = document.createElement('div');
  inmortal.classList.add('inmortal');
  inmortal.setAttribute("id", "inmortal");
  document.body.appendChild(inmortal);
  // DIV para las vidas
  speed_objetos = document.createElement('div');
  speed_objetos.classList.add('speed_objetos');
  speed_objetos.setAttribute("id", "speed_objetos");
  document.body.appendChild(speed_objetos);

  // DIV para las vidas
  speed_nave = document.createElement('div');
  speed_nave.classList.add('speed_nave');
  speed_nave.setAttribute("id", "speed_nave");
  document.body.appendChild(speed_nave);

  // DIV para la puntuacion
  finalScore = document.createElement('div');
  finalScore.classList.add('finalScore');
  finalScore.setAttribute("id", "finalScore");
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keypress", scene.onDocumentKeyDown);
  // Que no se nos olvide, la primera visualización.

  scene.update();
});
