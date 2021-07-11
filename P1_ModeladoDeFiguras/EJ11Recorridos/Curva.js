
class CURVA extends THREE.Line {
  constructor() {
    super();

    this.spline =new THREE.CatmullRomCurve3([new  THREE.Vector3(0,0,0),new  THREE.Vector3(5,5,-3),new  THREE.Vector3(8,0,0),new  THREE.Vector3(5,-5,3),new  THREE.Vector3(0,0,2),new  THREE.Vector3(-5,5,3),new  THREE.Vector3(-8,0,0),new  THREE.Vector3(-5,-5,-3),new  THREE.Vector3(0,0,0)]);

    var geometryLine=new THREE.Geometry();
    geometryLine.vertices = this.spline.getPoints(100);
    this.material = new THREE.LineBasicMaterial({color:0xff0000});
    var visibleSpline = new THREE.Line (geometryLine, this.material);
    this.add(visibleSpline);
  }

  createGUI (gui) {

  }


  update () {
  }

  getCurve(){
      return this.spline;
  }
}
