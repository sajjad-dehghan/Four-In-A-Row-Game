<!-- visual-showroom:start -->
<p align="center">
  <img src="docs/showroom/readme-banner.svg" alt="Four In A Row — repository cover" width="100%">
</p>

<p align="center">
  <strong>Four In A Row</strong><br>
  SMALL GAMES / REAL PLAY
</p>

<p align="center">
  <a href="https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/projects/four-in-a-row"><strong>Explore the showroom ↗</strong></a> ·
  <a href="https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/play/four-in-a-row/"><strong>Try the browser edition ↗</strong></a> ·
  <a href="#implementation--original-documentation">Setup &amp; implementation ↓</a>
</p>

Two-player Connect Four in the terminal, written in C, with colored pieces and saved games you can replay move by move.

## Visual tour

[![Actual new browser edition · original C game's 8×8 rules](docs/showroom/readme-view-1.jpg)](https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/projects/four-in-a-row)

<p align="center">
  <a href="https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/projects/four-in-a-row"><img src="docs/showroom/readme-view-2.jpg" alt="Original terminal menu" width="48%"></a>
  <a href="https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/projects/four-in-a-row"><img src="docs/showroom/readme-view-3.jpg" alt="Original terminal gameplay" width="48%"></a>
  <a href="https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/projects/four-in-a-row"><img src="docs/showroom/readme-view-4.jpg" alt="Another original terminal view" width="48%"></a>
</p>

1. Actual new browser edition · original C game's 8×8 rules
2. Original terminal menu
3. Original terminal gameplay
4. Another original terminal view

Real captures or owner-supplied images, not generated product mockups. Demo/local data and edition boundaries are documented below.

## Implementation & original documentation

The existing run instructions, architecture, limitations and credits are preserved below.

---
<!-- visual-showroom:end -->

# Four-In-A-Row

## Browser replay gallery

![Move-by-move replay of an actual saved game](docs/showroom/four-replay.jpg)

Actual JavaScript browser edition, replaying the saved position without changing the live game. The original C terminal edition and binary saves are separate. [Showroom](https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/projects/four-in-a-row).

A two-player Connect Four game for the Windows terminal, written in C. It has colored pieces, and it saves each game to a binary file so you can replay it and keep playing later.

![Main menu](./photo/p3.jpg)

## New browser edition

A minimal browser frontend is included in `web/`. It keeps the C game's original **8 × 8 board**, two players, four selectable colors, gravity and four-in-a-row wins. The new browser edition automatically saves to localStorage and supports a move-by-move replay timeline with return to the live game. Saves are versioned JSON in this browser, not compatible with the terminal program's binary files. The original C source is unchanged; the browser logic is implemented separately in JavaScript.

[Play the browser edition](https://sajjad-dehghan-personal-site.prisoner-sedwna.workers.dev/play/four-in-a-row/)

![Actual browser gameplay captured on October 7, 2026](docs/showroom/browser-gameplay.jpg)

To run the frontend locally, install Python 3 if needed, then:

```bash
python -m http.server 8080 --directory web
```

Open `http://localhost:8080/`. Column buttons work with Tab and Enter/Space; use arrow keys on the replay slider. Original terminal screenshots and instructions remain below.

## Features

- **Two players on one keyboard** on an **8 x 8** board (columns `0` to `7`).
- **Pick your color:** each player chooses Red, Yellow, Green or Blue. Both players can't pick the same color.
- **Win detection:** four pieces in a row horizontally, vertically or diagonally wins. If all 64 cells fill up with no winner, the game is a draw.
- **Colored display** using ANSI escape codes.
- **Save and resume:**
  - Each move is written to `save.bin` as it is played.
  - When you quit with `-1`, or when the game ends, the moves and a move counter are written to `save2.bin`.
  - The **(S)ave** menu option replays the saved game one move at a time, then lets you keep playing from that position.
- **Save-file viewer:** the **(F)ile** option prints the save file as raw bits. Each line is a move: 3 bits for the player, 3 for the column and 3 for the color. The first line is a 7-bit move counter.
- **Built-in help screen.**

## Screenshots

| Game board | Game board |
| --- | --- |
| ![Game board](./photo/p1.jpg) | ![Game board](./photo/p2.jpg) |

## Requirements

- **Windows.** The game uses `conio.h` (`getch`) and `system("cls")`.
- A C compiler for Windows, such as GCC from MinGW-w64.
- A terminal that supports ANSI colors, such as Windows Terminal.

## Build and Run

```bash
git clone https://github.com/sedwna/Four-In-A-Row-Game.git
cd Four-In-A-Row-Game
gcc src/Four-In-A-Row-Game.c -o four-in-a-row.exe
./four-in-a-row.exe
```

The save files (`save.bin` and `save2.bin`) are created in the folder you run the game from.

## How to Play

In the main menu, type a letter and press Enter:

| Key | Action |
| --- | --- |
| `H` | Help |
| `P` | Start a new game |
| `S` | Replay and continue the last saved game |
| `F` | Print the save file as `0`/`1` bits |
| `E` | Exit |

During a game:

1. Each player picks a color.
2. Players take turns typing a column number from `0` to `7`. The piece drops to the lowest empty cell in that column. You can't choose a full column.
3. Type `-1` instead of a column number to save and quit. Typing `-1` at the color prompt quits without saving.
4. When someone connects four, the game prints `WIN USER '1'` or `WIN USER '2'`.

## Project Structure

```
Four-In-A-Row-Game/
├── src/
│   └── Four-In-A-Row-Game.c   # The whole game: menu, board, win checks, save/load
├── photo/                     # Screenshots
│   ├── p1.jpg
│   ├── p2.jpg
│   └── p3.jpg
└── README.md
```

## Tech Stack

- C (standard library, `conio.h`)
- ANSI escape codes for colors
- Binary file I/O for saving and replaying games

## Authors

- Sajad Dehqan
- MuhammadSaleh Qarehdaqi
