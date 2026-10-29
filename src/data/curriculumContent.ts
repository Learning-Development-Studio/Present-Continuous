export const BRAND_LOGO = '/assets/aistudio/logo-oficial-circular-transparente_17e956b8.png';

export const IMAGES = {
  heroStudio: '/src/assets/images/hero_live_broadcast_studio_1793292392397.jpg',
  podcastMadrid: '/src/assets/images/context_podcast_recording_1793292394475.jpg',
  techToronto: '/src/assets/images/context_tech_team_solving_1793292394503.jpg',
  gardenLondon: '/src/assets/images/context_community_project_1793292396052.jpg',
  challengeHub: '/src/assets/images/challenge_simultaneous_hub_1793292396916.jpg',
};

export interface LiveDispatch {
  id: string;
  city: string;
  country: string;
  localTime: string;
  locationTag: string;
  headline: string;
  person: string;
  role: string;
  image: string;
  imageAlt: string;
  figureCaption: string;
  paragraphs: {
    text: string;
    highlights: { phrase: string; type: 'affirmative' | 'negative' | 'question' | 'time'; note: string }[];
  }[];
  quickObservationQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const LIVE_DISPATCHES: LiveDispatch[] = [
  {
    id: 'madrid',
    city: 'Madrid',
    country: 'Spain',
    localTime: '16:00 CET',
    locationTag: 'Studio 4 Audio Lab',
    headline: 'Inside a Live Audio Broadcast',
    person: 'Elena Vargas',
    role: 'Podcast Host & Producer',
    image: IMAGES.podcastMadrid,
    imageAlt: 'Elena wearing studio headphones and adjusting an audio mixer in a recording studio in Madrid',
    figureCaption: 'Fig. 1.1 — Elena Vargas adjusting channel levels during a live afternoon recording in Madrid.',
    paragraphs: [
      {
        text: 'Right now, Elena is recording a new episode in Studio 4. She is wearing studio headphones and adjusting the audio mixer with her right hand.',
        highlights: [
          { phrase: 'Right now', type: 'time', note: 'Time expression for an action in progress at this exact moment.' },
          { phrase: 'is recording', type: 'affirmative', note: 'She (singular subject) + is + record-ing.' },
          { phrase: 'is wearing', type: 'affirmative', note: 'She + is + wear-ing (ongoing action).' },
          { phrase: 'adjusting', type: 'affirmative', note: 'Connected to "is": she is adjusting the audio mixer.' },
        ],
      },
      {
        text: 'Two guests are sitting across the wooden table. At the moment, they are discussing an idea for a community arts festival. Elena isn’t checking her phone—she is listening carefully to her guests.',
        highlights: [
          { phrase: 'are sitting', type: 'affirmative', note: 'Two guests (plural subject) + are + sit-ting (double t).' },
          { phrase: 'At the moment', type: 'time', note: 'Time expression showing what is happening around now.' },
          { phrase: 'are discussing', type: 'affirmative', note: 'They + are + discuss-ing.' },
          { phrase: 'isn’t checking', type: 'negative', note: 'Negative Present Continuous: is not (isn’t) + check-ing.' },
          { phrase: 'is listening', type: 'affirmative', note: 'She + is + listen-ing.' },
        ],
      },
    ],
    quickObservationQuestion: {
      question: 'Look at the photo and dispatch from Madrid. What is Elena doing with her hands right now?',
      options: [
        'She is typing an email on her laptop.',
        'She is adjusting the audio mixer.',
        'She is drinking a cup of coffee.',
      ],
      correctIndex: 1,
      explanation: 'Correct. In the photo and text, Elena is adjusting the audio mixer while she records the podcast.',
    },
  },
  {
    id: 'toronto',
    city: 'Toronto',
    country: 'Canada',
    localTime: '10:00 EST',
    locationTag: 'North Engineering Floor',
    headline: 'Solving a Live System Alert',
    person: 'Clara & Nadia',
    role: 'Systems Engineers',
    image: IMAGES.techToronto,
    imageAlt: 'Clara pointing at a wide computer monitor while Nadia types on a laptop at a sunlit office desk',
    figureCaption: 'Fig. 1.2 — Clara and Nadia reviewing live system charts on the engineering floor in Toronto.',
    paragraphs: [
      {
        text: 'It is ten o’clock in the morning in Toronto, and Clara and Nadia are solving a technical problem. Why are they working at the same desk right now? Because the main video server is running slowly today.',
        highlights: [
          { phrase: 'are solving', type: 'affirmative', note: 'Clara and Nadia (they) + are + solv-ing (drop silent -e).' },
          { phrase: 'Why are they working', type: 'question', note: 'Wh- question: Wh- word + are + subject + verb-ing?' },
          { phrase: 'right now', type: 'time', note: 'Time expression for this exact moment.' },
          { phrase: 'is running', type: 'affirmative', note: 'The main video server (it) + is + run-ning (double n).' },
          { phrase: 'today', type: 'time', note: 'Time expression for a temporary situation today.' },
        ],
      },
      {
        text: 'Clara is holding a paper notebook and pointing at the screen. Nadia is testing a solution on her laptop. They aren’t taking a coffee break at the moment—they are preparing the system for a global broadcast.',
        highlights: [
          { phrase: 'is holding', type: 'affirmative', note: 'Clara (she) + is + hold-ing.' },
          { phrase: 'pointing', type: 'affirmative', note: 'Clara is pointing at the screen.' },
          { phrase: 'is testing', type: 'affirmative', note: 'Nadia (she) + is + test-ing.' },
          { phrase: 'aren’t taking', type: 'negative', note: 'Negative plural: are not (aren’t) + tak-ing (drop -e).' },
          { phrase: 'are preparing', type: 'affirmative', note: 'They + are + prepar-ing (drop silent -e).' },
        ],
      },
    ],
    quickObservationQuestion: {
      question: 'Why are Clara and Nadia working together at the same desk today?',
      options: [
        'Because they are designing a new office building.',
        'Because the main video server is running slowly today.',
        'Because Nadia’s computer isn’t turning on.',
      ],
      correctIndex: 1,
      explanation: 'Correct. The dispatch explains that the main video server is running slowly today, so they are solving the problem together.',
    },
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    localTime: '15:00 GMT',
    locationTag: 'East Roof Community Garden',
    headline: 'Building a Neighborhood Rooftop Garden',
    person: 'Tariq & Volunteers',
    role: 'Community Project Team',
    image: IMAGES.gardenLondon,
    imageAlt: 'Tariq and volunteers planting herbs, carrying a wooden planter box, and checking a tablet on a sunny rooftop in London',
    figureCaption: 'Fig. 1.3 — Neighborhood volunteers organizing new herb planters on an East London rooftop.',
    paragraphs: [
      {
        text: 'This week, Tariq and his neighbors are organizing a community project on a sunny rooftop in London. Right now, Tariq is kneeling by a planter and planting fresh green herbs.',
        highlights: [
          { phrase: 'This week', type: 'time', note: 'Time expression for an ongoing project around the present.' },
          { phrase: 'are organizing', type: 'affirmative', note: 'Tariq and his neighbors (they) + are + organiz-ing.' },
          { phrase: 'is kneeling', type: 'affirmative', note: 'Tariq (he) + is + kneel-ing.' },
          { phrase: 'planting', type: 'affirmative', note: 'He is planting fresh green herbs.' },
        ],
      },
      {
        text: 'Behind him, Hannah is carrying a wooden box filled with soil. On the right, Amara and Sam are checking the schedule on a tablet. Are they working inside an office today? No, they aren’t. They are sharing live updates from the roof.',
        highlights: [
          { phrase: 'is carrying', type: 'affirmative', note: 'Hannah (she) + is + carry-ing (keep -y + ing).' },
          { phrase: 'are checking', type: 'affirmative', note: 'Amara and Sam (they) + are + check-ing.' },
          { phrase: 'Are they working', type: 'question', note: 'Yes/No question: Are + subject + verb-ing?' },
          { phrase: 'are sharing', type: 'affirmative', note: 'They + are + shar-ing (drop silent -e).' },
        ],
      },
    ],
    quickObservationQuestion: {
      question: 'Look at the London rooftop photo. What are Amara and Sam doing on the right side?',
      options: [
        'They are carrying a wooden box of soil.',
        'They are checking the schedule on a tablet.',
        'They are recording a podcast with headphones.',
      ],
      correctIndex: 1,
      explanation: 'Correct. Amara and Sam are looking at a tablet and checking the planting schedule together.',
    },
  },
];

export interface ReadingFeedMessage {
  id: string;
  senderCode: string;
  timestamp: string;
  messageText: string;
  correctSender: string;
  senderOptions: string[];
  inferenceQuestion: string;
  inferenceOptions: string[];
  correctInferenceIndex: number;
  explanation: string;
}

export const READING_MESSAGE_FEED: ReadingFeedMessage[] = [
  {
    id: 'msg-1',
    senderCode: 'Update #104 · 14:58 UTC',
    timestamp: '2 mins ago',
    messageText: '“We are standing outside in the sun right now! Hannah is bringing the last wooden box of soil, and I am putting the basil plants into the ground. The wind is blowing a little, but it isn’t raining today.”',
    correctSender: 'Tariq (London Rooftop)',
    senderOptions: ['Elena (Madrid Studio)', 'Clara (Toronto Tech Floor)', 'Tariq (London Rooftop)', 'Sora (Tokyo Control Room)'],
    inferenceQuestion: 'What can we understand about the weather in London right now?',
    inferenceOptions: [
      'It is raining heavily, so the team is going inside.',
      'It is sunny and dry, with a little wind.',
      'It is snowing on the rooftop garden.',
    ],
    correctInferenceIndex: 1,
    explanation: 'Tariq writes that they are standing in the sun and "it isn’t raining today," with only a little wind.',
  },
  {
    id: 'msg-2',
    senderCode: 'Update #105 · 14:59 UTC',
    timestamp: '1 min ago',
    messageText: '“Please stay quiet outside Door 4! The red ‘ON AIR’ sign is shining right now. I am speaking with two festival organizers, and we are recording the final part of our conversation.”',
    correctSender: 'Elena (Madrid Studio)',
    senderOptions: ['Elena (Madrid Studio)', 'Nadia (Toronto Tech Floor)', 'Tariq (London Rooftop)', 'Hannah (London Rooftop)'],
    inferenceQuestion: 'Why is Elena asking people to stay quiet outside Door 4?',
    inferenceOptions: [
      'Because she is sleeping in the studio.',
      'Because the microphones are live and she is recording a podcast right now.',
      'Because she is repairing a broken door.',
    ],
    correctInferenceIndex: 1,
    explanation: 'The red "ON AIR" sign is shining and she is recording a live conversation with her guests.',
  },
  {
    id: 'msg-3',
    senderCode: 'Update #106 · 15:00 UTC',
    timestamp: 'Just now',
    messageText: '“Good news from the 5th floor! Nadia is running the final speed test on her laptop at the moment. Look at the green line on my monitor—the server speed is improving fast!”',
    correctSender: 'Clara (Toronto Tech Floor)',
    senderOptions: ['Amara (London Rooftop)', 'Elena (Madrid Studio)', 'Clara (Toronto Tech Floor)', 'Tariq (London Rooftop)'],
    inferenceQuestion: 'How is the technical work in Toronto going right now?',
    inferenceOptions: [
      'Their solution is working and the server is getting faster.',
      'They are turning off all the computers and going home.',
      'They are waiting for a new monitor to arrive next week.',
    ],
    correctInferenceIndex: 0,
    explanation: 'Clara says "Good news" and reports that the server speed is improving fast while Nadia runs the test.',
  },
];

export interface VocabularyItem {
  id: string;
  basePhrase: string;
  ingForm: string;
  verbBase: string;
  verbIng: string;
  spellingCategory: 'regular' | 'drop-e' | 'double-consonant';
  ipa: string;
  stressGuide: string;
  hubContext: 'Broadcast Studio' | 'Engineering Floor' | 'Community Rooftop';
  meaning: string;
  contextSentence: string;
  visualClue: string;
  retrievalPrompt: string;
  retrievalSubject: string;
  retrievalAnswer: string;
}

export const VOCABULARY_ITEMS: VocabularyItem[] = [
  {
    id: 'vocab-1',
    basePhrase: 'record a podcast',
    ingForm: 'recording a podcast',
    verbBase: 'record',
    verbIng: 'recording',
    spellingCategory: 'regular',
    ipa: '/rɪˈkɔːd ə ˈpɒdkɑːst/',
    stressGuide: 're-CORD a POD-cast',
    hubContext: 'Broadcast Studio',
    meaning: 'To capture spoken voices and audio using a microphone for an episode.',
    contextSentence: 'Elena is recording a podcast with two guests in Studio 4 right now.',
    visualClue: 'Speaking into a studio microphone while audio waveforms appear on a laptop.',
    retrievalPrompt: 'Quiet, please! Elena ___ (record) a live podcast episode in Studio 4 right now.',
    retrievalSubject: 'Elena (she)',
    retrievalAnswer: 'is recording',
  },
  {
    id: 'vocab-2',
    basePhrase: 'adjust the mixer',
    ingForm: 'adjusting the mixer',
    verbBase: 'adjust',
    verbIng: 'adjusting',
    spellingCategory: 'regular',
    ipa: '/əˈdʒʌst ðə ˈmɪksə/',
    stressGuide: 'ad-JUST the MIX-er',
    hubContext: 'Broadcast Studio',
    meaning: 'To move controls or sliders on a sound board to make the audio clear.',
    contextSentence: 'She is adjusting the mixer so every speaker sounds clear.',
    visualClue: 'Turning small knobs and moving sliders on an audio control board.',
    retrievalPrompt: 'Look at Elena’s hands. She ___ (adjust) the mixer to balance the sound.',
    retrievalSubject: 'She',
    retrievalAnswer: 'is adjusting',
  },
  {
    id: 'vocab-3',
    basePhrase: 'wear headphones',
    ingForm: 'wearing headphones',
    verbBase: 'wear',
    verbIng: 'wearing',
    spellingCategory: 'regular',
    ipa: '/weə ˈhedfəʊnz/',
    stressGuide: 'WEAR HEAD-phones',
    hubContext: 'Broadcast Studio',
    meaning: 'To have audio speakers over your ears so you can hear sound privately.',
    contextSentence: 'I am wearing headphones right now so I can hear the live studio feed.',
    visualClue: 'Having padded studio earpieces placed over both ears.',
    retrievalPrompt: 'I can’t hear the room noise because I ___ (wear) studio headphones right now.',
    retrievalSubject: 'I',
    retrievalAnswer: 'am wearing',
  },
  {
    id: 'vocab-4',
    basePhrase: 'discuss an idea',
    ingForm: 'discussing an idea',
    verbBase: 'discuss',
    verbIng: 'discussing',
    spellingCategory: 'regular',
    ipa: '/dɪˈskʌs ən aɪˈdɪə/',
    stressGuide: 'dis-CUSS an i-DE-a',
    hubContext: 'Broadcast Studio',
    meaning: 'To talk together about a plan or thought in detail.',
    contextSentence: 'The guests are discussing an idea for a neighborhood music event.',
    visualClue: 'Two or more people talking together around a table or board.',
    retrievalPrompt: 'At the moment, the two guests ___ (discuss) an idea for the festival.',
    retrievalSubject: 'The two guests (they)',
    retrievalAnswer: 'are discussing',
  },
  {
    id: 'vocab-5',
    basePhrase: 'prepare a broadcast',
    ingForm: 'preparing a broadcast',
    verbBase: 'prepare',
    verbIng: 'preparing',
    spellingCategory: 'drop-e',
    ipa: '/prɪˈpeər ə ˈbrɔːdkɑːst/',
    stressGuide: 'pre-PARE a BROAD-cast',
    hubContext: 'Broadcast Studio',
    meaning: 'To get equipment, scripts, and cameras ready before going live on air.',
    contextSentence: 'Sora and her team are preparing a broadcast in the control room.',
    visualClue: 'Checking live video screens and sound levels before going on air.',
    retrievalPrompt: 'In the control room, the producers ___ (prepare) a live broadcast for tonight.',
    retrievalSubject: 'The producers (they)',
    retrievalAnswer: 'are preparing',
  },
  {
    id: 'vocab-6',
    basePhrase: 'solve a problem',
    ingForm: 'solving a problem',
    verbBase: 'solve',
    verbIng: 'solving',
    spellingCategory: 'drop-e',
    ipa: '/sɒlv ə ˈprɒbləm/',
    stressGuide: 'SOLVE a PROB-lem',
    hubContext: 'Engineering Floor',
    meaning: 'To find the answer or fix a difficult situation.',
    contextSentence: 'Clara and Nadia are solving a problem with the main server right now.',
    visualClue: 'Two engineers working together to fix an error on a computer system.',
    retrievalPrompt: 'Clara and Nadia are busy right now. They ___ (solve) a server problem together.',
    retrievalSubject: 'They',
    retrievalAnswer: 'are solving',
  },
  {
    id: 'vocab-7',
    basePhrase: 'point at the screen',
    ingForm: 'pointing at the screen',
    verbBase: 'point',
    verbIng: 'pointing',
    spellingCategory: 'regular',
    ipa: '/pɔɪnt æt ðə skriːn/',
    stressGuide: 'POINT at the SCREEN',
    hubContext: 'Engineering Floor',
    meaning: 'To use your finger to show a specific place on a monitor or display.',
    contextSentence: 'Clara is pointing at the screen to show Nadia the green chart.',
    visualClue: 'Extending an index finger toward a chart on a computer monitor.',
    retrievalPrompt: 'Look at the monitor! Clara ___ (point) at the screen to show the data.',
    retrievalSubject: 'Clara (she)',
    retrievalAnswer: 'is pointing',
  },
  {
    id: 'vocab-8',
    basePhrase: 'test a solution',
    ingForm: 'testing a solution',
    verbBase: 'test',
    verbIng: 'testing',
    spellingCategory: 'regular',
    ipa: '/test ə səˈluːʃən/',
    stressGuide: 'TEST a so-LU-tion',
    hubContext: 'Engineering Floor',
    meaning: 'To try a new fix or idea to see if it works properly.',
    contextSentence: 'Nadia is testing a solution on her laptop at the moment.',
    visualClue: 'Typing commands on a laptop to check if a software fix works.',
    retrievalPrompt: 'Right now, Nadia ___ (test) a new solution on her laptop.',
    retrievalSubject: 'Nadia (she)',
    retrievalAnswer: 'is testing',
  },
  {
    id: 'vocab-9',
    basePhrase: 'organize a project',
    ingForm: 'organizing a project',
    verbBase: 'organize',
    verbIng: 'organizing',
    spellingCategory: 'drop-e',
    ipa: '/ˈɔːɡənaɪz ə ˈprɒdʒekt/',
    stressGuide: 'OR-gan-ize a PRO-ject',
    hubContext: 'Community Rooftop',
    meaning: 'To plan and coordinate people and tasks for a shared goal.',
    contextSentence: 'This week, the neighbors are organizing a project on the roof.',
    visualClue: 'Coordinating volunteers, tools, and schedules in a shared space.',
    retrievalPrompt: 'This week, Tariq and his neighbors ___ (organize) a rooftop garden project.',
    retrievalSubject: 'Tariq and his neighbors (they)',
    retrievalAnswer: 'are organizing',
  },
  {
    id: 'vocab-10',
    basePhrase: 'carry a wooden box',
    ingForm: 'carrying a wooden box',
    verbBase: 'carry',
    verbIng: 'carrying',
    spellingCategory: 'regular',
    ipa: '/ˈkæri ə ˈwʊdən bɒks/',
    stressGuide: 'CAR-ry a WOOD-en BOX',
    hubContext: 'Community Rooftop',
    meaning: 'To hold and move a container made of wood from one place to another.',
    contextSentence: 'Hannah is carrying a wooden box across the rooftop garden.',
    visualClue: 'Holding a wooden planter container with both hands while walking.',
    retrievalPrompt: 'In the center of the roof, Hannah ___ (carry) a wooden box of soil.',
    retrievalSubject: 'Hannah (she)',
    retrievalAnswer: 'is carrying',
  },
  {
    id: 'vocab-11',
    basePhrase: 'check the schedule',
    ingForm: 'checking the schedule',
    verbBase: 'check',
    verbIng: 'checking',
    spellingCategory: 'regular',
    ipa: '/tʃek ðə ˈʃedjuːl/',
    stressGuide: 'CHECK the SCHED-ule',
    hubContext: 'Community Rooftop',
    meaning: 'To look at a plan or list of times to see what happens next.',
    contextSentence: 'Amara and Sam are checking the schedule on a digital tablet.',
    visualClue: 'Looking closely at a timetable or task list on a tablet screen.',
    retrievalPrompt: 'Amara and Sam have a tablet. They ___ (check) the schedule right now.',
    retrievalSubject: 'They',
    retrievalAnswer: 'are checking',
  },
  {
    id: 'vocab-12',
    basePhrase: 'share live updates',
    ingForm: 'sharing live updates',
    verbBase: 'share',
    verbIng: 'sharing',
    spellingCategory: 'drop-e',
    ipa: '/ʃeə laɪv ˈʌpdeɪts/',
    stressGuide: 'SHARE LIVE UP-dates',
    hubContext: 'Community Rooftop',
    meaning: 'To send photos or news about what is happening right now to other people.',
    contextSentence: 'We are sharing live updates from our cities today.',
    visualClue: 'Posting real-time messages and photos from a phone or tablet.',
    retrievalPrompt: 'We are connected across three cities, and we ___ (share) live updates today.',
    retrievalSubject: 'We',
    retrievalAnswer: 'are sharing',
  },
];

export interface GrammarBoardSubject {
  id: string;
  label: string;
  pronounGroup: 'I' | 'singular' | 'plural';
  auxiliaryAffirmative: 'am' | 'is' | 'are';
  auxiliaryNegative: 'am not' | 'isn’t' | 'aren’t';
  shortPronoun: string;
}

export const GRAMMAR_SUBJECTS: GrammarBoardSubject[] = [
  { id: 'i', label: 'I', pronounGroup: 'I', auxiliaryAffirmative: 'am', auxiliaryNegative: 'am not', shortPronoun: 'I' },
  { id: 'she', label: 'She (Elena)', pronounGroup: 'singular', auxiliaryAffirmative: 'is', auxiliaryNegative: 'isn’t', shortPronoun: 'she' },
  { id: 'he', label: 'He (Tariq)', pronounGroup: 'singular', auxiliaryAffirmative: 'is', auxiliaryNegative: 'isn’t', shortPronoun: 'he' },
  { id: 'it', label: 'It (The server)', pronounGroup: 'singular', auxiliaryAffirmative: 'is', auxiliaryNegative: 'isn’t', shortPronoun: 'it' },
  { id: 'we', label: 'We', pronounGroup: 'plural', auxiliaryAffirmative: 'are', auxiliaryNegative: 'aren’t', shortPronoun: 'we' },
  { id: 'you', label: 'You', pronounGroup: 'plural', auxiliaryAffirmative: 'are', auxiliaryNegative: 'aren’t', shortPronoun: 'you' },
  { id: 'they', label: 'They (The engineers)', pronounGroup: 'plural', auxiliaryAffirmative: 'are', auxiliaryNegative: 'aren’t', shortPronoun: 'they' },
];

export interface GrammarBoardAction {
  id: string;
  base: string;
  ing: string;
  complement: string;
  whWord: string;
  whQuestionComplement: string;
  spellingNote: string;
}

export const GRAMMAR_ACTIONS: GrammarBoardAction[] = [
  {
    id: 'work',
    base: 'work',
    ing: 'working',
    complement: 'in the studio',
    whWord: 'Where',
    whQuestionComplement: 'working',
    spellingNote: 'Regular verb: work + ing → working',
  },
  {
    id: 'record',
    base: 'record',
    ing: 'recording',
    complement: 'a podcast',
    whWord: 'What',
    whQuestionComplement: 'recording',
    spellingNote: 'Regular verb: record + ing → recording',
  },
  {
    id: 'discuss',
    base: 'discuss',
    ing: 'discussing',
    complement: 'an idea',
    whWord: 'What',
    whQuestionComplement: 'discussing',
    spellingNote: 'Regular verb: discuss + ing → discussing',
  },
  {
    id: 'solve',
    base: 'solve',
    ing: 'solving',
    complement: 'a technical problem',
    whWord: 'What',
    whQuestionComplement: 'solving',
    spellingNote: 'Ends in silent -e: drop -e + ing → solving',
  },
  {
    id: 'prepare',
    base: 'prepare',
    ing: 'preparing',
    complement: 'a live broadcast',
    whWord: 'Why',
    whQuestionComplement: 'preparing a live broadcast',
    spellingNote: 'Ends in silent -e: drop -e + ing → preparing',
  },
  {
    id: 'sit',
    base: 'sit',
    ing: 'sitting',
    complement: 'at the main table',
    whWord: 'Where',
    whQuestionComplement: 'sitting',
    spellingNote: 'Short CVC verb (s-i-t): double final t + ing → sitting',
  },
  {
    id: 'run',
    base: 'run',
    ing: 'running',
    complement: 'a speed test',
    whWord: 'What',
    whQuestionComplement: 'running',
    spellingNote: 'Short CVC verb (r-u-n): double final n + ing → running',
  },
];

export const GRAMMAR_TIME_EXPRESSIONS = [
  { id: 'right-now', label: 'right now.', usage: 'Happening at this exact second' },
  { id: 'now', label: 'now.', usage: 'Happening at the present moment' },
  { id: 'at-the-moment', label: 'at the moment.', usage: 'In progress right now' },
  { id: 'today', label: 'today.', usage: 'Happening during the current day' },
  { id: 'this-week', label: 'this week.', usage: 'Ongoing project or activity around the present' },
];

export interface SpellingChallengeItem {
  id: string;
  baseVerb: string;
  correctIng: string;
  ruleType: 'regular' | 'drop-e' | 'double-consonant';
  ruleExplanation: string;
  contextClue: string;
}

export const SPELLING_LAB_ITEMS: SpellingChallengeItem[] = [
  {
    id: 'sp-1',
    baseVerb: 'prepare',
    correctIng: 'preparing',
    ruleType: 'drop-e',
    ruleExplanation: '"Prepare" ends in a silent -e. Drop the -e before adding -ing: prepar + ing.',
    contextClue: 'Sora is ___ the evening broadcast.',
  },
  {
    id: 'sp-2',
    baseVerb: 'sit',
    correctIng: 'sitting',
    ruleType: 'double-consonant',
    ruleExplanation: '"Sit" is a one-syllable verb ending in Consonant-Vowel-Consonant (s-i-t). Double the final t: sitting.',
    contextClue: 'The guests are ___ at the studio table.',
  },
  {
    id: 'sp-3',
    baseVerb: 'carry',
    correctIng: 'carrying',
    ruleType: 'regular',
    ruleExplanation: 'For verbs ending in -y, keep the -y and simply add -ing: carry + ing → carrying.',
    contextClue: 'Hannah is ___ a wooden box of herbs.',
  },
  {
    id: 'sp-4',
    baseVerb: 'share',
    correctIng: 'sharing',
    ruleType: 'drop-e',
    ruleExplanation: '"Share" ends in a silent -e. Drop the -e and add -ing: shar + ing.',
    contextClue: 'They are ___ live photos from London.',
  },
  {
    id: 'sp-5',
    baseVerb: 'run',
    correctIng: 'running',
    ruleType: 'double-consonant',
    ruleExplanation: '"Run" ends in Consonant-Vowel-Consonant (r-u-n). Double the n before adding -ing: running.',
    contextClue: 'Nadia is ___ a diagnostic check now.',
  },
  {
    id: 'sp-6',
    baseVerb: 'check',
    correctIng: 'checking',
    ruleType: 'regular',
    ruleExplanation: 'Most verbs simply add -ing to the base form: check + ing → checking.',
    contextClue: 'Sam is ___ the schedule on his tablet.',
  },
];

export interface ListeningTurn {
  id: string;
  speaker: string;
  role: string;
  city: string;
  startTime: number;
  endTime: number;
  text: string;
  keyStructure: string;
}

export const LISTENING_SCRIPT: ListeningTurn[] = [
  {
    id: 'turn-1',
    speaker: 'Sora Takahashi',
    role: 'Global Broadcast Director',
    city: 'Tokyo Control Room',
    startTime: 0,
    endTime: 14,
    text: 'Hello everyone, I am Sora in the control room. Right now, we are preparing our global live crossover. Elena, are you ready in Madrid?',
    keyStructure: 'we are preparing / are you ready',
  },
  {
    id: 'turn-2',
    speaker: 'Elena Vargas',
    role: 'Podcast Host',
    city: 'Madrid Studio 4',
    startTime: 14,
    endTime: 30,
    text: 'Hi Sora! Yes, I am. I am wearing my headphones and adjusting the mixer right now. My two guests are sitting here with me, and we are drinking water before we start.',
    keyStructure: 'Yes, I am / I am wearing / adjusting / are sitting / are drinking',
  },
  {
    id: 'turn-3',
    speaker: 'Sora Takahashi',
    role: 'Global Broadcast Director',
    city: 'Tokyo Control Room',
    startTime: 30,
    endTime: 42,
    text: 'Wonderful. What are you discussing on the program today, Elena?',
    keyStructure: 'What are you discussing... today?',
  },
  {
    id: 'turn-4',
    speaker: 'Elena Vargas',
    role: 'Podcast Host',
    city: 'Madrid Studio 4',
    startTime: 42,
    endTime: 56,
    text: 'Today we are talking about local neighborhood projects. That is why Tariq is joining us from London right now!',
    keyStructure: 'we are talking / Tariq is joining',
  },
  {
    id: 'turn-5',
    speaker: 'Tariq Hassan',
    role: 'Community Garden Coordinator',
    city: 'London Rooftop',
    startTime: 56,
    endTime: 74,
    text: 'Hello from London! I am not sitting in a quiet studio today. My neighbors and I are working outside on our rooftop garden. Right now, Hannah is carrying a box of plants, and Sam is checking our schedule.',
    keyStructure: 'I am not sitting / are working / is carrying / is checking',
  },
  {
    id: 'turn-6',
    speaker: 'Sora Takahashi',
    role: 'Global Broadcast Director',
    city: 'Tokyo Control Room',
    startTime: 74,
    endTime: 88,
    text: 'The video feed from London looks very clear! Clara and Nadia in Toronto are testing the server right now, and everything is working well. Let’s go live in thirty seconds!',
    keyStructure: 'are testing / everything is working',
  },
];

export interface ListeningQuestion {
  id: string;
  type: 'detail' | 'question-form' | 'interpretation';
  typeLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  {
    id: 'lq-1',
    type: 'detail',
    typeLabel: 'Spoken Detail Recognition',
    question: 'What are Elena and her guests doing right before the broadcast starts?',
    options: [
      'They are eating lunch in the kitchen.',
      'They are sitting in the studio and drinking water.',
      'They are walking outside in Madrid.',
    ],
    correctIndex: 1,
    feedback: 'Elena says: "My two guests are sitting here with me, and we are drinking water before we start."',
  },
  {
    id: 'lq-2',
    type: 'detail',
    typeLabel: 'Negative Statement Comprehension',
    question: 'What does Tariq say he is NOT doing today?',
    options: [
      'He is not sitting in a quiet studio today.',
      'He is not talking to Elena today.',
      'He is not working with his neighbors.',
    ],
    correctIndex: 0,
    feedback: 'Tariq explicitly contrasts his location with Elena’s: "I am not sitting in a quiet studio today. My neighbors and I are working outside..."',
  },
  {
    id: 'lq-3',
    type: 'interpretation',
    typeLabel: 'Contextual Interpretation',
    question: 'Why is Tariq joining Elena’s podcast from a rooftop in London instead of a studio?',
    options: [
      'Because the London audio studio is closed for repairs this week.',
      'Because Elena is discussing neighborhood projects today, and Tariq is showing his community garden live in action.',
      'Because Tariq is testing computer servers with Clara and Nadia.',
    ],
    correctIndex: 1,
    feedback: 'Interpretation: Elena explains that they are talking about local neighborhood projects today, so Tariq is connecting live from the rooftop project while his team works.',
  },
  {
    id: 'lq-4',
    type: 'interpretation',
    typeLabel: 'Cross-Team Connection',
    question: 'How does Clara and Nadia’s work in Toronto help Sora, Elena, and Tariq right now?',
    options: [
      'Clara and Nadia are writing the questions for Elena’s interview.',
      'Their server test keeps the live video feed from London clear for the broadcast.',
      'They are sending wooden planter boxes to London.',
    ],
    correctIndex: 1,
    feedback: 'Sora notes that the video feed from London looks clear because Clara and Nadia in Toronto are testing the server right now.',
  },
];

export interface SentenceReconstructionTask {
  id: string;
  contextHint: string;
  sentenceType: 'Affirmative' | 'Negative' | 'Yes/No Question' | 'Wh- Question';
  scrambledWords: string[];
  targetSentence: string;
  grammarExplanation: string;
}

export const RECONSTRUCTION_TASKS: SentenceReconstructionTask[] = [
  {
    id: 'rec-1',
    contextHint: 'Describe what Elena is doing with the sound equipment right now.',
    sentenceType: 'Affirmative',
    scrambledWords: ['the', 'is', 'right', 'Elena', 'mixer', 'adjusting', 'now.'],
    targetSentence: 'Elena is adjusting the mixer right now.',
    grammarExplanation: 'Affirmative order: Subject (Elena) + is + verb-ing (adjusting) + object (the mixer) + time expression (right now.).',
  },
  {
    id: 'rec-2',
    contextHint: 'Explain that the engineers in Toronto are not taking a break.',
    sentenceType: 'Negative',
    scrambledWords: ['taking', 'They', 'moment.', 'a', 'the', 'aren’t', 'break', 'at'],
    targetSentence: 'They aren’t taking a break at the moment.',
    grammarExplanation: 'Negative order: Subject (They) + aren’t (are not) + verb-ing (taking) + complement (a break at the moment.).',
  },
  {
    id: 'rec-3',
    contextHint: 'Ask a Yes/No question about Hannah on the London rooftop.',
    sentenceType: 'Yes/No Question',
    scrambledWords: ['wooden', 'carrying', 'Hannah', 'a', 'Is', 'box', 'now?'],
    targetSentence: 'Is Hannah carrying a wooden box now?',
    grammarExplanation: 'Yes/No question order: Auxiliary (Is) + Subject (Hannah) + verb-ing (carrying) + complement (a wooden box now?).',
  },
  {
    id: 'rec-4',
    contextHint: 'Ask a Wh- question about what Nadia and Clara are solving today.',
    sentenceType: 'Wh- Question',
    scrambledWords: ['are', 'solving', 'What', 'today?', 'engineers', 'the'],
    targetSentence: 'What are the engineers solving today?',
    grammarExplanation: 'Wh- question order: Wh- word (What) + Auxiliary (are) + Subject (the engineers) + verb-ing (solving) + time (today?).',
  },
];

export interface ErrorCorrectionTask {
  id: string;
  internNote: string;
  errorHighlight: string;
  context: string;
  options: string[];
  correctOption: string;
  diagnosticFeedback: string;
}

export const ERROR_CORRECTION_TASKS: ErrorCorrectionTask[] = [
  {
    id: 'err-1',
    internNote: 'Clara and Nadia is solving a server problem right now.',
    errorHighlight: 'is solving',
    context: 'Plural subject agreement (Clara and Nadia = They)',
    options: ['am solving', 'are solving', 'solving'],
    correctOption: 'are solving',
    diagnosticFeedback: '"Clara and Nadia" is a plural subject (they), so we need the plural auxiliary "are": Clara and Nadia are solving.',
  },
  {
    id: 'err-2',
    internNote: 'Look at the studio! Sora is prepareing the live broadcast.',
    errorHighlight: 'prepareing',
    context: 'Spelling pattern for verbs ending in silent -e',
    options: ['preparing', 'preparring', 'prepare'],
    correctOption: 'preparing',
    diagnosticFeedback: 'The verb "prepare" ends in a silent -e. We drop the -e before adding -ing: preparing.',
  },
  {
    id: 'err-3',
    internNote: 'You are wearing studio headphones at the moment?',
    errorHighlight: 'You are wearing',
    context: 'Word order in Yes/No questions',
    options: ['Are you wearing', 'Do you wearing', 'Is you wearing'],
    correctOption: 'Are you wearing',
    diagnosticFeedback: 'In a Present Continuous question, the auxiliary verb "Are" comes before the subject "you": Are you wearing...?',
  },
  {
    id: 'err-4',
    internNote: 'Tariq not is working inside an office today.',
    errorHighlight: 'not is working',
    context: 'Position of "not" in negative statements',
    options: ['isn’t working', 'aren’t working', 'doesn’t working'],
    correctOption: 'isn’t working',
    diagnosticFeedback: 'In negative sentences, "not" goes after the auxiliary verb "is" (is not working / isn’t working).',
  },
];

export interface InfoGapScenario {
  id: string;
  person: string;
  city: string;
  plannedSchedule: string;
  liveCameraReality: string;
  prompt: string;
  negativeOptions: string[];
  correctNegative: string;
  affirmativeOptions: string[];
  correctAffirmative: string;
  explanation: string;
}

export const INFO_GAP_SCENARIOS: InfoGapScenario[] = [
  {
    id: 'gap-1',
    person: 'Nadia (Toronto)',
    city: '10:00 AM Schedule vs. Live Camera',
    plannedSchedule: '10:00 AM — Write weekly project emails',
    liveCameraReality: 'Live Camera: Testing a server solution on her laptop',
    prompt: 'Compare Nadia’s planned schedule with the live camera feed:',
    negativeOptions: [
      'Nadia isn’t writing emails right now.',
      'Nadia aren’t writing emails right now.',
      'Nadia not writing emails right now.',
    ],
    correctNegative: 'Nadia isn’t writing emails right now.',
    affirmativeOptions: [
      'She is testing a server solution.',
      'She testing a server solution.',
      'She are testing a server solution.',
    ],
    correctAffirmative: 'She is testing a server solution.',
    explanation: 'We use "isn’t writing" for the scheduled action that is not happening, and "is testing" for what she is actually doing right now.',
  },
  {
    id: 'gap-2',
    person: 'Amara & Sam (London)',
    city: '15:00 GMT Schedule vs. Live Camera',
    plannedSchedule: '15:00 GMT — Water the tomato plants',
    liveCameraReality: 'Live Camera: Checking the planting schedule on a tablet',
    prompt: 'Compare Amara and Sam’s schedule with the live rooftop camera:',
    negativeOptions: [
      'They isn’t watering the plants at the moment.',
      'They aren’t watering the plants at the moment.',
      'They don’t watering the plants at the moment.',
    ],
    correctNegative: 'They aren’t watering the plants at the moment.',
    affirmativeOptions: [
      'They is checking the schedule on a tablet.',
      'They are checking the schedule on a tablet.',
      'They checking the schedule on a tablet.',
    ],
    correctAffirmative: 'They are checking the schedule on a tablet.',
    explanation: 'For plural subjects (Amara and Sam = They), we use "aren’t watering" and "are checking".',
  },
];

export interface ChallengeZone {
  id: string;
  zoneLabel: string;
  people: string;
  role: string;
  positionClass: string;
  ongoingActions: string[];
  notDoingAction: string;
  suggestedVerbs: string[];
  sampleQuestion: string;
  sampleShortAnswer: string;
}

export const CHALLENGE_HUB_ZONES: ChallengeZone[] = [
  {
    id: 'zone-a',
    zoneLabel: 'Zone A · Foreground Camera Rig',
    people: 'Nina',
    role: 'Video Producer',
    positionClass: 'bottom-12 left-8',
    ongoingActions: ['testing a broadcast camera on a tripod', 'checking the camera lens'],
    notDoingAction: 'not wearing headphones right now',
    suggestedVerbs: ['test the camera', 'adjust the lens', 'hold the tripod'],
    sampleQuestion: 'Is Nina testing the camera right now?',
    sampleShortAnswer: 'Yes, she is.',
  },
  {
    id: 'zone-b',
    zoneLabel: 'Zone B · Center Glass Board',
    people: 'Sofia and Liam',
    role: 'Product Designers',
    positionClass: 'top-1/3 left-1/2 -translate-x-1/2',
    ongoingActions: ['standing at the whiteboard', 'pointing at the sketches', 'discussing an idea'],
    notDoingAction: 'not sitting at their desks',
    suggestedVerbs: ['discuss an idea', 'point at the board', 'organize the layout'],
    sampleQuestion: 'What are Sofia and Liam discussing at the board?',
    sampleShortAnswer: 'They are discussing the new design layout.',
  },
  {
    id: 'zone-c',
    zoneLabel: 'Zone C · Right Worktable',
    people: 'David',
    role: 'Systems Developer',
    positionClass: 'bottom-10 right-12',
    ongoingActions: ['sitting at the wooden table', 'wearing headphones', 'typing code on his laptop'],
    notDoingAction: 'not talking to Sofia and Liam',
    suggestedVerbs: ['wear headphones', 'type on a laptop', 'test a solution'],
    sampleQuestion: 'Is David talking on the phone at the moment?',
    sampleShortAnswer: 'No, he isn’t. He is typing on his laptop.',
  },
  {
    id: 'zone-d',
    zoneLabel: 'Zone D · Tall Windows',
    people: 'Carmen',
    role: 'Event Coordinator',
    positionClass: 'top-1/3 right-10',
    ongoingActions: ['standing near the window', 'holding an open notebook', 'talking on her phone'],
    notDoingAction: 'not using a computer right now',
    suggestedVerbs: ['talk on the phone', 'hold a notebook', 'check the schedule'],
    sampleQuestion: 'Where is Carmen standing right now?',
    sampleShortAnswer: 'She is standing by the tall windows.',
  },
];

export interface AudioManifestEntry {
  filename: string;
  expectedPath: string;
  activity: string;
  speaker: string;
  intendedTone: string;
  duration: string;
  script: string;
}

export const AUDIO_PRODUCTION_MANIFEST: AudioManifestEntry[] = [
  {
    filename: 'eh-a12-pc-listen-01.mp3',
    expectedPath: '/assets/audio/listening/eh-a12-pc-listen-01.mp3',
    activity: 'Module 04 — Listening Experience: Live Crossover (Three Cities at Once)',
    speaker: 'Multi-speaker ensemble: Sora Takahashi (Tokyo), Elena Vargas (Madrid), Tariq Hassan (London)',
    intendedTone: 'Natural, warm, engaged broadcast documentary pacing suitable for CEFR A1.2 (approx. 115–125 wpm, clear articulation of auxiliaries and -ing endings)',
    duration: '01:28',
    script: LISTENING_SCRIPT.map((t) => `[${t.speaker} - ${t.city}]: "${t.text}"`).join('\n'),
  },
  {
    filename: 'eh-a12-pc-dispatch-madrid.mp3',
    expectedPath: '/assets/audio/dispatches/eh-a12-pc-dispatch-madrid.mp3',
    activity: 'Module 01 — Contextual Dispatch 1: Madrid Studio 4 Audio Lab',
    speaker: 'Narrator (Neutral International English, warm documentary voice)',
    intendedTone: 'Observational, clear, measured documentary narration',
    duration: '00:26',
    script: 'Right now, Elena is recording a new episode in Studio 4. She is wearing studio headphones and adjusting the audio mixer with her right hand. Two guests are sitting across the wooden table. At the moment, they are discussing an idea for a community arts festival. Elena isn’t checking her phone—she is listening carefully to her guests.',
  },
  {
    filename: 'eh-a12-pc-dispatch-toronto.mp3',
    expectedPath: '/assets/audio/dispatches/eh-a12-pc-dispatch-toronto.mp3',
    activity: 'Module 01 — Contextual Dispatch 2: Toronto North Engineering Floor',
    speaker: 'Narrator (Neutral International English, warm documentary voice)',
    intendedTone: 'Focused, inquisitive documentary narration',
    duration: '00:28',
    script: 'It is ten o’clock in the morning in Toronto, and Clara and Nadia are solving a technical problem. Why are they working at the same desk right now? Because the main video server is running slowly today. Clara is holding a paper notebook and pointing at the screen. Nadia is testing a solution on her laptop. They aren’t taking a coffee break at the moment—they are preparing the system for a global broadcast.',
  },
  {
    filename: 'eh-a12-pc-dispatch-london.mp3',
    expectedPath: '/assets/audio/dispatches/eh-a12-pc-dispatch-london.mp3',
    activity: 'Module 01 — Contextual Dispatch 3: London East Roof Community Garden',
    speaker: 'Narrator (Neutral International English, warm documentary voice)',
    intendedTone: 'Upbeat, outdoor observational documentary narration',
    duration: '00:29',
    script: 'This week, Tariq and his neighbors are organizing a community project on a sunny rooftop in London. Right now, Tariq is kneeling by a planter and planting fresh green herbs. Behind him, Hannah is carrying a wooden box filled with soil. On the right, Amara and Sam are checking the schedule on a tablet. Are they working inside an office today? No, they aren’t. They are sharing live updates from the roof.',
  },
  ...VOCABULARY_ITEMS.map((item, idx) => ({
    filename: `eh-a12-pc-vocab-${String(idx + 1).padStart(2, '0')}.mp3`,
    expectedPath: `/assets/audio/vocabulary/eh-a12-pc-vocab-${String(idx + 1).padStart(2, '0')}.mp3`,
    activity: `Module 02 — Active Vocabulary Studio (${item.basePhrase})`,
    speaker: 'Lexicon Reference Voice (Clear British/International English)',
    intendedTone: 'Clear lexical citation followed by natural sentence intonation',
    duration: '00:08',
    script: `${item.basePhrase}. ${item.ingForm}. ${item.contextSentence}`,
  })),
];
