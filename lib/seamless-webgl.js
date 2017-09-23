class ShaderUtil {
    static getVertexShaderCode(coordinates) {
        return `attribute vec4 a_position;
                void main(){
                    gl_position = a_position;
                }`
    }
    static getFragmentShaderCode() {
        return `uniform vec4 u_color;
                void main(){
                    gl_FragColor = u_color;
                }`
    }
    static createShader(gl,type,n) {
        var source = getFragmentShaderCode(),shader = gl.createShader(type);
        if(type == gl.VERTEX_SHADER && n) {
            source = getVertextShaderCode(n)
        }
        gl.shaderSource(shader,source)
        gl.compileShader(shader)
    }
}
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
        const vertexShader = ShaderUtil.createShader(this.gl,this.gl.VERTEX_SHADER,coordinateSystem)
        const fragmentShader = ShaderUtil.createShader(this.gl,this.gl.FRAGMENT_SHADER,coordinateSystem)
    }
}
