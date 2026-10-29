import React, { useState } from 'react';
import { AUDIO_PRODUCTION_MANIFEST, VOCABULARY_ITEMS, BRAND_LOGO } from '../data/curriculumContent';
import { X, FileAudio, BookOpenCheck, ShieldCheck } from 'lucide-react';

interface TeacherDeliverablesPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherDeliverablesPortal: React.FC<TeacherDeliverablesPortalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'teacher-doc' | 'audio-manifest' | 'qa-report'>(
    'teacher-doc'
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001F54]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-portal-title"
    >
      <div className="bg-[#F5F8FA] border border-[#B57C00]/40 rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        {/* Portal Header */}
        <div className="px-6 py-4 bg-[#001F54] text-white flex items-center justify-between gap-4 shrink-0 border-b border-[#B57C00]/40">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-white p-0.5 ring-1 ring-[#B57C00] flex items-center justify-center shrink-0">
              <img
                src={BRAND_LOGO}
                alt="Learning & Development Studio Official Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </span>
            <div>
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#E5A922]">
                Separate Instructor &amp; Production Portal · Strictly Isolated from Student View
              </p>
              <h2 id="teacher-portal-title" className="text-xl font-editorial font-medium mt-0.5">
                Learning &amp; Development Studio — Deliverables 2, 3 &amp; 4
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#007A87] hover:bg-[#00636E] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Return to Student Experience</span>
          </button>
        </div>

        {/* Deliverable Tabs */}
        <div className="px-6 py-3 bg-[#EBF1F6] border-b border-slate-200 flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('teacher-doc')}
            className={`px-4 py-2 text-xs font-medium rounded-md inline-flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'teacher-doc'
                ? 'bg-[#001F54] text-white'
                : 'bg-white text-[#001F54] border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Deliverable 3: Teacher Documentation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audio-manifest')}
            className={`px-4 py-2 text-xs font-medium rounded-md inline-flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'audio-manifest'
                ? 'bg-[#001F54] text-white'
                : 'bg-white text-[#001F54] border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <FileAudio className="w-4 h-4" />
            <span>Deliverable 2: Audio Production Manifest (16 Files)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qa-report')}
            className={`px-4 py-2 text-xs font-medium rounded-md inline-flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'qa-report'
                ? 'bg-[#001F54] text-white'
                : 'bg-white text-[#001F54] border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Deliverable 4: QA Report &amp; Dependencies</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-8 text-sm text-slate-800 leading-relaxed">
          {activeTab === 'teacher-doc' && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs font-mono-tabular text-[#007A87]">
                  File Reference: /deliverables/TEACHER_DOCUMENTATION.md
                </p>
                <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
                  Teacher’s Portal Specification — RIGHT NOW: The World Is Happening (A1.2)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  No mandatory lesson durations or rigid completion timers are imposed. Students progress according to demonstrated understanding and communicative development across one or multiple sessions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-semibold text-[#001F54]">1. Communicative Objectives</h4>
                  <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-700">
                    <li>Describe simultaneous ongoing actions happening right now and around the present.</li>
                    <li>Contrast planned schedules with actual ongoing situations using negative and affirmative Present Continuous statements.</li>
                    <li>Formulate and answer Yes/No and Wh- questions to exchange live information.</li>
                    <li>Distinguish ongoing actions (right now, today, this week) from habitual actions (Simple Present).</li>
                  </ul>
                </div>

                <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-semibold text-[#001F54]">2. Prerequisite Competencies</h4>
                  <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-700">
                    <li>Subject pronouns (I, you, he, she, it, we, they) and singular/plural noun phrases.</li>
                    <li>Present forms of <em>be</em> (am, is, are) in affirmative, negative, and question word order.</li>
                    <li>Basic question words (What, Where, Who, Why).</li>
                    <li>Foundational Simple Present for routine contrast (Module 03 Step 04).</li>
                  </ul>
                </div>
              </div>

              <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-3">
                <h4 className="font-semibold text-[#001F54]">
                  3. Target Vocabulary (12 Contextualized Action Phrases)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                  {VOCABULARY_ITEMS.map((v, i) => (
                    <div key={v.id} className="p-2 bg-[#F5F8FA] rounded border border-slate-200">
                      <span className="font-mono-tabular text-[#B57C00] mr-1">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <strong className="text-[#001F54]">{v.basePhrase}</strong>
                      <span className="block text-[#007A87] mt-0.5">{v.ingForm}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-3">
                <h4 className="font-semibold text-[#001F54]">
                  4. Observable Evidence &amp; 4-Tier Assessment Differentiation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#F5F8FA] rounded border border-slate-200">
                    <strong className="text-[#001F54] block mb-1">Tier 1 · Recognition</strong>
                    Identifies ongoing actions in photo dispatches, matches visual clues to <em>-ing</em> phrases, and spots grammatical errors in draft notes.
                  </div>
                  <div className="p-3 bg-[#F5F8FA] rounded border border-slate-200">
                    <strong className="text-[#001F54] block mb-1">Tier 2 · Controlled Production</strong>
                    Produces accurate <em>am/is/are + verb-ing</em> forms in retrieval prompts, applies silent <em>-e</em> and CVC spelling patterns, and reconstructs scrambled sentences.
                  </div>
                  <div className="p-3 bg-[#F5F8FA] rounded border border-slate-200">
                    <strong className="text-[#001F54] block mb-1">Tier 3 · Guided Communication</strong>
                    Contrasts schedules with live camera feeds and exchanges live questions with a partner in the Partner A / Partner B information-gap task.
                  </div>
                  <div className="p-3 bg-[#F5F8FA] rounded border border-slate-200">
                    <strong className="text-[#001F54] block mb-1">
                      Tier 4 · Independent Communicative Performance
                    </strong>
                    Produces original personal observations and prepares a complete 3-part live report in <em>THE LIVE UPDATE</em> (describing simultaneous actions, asking questions, and responding to a breaking alert).
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio-manifest' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs font-mono-tabular text-[#007A87]">
                  File Reference: /deliverables/AUDIO_PRODUCTION_MANIFEST.md
                </p>
                <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
                  Audio Production Manifest (16 Required Studio Audio Assets)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Complete list of required audio files, expected asset paths, speaker profiles, intended tones, durations, and verbatim scripts.
                </p>
              </div>

              <div className="space-y-4">
                {AUDIO_PRODUCTION_MANIFEST.map((entry) => (
                  <div
                    key={entry.filename}
                    className="p-4 bg-white rounded-lg border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <span className="font-mono-tabular font-semibold text-[#001F54]">
                        {entry.filename}
                      </span>
                      <span className="font-mono-tabular text-[#007A87]">
                        Expected Path: {entry.expectedPath} · Duration: {entry.duration}
                      </span>
                    </div>
                    <p className="text-slate-700">
                      <strong>Activity:</strong> {entry.activity} · <strong>Speaker:</strong> {entry.speaker}
                    </p>
                    <p className="text-slate-600">
                      <strong>Intended Tone:</strong> {entry.intendedTone}
                    </p>
                    <pre className="p-3 bg-[#F5F8FA] rounded border border-slate-200 font-sans whitespace-pre-wrap text-slate-900">
                      {entry.script}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'qa-report' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs font-mono-tabular text-[#007A87]">
                  File Reference: /deliverables/QA_REPORT.md
                </p>
                <h3 className="text-2xl font-editorial font-medium text-[#001F54] mt-1">
                  Quality Assurance Report &amp; Dependency Audit
                </h3>
              </div>

              <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-3 text-xs">
                <h4 className="text-sm font-semibold text-[#001F54]">
                  Official Brand Identity &amp; External Dependencies Status
                </h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>
                    <strong>Official Circular Institutional Logo Integrated:</strong> Integrated <code>/assets/aistudio/logo-oficial-circular-transparente_17e956b8.png</code> in the translucent Navy header, Hero institutional lockup, and Navy footer, with full visual palette alignment to <strong>Deep Oxford Navy (#001F54)</strong>, <strong>Oceanic Teal (#007A87)</strong>, and <strong>Antique Gold (#B57C00)</strong>.
                  </li>
                  <li>
                    <strong>Institutional Scope &amp; Sequence Document:</strong> Target level A1.2 content is aligned with CEFR and CEFR Companion Volume (2020) descriptors and flagged as subject to verification against the institutional Scope &amp; Sequence.
                  </li>
                  <li>
                    <strong>Studio Audio Recordings (/assets/audio/**/*.mp3):</strong> The 16 audio files specified in Deliverable 2 are documented with complete scripts and metadata. In the student UI, missing studio `.mp3` files are never misrepresented as present; the player transparently provides a Synchronized Turn Player with an opt-in Reference Voice Reader.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
