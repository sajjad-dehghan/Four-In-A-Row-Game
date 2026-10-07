import { emptyBoard, outcome, drop, replay, parseSave } from './engine.mjs';
const $=id=>document.getElementById(id), key='sajjad-four-in-a-row-v1';
const palette={red:'#ee967e',yellow:'#ebcb79',green:'#b5d899',blue:'#97c9e2'};
let moves=[], colors=['red','green'], position=0, board=emptyBoard();
try { const raw=localStorage.getItem(key); if(raw) { const saved=parseSave(raw); moves=saved.moves; colors=saved.colors; position=moves.length; board=replay(moves); } } catch { $('storage').textContent='Saved game unavailable. You can still play a new game.'; }
const columns=Array.from({length:8},(_,column)=>{
  const button=document.createElement('button'); button.textContent='↓'; button.type='button';
  button.setAttribute('aria-label',`Drop in column ${column+1}`); button.addEventListener('click',()=>play(column));
  $('columns').append(button); return button;
});
const slots=Array.from({length:64},()=>{const cell=document.createElement('div');cell.className='slot';$('board').append(cell);return cell;});
function save() { try { localStorage.setItem(key,JSON.stringify({version:1,moves,colors})); $('storage').textContent='Saved automatically on this browser. Come back anytime.'; } catch { $('storage').textContent='Browser storage unavailable. This game is not saved.'; } }
function render() {
  board=replay(moves,position); const result=outcome(board), live=position===moves.length, turn=position%2+1;
  slots.forEach((cell,i)=>{
    const r=Math.floor(i/8),c=i%8,player=board[r][c];
    cell.classList.toggle('filled',Boolean(player)); cell.classList.toggle('winning',result.line.some(([y,x])=>y===r&&x===c));
    cell.style.setProperty('--piece',player?palette[colors[player-1]]:'transparent');
    cell.textContent=''; if(player) {const label=document.createElement('span');label.textContent=player;cell.append(label);}
  });
  $('board').setAttribute('aria-label',`8 by 8 board, move ${position}. Rows top to bottom: ${board.map(row=>row.map(p=>p||'empty').join(', ')).join('; ')}`);
  columns.forEach((button,c)=>{button.disabled=Boolean(!live||result.winner||board[0][c]);});
  for(const player of [1,2]) {
    const card=$(`player${player}`); card.classList.toggle('active',live&&!result.winner&&turn===player);
    card.querySelector('.disc').style.setProperty('--piece',palette[colors[player-1]]);
    $(`count${player}`).textContent=`${board.flat().filter(p=>p===player).length} PIECES`;
    $(`color${player}`).value=colors[player-1]; $(`color${player}`).disabled=moves.length>0;
  }
  $('status').textContent=!live?`Replay · move ${position} of ${moves.length}`:result.winner==='draw'?'All square. A well-played draw.':result.winner?`Player ${result.winner===1?'one':'two'} connects four!`:`Player ${turn===1?'one':'two'}, pick a column.`;
  $('timeline').max=moves.length; $('timeline').value=position;
  $('back').disabled=position===0; $('continue').disabled=live;
  $('replay-label').textContent=`THE STORY SO FAR / ${position} OF ${moves.length} MOVES`;
}
function play(column) { if(position!==moves.length) return; const next=drop(board,column,moves.length%2+1);if(!next)return;moves.push(column);position=moves.length;save();render(); }
$('restart').addEventListener('click',()=>{moves=[];position=0;save();render();});
$('timeline').addEventListener('input',event=>{position=Number(event.target.value);render();});
$('back').addEventListener('click',()=>{position=Math.max(0,position-1);render();});
$('continue').addEventListener('click',()=>{position=moves.length;render();});
for(const player of [1,2]) $(`color${player}`).addEventListener('change',event=>{
  if(moves.length) return;
  const other=player===1?1:0,old=colors[player-1]; colors[player-1]=event.target.value;
  if(colors[other]===colors[player-1]) colors[other]=old;
  save();render();
});
render();
