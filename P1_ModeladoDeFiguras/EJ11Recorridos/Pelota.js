
class PELOTA extends THREE.Object3D {
  constructor(spline) {
    super();
    var geometry =  new THREE.SphereGeometry( 1, 48, 32 );
    this.material = new THREE.MeshNormalMaterial();

    this.esfera = new THREE.Mesh (geometry, this.material );

    this.add(this.esfera);
    //this.time2=Date.now();
    this.origen = { x:0, y: 0 ,z: 0} ;
    this.destino= { x:0, y: 0 ,z: 2} ;
    var that= this;
    this.animacion= new TWEEN.Tween(that.origen)
    .to(that.origen,4000)
    .easing( TWEEN.Easing.Linear.None)
    .onStart( function () {
      console.log("- INICIO Animacion Derecha\n");
      that.position.set(0,0,0);
      this.time2=Date.now();
    })
    .onUpdate( function ( ) {
        var time=Date.now()-this.time2;
        var refresco= 8000;

        var t= (time%refresco) /refresco;
        //console.log(time);
        var posicion=spline.getPointAt(t);
        that.position.copy(posicion);
        var tangente=spline.getTangentAt(t);
        posicion.add(tangente);
        that.lookAt(that.position);
    } )
    .onComplete( function () {
      that.position.set(0,0,2);
      console.log("*COMPLETADA Animacion Derecha*\n\n");
    })


  this.otraAnimacion= new TWEEN.Tween(that.destino)
    .to(that.destino,8000)
    .easing( TWEEN.Easing.Linear.None)
    .onStart( function () {
      console.log("- INICIO Animacion Izquierda\n");
      that.position.set(0,0,2);
      this.time2=Date.now();
    })
    .onUpdate( function ( ) {
        var time=Date.now()-this.time2;
        var refresco= 16000;
        var t= (time%refresco) /refresco+0.5;
        if( t>1){
          t=1;
        }
  //      console.log(time);

        var posicion=spline.getPointAt(t);
        that.position.copy(posicion);
        var tangente=spline.getTangentAt(t);
        posicion.add(tangente);
        that.lookAt(that.position);
    } )
    .onComplete( function () {
      that.position.set(0,0,0);
      console.log("*COMPLETADA Animacion Izquierda*\n\n");

    })



    this.animacion.chain(this.otraAnimacion);
    this.otraAnimacion.chain(this.animacion);
    this.animacion.start();
  }

  update () {
  //  this.time=Date.now();

    TWEEN.update();
  }
}
