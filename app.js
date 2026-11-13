// =========================================================
// GALERÍA DE FOTOS Y FRASES PERSONALIZADAS
// =========================================================
const galeria = [
  {
    imagen: "foto1.jpg",
    frase: "«Sé que estas semanas han sido pesadas y estuviste ajetreada con tus prácticas, así que te mereces una pausa. Para el mundo hoy es Viernes 13; para mí es la excusa perfecta para recordarte lo increíble que eres y sacarte una sonrisa en medio de la semana. ✨»"
  },
  {
    imagen: "foto2.jpg",
    frase: "«Si cruzarse con un gato negro da mala suerte, cruzarse contigo definitivamente rompe cualquier superstición y lo convierte en el mejor día. Un respiro bien merecido. 🐈‍⬛💛»"
  },
  {
    imagen: "foto3.jpg",
    frase: "«Que tengas un viernes genial, ligero y lleno de buena vibra. ¡Te mereces lo mejor siempre! Te dejo estos tulipanes virtuales para alegrar tu día. 🌷✨»"
  }
];

let indiceFoto = 0;

// Referencias del DOM
const pantallaInicio = document.getElementById('pantallaInicio');
const pantallaSorpresa = document.getElementById('pantallaSorpresa');
const audio = document.getElementById('cancionViernes13');
const btnPausaPlay = document.getElementById('btnPausaPlay');
const ecualizador = document.getElementById('ecualizador');
const imagenActual = document.getElementById('imagenActual');
const fraseFoto = document.getElementById('fraseFoto');
const contadorFotos = document.getElementById('contadorFotos');

// 1. Activar música, confeti y mostrar tarjeta
function activarSuerte() {
  pantallaInicio.style.display = 'none';
  pantallaSorpresa.style.display = 'block';

  audio.volume = 0.6;
  audio.play().catch(err => {
    console.log("El navegador bloqueó el audio automático:", err);
  });

  confetti({
    particleCount: 120,
    spread: 75,
    colors: ['#fbbf24', '#f472b6', '#c084fc', '#ffffff'],
    origin: { y: 0.6 }
  });
}

// 2. Pausar o reanudar canción
function alternarMusica() {
  if (audio.paused) {
    audio.play();
    btnPausaPlay.textContent = '⏸️';
    ecualizador.style.opacity = '1';
  } else {
    audio.pause();
    btnPausaPlay.textContent = '▶️';
    ecualizador.style.opacity = '0.3';
  }
}

// 3. Cambiar entre fotos
function cambiarFoto(direccion) {
  indiceFoto += direccion;

  if (indiceFoto < 0) {
    indiceFoto = galeria.length - 1;
  } else if (indiceFoto >= galeria.length) {
    indiceFoto = 0;
  }

  imagenActual.style.opacity = '0';
  setTimeout(() => {
    imagenActual.src = galeria[indiceFoto].imagen;
    fraseFoto.textContent = galeria[indiceFoto].frase;
    contadorFotos.textContent = `Foto ${indiceFoto + 1} de ${galeria.length}`;
    imagenActual.style.opacity = '1';
  }, 180);
}

// 4. Partículas doradas flotando en el fondo
const canvas = document.getElementById('canvas-suerte');
const ctx = canvas.getContext('2d');

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

class ChispaDorada {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radio = Math.random() * 2 + 0.5;
    this.vy = -(Math.random() * 0.6 + 0.2);
    this.alfa = Math.random() * 0.7 + 0.2;
    this.color = Math.random() > 0.3 ? '#fbbf24' : '#f472b6';
  }
  actualizar() {
    this.y += this.vy;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }
  dibujar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.globalAlpha = this.alfa;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

const chispas = Array.from({ length: 45 }, () => new ChispaDorada());

// 5. Generador de tulipanes flotantes
function crearTulipan() {
  const tulipan = document.createElement('img');
  tulipan.src = 'tulipanes.png';
  tulipan.className = 'tulipan-flotante';

  tulipan.style.left = `${Math.random() * 85}vw`;
  const duracion = Math.random() * 10 + 15;
  tulipan.style.animationDuration = `${duracion}s, ${Math.random() * 2 + 3}s`;

  const escala = Math.random() * 0.3 + 0.7;
  tulipan.style.transform = `scale(${escala})`;

  document.body.appendChild(tulipan);

  setTimeout(() => {
    tulipan.remove();
  }, duracion * 1000);
}

setInterval(crearTulipan, 4500);

function animarFondo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  chispas.forEach(c => {
    c.actualizar();
    c.dibujar();
  });
  requestAnimationFrame(animarFondo);
}
animarFondo();