import React, { useState } from 'react';
import {
  GRAMMAR_SUBJECTS,
  GRAMMAR_ACTIONS,
  GRAMMAR_TIME_EXPRESSIONS,
  SPELLING_LAB_ITEMS,
} from '../data/curriculumContent';
import {
  CheckCircle2,
  AlertCircle,
  Sliders,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface GrammarDiscoverySectionProps {
  onCompleteActivity: (activityId: string) => void;
  completedActivities: Record<string, boolean>;
  onNavigateBack: () => void;
  onNavigateNext: () => void;
}

export const GrammarDiscoverySection: React.FC<GrammarDiscoverySectionProps> = ({
  onCompleteActivity,
  completedActivities,
  onNavigateBack,
  onNavigateNext,
}) => {
  // Stage 1: Guided Pattern Discovery Questions
  const [discoveryAns1, setDiscoveryAns1] = useState<string>('');
  const [discoveryAns2, setDiscoveryAns2] = useState<string>('');
  const [discoveryAns3, setDiscoveryAns3] = useState<string>('');
  const [discoveryChecked, setDiscoveryChecked] = useState<boolean>(false);

  // Stage 2: Interactive Grammar Board State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('she');
  const [selectedAuxiliary, setSelectedAuxiliary] = useState<'am' | 'is' | 'are'>('is');
  const [selectedActionId, setSelectedActionId] = useState<string>('record');
  const [selectedTimeId, setSelectedTimeId] = useState<string>('right-now');
  const [sentenceMode, setSentenceMode] = useState<
    'affirmative' | 'negative' | 'yes-no' | 'wh-question'
  >('affirmative');
  const [boardInteractionsCount, setBoardInteractionsCount] = useState<number>(0);

  // Stage 3: Verb + -ing Spelling Pattern Lab
  const [spellingInputs, setSpellingInputs] = useState<Record<string, string>>({});
  const [spellingRulesPicked, setSpellingRulesPicked] = useState<Record<string, string>>({});
  const [spellingChecked, setSpellingChecked] = useState<Record<string, boolean>>({});

  // Stage 4: Meaning & Usage Contrast (Right Now vs. Habitual)
  const [usageAnswers, setUsageAnswers] = useState<Record<string, string>>({});
  const [usageChecked, setUsageChecked] = useState<boolean>(false);

  const currentSubject =
    GRAMMAR_SUBJECTS.find((s) => s.id === selectedSubjectId) || GRAMMAR_SUBJECTS[1];
  const currentAction =
    GRAMMAR_ACTIONS.find((a) => a.id === selectedActionId) || GRAMMAR_ACTIONS[1];
  const currentTime =
    GRAMMAR_TIME_EXPRESSIONS.find((t) => t.id === selectedTimeId) ||
    GRAMMAR_TIME_EXPRESSIONS[0];

  const isAgreementValid = selectedAuxiliary === currentSubject.auxiliaryAffirmative;

  const recordBoardInteraction = () => {
    setBoardInteractionsCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        onCompleteActivity('grammar-board-explored');
      }
      return next;
    });
  };

  const handleSelectSubject = (subjId: string, autoSyncAux = false) => {
    setSelectedSubjectId(subjId);
    const subj = GRAMMAR_SUBJECTS.find((s) => s.id === subjId);
    if (subj && autoSyncAux) {
      setSelectedAuxiliary(subj.auxiliaryAffirmative);
    }
    recordBoardInteraction();
  };

  const handleLoadCanonicalPreset = (
    subjId: string,
    aux: 'am' | 'is' | 'are',
    actId: string,
    timeId: string
  ) => {
    setSelectedSubjectId(subjId);
    setSelectedAuxiliary(aux);
    setSelectedActionId(actId);
    setSelectedTimeId(timeId);
    setSentenceMode('affirmative');
    recordBoardInteraction();
  };

  const handleCheckDiscovery = () => {
    setDiscoveryChecked(true);
    if (
      discoveryAns1 === 'be-plus-ing' &&
      discoveryAns2 === 'before-subject' &&
      discoveryAns3 === 'ongoing-now'
    ) {
      onCompleteActivity('grammar-pattern-discovery');
    }
  };

  const handleCheckSpellingItem = (id: string, targetIng: string, targetRule: string) => {
    setSpellingChecked((prev) => ({ ...prev, [id]: true }));
    const typed = (spellingInputs[id] || '').trim().toLowerCase();
    const pickedRule = spellingRulesPicked[id] || '';
    if (typed === targetIng && pickedRule === targetRule) {
      onCompleteActivity(`spelling-${id}`);
    }
  };

  const usageContrastItems = [
    {
      id: 'u1',
      sentence: 'Elena is recording a live conversation right now.',
      correctMeaning: 'now',
      explanation: '"is recording" + "right now" describes an action in progress at this exact moment.',
    },
    {
      id: 'u2',
      sentence: 'Tariq and his neighbors are organizing a rooftop project this week.',
      correctMeaning: 'around-now',
      explanation: '"are organizing" + "this week" describes an ongoing project happening around the present, even if they stop to rest for an hour.',
    },
    {
      id: 'u3',
      sentence: 'Elena records a new podcast episode every Tuesday.',
      correctMeaning: 'habit',
      explanation: '"records" (Simple Present) + "every Tuesday" describes a regular habit or routine, not an action happening only right now.',
    },
  ];

  const handleCheckUsage = () => {
    setUsageChecked(true);
    const allRight = usageContrastItems.every(
      (item) => usageAnswers[item.id] === item.correctMeaning
    );
    if (allRight) {
      onCompleteActivity('grammar-usage-contrast');
    }
  };

  // Construct live sentence output based on board state
  const getConstructedSentence = () => {
    const cleanSubject = currentSubject.label.split(' ')[0];
    const lowerSubject =
      cleanSubject === 'I' ? 'I' : cleanSubject.toLowerCase();
    const timeNoPeriod = currentTime.label.replace('.', '');

    if (sentenceMode === 'affirmative') {
      return `${cleanSubject} ${selectedAuxiliary} ${currentAction.ing} ${currentAction.complement} ${currentTime.label}`;
    }
    if (sentenceMode === 'negative') {
      const negAux =
        selectedAuxiliary === 'am'
          ? 'am not'
          : selectedAuxiliary === 'is'
          ? 'isn’t'
          : 'aren’t';
      return `${cleanSubject} ${negAux} ${currentAction.ing} ${currentAction.complement} ${currentTime.label}`;
    }
    if (sentenceMode === 'yes-no') {
      const capAux =
        selectedAuxiliary.charAt(0).toUpperCase() + selectedAuxiliary.slice(1);
      return `${capAux} ${lowerSubject} ${currentAction.ing} ${currentAction.complement} ${timeNoPeriod}?`;
    }
    // wh-question
    return `${currentAction.whWord} ${selectedAuxiliary} ${lowerSubject} ${currentAction.whQuestionComplement} ${timeNoPeriod}?`;
  };

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold">
            03 / Guided Grammar Investigation · System &amp; Structure
          </p>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Target System: Subject + am / is / are + verb-ing
          </p>
        </div>
        <h2
          className="text-3xl lg:text-4xl font-editorial font-medium text-[#001F54] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          How Present Continuous Works
        </h2>
        <p className="mt-3 text-base text-slate-700 max-w-2xl leading-relaxed">
          Instead of memorizing a list of rules, investigate the sentences you just read
          from Madrid, Toronto, and London. Observe how the parts fit together, test combinations
          on the Interactive Grammar Board, and discover the spelling patterns for <em>-ing</em>.
        </p>
      </div>

      {/* STAGE 1: Observation & Pattern Investigation */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold">
              Investigation Step 01 · Observe Authentic Examples
            </p>
            <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
              Spot the Recurring Pattern
            </h3>
          </div>
          {completedActivities['grammar-pattern-discovery'] && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#007A87]">
              <CheckCircle2 className="w-4 h-4" />
              Pattern Discovered
            </span>
          )}
        </div>

        {/* Comparison Table of Observed Sentences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-2">
            <p className="text-xs font-mono-tabular text-[#007A87] font-semibold">Affirmative Statements</p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">I am wearing</strong> studio headphones right now.
            </p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">She is recording</strong> a podcast in Studio 4.
            </p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">They are discussing</strong> an idea today.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-2">
            <p className="text-xs font-mono-tabular text-[#B57C00] font-semibold">Negative Statements</p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">I am not sitting</strong> in a quiet studio today.
            </p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">Elena isn’t checking</strong> her phone right now.
            </p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">They aren’t taking</strong> a coffee break.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-2">
            <p className="text-xs font-mono-tabular text-[#007A87] font-semibold">Questions &amp; Short Answers</p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">Are they working</strong> inside an office? — <em>No, they aren’t.</em>
            </p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">What are you discussing</strong> today?
            </p>
            <p className="text-sm text-slate-900">
              <strong className="text-[#001F54]">Why are they working</strong> at the same desk?
            </p>
          </div>
        </div>

        {/* 3 Guided Discovery Prompts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <label htmlFor="disc-1" className="block text-xs font-semibold text-[#001F54]">
              1. Look at the bold verbs above. Which two elements are ALWAYS present in a Present Continuous action?
            </label>
            <select
              id="disc-1"
              value={discoveryAns1}
              onChange={(e) => {
                setDiscoveryAns1(e.target.value);
                setDiscoveryChecked(false);
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900"
            >
              <option value="">Choose your observation...</option>
              <option value="only-ing">Only the verb + -ing (e.g., She recording)</option>
              <option value="be-plus-ing">An auxiliary verb (am / is / are) + verb-ing</option>
              <option value="do-plus-base">Do / Does + base verb</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="disc-2" className="block text-xs font-semibold text-[#001F54]">
              2. Compare “They are working” with “Are they working?”. What changes when we ask a question?
            </label>
            <select
              id="disc-2"
              value={discoveryAns2}
              onChange={(e) => {
                setDiscoveryAns2(e.target.value);
                setDiscoveryChecked(false);
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900"
            >
              <option value="">Choose your observation...</option>
              <option value="before-subject">The auxiliary (Am / Is / Are) moves BEFORE the subject</option>
              <option value="remove-ing">We remove the -ing ending from the verb</option>
              <option value="nothing">Nothing changes except the question mark</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="disc-3" className="block text-xs font-semibold text-[#001F54]">
              3. Look at the time expressions (right now, at the moment, today, this week). When are these actions happening?
            </label>
            <select
              id="disc-3"
              value={discoveryAns3}
              onChange={(e) => {
                setDiscoveryAns3(e.target.value);
                setDiscoveryChecked(false);
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900"
            >
              <option value="">Choose your observation...</option>
              <option value="past">Finished actions in the past</option>
              <option value="ongoing-now">Actions in progress right now or around the present</option>
              <option value="permanent">Permanent facts that never change</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            disabled={!discoveryAns1 || !discoveryAns2 || !discoveryAns3}
            onClick={handleCheckDiscovery}
            className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
          >
            Verify Pattern Discovery
          </button>

          {discoveryChecked && (
            <div
              className={`flex-1 p-3 rounded-md text-xs flex items-center gap-2 ${
                discoveryAns1 === 'be-plus-ing' &&
                discoveryAns2 === 'before-subject' &&
                discoveryAns3 === 'ongoing-now'
                  ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                  : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
              }`}
            >
              {discoveryAns1 === 'be-plus-ing' &&
              discoveryAns2 === 'before-subject' &&
              discoveryAns3 === 'ongoing-now' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0" />
                  <span>
                    <strong>Core System Confirmed:</strong> Present Continuous always pairs{' '}
                    <strong>am / is / are</strong> with <strong>verb + -ing</strong> for actions in progress right now or around the present, and places <strong>Am / Is / Are</strong> before the subject in questions.
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0" />
                  <span>
                    Check the three example boxes above again: notice how every sentence has <em>am / is / are</em> + <em>verb-ing</em>, and how questions begin with <em>Are they...</em> or <em>What are you...</em>
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* STAGE 2: Interactive Grammar Board (Desktop & Mobile Responsive) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Investigation Step 02 · Interactive Grammar Board</span>
            </div>
            <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
              Manipulate &amp; Test the Sentence Architecture
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Select a canonical reference row or manipulate the Subject, Auxiliary, Verb + <em>-ing</em>, Complement, and Sentence Form below to observe how the structure adapts in real time.
            </p>
          </div>

          <div className="text-xs font-mono-tabular text-[#007A87] font-semibold">
            Board Manipulations: {boardInteractionsCount} {completedActivities['grammar-board-explored'] ? '· Completed' : '(Try 3+ changes)'}
          </div>
        </div>

        {/* Canonical Reference Matrix (Required by Brief Section 5.D) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Core Reference Matrix (Click any row to load into the interactive board)
            </p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#001F54] text-white border-b border-slate-200 text-xs font-mono-tabular uppercase">
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 text-[#E5A922]">Auxiliary</th>
                  <th className="py-3 px-4">Verb + -ing</th>
                  <th className="py-3 px-4">Complement</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-[#F5F8FA]">
                <tr
                  onClick={() => handleLoadCanonicalPreset('i', 'am', 'work', 'right-now')}
                  className="hover:bg-[#007A87]/10 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-semibold text-[#001F54]">I</td>
                  <td className="py-3 px-4 font-mono-tabular text-[#007A87] font-semibold">am</td>
                  <td className="py-3 px-4 font-medium text-slate-900">working</td>
                  <td className="py-3 px-4 text-slate-700">right now.</td>
                  <td className="py-3 px-4 text-right text-xs text-[#007A87] font-medium">Load Row →</td>
                </tr>
                <tr
                  onClick={() => handleLoadCanonicalPreset('she', 'is', 'record', 'right-now')}
                  className="hover:bg-[#007A87]/10 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-semibold text-[#001F54]">She</td>
                  <td className="py-3 px-4 font-mono-tabular text-[#007A87] font-semibold">is</td>
                  <td className="py-3 px-4 font-medium text-slate-900">recording</td>
                  <td className="py-3 px-4 text-slate-700">a podcast.</td>
                  <td className="py-3 px-4 text-right text-xs text-[#007A87] font-medium">Load Row →</td>
                </tr>
                <tr
                  onClick={() => handleLoadCanonicalPreset('they', 'are', 'discuss', 'today')}
                  className="hover:bg-[#007A87]/10 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-semibold text-[#001F54]">They</td>
                  <td className="py-3 px-4 font-mono-tabular text-[#007A87] font-semibold">are</td>
                  <td className="py-3 px-4 font-medium text-slate-900">discussing</td>
                  <td className="py-3 px-4 text-slate-700">an idea.</td>
                  <td className="py-3 px-4 text-right text-xs text-[#007A87] font-medium">Load Row →</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sentence Mode Switcher (Affirmative, Negative, Yes/No Question, Wh- Question) */}
        <div className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            1. Select Sentence Form to Compare Word Order
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                { id: 'affirmative', label: 'Affirmative Statement' },
                { id: 'negative', label: 'Negative Statement' },
                { id: 'yes-no', label: 'Yes/No Question' },
                { id: 'wh-question', label: 'Wh- Question' },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setSentenceMode(mode.id);
                  recordBoardInteraction();
                }}
                className={`px-3.5 py-2.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer text-center ${
                  sentenceMode === mode.id
                    ? 'bg-[#001F54] text-white border-[#001F54]'
                    : 'bg-[#F5F8FA] text-slate-700 border-slate-200 hover:border-[#007A87]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Interactive Builder Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: Subject */}
          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="gb-subject" className="text-xs font-mono-tabular uppercase font-semibold text-[#001F54]">
                Subject
              </label>
              <button
                type="button"
                onClick={() => handleSelectSubject(selectedSubjectId, true)}
                className="text-xs text-[#007A87] hover:underline cursor-pointer font-medium"
              >
                Auto-match aux
              </button>
            </div>
            <select
              id="gb-subject"
              value={selectedSubjectId}
              onChange={(e) => handleSelectSubject(e.target.value, false)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md font-medium text-slate-900"
            >
              {GRAMMAR_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              Group: {currentSubject.pronounGroup === 'I' ? 'First-person singular (I)' : currentSubject.pronounGroup === 'singular' ? 'Third-person singular (he/she/it)' : 'Plural / second-person (we/you/they)'}
            </p>
          </div>

          {/* Column 2: Auxiliary Verb (Test Agreement!) */}
          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-3">
            <span className="block text-xs font-mono-tabular uppercase font-semibold text-[#001F54]">
              Auxiliary (be)
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['am', 'is', 'are'] as const).map((aux) => (
                <button
                  key={aux}
                  type="button"
                  onClick={() => {
                    setSelectedAuxiliary(aux);
                    recordBoardInteraction();
                  }}
                  className={`py-2 text-sm font-mono-tabular font-semibold rounded border transition-colors cursor-pointer ${
                    selectedAuxiliary === aux
                      ? isAgreementValid
                        ? 'bg-[#007A87] text-white border-[#007A87]'
                        : 'bg-[#B57C00] text-white border-[#B57C00]'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {aux}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              {sentenceMode === 'negative'
                ? `Negative form: ${selectedAuxiliary === 'am' ? 'am not' : selectedAuxiliary + 'n’t'}`
                : `Test subject + auxiliary agreement`}
            </p>
          </div>

          {/* Column 3: Verb + -ing & Complement */}
          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-3">
            <label htmlFor="gb-action" className="block text-xs font-mono-tabular uppercase font-semibold text-[#001F54]">
              Verb + -ing &amp; Object
            </label>
            <select
              id="gb-action"
              value={selectedActionId}
              onChange={(e) => {
                setSelectedActionId(e.target.value);
                recordBoardInteraction();
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md font-medium text-slate-900"
            >
              {GRAMMAR_ACTIONS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.ing} ({a.complement})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              {currentAction.spellingNote}
            </p>
          </div>

          {/* Column 4: Time Expression */}
          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-3">
            <label htmlFor="gb-time" className="block text-xs font-mono-tabular uppercase font-semibold text-[#001F54]">
              Time Expression
            </label>
            <select
              id="gb-time"
              value={selectedTimeId}
              onChange={(e) => {
                setSelectedTimeId(e.target.value);
                recordBoardInteraction();
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md font-medium text-slate-900"
            >
              {GRAMMAR_TIME_EXPRESSIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              Meaning: {currentTime.usage}
            </p>
          </div>
        </div>

        {/* Live Constructed Output & Immediate Diagnostic Feedback */}
        <div
          className={`p-6 rounded-xl border transition-colors ${
            isAgreementValid
              ? 'bg-[#F5F8FA] border-[#007A87]/40'
              : 'bg-[#B57C00]/10 border-[#B57C00]/50'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono-tabular uppercase tracking-wider text-slate-500">
              Live Constructed Output · {sentenceMode.replace('-', ' ')}
            </span>
            {isAgreementValid ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007A87]">
                <CheckCircle2 className="w-4 h-4" />
                Valid Subject–Auxiliary Agreement
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A5200]">
                <AlertCircle className="w-4 h-4" />
                Subject–Auxiliary Mismatch Detected
              </span>
            )}
          </div>

          <p className="text-2xl lg:text-3xl font-editorial font-medium text-[#001F54]">
            {getConstructedSentence()}
          </p>

          {/* Short answers when in Yes/No Question mode */}
          {sentenceMode === 'yes-no' && isAgreementValid && (
            <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-sm text-slate-700">
              <span className="font-mono-tabular text-xs uppercase text-[#007A87] font-semibold">
                Natural Short Answers:
              </span>
              <span>
                <strong>Affirmative:</strong> Yes, {currentSubject.shortPronoun}{' '}
                {currentSubject.auxiliaryAffirmative}.
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong>Negative:</strong> No, {currentSubject.shortPronoun}{' '}
                {currentSubject.auxiliaryNegative}.
              </span>
            </div>
          )}

          {/* Diagnostic explanation */}
          <div className="mt-3 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
            {isAgreementValid ? (
              <p>
                <strong>Why this works:</strong> The subject <strong>{currentSubject.label}</strong> takes the auxiliary{' '}
                <strong>{currentSubject.auxiliaryAffirmative}</strong> + <strong>{currentAction.ing}</strong>.
                {sentenceMode === 'yes-no' || sentenceMode === 'wh-question'
                  ? ' Because this is a question, the auxiliary comes BEFORE the subject.'
                  : ''}
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-3 text-[#7A5200]">
                <p>
                  <strong>Why this needs revision:</strong> The subject <strong>{currentSubject.label}</strong> cannot pair with <strong>“{selectedAuxiliary}”</strong>. It requires <strong>“{currentSubject.auxiliaryAffirmative}”</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedAuxiliary(currentSubject.auxiliaryAffirmative)}
                  className="px-3 py-1 bg-[#001F54] text-white rounded text-xs font-medium cursor-pointer"
                >
                  Fix Agreement to “{currentSubject.auxiliaryAffirmative}”
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STAGE 3: Discovery of Verb + -ing Spelling Patterns */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investigation Step 03 · Verb + -ing Spelling Patterns</span>
          </div>
          <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
            Three Spelling Patterns for <em>-ing</em>
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Compare the three patterns below, then transform each base verb and identify which spelling rule applies.
          </p>
        </div>

        {/* 3 Rule Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-1.5">
            <p className="text-xs font-mono-tabular font-semibold text-[#007A87] uppercase">
              Pattern 1 · Most Verbs (+ -ing)
            </p>
            <p className="text-sm text-slate-800">
              Add <strong>-ing</strong> directly to the base verb (including verbs ending in <em>-y</em>).
            </p>
            <p className="text-xs font-mono-tabular text-slate-600 pt-1">
              work → working · carry → carrying
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-1.5">
            <p className="text-xs font-mono-tabular font-semibold text-[#007A87] uppercase">
              Pattern 2 · Silent -e (Drop -e + -ing)
            </p>
            <p className="text-sm text-slate-800">
              When a verb ends in a silent <strong>-e</strong>, remove the <strong>-e</strong> and add <strong>-ing</strong>.
            </p>
            <p className="text-xs font-mono-tabular text-slate-600 pt-1">
              prepare → preparing · solve → solving
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-1.5">
            <p className="text-xs font-mono-tabular font-semibold text-[#007A87] uppercase">
              Pattern 3 · Short CVC (Double + -ing)
            </p>
            <p className="text-sm text-slate-800">
              For short 1-syllable verbs ending in <strong>Consonant–Vowel–Consonant</strong>, double the final consonant.
            </p>
            <p className="text-xs font-mono-tabular text-slate-600 pt-1">
              sit → sitting · run → running
            </p>
          </div>
        </div>

        {/* Interactive Spelling Transformer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {SPELLING_LAB_ITEMS.map((item) => {
            const typed = (spellingInputs[item.id] || '').trim().toLowerCase();
            const pickedRule = spellingRulesPicked[item.id] || '';
            const isChecked = spellingChecked[item.id];
            const isBothCorrect =
              isChecked && typed === item.correctIng && pickedRule === item.ruleType;

            return (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-[#F5F8FA] border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono-tabular font-semibold text-[#001F54]">
                      Base verb: “{item.baseVerb}”
                    </span>
                    {isBothCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-[#007A87]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 italic">{item.contextClue}</p>

                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      aria-label={`Type the -ing form for ${item.baseVerb}`}
                      value={spellingInputs[item.id] || ''}
                      onChange={(e) => {
                        setSpellingInputs((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }));
                        setSpellingChecked((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      placeholder={`Type ${item.baseVerb} + ing...`}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded text-slate-900"
                    />

                    <select
                      aria-label={`Select spelling pattern for ${item.baseVerb}`}
                      value={pickedRule}
                      onChange={(e) => {
                        setSpellingRulesPicked((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }));
                        setSpellingChecked((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-800"
                    >
                      <option value="">Which spelling pattern?</option>
                      <option value="regular">Pattern 1: Regular (+ -ing)</option>
                      <option value="drop-e">Pattern 2: Drop silent -e (+ -ing)</option>
                      <option value="double-consonant">
                        Pattern 3: Double final consonant (+ -ing)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    disabled={!spellingInputs[item.id] || !pickedRule}
                    onClick={() =>
                      handleCheckSpellingItem(item.id, item.correctIng, item.ruleType)
                    }
                    className="w-full py-1.5 text-xs font-medium bg-[#001F54] text-white rounded hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    Check Form &amp; Pattern
                  </button>

                  {isChecked && (
                    <div
                      className={`p-2.5 rounded text-xs leading-relaxed ${
                        isBothCorrect
                          ? 'bg-[#007A87]/10 text-[#001F54] border border-[#007A87]/30'
                          : 'bg-[#B57C00]/10 text-[#7A5200] border border-[#B57C00]/30'
                      }`}
                    >
                      {isBothCorrect ? (
                        <span>
                          <strong>Verified ({item.correctIng}):</strong> {item.ruleExplanation}
                        </span>
                      ) : (
                        <span>
                          <strong>Check again:</strong> {item.ruleExplanation}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STAGE 4: Guided Reflection on Meaning (Right Now vs. Around Now vs. Habitual) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold">
              Investigation Step 04 · Guided Reflection on Meaning
            </p>
            <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
              Happening Right Now, Around Now, or a Regular Habit?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Look at the verb form and time expression in each sentence below and identify its exact communicative meaning.
            </p>
          </div>
          {completedActivities['grammar-usage-contrast'] && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#007A87]">
              <CheckCircle2 className="w-4 h-4" />
              Meaning Contrast Consolidated
            </span>
          )}
        </div>

        <div className="divide-y divide-slate-200">
          {usageContrastItems.map((item) => {
            const val = usageAnswers[item.id] || '';
            const isCorrect = val === item.correctMeaning;
            return (
              <div key={item.id} className="py-4 space-y-2">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <p className="text-base font-editorial text-[#001F54]">
                    “{item.sentence}”
                  </p>
                  <select
                    aria-label={`Select meaning for ${item.sentence}`}
                    value={val}
                    onChange={(e) => {
                      setUsageAnswers((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }));
                      setUsageChecked(false);
                    }}
                    className="px-3.5 py-2 text-xs bg-[#F5F8FA] border border-slate-300 rounded-md text-slate-900 shrink-0"
                  >
                    <option value="">Select meaning...</option>
                    <option value="now">
                      Action happening at this exact moment (Present Continuous)
                    </option>
                    <option value="around-now">
                      Temporary project in progress around the present (Present Continuous)
                    </option>
                    <option value="habit">
                      Regular habit or routine (Simple Present)
                    </option>
                  </select>
                </div>

                {usageChecked && (
                  <p
                    className={`text-xs flex items-center gap-1.5 ${
                      isCorrect ? 'text-[#007A87]' : 'text-[#7A5200]'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{item.explanation}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleCheckUsage}
            className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] transition-colors cursor-pointer"
          >
            Check Meaning Reflection
          </button>
          {usageChecked && (
            <button
              type="button"
              onClick={() => {
                setUsageChecked(false);
                setUsageAnswers({});
              }}
              className="text-xs text-slate-600 hover:text-[#001F54] inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Section Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onNavigateBack}
          className="px-4 py-2.5 text-sm font-medium text-[#001F54] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 02. Active Vocabulary</span>
        </button>

        <button
          type="button"
          onClick={onNavigateNext}
          className="px-5 py-2.5 text-sm font-medium bg-[#001F54] text-white rounded-lg hover:bg-[#007A87] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Continue to 04. Listening &amp; Practice</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
