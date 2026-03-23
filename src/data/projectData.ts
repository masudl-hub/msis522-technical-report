export interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  note: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
}

export interface GalleryItem {
  title: string;
  caption: string;
  assetPath?: string;
  placeholder?: string;
}

export interface StackGroup {
  category: string;
  tools: string[];
  note: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  highlights: string[];
}

export interface ArchitectureItem {
  title: string;
  description: string;
}

export interface CodeHighlight {
  title: string;
  language: string;
  note: string;
  code: string;
}

export interface RoadmapPhase {
  phase: string;
  items: string[];
}

export interface RiskItem {
  title: string;
  mitigation: string;
}

export interface ProjectPageData {
  slug: string;
  title: string;
  subtitle: string;
  ownerLine: string;
  executiveSummary: string;
  instructions: string[];
  links: ProjectLink[];
  badges: string[];
  methods: string[];
  metrics: ProjectMetric[];
  problemStatement: string;
  solutionSummary: string;
  audience: string;
  impactGoal: string;
  status: string;
  keywords: string[];
  members: TeamMember[];
  gallery: GalleryItem[];
  stack: StackGroup[];
  features: FeatureCard[];
  architecture: ArchitectureItem[];
  codeHighlights: CodeHighlight[];
  roadmap: RoadmapPhase[];
  risks: RiskItem[];
}

