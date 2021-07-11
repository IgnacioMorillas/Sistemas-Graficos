
class PELOTASALTARINA extends THREE.Object3D {
  constructor(anchuraCilindro, alturaCilindro) {
    super();
    var geometry =  new THREE.SphereGeometry( 0.5, 48, 32 );
    this.material = new THREE.MeshNormalMaterial();

    this.cilindro = new THREE.Mesh (geometry, this.material );
    this.cilindro.position.x=anchuraCilindro;

    this.add(this.cilindro);

    this.origen = { y: 0 } ;
    this.destino= { y: alturaCilindro } ;
    var that= this;
    this.animacion= new TWEEN.Tween(that.origen)
    .to(that.destino, 750 )
    .easing( TWEEN.Easing.Sinusoidal.Out)
    .onUpdate( function ( ) {
        if(that.position.y > alturaCilindro)
            that.position.y=alturaCilindro;
        else
            that.position.y+=0.1;

    } )

    this.otraAnimacion= new TWEEN.Tween(that.destino)
    .to(that.origen, 750 )
    .easing( TWEEN.Easing.Sinusoidal.Out)
    .onUpdate( function ( ) {
        if(that.position.y < 0)
            that.position.y=0;
        else
            that.position.y-=0.1;
    } )

    this.animacion.chain(this.otraAnimacion);
    this.otraAnimacion.chain(this.animacion);
    this.animacion.start();
  }

  update (anchuraCilindro) {
    this.cilindro.position.x=(anchuraCilindro);
    this.rotation.y+=(Math.PI/4)*0.01*2.5;

    TWEEN.update();
  }
}
