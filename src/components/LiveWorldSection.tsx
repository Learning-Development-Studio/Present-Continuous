import React, { useState } from 'react';
import {
  LIVE_DISPATCHES,
  READING_MESSAGE_FEED,
  LiveDispatch,
} from '../data/curriculumContent';
import { ResilientImage } from './ResilientImage';
import {
  CheckCircle2,
  AlertCircle,
  Eye,
  RotateCcw,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

interface LiveWorldSectionProps {
  onCompleteActivity: (activityId: string) => void;
  completedActivities: Record<string, boolean>;
  onNavigateNext: () => void;
}

export const LiveWorldSection: React.FC<LiveWorldSectionProps> = ({
  onCompleteActivity,
  completedActivities,
  onNavigateNext,
}) => {
  const [activeCityId, setActiveCityId] = useState<string>('madrid');
  const [highlightGrammar, setHighlightGrammar] = useState<boolean>(true);
  const [selectedNote, setSelectedNote] = useState<{
    phrase: string;
    type: string;
    note: string;
  } | null>(null);

  // Dispatch comprehension state
  const [dispatchAnswers, setDispatchAnswers] = useState<Record<string, number>>({});
  const [dispatchSubmitted, setDispatchSubmitted] = useState<Record<string, boolean>>({});

  // Reading Message Feed state
  const [feedSenderSelections, setFeedSenderSelections] = useState<Record<string, string>>({});
  const [feedInferenceSelections, setFeedInferenceSelections] = useState<Record<string, number>>({});
  const [feedSubmitted, setFeedSubmitted] = useState<Record<string, boolean>>({});

  const currentDispatch: LiveDispatch =
    LIVE_DISPATCHES.find((d) => d.id === activeCityId) || LIVE_DISPATCHES[0];

  const handleDispatchSubmit = (dispatchId: string, correctIdx: number) => {
    if (dispatchAnswers[dispatchId] === undefined) return;
    setDispatchSubmitted((prev) => ({ ...prev, [dispatchId]: true }));
    if (dispatchAnswers[dispatchId] === correctIdx) {
      onCompleteActivity(`dispatch-${dispatchId}`);
    }
  };

  const handleDispatchReset = (dispatchId: string) => {
    setDispatchSubmitted((prev) => ({ ...prev, [dispatchId]: false }));
    setDispatchAnswers((prev) => {
      const next = { ...prev };
      delete next[dispatchId];
      return next;
    });
  };

  const handleFeedCheck = (msgId: string, correctSender: string, correctInfIdx: number) => {
    if (
      !feedSenderSelections[msgId] ||
      feedInferenceSelections[msgId] === undefined
    ) {
      return;
    }
    setFeedSubmitted((prev) => ({ ...prev, [msgId]: true }));
    if (
      feedSenderSelections[msgId] === correctSender &&
      feedInferenceSelections[msgId] === correctInfIdx
    ) {
      onCompleteActivity(`reading-${msgId}`);
    }
  };

  const handleFeedReset = (msgId: string) => {
    setFeedSubmitted((prev) => ({ ...prev, [msgId]: false }));
  };

  const renderHighlightedParagraph = (
    text: string,
    highlights: { phrase: string; type: 'affirmative' | 'negative' | 'question' | 'time'; note: string }[]
  ) => {
    if (!highlightGrammar) {
      return <span>{text}</span>;
    }

    let segments: Array<{
      text: string;
      highlight?: { phrase: string; type: 'affirmative' | 'negative' | 'question' | 'time'; note: string };
    }> = [{ text }];

    highlights.forEach((hl) => {
      const nextSegments: typeof segments = [];
      segments.forEach((seg) => {
        if (seg.highlight) {
          nextSegments.push(seg);
          return;
        }
        const index = seg.text.indexOf(hl.phrase);
        if (index === -1) {
          nextSegments.push(seg);
        } else {
          const before = seg.text.slice(0, index);
          const match = seg.text.slice(index, index + hl.phrase.length);
          const after = seg.text.slice(index + hl.phrase.length);
          if (before) nextSegments.push({ text: before });
          nextSegments.push({ text: match, highlight: hl });
          if (after) nextSegments.push({ text: after });
        }
      });
      segments = nextSegments;
    });

    return (
      <>
        {segments.map((seg, i) => {
          if (!seg.highlight) {
            return <React.Fragment key={i}>{seg.text}</React.Fragment>;
          }
          const colorStyle =
            seg.highlight.type === 'affirmative'
              ? 'bg-[#001F54]/10 text-[#001F54] border-b-2 border-[#001F54] hover:bg-[#001F54]/20'
              : seg.highlight.type === 'negative'
              ? 'bg-[#B57C00]/15 text-[#7A5200] border-b-2 border-[#B57C00] hover:bg-[#B57C00]/25'
              : seg.highlight.type === 'question'
              ? 'bg-[#007A87]/12 text-[#005A64] border-b-2 border-[#007A87] hover:bg-[#007A87]/20'
              : 'bg-slate-200/80 text-slate-900 border-b-2 border-slate-600 hover:bg-slate-300/80';

          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedNote(seg.highlight!)}
              className={`inline px-1 py-0.5 mx-0.5 font-medium transition-colors cursor-pointer rounded-sm ${colorStyle}`}
              title="Click to inspect how this phrase works"
            >
              {seg.text}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold">
            01 / Live Global Observation · Contextual Exposure &amp; Reading
          </p>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Simultaneous Time: 15:00 UTC · 3 Active Dispatches
          </p>
        </div>
        <h2
          className="text-3xl lg:text-4xl font-editorial font-medium text-[#001F54] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Three Cities, One Exact Moment
        </h2>
        <p className="mt-3 text-base text-slate-700 max-w-2xl leading-relaxed">
          At 15:00 UTC, people in different time zones are in the middle of their day.
          Explore the three live dispatches below to observe what is happening right now,
          click any underlined structure to inspect how it works, and verify your observations.
        </p>
      </div>

      {/* Interactive City Switcher & Grammar Highlight Toolbar */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#EBF1F6] p-3 rounded-lg border border-slate-200">
          {/* Functional Segmented Control for Cities */}
          <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Select city dispatch">
            {LIVE_DISPATCHES.map((dispatch) => {
              const isSelected = dispatch.id === activeCityId;
              const isDone = completedActivities[`dispatch-${dispatch.id}`];
              return (
                <button
                  key={dispatch.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCityId(dispatch.id);
                    setSelectedNote(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                      : 'text-slate-600 hover:text-[#001F54] hover:bg-white/50'
                  }`}
                >
                  <span>{dispatch.city}</span>
                  <span className="text-xs text-slate-400 font-mono-tabular">
                    {dispatch.localTime}
                  </span>
                  {isDone && (
                    <CheckCircle2
                      className="w-4 h-4 text-[#007A87] shrink-0"
                      aria-label="Completed"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Toggle Language Lens */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHighlightGrammar((prev) => !prev)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                highlightGrammar
                  ? 'bg-[#001F54] text-white border-[#001F54]'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>
                {highlightGrammar ? 'Language Lens: On' : 'Language Lens: Off'}
              </span>
            </button>
          </div>
        </div>

        {/* Active Dispatch Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white p-6 lg:p-8 rounded-xl border border-slate-200">
          {/* Left Column: Documentary Photograph */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative overflow-hidden rounded-lg bg-[#001F54] aspect-4/3">
              <ResilientImage
                src={currentDispatch.image}
                alt={currentDispatch.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001F54]/90 via-[#001F54]/45 to-transparent p-4 text-white">
                <div className="flex items-center gap-2 text-xs text-slate-100 font-mono-tabular">
                  <span>{currentDispatch.city}, {currentDispatch.country}</span>
                  <span aria-hidden="true" className="text-[#E5A922]">·</span>
                  <span>{currentDispatch.localTime}</span>
                  <span aria-hidden="true" className="text-[#E5A922]">·</span>
                  <span>{currentDispatch.locationTag}</span>
                </div>
              </div>
            </div>
            <p className="text-xs font-editorial italic text-slate-500 mt-3">
              {currentDispatch.figureCaption}
            </p>
          </div>

          {/* Right Column: Editorial Narrative + Interactive Observation Check */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span>Featured Subject: {currentDispatch.person}</span>
                <span aria-hidden="true" className="text-[#B57C00]">·</span>
                <span className="text-[#007A87] font-medium">{currentDispatch.role}</span>
              </div>
              <h3 className="text-2xl font-editorial font-medium text-[#001F54] mb-4">
                {currentDispatch.headline}
              </h3>

              <div className="space-y-4 text-base text-slate-800 leading-relaxed max-w-prose">
                {currentDispatch.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? 'first-letter:text-3xl first-letter:font-editorial first-letter:font-semibold first-letter:text-[#001F54] first-letter:mr-1' : ''}>
                    {renderHighlightedParagraph(p.text, p.highlights)}
                  </p>
                ))}
              </div>

              {/* Legend & Active Note Callout */}
              {highlightGrammar && (
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                    <span>Click any underlined phrase to inspect:</span>
                    <span className="underline decoration-[#001F54] decoration-2 font-medium text-[#001F54]">
                      Affirmative
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="underline decoration-[#B57C00] decoration-2 font-medium text-[#7A5200]">
                      Negative
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="underline decoration-[#007A87] decoration-2 font-medium text-[#005A64]">
                      Question
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="underline decoration-slate-600 decoration-2 font-medium text-slate-900">
                      Time Expression
                    </span>
                  </div>

                  {selectedNote && (
                    <div className="mt-3 p-3.5 bg-[#F5F8FA] rounded-lg border border-[#007A87]/30 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-tabular font-semibold text-[#001F54]">
                          “{selectedNote.phrase}”
                        </span>
                        <span className="text-xs text-[#007A87] font-medium capitalize">
                          {selectedNote.type} structure
                        </span>
                      </div>
                      <p className="text-slate-700 mt-1 text-xs leading-relaxed">
                        {selectedNote.note}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Comprehension Verification */}
            <div className="p-5 bg-[#F5F8FA] rounded-lg border border-slate-200 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider text-[#001F54] font-semibold">
                  Observation Check · {currentDispatch.city}
                </span>
                {completedActivities[`dispatch-${currentDispatch.id}`] && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#007A87]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-[#001F54]">
                {currentDispatch.quickObservationQuestion.question}
              </p>
              <div className="space-y-2">
                {currentDispatch.quickObservationQuestion.options.map((opt, idx) => {
                  const isSelected = dispatchAnswers[currentDispatch.id] === idx;
                  const isSubmitted = dispatchSubmitted[currentDispatch.id];
                  const isCorrect = idx === currentDispatch.quickObservationQuestion.correctIndex;

                  let optionStyle =
                    'bg-white border-slate-200 text-slate-800 hover:border-[#007A87]';
                  if (isSelected && !isSubmitted) {
                    optionStyle = 'bg-[#001F54]/5 border-[#001F54] text-[#001F54] font-medium';
                  } else if (isSubmitted && isSelected && isCorrect) {
                    optionStyle = 'bg-[#007A87]/10 border-[#007A87] text-[#001F54] font-medium';
                  } else if (isSubmitted && isSelected && !isCorrect) {
                    optionStyle = 'bg-[#B57C00]/10 border-[#B57C00] text-[#7A5200]';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted && dispatchAnswers[currentDispatch.id] === currentDispatch.quickObservationQuestion.correctIndex}
                      onClick={() => {
                        setDispatchAnswers((prev) => ({ ...prev, [currentDispatch.id]: idx }));
                        setDispatchSubmitted((prev) => ({ ...prev, [currentDispatch.id]: false }));
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-md border text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isSelected && (
                        isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0" />
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  disabled={dispatchAnswers[currentDispatch.id] === undefined}
                  onClick={() =>
                    handleDispatchSubmit(
                      currentDispatch.id,
                      currentDispatch.quickObservationQuestion.correctIndex
                    )
                  }
                  className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Check Observation
                </button>

                {dispatchSubmitted[currentDispatch.id] && (
                  <button
                    type="button"
                    onClick={() => handleDispatchReset(currentDispatch.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#001F54] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {dispatchSubmitted[currentDispatch.id] && (
                <div
                  className={`p-3 rounded-md text-xs leading-relaxed flex items-start gap-2 ${
                    dispatchAnswers[currentDispatch.id] ===
                    currentDispatch.quickObservationQuestion.correctIndex
                      ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                      : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                  }`}
                >
                  {dispatchAnswers[currentDispatch.id] ===
                  currentDispatch.quickObservationQuestion.correctIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold">
                      {dispatchAnswers[currentDispatch.id] ===
                      currentDispatch.quickObservationQuestion.correctIndex
                        ? 'Observation Confirmed: '
                        : 'Take Another Look: '}
                    </span>
                    {dispatchAnswers[currentDispatch.id] ===
                    currentDispatch.quickObservationQuestion.correctIndex
                      ? currentDispatch.quickObservationQuestion.explanation
                      : 'Read the two paragraphs above carefully to see what is happening in this city right now.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Component G: Reading Experience — Live Digital Message Feed & Inference */}
      <div className="pt-8 border-t border-slate-200 space-y-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Reading &amp; Interpretation · Incoming Digital Field Feed</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-editorial font-medium text-[#001F54]">
            Who Is Sending Each Live Update?
          </h3>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            Three short digital messages just arrived on the global observation desk,
            but the sender names are missing. Read each message carefully, match it to
            the person sending it, and answer the interpretation question.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {READING_MESSAGE_FEED.map((msg) => {
            const selectedSender = feedSenderSelections[msg.id] || '';
            const selectedInf = feedInferenceSelections[msg.id];
            const isSubmitted = feedSubmitted[msg.id];
            const isSenderCorrect = selectedSender === msg.correctSender;
            const isInfCorrect = selectedInf === msg.correctInferenceIndex;
            const isAllCorrect = isSubmitted && isSenderCorrect && isInfCorrect;

            return (
              <div
                key={msg.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono-tabular border-b border-slate-200 pb-3">
                    <span className="text-[#001F54] font-medium">{msg.senderCode}</span>
                    <span className="text-[#B57C00]">{msg.timestamp}</span>
                  </div>

                  <blockquote className="text-sm text-slate-900 leading-relaxed font-editorial italic bg-[#F5F8FA] p-4 rounded-lg border border-slate-200/80">
                    {msg.messageText}
                  </blockquote>

                  {/* Step 1: Identify Sender */}
                  <div className="space-y-2">
                    <label
                      htmlFor={`sender-${msg.id}`}
                      className="block text-xs font-semibold text-[#001F54]"
                    >
                      1. Who is sending this message?
                    </label>
                    <select
                      id={`sender-${msg.id}`}
                      value={selectedSender}
                      onChange={(e) => {
                        setFeedSenderSelections((prev) => ({
                          ...prev,
                          [msg.id]: e.target.value,
                        }));
                        setFeedSubmitted((prev) => ({ ...prev, [msg.id]: false }));
                      }}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#007A87]"
                    >
                      <option value="">Select sender...</option>
                      {msg.senderOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Inference Question */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-[#001F54]">
                      2. {msg.inferenceQuestion}
                    </p>
                    <div className="space-y-1.5">
                      {msg.inferenceOptions.map((opt, idx) => {
                        const isPicked = selectedInf === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setFeedInferenceSelections((prev) => ({
                                ...prev,
                                [msg.id]: idx,
                              }));
                              setFeedSubmitted((prev) => ({ ...prev, [msg.id]: false }));
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md border text-xs transition-colors cursor-pointer ${
                              isPicked
                                ? 'bg-[#001F54]/5 border-[#001F54] text-[#001F54] font-medium'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-[#007A87]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Action & Feedback */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      disabled={!selectedSender || selectedInf === undefined}
                      onClick={() =>
                        handleFeedCheck(
                          msg.id,
                          msg.correctSender,
                          msg.correctInferenceIndex
                        )
                      }
                      className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Verify Message
                    </button>

                    {isSubmitted && (
                      <button
                        type="button"
                        onClick={() => handleFeedReset(msg.id)}
                        className="text-xs text-slate-500 hover:text-[#001F54] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    )}
                  </div>

                  {isSubmitted && (
                    <div
                      className={`p-3 rounded-md text-xs leading-relaxed flex items-start gap-2 ${
                        isAllCorrect
                          ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                          : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                      }`}
                    >
                      {isAllCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {isAllCorrect
                            ? 'Verified · Sender & Inference Accurate'
                            : !isSenderCorrect
                            ? 'Check the sender clue again.'
                            : 'Sender is right! Check question 2 again.'}
                        </p>
                        <p className="mt-1">
                          {isAllCorrect
                            ? msg.explanation
                            : 'Look closely at the actions and objects in the message (e.g., wooden box of soil, Door 4 "ON AIR" sign, or server speed test).'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Next: Explore the 12 core action phrases from these three cities.
        </p>
        <button
          type="button"
          onClick={onNavigateNext}
          className="px-5 py-2.5 text-sm font-medium bg-[#001F54] text-white rounded-lg hover:bg-[#007A87] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Continue to 02. Active Vocabulary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
