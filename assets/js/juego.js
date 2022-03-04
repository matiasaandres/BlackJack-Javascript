(() => {
  "use strict";

  /**
   * Cartas
   * 2c = Two  of Clubs
   * 2d = Two  of diamond
   * 2h = Two  of Hearts
   * 2s = Two  of spades
   */

  // referencias de HTML

  const btnPedir = document.querySelector("#btnPedir"), // #btnPedir  --> id='btnPedir'
        btnNuevoJuego = document.querySelector("#btnNuevoJuego"),
        btnDetener = document.querySelector("#btnDetener");

  const divCartasJugadores = document.querySelectorAll('.divCartas');

  let puntosHtml = document.querySelectorAll("small");

  // datos de cartas

  let deck = [];
  const tiposCartas = ["C", "D", "H", "S"],
        cartasEspeciales = ["A", "J", "Q", "K"];

  // puntos jugadores

 let puntosJugadores =[];

  // Está función inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {

   deck =  crearDeck();
   puntosJugadores=[];

   for(let i = 0; i< numJugadores; i++){
     puntosJugadores.push(0);
   }
   
   puntosHtml.forEach(elem => elem.innerText=0);
   divCartasJugadores.forEach(elem => elem.innerHTML ='');

  btnPedir.disabled = false;
  btnDetener.disabled = false;

  };


  // esta función crea una nueva baraja.
  const crearDeck = () => {
    deck = [];

    for (let i = 0; i < tiposCartas.length; i++) {
      for (let j = 2; j <= 10; j++) {
        deck.push(`${j}${tiposCartas[i]}`);
      }
    }

    for (let i = 0; i < tiposCartas.length; i++) {
      for (let j = 0; j < cartasEspeciales.length; j++) {
        deck.push(`${cartasEspeciales[j]}${tiposCartas[i]}`);
      }
    }

    // Barajeamos el DECK
    return _.shuffle(deck); // libraria underscore  metodo shuffle()  ordena aleatoriamente el []
    
  };

  // Esta función me permite tomar una carta.
  const perdirCarta = () => {
    if (deck.length === 0) {
      throw "No hay más cartas en el deck";
    }
    
    return deck.pop();

  };

  // Está función permite obtener el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // Turno : 0 = primer jugador y el último será ña computadora
  const acumuladorPuntos = (carta, turno)=>{

     puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
      puntosHtml[turno].innerText = puntosJugadores[turno];

      return puntosJugadores[turno];

  };


  const crearCarta = (carta, turno) =>{

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList = "carta";
    divCartasJugadores[turno].append(imgCarta);
  }

const determinarGanador = () => {

  const [puntosMinimos, puntosComputadora] =  puntosJugadores;

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana: (");
    } else if (puntosMinimos > 21) {
      alert("Computadora Gana!");
    } else if (puntosComputadora > 21) {
      alert("Ganaste!");
    } else {
      alert("Computadora Gana!");
    }
  }, 40);

}

  // Turno de la  computadora

  const turnoComputadora = (puntosMinimos) => {
    btnDetener.disabled = true;

    let puntosComputadora =0;
    
    do {
      const carta = perdirCarta();
      
      puntosComputadora = acumuladorPuntos(carta,puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length -1);    
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
 
    determinarGanador();
 
 
  };
  // eventos

  btnPedir.addEventListener("click", () => {
    const carta = perdirCarta();

    const puntosJugador = acumuladorPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21 Genial!");
      turnoComputadora(puntosJugador);
    }
  });

  // btnDetener

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  // btnNuevoJuego

  btnNuevoJuego.addEventListener("click", () => {
    
    inicializarJuego();

  });
})(); // (()=>{code})  patrón modulo permite encapsular el código para tener una mayor protección de nuestro código.
