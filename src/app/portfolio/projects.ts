export interface PortfolioProject {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  overview: string[];
  gameplay?: {
    heading: string;
    paragraphs: string[];
  };
  demo?: {
    src: string;
    poster: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
  techStack: string[];
  liveUrl?: string;
  liveLabel?: string;
}

export const portfolioProjects: PortfolioProject[] = [
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
    eyebrow: "Multiplayer arena · Live",
    description:
      "A twelve-player elemental arena where everyone is hunting one opponent, escaping another, and surviving a shrinking ring.",
    overview: [
      "Goof Balls is a twelve-player survival game built around a chase that runs in both directions: you are hunting one opponent while another is hunting you. Elemental matchups shape those relationships, and a shrinking arena keeps changing how much room you have to pursue, escape, or reposition.",
      "The game offers solo casual play, ranked competition, and private rooms. Those modes support different ways to play, from a casual match to a competitive session or a room with friends. Mouse, keyboard, and touch controls make the arena playable across desktop and mobile.",
      "A shared server runs the multiplayer simulation rather than leaving each player's device to decide what happened. That gives the match a common game state while players react to their targets, their pursuers, and the closing ring.",
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
    eyebrow: "Social systems · Technical prototype",
    description:
      "An experiment in making online sharing behave more like real relationships through precise, human-readable audience controls.",
    overview: [
      "Circles explores a social-sharing model where the audience can change with each post. The idea is to make room for the different relationships people have, with custom groups and precise visibility controls rather than treating every connection as the same kind of audience.",
      "The prototype focuses on the permission system behind that experience. A vector-based model represents audience rules, with Python and NumPy used to work through which people should be able to see a post. The technical model supports a product goal of making those choices understandable in everyday language.",
      "This is a technical proof of concept, not a finished social network. It explores how more flexible audience controls could support sharing that feels closer to real relationships, while keeping the underlying visibility rules explicit.",
    ],
    techStack: ["Python", "NumPy"],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
