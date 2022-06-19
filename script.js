'use strict';


let startGame = window.MRBLS();
if (startGame) startGame();

do {
  if (confirm('Ещё поиграем?')) {
    startGame = window.MRBLS();

    if (startGame) startGame();
  } else break;
} while (true);
