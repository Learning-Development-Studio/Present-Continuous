import React, { useState } from 'react';
import { IMAGES, CHALLENGE_HUB_ZONES, ChallengeZone } from '../data/curriculumContent';
import { ResilientImage } from './ResilientImage';
import {
  CheckCircle2,
  AlertCircle,
  Users,
  Mic,
  Send,
  ArrowLeft,
  RotateCcw,
  Radio,
  MessageCircleQuestion,
} from 'lucide-react';

interface LiveUpdateChallengeSectionProps {
  onCompleteActivity: (activityId: string) => void;
  completedActivities: Record<string, boolean>;
  onNavigateBack: () => void;
}

export const LiveUpdateChallengeSection: React.FC<LiveUpdateChallengeSectionProps> = ({
  onCompleteActivity,
  completedActivities,
  onNavigateBack,
}) => {
  // Component H1: Personal Observation Production State
  const [personalNow, setPersonalNow] = useState<string>('');
  const [personalNegative, setPersonalNegative] = useState<string>('');
  const [personalQuestion, setPersonalQuestion] = useState<string>('');
  const [personalSubmitted, setPersonalSubmitted] = useState<boolean>(false);
  const [rehearsedAloud, setRehearsedAloud] = useState<boolean>(false);

  // Component H2: Collaborative Classroom Pair Exchange State
  const [partnerRole, setPartnerRole] = useState<'partner-a' | 'partner-b'>('partner-a');
  const [pairAnswer1, setPairAnswer1] = useState<string>('');
  const [pairAnswer2, setPairAnswer2] = useState<string>('');
  const [pairSubmitted, setPairSubmitted] = useState<boolean>(false);

  // Component I: Final Communicative Challenge ("THE LIVE UPDATE") State
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-a');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportQuestions, setReportQuestions] = useState<string>('');
  const [reportBreakingResponse, setReportBreakingResponse] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);

  const activeZone: ChallengeZone =
    CHALLENGE_HUB_ZONES.find((z) => z.id === activeZoneId) || CHALLENGE_HUB_ZONES[0];

  // Linguistic evidence helpers for A1.2 Present Continuous
  const hasAffirmativeIng = (text: string) =>
    /\b(am|is|are|'m|'s|'re)\s+[a-z]+ing\b/i.test(text);

  const hasNegativeIng = (text: string) =>
    /\b(am\s+not|is\s+not|are\s+not|isn't|isn’t|aren't|aren’t|'m\s+not)\s+[a-z]+ing\b/i.test(
      text
    );

  const hasQuestionIng = (text: string) =>
    /\b(am|is|are)\s+(i|you|he|she|it|we|they|nina|sofia|liam|david|carmen|[a-z]+)\s+(and\s+[a-z]+\s+)?[a-z]+ing\b/i.test(
      text
    ) && text.includes('?');

  const handleVerifyPersonalObservation = () => {
    setPersonalSubmitted(true);
    if (
      hasAffirmativeIng(personalNow) &&
      hasNegativeIng(personalNegative) &&
      hasQuestionIng(personalQuestion)
    ) {
      onCompleteActivity('production-personal');
    }
  };

  const handleVerifyPairWork = () => {
    setPairSubmitted(true);
    if (pairAnswer1.trim().length > 5 && pairAnswer2.trim().length > 5) {
      onCompleteActivity('production-collaborative');
    }
  };

  // Evaluate Final Challenge ("THE LIVE UPDATE")
  const evidenceAffirmative = hasAffirmativeIng(reportDescription);
  const evidenceNegative = hasNegativeIng(reportDescription) || hasNegativeIng(reportBreakingResponse);
  const evidenceQuestion = hasQuestionIng(reportQuestions);
  const evidenceResponse = hasAffirmativeIng(reportBreakingResponse);

  const isChallengeComplete =
    evidenceAffirmative && evidenceNegative && evidenceQuestion && evidenceResponse;

  const handleSubmitFinalChallenge = () => {
    setChallengeSubmitted(true);
    if (isChallengeComplete) {
      onCompleteActivity('final-live-update');
    }
  };

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold">
            05 / Communicative Production &amp; Final Challenge
          </p>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Mission: THE LIVE UPDATE
          </p>
        </div>
        <h2
          className="text-3xl lg:text-4xl font-editorial font-medium text-[#001F54] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Communicate What Is Happening Now
        </h2>
        <p className="mt-3 text-base text-slate-700 max-w-2xl leading-relaxed">
          Now it is your turn to use Present Continuous to share original observations,
          exchange live information with a partner, and broadcast your final report in{' '}
          <strong>The Live Update</strong>.
        </p>
      </div>

      {/* COMPONENT H: COMMUNICATIVE PRODUCTION (Personal + Classroom Collaborative) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* H1: Personal Observation Dispatch */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 lg:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold">
                  Part A · Personal Observation
                </p>
                <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-0.5">
                  Around You Right Now
                </h3>
              </div>
              {completedActivities['production-personal'] && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#007A87]">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </span>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Look around your room, classroom, or workspace right now. Write three original sentences
              about your real situation, then practice saying them aloud.
            </p>

            {/* Scaffolding Reference Strip */}
            <div className="p-3 rounded-lg bg-[#F5F8FA] border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-[#001F54]">Helpful Scaffolding:</p>
              <p>
                • Affirmative: <em>I am sitting at my desk right now. / My classmate is writing notes.</em>
              </p>
              <p>
                • Negative: <em>I am not watching TV at the moment. / It isn’t raining outside today.</em>
              </p>
              <p>
                • Question: <em>Are you studying English right now? / What are you working on today?</em>
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <label
                  htmlFor="pers-now"
                  className="block text-xs font-semibold text-[#001F54] mb-1"
                >
                  1. Affirmative: What are you (or someone near you) doing right now?
                </label>
                <input
                  id="pers-now"
                  type="text"
                  value={personalNow}
                  onChange={(e) => {
                    setPersonalNow(e.target.value);
                    setPersonalSubmitted(false);
                  }}
                  placeholder="e.g., I am studying English at my desk right now."
                  className="w-full px-3.5 py-2 text-sm bg-[#F5F8FA] border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="pers-neg"
                  className="block text-xs font-semibold text-[#001F54] mb-1"
                >
                  2. Negative: What are you NOT doing at the moment?
                </label>
                <input
                  id="pers-neg"
                  type="text"
                  value={personalNegative}
                  onChange={(e) => {
                    setPersonalNegative(e.target.value);
                    setPersonalSubmitted(false);
                  }}
                  placeholder="e.g., I am not checking my phone at the moment."
                  className="w-full px-3.5 py-2 text-sm bg-[#F5F8FA] border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="pers-q"
                  className="block text-xs font-semibold text-[#001F54] mb-1"
                >
                  3. Question: Ask a classmate or colleague what they are doing today:
                </label>
                <input
                  id="pers-q"
                  type="text"
                  value={personalQuestion}
                  onChange={(e) => {
                    setPersonalQuestion(e.target.value);
                    setPersonalSubmitted(false);
                  }}
                  placeholder="e.g., What are you working on today?"
                  className="w-full px-3.5 py-2 text-sm bg-[#F5F8FA] border border-slate-300 rounded-md text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={!personalNow || !personalNegative || !personalQuestion}
                onClick={handleVerifyPersonalObservation}
                className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
              >
                Check My Sentences
              </button>

              <button
                type="button"
                onClick={() => setRehearsedAloud((prev) => !prev)}
                className={`px-3 py-1.5 text-xs font-medium rounded border inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  rehearsedAloud
                    ? 'bg-[#007A87] text-white border-[#007A87]'
                    : 'bg-[#F5F8FA] text-[#001F54] border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>
                  {rehearsedAloud
                    ? 'Spoken Rehearsal Completed'
                    : 'Mark Spoken Rehearsal Complete'}
                </span>
              </button>
            </div>

            {personalSubmitted && (
              <div className="p-3 rounded-md bg-[#F5F8FA] border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2">
                  {hasAffirmativeIng(personalNow) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#007A87] shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-[#B57C00] shrink-0" />
                  )}
                  <span>
                    Sentence 1 (Affirmative):{' '}
                    {hasAffirmativeIng(personalNow)
                      ? 'Uses am / is / are + verb-ing clearly.'
                      : 'Make sure to include am / is / are + a verb ending in -ing.'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNegativeIng(personalNegative) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#007A87] shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-[#B57C00] shrink-0" />
                  )}
                  <span>
                    Sentence 2 (Negative):{' '}
                    {hasNegativeIng(personalNegative)
                      ? 'Uses am not / isn’t / aren’t + verb-ing clearly.'
                      : 'Include am not, isn’t, or aren’t + verb-ing.'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasQuestionIng(personalQuestion) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#007A87] shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-[#B57C00] shrink-0" />
                  )}
                  <span>
                    Sentence 3 (Question):{' '}
                    {hasQuestionIng(personalQuestion)
                      ? 'Uses question word order (Am/Is/Are + subject + verb-ing?).'
                      : 'Remember to put Am / Is / Are before the subject and end with a question mark (?)'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* H2: Collaborative Classroom Exchange (Partner A & Partner B Information Gap) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 lg:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#B57C00] font-mono-tabular font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Part B · Collaborative Classroom Pair Task</span>
                </p>
                <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-0.5">
                  Live Control Room Information Exchange
                </h3>
              </div>
              {completedActivities['production-collaborative'] && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#007A87]">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </span>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Work with a partner in class (or switch between both roles below).{' '}
              <strong>Partner A</strong> and <strong>Partner B</strong> have different camera monitors working.
              Ask your partner questions to complete your missing log entries!
            </p>

            {/* Partner Role Switcher */}
            <div className="flex items-center gap-2 bg-[#EBF1F6] p-1.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setPartnerRole('partner-a')}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  partnerRole === 'partner-a'
                    ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                    : 'text-slate-600 hover:text-[#001F54]'
                }`}
              >
                Partner A Screen (Monitors 1 &amp; 3 Active)
              </button>
              <button
                type="button"
                onClick={() => setPartnerRole('partner-b')}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  partnerRole === 'partner-b'
                    ? 'bg-white text-[#001F54] shadow-xs border border-[#007A87]/40'
                    : 'text-slate-600 hover:text-[#001F54]'
                }`}
              >
                Partner B Screen (Monitors 2 &amp; 4 Active)
              </button>
            </div>

            {/* Partner Information Cards */}
            {partnerRole === 'partner-a' ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-1">
                  <p className="font-mono-tabular font-semibold text-[#001F54]">
                    Your Visible Camera Feeds (Answer Partner B’s questions):
                  </p>
                  <p className="text-slate-700">
                    • <strong>Monitor 1 (Nina):</strong> She is testing the broadcast camera on a tripod.
                  </p>
                  <p className="text-slate-700">
                    • <strong>Monitor 3 (David):</strong> He isn’t talking on the phone; he is typing code on his laptop.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#007A87]/10 border border-[#007A87]/30 space-y-2">
                  <p className="font-semibold text-[#001F54]">
                    Ask Partner B to find out what is happening on Monitors 2 &amp; 4:
                  </p>
                  <div>
                    <label htmlFor="pair-a1" className="block text-slate-700 mb-1">
                      Ask: <em>“What are Sofia and Liam doing at the glass board?”</em> — Record Partner B’s answer:
                    </label>
                    <input
                      id="pair-a1"
                      type="text"
                      value={pairAnswer1}
                      onChange={(e) => setPairAnswer1(e.target.value)}
                      placeholder="e.g., They are discussing an idea at the board."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="pair-a2" className="block text-slate-700 mb-1">
                      Ask: <em>“Is Carmen working on a laptop right now?”</em> — Record Partner B’s answer:
                    </label>
                    <input
                      id="pair-a2"
                      type="text"
                      value={pairAnswer2}
                      onChange={(e) => setPairAnswer2(e.target.value)}
                      placeholder="e.g., No, she isn't. She is talking on her phone."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#F5F8FA] border border-slate-200 space-y-1">
                  <p className="font-mono-tabular font-semibold text-[#001F54]">
                    Your Visible Camera Feeds (Answer Partner A’s questions):
                  </p>
                  <p className="text-slate-700">
                    • <strong>Monitor 2 (Sofia &amp; Liam):</strong> They are standing at the glass board and discussing an idea.
                  </p>
                  <p className="text-slate-700">
                    • <strong>Monitor 4 (Carmen):</strong> No, she isn’t using a laptop; she is talking on her phone by the window.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#007A87]/10 border border-[#007A87]/30 space-y-2">
                  <p className="font-semibold text-[#001F54]">
                    Ask Partner A to find out what is happening on Monitors 1 &amp; 3:
                  </p>
                  <div>
                    <label htmlFor="pair-b1" className="block text-slate-700 mb-1">
                      Ask: <em>“What is Nina doing in Zone A right now?”</em> — Record Partner A’s answer:
                    </label>
                    <input
                      id="pair-b1"
                      type="text"
                      value={pairAnswer1}
                      onChange={(e) => setPairAnswer1(e.target.value)}
                      placeholder="e.g., She is testing the camera on a tripod."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="pair-b2" className="block text-slate-700 mb-1">
                      Ask: <em>“Is David talking on the phone at the moment?”</em> — Record Partner A’s answer:
                    </label>
                    <input
                      id="pair-b2"
                      type="text"
                      value={pairAnswer2}
                      onChange={(e) => setPairAnswer2(e.target.value)}
                      placeholder="e.g., No, he isn't. He is typing code on his laptop."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              disabled={!pairAnswer1 || !pairAnswer2}
              onClick={handleVerifyPairWork}
              className="px-4 py-2 text-xs font-medium bg-[#001F54] text-white rounded-md hover:bg-[#007A87] disabled:opacity-40 transition-colors cursor-pointer"
            >
              Save Partner Exchange Log
            </button>
            {pairSubmitted && (
              <p className="text-xs text-[#007A87] flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Collaborative exchange log saved! You practiced asking and answering live information-gap questions.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* COMPONENT I: FINAL COMMUNICATIVE CHALLENGE — "THE LIVE UPDATE" */}
      <div className="pt-8 border-t border-slate-200 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#007A87] font-mono-tabular font-semibold mb-2">
              <Radio className="w-4 h-4" />
              <span>Final Communicative Challenge · THE LIVE UPDATE</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-editorial font-medium text-[#001F54]">
              Prepare Your Live Broadcast Report from the Hub
            </h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              You are the live correspondent inside the International Media &amp; Innovation Hub.
              Inspect the four simultaneous activity zones in the photograph below, then write your
              live broadcast report describing ongoing actions, asking questions, and responding to a new studio alert.
            </p>
          </div>
        </div>

        {/* Visual Scenario + Interactive Zone Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
          {/* Left 7 cols: Wide Simultaneous Hub Photograph with Zone Selector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-[#001F54] aspect-16/9">
              <ResilientImage
                src={IMAGES.challengeHub}
                alt="Open-plan media and technology hub showing four simultaneous activities: Nina testing a camera, Sofia and Liam discussing ideas at a glass board, David typing on a laptop, and Carmen talking on a phone by the window"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001F54]/90 via-[#001F54]/45 to-transparent p-4 text-white flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono-tabular text-[#E5A922]">
                  LIVE CAMERA FEED · INTERNATIONAL INNOVATION HUB · 4 SIMULTANEOUS ZONES
                </span>
                <span className="text-xs text-slate-200">
                  Select a zone below to inspect details
                </span>
              </div>
            </div>

            {/* 4 Zone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CHALLENGE_HUB_ZONES.map((zone) => {
                const isSelected = zone.id === activeZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#001F54] text-white border-[#001F54]'
                        : 'bg-[#F5F8FA] text-slate-800 border-slate-200 hover:border-[#007A87]'
                    }`}
                  >
                    <span className="block text-xs font-mono-tabular opacity-80">
                      {zone.zoneLabel.split(' · ')[0]}
                    </span>
                    <span className="block text-sm font-semibold mt-0.5">
                      {zone.people}
                    </span>
                    <span className="block text-xs opacity-75 truncate">
                      {zone.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: Selected Zone Observation Notes & Scaffolding */}
          <div className="lg:col-span-5 bg-[#F5F8FA] rounded-lg border border-slate-200 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-mono-tabular uppercase text-[#B57C00] font-semibold">
                  {activeZone.zoneLabel}
                </span>
                <h4 className="text-xl font-editorial font-medium text-[#001F54] mt-0.5">
                  {activeZone.people} · {activeZone.role}
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-[#001F54] uppercase tracking-wider">
                  Observed Ongoing Actions:
                </p>
                <ul className="space-y-1 text-slate-700 list-disc list-inside">
                  {activeZone.ongoingActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 text-xs pt-1">
                <p className="font-semibold text-[#001F54] uppercase tracking-wider">
                  Contrast (What they are NOT doing):
                </p>
                <p className="text-slate-700">• {activeZone.notDoingAction}</p>
              </div>

              <div className="space-y-1 text-xs pt-1">
                <p className="font-semibold text-[#001F54] uppercase tracking-wider">
                  Useful Action Phrases:
                </p>
                <p className="font-mono-tabular text-[#007A87] font-medium">
                  {activeZone.suggestedVerbs.join(' · ')}
                </p>
              </div>
            </div>

            <div className="p-3 bg-white rounded border border-slate-200 text-xs space-y-1">
              <p className="text-slate-500 font-mono-tabular">Sample Question &amp; Short Answer:</p>
              <p className="font-medium text-[#001F54]">Q: {activeZone.sampleQuestion}</p>
              <p className="text-slate-700">A: {activeZone.sampleShortAnswer}</p>
            </div>
          </div>
        </div>

        {/* 3-Part Live Broadcast Report Workspace */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1: Describe Ongoing Actions (Affirmative & Negative) */}
            <div className="space-y-2">
              <label
                htmlFor="rep-desc"
                className="block text-sm font-semibold text-[#001F54]"
              >
                1. Describe What Is Happening (Affirmative &amp; Negative)
              </label>
              <p className="text-xs text-slate-600">
                Describe what at least two people are doing right now, and include at least one negative statement about what someone <em>isn’t</em> doing.
              </p>
              <textarea
                id="rep-desc"
                rows={5}
                value={reportDescription}
                onChange={(e) => {
                  setReportDescription(e.target.value);
                  setChallengeSubmitted(false);
                }}
                placeholder="e.g., Right now, Nina is testing a camera in the foreground. Sofia and Liam are discussing an idea at the board. David is typing on his laptop, and he isn't talking on the phone."
                className="w-full p-3 text-sm bg-[#F5F8FA] border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#007A87]"
              />
            </div>

            {/* Step 2: Ask Relevant Questions */}
            <div className="space-y-2">
              <label
                htmlFor="rep-quest"
                className="block text-sm font-semibold text-[#001F54]"
              >
                2. Ask the Hub Team Questions
              </label>
              <p className="text-xs text-slate-600">
                Write one <strong>Yes/No question</strong> or <strong>Wh- question</strong> about what is happening in the room right now.
              </p>
              <textarea
                id="rep-quest"
                rows={5}
                value={reportQuestions}
                onChange={(e) => {
                  setReportQuestions(e.target.value);
                  setChallengeSubmitted(false);
                }}
                placeholder="e.g., Are Sofia and Liam preparing a new design today? Who is Carmen talking to on the phone right now?"
                className="w-full p-3 text-sm bg-[#F5F8FA] border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#007A87]"
              />
            </div>

            {/* Step 3: Respond to New Breaking Information */}
            <div className="space-y-2">
              <label
                htmlFor="rep-break"
                className="block text-sm font-semibold text-[#001F54]"
              >
                3. Respond to New Live Information
              </label>
              <div className="p-2.5 rounded bg-[#B57C00]/10 border border-[#B57C00]/30 text-xs text-[#7A5200] mb-2">
                <strong>Incoming Producer Alert:</strong> “The battery on Nina’s camera is low, and our live stream starts in two minutes!”
              </div>
              <textarea
                id="rep-break"
                rows={3}
                value={reportBreakingResponse}
                onChange={(e) => {
                  setReportBreakingResponse(e.target.value);
                  setChallengeSubmitted(false);
                }}
                placeholder="e.g., Nina is changing the camera battery right now, and David is checking the live stream connection!"
                className="w-full p-3 text-sm bg-[#F5F8FA] border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#007A87]"
              />
            </div>
          </div>

          {/* Submit & Load Sample Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={
                  !reportDescription.trim() ||
                  !reportQuestions.trim() ||
                  !reportBreakingResponse.trim()
                }
                onClick={handleSubmitFinalChallenge}
                className="px-5 py-2.5 text-sm font-medium bg-[#001F54] text-white rounded-lg hover:bg-[#007A87] disabled:opacity-40 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish Live Broadcast Report</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setReportDescription(
                    "Right now, Nina is testing a camera in Zone A. Sofia and Liam are standing at the glass board and discussing an idea. David is wearing headphones and typing on his laptop. He isn't talking on the phone."
                  );
                  setReportQuestions(
                    'Are Sofia and Liam organizing the project schedule today? Who is Carmen talking to by the window right now?'
                  );
                  setReportBreakingResponse(
                    'Wait—we have a new update! Nina is changing the camera battery at the moment, and we are preparing the live broadcast right now.'
                  );
                  setChallengeSubmitted(false);
                }}
                className="px-3.5 py-2 text-xs font-medium text-[#001F54] bg-[#F5F8FA] border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Load Example Model Report
              </button>
            </div>

            {(reportDescription || reportQuestions || reportBreakingResponse) && (
              <button
                type="button"
                onClick={() => {
                  setReportDescription('');
                  setReportQuestions('');
                  setReportBreakingResponse('');
                  setChallengeSubmitted(false);
                }}
                className="text-xs text-slate-500 hover:text-[#001F54] inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Report</span>
              </button>
            )}
          </div>

          {/* Observable Communicative Feedback */}
          {challengeSubmitted && (
            <div
              className={`p-5 rounded-xl border space-y-3 ${
                isChallengeComplete
                  ? 'bg-[#007A87]/10 border-[#007A87]/40 text-[#001F54]'
                  : 'bg-[#F5F8FA] border-slate-300 text-[#001F54]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-editorial font-medium">
                  {isChallengeComplete
                    ? 'Live Broadcast Published! Communicative Goals Demonstrated'
                    : 'Broadcast Draft Feedback — Review the Checklist Below'}
                </h4>
                <span className="text-xs font-mono-tabular text-slate-600">
                  {[evidenceAffirmative, evidenceNegative, evidenceQuestion, evidenceResponse].filter(
                    Boolean
                  ).length}{' '}
                  / 4 Communicative Elements
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  {evidenceAffirmative ? (
                    <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                  )}
                  <span>
                    <strong>Ongoing Actions (Affirmative):</strong>{' '}
                    {evidenceAffirmative
                      ? 'Verified (am / is / are + verb-ing).'
                      : 'Include at least one affirmative sentence (e.g., "Nina is testing the camera").'}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  {evidenceNegative ? (
                    <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                  )}
                  <span>
                    <strong>Contrast (Negative Form):</strong>{' '}
                    {evidenceNegative
                      ? 'Verified (am not / isn’t / aren’t + verb-ing).'
                      : 'Include at least one negative statement (e.g., "David isn’t talking on the phone").'}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  {evidenceQuestion ? (
                    <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                  )}
                  <span>
                    <strong>Live Question Formation:</strong>{' '}
                    {evidenceQuestion
                      ? 'Verified (Am/Is/Are + subject + verb-ing?).'
                      : 'Include a Present Continuous question ending with "?" (e.g., "Are Sofia and Liam discussing an idea?").'}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  {evidenceResponse ? (
                    <CheckCircle2 className="w-4 h-4 text-[#007A87] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#B57C00] shrink-0 mt-0.5" />
                  )}
                  <span>
                    <strong>Response to New Information:</strong>{' '}
                    {evidenceResponse
                      ? 'Verified ongoing response to the producer alert.'
                      : 'Use Present Continuous to explain what the team is doing right now in Part 3.'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onNavigateBack}
          className="px-4 py-2.5 text-sm font-medium text-[#001F54] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 04. Listening &amp; Practice</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <MessageCircleQuestion className="w-4 h-4 text-[#007A87]" />
          <span>You can revisit any section at any time using the top navigation bar.</span>
        </div>
      </div>
    </div>
  );
};
