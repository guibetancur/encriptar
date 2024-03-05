// var claves = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"],[" ","spc"]]
var claves  = obtenerCifradoPorId(1)

let btn1=document.getElementById('encryptBtn')
let img1=document.querySelector('.textarea-background1')
let caption1= document.getElementById('caption1')
let img2=document.querySelector('.textarea-background2')

let btn2=document.getElementById('decryptBtn')
let caption2= document.getElementById('caption2')
let copy1= document.getElementById('copy1')
let copy2= document.getElementById('copy2')

function processText() {
  const text = document.getElementById('text').value
  // .toLowerCase();
  result = encryptText(text);
  document.getElementById('result').value = result;
}

function encryptText(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += encryptCharacter(text[i]);
  }
  document.getElementById('text').value = '';
  btn1.disabled=true
  btn2.disabled=false
  img1.classList.remove('hide-background');
  caption1.classList.remove('hide-background')
  img2.classList.add('hide-background');
  caption2.classList.add('hide-background')
  copy1.disabled=true
  copy2.disabled=false
  return result;
}

function encryptCharacter(char) {
  for (let par of claves) {
    if (char === par[0]) {
      return par[1]
    }
  }
  return char
}

function decryptText() {
  let text = document.getElementById('result').value
  // .toLowerCase();
  for (let index = 0; index < claves.length; index++) {
    text = text.replaceAll(claves[index][1], claves[index][0])
  }
  document.getElementById('text').value = text;
  document.getElementById('result').value = ''
  btn1.disabled=false
  btn2.disabled=true
  img1.classList.add('hide-background');
  caption1.classList.add('hide-background')
  img2.classList.remove('hide-background');
  caption2.classList.remove('hide-background')
  copy1.disabled=false
  copy2.disabled=true
}

function copyToClipboard(nro) {
  let resultTextarea
  if (nro === 1) {
    resultTextarea = document.getElementById('text');
  } else {
    resultTextarea = document.getElementById('result');
  }
  resultTextarea.select();
  document.execCommand('copy');
  alert('Texto copiado al portapapeles');
}

document.addEventListener('DOMContentLoaded', function() {
  // Obtén el textarea y la imagen de fondo
  var textarea1 = document.querySelector('.custom-textarea1');
  var textarea2 = document.querySelector('.custom-textarea2');
  var background1 = document.querySelector('.textarea-background1');
  var background2 = document.querySelector('.textarea-background2');

  // Escucha el evento 'input' en el textarea1
  textarea1.addEventListener('input', function() {
    // Si el textarea tiene contenido, agrega la clase de ocultar, de lo contrario, quítala
    if (textarea1.value.length > 0) {
      background1.classList.add('hide-background');
      caption1.classList.add('hide-background');
      btn1.disabled=false
      copy1.disabled=false
    } else {
      background1.classList.remove('hide-background');
      caption1.classList.remove('hide-background');
      btn1.disabled=true
      copy1.disabled=true
    }
  });
  // Escucha el evento 'input' en el textarea2
  textarea2.addEventListener('input', function() {
    // Si el textarea tiene contenido, agrega la clase de ocultar, de lo contrario, quítala
    if (textarea2.value.length > 0) {
      background2.classList.add('hide-background');
      caption2.classList.add('hide-background')
      btn2.disabled = false
      copy2.disabled=false
    } else {
      background2.classList.remove('hide-background');
      caption2.classList.remove('hide-background')
      copy2.disabled=true
    }
  });
});
// Función para obtener el valor de "cifrado" según el ID seleccionado
function obtenerCifradoPorId(idSeleccionado) {
  idSeleccionado=parseInt(idSeleccionado)

  const jsonContent =
    `[
      {"id":1,"name":"alura","cifrado":[["a","ai"],["e","enter"],["i","imes"],["o","ober"],["u","ufat"]]},
      {"id":2,"name":"guillermo","cifrado":[["a","ai"],["e","enter"],["i","imes"],["o","ober"],["u","ufat"],["A","AI"],["E","ENTER"],["I","IMES"],[" ","ªº"]]},
      {"id":3,"name":"simbolos","cifrado":[["a","*/"],["e","**"],["i","!@"],["o","#~"],["u","&/"],["A","=)"],["E","(/"],["I","&%"],["O","$·"],["U","!?"],[" ","çÇ"]]}
    ]`;
    const cifrados = JSON.parse(jsonContent);
    // Busca el objeto con el ID seleccionado
    const cifradoEncontrado = cifrados.find(cifrado => cifrado.id === idSeleccionado);
    claves = cifradoEncontrado.cifrado
    return claves
}
