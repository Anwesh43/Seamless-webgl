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
        this.postionAttribLocation = this.gl.getAttributeLocation(this.program,'a_position')
        this.colorUniformLocation = this.gl.getUniformLocation(this.program,'u_color')
    }
    render(color) {
        this.gl.viewport(0,0,this.canvas.width,this.canvas.height)
        this.gl.clearColor(0,0,0,1)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        this.gl.useProgram(this.program)
        this.gl.enableVertexAttribArray(this.postionAttribLocation)
        this.gl.vertexAttribPointer(this.postionAttribLocation,this.size,this.gl.FLOAT,false,0,0)
        this.gl.uniform4f(this.colorUniformLocation,color[0],color[1],color[2],1)
        this.gl.drawArrays(this.gl.TRIANGLES,0,this.count)
    }
}
