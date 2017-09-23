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
    createProgram(vertexShader,fragmentShader) {
        this.program = this.gl.createProgram()
        this.gl.attachShader(this.program,vertexShader)
        this.gl.attachShader(this.program,fragmentShader)
        this.gl.linkProgram(this.program)
    }
    init(points,coordinateSystem) {
        this.count = this.points/coordinateSystem
        this.size = coordinateSystem
        const vertexShader = ShaderUtil.createShader(this.gl,this.gl.VERTEX_SHADER,coordinateSystem)
        const fragmentShader = ShaderUtil.createShader(this.gl,this.gl.FRAGMENT_SHADER,coordinateSystem)
        this.createProgram(vertexShader,fragmentShader)
        this.pointerBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,pointerBuffer)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,new Float32Array(pointerBuffer))
        this.count = coordinateSystem
        this.postionAttribLocation = this.gl.getAttributeLocation(this.program,'a_position')
    }
}
