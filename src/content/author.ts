export type AuthorHero = {
  h1: string
  tagline: string
  bio: string[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export type AuthorBook = {
  title: string
  subtitle?: string
  coverSrc: string
  coverAlt: string
  summary: string[]
  asin: string
  buyUrl: string
  publishedYear: number
}

export type AuthorAlbum = {
  title: string
  intro: string
  spotifyEmbedUrl: string
  appleUrl: string
  youtubeUrl: string
}

export type AuthorPress = {
  email: string
  socials: Array<{ label: string; href: string }>
}

export const authorContent: {
  hero: AuthorHero
  book: AuthorBook
  album: AuthorAlbum
  press: AuthorPress
} = {
  hero: {
    h1: 'Max Millien — Author of Traffic Engineer',
    tagline: 'The Memoir Was the Prototype. PureTome Is the Engine.',
    bio: [
      'I am an engineer by trade and a writer by survival. I had to reverse-engineer my own mind. I had to debug the crash.',
      'I wrote Traffic Engineer to prove that a human life, no matter how corrupted, can be restored if you have the right data. But a notebook is just a snapshot. It is static.',
      'Real legacy requires a system. I built PureTome because the process of writing my story has had such a profound and positive effect on my trajectory and focus that it was worth sharing. I engineered this AI Biographer platform to turn that same clarity into forward momentum for anyone looking to start or finish their book.',
    ],
    primaryCta: {
      label: 'Read the Memoir',
      href: 'https://www.amazon.com/Traffic-Engineer-Max-Millien/dp/B0FM3J751X',
    },
    secondaryCta: {
      label: 'Launch PureTome',
      href: 'https://www.puretome.com/',
    },
  },
  book: {
    title: 'Traffic Engineer',
    subtitle: 'A Memoir',
    coverSrc: '/author/traffic-engineer-cover.jpg',
    coverAlt: 'Traffic Engineer — cover',
    summary: [
      'Traffic Engineer is the unflinching account of a systems engineer who had to take apart his own life to understand what went wrong. Addiction, incarceration, and the long work of rebuilding — rendered with the same rigor Max brings to production systems.',
      'The book treats a human life the way a principled engineer treats a broken service: collect the logs, identify the failure modes, rebuild from the root cause up. It is a memoir for anyone who suspects that the hardest debugging problem they will ever face is the one running in their own head.',
      'Written in a voice that refuses to soften, Traffic Engineer is both a survival document and a blueprint — the prototype for the AI Biographer platform, PureTome, that Max went on to build.',
    ],
    asin: 'B0FM3J751X',
    buyUrl: 'https://www.amazon.com/Traffic-Engineer-Max-Millien/dp/B0FM3J751X',
    publishedYear: 2025,
  },
  album: {
    title: 'The Soundtrack',
    intro:
      "More than just a soundtrack, this is the memoir's emotional DNA translated into sound. Every track breathes life into the story's deepest moments, transforming memory into melody and poetry.",
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/1gN3NenIJ6gq8H0wyVcD25',
    appleUrl: 'https://music.apple.com/us/artist/max-millien/1838776085',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLCaMAw7ZIrm8Zo3zROYty_6Zug0uT-DXO',
  },
  press: {
    email: 'max.millien@puretome.com',
    socials: [
      { label: 'Twitter / X', href: 'https://x.com/MaxMiLL' },
      { label: 'Instagram', href: 'https://www.instagram.com/maxymerci/' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@maxmillienjr' },
      { label: 'YouTube', href: 'https://www.youtube.com/@MaxMillien-g2s' },
      { label: 'Facebook', href: 'https://www.facebook.com/maxmill' },
      { label: 'Reddit', href: 'https://www.reddit.com/user/maxmill/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maxmill/' },
      { label: 'Medium', href: 'https://blog.puretome.com/' },
    ],
  },
}
