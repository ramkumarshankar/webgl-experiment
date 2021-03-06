var shell = require('gl-now')()
var createShader = require('gl-shader')
var glslify = require('glslify')
var shader, buffer

var vertShader = glslify('./vert.glsl')
var fragShader = glslify('./frag.glsl')

var canvas = document.getElementsByTagName("canvas")[0];


shell.on('gl-init', function() {
  var gl = shell.gl
 
  //Create shader 
  shader = createShader(gl, vertShader, fragShader)
 
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