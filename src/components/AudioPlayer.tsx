import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Music2, 
  Waves,
  Piano,
  ChevronUp, 
  ChevronDown,
  Radio
} from 'lucide-react';
import { atelierAudio, SoundscapeMode, TRACK_INFO_MAP } from '../utils/audioEngine';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [mode, setMode] = useState<SoundscapeMode>('ambient-drone');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsubscribe = atelierAudio.subscribe((playing, vol, currentMode) => {
      setIsPlaying(playing);
      setVolume(vol);
      setMode(currentMode);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    setHasInteracted(true);
    atelierAudio.togglePlay();
  };

  const handleModeSelect = (newMode: SoundscapeMode) => {
    setHasInteracted(true);
    atelierAudio.setMode(newMode);
    if (!isPlaying) {
      atelierAudio.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    atelierAudio.setVolume(newVol);
  };

  const handleToggleMute = () => {
    if (volume > 0) {
      atelierAudio.setVolume(0);
    } else {
      atelierAudio.setVolume(0.65);
    }
  };

  const currentTrack = TRACK_INFO_MAP[mode];

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Expanded Audio Control Card */}
      {isExpanded && (
        <div className="mb-3 w-84 bg-[#161514] border border-[#332D28] rounded-sm p-4 shadow-2xl shadow-black/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#262220]">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8442C] animate-pulse" />
              <span className="font-mono-code text-[10px] text-[#B8976C] uppercase tracking-wider">
                Atelier Soundscapes
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#8E867E] hover:text-[#EDE8E1] p-1 transition-colors"
              aria-label="Collapse sound player"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Soundscape Mode Selector Tabs */}
          <div className="my-3 space-y-1.5">
            <span className="text-[10px] font-mono-code text-[#7A726A] uppercase tracking-wider block">
              Select Soundscape Mode:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleModeSelect('ambient-drone')}
                className={`p-2.5 rounded-sm text-left border transition-all ${
                  mode === 'ambient-drone'
                    ? 'bg-[#221D1A] border-[#C8442C] text-[#EDE8E1] shadow-sm'
                    : 'bg-[#121110] border-[#262220] text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#1A1817]'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Waves className={`w-3.5 h-3.5 ${mode === 'ambient-drone' ? 'text-[#C8442C]' : 'text-[#B8976C]'}`} />
                  <span className="font-mono-code text-[11px] font-medium">Warm Ambient</span>
                </div>
                <div className="text-[10px] text-[#7A726A] font-sans leading-tight">
                  Eno-style swells & analog drone
                </div>
              </button>

              <button
                onClick={() => handleModeSelect('felt-piano')}
                className={`p-2.5 rounded-sm text-left border transition-all ${
                  mode === 'felt-piano'
                    ? 'bg-[#221D1A] border-[#C8442C] text-[#EDE8E1] shadow-sm'
                    : 'bg-[#121110] border-[#262220] text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#1A1817]'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Piano className={`w-3.5 h-3.5 ${mode === 'felt-piano' ? 'text-[#C8442C]' : 'text-[#B8976C]'}`} />
                  <span className="font-mono-code text-[11px] font-medium">Felt Piano</span>
                </div>
                <div className="text-[10px] text-[#7A726A] font-sans leading-tight">
                  Neo-classical felt nocturne
                </div>
              </button>
            </div>
          </div>

          {/* Active Track Details */}
          <div className="py-2.5 px-3 bg-[#121110] border border-[#262220] rounded-sm space-y-1">
            <h4 className="font-display text-sm text-[#EDE8E1] tracking-tight">
              {currentTrack.title}
            </h4>
            <p className="font-serif-luxury italic text-xs text-[#B8976C]">
              {currentTrack.genre}
            </p>
            <p className="text-[11px] text-[#7A726A] font-sans pt-0.5 leading-relaxed">
              {currentTrack.description}
            </p>
          </div>

          {/* Volume Slider */}
          <div className="pt-3 mt-3 border-t border-[#23201E] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-[#8E867E]">
              <span>Master Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <button
                onClick={handleToggleMute}
                className="text-[#8E867E] hover:text-[#EDE8E1] transition-colors"
                aria-label="Mute toggle"
              >
                {volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#C8442C]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#B8976C]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#23201E] rounded-lg appearance-none cursor-pointer accent-[#C8442C]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Control */}
      <div className="flex items-center bg-[#161413]/95 hover:bg-[#1C1A18] border border-[#302B27] hover:border-[#B8976C] rounded-sm p-1.5 shadow-xl transition-all duration-300 backdrop-blur-md group">
        {/* Play/Pause Button */}
        <button
          id="atelier-audio-play-toggle"
          onClick={handleTogglePlay}
          className={`flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-300 ${
            isPlaying
              ? 'bg-[#C8442C] text-white shadow-md shadow-[#C8442C]/20'
              : 'bg-[#221F1D] text-[#EDE8E1] hover:bg-[#2A2624] hover:text-[#B8976C]'
          }`}
          title={isPlaying ? 'Pause Soundscape' : `Play ${currentTrack.title}`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>

        {/* Text & Waveform Indicator */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 cursor-pointer flex items-center space-x-2.5"
        >
          <div className="flex flex-col text-left">
            <span className="font-mono-code text-[10px] text-[#EDE8E1] group-hover:text-white transition-colors leading-tight flex items-center space-x-1.5">
              <span>{isPlaying ? 'Now Playing' : 'Atelier Audio'}</span>
              {!isPlaying && !hasInteracted && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8976C] animate-ping" />
              )}
            </span>
            <span className="font-serif-luxury italic text-[11px] text-[#A8A096] truncate max-w-[140px]">
              {mode === 'ambient-drone' ? 'Harmonic Ambient' : 'Felt Piano'}
            </span>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className="flex items-end space-x-0.5 h-3.5 pl-1">
            <span
              className={`w-0.5 bg-[#B8976C] rounded-xs transition-all ${
                isPlaying ? 'h-3.5 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-0.5 bg-[#C8442C] rounded-xs transition-all ${
                isPlaying ? 'h-2 animate-bounce' : 'h-1.5 opacity-40'
              }`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-0.5 bg-[#B8976C] rounded-xs transition-all ${
                isPlaying ? 'h-3 animate-pulse' : 'h-1 opacity-40'
              }`}
              style={{ animationDelay: '300ms' }}
            />
            <span
              className={`w-0.5 bg-[#EDE8E1] rounded-xs transition-all ${
                isPlaying ? 'h-1.5 animate-bounce' : 'h-1 opacity-40'
              }`}
              style={{ animationDelay: '75ms' }}
            />
          </div>
        </div>

        {/* Expand / Options Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 text-[#8E867E] hover:text-[#EDE8E1] transition-colors rounded-sm hover:bg-[#262220]"
          aria-label={isExpanded ? 'Collapse sound options' : 'Expand sound options'}
          title="Sound options & track switcher"
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
