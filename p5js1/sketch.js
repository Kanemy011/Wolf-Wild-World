//PR2 Garrido Calaforra Gemma Poster Interactivo
let img1, img2, img3;
let fuente;

//variable plumas rotacion, escala y color (variables para los randoms cada 3 segundos)
let rotar = 0;
let rotacionGrados;
let colorPlumas;
let escalaPlumas = 1;
var segundos = 0;

//Colores de nivle escenario
let nvl1 = 'rgb(180,180,180)';
let nvl2 = 'gray';
let nvl3 = 'black';

//listas posiciones y tamaños dinamicas y mensajes estáticas
let posiciones = [];
let tamanos = [];
let mensajes = [
  "Bienvenido a Haikyuu!!",
  "Disfruta del poster",
  "Kenma y Hinata",
  "¡No te lo pierdas!",
  "¿Listo para la acción?"
];

//variables texto mostrado aleatoriamente de la lista dinamica
let indiceMensaje = 0;
let mensajeMostrado = "";
var mensajeAlea;

//variable para calcular algunos tamaños de figuras segun la medida del cartel
let medida = 720 / 1280; 

//cargar imagenes
function preload() {
  img3 = loadImage('Fondo.jpg');
  img1 = loadImage('Kenma.png');
  img2 = loadImage('Hinata.png');
  fuente = loadFont('Komyca.ttf');
}

function setup() {
  // tamaño del canvas de acuerdo con las dimensiones de un poster
 let c = createCanvas(720,1280);
 c.parent('si');
  
  //Bucle para llenar posiciones y rotaciones aleatorias de las plumas, indicamos que repita 15 veces esto para crear unas 15 plumas que se utilizarán para los dos tipos de plumas (15+15 30 en total generadas)
  for (let i = 0; i < 15; i++) {
    posiciones.push({x: random(width), y: random(height), rot: random(-45.45)});
    actualizarTamanos(); // Llenar la lista de tamaños inicialmente
  }
  // Asignar un mensaje aleatorio al inicio en una variable e indicando que sea numero entero para evitar posibles fallos
  mensajeAlea = int(random(0, mensajes.length)); 
  mensajeMostrado = mensajes[mensajeAlea]; //mostrar mensaje aleatoro de la lista
}

function draw() {
  
  // Si han pasado aproximadamente 3 segundos (60 un segundo) en el contador segundos ejecutar actualizar posiciones de las plumas y reiniciar segundos
  
  segundos++;
  if (segundos >= 180) { 
    actualizarPosiciones();
    segundos = 0;
  }
  
  //Fondo Imagen
  image(img3, 0, -80, width, height);
  
  //Cuadrado transparente para teñir la imagen de fondo con tono azulado
  fill('rgba(173,227,230,0.43)');
  noStroke();
  rect(0, -30, width, height);
  
  patrol1(36,'#B31E1E44')
 
  //Marcos del fondo
  noFill();
  strokeWeight(60);
  stroke('black');
  rect(0,0,width,height+height/100);
  
  strokeWeight(15);
  stroke('#E67B1A');
  rect(35,35,width-72,height-32);
  
  //Imagenes principales protagonistas
  
    image(img1, 0, -50, width-90, (width*medida*2.8)-100);
    image(img2, 100, -50, width-90, width / medida/(medida*2)-100);
  
  //cuadro fondo del titulo grande para verlo mejor
  noStroke();
  fill('#E3FBFFAA')
  rect(width/9,height/13,width/1.35,height/13)
  
  //Borde para resaltar del titulo del nombre de la pelicula
  textFont(fuente);
  strokeWeight(10);
  stroke('#EC8223D8');
  textSize(140);
  textAlign(CENTER);
  text('HAIKYU!!',width/2,height/6.5);
  
  //Titulo de la pelicula con tipografia externa
  fill('black');
  noStroke();
  textSize(140);
  textAlign(CENTER);
  text('HAIKYU!!',width/2,height/6.5);
  
  //decoracion poster basurero
  decoracion()
  
  //Recuadro pie pagina
 
  stroke('rgb(0,0,0)');
  fill(nvl1);
  strokeWeight(30);
  rect(5,height-height/4.44,width-15,280);
  fill(nvl1);
  noStroke();
  rect(20,height-height/4.21,width-45,50);
  
  // Texto pie pagina tipografia local Roboto
  push()
  translate(0,-40);
  
    textFont('Roboto');
    textStyle('bold');
    textSize(65);
    textAlign(CENTER);
    stroke('#1E1E1E9E');
    strokeWeight(8);
  
  //sombreado
    textSize(85);
    fill('#575757');
    text('The',width/2,height/1.19);
    textSize(135);
    text('Dumpster',width/2,height/1.09);
    textSize(95);
    text('Battle',width/2,height);
  
  //texto
    textSize(85);
    stroke('#FDDFDF9E');
    fill('rgb(255,255,255)');
    text('The',width/2,height/1.2);
    textSize(135);
    fill('rgb(183,17,17)');
    text('Dumpster',width/2,height/1.1);
    textSize(95);
    fill('rgb(0,0,0)');
    text('Battle',width/2,height-10);
  pop()
  
  //texto aleatorio arriba del escenario
  textFont('Roboto');
  fill('black')
  textSize(22);
  textStyle('bold');
  text(mensajeMostrado,width/2,height/1.52)
  
  // Cambio de color de las plumas segun donde este puesto el raton en el canvas, si el caso uno es verdadero (raton mitad izq) color rojo, sino estado predeterminado negro
switch (true) {
  case (mouseX < width / 2):
    colorPlumas = 'rgb(191,34,34)';
    break;
    
  default:
    colorPlumas = 'black';
}

  //asignamos posiciones y rotaciones que se generaron aleatorioamente empezando por la primera posicion de las listas
  for (let i = 0; i < posiciones.length; i++) {
    pluma(posiciones[i].x, posiciones[i].y, tamanos[i], colorPlumas, posiciones[i].rot);
     pluma2(posiciones[i].x, posiciones[i].y, tamanos[i], colorPlumas, posiciones[i].rot);
  }
}

