// Browser edition of the original C game's 8x8, two-player rules.
export const size = 8;
export const emptyBoard = () => Array.from({length:size}, () => Array(size).fill(0));
export function outcome(board) {
  for (let r=0;r<size;r++) for(let c=0;c<size;c++) {
    const player=board[r][c]; if(!player) continue;
    for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]) {
      const line=Array.from({length:4},(_,i)=>[r+dr*i,c+dc*i]);
      if(line.every(([y,x])=>y>=0&&y<size&&x>=0&&x<size&&board[y][x]===player)) return {winner:player,line};
    }
  }
  return {winner:board[0].every(Boolean)?'draw':null,line:[]};
}
export function drop(board,column,player) {
  if(!Number.isInteger(column)||column<0||column>=size||![1,2].includes(player)||board[0][column]||outcome(board).winner) return null;
  const next=board.map(row=>[...row]);
  for(let row=size-1;row>=0;row--) if(!next[row][column]) { next[row][column]=player; return next; }
  return null;
}
export function replay(moves, count=moves.length) {
  if(!Array.isArray(moves)||moves.length>64||!Number.isInteger(count)||count<0||count>moves.length) throw new Error('Invalid saved game');
  let board=emptyBoard();
  for(let i=0;i<count;i++) { const next=drop(board,moves[i],i%2+1); if(!next) throw new Error('Invalid saved move'); board=next; }
  return board;
}
export function parseSave(raw) {
  const value=JSON.parse(raw);
  if(value.version!==1||!Array.isArray(value.colors)||value.colors.length!==2||value.colors[0]===value.colors[1]||value.colors.some(color=>!['red','yellow','green','blue'].includes(color))) throw new Error('Invalid colors');
  replay(value.moves); return value;
}
