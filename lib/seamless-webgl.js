class Stage {
    constructor(w,h) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = w
        this.canvas.height = h
        this.gl = this.canvas.getContext('webgl')
    }
    createProgram() {

    }
    init(points,coordinateSystem) {
        this.count = this.points/coordinateSystem
        this.size = coordinateSystem
    }
}