//Funcion para degradado de circulos estilo manga del fondo
function patrol1(diametre, color) {
  push();
  fill(color);
  angleMode(DEGREES);
  translate(0, height - height / 3.5);
  rotate(270); // Dar la vuelta a los círculos para que los pequeños estén arriba
  let reducir = 0.05; // Variable que aumenta para reducir los círculos con cada fila
  
  let i = 0;
  while (i <= width) {
    let j = 0;
    while (j <= height) {
      if (j / diametre % 2 == 0) {
        circle(i + reducir * 4, j, diametre - reducir); // Si par, círculo con espaciado normal
      } else {
        circle((i - diametre / 1.5) + reducir * 4, j, diametre - reducir); // Sino, círculo a la mitad con espaciados
      }
      reducir = reducir + 0.05;
      j = j + diametre;
    }
    i = i + diametre;
  }
  pop();
}

//pluma 1 dibujo, para esto use un pequeño codigo que cree para que la consola me dijera las coordenadas de mouseX e Y al ser clicado y luego cada coordenada la añadi manualmente. Esta funcion la dejare comentada al final del codigo
function pluma(x, y, escala, color, rotacionGrados) {
  push();
  translate(x, y);
  scale(escala);
  angleMode(DEGREES);
  rotate(rotacionGrados);
  stroke('rgb(104,104,104)');
  fill(color);
  strokeWeight(2);
  
  beginShape();
  curveVertex (116, 262);
  curveVertex (127, 235);
  curveVertex (170, 201);
  curveVertex (197, 185 );
  curveVertex (228, 178 );
  curveVertex (247, 172);
  curveVertex (247, 168 );
  curveVertex (250, 171);
  curveVertex (253, 168);
  curveVertex (255, 171);
  curveVertex (272, 171 );
  curveVertex (279, 171 );
  curveVertex (279, 175 );
  curveVertex (268, 175 );
  curveVertex (260, 175 );
  curveVertex (256, 175 );
  curveVertex (255, 182 );
  curveVertex (254, 181 );
  curveVertex (252, 181);
  curveVertex (249, 186 );
  curveVertex (246, 181 );
  curveVertex (238, 187 );
  curveVertex (229, 194 );
  curveVertex (213, 202);
  curveVertex (199, 212 );
  curveVertex (190, 221 );
  curveVertex (190, 214 );
  curveVertex (183, 222 );
  curveVertex (169, 230 );
  curveVertex (155, 238);
  curveVertex (144, 250 );
  curveVertex (137, 251 );
  curveVertex (136, 248);
  curveVertex (131, 252);
  curveVertex (126, 257);
  curveVertex (119, 259);
  curveVertex (120, 247);
  curveVertex (122, 237);
  curveVertex (118, 254 );
  curveVertex (118, 254);
  curveVertex (120, 243);
  curveVertex (125, 239);
  curveVertex (127, 235 );
  curveVertex (135, 229 );
  endShape();
  pop();
}

