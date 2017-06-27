var shell = require('gl-now')()
var glShader = require('gl-shader')
var glslify = require('glslify')
var fit = require('canvas-fit')

var shader
var bRun = true

shell.on('gl-init', function() {
  var gl = shell.gl

  shader = glShader(gl,
    glslify('./shaders/vert.glsl'),
    glslify('./shaders/frag.glsl')
  )
 
  // Create vertex buffer 
  buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, 0, 0,
    0, -1, 0,
    1, 1, 0
  ]), gl.STATIC_DRAW)
})
 
shell.on('gl-render', function(t) {
    if (!bRun) {
        return;
    }
    var gl = shell.gl
 
    //Bind shader 
    shader.bind()
    
    //Set attributes 
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    shader.attributes.position.pointer()
    
    //Set uniforms 
    shader.uniforms.t += 0.01
    
    //Draw 
    gl.drawArrays(gl.TRIANGLES, 0, 3)
})

shell.on('gl-resize', function(width, height) {
    console.log('resize')
    // Resize the canvas to fit the screen
    fit(shell.canvas)
})

