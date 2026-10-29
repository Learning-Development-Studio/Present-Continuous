import React, { useState, useEffect } from 'react';
import {
  LISTENING_SCRIPT,
  LISTENING_QUESTIONS,
  RECONSTRUCTION_TASKS,
  ERROR_CORRECTION_TASKS,
  INFO_GAP_SCENARIOS,
} from '../data/curriculumContent';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Headphones,
  Layers,
  Wrench,
  SplitSquareVertical,
} from 'lucide-react';

interface ListeningAndPracticeSectionProps {
  onCompleteActivity: (activityId: string) => void;
  completedActivities: Record<string, boolean>;
  onNavigateBack: () => void;
  onNavigateNext: () => void;
}

export const ListeningAndPracticeSection: React.FC<ListeningAndPracticeSectionProps> = ({
  onCompleteActivity,
  completedActivities,
  onNavigateBack,
  onNavigateNext,
}) => {
  // Audio Player State
  const totalDuration = 88;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.85 | 1>(1);
  const [enableVoicePreview, setEnableVoicePreview] = useState<boolean>(false);
  const [lastSpokenTurnId, setLastSpokenTurnId] = useState<string | null>(null);

  // Listening Comprehension State
  const [listenAnswers, setListenAnswers] = useState<Record<string, number>>({});
  const [listenSubmitted, setListenSubmitted] = useState<Record<string, boolean>>({});

  // Practice Tab State
  const [activePracticeStation, setActivePracticeStation] = useState<
    'reconstruction' | 'error-correction' | 'info-gap'
  >('reconstruction');

  // Station 1: Sentence Reconstruction State
  const [selectedTiles, setSelectedTiles] = useState<Record<string, number[]>>({});
  const [recChecked, setRecChecked] = useState<Record<string, boolean>>({});

  // Station 2: Error Correction State
  const [errSelections, setErrSelections] = useState<Record<string, string>>({});
  const [errChecked, setErrChecked] = useState<Record<string, boolean>>({});

  // Station 3: Info-Gap State
  const [gapNegSelections, setGapNegSelections] = useState<Record<string, string>>({});
  const [gapAffSelections, setGapAffSelections] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState<Record<string, boolean>>({});

  // Timer for synchronized transcript playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 1 * playbackSpeed;
        if (next >= totalDuration) {
          setIsPlaying(false);
          onCompleteActivity('listening-played');
          return totalDuration;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, onCompleteActivity]);

  // Active turn lookup
  const activeTurn =
    LISTENING_SCRIPT.find(
      (t) => currentTime >= t.startTime && currentTime < t.endTime
    ) || LISTENING_SCRIPT[LISTENING_SCRIPT.length - 1];

  // Optional explicitly-toggled browser voice preview
  useEffect(() => {
    if (!isPlaying || !enableVoicePreview) return;
    if (activeTurn && activeTurn.id !== lastSpokenTurnId) {
      setLastSpokenTurnId(activeTurn.id);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeTurn.text);
        utterance.lang = 'en-US';
        utterance.rate = playbackSpeed === 0.85 ? 0.85 : 0.98;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [isPlaying, enableVoicePreview, activeTurn, lastSpokenTurnId, playbackSpeed]);

  const handleTogglePlay = () => {
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
      setLastSpokenTurnId(null);
    }
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    if (!nextPlay && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleResetAudio = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setLastSpokenTurnId(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleJumpToTurn = (startTime: number, turnId: string) => {
    setCurrentTime(startTime);
    setLastSpokenTurnId(null);
    onCompleteActivity('listening-played');
    if (enableVoicePreview && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const turn = LISTENING_SCRIPT.find((t) => t.id === turnId);
      if (turn) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(turn.text);
        utterance.lang = 'en-US';
        utterance.rate = playbackSpeed === 0.85 ? 0.85 : 0.98;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const formatTime = (sec: number) => {
    const whole = Math.floor(sec);
    const m = Math.floor(whole / 60);
    const s = whole % 60;
    return `0${m}:${String(s).padStart(2, '0')}`;
  };

  // Station 1 helpers
  const handleToggleWordTile = (taskId: string, wordIdx: number) => {
    setRecChecked((prev) => ({ ...prev, [taskId]: false }));
    setSelectedTiles((prev) => {
      const current = prev[taskId] || [];
      if (current.includes(wordIdx)) {
        return { ...prev, [taskId]: current.filter((i) => i !== wordIdx) };
      }
      return { ...prev, [taskId]: [...current, wordIdx] };
    });
  };

  const handleCheckReconstruction = (taskId: string, scrambled: string[], target: string) => {
    const indices = selectedTiles[taskId] || [];
    const built = indices.map((i) => scrambled[i]).join(' ');
    setRecChecked((prev) => ({ ...prev, [taskId]: true }));
    if (built === target) {
      onCompleteActivity(`prac-rec-${taskId}`);
    }
  };

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold">
            04 / Listening Experience &amp; Multi-Modal Practice
          </p>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Audio Track: eh-a12-pc-listen-01.mp3 · 3 Practice Stations
          </p>
        </div>
        <h2
          className="text-3xl lg:text-4xl font-editorial font-medium text-[#001F54] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Live Crossover: Three Cities at Once
        </h2>
        <p className="mt-3 text-base text-slate-700 max-w-2xl leading-relaxed">
          Listen to Broadcast Director Sora Takahashi in Tokyo as she connects live with
          Elena in Madrid and Tariq in London. Follow the conversational turns, answer the
          comprehension and interpretation questions, and complete the three interactive practice stations.
        </p>
      </div>

      {/* COMPONENT F: LISTENING EXPERIENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Synchronized Audio Console & Script */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
          {/* Transparent Asset Status Banner */}
          <div className="p-3.5 rounded-lg bg-[#EBF1F6] border border-slate-300/80 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono-tabular font-semibold text-[#001F54]">
                Studio Master Asset: eh-a12-pc-listen-01.mp3
              </span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>
                Pending Studio Recording (Documented in Deliverable 2 Manifest). Synchronized Turn Player Active.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEnableVoicePreview((prev) => !prev)}
              className={`px-2.5 py-1 rounded text-xs font-medium inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                enableVoicePreview
                  ? 'bg-[#007A87] text-white border-[#007A87]'
                  : 'bg-white text-[#001F54] border-slate-300 hover:bg-slate-100'
              }`}
            >
              {enableVoicePreview ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Reference Voice Reader: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Optional Reference Voice: Off</span>
                </>
              )}
            </button>
          </div>

          {/* Functional Playback Controls */}
          <div className="p-5 rounded-xl bg-[#001F54] text-white space-y-4 border border-[#B57C00]/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                  className="w-11 h-11 rounded-lg bg-[#007A87] text-white flex items-center justify-center hover:bg-[#00636E] transition-colors cursor-pointer shrink-0 ring-1 ring-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleResetAudio}
                  aria-label="Reset playback to start"
                  className="px-3 py-2 rounded-lg bg-white/10 text-slate-100 hover:bg-white/20 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-xs font-mono-tabular text-[#E5A922]">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1">/</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-md">
                  {([0.85, 1] as const).map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 text-xs font-mono-tabular rounded transition-colors cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-white text-[#001F54] font-semibold'
                          : 'text-slate-200 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrubber Slider */}
            <div className="space-y-1.5">
              <label htmlFor="audio-scrubber" className="sr-only">
                Audio timeline scrubber
              </label>
              <input
                id="audio-scrubber"
                type="range"
                min={0}
                max={totalDuration}
                value={Math.floor(currentTime)}
                onChange={(e) => {
                  setCurrentTime(Number(e.target.value));
                  onCompleteActivity('listening-played');
                }}
                className="w-full accent-[#E5A922] cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Currently Speaking: {activeTurn.speaker} ({activeTurn.city})</span>
                <span>Click any speaker turn below to jump</span>
              </div>
            </div>
          </div>

          {/* Complete Audio Script with Clearly Identified Speakers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#007A87] uppercase tracking-wider font-mono-tabular font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5" />
                Complete Conversational Transcript
              </span>
              <span>6 Conversational Turns</span>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
              {LISTENING_SCRIPT.map((turn) => {
                const isCurrent = activeTurn.id === turn.id;
                return (
                  <button
                    key={turn.id}
                    type="button"
                    onClick={() => handleJumpToTurn(turn.startTime, turn.id)}
                    className={`w-full text-left p-4 transition-colors cursor-pointer flex flex-col gap-1.5 ${
                      isCurrent
                        ? 'bg-[#007A87]/10'
                        : 'bg-[#F5F8FA] hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#001F54]">
                          {turn.speaker}
                        </span>
                        <span aria-hidden="true" className="text-[#B57C00]">·</span>
                        <span className="text-[#007A87] font-medium">{turn.role}</span>
                        <span aria-hidden="true" className="text-[#B57C00]">·</span>
                        <span className="text-slate-500">{turn.city}</span>
                      </div>
                      <span className="font-mono-tabular text-slate-500">
                        {formatTime(turn.startTime)} – {formatTime(turn.endTime)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      “{turn.text}”
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Listening Comprehension & Interpretation Questions */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold">
              Comprehension &amp; Interpretation
            </p>
            <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
              Understand the Live Crossover
            </h3>
          </div>

          <div className="space-y-6">
            {LISTENING_QUESTIONS.map((q, qIdx) => {
              const picked = listenAnswers[q.id];
              const isSub = listenSubmitted[q.id];
              const isCorrect = picked === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Question 0{qIdx + 1} · {q.typeLabel}</span>
                    {completedActivities[`listen-${q.id}`] && (
                      <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#001F54]">
                    {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => {
                          setListenAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                          setListenSubmitted((prev) => ({ ...prev, [q.id]: false }));
                        }}
                        className={`w-full text-left px-3 py-2 rounded border text-xs transition-colors cursor-pointer ${
                          picked === oIdx
                            ? 'bg-[#001F54]/5 border-[#001F54] text-[#001F54] font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-[#007A87]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      disabled={picked === undefined}
                      onClick={() => {
                        setListenSubmitted((prev) => ({ ...prev, [q.id]: true }));
                        if (picked === q.correctIndex) {
                          onCompleteActivity(`listen-${q.id}`);
                        }
                      }}
                      className="px-3.5 py-1.5 text-xs font-medium bg-[#001F54] text-white rounded hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Verify Answer
                    </button>
                  </div>

                  {isSub && (
                    <div
                      className={`p-2.5 rounded text-xs flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                          : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                      )}
                      <span>
                        {isCorrect
                          ? q.feedback
                          : 'Listen to or read the speaker turns again to verify what each person is doing right now.'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* COMPONENT E: MEANINGFUL INTERACTIVE PRACTICE (3 Distinct Stations) */}
      <div className="pt-8 border-t border-slate-200 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold mb-2">
              Interactive Practice Studio · Varied Communicative Tasks
            </p>
            <h3 className="text-2xl lg:text-3xl font-editorial font-medium text-[#001F54]">
              Put the Language System to Work
            </h3>
          </div>

          {/* Practice Station Selector */}
          <div className="flex flex-wrap items-center gap-1 bg-[#EBF1F6] p-1.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setActivePracticeStation('reconstruction')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activePracticeStation === 'reconstruction'
                  ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                  : 'text-slate-600 hover:text-[#001F54]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Sentence Reconstruction</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePracticeStation('error-correction')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activePracticeStation === 'error-correction'
                  ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                  : 'text-slate-600 hover:text-[#001F54]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>2. Diagnostic Error Correction</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePracticeStation('info-gap')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activePracticeStation === 'info-gap'
                  ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                  : 'text-slate-600 hover:text-[#001F54]'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>3. Schedule vs. Camera Info-Gap</span>
            </button>
          </div>
        </div>

        {/* STATION 1: Sentence Reconstruction */}
        {activePracticeStation === 'reconstruction' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECONSTRUCTION_TASKS.map((task, idx) => {
              const chosenIndices = selectedTiles[task.id] || [];
              const builtSentence = chosenIndices
                .map((i) => task.scrambledWords[i])
                .join(' ');
              const isChecked = recChecked[task.id];
              const isCorrect = builtSentence === task.targetSentence;

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="text-[#B57C00] font-semibold">Task 0{idx + 1} · {task.sentenceType}</span>
                      {completedActivities[`prac-rec-${task.id}`] && (
                        <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-[#001F54]">
                      {task.contextHint}
                    </p>

                    {/* Constructed Output Slot */}
                    <div className="min-h-12 p-3 rounded-lg bg-[#F5F8FA] border border-slate-300 flex items-center justify-between gap-2">
                      <span className="text-sm font-editorial text-[#001F54]">
                        {builtSentence || (
                          <span className="text-slate-400 italic">
                            Click the word tiles below in order...
                          </span>
                        )}
                      </span>
                      {chosenIndices.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTiles((prev) => ({ ...prev, [task.id]: [] }));
                            setRecChecked((prev) => ({ ...prev, [task.id]: false }));
                          }}
                          className="text-xs text-slate-500 hover:text-[#001F54] shrink-0 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Word Tiles */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {task.scrambledWords.map((word, wIdx) => {
                        const isUsed = chosenIndices.includes(wIdx);
                        return (
                          <button
                            key={wIdx}
                            type="button"
                            onClick={() => handleToggleWordTile(task.id, wIdx)}
                            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                              isUsed
                                ? 'bg-slate-200 text-slate-400 border-slate-200'
                                : 'bg-white text-[#001F54] border-slate-300 hover:border-[#007A87]'
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={chosenIndices.length !== task.scrambledWords.length}
                      onClick={() =>
                        handleCheckReconstruction(
                          task.id,
                          task.scrambledWords,
                          task.targetSentence
                        )
                      }
                      className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Verify Sentence Order
                    </button>

                    {isChecked && (
                      <div
                        className={`p-3 rounded text-xs leading-relaxed flex items-start gap-2 ${
                          isCorrect
                            ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                            : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                        )}
                        <span>
                          {isCorrect
                            ? task.grammarExplanation
                            : `Check word order: ${task.grammarExplanation}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STATION 2: Diagnostic Field Note Error Correction */}
        {activePracticeStation === 'error-correction' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ERROR_CORRECTION_TASKS.map((task, idx) => {
              const selected = errSelections[task.id] || '';
              const isChecked = errChecked[task.id];
              const isCorrect = selected === task.correctOption;

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="text-[#B57C00] font-semibold">Draft Note 0{idx + 1} · {task.context}</span>
                      {completedActivities[`prac-err-${task.id}`] && (
                        <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
                      )}
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F5F8FA] border border-slate-200 text-sm text-[#001F54]">
                      <span className="text-xs text-slate-500 block mb-1">
                        Flawed Draft:
                      </span>
                      “{task.internNote}”
                      <span className="block text-xs text-[#7A5200] mt-1.5 font-mono-tabular">
                        Underlined error: “{task.errorHighlight}”
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-[#001F54]">
                        Select the correct revision for “{task.errorHighlight}”:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {task.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setErrSelections((prev) => ({
                                ...prev,
                                [task.id]: opt,
                              }));
                              setErrChecked((prev) => ({
                                ...prev,
                                [task.id]: false,
                              }));
                            }}
                            className={`py-2 px-2 text-xs font-medium rounded border transition-colors cursor-pointer ${
                              selected === opt
                                ? 'bg-[#001F54] text-white border-[#001F54]'
                                : 'bg-white text-slate-800 border-slate-300 hover:border-[#007A87]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={!selected}
                      onClick={() => {
                        setErrChecked((prev) => ({ ...prev, [task.id]: true }));
                        if (selected === task.correctOption) {
                          onCompleteActivity(`prac-err-${task.id}`);
                        }
                      }}
                      className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Check Revision
                    </button>

                    {isChecked && (
                      <div
                        className={`p-3 rounded text-xs leading-relaxed flex items-start gap-2 ${
                          isCorrect
                            ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                            : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                        )}
                        <span>{task.diagnosticFeedback}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STATION 3: Schedule vs. Live Camera Info-Gap */}
        {activePracticeStation === 'info-gap' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INFO_GAP_SCENARIOS.map((scen) => {
              const negPicked = gapNegSelections[scen.id] || '';
              const affPicked = gapAffSelections[scen.id] || '';
              const isChecked = gapChecked[scen.id];
              const isBothRight =
                isChecked &&
                negPicked === scen.correctNegative &&
                affPicked === scen.correctAffirmative;

              return (
                <div
                  key={scen.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="text-[#001F54] font-semibold">{scen.person} · {scen.city}</span>
                      {completedActivities[`prac-gap-${scen.id}`] && (
                        <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-slate-100 border border-slate-200 text-xs">
                        <span className="font-mono-tabular uppercase text-slate-500 block mb-1">
                          Planned Schedule
                        </span>
                        <span className="font-medium text-slate-800">
                          {scen.plannedSchedule}
                        </span>
                      </div>
                      <div className="p-3 rounded bg-[#007A87]/10 border border-[#007A87]/30 text-xs">
                        <span className="font-mono-tabular uppercase text-[#007A87] font-semibold block mb-1">
                          Actual Live Camera
                        </span>
                        <span className="font-medium text-[#001F54]">
                          {scen.liveCameraReality}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="space-y-1.5">
                        <label
                          htmlFor={`neg-${scen.id}`}
                          className="block text-xs font-semibold text-[#001F54]"
                        >
                          1. What are they NOT doing right now? (Negative Statement)
                        </label>
                        <select
                          id={`neg-${scen.id}`}
                          value={negPicked}
                          onChange={(e) => {
                            setGapNegSelections((prev) => ({
                              ...prev,
                              [scen.id]: e.target.value,
                            }));
                            setGapChecked((prev) => ({ ...prev, [scen.id]: false }));
                          }}
                          className="w-full px-3 py-2 text-xs bg-[#F5F8FA] border border-slate-300 rounded text-slate-900"
                        >
                          <option value="">Select negative statement...</option>
                          {scen.negativeOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor={`aff-${scen.id}`}
                          className="block text-xs font-semibold text-[#001F54]"
                        >
                          2. What ARE they doing instead? (Affirmative Statement)
                        </label>
                        <select
                          id={`aff-${scen.id}`}
                          value={affPicked}
                          onChange={(e) => {
                            setGapAffSelections((prev) => ({
                              ...prev,
                              [scen.id]: e.target.value,
                            }));
                            setGapChecked((prev) => ({ ...prev, [scen.id]: false }));
                          }}
                          className="w-full px-3 py-2 text-xs bg-[#F5F8FA] border border-slate-300 rounded text-slate-900"
                        >
                          <option value="">Select affirmative statement...</option>
                          {scen.affirmativeOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={!negPicked || !affPicked}
                      onClick={() => {
                        setGapChecked((prev) => ({ ...prev, [scen.id]: true }));
                        if (
                          negPicked === scen.correctNegative &&
                          affPicked === scen.correctAffirmative
                        ) {
                          onCompleteActivity(`prac-gap-${scen.id}`);
                        }
                      }}
                      className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Verify Comparison
                    </button>

                    {isChecked && (
                      <div
                        className={`p-3 rounded text-xs leading-relaxed flex items-start gap-2 ${
                          isBothRight
                            ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                            : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                        }`}
                      >
                        {isBothRight ? (
                          <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                        )}
                        <span>{scen.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onNavigateBack}
          className="px-4 py-2.5 text-sm font-medium text-[#001F54] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 03. Grammar Lab</span>
        </button>

        <button
          type="button"
          onClick={onNavigateNext}
          className="px-5 py-2.5 text-sm font-medium bg-[#001F54] text-white rounded-lg hover:bg-[#007A87] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Continue to 05. The Live Update</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