//pluma 2 para mas variacion
function pluma2(x, y, escala, color, rotacionGrados) {
  push();
  translate(x, y);
  scale(escala);
  angleMode(DEGREES);
  rotate(rotacionGrados);
  stroke('rgb(104,104,104)');
  fill(color);
  strokeWeight(2);
  
  beginShape();
  curveVertex (585, 138);
    curveVertex (584, 134);
    curveVertex (579, 137);
    curveVertex (579, 129);
    curveVertex (575, 132);
    curveVertex (569, 129);
    curveVertex (559, 123);
    curveVertex (551, 119);
    curveVertex (537, 115);
    curveVertex (519, 111);
    curveVertex (506, 115);
    curveVertex (498, 124);
    curveVertex (487, 131);
    curveVertex (477, 137);
    curveVertex (465, 143);
    curveVertex (461, 144);
    curveVertex (460, 143);
    curveVertex (460, 138);
    curveVertex (461, 144);
    curveVertex (460, 138);
    curveVertex (461, 144);
    curveVertex (460, 141);
    curveVertex (463, 137);
    curveVertex (465, 132);
    curveVertex (466, 128);
    curveVertex (471, 122);
    curveVertex (476, 116);
    curveVertex (489, 109);
    curveVertex (489, 109);
    curveVertex (502, 104);
    curveVertex (515, 100);
    curveVertex (529, 100);
    curveVertex (544, 103);
    curveVertex (562, 108);
    curveVertex (574, 114);
    curveVertex (581, 122);
    curveVertex (581, 116);
    curveVertex (583, 122);
    curveVertex (586, 119);
    curveVertex (586, 123);
    curveVertex (593, 122);
    curveVertex (589, 125);
    curveVertex (593, 127);
    curveVertex (589, 127);
    curveVertex (593, 127);
    curveVertex (589, 127);
    curveVertex (597, 139);
    curveVertex (602, 151);
    curveVertex (600, 150);
    curveVertex (588, 136);
    curveVertex (586, 132);
    curveVertex (585, 138);
   endShape();
  pop();
}

//decoracion inferior que representa basura/montañas de basura o terreno
function decoracion(){
push()
  translate(0,-65) //traslacion general
  
  //detras
  push();
    translate(0,-50); //traslacion del nivel 3
    rect(0,height/1.25,width,height/1.25);
    push();
      angleMode(DEGREES);
      rotate(-45)
      fill(nvl3);
      translate(-880,-108)
      square(75,height/1.4,300);
    pop();
  
    push();
      angleMode(DEGREES);
      rotate(45)
      fill(nvl3);
      translate(940,-620)
      square(75,height/1.4,300);
    pop();
  
    push();
      angleMode(DEGREES);
      rotate(35)
      fill(nvl3);
      translate(980,-380)
      square(80,height/1.8,300);
    pop();
  
    push();
      angleMode(DEGREES);
      rotate(-35)
      fill(nvl3);
      translate(-665,-65)
      square(0,height/1.6,200);
    pop();
  
    push();
      angleMode(DEGREES);
      rotate(-45)
      fill(nvl3);
      translate(-630,-220)
      square(0,height/1.1,200);
    pop();
  pop();
  
  //delante
  push()
  translate(0,20) //traslacion nivel2
    push();
      angleMode(DEGREES);
      rotate(-10)
      fill(nvl2);
      translate(-320,40)
      square(75,height/1.38,250);
    pop()
  
    push();
      angleMode(DEGREES);
      rotate(10)
      fill(nvl2);
      translate(680,-50)
      square(0,height/1.42,250);
    pop()
  
     push();
      angleMode(DEGREES);
      rotate(10)
      fill(nvl2);
      translate(330,-50)
      square(0,height/1.4,130);
    pop()
  
    push();
      angleMode(DEGREES);
      rotate(-10)
      fill(nvl2);
      translate(250,80)
      square(0,height/1.4,130);
    pop()
  
    push();
      angleMode(DEGREES);
      rotate(3)
      fill(nvl2);
      translate(679,15)
      square(0,height/1.43,100);
    pop()
  
    push();
      angleMode(DEGREES);
      rotate(-3)
      fill(nvl2);
      translate(-65,50)
      square(0,height/1.45,100);
    pop()
  
    fill(nvl2);
    rect(width/4,height/1.32,width/2,height/1.4);
  pop()
  
  //frente 
  fill(nvl1);
  square(width/3.2,height/1.28,150);
  fill(nvl1);
  square(width/2.2,height/1.26,150);
  
  fill(nvl1);
  rect(width/1.597,height/1.23, width/2.95,height/1.20);
  fill(nvl1);
  rect(width/35.1,height/1.23,width/3,height/1.20);
  
pop()
}

//funcion para eliminar las posiciones y rotaciones random y añadir unas nuevas, usada en setup luego de cumplirse haber pasado 3 segundos. 
function actualizarPosiciones() {
  //cambiar a listas vacias 
  posiciones = [];
  tamanos = []; 
  //asignar nuevas variables a las listas
  for (let i = 0; i < 15; i++) {
    let nuevaRotacion = random(-45, 180);
    posiciones.push({x: random(width), y: random(height), rot: nuevaRotacion});
    actualizarTamanos(); //tamaños plumas aleatorios
  }
}

//tamaños de las plumas aleatorias entre unos valores determinados
function actualizarTamanos() {
  tamanos.push(random(0.2, 0.9)); // Escala aleatoria entre 0.2 y 1
}

//funciones usadas para dibujar las plumas

//let llistaPosX = [];
//let llistaPosY = [];

//function mousePressed(){
  //llistaPosX.push(mouseX);
  //llistaPosY.push(mouseY);
//}

//puntero para ver mejor en donde dibujas
//function puntero(){
  //stroke('white');
   //strokeWeight(1);
  //line(mouseX-10,mouseY,mouseX+10,mouseY);
  //line(mouseX,mouseY-10,mouseX,mouseY+10);
//}