export const DEFAULT_LANGUAGE = 'de'
export const LANGUAGES = ['de', 'en']
export const SITE_URL = 'https://ninapfatischer.com'

export function normalizeLanguage(lang) {
  return LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE
}

export function languageFromPath(pathname = '/') {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANGUAGE
}

export function pathForLanguage(lang) {
  return normalizeLanguage(lang) === 'en' ? '/en/' : '/'
}

export function absoluteUrlForLanguage(lang) {
  return `${SITE_URL}${pathForLanguage(lang)}`
}

export const copy = {
  de: {
    meta: {
      title: 'Nina Pfatischer Yoga - Komm zurück zu dir',
      description:
        'Yoga, das so viel mehr ist als Bewegung: Achtsamkeit, Gelassenheit und ein leiser Weg zurück zur Dankbarkeit. Vinyasa Flow, Hatha, Yin und Meditation mit Nina Pfatischer.',
      ogDescription:
        'Yoga, das so viel mehr ist als Bewegung: Achtsamkeit, Gelassenheit und ein leiser Weg zurück zur Dankbarkeit.',
      jobTitle: 'Yogalehrerin',
      schemaDescription:
        'Yogalehrerin, ausgebildet in Portugal und unterrichtend in Deutschland. Vinyasa Flow, Hatha, Yin und Meditation - Achtsamkeit, Gelassenheit und Dankbarkeit.',
    },
    skip: 'Zum Inhalt springen',
    brandSub: 'Yoga · Achtsamkeit',
    navLabel: 'Hauptnavigation',
    nav: [
      { href: '#about', label: 'Geschichte' },
      { href: '#classes', label: 'Kurse' },
      { href: '#music', label: 'Musik' },
      { href: '#gallery', label: 'Momente' },
      { href: '#contact', label: 'Kontakt' },
    ],
    language: {
      label: 'Sprache wechseln',
      de: 'DE',
      en: 'EN',
    },
    theme: {
      label: 'Darstellung wechseln',
      light: 'Helles Design aktivieren',
      dark: 'Dunkles Design aktivieren',
    },
    menu: {
      open: 'Menü öffnen',
      close: 'Menü schließen',
    },
    buttons: {
      book: 'Kurs anfragen',
      explore: 'Praxis entdecken',
    },
    toast: {
      book: 'Lass uns deinen Kurs finden - ein paar Details unten',
      sent: 'Nachricht gesendet - bis bald',
    },
    hero: {
      alt: 'Nina lächelt auf einem Holzsteg in einem grünen Garten der Sonne entgegen',
      eyebrow: 'Eine achtsame Praxis',
      titlePrefix: 'Komm zurück zu ',
      titleEm: 'dir',
      lead:
        'Yoga, das so viel mehr ist als Bewegung - Achtsamkeit, Gelassenheit und ein leiser Weg zurück zur Dankbarkeit. Komm atmen, loslassen und dich wieder geerdet fühlen.',
    },
    about: {
      alt: 'Nina balanciert in der Baumhaltung vor weichen, nebligen Bergen',
      stat: 'Operationen und ein langer Weg zurück in meine eigene Kraft',
      eyebrow: 'Meine Geschichte',
      title: 'Yoga hat mir meinen Boden zurückgegeben',
      lead:
        'Für mich ist Yoga so viel mehr als Bewegung. Nach einer schweren Knieverletzung, fünf Operationen und einer langen Reha hat es mir geholfen, wieder Stabilität, Kraft und inneren Frieden zu finden - körperlich und mental.',
      body:
        'Ich habe meine Ausbildung in Portugal gemacht und durfte bereits in Studios in Marokko und Deutschland unterrichten. Meine Stunden verbinden Bewegung und Stille, Kraft und Entspannung - flexibel darauf abgestimmt, was der Tag braucht. Jede Stunde ist eine Einladung zurück zu Achtsamkeit, Gelassenheit und Dankbarkeit.',
      wish:
        'Mein Wunsch ist einfach: dass du leichter, geerdeter und mehr mit dir selbst verbunden gehst.',
    },
    classes: {
      eyebrow: 'Die Praxis',
      title: 'Finde den Kurs, der dich heute abholt',
      intro:
        'Jede Stunde verbindet Bewegung und Stille. Komm genau so, wie du bist - jede Praxis passt sich flexibel dem Tag an.',
      items: [
        {
          title: 'Vinyasa Flow',
          desc:
        'Dynamische, kraftvolle Sequenzen, die Atem und Bewegung verbinden - für Wärme, Kraft und einen ruhigen, fließenden Fokus.',
          tags: ['75 min', 'Dynamisch'],
        },
        {
          title: 'Hatha Yoga',
          desc:
        'Innere Ruhe und Stabilität durch achtsame Ausrichtung und bewusste Atmung. Langsamer, klarer, tief erdend.',
          tags: ['60 min', 'Fundament'],
        },
        {
          title: 'Yin Yoga',
          desc:
            'Ruhig und sanft, mit lange gehaltenen Haltungen, Philosophie und Meditation. Ein stiller Raum zum Weichwerden und Loslassen.',
          tags: ['75 min', 'Sanft'],
        },
        {
          title: 'Meditation & lange Dehnungen',
          desc:
        'Geführte Stille, lange gehaltene Dehnungen und bewusster Atem - um den Geist zu beruhigen und zur Dankbarkeit zurückzukehren.',
          tags: ['30 min', 'Stille'],
        },
      ],
    },
    music: {
      alt: 'Nina öffnet sich in Wild Thing auf sonnenwarmem Tonfels im goldenen Licht',
      eyebrow: 'Atmosphäre',
      quote:
        'Musik trägt uns zwischen Kraft und Leichtigkeit - sie schafft Atmosphäre und lässt den Körper wieder spüren.',
      note:
        'Ein bewusst gewählter Soundtrack begleitet jede Stunde - führt uns in Bewegung, hält uns in der Stille und trägt uns nach Hause.',
    },
    gallery: {
      eyebrow: 'Momente',
      title: 'Unterwegs',
      intro:
        'Wüsten, Ozeane, Berge, Studios - ein paar Momente aus der Praxis, gesammelt mit Dankbarkeit.',
      viewPhoto: 'Foto ansehen',
      close: 'Foto schließen',
      previous: 'Vorheriges Foto',
      next: 'Nächstes Foto',
      photos: [
        'Nina sitzt im Lotus auf sonnenwarmem Wüstenfels',
        'Nina in einer Unterarmbalance vor einer roten Tonklippe',
        'Nina in der Tänzerhaltung auf den Klippen im goldenen Licht',
        'Ninas Handstand als Silhouette über dem abendlichen Ozean',
        'Nina steht ruhig, während eine Welle hinter den Felsen bricht',
        'Nina in stehenden Spagaten auf einer Terrasse mit Blick aufs Meer',
        'Nina in der Baumhaltung hoch über grünen Inseln und Buchten',
        'Nina mit Händen vor dem Herzen in den nebligen Bergen',
        'Nina praktiziert auf einem Dach unter klarem Himmel',
        'Nina steht klein und geerdet zwischen Canyonwänden',
        'Nina steht mit Händen vor dem Herzen auf goldenen Felsen unter klarem Himmel',
        'Nina in der Tänzerhaltung als Silhouette auf den Felsen in der Dämmerung',
      ],
    },
    contact: {
      eyebrow: 'Lass uns zusammen praktizieren',
      title: 'Komm mit mir atmen',
      lead:
        'Erzähl mir kurz, wonach du suchst - einen Kurs, eine Privatstunde oder einfach einen Anfang. Ich schreibe dir persönlich zurück.',
      points: [
        {
          title: 'Studios & draußen',
          desc: 'Gruppenkurse, Privatstunden & Retreats - in Deutschland und darüber hinaus.',
        },
        {
          title: 'Alle Levels willkommen',
          desc: 'Von Anfänger:innen bis zu erfahrenen Praktizierenden. Komm genau so, wie du bist.',
        },
        {
          title: 'Soundgeführte Stunden',
          desc: 'Jede Klasse wird von Musik und der Stimmung des Tages mitgeformt.',
        },
      ],
      confirmationTitle: 'Danke',
      confirmation:
        'Deine Nachricht ist unterwegs. Ich melde mich bald bei dir - atme einmal tief durch, du bist schon auf dem Weg.',
      labels: {
        name: 'Dein Name',
        email: 'E-Mail',
        practice: 'Welche Praxis ruft dich?',
        message: 'Nachricht',
        website: 'Dieses Feld leer lassen',
      },
      placeholders: {
        name: 'Jane Doe',
        email: 'du@example.com',
        practice: 'Vinyasa, Yin, eine Privatstunde...',
        message: 'Erzähl mir, wonach du suchst...',
      },
      errorPrefix:
        'Auf dem Weg ist etwas still geworden - bitte versuche es noch einmal oder schreibe mir direkt an',
      sending: 'Senden...',
      submit: 'Nachricht senden',
      privacyPrefix: 'Ich nutze deine Angaben nur, um dir zu antworten - sonst für nichts. Details in der',
      privacyLink: 'Datenschutzerklärung',
    },
    footer: {
      tagline: 'Bewegen, weich werden und bei dir ankommen.',
      explore: 'Entdecken',
      findMe: 'Kontakt',
      legal: {
        impressum: 'Impressum',
        privacy: 'Datenschutz',
      },
      location: 'Ausgebildet in Portugal · Unterricht in Deutschland',
    },
  },
  en: {
    meta: {
      title: 'Nina Pfatischer Yoga - Come back to yourself',
      description:
        'Yoga that is so much more than movement: mindfulness, serenity, and a quiet return to gratitude. Vinyasa Flow, Hatha, Yin, and meditation with Nina Pfatischer.',
      ogDescription:
        'Yoga that is so much more than movement: mindfulness, serenity, and a quiet return to gratitude.',
      jobTitle: 'Yoga Teacher',
      schemaDescription:
        'Yoga teacher trained in Portugal, teaching in Germany. Vinyasa Flow, Hatha, Yin, and meditation - mindfulness, serenity, and gratitude.',
    },
    skip: 'Skip to content',
    brandSub: 'Yoga · Mindfulness',
    navLabel: 'Primary',
    nav: [
      { href: '#about', label: 'Story' },
      { href: '#classes', label: 'Classes' },
      { href: '#music', label: 'Music' },
      { href: '#gallery', label: 'Moments' },
      { href: '#contact', label: 'Contact' },
    ],
    language: {
      label: 'Switch language',
      de: 'DE',
      en: 'EN',
    },
    theme: {
      label: 'Switch theme',
      light: 'Switch to light theme',
      dark: 'Switch to dark theme',
    },
    menu: {
      open: 'Open menu',
      close: 'Close menu',
    },
    buttons: {
      book: 'Book a class',
      explore: 'Explore the practice',
    },
    toast: {
      book: "Let's find your class - a few details below",
      sent: 'Message sent - talk soon',
    },
    hero: {
      alt: 'Nina smiling toward the sun on a wooden boardwalk in a green garden',
      eyebrow: 'A Mindful Practice',
      titlePrefix: 'Come back to ',
      titleEm: 'yourself',
      lead:
        'Yoga that is so much more than movement - mindfulness, serenity, and a quiet return to gratitude. Come breathe, soften, and feel grounded again.',
    },
    about: {
      alt: 'Nina balancing in tree pose before soft, misty mountains',
      stat: 'surgeries, and one long road back to my own strength',
      eyebrow: 'My Story',
      title: 'Yoga gave me back my ground',
      lead:
        'For me, yoga is so much more than movement. After a serious knee injury, five surgeries, and a long recovery, it helped me find stability, strength, and inner peace again - both physically and mentally.',
      body:
        'I trained in Portugal and have had the joy of teaching in studios in Morocco and Germany. My classes balance movement and stillness, strength and relaxation - shaped flexibly to fit the day. Each one is an invitation back to mindfulness, serenity, and gratitude.',
      wish:
        'My wish is simple: that you leave lighter, more grounded, and more connected to yourself.',
    },
    classes: {
      eyebrow: 'The Practice',
      title: 'Find the class that meets you today',
      intro:
        'Every session balances movement and stillness. Come exactly as you are - each practice is designed flexibly to fit the day.',
      items: [
        {
          title: 'Vinyasa Flow',
          desc:
            'Dynamic, powerful sequences that link breath to movement - building heat, strength, and a steady, flowing focus.',
          tags: ['75 min', 'Dynamic'],
        },
        {
          title: 'Hatha Yoga',
          desc:
            'Inner peace and stability through mindful alignment and conscious breathing. Slower, deliberate, deeply grounding.',
          tags: ['60 min', 'Foundational'],
        },
        {
          title: 'Yin Yoga',
          desc:
            'Calm and gentle, with long-held poses, philosophy, and meditation. A quiet space to soften and let go.',
          tags: ['75 min', 'Gentle'],
        },
        {
          title: 'Meditation & Long Stretches',
          desc:
            'Guided stillness, long held stretches, and conscious breath - settling the mind and returning to gratitude.',
          tags: ['30 min', 'Stillness'],
        },
      ],
    },
    music: {
      alt: 'Nina arching into wild thing pose on sun-warmed clay rock at golden hour',
      eyebrow: 'Atmosphere',
      quote:
        'Music carries us between effort and ease - it sets the atmosphere, and lets the body remember how to feel.',
      note:
        'A carefully chosen soundtrack threads through every class - guiding us into movement, holding us in stillness, and carrying us home.',
    },
    gallery: {
      eyebrow: 'Moments',
      title: 'Along the way',
      intro:
        'Deserts, oceans, mountains, studios - a few moments from the practice, gathered with gratitude.',
      viewPhoto: 'View photo',
      close: 'Close photo',
      previous: 'Previous photo',
      next: 'Next photo',
      photos: [
        'Nina seated in lotus on sun-warmed desert rock',
        'Nina in a forearm balance against a red clay cliff',
        'Nina in dancer pose on the cliffs at golden hour',
        "Nina's handstand silhouetted above the evening ocean",
        'Nina standing steady as a wave breaks behind the rocks',
        'Nina in standing splits on a terrace overlooking the sea',
        'Nina in tree pose high above green islands and bays',
        'Nina with hands at heart in the misty mountains',
        'Nina practicing on a rooftop under a clear sky',
        'Nina standing small and grounded among canyon walls',
        'Nina standing with hands at heart on golden rocks under a clear sky',
        'Nina in dancer pose silhouetted on the rocks at dusk',
      ],
    },
    contact: {
      eyebrow: "Let's practice together",
      title: 'Come breathe with me',
      lead:
        "Tell me a little about what you're looking for - a class, a private session, or simply where to begin. I'll write back personally.",
      points: [
        {
          title: 'Studios & outdoors',
          desc: 'Group classes, privates & retreats - Germany and beyond.',
        },
        {
          title: 'All levels welcome',
          desc: 'Beginners to seasoned practitioners. Come exactly as you are.',
        },
        {
          title: 'Sound-led sessions',
          desc: 'Each class is shaped by music and the mood of the day.',
        },
      ],
      confirmationTitle: 'Thank you',
      confirmation:
        "Your message is on its way. I'll be in touch soon - take a deep breath, you're already on your way.",
      labels: {
        name: 'Your name',
        email: 'Email',
        practice: 'Which practice calls you?',
        message: 'Message',
        website: 'Leave this field empty',
      },
      placeholders: {
        name: 'Jane Doe',
        email: 'you@example.com',
        practice: 'Vinyasa, Yin, a private session...',
        message: "Tell me what you're looking for...",
      },
      errorPrefix:
        'Something went quiet on the way - please try again, or write to me directly at',
      sending: 'Sending...',
      submit: 'Send a message',
      privacyPrefix: "I'll only use your details to reply to you - nothing else. Details in the",
      privacyLink: 'privacy policy',
    },
    footer: {
      tagline: 'Move, soften, and come home to yourself.',
      explore: 'Explore',
      findMe: 'Find me',
      legal: {
        impressum: 'Impressum',
        privacy: 'Datenschutz',
      },
      location: 'Trained in Portugal · Teaching in Germany',
    },
  },
}
