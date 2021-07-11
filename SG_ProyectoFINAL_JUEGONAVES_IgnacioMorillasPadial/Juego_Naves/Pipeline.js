 
class Pipeline extends THREE.Mesh {
  constructor(posicion_arriba) {
    super();
    // Booleano encargado de definir si es una meteorito superior o inferior
    this.posicion_arriba = posicion_arriba;

    // Parte de abajo
    this.diametro = 1;
    this.radio_esfera = 1;
    this.scale_factor =1;
    this.down_geometry = new THREE.SphereBufferGeometry (this.scale_factor,12,12);
    this.down_texture = new THREE.TextureLoader().load('imgs/meteorito1.jpg');
    this.down_material = new THREE.MeshBasicMaterial ( {map: this.down_texture});
    this.down_part = new THREE.Mesh(this.down_geometry, this.down_material);
    //this.down_part.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    this.add(this.down_part);

    this.down_part.position.set(0,0,0);
    //this.down_part.geometry.computeBoundingSphere();


    //this.add(this.down_part);

    // Caja de colisión para la meteorito
    this.geometry2 = new THREE.SphereBufferGeometry(this.scale_factor,12,12 );
    this.material2 = new THREE.MeshBasicMaterial( {map: this.down_texture});

    this.mesh2 = new THREE.Mesh( this.geometry2, this.material2 );
    //this.mesh2.position.copy( this.down_part.geometry.boundingSphere.center );
    this.mesh2.geometry.computeBoundingSphere();

    //this.add( this.mesh2 );
    this.box = new THREE.Sphere(this.mesh2.geometry.boundingSphere.center,this.radio_esfera-0.1);

    //this.box.radius =this.scale_factor;

  }

  // Función encargada de poner el largo de la meteorito al tamaño pasado por parametro
  updatePipelineHigger(size_y){
    //var scale_factor = (escala_radio)/this.diametro;
    if(size_y==1){
      this.scale_factor= 1;
      this.down_part.scale.set(this.scale_factor,this.scale_factor,this.scale_factor);
      this.mesh2.scale.set(this.scale_factor,this.scale_factor,this.scale_factor);
      this.box.radius=1-0.1;
     // this.box.expandByScalar(this.scale_factor)
    }
    else{
      this.scale_factor= 2;
      this.down_part.scale.set(this.scale_factor,this.scale_factor,this.scale_factor);
      this.mesh2.scale.set(this.scale_factor,this.scale_factor,this.scale_factor);
      this.box.radius=2-0.1;
      
    }
   // this.down_part.geometry.applyMatrix(new THREE.Matrix4().makeScale(scale_factor, scale_factor, scale_factor));
  }

  // Devuelve la altura total de la meteorito
  getSizeY(){
    return this.scale_factor;
  }

  // Devuelve el ancho medio de la meteorito
  getWidth(){
    return this.scale_factor;
  }

  // Devuelve la caja de colisión de la meteorito
  getBox(){
    //this.box=this.box3.setFromObject(this.down_part);
    //return this.box.getBoundingSphere(this.down_part);
    //this.box3 = new THREE.Box3();
    //this.box3=
    //console.log(this.box.intersectsBox (this.box3.setFromObject(this.down_part)));
    //if(this.scale_factor== 1)
    this.down_part.geometry.computeBoundingSphere();
    return new THREE.Sphere(this.down_part.position,this.radio_esfera-0.1);

    //return this;
  }

}