export const projectData: ProjectPageData = {
  slug: 'orchid-plant-care-companion',

  title: 'Orchid',
  subtitle:
    'An AI plant care companion with live voice, computer vision, and cross-channel memory — built for how people actually care for plants.',
  ownerLine: 'Masud Lewis — MSIS 522',
  executiveSummary:
    'Plant care is a $21B market dominated by passive apps that show generic watering schedules. These tools fail the moment a user encounters an unexpected yellow leaf, an unidentified specimen, or a care question that depends on their specific environment. Orchid solves this with a conversational AI assistant accessible through Telegram, a PWA, or a live voice call. Powered by a multi-modal Gemini 3 architecture routed through the Lovable AI Gateway, enriched with Perplexity Sonar for real-time research, and backed by a hierarchical memory system spanning a PostgreSQL database, Orchid identifies plants from photos in under 3 seconds, delivers proactive care reminders on user-defined schedules, generates AI-illustrated visual care guides, and maintains full cross-channel memory so a conversation started on Telegram continues seamlessly in the browser or over voice.',

  instructions: [],

  links: [
    { label: 'Live App', url: 'https://orchid.masudlewis.com', primary: true },
    { label: 'GitHub Repo', url: 'https://github.com/masudl-hub/orchidcare' },
    { label: 'Technical Report', url: '/project-assets/technical-report.md' },
  ],

  badges: [
    'React 18',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Supabase',
    'Gemini 3 Flash / Pro',
    'Gemini Live API',
    'PixiJS',
    'Telegram Bot API',
    'Perplexity Sonar',
    'Deno Edge Functions',
  ],

  keywords: ['conversational-ai', 'plant-care', 'multi-modal', 'voice-ai', 'generative-ui'],

  methods: [
    'Agentic tool-calling loop (24 tools across 8 categories)',
    'Hierarchical memory architecture (5-tier context loading)',
    'Multi-modal vision + audio streaming',
    'Generative UI via PixiJS Pixel Canvas',
    'HMAC-based Telegram auth + ephemeral token voice sessions',
  ],

  metrics: [
    { label: 'Team', value: '1 developer', note: 'Solo full-stack build by Masud Lewis' },
    { label: 'Core Users', value: 'Plant owners', note: 'Beginners (1–3 yr) and intermediate collectors (3–7 yr)' },
    { label: 'AI Tools', value: '24 tools', note: 'Vision, research, memory, care tracking, shopping, and more' },
    { label: 'Channels', value: '3 surfaces', note: 'Telegram bot, PWA web app, and live voice calls' },
  ],

  problemStatement:
    'Generic care guides are useless without knowing the pot, soil, light, and species. When something goes wrong, the user turns to Google or Reddit and gets conflicting, context-free answers. The result is decision paralysis and plant death. Existing tools (Greg, Planta, Vera) deliver scheduled notifications but can\'t engage with unexpected problems, learn from experience, or reason about photos. They are care calendars, not care assistants.',

  solutionSummary:
    'Orchid is a conversational AI plant care assistant on Telegram, web, and live voice. Send a photo — get species ID, diagnosis, and a care plan. Save plants, set reminders, receive proactive check-ins. Memory persists across all channels. Built on Supabase Edge Functions (Deno), Gemini 3 Flash/Pro, Gemini Live API, and Perplexity Sonar — serverless, zero infrastructure.',

  audience: 'Beginner plant owners (1–3 years) with high care anxiety, and intermediate collectors (3–7 years) managing complex care schedules',
  impactGoal: 'Reduce plant mortality caused by information gaps — turning generic advice into personalized, context-aware care through conversational AI',
  status: 'Live Tool',

  members: [
    {
      name: 'Masud Lewis',
      role: 'Designer & Developer',
      focus: 'Product design, full-stack architecture, AI agent design, multi-channel integration, Pixel Canvas system, voice pipeline, database design, and deployment',
    },
  ],

  gallery: [
    {
      title: 'Chat: Care Guide Generation',
      caption:
        'Web chat interface generating a comprehensive Variegated Monstera care guide with embedded AI-illustrated infographic (Step 1 of 3: preparation and setup).',
      assetPath: '/project-assets/ss-chat-care-guide.png',
    },
    {
      title: 'Chat: Guide Steps 2 & 3',
      caption:
        'Continuation showing AI-generated watering/light/soil specifics (Step 2) and aftercare with recovery timeline and signs of success (Step 3).',
      assetPath: '/project-assets/ss-chat-guide-steps.png',
    },
    {
      title: 'Tool Confirmation UX',
      caption:
        'The agent permission system in action — "capture_plant_snapshot" requires user confirmation (first time this session) with Allow/Reject buttons.',
      assetPath: '/project-assets/ss-tool-confirmation.png',
    },
    {
      title: 'API Documentation',
      caption:
        'Developer-facing REST API docs with curl examples, JSON response format, and Bearer token authentication. Third-party apps get full access to the same AI that powers the chat.',
      assetPath: '/project-assets/ss-api-docs.png',
    },
    {
      title: 'Live Voice Call',
      caption:
        'Real-time voice interaction with the Orchid AI. The Pixel Canvas displays a dithered plant visualization while audio streams bidirectionally via Gemini Live WebSocket.',
      assetPath: '/project-assets/ss-voice-call-1.png',
    },
    {
      title: 'Voice Call (Alternate View)',
      caption:
        'A different moment in a live voice call showing the Pixel Canvas rendering a different plant composition with microphone, hang-up, and camera controls.',
      assetPath: '/project-assets/ss-voice-call-2.png',
    },
    {
      title: 'Telegram: Identification & Diagnosis',
      caption:
        'User sends a photo of a struggling Heartleaf Philodendron; Orchid identifies the species, diagnoses root stress, and adapts advice to the user\'s Seattle climate.',
      assetPath: '/project-assets/orchid-telegram-diagnosis.png',
    },
    {
      title: 'Telegram: AI Visual Guides',
      caption:
        'AI-generated step-by-step repotting guide delivered as image cards directly in Telegram — from preparing materials through replanting and watering.',
      assetPath: '/project-assets/orchid-telegram-guides.png',
    },
    {
      title: 'Telegram: Voice & Shopping',
      caption:
        'Voice note transcription, collection management, reminders, and location-aware local store recommendations — all in a single Telegram conversation.',
      assetPath: '/project-assets/orchid-telegram-voice.png',
    },
    {
      title: 'Web: Shopping & Propagation',
      caption:
        'PWA chat interface with local nursery recommendations powered by Perplexity Sonar, followed by live propagation illustration generation.',
      assetPath: '/project-assets/orchid-web-shopping.png',
    },
    {
      title: 'Web: Visual Guides',
      caption:
        'Step-by-step illustrated Monstera propagation guide generated by Gemini 3 Pro Image, rendered in the Botanical Pixels aesthetic in the web chat.',
      assetPath: '/project-assets/orchid-web-visualguides.png',
    },
  ],

  stack: [
    {
      category: 'Frontend & Experience',
      tools: [
        'React 18',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Shadcn UI (Radix)',
        'TanStack Query',
        'React Router v6',
        'Framer Motion',
      ],
      note: 'Single-page application with responsive design, server-state caching via TanStack Query, and a custom "Botanical Pixels" design system using Press Start 2P pixel font.',
    },
    {
      category: 'Generative UI & Graphics',
      tools: [
        'PixiJS 8 (WebGL)',
        'Pixel Canvas (70×98 grid)',
        '82 plant silhouettes',
        '37 tool formations',
        'Morph/dissolve/scatter animations',
      ],
      note: 'A dynamic pixel grid that morphs into plant silhouettes, displays tool icons, and renders text — controlled by the LLM via the show_visual tool call during live voice sessions.',
    },
    {
      category: 'AI Models & Orchestration',
      tools: [
        'Gemini 3 Flash (text orchestration)',
        'Gemini 3 Pro (vision + image gen)',
        'Gemini 2.5 Flash Native Audio (voice)',
        'Perplexity Sonar (web research)',
        'Lovable AI Gateway',
      ],
      note: 'Multi-model routing: Flash for fast text, Pro for vision and image generation, Native Audio for bidirectional voice streaming, Sonar for real-time web search. All non-voice calls route through the Lovable AI Gateway.',
    },
    {
      category: 'Backend & Data',
      tools: [
        'Supabase (PostgreSQL 15)',
        'Supabase Edge Functions (Deno)',
        'Row-Level Security',
        'Supabase Auth (JWT)',
        'Supabase Storage',
        'Supabase Realtime',
      ],
      note: '10 serverless edge functions, 19+ database tables with RLS on all, 2 storage buckets for photos and generated guides. Zero-infrastructure deployment via Lovable Cloud.',
    },
    {
      category: 'Integrations & Channels',
      tools: [
        'Telegram Bot API (grammY)',
        'Telegram Mini App (WebApp)',
        'Web Audio API (16kHz PCM)',
        'OpenStreetMap Nominatim',
        'HMAC-SHA256 auth',
      ],
      note: 'Three delivery surfaces: Telegram bot with inline keyboard onboarding, installable PWA with NDJSON streaming, and a live voice call interface launched from Telegram Mini App or browser.',
    },
  ],

  features: [
    {
      title: 'Plant Identification & Diagnosis',
      description:
        'Users send a photo via Telegram or the web app. Orchid identifies the species using Gemini 3 Pro vision, diagnoses health issues from visual symptoms, and generates a treatment plan — all in one turn. Results are saved to the plant collection automatically.',
      highlights: [
        'Species identification from photos in under 3 seconds',
        'Visual symptom analysis with severity assessment',
        'Pet and child toxicity warnings injected proactively',
        'Ambiguous photos trigger honest uncertainty and re-prompt',
      ],
    },
    {
      title: 'Live Voice Calls with Generative UI',
      description:
        'Real-time bidirectional audio streaming via Gemini Live API. During voice conversations, the Pixel Canvas — a 70×98 PixiJS grid — morphs into plant silhouettes, tool icons, and text based on what the AI is discussing. The LLM controls the canvas through client-side tool calls.',
      highlights: [
        'WebSocket audio streaming with sub-200ms latency',
        '82 plant species + 37 tool formations in the Pixel Canvas',
        'Server-side tool execution mid-call (save plant, set reminder)',
        'Post-call transcript summarization and insight extraction',
      ],
    },
    {
      title: 'AI-Generated Visual Care Guides',
      description:
        'Orchid generates step-by-step illustrated care guides using Gemini 3 Pro Image in the "Botanical Pixels" aesthetic. Guides cover propagation, repotting, pest treatment, and seasonal care — delivered as image cards in Telegram or rendered inline on the web.',
      highlights: [
        'AI-illustrated botanical art generated on demand',
        'Guides personalized to the user\'s specific plant and environment',
        'Stored in Supabase Storage with signed URL access',
        'Delivered as multi-image sequences in Telegram',
      ],
    },
    {
      title: 'Cross-Channel Memory & Proactive Care',
      description:
        'A 5-tier hierarchical memory system ensures Orchid remembers everything: recent messages, compressed conversation summaries, semantic user facts, visual plant history, and active care schedules. Proactive reminders are delivered via Telegram on user-defined schedules with quiet hours enforcement.',
      highlights: [
        'Conversations started on Telegram continue seamlessly on web or voice',
        'User insights extracted and stored (lighting, pets, watering habits)',
        'Proactive watering reminders, seasonal tips, and health follow-ups',
        'Configurable quiet hours and topic subscriptions per user',
      ],
    },
    {
      title: 'Telegram-First Onboarding',
      description:
        'Zero-install entry via @orchidcare_bot. A 5-step inline keyboard questionnaire collects name, personality preference, experience level, pets, and location. Profile creation happens server-side with synthetic Supabase Auth accounts, enabling seamless web account linking via magic link.',
      highlights: [
        'No app store, no download — start with a Telegram message',
        'Account linking between Telegram and web via 6-digit code',
        'Deep links with QR fallback for desktop users',
        'Bot commands: /start, /call, /web, /myplants, /profile',
      ],
    },
    {
      title: 'Developer REST API',
      description:
        'A public REST API for third-party integrations, authenticated with SHA-256 hashed API keys (orch_ prefix). Rate-limited with per-request logging, the API proxies directly to orchid-agent for full AI capabilities.',
      highlights: [
        'API key management UI at /developer',
        'Rolling 1-minute rate limiting via api_usage_log',
        'Full tool access through the same agent pipeline',
        'Per-request audit trail with latency tracking',
      ],
    },
  ],

  architecture: [
    {
      title: 'Client Layer',
      description:
        'Three surfaces feed into the system: Telegram Bot (webhook), PWA/Web App (HTTPS + NDJSON streaming), and Voice Call UI (WebSocket audio to Gemini Live + HTTPS tool calls to call-session). The web app is a React 18 SPA with TanStack Query for server state.',
    },
    {
      title: 'Edge Function Layer',
      description:
        'Ten Supabase Edge Functions running Deno: telegram-bot, pwa-agent, demo-agent, call-session, summarise-call, proactive-agent, orchid-agent (core 4,054-line AI loop), api, dev-call-proxy, and delete-account. All channel-specific functions delegate to orchid-agent for AI logic.',
    },
    {
      title: 'AI Reasoning Layer',
      description:
        'orchid-agent loads hierarchical context (5 parallel DB queries), assembles a 12-section system prompt, and enters a tool-calling loop with Gemini 3 Flash. Up to MAX_TOOL_ITERATIONS per turn. Vision tasks route to Gemini 3 Pro. Research queries route to Perplexity Sonar. Voice calls stream directly to Gemini Live via WebSocket.',
    },
    {
      title: 'Data Layer',
      description:
        'PostgreSQL 15 with 19+ tables, 3 custom enums, 4 database functions, and RLS on every table. Two storage buckets (plant-photos, generated-guides) with signed URL access. Conversation history, user insights, plant snapshots, care events, and reminders persist across all channels.',
    },
  ],

  codeHighlights: [
    {
      title: 'Voice Call — Client/Server Tool Bifurcation',
      language: 'ts',
      note: 'Mid-call tool dispatch: show_visual runs client-side (zero latency), save_plant routes to the edge function. Video frames injected on the fly.',
      code: `for (const fc of functionCalls) {
  if (fc.name === 'show_visual') {
    // Client-side — no network round-trip
    const formation: Formation = {
      type: (args.type as Formation['type']) || 'template',
      id: args.id as string | undefined,
      text: args.text as string | undefined,
      transition: (args.transition as TransitionType) || undefined,
    };
    if (formationBusyRef.current) {
      formationQueueRef.current.push(formation);
    } else {
      formationBusyRef.current = true;
      setCurrentFormation(formation);
    }
    clientResponses.push({ id: fc.id!, name: fc.name!, response: { displayed: true } });
  } else {
    // Server-side — POST to call-session/tools
    if (fc.name === 'capture_plant_snapshot') {
      const highRes = video.captureHighResFrame();
      if (highRes) toolArgs = { ...toolArgs, image_base64: highRes.split(',')[1] };
    }
    serverCalls.push(fc);
  }
}
session.sendToolResponse({ functionResponses: clientResponses });`,
    },
    {
      title: 'Proactive Agent — LLM Triage with Quiet Hours',
      language: 'ts',
      note: 'Autonomous messaging: 9 parallel signal queries, timezone-aware quiet hours, then LLM decides whether to message.',
      code: `if (isQuietHours(quietStart, quietEnd, profile.timezone)) {
  trackSkip('quiet_hours');
  continue;
}

const [dueReminders, inactivePlants, diagnosisFollowups,
       sensorAlerts, offlineDevices, sensorTrends,
       weather, sensorSnapshot, recentCareEvents]
  = await Promise.all([/* 9 parallel DB queries */]);

const triageResponse = await fetch(GATEWAY, {
  body: JSON.stringify({
    model: "google/gemini-3-flash-preview",
    messages: [{
      role: 'user',
      content: \`EVENTS: \${formattedEvents}
Assess: Should we message right now?
- Only if genuinely useful or timely
- Critical sensor alerts always warrant a message
- Combine related signals (hot weather + dry soil = urgent)
Return: {"should_message": bool, "reasoning": "..."}\`
    }],
  }),
});

if (!triageResult.should_message) { trackSkip('llm_triage'); continue; }`,
    },
    {
      title: 'Context Engine — Sensor + Visual + Care Weaving',
      language: 'ts',
      note: 'Builds per-plant context strings with live sensor readings, snapshot history, alert status, and care events — injected into every prompt.',
      code: `return userPlants.map((p) => {
  let line = \`[id:\${p.id}] \${p.nickname || p.name} (\${p.species})\`;

  const sensor = sensorByPlant[p.id];
  const ranges = sensorRanges?.[p.id];
  if (sensor) {
    const ageMs = Date.now() - new Date(sensor.created_at).getTime();
    const isStale = ageMs > 30 * 60_000;
    const isOffline = ageMs > 24 * 3600_000;
    const parts = [
      fmtMetric(sensor.soil_moisture, "soil_moisture", ranges) + "%",
      fmtMetric(sensor.temperature, "temperature", ranges) + "°C",
      fmtMetric(sensor.humidity, "humidity", ranges) + "%",
    ];
    line += isOffline
      ? \`\\n  Sensor: OFFLINE (last \${timeAgo})\`
      : \`\\n  Sensor: \${parts.join(", ")} (\${timeAgo}\${isStale ? ", STALE" : ""})\`;
  }

  const alerts = activeSensorAlerts?.[p.id];
  if (alerts?.length)
    line += \`\\n  Alerts: \${alerts.map(a => a.severity + ": " + a.message).join("; ")}\`;

  const care = careEventsByPlant?.[p.id];
  if (care?.length)
    line += \`\\n  Care: \${care.map(e => e.event_type + " " + timeAgo(e)).join(", ")}\`;

  return line;
}).join("\\n");`,
    },
  ],

  roadmap: [
    {
      phase: 'Shipped',
      items: [
        'Conversational AI across Telegram, PWA, and live voice',
        'Plant identification and diagnosis via Gemini 3 Pro vision',
        'AI-generated visual care guides in the Botanical Pixels aesthetic',
        '5-tier hierarchical memory with cross-channel persistence',
        'Proactive care reminders with timezone-aware quiet hours',
        'IoT environmental sensors (ESP32 + DHT11 + BH1750 + Capacitive v2)',
        'Developer REST API with SHA-256 key management and rate limiting',
      ],
    },
    {
      phase: 'Next',
      items: [
        'Plant marketplace with direct purchase integration (Square, Shopify)',
        'WhatsApp and iMessage integration (requires registered business verification)',
        'Migrate from ephemeral tokens to standard Gemini endpoint to unlock native transcription and context compression',
        'Community features: shared plant collections and collaborative care',
      ],
    },
    {
      phase: 'Later',
      items: [
        'Background job queue to replace synchronous edge function processing',
        'Expanded vision evaluation across global plant diversity and regional cultivars',
      ],
    },
  ],

  risks: [
    {
      title: 'Ephemeral token trade-off',
      mitigation:
        'Voice calls use ephemeral Gemini tokens for security (no long-lived API keys in the browser). This disables native audio transcription, thinking budget, and context window compression on the constrained endpoint. Migrating to standard Gemini sessions is on the roadmap to recover these features.',
    },
    {
      title: '150-second edge function timeout',
      mitigation:
        'Supabase Edge Functions hard-timeout at 150 seconds. Complex multi-tool interactions (vision + research + save) can approach this limit. Operations that exceed it fail with a user-facing retry message. No background job queue exists yet — all processing is synchronous.',
    },
    {
      title: 'Channel expansion requires business verification',
      mitigation:
        'WhatsApp Business API requires a registered business and manual Meta review (weeks-long process). iMessage has no public bot API. SMS via Twilio needs a verified sender. Database columns and routing logic exist for all three channels, but none are live.',
    },
    {
      title: 'AI advice is not professional consultation',
      mitigation:
        'Species identification via Gemini 3 Pro may vary across cultivars and photo quality. The system prompt proactively flags pet/child toxicity and triggers honest uncertainty on ambiguous photos. All advice carries a disclaimer.',
    },
    {
      title: 'WebSocket session resilience',
      mitigation:
        'Gemini Live connections can receive GoAway warnings and drop mid-call. The system reconnects with session resumption handles, but extended calls (30+ min) accumulate reconnects that may eventually fail. Transcript is preserved client-side across reconnects.',
    },
  ],
};
