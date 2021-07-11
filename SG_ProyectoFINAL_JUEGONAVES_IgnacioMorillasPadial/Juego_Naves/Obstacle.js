class Obstacle extends THREE.Mesh {
  constructor() {
    super();

    // Limites superior e inferior
    this.lim_superior = 7; //limite superior
    this.lim_inferior = -9;
    this.lim_derecho = 21;
    this.lim_izquierdo = -21;
    var ancho_ventana = this.lim_superior - this.lim_inferior;//Con respecto a la altura
    //var respect_space = 0.3;

    // Posicion del obstaculo
    this.min = this.lim_inferior;// + ancho_ventana;//*respect_space;
    this.max = this.lim_superior;// - ancho_ventana;//*respect_space;
    this.max_rigth_pos = this.lim_derecho ;
    this.max_left_pos = this.lim_izquierdo ;
    this.hasPassedMiddleOneTime = false;
    
    // Espacio entre la tubería de arriba y la de abajo del obstaculo
    this.Espacio_entre_obj = 2;

    // velocidad obstaculos
    this.speed = 0.1;

    // Objetos tuberias que forman un obstaculo

    this.esfera_sup = new Pipeline(true);
    this.esfera_sup.position.z = 1;
    //this.esfera_sup.box.center.z=1;


    this.esfera_inf = new Pipeline(false);
    this.esfera_inf.position.z = 1;

    this.esfera_ext = new Pipeline(false);
    this.esfera_ext.position.z = 1;

    this.esfera_rell = new Pipeline(false);
    this.esfera_rell.position.z = 1;

    this.esfera_rella = new Pipeline(false);
    this.esfera_rella.position.z = 1;
   



    //this.obstacle = new THREE.Object3D();

    this.add(this.esfera_sup);
    this.add(this.esfera_inf);
    this.add(this.esfera_ext);
    this.add(this.esfera_rell);
    this.add(this.esfera_rella);
    //this.esfera_sup.box.center.z=1;

    //this.obstacle.position.x = this.max_rigth_pos; //Lo colocamos en el lado derecho del mapa
    
    // Generamos la posición inicial del obstaculo
    this.calculateNewCenter(); // generamos unos puntos aleatorios
    this.generateNewObstaclePosition();
  }
    
  // Función que posiciona el obstaculo (tubería de arriba y de abajo) en la nueva posición
  generateNewObstaclePosition(){
   // this.esfera_sup.updatePipelineHigger(this.tama1);
    //this.esfera_inf.updatePipelineHigger(this.tama2);
    //this.esfera_ext.updatePipelineHigger(this.tama2);

    this.esfera_sup.position.y=this.center_sup;
    
    this.esfera_sup.box.center.y=this.esfera_sup.position.y;

    if(this.esfera_inf.getSizeY()==1){
      this.esfera_inf.position.y=this.esfera_sup.position.y-4;
      this.esfera_inf.box.center.y=this.esfera_inf.position.y;

    }
    else{
      this.esfera_inf.position.y=this.esfera_sup.position.y-6;
      this.esfera_inf.box.center.y=this.esfera_inf.position.y;

    }
    if(this.esfera_ext.getSizeY()==1){
      this.esfera_ext.position.y=this.esfera_sup.position.y+4;
      this.esfera_ext.box.center.y=this.esfera_ext.position.y;

    }
    else{
      this.esfera_ext.position.y=this.esfera_sup.position.y+6;
      this.esfera_ext.box.center.y=this.esfera_ext.position.y;

    }
    if(this.esfera_rell.getSizeY()==1){
      this.esfera_rell.position.y=this.esfera_ext.position.y+4;
      this.esfera_rell.box.center.y=this.esfera_rell.position.y;

    }
    else{
      this.esfera_rell.position.y=this.esfera_ext.position.y+6;
      this.esfera_rell.box.center.y=this.esfera_rell.position.y;

    }
    if(this.esfera_rella.getSizeY()==1){
      this.esfera_rella.position.y=this.esfera_inf.position.y-4;
      this.esfera_rella.box.center.y=this.esfera_rella.position.y;

    }
    else{
      this.esfera_rella.position.y=this.esfera_inf.position.y-6;
      this.esfera_rella.box.center.y=this.esfera_rella.position.y;

    }
  }

  // Función que calcula el nuevo centro del obstaculo de forma aleatoria
  calculateNewCenter(){
    //REdimendion
    //this.tama1 = Math.random() * (2);
    this.separacion =Math.floor( Math.random() * (2)+2);
    this.tama1 =Math.floor( Math.random() * (3)+1);
    this.tama2 =Math.floor( Math.random() * (3)+1);
    this.tama3 =Math.floor( Math.random() * (3)+1);
    this.tama4 =Math.floor( Math.random() * (3)+1);
    this.tama5 =Math.floor( Math.random() * (3)+1);
    /*this.tama1=2;
    this.tama4=2;
    this.tama5=1;*/

    this.esfera_sup.updatePipelineHigger(this.tama1);
    this.esfera_inf.updatePipelineHigger(this.tama2);
    this.esfera_ext.updatePipelineHigger(this.tama3);
    this.esfera_rell.updatePipelineHigger(this.tama4);
    this.esfera_rella.updatePipelineHigger(this.tama4);




    //this.esfera_inf.updatePipelineHigger(this.tama2);
    //posiciones
    //this.center_y = this.lim_inferior +Math.random() * (Math.abs(this.min)+this.max);
    //this.anterioranterior=0;
    //this.anterior=0;
    //this.center_sup = Math.floor(this.lim_inferior +Math.random() * (Math.abs(this.min)+this.max-8)+3);
    //while(this.anterior==this.center_sup || this.anterioranterior==this.center_sup || (Math.abs(this.anterior-this.center_sup)<=1) || (Math.abs(this.anterioranterior-this.center_sup)<=1)){
    this.center_sup = Math.floor(this.lim_inferior +Math.random() * (Math.abs(this.min)+this.max-8)+3);
    //}
    //this.anterior =this.center_sup;
    //this.center_sup=0;

  }

  // Funcion que devuelve el limite de la tuberia superior
  getUpperObstacleBound(){
    return this.lim_superior - this.esfera_sup.getSizeY() - 0.1;
  }

  // Funcion que devuelve el limite de la tuberia inferior
  getLowerObstacleBound(){
    return this.lim_inferior + this.esfera_inf.getSizeY() -0.1;
  }
  
  // Devuelve la coordenada X del obstaculo
  getXPosition(){
    return this.position.x;
  }

  // Devuelve el límite izquierdo hasta el que puede llegar el obstaculo
  getMaxLeftPos(){
    return this.max_left_pos;
  }

  // Devuelve el límite derecho hasta el que puede llegar el obstaculo
  getMaxRigthPos(){
    return this.max_rigth_pos;
  }

  // Devuelve si el obstaculo ya ha pasado por el centro de la pantalla una vez
  gethasPassedMiddleOneTime(){
    return this.hasPassedMiddleOneTime;
  }

  // Devuelve el centro del obstaculo calculado aleatoriamente
  getObstacleCenter(){
    return this.center_y;
  }

  // Devuelve como de ancho es el obstaculo
  getWidthObstacle(){
    return (this.esfera_sup.getWidth()+this.esfera_inf.getWidth()+this.esfera_ext.getWidth()+this.esfera_rell.getWidth()+this.esfera_rella.getWidth())/5;
  }

  // Actualiza el movimiento de la tubería
  updateMovement () {
    // Si el obstaculo ha superado el limite izquierdo se resetea
    if(this.position.x < this.max_left_pos){
      this.reset();
    }
    // En caso contrario avanza de forma progresiva hacia la izquierda
    else{
      this.position.x -= this.speed;
      this.esfera_sup.box.center.x=this.position.x;
      this.esfera_inf.box.center.x=this.position.x;
      this.esfera_ext.box.center.x=this.position.x;
      this.esfera_rell.box.center.x=this.position.x;
      this.esfera_rella.box.center.x=this.position.x;


      if(this.position.x <= 0 && !this.hasPassedMiddleOneTime){
        this.hasPassedMiddleOneTime = true;
      }
    }
  }

  // Funcion que resetea la posición inicial del obstaculo
  reset(){
    this.calculateNewCenter();
    this.position.x = this.max_rigth_pos;
    this.generateNewObstaclePosition();
  }

  // Devuelve las cajas de colision del obstaculo (tuberia superior e inferior)
  getBoxes(){
    //console.log("------------------");
     //  return  this.esfera_sup.getBox().center=;
    /*this.geometry2 = new THREE.SphereBufferGeometry(this.scale_factor );
    this.material2 = new THREE.MeshBasicMaterial( { color: 0xff9900, wireframe: true } );

    this.mesh2 = new THREE.Mesh( this.geometry2, this.material2 );
    this.mesh2.position.x=this.esfera_sup.box.center.x;
    this.mesh2.position.y=this.esfera_sup.box.center.y;
    this.mesh2.position.z=this.esfera_sup.box.center.z+1;
    var jeje =new THREE.Vector3()
    jeje.x=this.esfera_sup.box.center.x;
    jeje.y=this.esfera_sup.box.center.y;
    jeje.z=this.esfera_sup.box.center.z+1;
    this.add(this.mesh2)
     return new THREE.Sphere((jeje),this.esfera_sup.box.radius-0.2);*/
     return this.esfera_sup;
    //return [this.esfera_sup.getBox(),this.esfera_inf.getBox(),this.esfera_ext.getBox(),this.esfera_rell.getBox(),this.esfera_rella.getBox()];
  }
}