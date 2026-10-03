interface PortfolioDemo {
  src: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  label?: string;
}

interface PortfolioImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  overview: string[];
  overviewImage?: PortfolioImage & { afterParagraph: number };
  sections?: {
    heading: string;
    paragraphs: string[];
    image?: PortfolioImage;
    demo?: PortfolioDemo;
  }[];
  gameplay?: {
    heading: string;
    paragraphs: string[];
  };
  demo?: PortfolioDemo;
  techStack: string[];
  liveUrl?: string;
  liveLabel?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "brain-cache",
    title: "Brain Cache",
    eyebrow: "Mac productivity · Preparing an open-source release",
    description:
      "A little pet for quickly saving notes on my Mac, with features built around how I like to work.",
    overview: [
      "I saw an ad for an app that basically let you take quick notes in a really simple form. It was like a more extensive to-do list. I liked that idea, but I find myself not really getting into that habit unless it’s quickly available.",
      "The only time I’ve really felt that way is with sticky notes. Having them easily accessible made it simple for me to add a quick note. I wanted something on my Mac that felt just as easy, something I could do instinctively.",
      "So I created Brain Cache and its little pet, Blob. It helps me quickly add notes, with a bunch of functionality built to my liking. I can add tags, make checklists, attach files, or set a reminder when I want to come back to something.",
      "Because so much of it is based on how I like to work, I’m preparing to open source it so people can tailor it to their own liking. The idea is that people can plug and play with what’s there, change what they want, and work on its future development collectively.",
    ],
    sections: [
      {
        heading: "Making it quick to add a note",
        paragraphs: [
          "I wanted to be able to add a note as soon as I thought of it. ⌥ Space brings up a small window, I type, and ⌘ Return saves it. If all I have is a line of text, that’s enough. I can add tags or files when I need them, and the window grows as I write.",
          "I liked having a little pet attached to this. Blob stays out of the way until I need it, and I can get back to what I was doing after saving a note. Setting reminders and organizing things can wait until I’m looking through the library.",
        ],
        image: {
          src: "/brain-cache-capture.png",
          width: 1280,
          height: 310,
          alt: "Brain Cache’s compact capture panel with Blob, a sample thought, and optional tag and file controls.",
          caption:
            "The quick-note window with Blob. Browser preview with a sample note.",
        },
      },
      {
        heading: "Knowing the note is saved",
        paragraphs: [
          "I wanted to save a thought and move on without wondering if it actually saved. Notes stay on my Mac, so I can add them without an account or an internet connection. The app checks that the save worked before showing a confirmation. If it fails, the note stays in the window so I can try again.",
          "Files I attach are copied into the app’s storage, and edits save as I go. Deleted notes also go to Trash, so I can restore something if I change my mind.",
        ],
      },
      {
        heading: "Doing more with a note later",
        paragraphs: [
          "Some notes stay as a quick thought, and others become something I want to do more with. I added tags and search to help me find them, pins to keep a note nearby, and checklists for things I need to get done. I don’t have to decide any of that when I first add the note.",
          "If I want to spend more time on a note, I can open its card or expand it for more room to write. When I close it, I’m back where I left off in the library, with the same search and filters. It makes it easier to look through a few notes without losing my place.",
        ],
        demo: {
          src: "/brain-cache-demo.gif",
          poster: "/brain-cache-library.png",
          width: 900,
          height: 600,
          alt: "Brain Cache’s library opens a sample note for a closer look, then returns to the same notes and checklists.",
          caption:
            "Opening a note and coming back to the library. Animated walkthrough using browser previews with sample data.",
          label: "Brain Cache walkthrough",
        },
      },
    ],
    techStack: [
      "Tauri 2",
      "React 19",
      "TypeScript",
      "Rust",
      "SQLite",
      "Tiptap",
    ],
  },
  {
    slug: "computer-summer-games",
    title: "The Computer Summer Games",
    eyebrow: "Browser competition · Live",
    description:
      "A five-event browser competition disguised as an early-2000s desktop, with tactile controls and server-validated world rankings.",
    overview: [
      "Lately, I’ve been feeling nostalgic—thinking about what it was like to be a kid and the things I enjoyed back then. I’ve always had a soft spot for the look and feel of older applications, so I wanted to build something that brought a bit of that back.",
      "I also missed the typing games I played while learning to use a keyboard. I wanted to create that same kind of simple, pick-up-and-play experience: games you could open for a few quick rounds whenever you sat down at your laptop, like Solitaire and Chess on older versions of Windows.",
    ],
    gameplay: {
      heading: "From typing practice to track and field",
      paragraphs: [
        "I wanted to bring back the way those games made everyday computer controls feel like play. That idea became five track-and-field events, each built around a different movement or rhythm. In the 100m, repeated mouse drags or swipes propel your runner forward, with quick, even strokes helping you finish faster.",
        "The 110m Hurdles makes the typing-game connection more directly: you type A, B, C, D, then press Space to clear a hurdle. Repeat that sequence across ten hurdles, with mistakes adding time to your result. It turns a short set of keys into a rhythm you can get better at with each attempt.",
        "Hammer Throw and Long Jump are more about control and timing. In Hammer Throw, you trace smooth circles around the athlete before releasing toward the landing area. In Long Jump, you alternate A and D for ten approach steps, then hold and release the jump in the green zone before crossing into a foul. Both give you three attempts, with your best distance counting.",
        "The 1600m adds a different challenge: pacing yourself. Alternating left and right inputs moves the runner, but pushing the rhythm too hard drains your energy. Easing off lets it recover, so you have to decide when to save energy and when to make a final push. Together, the events give familiar inputs different jobs—speed, accuracy, timing, and restraint—while world rankings offer a reason to come back for another round.",
      ],
    },
    demo: {
      src: "/summer-games-demo.gif",
      poster: "/summer-games-demo-poster.webp",
      width: 960,
      height: 640,
      alt: "A runner clears hurdles in the 110m Hurdles typing event inside a retro desktop window.",
      caption: "110m Hurdles: type A, B, C, D, then Space to jump.",
    },
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "DynamoDB",
      "PostHog",
    ],
    liveUrl: "https://olympics.tapp.inc",
    liveLabel: "Play Summer Games",
  },
  {
    slug: "goof-balls",
    title: "Goof Balls",
    eyebrow: "Browser battle royale · Live",
    description:
      "Agar.io meets rock-paper-scissors, with elements you can switch on the fly and rooms to play with friends.",
    overview: [
      "I’ve been wanting to try building games with AI, and a friend came to me with an idea that was basically Agar.io plus rock-paper-scissors. It felt like a fun place to start.",
      "His inspiration came from Kenichi: The Mightiest Disciple. There’s a scene where two martial arts masters play rock-paper-scissors at an absurd speed, watching each other and changing their hands at the last possible moment. For some reason, that idea never left his brain.",
      "I wanted to see how that could work in a battle royale. I leaned into my old Pokémon days and made fire, grass, and water the choices. You can switch between them as you play, so beating someone takes a bit of skill in reading what they’re doing and deciding when to change.",
      "It needs a critical mass of players to keep public matches going full time, so there’s single-player for now and private rooms where you can play with friends. I highly recommend trying it with friends. That’s where it really becomes fun.",
    ],
    overviewImage: {
      afterParagraph: 2,
      src: "/goof-balls-kenichi-scene.png",
      width: 640,
      height: 891,
      alt: "Two martial arts masters rapidly change hand signs during rock-paper-scissors in Kenichi: The Mightiest Disciple.",
      caption:
        "The rock-paper-scissors scene from Kenichi: The Mightiest Disciple that inspired my friend’s idea.",
    },
    sections: [
      {
        heading: "Making the choices easy to pick up",
        paragraphs: [
          "Fire beats grass, grass beats water, and water beats fire. That’s the whole triangle. I liked using elements because the relationship feels familiar, especially if you grew up playing Pokémon. Running into someone with the same element just bounces you apart.",
          "Everyone stays the same size and moves at the same speed. The advantage comes from your position, your timing, and which element you’re using. Switching has a short cooldown, so you have to commit to the choice for a moment before changing again.",
        ],
      },
      {
        heading: "Giving you a way to jump in",
        paragraphs: [
          "I wanted people to be able to try it without waiting for a full lobby. Solo casual puts you in with eleven bots, and solo ranked gives you a personal rating to work on. You can get a feel for the game before inviting anyone else.",
          "Private rooms let you play with friends, with bots available to fill out the match. It gives us a way to enjoy the multiplayer side while the game is still finding its players.",
        ],
        image: {
          src: "/goof-balls-menu.jpg",
          width: 1280,
          height: 720,
          alt: "Goof Balls’ start screen with solo casual and ranked choices, a multiplayer tab, and a Play button.",
          caption: "Jump into solo play, or make a private room with friends.",
        },
      },
      {
        heading: "Keeping the chase moving",
        paragraphs: [
          "Once you’re in, you’re trying to catch the elements you can beat while staying away from the ones that beat you. Someone can switch just before you reach them, so a chase can turn around pretty quickly. Rush gives you a burst of movement, and shield gives you a moment to protect yourself.",
          "The ring keeps shrinking until there’s one ball left. As the space gets smaller, you have less room to avoid each other and more reason to make a move. That’s where the original rock-paper-scissors idea starts to show up: watching someone, changing at the right time, and hoping they don’t change first.",
        ],
        demo: {
          src: "/goof-balls-demo.gif",
          poster: "/goof-balls-demo-poster.jpg",
          width: 800,
          height: 450,
          alt: "A real Goof Balls solo casual match showing element switches, rush, shield, and the shrinking arena.",
          caption: "A solo casual match against bots. Switch elements, rush, and shield while the ring closes in.",
          label: "Goof Balls walkthrough",
        },
      },
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Canvas",
      "Colyseus",
      "Cloudflare Workers",
      "AWS",
    ],
    liveUrl: "https://balls.tapp.inc",
    liveLabel: "Play Goof Balls",
  },
  {
    slug: "rally",
    title: "Rally",
    eyebrow: "Group planning · Full-stack build",
    description:
      "A group-planning tool that turns shared constraints around budget, vibe, and distance into useful venue recommendations.",
    overview: [
      "Rally helps a group decide where to go by bringing everyone's preferences into one planning session. People join with a code and vote on three practical questions: how much they want to spend, what kind of atmosphere they want, and how far they are willing to travel.",
      "The product uses those shared constraints to guide AI-assisted venue recommendations. The aim is to give the group options grounded in what its members actually want, instead of leaving one person to guess everyone's preferences or piece them together from a conversation.",
      "Group coordination through Twilio connects the recommendation flow with the people making the plan. The project brings session participation, preference gathering, venue suggestions, and communication together around the same decision.",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express 5",
      "PostgreSQL",
      "Twilio",
    ],
  },
  {
    slug: "circles",
    title: "Circles",
    eyebrow: "Social media · Concept",
    description:
      "A social media concept built around overlapping friend circles, so you can choose which group sees each post.",
    overview: [
      "Circles is a social media concept based on the friend groups we have in real life. You can create different circles for different groups of friends, and the same person can belong to more than one circle.",
      "For example, someone could be in both your college circle and your climbing circle. When you share a post, you choose which circle gets to see it. That lets you share something with a specific group of friends without showing it to everyone you know.",
    ],
    techStack: ["Python", "NumPy"],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
