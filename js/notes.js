/* Presenter notes, one entry per slide (same order as index.html).
   minutes = target time for the slide. Total = 30.
   Edit freely; the presenter window and notes panel read from here. */
window.DECK_NOTES = [
  {
    minutes: 1,
    title: "Beyond Beautiful Interfaces",
    clicks: "No reveals. Next click goes to slide 2.",
    intro: "Smile, wait for the room to settle, and let the title sit for a second before you speak.",
    script: [
      "Namaste everyone, and thank you for having me. My name is Sanisha Maharjan.",
      "I'm a Senior Product Designer. I've been working in design for about four years, and before that I worked on frontend and mobile development, so I've sat on both sides: designing things and building them.",
      "I'm also starting as a UI/UX instructor here at Reliance, so this is a bit special for me. It's my first guest lecture. Be kind!",
      "In the next 30 minutes I won't teach you a full course. I want to answer three questions: What is UI/UX, really? How is AI changing the way we design and build products? And why do human skills still matter when AI can generate a whole app?"
    ],
    ask: [],
    pause: "After 'Be kind!' — let them laugh or smile. It relaxes you too.",
    ifSilent: "",
    transition: "\"Let's start with you, not with me.\" → next slide."
  },
  {
    minutes: 2,
    title: "Let's start with a question",
    clicks: "Cards are clickable: tap a card to add one to its hand count (Shift-click to subtract). Next click reveals the closing line.",
    intro: "Read the question slowly, then actually raise your own hand to show them what to do.",
    script: [
      "Quick question. Raise your hand if you've ever used an app or a website that made you frustrated.",
      "(Hands go up.) Yes, almost everyone. Me too, and I'm a designer!",
      "Here are some common ones. Raise your hand for each one you've experienced. (Point to each card; click it as hands go up so the room sees the count.)",
      "You can't find what you're looking for. Registration takes seven steps. You tap a button and something unexpected happens. Or the app looks beautiful but you have no idea what to do.",
      "Can someone share one real example? Any app: a college portal, a banking app, a food app, a government form."
    ],
    ask: [
      "\"Which app frustrated you most recently? What exactly happened?\"",
      "Follow-up to whoever answers: \"And what did you do? Did you give up?\""
    ],
    pause: "After asking for an example, count silently to five before saying anything. Silence feels long to you, but students need that time.",
    ifSilent: "Share one yourself: \"For me it's forms that clear everything when I make one mistake. I have to type it all again.\" Then ask: \"Has that happened to anyone?\" Hands will go up.",
    transition: "Click to reveal the line: \"Every one of these is a design problem. Fixing them is what UI/UX designers do. So what exactly is UI/UX?\""
  },
  {
    minutes: 4,
    title: "What is UI/UX?",
    clicks: "Use the Pretty / Clear toggle on the phone (or press B). Click 1: quote. Click 2: Product Design note.",
    intro: "Keep definitions short. The phone demo does most of the work.",
    script: [
      "People often say 'UI/UX' like it's one word, but they're two different things.",
      "UI, User Interface, is what you see and touch: layouts, typography, colours, buttons, visual hierarchy, meaning what your eye notices first.",
      "UX, User Experience, is how it feels to use: can you navigate it, is it usable, is it accessible for everyone, how do interactions behave, and the overall experience from start to finish.",
      "Let's look at a food delivery app. This is a made-up one called bhōk. (Show 'Pretty'.) It's colourful and trendy. But: what do these icons mean? Where's the menu? Where do I even tap?",
      "(Switch to 'Clear'.) Same app, same food. Now I can see where it's delivering, I can search for momo, I can see prices and time, and there's one obvious button to check out. That's mostly a UX improvement, and the UI supports it.",
      "(Click.) That's why I love this line: a beautiful interface cannot compensate for a frustrating experience.",
      "(Click.) You'll also hear 'Product Design'. A product designer takes a wider view: what users need, what the business needs, and what's technically possible to build. Don't worry about job titles too much for now."
    ],
    ask: [
      "Before switching screens: \"Hands up if you'd order from this one.\" Then switch: \"And this one?\""
    ],
    pause: "Pause after showing the 'Pretty' screen. Let them look for the menu themselves.",
    ifSilent: "Answer for them with humour: \"I'd be hungry for a long time trying to find the order button.\"",
    transition: "\"Now that you know what designers care about, let's try thinking like one.\""
  },
  {
    minutes: 4,
    title: "Think like a designer",
    clicks: "Clicks 1–4 reveal the questions one by one. Start the timer with ▶ or press T. Click 5 reveals the takeaway.",
    intro: "This is the main activity. Your energy matters more than the content here.",
    script: [
      "Let's do a small exercise. Imagine your college has an attendance app, but students find it confusing and hard to use. You've been asked to improve it.",
      "Don't think about colours or screens yet. Think about these four questions. (Click through them.)",
      "One: what's the actual problem? Two: who has this problem: students, teachers, admin? Three: what information should be easier to reach? Four: what would make the experience better?",
      "Take 45 seconds. Talk to the person next to you. (Start timer.)",
      "(When the timer ends.) Okay! Who wants to share? Just one idea is enough.",
      "(After 2–3 answers.) Notice something. The good answers started with a problem, like 'I can't tell if I'm below 75% attendance', not with 'make it blue'.",
      "(Click.) That's the main habit of a designer: understand the problem before you design the solution."
    ],
    ask: [
      "\"What's the real problem? Did anyone say something other than 'it looks bad'?\"",
      "\"Who suffers more from this app: the student or the teacher?\"",
      "If someone gives a solution: \"Nice. What problem does that solve?\""
    ],
    pause: "The timer is the pause. Walk around the room a little while it runs.",
    ifSilent: "Offer starters: \"Maybe students can't see their attendance percentage easily? Or teachers take too long marking it?\" Then ask: \"Which of these is more painful?\" A choice is easier to answer than an open question.",
    transition: "\"So designers start with problems. But then how does an idea become a real product? Let's look at the process.\""
  },
  {
    minutes: 3,
    title: "How does design actually happen?",
    clicks: "Click 1: research → user flows. Click 2: wireframes → prototyping. Click 3: testing, iteration and the loop.",
    intro: "Walk through it like a story using the attendance app. Don't read every box.",
    script: [
      "Many people think a designer just opens Figma and makes things pretty. That's actually quite late in the process.",
      "It starts with identifying the problem, like we just did. (Click.) Then research: talking to students, checking what teachers need. Then information architecture, which just means deciding what goes where. Then user flows: the steps someone takes, like 'open app, check attendance, see warning'.",
      "(Click.) Only then wireframes, which are rough boxes without colour, then UI design, then a clickable prototype.",
      "(Click.) Then we test it with real people. And here's the important part (point to the orange arrow): testing usually teaches you something, so you go back and improve. Design is a loop, not a straight line.",
      "In real projects these steps overlap and teams skip or combine some. But the thinking stays the same."
    ],
    ask: [
      "Optional, quick: \"Which step do you think takes the most time?\" (Many say UI design; the honest answer is often research and iteration.)"
    ],
    pause: "Short pause after 'Design is a loop, not a straight line.'",
    ifSilent: "Skip the question. This slide works fine as explanation only.",
    transition: "\"This is how design has been done for years. But in the last few years, something big changed: generative AI.\""
  },
  {
    minutes: 4,
    title: "From traditional to AI-assisted design",
    clicks: "Click 1: the AI-assisted column. Click 2: 'AI isn't new' note. Click 3: 'Faster isn't the same as right'.",
    intro: "Show the left side first and let it land as 'this is how it was'. Then reveal the right side for the contrast.",
    script: [
      "Before generative AI tools became common, a lot of this work was done by hand. Researching and organising information. Sketching wireframes. Building every layout and component. Building prototypes. Then developers turned designs into code, and we went around testing and fixing many times.",
      "(Click.) Today, AI can help at almost every step. It can help brainstorm and organise research notes. It can generate first UI concepts and wireframes. It can generate images and content. It can help build prototypes. And now some tools turn a plain-language description into a working app with code.",
      "(Click.) One important point: AI isn't new in design. We've had smart tools, autocomplete and recommendations for years, and every designer worked differently anyway. What's new is generative AI that creates screens, content and code from a sentence.",
      "(Click.) And this is the catch. AI makes building faster. But it doesn't automatically know your real users, your business context, or whether the idea is even a good one. It will happily build the wrong thing very quickly."
    ],
    ask: [
      "\"How many of you have used ChatGPT or a similar tool for a college project?\" (Most hands.) \"Did it ever give you a confident answer that was wrong?\""
    ],
    pause: "After 'build the wrong thing very quickly' — let it sink in.",
    ifSilent: "\"I'll be honest: it has happened to me many times. That's why we still need to check.\"",
    transition: "\"Let me show you three tools that represent this shift.\""
  },
  {
    minutes: 4,
    title: "Meet the new design toolkit",
    clicks: "Click 1: comparison table. If you have time and Wi-Fi, open one tool live (optional).",
    intro: "Be neutral. You're explaining categories, not selling products.",
    script: [
      "Here are three tools you'll hear about a lot.",
      "Figma is the most widely used tool for interface design. You design screens, build wireframes and design systems, make clickable prototypes, and collaborate with your team in real time. It now has AI built in. There's an AI agent and First Draft for generating designs, and Figma Make, where you describe something and get a working, interactive prototype or web app.",
      "Lovable and Base44 are a different category: AI app builders. You describe an app in a chat, like 'an attendance app where students see their percentage and get a warning below 75%', and they generate a working application with screens, a database, login and logic. Both can sync the code to GitHub. Base44 is aimed at people with no coding background.",
      "(Click.) So the simple difference: Figma is mainly for designing and prototyping the experience. Lovable and Base44 are mainly for generating working apps. They overlap, Figma Make can produce working apps too, but they're not replacements for each other.",
      "Many teams use both: design and think in Figma, then generate or build the app.",
      "These tools change almost every month, so check their official sites. What I'm showing is current as of now."
    ],
    ask: [
      "\"Has anyone here tried Figma? Any of these AI builders?\""
    ],
    pause: "Brief pause after the table appears so people can read it.",
    ifSilent: "\"That's fine. If you're starting from zero, Figma is free to begin with, and it's a great first step.\"",
    transition: "\"Which brings us to the big question everyone is asking...\""
  },
  {
    minutes: 3,
    title: "Is AI replacing designers?",
    clicks: "Click 1: what AI can generate. Click 2: what still needs a human. Click 3: takeaway.",
    intro: "Ask the question and then really wait. This is the most thought-provoking moment.",
    script: [
      "If AI can generate an entire application in minutes, why would a company still hire a designer?",
      "(Pause about 5 seconds. Take one or two answers if hands go up.)",
      "(Click.) Let's be honest about what AI can do today. It can generate screens, layouts, components, prototypes, application code and initial design directions. That's real, and it's getting better.",
      "(Click.) But look at this side. Understanding real users. Finding the right problem. Asking good questions. Making decisions when you don't have all the information. Understanding human behaviour. Accessibility, so people with disabilities can use the product too. Checking usability. Balancing what users want with what the business needs. Testing with real people. And making ethical decisions.",
      "AI can help with parts of this, but someone still has to be responsible for these decisions.",
      "(Click.) So: AI can help you build a solution faster. It cannot guarantee that you're solving the right problem.",
      "Will AI change design jobs? Yes, it already is, and nobody knows exactly how far it will go. But the designer who uses AI well and keeps thinking critically is in a much stronger position than one who ignores it, or one who just accepts whatever it generates."
    ],
    ask: [
      "\"Why would a company still hire a designer?\""
    ],
    pause: "Right after reading the question. Hold eye contact and wait.",
    ifSilent: "\"Think about the attendance app. Could AI have known that the real problem was the 75% rule, without talking to students?\"",
    transition: "\"So if you're curious about this field, where do you start?\""
  },
  {
    minutes: 5,
    title: "Your career starts with curiosity",
    clicks: "Click 1: roles. Click 2: skills. Click 3: roadmap. Click 4: closing quote + Q&A screen.",
    intro: "Slow down here. Speak to them as a mentor, not a lecturer. Leave about 2 minutes for questions.",
    script: [
      "(Click.) There are many paths: UI Designer, UX Designer, Product Designer, UX Researcher, Interaction Designer. In small companies, one person often does several of these.",
      "(Click.) The skills matter more than the title: empathy, curiosity, problem-solving, communication, visual thinking, critical thinking, adaptability, and understanding technology. As CS and CSIT students, that last one is already your advantage.",
      "And you don't need to be an artist or an expert coder to start. I mean that.",
      "(Click.) If you want a simple roadmap: learn the fundamentals, learn a tool like Figma, start noticing the apps you use every day, practise solving small problems, experiment with AI tools, build projects that solve something real, learn to explain why you made each decision, and keep asking for feedback.",
      "(Click.) I'll leave you with this. You don't have to decide today whether you want to become a designer. But start observing the digital products you use every day. Next time an app frustrates you, ask: why? And how would I fix it?",
      "Thank you! I'm happy to take questions."
    ],
    ask: [
      "\"Any questions about design, AI, careers, or anything we covered?\""
    ],
    pause: "After the final quote, before 'Thank you'.",
    ifSilent: "Seed a question: \"A question I often get is, 'Do I need to know coding to be a designer?' The answer is no, but understanding how things are built helps a lot. Anyone else?\" If time is up, thank them and hand over to the next instructor.",
    transition: "Hand over warmly: \"Thank you all. Over to [Git & Linux instructor's name].\""
  }
];
