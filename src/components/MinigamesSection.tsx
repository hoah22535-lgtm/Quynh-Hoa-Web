import React, { useState } from 'react';
import { Gamepad2, Sparkles, Award, RotateCcw, Flower2, Star, Gem, Grid3X3, ArrowRight, Check } from 'lucide-react';
import { Inventory } from '../types';

interface MinigamesSectionProps {
  inventory: Inventory;
  onReward: (flowers: number, stars: number, diamonds: number) => void;
}

export const MinigamesSection: React.FC<MinigamesSectionProps> = ({
  inventory,
  onReward,
}) => {
  const [activeGameTab, setActiveGameTab] = useState<'o_an_quan' | 'caro' | 'co_vua'>('o_an_quan');
  const [toastReward, setToastReward] = useState<string | null>(null);

  // Standard reward rule: Win = +10 Flowers, +10 Stars, +10 Diamonds. Lose = no penalty.
  const showWinReward = (gameName: string) => {
    onReward(10, 10, 10);
    setToastReward(`Thắng ${gameName}! Tích lũy: +10 🌸 Hoa, +10 ⭐ Ngôi sao, +10 💎 Kim cương!`);
    setTimeout(() => {
      setToastReward(null);
    }, 4500);
  };

  // ==========================================
  // GAME 1: Ô ĂN QUAN (Dân gian)
  // ==========================================
  const [oAnQuanBoard, setOAnQuanBoard] = useState<number[]>([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  const [quanLeft, setQuanLeft] = useState(15);
  const [quanRight, setQuanRight] = useState(15);
  const [playerScore, setPlayerScore] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [oAnQuanWon, setOAnQuanWon] = useState(false);

  const resetOAnQuan = () => {
    setOAnQuanBoard([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
    setQuanLeft(15);
    setQuanRight(15);
    setPlayerScore(0);
    setSelectedSquare(null);
    setOAnQuanWon(false);
  };

  const handlePlayOAnQuan = (index: number, direction: 'left' | 'right') => {
    if (oAnQuanBoard[index] <= 0 || oAnQuanWon) return;

    let board = [...oAnQuanBoard];
    let hand = board[index];
    board[index] = 0;

    let curr = index;
    const total = 10;

    while (hand > 0) {
      curr = direction === 'right' ? (curr + 1) % total : (curr - 1 + total) % total;
      board[curr] += 1;
      hand -= 1;
    }

    // Capture check
    let nextIdx = direction === 'right' ? (curr + 1) % total : (curr - 1 + total) % total;
    let gained = 0;

    if (board[nextIdx] === 0) {
      let captureIdx = direction === 'right' ? (nextIdx + 1) % total : (nextIdx - 1 + total) % total;
      if (board[captureIdx] > 0) {
        gained += board[captureIdx];
        board[captureIdx] = 0;
      }
    }

    const newScore = playerScore + gained + 10;
    setOAnQuanBoard(board);
    setPlayerScore(newScore);

    // Win condition check (score >= 40 or empty board)
    if (newScore >= 40 && !oAnQuanWon) {
      setOAnQuanWon(true);
      showWinReward('trò chơi Ô Ăn Quan');
    }
  };

  // ==========================================
  // GAME 2: CỜ CARO (10x10 Grid vs AI Bot)
  // ==========================================
  const BOARD_SIZE = 10;
  const [caroGrid, setCaroGrid] = useState<Array<string | null>>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [caroTurn, setCaroTurn] = useState<'X' | 'O'>('X');
  const [caroWinner, setCaroWinner] = useState<string | null>(null);

  const resetCaro = () => {
    setCaroGrid(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setCaroTurn('X');
    setCaroWinner(null);
  };

  const checkCaroWin = (grid: Array<string | null>, idx: number, player: string): boolean => {
    const row = Math.floor(idx / BOARD_SIZE);
    const col = idx % BOARD_SIZE;

    const directions = [
      [0, 1],  // Horizontal
      [1, 0],  // Vertical
      [1, 1],  // Diagonal down-right
      [1, -1], // Diagonal down-left
    ];

    for (const [dr, dc] of directions) {
      let count = 1;

      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && grid[r * BOARD_SIZE + c] === player) {
        count++;
        r += dr;
        c += dc;
      }

      r = row - dr;
      c = col - dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && grid[r * BOARD_SIZE + c] === player) {
        count++;
        r -= dr;
        c -= dc;
      }

      if (count >= 5) return true;
    }
    return false;
  };

  const handleCaroClick = (idx: number) => {
    if (caroGrid[idx] || caroWinner || caroTurn !== 'X') return;

    const nextGrid = [...caroGrid];
    nextGrid[idx] = 'X';
    setCaroGrid(nextGrid);

    if (checkCaroWin(nextGrid, idx, 'X')) {
      setCaroWinner('Bạn đã thắng!');
      showWinReward('trò chơi Cờ Caro');
      return;
    }

    setCaroTurn('O');

    setTimeout(() => {
      const emptyIndices = nextGrid.map((val, i) => (val === null ? i : null)).filter((val) => val !== null) as number[];
      if (emptyIndices.length === 0) {
        setCaroWinner('Hòa cờ!');
        return;
      }

      const botChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      nextGrid[botChoice] = 'O';
      setCaroGrid(nextGrid);

      if (checkCaroWin(nextGrid, botChoice, 'O')) {
        setCaroWinner('Máy Bot đã thắng (Giữ nguyên vật phẩm, không bị trừ)');
      } else {
        setCaroTurn('X');
      }
    }, 400);
  };

  // ==========================================
  // GAME 3: CỜ VUA (Chess vs Bot)
  // ==========================================
  const INITIAL_CHESS = [
    '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
    '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',
  ];

  const WHITE_PIECES = new Set(['♔', '♕', '♖', '♗', '♘', '♙']);
  const BLACK_PIECES = new Set(['♚', '♛', '♜', '♝', '♞', '♟']);

  const [chessBoard, setChessBoard] = useState<Array<string | null>>(INITIAL_CHESS);
  const [selectedChessIdx, setSelectedChessIdx] = useState<number | null>(null);
  const [chessTurn, setChessTurn] = useState<'white' | 'black'>('white');
  const [chessWinner, setChessWinner] = useState<string | null>(null);
  const [capturedBlacks, setCapturedBlacks] = useState<string[]>([]);

  const resetChess = () => {
    setChessBoard(INITIAL_CHESS);
    setSelectedChessIdx(null);
    setChessTurn('white');
    setChessWinner(null);
    setCapturedBlacks([]);
  };

  const handleChessSquareClick = (idx: number) => {
    if (chessWinner || chessTurn !== 'white') return;

    const piece = chessBoard[idx];

    // Case 1: Select own white piece
    if (piece && WHITE_PIECES.has(piece)) {
      setSelectedChessIdx(idx);
      return;
    }

    // Case 2: Move selected piece to empty square or capture black piece
    if (selectedChessIdx !== null) {
      const fromIdx = selectedChessIdx;
      const movingPiece = chessBoard[fromIdx];
      if (!movingPiece) return;

      const newBoard = [...chessBoard];
      const targetPiece = newBoard[idx];

      newBoard[fromIdx] = null;
      newBoard[idx] = movingPiece;
      setChessBoard(newBoard);
      setSelectedChessIdx(null);

      const newCaptured = [...capturedBlacks];
      let won = false;

      if (targetPiece && BLACK_PIECES.has(targetPiece)) {
        newCaptured.push(targetPiece);
        setCapturedBlacks(newCaptured);

        if (targetPiece === '♚' || newCaptured.length >= 4) {
          won = true;
          setChessWinner('Bạn đã bắt được cờ Đen và Thắng Trận Cờ Vua!');
          showWinReward('trò chơi Cờ Vua');
        }
      }

      if (won) return;

      // Bot turn
      setChessTurn('black');
      setTimeout(() => {
        const blackIndices = newBoard
          .map((val, i) => (val && BLACK_PIECES.has(val) ? i : null))
          .filter((val) => val !== null) as number[];

        if (blackIndices.length === 0) {
          setChessWinner('Bạn đã ăn hết cờ Đen và Thắng Cờ Vua!');
          showWinReward('trò chơi Cờ Vua');
          return;
        }

        const botFrom = blackIndices[Math.floor(Math.random() * blackIndices.length)];
        const botPiece = newBoard[botFrom];

        const row = Math.floor(botFrom / 8);
        const col = botFrom % 8;
        const targetCandidates = [];

        if (row < 7) targetCandidates.push((row + 1) * 8 + col);
        if (row < 7 && col > 0) targetCandidates.push((row + 1) * 8 + (col - 1));
        if (row < 7 && col < 7) targetCandidates.push((row + 1) * 8 + (col + 1));

        const validCandidates = targetCandidates.filter((i) => !newBoard[i] || WHITE_PIECES.has(newBoard[i]!));
        const botTo = validCandidates.length > 0 ? validCandidates[Math.floor(Math.random() * validCandidates.length)] : botFrom;

        if (botTo !== botFrom) {
          const botTarget = newBoard[botTo];
          newBoard[botFrom] = null;
          newBoard[botTo] = botPiece;
          setChessBoard(newBoard);

          if (botTarget === '♔') {
            setChessWinner('Máy Bot đã bắt Vua Trắng! (Giữ nguyên vật phẩm)');
          } else {
            setChessTurn('white');
          }
        } else {
          setChessTurn('white');
        }
      }, 500);
    }
  };

  return (
    <div
      id="minigames-section"
      className="bg-[#240a3d]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-500/30 shadow-xl relative overflow-hidden transition-all text-purple-100 space-y-6"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Reward Toast Alert */}
      {toastReward && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-900 via-purple-900 to-indigo-900 border-2 border-emerald-400 text-center text-xs font-extrabold text-emerald-200 animate-bounce shadow-2xl">
          🎉 {toastReward}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-lg shrink-0">
            <Gamepad2 className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Mục Trò Chơi Tích Quà Donate
              </h2>
              <span className="text-[11px] text-amber-200 bg-purple-900/80 px-2.5 py-0.5 rounded-full border border-purple-400/40">
                Thắng nhận +10 Hoa, +10 Sao, +10 Kim Cương
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5">
              Thư giãn cùng Ô Ăn Quan, Cờ Caro và Xếp Hình! Thắng nhận 10 hoa, 10 ngôi sao, 10 kim cương. Thua giữ nguyên!
            </p>
          </div>
        </div>

        {/* Current Inventory Summary */}
        <div className="flex items-center gap-3 bg-[#17042a] p-2.5 px-4 rounded-xl border border-purple-500/40 text-xs font-semibold">
          <span className="text-purple-300">Kho quà:</span>
          <span className="text-pink-300 font-bold flex items-center gap-1"><Flower2 className="w-3.5 h-3.5" />{inventory.flowers}</span>
          <span className="text-amber-300 font-bold flex items-center gap-1"><Star className="w-3.5 h-3.5" />{inventory.stars}</span>
          <span className="text-cyan-300 font-bold flex items-center gap-1"><Gem className="w-3.5 h-3.5" />{inventory.diamonds}</span>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveGameTab('o_an_quan')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeGameTab === 'o_an_quan'
              ? 'bg-gradient-to-r from-amber-600 to-purple-700 text-white shadow-md border border-amber-300/50'
              : 'bg-[#1a052e] hover:bg-purple-900/60 text-purple-200 border border-purple-500/30'
          }`}
        >
          <span>🪵 Trò Chơi 1: Ô Ăn Quan</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGameTab('caro')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeGameTab === 'caro'
              ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white shadow-md border border-pink-300/50'
              : 'bg-[#1a052e] hover:bg-purple-900/60 text-purple-200 border border-purple-500/30'
          }`}
        >
          <span>❌⭕ Trò Chơi 2: Cờ Caro (10x10)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGameTab('co_vua')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeGameTab === 'co_vua'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md border border-indigo-300/50'
              : 'bg-[#1a052e] hover:bg-purple-900/60 text-purple-200 border border-purple-500/30'
          }`}
        >
          <span>♟️ Trò Chơi 3: Đánh Cờ Vua</span>
        </button>
      </div>

      {/* GAME 1 CONTENT: Ô ĂN QUAN */}
      {activeGameTab === 'o_an_quan' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1d0636]/90 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                <span>🪵 Trò Chơi Ô Ăn Quan</span>
              </h3>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Rải sỏi ăn điểm! Đạt 40 điểm để chiến thắng và tích lũy +10 Hoa, +10 Ngôi sao, +10 Kim cương!
              </p>
            </div>
            <button
              type="button"
              onClick={resetOAnQuan}
              className="px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 text-xs font-semibold flex items-center gap-1 cursor-pointer border border-purple-400/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi Ván Mới</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#140326] rounded-xl border border-purple-500/40 text-xs font-bold text-amber-200">
            <span>Điểm Ô Ăn Quan: <span className="text-lg text-white font-extrabold ml-1">{playerScore}</span></span>
            {oAnQuanWon && (
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500">
                🎉 Đã Thắng (+10 Hoa, +10 Sao, +10 Kim cương)
              </span>
            )}
          </div>

          {/* Ô Ăn Quan Board Visual */}
          <div className="grid grid-cols-7 gap-2 p-3 sm:p-4 bg-[#21093b] rounded-2xl border-2 border-amber-600/40 shadow-inner max-w-2xl mx-auto">
            {/* Quan Left */}
            <div className="col-span-1 row-span-2 bg-[#310f54] rounded-xl border border-amber-400/50 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[10px] text-amber-300 font-bold">Quan Trái</span>
              <span className="text-xl font-extrabold text-white mt-1">{quanLeft}</span>
              <span className="text-[10px] text-purple-300">sỏi</span>
            </div>

            {/* Top Row (O 0..4) */}
            <div className="col-span-5 grid grid-cols-5 gap-1.5">
              {oAnQuanBoard.slice(0, 5).map((num, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-3 bg-[#130324] rounded-lg border border-purple-500/30 text-center"
                >
                  <div className="text-[10px] text-purple-300">Ô {idx + 1}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{num}</div>
                </div>
              ))}
            </div>

            {/* Quan Right */}
            <div className="col-span-1 row-span-2 bg-[#310f54] rounded-xl border border-amber-400/50 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[10px] text-amber-300 font-bold">Quan Phải</span>
              <span className="text-xl font-extrabold text-white mt-1">{quanRight}</span>
              <span className="text-[10px] text-purple-300">sỏi</span>
            </div>

            {/* Bottom Row (O 5..9 - Interactive) */}
            <div className="col-span-5 grid grid-cols-5 gap-1.5">
              {oAnQuanBoard.slice(5, 10).map((num, idx) => {
                const realIndex = idx + 5;
                const isSelected = selectedSquare === realIndex;
                return (
                  <div
                    key={realIndex}
                    onClick={() => setSelectedSquare(realIndex)}
                    className={`p-2 sm:p-3 rounded-lg border transition-all cursor-pointer text-center relative ${
                      isSelected
                        ? 'bg-purple-800 border-amber-300 ring-2 ring-amber-400/50'
                        : 'bg-[#130324] hover:bg-[#280a47] border-purple-500/40'
                    }`}
                  >
                    <div className="text-[10px] text-purple-300">Ô {realIndex + 1}</div>
                    <div className="text-sm font-bold text-amber-200 mt-0.5">{num} sỏi</div>

                    {isSelected && (
                      <div className="mt-1 flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayOAnQuan(realIndex, 'left');
                          }}
                          className="px-1.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded"
                        >
                          ← Trái
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayOAnQuan(realIndex, 'right');
                          }}
                          className="px-1.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded"
                        >
                          Phải →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME 2 CONTENT: CỜ CARO */}
      {activeGameTab === 'caro' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1d0636]/90 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                <span>❌⭕ Trò Chơi Cờ Caro (10x10)</span>
              </h3>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Tạo chuỗi 5 quân liên tiếp để chiến thắng! Thắng nhận +10 Hoa, +10 Ngôi sao, +10 Kim cương.
              </p>
            </div>
            <button
              type="button"
              onClick={resetCaro}
              className="px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 text-xs font-semibold flex items-center gap-1 cursor-pointer border border-purple-400/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi Ván Mới</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 px-4 bg-[#140326] rounded-xl border border-purple-500/40 text-xs font-bold">
            <span>
              Lượt hiện tại:{' '}
              <span className={caroTurn === 'X' ? 'text-pink-300 font-extrabold' : 'text-amber-300 font-extrabold'}>
                {caroTurn === 'X' ? 'Bạn (X)' : 'Máy Bot (O)'}
              </span>
            </span>
            {caroWinner && (
              <span className="text-emerald-400 font-extrabold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/40">
                🎉 {caroWinner}
              </span>
            )}
          </div>

          {/* Caro Board 10x10 */}
          <div className="max-w-md mx-auto aspect-square grid grid-cols-10 gap-1 p-2 bg-[#17042a] rounded-xl border border-purple-500/40">
            {caroGrid.map((val, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCaroClick(idx)}
                disabled={!!val || !!caroWinner || caroTurn !== 'X'}
                className={`w-full h-full rounded flex items-center justify-center font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                  val === 'X'
                    ? 'bg-pink-600/80 text-white border border-pink-400'
                    : val === 'O'
                    ? 'bg-amber-600/80 text-white border border-amber-400'
                    : 'bg-[#220a3b] hover:bg-purple-800/60 border border-purple-500/20'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 3 CONTENT: CỜ VUA (CHESS) */}
      {activeGameTab === 'co_vua' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1d0636]/90 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                <span>♟️ Trò Chơi Đánh Cờ Vua</span>
              </h3>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Bạn cầm cờ Trắng (♔ ♕ ♖ ♗ ♘ ♙). Bắt quân cờ Đen của Bot để thắng và tích lũy +10 Hoa, +10 Ngôi sao, +10 Kim Cương!
              </p>
            </div>
            <button
              type="button"
              onClick={resetChess}
              className="px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 text-xs font-semibold flex items-center gap-1 cursor-pointer border border-purple-400/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bắt Đầu Ván Mới</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between p-3 bg-[#140326] rounded-xl border border-purple-500/40 text-xs font-bold gap-2">
            <div>
              <span>Lượt đi: </span>
              <span className={chessTurn === 'white' ? 'text-pink-300 font-extrabold' : 'text-amber-300 font-extrabold'}>
                {chessTurn === 'white' ? 'Bạn (Cờ Trắng ♔)' : 'Bot (Cờ Đen ♚)...'}
              </span>
            </div>

            {capturedBlacks.length > 0 && (
              <div className="text-xs text-purple-300 flex items-center gap-1">
                <span>Đã bắt:</span>
                <span className="text-amber-200 font-mono text-sm">{capturedBlacks.join(' ')}</span>
              </div>
            )}

            {chessWinner && (
              <span className="text-emerald-400 font-extrabold bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500">
                🎉 {chessWinner}
              </span>
            )}
          </div>

          {/* 8x8 Chess Board Grid */}
          <div className="max-w-md mx-auto aspect-square grid grid-cols-8 gap-0.5 p-2 bg-[#17042a] rounded-2xl border-2 border-purple-500/50 shadow-2xl">
            {chessBoard.map((piece, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const isDarkSquare = (row + col) % 2 === 1;
              const isSelected = selectedChessIdx === idx;
              const isWhitePiece = piece && WHITE_PIECES.has(piece);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChessSquareClick(idx)}
                  className={`w-full h-full rounded flex items-center justify-center text-xl sm:text-2xl transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/90 text-white ring-2 ring-amber-300 scale-105 z-10'
                      : isDarkSquare
                      ? 'bg-[#2b0c48] hover:bg-purple-800/80 text-purple-100'
                      : 'bg-[#43176d] hover:bg-purple-700/80 text-white'
                  }`}
                >
                  <span className={isWhitePiece ? 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] text-amber-100' : 'text-purple-300'}>
                    {piece}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
