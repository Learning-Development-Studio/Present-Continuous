import React, { useState } from 'react';
import { VOCABULARY_ITEMS, VocabularyItem } from '../data/curriculumContent';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  PenTool,
} from 'lucide-react';

interface VocabularySectionProps {
  onCompleteActivity: (activityId: string) => void;
  completedActivities: Record<string, boolean>;
  onNavigateBack: () => void;
  onNavigateNext: () => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  onCompleteActivity,
  completedActivities,
  onNavigateBack,
  onNavigateNext,
}) => {
  const [activeMode, setActiveMode] = useState<'explorer' | 'recognition' | 'retrieval'>('explorer');
  const [selectedContextFilter, setSelectedContextFilter] = useState<
    'All' | 'Broadcast Studio' | 'Engineering Floor' | 'Community Rooftop'
  >('All');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [inspectedItemIds, setInspectedItemIds] = useState<Record<string, boolean>>({});

  // Mode 2: Recognition Matching State
  const recognitionQuestions = VOCABULARY_ITEMS.slice(0, 6);
  const [recSelections, setRecSelections] = useState<Record<string, string>>({});
  const [recSubmitted, setRecSubmitted] = useState<boolean>(false);

  // Mode 3: Active Retrieval State
  const retrievalQuestions = VOCABULARY_ITEMS.slice(6, 12);
  const [retInputs, setRetInputs] = useState<Record<string, string>>({});
  const [retSubmitted, setRetSubmitted] = useState<Record<string, boolean>>({});

  const handlePronounce = (item: VocabularyItem) => {
    setInspectedItemIds((prev) => {
      const next = { ...prev, [item.id]: true };
      if (Object.keys(next).length >= 4) {
        onCompleteActivity('vocab-explored');
      }
      return next;
    });

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${item.basePhrase}. ${item.ingForm}. ${item.contextSentence}`
      );
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      setSpeakingId(item.id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems =
    selectedContextFilter === 'All'
      ? VOCABULARY_ITEMS
      : VOCABULARY_ITEMS.filter((item) => item.hubContext === selectedContextFilter);

  const handleCheckRecognition = () => {
    setRecSubmitted(true);
    const allCorrect = recognitionQuestions.every(
      (q) => recSelections[q.id] === q.ingForm
    );
    if (allCorrect) {
      onCompleteActivity('vocab-recognition');
    }
  };

  const handleResetRecognition = () => {
    setRecSubmitted(false);
    setRecSelections({});
  };

  const normalizeAnswer = (val: string) =>
    val.trim().toLowerCase().replace(/\s+/g, ' ');

  const handleCheckRetrievalItem = (item: VocabularyItem) => {
    const userVal = normalizeAnswer(retInputs[item.id] || '');
    if (!userVal) return;
    setRetSubmitted((prev) => ({ ...prev, [item.id]: true }));
    if (userVal === normalizeAnswer(item.retrievalAnswer)) {
      onCompleteActivity(`vocab-ret-${item.id}`);
    }
  };

  return (
    <div className="space-y-14">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold">
            02 / Active Lexicon Studio · 12 Core Action Phrases
          </p>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Context: Studio · Engineering · Rooftop
          </p>
        </div>
        <h2
          className="text-3xl lg:text-4xl font-editorial font-medium text-[#001F54] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Actions Happening Around Us
        </h2>
        <p className="mt-3 text-base text-slate-700 max-w-2xl leading-relaxed">
          To describe what people are doing right now, we need clear action phrases.
          Explore the 12 core lexical items below in context, practice recognizing them
          from visual observations, and use them to complete live studio updates.
        </p>
      </div>

      {/* 3-Stage Interaction Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#EBF1F6] p-3 rounded-lg border border-slate-200">
        <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Vocabulary learning stage">
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'explorer'}
            onClick={() => setActiveMode('explorer')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeMode === 'explorer'
                ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                : 'text-slate-600 hover:text-[#001F54]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Contextual Lexicon &amp; Pronunciation</span>
            {completedActivities['vocab-explored'] && (
              <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'recognition'}
            onClick={() => setActiveMode('recognition')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeMode === 'recognition'
                ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                : 'text-slate-600 hover:text-[#001F54]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>2. Visual Clues Recognition</span>
            {completedActivities['vocab-recognition'] && (
              <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'retrieval'}
            onClick={() => setActiveMode('retrieval')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeMode === 'retrieval'
                ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                : 'text-slate-600 hover:text-[#001F54]'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>3. Active Retrieval in Context</span>
          </button>
        </div>

        {activeMode === 'explorer' && (
          <div className="flex flex-wrap items-center gap-1">
            {(['All', 'Broadcast Studio', 'Engineering Floor', 'Community Rooftop'] as const).map(
              (loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedContextFilter(loc)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedContextFilter === loc
                      ? 'bg-[#001F54] text-white'
                      : 'text-slate-600 hover:text-[#001F54] bg-white/70'
                  }`}
                >
                  {loc}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* MODE 1: Contextual Lexicon & Pronunciation Explorer */}
      {activeMode === 'explorer' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-white px-4 py-3 rounded-lg border border-slate-200">
            <span>
              Pronunciation Support: Click <strong>Listen &amp; Practice</strong> on at least 4 items to hear the base phrase, the <em>-ing</em> form, and the full sentence.
            </span>
            <span className="font-mono-tabular text-[#007A87] font-semibold">
              Explored: {Object.keys(inspectedItemIds).length} / 12 items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item, idx) => {
              const isSpeaking = speakingId === item.id;
              const isInspected = inspectedItemIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    {/* Unboxed clean metadata row */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular text-[#B57C00] font-semibold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#001F54] font-medium">{item.hubContext}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {item.spellingCategory === 'regular'
                            ? 'Verb + -ing'
                            : item.spellingCategory === 'drop-e'
                            ? 'Drop silent -e + -ing'
                            : 'Double consonant + -ing'}
                        </span>
                      </div>
                      {isInspected && (
                        <span className="inline-flex items-center gap-1 text-[#007A87] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Practiced
                        </span>
                      )}
                    </div>

                    {/* Lexical Pair: Base vs -ing */}
                    <div className="pt-1">
                      <h3 className="text-xl font-editorial font-medium text-[#001F54]">
                        {item.basePhrase}
                      </h3>
                      <p className="text-sm font-medium text-[#007A87] mt-0.5">
                        Present Continuous form: <span className="underline decoration-[#007A87]/40 underline-offset-4">{item.ingForm}</span>
                      </p>
                    </div>

                    {/* Pronunciation Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-3 bg-[#F5F8FA] rounded-md border border-slate-200/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="font-mono-tabular text-[#001F54]">{item.ipa}</span>
                        <span aria-hidden="true">·</span>
                        <span>Stress: <strong>{item.stressGuide}</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePronounce(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isSpeaking
                            ? 'bg-[#007A87] text-white'
                            : 'bg-[#001F54] text-white hover:bg-[#007A87]'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isSpeaking ? 'Playing...' : 'Listen & Practice'}</span>
                      </button>
                    </div>

                    {/* Meaning & Authentic Context */}
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <p className="text-xs text-slate-500">In the Live Dispatch:</p>
                    <p className="text-sm font-editorial italic text-[#001F54]">
                      “{item.contextSentence}”
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: Visual & Situational Recognition Challenge */}
      {activeMode === 'recognition' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-2xl font-editorial font-medium text-[#001F54]">
                Match the Camera Clue to the Action in Progress
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Read each visual observation from the live cameras and choose the matching <em>-ing</em> action phrase.
              </p>
            </div>
            {completedActivities['vocab-recognition'] && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#007A87]">
                <CheckCircle2 className="w-4 h-4" />
                Recognition Completed
              </span>
            )}
          </div>

          <div className="divide-y divide-slate-200">
            {recognitionQuestions.map((item, idx) => {
              const selected = recSelections[item.id] || '';
              const isCorrect = selected === item.ingForm;
              return (
                <div
                  key={item.id}
                  className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-tabular">
                      <span className="text-[#B57C00] font-semibold">Camera Clue 0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.hubContext}</span>
                    </div>
                    <p className="text-sm font-medium text-[#001F54]">
                      {item.visualClue}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      aria-label={`Select action phrase for clue ${idx + 1}`}
                      value={selected}
                      onChange={(e) => {
                        setRecSelections((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }));
                        setRecSubmitted(false);
                      }}
                      className="px-3.5 py-2 text-sm bg-[#F5F8FA] border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#007A87]"
                    >
                      <option value="">Choose -ing action phrase...</option>
                      {recognitionQuestions.map((opt) => (
                        <option key={opt.id} value={opt.ingForm}>
                          {opt.ingForm}
                        </option>
                      ))}
                    </select>

                    {recSubmitted && (
                      <div className="w-24 text-xs font-medium flex items-center gap-1">
                        {isCorrect ? (
                          <span className="text-[#007A87] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            Correct
                          </span>
                        ) : (
                          <span className="text-[#B57C00] inline-flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Revise
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCheckRecognition}
              className="px-5 py-2.5 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Check All Matches
            </button>
            {recSubmitted && (
              <button
                type="button"
                onClick={handleResetRecognition}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#001F54] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Matches</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: Active Retrieval in Live Sentences */}
      {activeMode === 'retrieval' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-editorial font-medium text-[#001F54]">
                Complete the Live Field Updates
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Type the complete Present Continuous verb form (<code className="font-mono-tabular text-[#007A87]">am / is / are + verb-ing</code>) to finish each live sentence. Pay attention to whether the subject is singular or plural, and check if the verb drops a silent <em>-e</em>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {retrievalQuestions.map((item, idx) => {
                const userVal = retInputs[item.id] || '';
                const isSub = retSubmitted[item.id];
                const isCorrect =
                  normalizeAnswer(userVal) === normalizeAnswer(item.retrievalAnswer);

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-lg bg-[#F5F8FA] border border-slate-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Field Sentence 0{idx + 1} · {item.hubContext}</span>
                        <span className="text-[#007A87] font-medium">Subject: {item.retrievalSubject}</span>
                      </div>
                      <p className="text-sm font-medium text-[#001F54] leading-relaxed">
                        {item.retrievalPrompt}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userVal}
                          onChange={(e) => {
                            setRetInputs((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }));
                            setRetSubmitted((prev) => ({
                              ...prev,
                              [item.id]: false,
                            }));
                          }}
                          placeholder="e.g., is pointing / are organizing"
                          className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#007A87]"
                        />
                        <button
                          type="button"
                          onClick={() => handleCheckRetrievalItem(item)}
                          className="px-3.5 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Check
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
                          <div>
                            {isCorrect ? (
                              <span>
                                <strong>Correct:</strong> “{item.retrievalAnswer}” matches the subject <em>{item.retrievalSubject}</em>.
                              </span>
                            ) : (
                              <span>
                                <strong>Hint:</strong> Combine the auxiliary for <em>{item.retrievalSubject}</em> (am / is / are) with the <em>-ing</em> form of <strong>{item.verbBase}</strong> ({item.verbIng}).
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onNavigateBack}
          className="px-4 py-2.5 text-sm font-medium text-[#001F54] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 01. Live World</span>
        </button>

        <button
          type="button"
          onClick={onNavigateNext}
          className="px-5 py-2.5 text-sm font-medium bg-[#001F54] text-white rounded-lg hover:bg-[#007A87] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Continue to 03. Grammar Discovery Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
