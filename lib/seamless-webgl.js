class ShaderUtil {
    static getVertexShaderCode(coordinates) {
        return `attribute vec4 a_position;
void main(){
    gl_Position = a_position;
}`
    }
    static getFragmentShaderCode() {
        return `precision mediump float;
uniform vec4 u_color;
void main(){
    gl_FragColor = vec4(1,0,0,1);
}`
    }
    static createShader(gl,type,n) {
        var source = ShaderUtil.getFragmentShaderCode(),shader = gl.createShader(type);
        if(type == gl.VERTEX_SHADER && n) {
            source = ShaderUtil.getVertexShaderCode(n)
        }
        console.log(source)
        gl.shaderSource(shader,source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        }
        return shader
    }
}
class Stage {
    constructor(w,h) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = w
        this.canvas.height = h
        this.gl = this.canvas.getContext('webgl')
        document.body.appendChild(this.canvas)
    }
    createProgram(vertexShader,fragmentShader) {
        const program = this.gl.createProgram()
        this.gl.attachShader(program,vertexShader)
        this.gl.attachShader(program,fragmentShader)
        this.gl.linkProgram(program)
        var success = this.gl.getProgramParameter(program,this.gl.LINK_STATUS)
        if(success) {
            console.log("program linked")
            return program
        }
        console.log(this.gl.getProgramInfoLog(program))
    }
    init(points,coordinateSystem) {
        this.count = points.length/coordinateSystem
        this.size = coordinateSystem
        const vertexShader = ShaderUtil.createShader(this.gl,this.gl.VERTEX_SHADER,coordinateSystem)
        const fragmentShader = ShaderUtil.createShader(this.gl,this.gl.FRAGMENT_SHADER,coordinateSystem)
        this.program = this.createProgram(vertexShader,fragmentShader)
        this.pointerBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.pointerBuffer)
        console.log(new Float32Array(points))
        this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(points),this.gl.STATIC_DRAW)
        console.log(this.gl.ARRAY_BUFFER)
        this.postionAttribLocation = this.gl.getAttribLocation(this.program,'a_position')
        this.colorUniformLocation = this.gl.getUniformLocation(this.program,'u_color')
    }
    render(color) {
        this.gl.clearColor(0,0,1,1)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        console.log(this.pointerBuffer)
        this.gl.useProgram(this.program)
        this.gl.enableVertexAttribArray(this.postionAttribLocation)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.pointerBuffer)
        this.gl.vertexAttribPointer(this.postionAttribLocation,this.size,this.gl.FLOAT,false,0,0)
        this.gl.uniform4f(this.colorUniformLocation,color[0],color[1],color[2],1)
        console.log(this.count)
        this.gl.drawArrays(this.gl.TRIANGLES,0,this.count)
    }
}
