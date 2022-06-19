"use strict";

(() => {
  const lang = ["камень", "ножницы", "бумага"];
  const evenOrOdd = ["четный", "нечетный"];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const findAnswer = (arr, n) => {
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].indexOf(n) == 0) {
        return arr[i];
      }
    }
    return false;
  };

  const game = () => {
    let res = 0;
    const result = {
      player: 5,
      computer: 5,
    };

    const computerChoise = lang[getRandomIntInclusive(0, 2)];
    console.log(`Компьютер:`, computerChoise);

    const answer = prompt(`Выбери: "${lang.join('", "')}" ?`);

    if (answer === null) {
      return;
    }

    const userChoise = findAnswer(lang, answer.toLowerCase());

    if (answer && userChoise) {
      console.log(`Вы:`, userChoise);
      if (userChoise === computerChoise) {
        alert(`Компьютер: ${computerChoise}
Вы: ${userChoise}

Ничья!`);
        return game();
      } else if (
        (computerChoise === lang[0] && userChoise === lang[2]) ||
        (computerChoise === lang[1] && userChoise === lang[0]) ||
        (computerChoise === lang[2] && userChoise === lang[1])
      ) {
        alert(`Компьютер: ${computerChoise}.
Вы: ${userChoise}.

Вы ходите!`);
        console.log(result.player);
        res = "player";
      } else if (
        (computerChoise === lang[0] && userChoise === lang[1]) ||
        (computerChoise === lang[1] && userChoise === lang[2]) ||
        (computerChoise === lang[2] && userChoise === lang[0])
      ) {
        alert(`Компьютер: ${computerChoise}.
Вы: ${userChoise}.

Компьютер ходит!`);
        res = "computer";
      }
    } else {
      return game();
    }

    return function start() {
      const isNumber = (n) =>
        !isNaN(parseFloat(n)) && isFinite(n) && n <= result.player && n > 0;

      if (result.player <= 0 || result.computer <= 0) {
        alert(`Игра закончилась!
У Вас: ${result.player}
У компьютера: ${result.computer}`);
        return;
      }

      // Игрок загадывает число
      if (res === "player") {
        let userChoise;
        const computerChoise = Math.floor(1 + Math.random() * 2);
        console.log(`Компьютер выбирает четность:`, computerChoise);

        while (!isNumber(userChoise)) {
          userChoise = prompt(
            `Сколько шариков из ${result.player} Вы хотите разыграть?`
          );
          if (userChoise === null) {
            alert("Игра окончена!");
            return;
          }
        }
        if (
          (userChoise % 2 === 0 && computerChoise === 2) ||
          (!(userChoise % 2 === 0) && computerChoise === 1)
        ) {
          if ((result.player - +userChoise) < 0) {result.player = 0} else {result.player -= +userChoise};
          if ((result.computer + +userChoise) > 10) {result.computer = 10} else {result.computer += +userChoise};
          /* result.player -= +userChoise;
          result.computer += +userChoise;*/
          alert(`Вы проиграли! У Вас осталось ${result.player} шариков`);
        } else {
          if ((result.computer - +userChoise) < 0) {result.computer = 0} else {result.computer -= +userChoise};
          if ((result.player + +userChoise) > 10) {result.player = 10} else {result.player += +userChoise;};
         /* result.player += +userChoise;
          result.computer -= +userChoise;*/
          alert(`Вы выйграли! У Вас ${result.player} шариков`);
        }
        console.log(`Шарики игрока: ${result.player}`);
        console.log(`Шарики компьютера: ${result.computer}`);
        res = "computer";

        // Компьютер загадывает число
      } else {
        const computerChoise = Math.floor(1 + Math.random() * result.computer);
        console.log(`Компьютер загадывает число:`, computerChoise);

        const answer = prompt("Отгадайте: четное или нечетное?");

        if (answer === null) {
          alert("Игра окончена!");
          return;
        }

        const userChoise = findAnswer(evenOrOdd, answer.toLowerCase());

        if (answer && userChoise) {
          if (
            (computerChoise % 2 === 0 && userChoise === evenOrOdd[0]) ||
            (!(computerChoise % 2 === 0) && userChoise === evenOrOdd[1])
          ) {
            if ((result.computer - computerChoise) < 0) {result.computer = 0} else {result.computer -= +computerChoise};
            if ((result.player + computerChoise) > 10) {result.player = 10} else {result.player += +computerChoise};
            /* result.player += computerChoise;
              result.computer -= computerChoise;*/
              alert(`Вы выйграли! У Вас ${result.player} шариков`);
            } else {
            if ((result.player - computerChoise) < 0) {result.player = 0} else {result.player -= +computerChoise};
            if ((result.computer + computerChoise) > 10) {result.computer = 10} else {result.computer += +computerChoise;};
            /* result.player -= computerChoise;
            result.computer += computerChoise;*/
            alert(`Вы проиграли! У Вас осталось ${result.player} шариков`);
          }
          console.log(`Шарики игрока: ${result.player}`);
          console.log(`Шарики компьютера: ${result.computer}`);
          res = "player";
        } else {
          res = "computer";
        }
      }

      return start();
    };
  };

  window.MRBLS = game;
})();
