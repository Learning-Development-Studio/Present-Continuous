import React, { useState, useRef } from 'react';
import { IMAGES, BRAND_LOGO } from './data/curriculumContent';
import { ResilientImage } from './components/ResilientImage';
import { LiveWorldSection } from './components/LiveWorldSection';
import { VocabularySection } from './components/VocabularySection';
import { GrammarDiscoverySection } from './components/GrammarDiscoverySection';
import { ListeningAndPracticeSection } from './components/ListeningAndPracticeSection';
import { LiveUpdateChallengeSection } from './components/LiveUpdateChallengeSection';
import { TeacherDeliverablesPortal } from './components/TeacherDeliverablesPortal';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

type ModuleId =
  | 'live-world'
  | 'vocabulary'
  | 'grammar-lab'
  | 'listening-practice'
  | 'live-update';

interface ModuleMeta {
  id: ModuleId;
  number: string;
  shortNavLabel: string;
  title: string;
  subtitle: string;
  activityKeys: string[];
}

const MODULES: ModuleMeta[] = [
  {
    id: 'live-world',
    number: '01',
    shortNavLabel: '01. Live World',
    title: 'Live Global Observation',
    subtitle: 'Three Cities & Digital Message Feed',
    activityKeys: [
      'dispatch-madrid',
      'dispatch-toronto',
      'dispatch-london',
      'reading-msg-1',
      'reading-msg-2',
      'reading-msg-3',
    ],
  },
  {
    id: 'vocabulary',
    number: '02',
    shortNavLabel: '02. Vocabulary',
    title: 'Active Lexicon Studio',
    subtitle: '12 Action Phrases in Context',
    activityKeys: [
      'vocab-explored',
      'vocab-recognition',
      'vocab-ret-vocab-7',
      'vocab-ret-vocab-8',
      'vocab-ret-vocab-9',
    ],
  },
  {
    id: 'grammar-lab',
    number: '03',
    shortNavLabel: '03. Grammar Lab',
    title: 'Grammar Discovery Lab',
    subtitle: 'Interactive Board & -ing Patterns',
    activityKeys: [
      'grammar-pattern-discovery',
      'grammar-board-explored',
      'spelling-sp-1',
      'spelling-sp-2',
      'grammar-usage-contrast',
    ],
  },
  {
    id: 'listening-practice',
    number: '04',
    shortNavLabel: '04. Listening',
    title: 'Listening & Practice',
    subtitle: 'Live Crossover & 3 Practice Stations',
    activityKeys: [
      'listening-played',
      'listen-lq-1',
      'listen-lq-2',
      'listen-lq-3',
      'prac-rec-rec-1',
      'prac-err-err-1',
      'prac-gap-gap-1',
    ],
  },
  {
    id: 'live-update',
    number: '05',
    shortNavLabel: '05. Live Update',
    title: 'The Live Update',
    subtitle: 'Communicative Production & Final Task',
    activityKeys: [
      'production-personal',
      'production-collaborative',
      'final-live-update',
    ],
  },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('live-world');
  const [completedActivities, setCompletedActivities] = useState<
    Record<string, boolean>
  >({});
  const [hasBegun, setHasBegun] = useState<boolean>(false);
  const [isTeacherPortalOpen, setIsTeacherPortalOpen] = useState<boolean>(false);

  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const handleCompleteActivity = (activityId: string) => {
    setCompletedActivities((prev) => {
      if (prev[activityId]) return prev;
      return { ...prev, [activityId]: true };
    });
  };

  const scrollToWorkspace = (targetModule?: ModuleId) => {
    if (targetModule) {
      setActiveModule(targetModule);
    }
    setHasBegun(true);
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const totalCompletedCount = Object.keys(completedActivities).length;

  const isModuleCompleted = (mod: ModuleMeta) =>
    mod.activityKeys.some((k) => completedActivities[k]);

  const currentModuleIndex = MODULES.findIndex((m) => m.id === activeModule);
  const nextModule =
    currentModuleIndex < MODULES.length - 1
      ? MODULES[currentModuleIndex + 1]
      : MODULES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FA] text-[#0A192F]">
      {/* Translucent Navy Header with Consolidated Brand, Level & Topic Info */}
      <header className="sticky top-0 z-30 bg-[#001F54]/90 backdrop-blur-md border-b border-[#B57C00]/40 px-6 py-3 text-white shadow-xs">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-6">
          {/* Zone 1: Official Logo + Institution Name, English Hub, Level & Topic */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 shrink-0 group"
          >
            <span className="w-12 h-12 rounded-full bg-white p-0.5 ring-1 ring-[#B57C00] shadow-xs flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <img
                src={BRAND_LOGO}
                alt="Learning & Development Studio Official Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-base sm:text-lg font-editorial font-semibold tracking-tight text-white">
                  Learning &amp; Development Studio
                </span>
                <span aria-hidden="true" className="text-[#E5A922] hidden sm:inline">·</span>
                <span className="text-xs sm:text-sm font-medium text-[#4DD0E1] hidden sm:inline">
                  English Hub
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 font-mono-tabular whitespace-nowrap">
                <span className="sm:hidden text-[#4DD0E1]">English Hub ·</span>
                <span className="text-[#E5A922] font-medium">Level A1.2</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span>Present Continuous</span>
              </div>
            </div>
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary learning modules"
            className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-200"
          >
            {MODULES.map((mod) => {
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => scrollToWorkspace(mod.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-white border-[#E5A922] font-semibold'
                      : 'border-transparent hover:text-white hover:border-[#007A87]'
                  }`}
                >
                  {mod.shortNavLabel}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                hasBegun
                  ? scrollToWorkspace(nextModule.id)
                  : scrollToWorkspace('live-world')
              }
              className="px-4 py-2 text-xs font-medium text-white bg-[#007A87] rounded-lg hover:bg-[#00636E] border border-white/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {hasBegun
                ? `Continue · ${totalCompletedCount} Verified`
                : 'Begin Exploration'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1">
        {/* COMPONENT A: IMMERSIVE OPENING HERO */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-white to-[#F5F8FA]">
          <div className="max-w-[1320px] mx-auto px-6 py-10 lg:py-16 space-y-10">
            {/* 2-Column Editorial Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left 6 cols: Editorial Typography & Primary Action */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8 py-2">
                <div className="space-y-5">
                  <p className="text-base lg:text-lg font-editorial italic text-[#007A87] font-medium">
                    What’s happening around us right now?
                  </p>

                  <h1
                    className="text-4xl sm:text-5xl lg:text-[3.5rem] font-editorial font-medium text-[#001F54] tracking-tight leading-[1.08]"
                    style={{ textWrap: 'balance' }}
                  >
                    RIGHT NOW: The World Is Happening
                  </h1>

                  <p className="text-base text-slate-700 leading-relaxed max-w-xl">
                    At this exact second, a podcast host in Madrid is adjusting her audio
                    mixer, engineers in Toronto are solving a server alert, and neighbors
                    in London are planting a rooftop garden. Step inside the live
                    observation platform to explore, discover, and report what people are
                    doing right now.
                  </p>
                </div>

                {/* Functional Primary Action + Secondary Progress Summary */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToWorkspace('live-world')}
                      className="px-6 py-3.5 text-sm font-medium bg-[#001F54] text-white rounded-lg hover:bg-[#007A87] transition-colors inline-flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                    >
                      <span>Begin Exploration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {totalCompletedCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setCompletedActivities({})}
                        className="px-3.5 py-2 text-xs text-slate-600 hover:text-[#001F54] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Progress ({totalCompletedCount} completed)</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono-tabular">
                    <span>Self-Paced Interactive Documentary</span>
                    <span aria-hidden="true" className="text-[#B57C00]">·</span>
                    <span>5 Integrated Modules</span>
                    <span aria-hidden="true" className="text-[#B57C00]">·</span>
                    <span>Completed Interactions: {totalCompletedCount}</span>
                  </div>
                </div>
              </div>

              {/* Right 6 cols: High-Resolution Documentary Photograph */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className="relative rounded-xl overflow-hidden bg-[#001F54] h-full min-h-[320px] lg:min-h-[420px] ring-1 ring-[#B57C00]/30 shadow-sm">
                  <ResilientImage
                    src={IMAGES.heroStudio}
                    alt="Live broadcast studio control room at twilight with a host speaking into a microphone while a producer monitors live global video feeds"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001F54]/95 via-[#001F54]/55 to-transparent p-5 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#E5A922]">
                      <span>GLOBAL CONTROL ROOM · LIVE OBSERVATION FEED</span>
                      <span className="text-slate-200">MADRID · TORONTO · LONDON · TOKYO</span>
                    </div>
                    <p className="text-sm font-editorial italic text-white mt-1">
                      “While we are speaking in the studio, teams in three cities are sharing live updates.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 5-Module Navigation & Progress Architecture Strip */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {MODULES.map((mod) => {
                  const isCurrent = activeModule === mod.id;
                  const isDone = isModuleCompleted(mod);
                  const doneCount = mod.activityKeys.filter(
                    (k) => completedActivities[k]
                  ).length;

                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => scrollToWorkspace(mod.id)}
                      className={`p-4 rounded-xl border text-left transition-colors flex flex-col justify-between gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-white border-[#007A87] ring-1 ring-[#007A87]/30 shadow-xs'
                          : 'bg-[#EBF1F6]/75 border-slate-200/90 hover:bg-white hover:border-[#001F54]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span
                          className={`text-xs font-mono-tabular font-semibold ${
                            isCurrent ? 'text-[#007A87]' : 'text-[#B57C00]'
                          }`}
                        >
                          MODULE {mod.number}
                        </span>
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#007A87]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-xs font-mono-tabular text-slate-500">
                            {doneCount}/{mod.activityKeys.length}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#001F54]">
                          {mod.title}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                          {mod.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVE LEARNING MODULE STAGE */}
        <section
          ref={workspaceRef}
          id="workspace-stage"
          className="max-w-[1320px] mx-auto px-6 py-12 lg:py-16"
        >
          {/* Mobile-Only Quick Module Switcher (Non-sticky to respect 15% mobile sticky cap) */}
          <div className="md:hidden mb-8 overflow-x-auto pb-2">
            <div className="flex items-center gap-1.5">
              {MODULES.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveModule(mod.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border whitespace-nowrap shrink-0 cursor-pointer ${
                    activeModule === mod.id
                      ? 'bg-[#001F54] text-white border-[#001F54]'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {mod.shortNavLabel}
                </button>
              ))}
            </div>
          </div>

          {activeModule === 'live-world' && (
            <LiveWorldSection
              onCompleteActivity={handleCompleteActivity}
              completedActivities={completedActivities}
              onNavigateNext={() => scrollToWorkspace('vocabulary')}
            />
          )}

          {activeModule === 'vocabulary' && (
            <VocabularySection
              onCompleteActivity={handleCompleteActivity}
              completedActivities={completedActivities}
              onNavigateBack={() => scrollToWorkspace('live-world')}
              onNavigateNext={() => scrollToWorkspace('grammar-lab')}
            />
          )}

          {activeModule === 'grammar-lab' && (
            <GrammarDiscoverySection
              onCompleteActivity={handleCompleteActivity}
              completedActivities={completedActivities}
              onNavigateBack={() => scrollToWorkspace('vocabulary')}
              onNavigateNext={() => scrollToWorkspace('listening-practice')}
            />
          )}

          {activeModule === 'listening-practice' && (
            <ListeningAndPracticeSection
              onCompleteActivity={handleCompleteActivity}
              completedActivities={completedActivities}
              onNavigateBack={() => scrollToWorkspace('grammar-lab')}
              onNavigateNext={() => scrollToWorkspace('live-update')}
            />
          )}

          {activeModule === 'live-update' && (
            <LiveUpdateChallengeSection
              onCompleteActivity={handleCompleteActivity}
              completedActivities={completedActivities}
              onNavigateBack={() => scrollToWorkspace('listening-practice')}
            />
          )}
        </section>
      </main>

      {/* INSTITUTIONAL NAVY FOOTER ALIGNED TO OFFICIAL LOGO */}
      <footer className="border-t-2 border-[#B57C00]/40 bg-[#001F54] text-slate-200 px-6 py-8 mt-16">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-white p-0.5 ring-1 ring-[#B57C00] flex items-center justify-center shrink-0">
              <img
                src={BRAND_LOGO}
                alt="Learning & Development Studio Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">
                Learning &amp; Development Studio
              </span>
              <span aria-hidden="true" className="text-[#E5A922]">·</span>
              <span className="text-[#4DD0E1]">Educate · Design · Grow</span>
              <span aria-hidden="true" className="text-[#E5A922]">·</span>
              <span className="text-slate-300">
                English Hub — RIGHT NOW: The World Is Happening (A1.2)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTeacherPortalOpen(true)}
              className="text-slate-200 hover:text-[#E5A922] underline underline-offset-4 cursor-pointer transition-colors"
            >
              Teacher’s Portal &amp; Project Deliverables (Deliverables 2–4)
            </button>
          </div>
        </div>
      </footer>

      {/* Isolated Teacher's Portal Modal (Never shown in student interface unless explicitly opened) */}
      <TeacherDeliverablesPortal
        isOpen={isTeacherPortalOpen}
        onClose={() => setIsTeacherPortalOpen(false)}
      />
    </div>
  );
}
