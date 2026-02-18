import React, { useState, useEffect, useRef } from 'react';
import { Puzzle, Timer, Trophy, Lightbulb, Eye, EyeOff, RefreshCw } from 'lucide-react';

const PuzzleGame = () => {
  // State management using useState hook
  const [size, setSize] = useState(2);
  const [placed, setPlaced] = useState(0);
  const [showHints, setShowHints] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [tiles, setTiles] = useState([]);
  const [boardSlots, setBoardSlots] = useState({});
  const [message, setMessage] = useState('');
  const [showHintImage, setShowHintImage] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bestTimes, setBestTimes] = useState({ '2': null, '3': null, '4': null });
  const [celebration, setCelebration] = useState(false);

  // useRef for values that persist but don't trigger re-renders
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0e3?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541599468348-e96984315921?w=400&h=400&fit=crop"
  ];

  // Component Did Mount - Load best times from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('puzzleBestTimes');
    if (saved) {
      setBestTimes(JSON.parse(saved));
    }
  }, []);

  // Timer effect - runs when isRunning changes
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    // Cleanup function - runs on unmount or before next effect
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, elapsedTime]);

  // Initialize game when size changes
  useEffect(() => {
    initGame();
  }, [size]);

  const initGame = () => {
    setPlaced(0);
    setBoardSlots({});
    setMessage('');
    setShowHintImage(false);
    setElapsedTime(0);
    setIsRunning(true);

    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);

    const pieceSize = 300 / size;
    const newTiles = [];

    for (let i = 0; i < size * size; i++) {
      const col = i % size;
      const row = Math.floor(i / size);
      const x = col * pieceSize;
      const y = row * pieceSize;

      newTiles.push({
        id: i,
        index: i,
        backgroundPosition: `-${x}px -${y}px`,
        placed: false
      });
    }

    // Shuffle tiles
    const shuffled = [...newTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  };

  const handleDragStart = (e, tileIndex) => {
    e.dataTransfer.setData('tileIndex', tileIndex);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const tileIndex = parseInt(e.dataTransfer.getData('tileIndex'));

    if (boardSlots[slotIndex] !== undefined) {
      setMessage('This spot is already filled! 🙂');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (tileIndex === slotIndex) {
      setBoardSlots(prev => ({ ...prev, [slotIndex]: tileIndex }));
      
      setTiles(prev => prev.map(tile => 
        tile.index === tileIndex ? { ...tile, placed: true } : tile
      ));

      const newPlaced = placed + 1;
      setPlaced(newPlaced);

      if (newPlaced === size * size) {
        setIsRunning(false);
        const isNewRecord = saveBestTime();
        
        setTimeout(() => {
          if (isNewRecord) {
            setMessage('🎉 Amazing! New Record! 🏆');
          } else {
            setMessage('🎉 Amazing! You completed the picture! 🎉');
          }
          setCelebration(true);
          setTimeout(() => setCelebration(false), 600);
        }, 300);
      } else {
        setMessage('✨ Great job! Keep going!');
        setTimeout(() => setMessage(''), 2000);
      }
    } else {
      setMessage('Try a different spot 🙂');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const saveBestTime = () => {
    const currentBest = bestTimes[size];
    if (!currentBest || elapsedTime < currentBest) {
      const newBestTimes = { ...bestTimes, [size]: elapsedTime };
      setBestTimes(newBestTimes);
      localStorage.setItem('puzzleBestTimes', JSON.stringify(newBestTimes));
      return true;
    }
    return false;
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progress = Math.round((placed / (size * size)) * 100);
  const pieceSize = 300 / size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-700 mb-3 flex items-center justify-center gap-3">
            <Puzzle className="w-12 h-12" />
            Picture Puzzle
          </h1>
          <p className="text-xl text-blue-600">Drag each piece to its correct spot</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow">
            <span className="text-blue-600 font-medium">Difficulty:</span>
            {[2, 3, 4].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  size === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {s === 2 ? 'Easy' : s === 3 ? 'Medium' : 'Hard'} ({s}×{s})
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium shadow"
          >
            {showHints ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showHints ? 'Hide' : 'Show'} Numbers
          </button>

          <button
            onClick={() => setShowHintImage(true)}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium shadow"
          >
            <Lightbulb className="w-5 h-5" />
            Show Picture Hint
          </button>

          <button
            onClick={initGame}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow"
          >
            <RefreshCw className="w-5 h-5" />
            New Puzzle
          </button>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Timer className="w-6 h-6 text-blue-600" />
            <span className="text-xl text-blue-600 font-semibold">Time:</span>
            <span className="text-3xl text-blue-700 font-bold font-mono">
              {formatTime(elapsedTime)}
            </span>
          </div>
          {bestTimes[size] && (
            <div className="text-center text-green-600 font-semibold bg-green-50 rounded-full px-4 py-1">
              <Trophy className="w-4 h-4 inline mr-1" />
              Best: {formatTime(bestTimes[size])}
            </div>
          )}
        </div>

        {/* Main Game Area */}
        <div className="flex flex-wrap gap-10 justify-center items-start">
          {/* Board Section */}
          <div className="flex flex-col items-center">
            <div className="text-xl text-blue-600 font-semibold mb-4">
              Put pieces here ⬇️
            </div>
            <div
              className="grid gap-0.5 bg-blue-600 p-0.5 rounded-xl shadow-2xl"
              style={{
                gridTemplateColumns: `repeat(${size}, ${pieceSize}px)`,
                gridTemplateRows: `repeat(${size}, ${pieceSize}px)`
              }}
            >
              {Array.from({ length: size * size }).map((_, i) => (
                <div
                  key={i}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, i)}
                  className={`bg-white flex items-center justify-center relative transition-all ${
                    boardSlots[i] === undefined ? 'hover:bg-blue-50 hover:scale-105' : ''
                  }`}
                  style={{ width: pieceSize, height: pieceSize }}
                >
                  {showHints && boardSlots[i] === undefined && (
                    <div className="absolute top-1 left-1 w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm shadow">
                      {i + 1}
                    </div>
                  )}
                  {boardSlots[i] !== undefined && (
                    <div
                      className="w-full h-full rounded animate-[placeSuccess_0.5s_ease]"
                      style={{
                        backgroundImage: `url('${currentImage}')`,
                        backgroundSize: '300px 300px',
                        backgroundPosition: tiles.find(t => t.index === boardSlots[i])?.backgroundPosition
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pieces Section */}
          <div className="flex flex-col items-center">
            <div className="text-xl text-blue-600 font-semibold mb-4">
              Puzzle Pieces
            </div>
            <div className="flex flex-wrap gap-2.5 p-5 bg-white rounded-xl shadow-lg min-h-[200px] max-w-[400px]">
              {tiles.filter(tile => !tile.placed).map(tile => (
                <div
                  key={tile.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tile.index)}
                  onDragEnd={handleDragEnd}
                  className="rounded-lg cursor-grab active:cursor-grabbing transition-all hover:scale-105 hover:shadow-xl shadow-md relative"
                  style={{
                    width: pieceSize,
                    height: pieceSize,
                    backgroundImage: `url('${currentImage}')`,
                    backgroundSize: '300px 300px',
                    backgroundPosition: tile.backgroundPosition
                  }}
                >
                  {showHints && (
                    <div className="absolute top-1 left-1 w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm shadow">
                      {tile.index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mt-6 h-8 bg-white rounded-full overflow-hidden shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-600 flex items-center justify-center text-white font-semibold transition-all duration-500"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>

        {/* Message */}
        <div className={`text-center mt-8 text-2xl text-blue-600 font-semibold min-h-[40px] ${celebration ? 'animate-[celebrate_0.6s_ease]' : ''}`}>
          {message}
        </div>

        {/* Hint Modal */}
        {showHintImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease]"
            onClick={() => setShowHintImage(false)}
          >
            <div className="relative animate-[hintZoom_0.4s_ease]" onClick={e => e.stopPropagation()}>
              <img
                src={currentImage}
                alt="Hint"
                className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl border-4 border-white"
              />
              <button
                onClick={() => setShowHintImage(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 hover:rotate-90 transition-all shadow-lg font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes placeSuccess {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes hintZoom {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PuzzleGame;