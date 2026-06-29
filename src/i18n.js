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
      title: 'Nina Pfatischer Yoga - Free to Flow',
      description:
        'Yoga, das so viel mehr ist als Bewegung: Verbinde dich mit deinem natürlichen Rhythmus. Pranayama & Meditation, Animal Flow, Slow Flow, Mobility und Retreats in Marokko mit Nina Pfatischer.',
      ogDescription:
        'Yoga, das so viel mehr ist als Bewegung - verbinde dich mit deinem natürlichen Rhythmus, finde innere Ruhe und Verbundenheit.',
      jobTitle: 'Yogalehrerin',
      schemaDescription:
        'Yogalehrerin, ausgebildet in Portugal und unterrichtend in Deutschland und Marokko. Pranayama & Meditation, Animal Flow, Slow Flow und Mobility - Achtsamkeit, Gelassenheit und Dankbarkeit.',
    },
    skip: 'Zum Inhalt springen',
    brandSub: 'Yoga · Achtsamkeit',
    navLabel: 'Hauptnavigation',
    nav: [
      { href: '#about', label: 'Geschichte' },
      { href: '#classes', label: 'Praxis' },
      { href: '#music', label: 'Musik' },
      { href: '#gallery', label: 'Momente' },
      { href: '#retreat', label: 'Retreat' },
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
      retreat: 'Schön, dass dich das Retreat ruft - erzähl mir unten von dir',
      sent: 'Nachricht gesendet - bis bald',
    },
    hero: {
      alt: 'Nina lächelt auf einem Holzsteg in einem grünen Garten der Sonne entgegen',
      eyebrow: 'Free to Flow',
      titlePrefix: 'Im Einklang mit dem ',
      titleEm: 'natürlichen Rhythmus leben.',
      lead:
        'Verbinde dich mit deinem natürlichen Rhythmus. Lass Bewegungen fließen und Gedanken ziehen. Nimm die Schönheit des Augenblicks wahr, finde innere Ruhe und spüre die Verbundenheit mit dir selbst, der Natur und dem Leben um dich herum.',
      mobileLead:
        'Finde Ruhe, Leichtigkeit und Verbindung in Bewegung, Atem und Moment.',
    },
    about: {
      alt: 'Nina balanciert in der Baumhaltung vor weichen, nebligen Bergen',
      stat: 'Knieoperationen und ein langer Weg zurück in meine eigene Kraft',
      eyebrow: 'Meine Geschichte',
      title: 'Yoga hat mir den Weg zurück zu meinen Wurzeln gezeigt',
      lead:
        'Lange Zeit habe ich im Stress gelebt, wenig achtsam mit meinem Körper umgegangen und mich oft mit anderen verglichen. Körperlich zeigte sich das in fünf Knieoperationen.',
      body: [
        'Yoga wurde für mich zu einem Wendepunkt. Nach einer schwierigen Diagnose half mir die Praxis, wieder Vertrauen in meinen Körper zu finden – durch Bewegung, Atem, Stabilität und innere Ruhe.',
        'Während meiner Ausbildung zur Yogalehrerin in Portugal durfte ich Yoga nicht nur als körperliche Praxis, sondern auch als Lebensphilosophie tiefer verstehen. Seitdem begleitet mich Yoga auch abseits der Matte: in Meditation, Achtsamkeit, Dankbarkeit und einem bewussteren Blick auf mich selbst und meine Umwelt.',
        'Seit 2022 unterrichte ich in Studios, Therapiezentren, Unternehmen, Universitäten und Retreats. Meine Liebe zu Marokko ist dabei zu einem zweiten Zuhause geworden, wo ich heute Menschen aus aller Welt begleite.',
        'Als ausgebildete Lehrkraft und angehende Heilpraktikerin mit Schwerpunkt Psychotherapie verbinde ich in meinen Stunden Bewegung und Stille, Kraft und Entspannung. Jede Praxis entsteht neu – angepasst an das, was die Gruppe braucht.',
      ],
      wish:
        'Mein Ziel jeder Stunde ist es, dich einzuladen, dem natürlichen Fluss des Lebens zu folgen, achtsam auf deine eigenen Bedürfnisse zu hören und dich mit Dankbarkeit und Leichtigkeit mit dir selbst zu verbinden.',
    },
    classes: {
      eyebrow: 'Die Praxis',
      title: 'Finde den Kurs, der dich heute abholt',
      intro:
        'Jede Stunde verbindet Bewegung und Stille. Komm genau so, wie du bist - jede Praxis passt sich flexibel dem Tag an.',
      items: [
        {
          title: 'Hatha Flow',
          desc:
            'Erdende, ruhigere Haltungen, bewusst mit dem Atem gehalten – für Kraft, Ausrichtung und Stabilität in Körper und Geist.',
          tags: ['60 min', 'Erdend'],
        },
        {
          title: 'Vinyasa Flow',
          desc:
            'Mit dem Atem verbundene Sequenzen, die Wärme und Fluss aufbauen und kreativ von einer Haltung in die nächste führen.',
          tags: ['60 min', 'Dynamisch'],
        },
        {
          title: 'Yin Flow',
          desc:
            'Lange, sanfte Haltungen, die tiefes Bindegewebe lösen und zu Stille, Geduld und Hingabe einladen.',
          tags: ['60–75 min', 'Erholsam'],
        },
        {
          title: 'Slow Flow',
          desc:
            'Eine harmonische Verbindung aus Vinyasa und Yin Yoga – fließende Bewegungen kombiniert mit ruhigen, länger gehaltenen Positionen für Balance, Beweglichkeit und Entspannung.',
          tags: ['75 min', 'Sanft fließend'],
        },
        {
          title: 'Meditations',
          desc:
            'Bewusste Atemtechniken und Meditation zur Beruhigung des Nervensystems, Förderung der Achtsamkeit und Stärkung der Verbindung zu dir selbst.',
          tags: ['45–60 min', 'Ruhig'],
        },
        {
          title: 'Animal Flow',
          desc:
            'Kreative, fließende Bewegungsmuster inspiriert von der Tierwelt, Calisthenics und Yoga gemischt – für mehr Kraft, Mobilität, Koordination und Körperbewusstsein.',
          tags: ['60 min', 'Dynamisch'],
        },
        {
          title: 'Mobility',
          desc:
            'Gezielte Übungen zur Verbesserung von Beweglichkeit, Gelenkgesundheit und funktioneller Kraft – für Freiheit und Leichtigkeit in Bewegung und Alltag.',
          tags: ['60 min', 'Aktiv'],
        },
      ],
    },
    music: {
      alt: 'Nina öffnet sich in Wild Thing auf sonnenwarmem Tonfels im goldenen Licht',
      srTitle: 'Musik',
      eyebrow: 'Atmosphäre',
      quote:
        'Musik trägt uns zwischen Kraft und Leichtigkeit – sie schafft Atmosphäre und lässt uns tiefer im Körper ankommen.',
      note:
        'Ein bewusst gewählter Soundtrack begleitet jede Stunde – er führt uns in Bewegung, hält uns in der Stille und trägt uns am Ende wieder zurück zu uns selbst.',
      extra:
        'Die Praxis kann sich ganz unterschiedlich entfalten: als Morgen- oder Abendritual, in der Natur beim Wandern, in den Bergen oder am Meer, nach dem Tauchen oder vor dem Surfen – oder im geschützten Raum eines ruhigen Yoga Studios. Immer dort, wo du dich am wohlsten fühlst und ankommen kannst.',
    },
    retreat: {
      eyebrow: 'Retreat in Marokko',
      title: 'Salty Shavasana Retreat',
      alt: 'Sonnige Dachterrasse mit weitem Blick über das Meer in Imsouane, Marokko',
      tagline: 'Eine Woche zum Loslassen. Eine Woche, um bei dir anzukommen.',
      lead:
        'Yoga am Atlantik, Surfen in den endlosen Wellen von Imsouane und eine Landschaft, die dich einlädt, langsamer zu werden, tiefer zu atmen und dich selbst wieder zu spüren.',
      summaryLabel: 'Retreat Eckdaten',
      summary: [
        { label: 'Ort', value: 'Imsouane, Marokko' },
        { label: 'Dauer', value: '7 Nächte' },
        { label: 'Preis', value: 'Early Bird 720 €' },
        { label: 'Termin', value: 'Auf Anfrage' },
        { label: 'Inklusive', value: 'Yoga, Surf, Frühstück & Abendessen' },
        { label: 'Gruppe', value: 'Bewusst begrenzte Plätze' },
      ],
      includedTitle: 'Eine Woche für dich',
      includedIntro:
        'Ein Retreat, das dich aus dem Alltag heraus und zurück in deinen natürlichen Rhythmus führt.',
      highlights: [
        'Tägliche Yoga-Sessions (Vinyasa, Hatha & Yin)',
        'Meditation & Journaling für innere Klarheit & Selbstfürsorge',
        '3 Surf-Sessions in der Bucht von Imsouane',
        'Marokkanischer Kochkurs mit lokalen Aromen',
        'Ausflug nach Essaouira – Medina & Atlantikflair',
        'Kreativer Art Workshop mit lokalem Künstler',
        'Wanderung zu einer versteckten Oase',
        '7 Nächte Unterkunft, Frühstück & Abendessen täglich',
      ],
      scheduleTitle: 'Dein Rhythmus vor Ort',
      scheduleIntro: 'Ein Tag, der dich trägt – ohne Druck, ohne Müssen.',
      schedule: [
        { time: '08:00', title: 'Morning Practice', desc: 'Yoga oder Meditation mit Blick auf den Atlantik – sanftes Ankommen im Tag.' },
        { time: '10:00', title: 'Breakfast', desc: 'Frisch, regional und liebevoll zubereitet – nährend und erdend.' },
        { time: '11:00', title: 'Free Time', desc: 'Zeit für dich: Meer, Sonne, Ruhe, Lesen oder einfach Sein.' },
        { time: '16:00', title: 'Afternoon Flow', desc: 'Surf, Workshop oder Ausflug – getragen vom Moment.' },
        { time: '18:00', title: 'Evening Practice', desc: 'Sanftes Yoga oder Meditation im Licht des Sonnenuntergangs.' },
        { time: '20:00', title: 'Dinner', desc: 'Gemeinsam, bewusst und voller Geschmack – Ankommen & Teilen.' },
        { time: '21:00', title: 'Community Time', desc: 'Musik, Gespräche, Stille, Sterne – echte Verbindung.' },
      ],
      investmentTitle: 'Dein Investment',
      priceLabel: 'Early Bird',
      price: '720 €',
      investmentNote:
        'Alles ist für dich vorbereitet, damit du einfach ankommen und dich tragen lassen kannst.',
      includedLabel: 'Inklusive',
      included: [
        '3 Surf-Sessions (inkl. Material & Lehrer)',
        'Tägliche Yoga-Sessions (Matte & Hilfsmittel)',
        'Marokkanischer Kochkurs',
        '7 Übernachtungen, Frühstück & Abendessen',
        'Ausflug nach Essaouira',
        'Wanderung zur Oase',
      ],
      excludedLabel: 'Nicht inklusive',
      excluded: [
        'Flug & Anreise (Taxi kann organisiert & geteilt werden)',
        'Einzelzimmer (optional auf Anfrage)',
        'Mittagessen',
        'Optionale Surffotos',
        'Reiseversicherung',
        'Zusätzliche Aktivitäten',
      ],
      whyTitle: 'Warum Imsouane',
      why: [
        'Imsouane ist kein Ort zum Funktionieren. Es ist ein Ort zum Ankommen.',
        'Ein kleines Fischerdorf an der marokkanischen Atlantikküste, das dich einlädt, langsamer zu werden, tiefer zu atmen und dich wieder zu spüren. Die Wellen sind weich und lang – sie tragen dich, statt dich zu fordern. Der Ozean bestimmt den Rhythmus, nicht die Uhr.',
        'Zwischen Meer, Natur und herzlichen Begegnungen entsteht ein Gefühl von Einfachheit und echter Fülle. Yoga wird hier zu einer Rückkehr. Zu deinem Atem. Zu deinem Körper. Zu dir selbst.',
      ],
      ctaTitle: 'Bist du dabei?',
      ctaText:
        'Wenn du spürst, dass dich dieser Ort ruft, könnte dies deine Woche sein. Spots sind bewusst begrenzt, um eine persönliche und achtsame Erfahrung zu ermöglichen.',
      ctaButton: 'Jetzt Platz anfragen',
      testimonialsTitle: 'Stimmen vom Retreat',
      testimonials: [
        'Ich bin schon lange nicht mehr mit so viel innerer Ruhe und Gelassenheit aus einem Urlaub wiedergekommen. Selbst meinen Kollegen ist direkt aufgefallen, dass ich so entspannt und erholt wirke – und das, obwohl es nur eine Woche war.',
        'Es war so viel mehr als nur ein Yoga- und Surf-Retreat – es war eine Reise zu mir selbst.',
        'Nina ist mit so viel Begeisterung und Liebe bei der Sache, dass einem gar nichts anderes übrig bleibt, als sich in die Yogaeinheiten, das Surfen und die Leute in Imsouane zu verlieben.',
        'Ich bin so unheimlich dankbar für die Zeit in Imsouane – es war kein 08/15 Urlaub, sondern einer, der noch lange nachgewirkt und Veränderungen angestoßen hat.',
        'Ein sanfter Yogaflow, eine sonnige Dachterrasse, weiter Meerblick und ein leichter Windhauch auf der Haut und in den Haaren – heaven on earth.',
        'Im Vergleich zu anderen Gruppen habe ich gemerkt, dass wir keinen Urlaub von der Stange gebucht haben, sondern wirklich Wert auf Individualität und ein tolles Gesamterlebnis gelegt wurde.',
      ],
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
      photoAlt: 'Nina praktiziert Yoga auf einer sonnigen Dachterrasse',
      social: 'Social Media',
      explore: 'Entdecken',
      findMe: 'Kontakt',
      contact: {
        whatsapp: 'WhatsApp',
        email: 'E-Mail',
        form: 'Kontaktformular',
        formValue: 'Kurs, Retreat oder Privatstunde anfragen',
      },
      legal: {
        impressum: 'Impressum',
        privacy: 'Datenschutz',
      },
      location: 'Ausgebildet in Portugal · Unterricht in Deutschland',
    },
    cookies: {
      label: 'Cookie-Hinweis',
      title: 'Cookies & Analyse',
      text:
        'Ich speichere deine Auswahl lokal. Wenn du zustimmst, hilft Google Analytics zu verstehen, welche Seiten allgemein genutzt werden.',
      necessary: 'Nur notwendige',
      accept: 'Akzeptieren',
    },
  },
  en: {
    meta: {
      title: 'Nina Pfatischer Yoga - Free to Flow',
      description:
        'Yoga that is so much more than movement: connect with your natural rhythm. Pranayama & meditation, Animal Flow, Slow Flow, mobility, and retreats in Morocco with Nina Pfatischer.',
      ogDescription:
        'Yoga that is so much more than movement - connect with your natural rhythm, find inner stillness and a sense of belonging.',
      jobTitle: 'Yoga Teacher',
      schemaDescription:
        'Yoga teacher trained in Portugal, teaching in Germany and Morocco. Pranayama & meditation, Animal Flow, Slow Flow, and mobility - mindfulness, serenity, and gratitude.',
    },
    skip: 'Skip to content',
    brandSub: 'Yoga · Mindfulness',
    navLabel: 'Primary',
    nav: [
      { href: '#about', label: 'Story' },
      { href: '#classes', label: 'Practice' },
      { href: '#music', label: 'Music' },
      { href: '#gallery', label: 'Moments' },
      { href: '#retreat', label: 'Retreat' },
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
      retreat: "So glad the retreat is calling you - tell me below",
      sent: 'Message sent - talk soon',
    },
    hero: {
      alt: 'Nina smiling toward the sun on a wooden boardwalk in a green garden',
      eyebrow: 'Free to Flow',
      titlePrefix: 'Live in ',
      titleEm: 'natural rhythm.',
      lead:
        'Connect with your natural rhythm. Let movement flow, and thoughts gently drift away. Feel into the beauty of the present moment, find inner stillness, and sense your connection to yourself, to nature, and to the life all around you.',
      mobileLead:
        'Find stillness, ease, and connection through movement, breath, and the present moment.',
    },
    about: {
      alt: 'Nina balancing in tree pose before soft, misty mountains',
      stat: 'knee surgeries, and one long road back to my own strength',
      eyebrow: 'My Story',
      title: 'Yoga has shown me the way back to my roots',
      lead:
        'For a long time, I lived in stress, was not very mindful with my body, and often compared myself to others. Physically, this showed up in five knee surgeries.',
      body: [
        'Yoga became a turning point for me. After a difficult diagnosis, the practice helped me find trust in my body again – through movement, breath, stability, and inner calm.',
        'During my yoga teacher training in Portugal, I came to understand yoga not only as a physical practice, but also as a life philosophy. Since then, yoga has accompanied me beyond the mat: in meditation, mindfulness, gratitude, and a more conscious way of seeing myself and the world around me.',
        'Since 2022, I have taught in studios, therapy centers, companies, universities, and retreats. My love for Morocco has become a second home, where I now guide people from all over the world.',
        'As a trained educator and a psychotherapy-focused Heilpraktikerin in training, I bring movement and stillness, strength and relaxation into my classes. Each practice is created anew, shaped by what the group needs.',
      ],
      wish:
        'My intention in every class is to invite you to follow the natural flow of life, to listen mindfully to your own needs, and to connect with yourself through gratitude and lightness.',
    },
    classes: {
      eyebrow: 'The Practice',
      title: 'Find the class that meets you today',
      intro:
        'Every session balances movement and stillness. Come exactly as you are - each practice is designed flexibly to fit the day.',
      items: [
        {
          title: 'Hatha Flow',
          desc:
            'Grounding, slower-paced postures held with conscious breath — building strength, alignment, and steadiness in body and mind.',
          tags: ['60 min', 'Grounding'],
        },
        {
          title: 'Vinyasa Flow',
          desc:
            'Breath-linked sequences that build warmth and fluidity, moving creatively from one posture to the next.',
          tags: ['60 min', 'Dynamic'],
        },
        {
          title: 'Yin Flow',
          desc:
            'Long, gentle holds that release deep connective tissue and invite stillness, patience, and surrender.',
          tags: ['60–75 min', 'Restorative'],
        },
        {
          title: 'Slow Flow',
          desc:
            'A harmonious blend of Vinyasa and Yin Yoga – flowing movement combined with slower, longer-held postures for balance, mobility, and relaxation.',
          tags: ['75 min', 'Gently flowing'],
        },
        {
          title: 'Meditations',
          desc:
            'Conscious breathwork and meditation to calm the nervous system, cultivate awareness, and strengthen your connection to yourself.',
          tags: ['45–60 min', 'Calm'],
        },
        {
          title: 'Animal Flow',
          desc:
            'Creative, flowing movement patterns inspired by the animal world, calisthenics and yoga combined – for strength, mobility, coordination, and body awareness.',
          tags: ['60 min', 'Dynamic'],
        },
        {
          title: 'Mobility',
          desc:
            'Targeted exercises to improve mobility, joint health, and functional strength – for freedom and ease in movement and everyday life.',
          tags: ['60 min', 'Active'],
        },
      ],
    },
    music: {
      alt: 'Nina arching into wild thing pose on sun-warmed clay rock at golden hour',
      srTitle: 'Music',
      eyebrow: 'Atmosphere',
      quote:
        'Music carries us between strength and lightness – it creates atmosphere and helps us arrive more deeply in the body.',
      note:
        'A consciously chosen soundtrack accompanies every class – guiding us into movement, holding us in stillness, and carrying us back home to ourselves at the end.',
      extra:
        'The practice can unfold in many different ways: as a morning or evening ritual, in nature while hiking, in the mountains or by the sea, after diving or before surfing – or in the calm and cozy space of a yoga studio. Always wherever you feel most at ease and at home within yourself.',
    },
    retreat: {
      eyebrow: 'Retreat in Morocco',
      title: 'Salty Shavasana Retreat',
      alt: 'Sunny rooftop terrace with a wide sea view in Imsouane, Morocco',
      tagline: 'A week to let go. A week to arrive within yourself.',
      lead:
        'Yoga by the Atlantic, surfing the endless waves of Imsouane, and a landscape that invites you to slow down, breathe more deeply, and feel yourself again.',
      summaryLabel: 'Retreat quick facts',
      summary: [
        { label: 'Place', value: 'Imsouane, Morocco' },
        { label: 'Length', value: '7 nights' },
        { label: 'Price', value: 'Early Bird €720' },
        { label: 'Dates', value: 'On request' },
        { label: 'Included', value: 'Yoga, surf, breakfast & dinner' },
        { label: 'Group', value: 'Intentionally limited spots' },
      ],
      includedTitle: 'A week for you',
      includedIntro:
        'A retreat that leads you out of everyday life and back into your natural rhythm.',
      highlights: [
        'Daily yoga sessions (Vinyasa, Hatha & Yin)',
        'Meditation & journaling for inner clarity & self-care',
        '3 surf sessions in the bay of Imsouane',
        'Moroccan cooking class with local flavors',
        'Excursion to Essaouira – medina & Atlantic flair',
        'Creative art workshop with a local artist',
        'Hike to a hidden oasis',
        '7 nights accommodation, breakfast & dinner daily',
      ],
      scheduleTitle: 'Your rhythm on site',
      scheduleIntro: 'A day that carries you – no pressure, no must.',
      schedule: [
        { time: '08:00', title: 'Morning Practice', desc: 'Yoga or meditation overlooking the Atlantic – a gentle arrival into the day.' },
        { time: '10:00', title: 'Breakfast', desc: 'Fresh, regional, and lovingly prepared – nourishing and grounding.' },
        { time: '11:00', title: 'Free Time', desc: 'Time for you: sea, sun, rest, reading, or simply being.' },
        { time: '16:00', title: 'Afternoon Flow', desc: 'Surf, workshop, or excursion – carried by the moment.' },
        { time: '18:00', title: 'Evening Practice', desc: 'Gentle yoga or meditation in the light of the sunset.' },
        { time: '20:00', title: 'Dinner', desc: 'Together, mindful, and full of flavor – arriving & sharing.' },
        { time: '21:00', title: 'Community Time', desc: 'Music, conversation, stillness, stars – real connection.' },
      ],
      investmentTitle: 'Your investment',
      priceLabel: 'Early Bird',
      price: '€720',
      investmentNote:
        'Everything is prepared for you, so you can simply arrive and let yourself be carried.',
      includedLabel: 'Included',
      included: [
        '3 surf sessions (incl. equipment & instructor)',
        'Daily yoga sessions (mat & props)',
        'Moroccan cooking class',
        '7 nights, breakfast & dinner',
        'Excursion to Essaouira',
        'Hike to the oasis',
      ],
      excludedLabel: 'Not included',
      excluded: [
        'Flight & arrival (taxi can be organized & shared)',
        'Single room (optional on request)',
        'Lunch',
        'Optional surf photos',
        'Travel insurance',
        'Additional activities',
      ],
      whyTitle: 'Why Imsouane',
      why: [
        'Imsouane is not a place to function. It is a place to arrive.',
        'A small fishing village on the Moroccan Atlantic coast that invites you to slow down, breathe more deeply, and feel yourself again. The waves are soft and long – they carry you instead of challenging you. The ocean sets the rhythm, not the clock.',
        'Between sea, nature, and warm encounters, a feeling of simplicity and true abundance arises. Here, yoga becomes a return. To your breath. To your body. To yourself.',
      ],
      ctaTitle: 'Are you in?',
      ctaText:
        'If you sense that this place is calling you, this could be your week. Spots are intentionally limited to allow for a personal and mindful experience.',
      ctaButton: 'Request your spot',
      testimonialsTitle: 'Voices from the retreat',
      testimonials: [
        'I have not come back from a holiday with so much inner calm and serenity in a long time. Even my colleagues noticed right away how relaxed and rested I seemed – and that after only a week.',
        'It was so much more than just a yoga and surf retreat – it was a journey to myself.',
        'Nina is so full of enthusiasm and love for what she does that you have no choice but to fall in love with the yoga sessions, the surfing, and the people of Imsouane.',
        'I am so incredibly grateful for the time in Imsouane – it was no ordinary holiday, but one that kept resonating long after and set real change in motion.',
        'A gentle yoga flow, a sunny rooftop terrace, a wide sea view, and a light breeze on your skin and in your hair – heaven on earth.',
        'The retreat, Nina, and Imsouane taught me a lot. Thank you for all the love, the unforgettable experiences, the good conversations, and for helping me relax, find inner peace, and reset.',
      ],
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
      photoAlt: 'Nina practicing yoga on a sunny rooftop',
      social: 'Social media',
      explore: 'Explore',
      findMe: 'Find me',
      contact: {
        whatsapp: 'WhatsApp',
        email: 'Email',
        form: 'Contact form',
        formValue: 'Ask about classes, retreats, or private sessions',
      },
      legal: {
        impressum: 'Impressum',
        privacy: 'Datenschutz',
      },
      location: 'Trained in Portugal · Teaching in Germany',
    },
    cookies: {
      label: 'Cookie notice',
      title: 'Cookies & analytics',
      text:
        'I store your choice locally. If you accept, Google Analytics helps understand aggregate site usage.',
      necessary: 'Only necessary',
      accept: 'Accept',
    },
  },
}
