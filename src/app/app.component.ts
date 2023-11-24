import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // music = new Audio("assets/music.mp3");
  // audioTurn = new Audio("assets/ting.mp3");
  // gameover = new Audio("assets/gameover.mp3");
  turn = "X";
  player1 = 'player1';
  player2 = 'player2';
  player = 'player1';
  player1Win = 0
  player2Win = 0
  isgameover = false;
  startGame = false
  loading: boolean = false;
  boxes = new Array(9).fill(null);
  disabled = false
  getBoxClasses(index: number) {
    const classes = [];

    if (index % 3 === 0) {
      classes.push('bl-0');
    }

    if (index % 3 === 2) {
      classes.push('br-0');
    }

    if (index < 3) {
      classes.push('bt-0');
    }

    if (index > 5) {
      classes.push('bb-0');
    }
    if (this.disabled) {
      classes.push('disabled-element')
    } else {
      const indexToRemove = classes.findIndex(item => item === 'disabled-element')
      classes.slice(indexToRemove, 1)
    }
    return classes.join(' ');
  }
  // Function to change the turn
  changeTurn() {
    this.turn = this.turn === "X" ? "O" : "X";
  }
  play() {
    this.loading = true;
    setTimeout(() => {
      this.startGame = true;
      this.loading = false;
    }, 1000);
  }
  // Function to check for a win
  checkWin() {
    const boxtext = document.getElementsByClassName('boxtext') as HTMLCollectionOf<HTMLElement>;
    const box = document.getElementsByClassName('box') as HTMLCollectionOf<HTMLElement>;
    const wins = [
      [0, 1, 2, 5, 5, 0],
      [3, 4, 5, 5, 15, 0],
      [6, 7, 8, 5, 25, 0],
      [0, 3, 6, -5, 15, 90],
      [1, 4, 7, 5, 15, 90],
      [2, 5, 8, 15, 15, 90],
      [0, 4, 8, 5, 15, 45],
      [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e => {
      if (boxtext[e[0]].innerText === boxtext[e[1]].innerText && boxtext[e[2]].innerText === boxtext[e[1]].innerText && boxtext[e[0]].innerText !== "") {
        box[e[0]].style.backgroundColor = 'lightslategray'
        box[e[1]].style.backgroundColor = 'lightslategray'
        box[e[2]].style.backgroundColor = 'lightslategray'
        this.player = boxtext[e[0]].innerText == 'X' ? this.player1 : this.player2
        boxtext[e[0]].innerText == 'X' ? this.player1Win = this.player1Win + 1 : this.player2Win = this.player2Win + 1
        this.disabled = true;
        let info = document.querySelector('.info') as any
        if (info) {
          info.innerText = this.player + " Won";
        }
        this.isgameover = true;
      }
    });
  }

  // Game Logic
  onBoxClick(element: HTMLElement) {
    const boxtext = element.querySelector('.boxtext') as HTMLElement;
    if (boxtext.innerText === '') {
      boxtext.innerText = this.turn;
      boxtext.style.fontFamily = 'cursive';
      this.player = this.player == this.player1 ? this.player2 : this.player1
      this.changeTurn();
      // this.audioTurn.play();
      this.checkWin();
      if (!this.isgameover) {
        // (document.getElementsByClassName('info')[0] as any).innerText = "Turn for " + this.turn;
      }
    }
  }

  // Reset Game
  onResetClick() {
    this.disabled = false;
    const boxtexts = document.querySelectorAll('.boxtext') as NodeListOf<HTMLElement>;
    boxtexts.forEach(element => {
      element.innerText = "";
      element.style.backgroundColor = 'none'
    });
    this.turn = "X";
    this.isgameover = false;
    // (document.getElementsByClassName("info")[0] as any).innerText = "Turn for " + this.player;
    const box = document.querySelectorAll('.box') as NodeListOf<HTMLElement>;
    if (box) {
      box.forEach(element => {
        element.style.backgroundColor = 'white'
      });
    }
  }
  goToHome() {
    this.turn = "X";
    this.player1 = 'player1';
    this.player2 = 'player2';
    this.player = 'player1';
    this.player1Win = 0
    this.player2Win = 0
    this.isgameover = false;
    this.startGame = false
    this.loading = false;
    this.boxes = new Array(9).fill(null);
    this.disabled = false;
  }
}
