export interface PoeticScene {
  scene: number;
  text: string;
  prompt: string;
}

export interface Poema {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  collection: string;
  audioUrl: string;
  vidsUrl: string;
  localVideoUrl?: string;
  hasNotebook: boolean;
  notebookPages: string[];
  synopsis: string;
  fullText: string;
  scenes?: PoeticScene[];
}

export const AUTOR_INFO = {
  nombre: "Guillermo Baena Restrepo",
  alias: "Guille Baena",
  sitioTitulo: "El Cosmos de Guille",
  poemarioPrincipal: "Que diría el olvido del último recuerdo",
  portadaUrl: "/images/portada.jpg",
  fotoAutorUrl: "/images/guille_baena.jpg",
  biografia: "Guillermo Baena Restrepo es un poeta, pensador y cronista del alma cuya voz lírica desentraña los misterios de la memoria, la vejez, la finitud y el cosmos humano. A través de versos hondos, meditaciones filosóficas y una sensibilidad conmovedora, su obra nos invita a contemplar el paso del tiempo no como un declive, sino como una marcha solemne hacia la verdad interior y la reconciliación con el misterio.",
  pensamiento: "«La memoria elige por instinto los recuerdos sin importar dolor o sufrimiento... Es memoria, es recuerdo y es olvido. Es tal su poder de elegir hasta el olvido.»"
};

export const POEMAS: Poema[] = [
  {
    "id": "la-vejez",
    "title": "La Vejez",
    "slug": "la-vejez",
    "subtitle": "Poema y reflexión sobre el crepúsculo de la vida",
    "collection": "Que diría el olvido del último recuerdo",
    "audioUrl": "/audio/la_vejez.mp3",
    "vidsUrl": "https://docs.google.com/videos/d/12fkKp_fx6asLTJwrPzyfF0bqUEQdm4hwRXcxsHEowJw/play?usp=sharing",
    "hasNotebook": false,
    "notebookPages": [],
    "synopsis": "Un retrato conmovedor de la dignidad, los surcos de la experiencia y la soledad serena en el atardecer de la existencia.",
    "scenes": [
      {
        "scene": 1,
        "text": "La vejez, por Guillermo Baena Restrepo",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 1: Medium shot standing in a quiet historic\n    library, looking down thoughtfully as warm sunlight streams through arched\n    windows."
      },
      {
        "scene": 2,
        "text": "Ante el avance cruento de los tiempos, el cuerpo desfallece, y\n    el alma se detiene a contemplar, lo que resta de la vida con nostalgia.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 2: Wide shot sitting on a stone bench facing\n    a calm ocean at sunset, gazing at the horizon with nostalgia."
      },
      {
        "scene": 3,
        "text": "Y se visten de blanco los cabellos, como si estuvieran\n    cubiertos por la nieve, y el pensamiento fuera un crudo invierno.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 3: Extreme macro close-up of silver-white\n    hair blowing gently in a cold winter breeze, fine snow falling."
      },
      {
        "scene": 4,
        "text": "Unos surcos profundos, atraviesan la frente, enseñando el\n    camino que le queda a la idea.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 4: Macro shot of the deeply wrinkled\n    forehead of the old man, warm side lighting highlighting skin texture."
      },
      {
        "scene": 5,
        "text": "Se arriman sigilosos, hasta los párpados, y los dejan caer\n    sobre los ojos,",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 5: Close-up of the elder's tired eyelids\n    closing slowly in deep peace."
      },
      {
        "scene": 6,
        "text": "tejiendo dos ojales, que esconden la luz en los cristales,",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 6: Close-up of eyes softly reflecting a\n    flickering warm candlelight in a dark room."
      },
      {
        "scene": 7,
        "text": "y pintan un espejo, donde el alma refleja sus secretos, y\n    enseña sus misterios.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 7: Reflection of the old man's face in an\n    old tarnished mirror in ambient warm light."
      },
      {
        "scene": 8,
        "text": "Allí, una visión borrosa que diluye recuerdos del pasado, y\n    muestra estoicamente las premoniciones del futuro.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 8: Soft focus shot of fading nostalgic\n    memories dissolving into sunset ocean mist."
      },
      {
        "scene": 9,
        "text": "Es una guerra por creer, en lo que no se puede ver, y rescatar\n    la fe, de la fosa común del increencia.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 9: Weathered hands reaching upward toward a\n    powerful beam of light breaking through dark clouds."
      },
      {
        "scene": 10,
        "text": "Pero el tiempo, inexorable y crudo, no perdona vejez, menos la\n    muerte, y se asoma a la nariz calladamente, y la hace rugosa y prominente.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 10: Side profile portrait focusing on the\n    aged nose and rough skin texture under dramatic side light."
      },
      {
        "scene": 11,
        "text": "Una curva, que cae desde la frente, y se mete en dos fosas\n    gigantescas, donde agoniza el oxígeno indefenso.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 11: Cinematic slow pan along a marble bust\n    profile blending into human profile."
      },
      {
        "scene": 12,
        "text": "Pero no cesa el tiempo, de tatuar la vejez en los humanos, y\n    llega hasta la boca, donde habitan los labios en silencio,",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 12: Macro shot of aged closed lips holding\n    quiet dignity, subtle shadows."
      },
      {
        "scene": 13,
        "text": "porque ya las palabras se extinguieron, y se unieron silentes\n    al espíritu, donde tiene la vejez sus aposentos, y los claustros de Dios en\n    su increencia.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 13: Floating glowing text embers fading into\n    silent dark air inside an ancient stone monastery corridor."
      },
      {
        "scene": 14,
        "text": "Los labios triangulados callando silencios y nostalgias,",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 14: Close-up of aged thin lips with\n    reflections of rain on a nearby window."
      },
      {
        "scene": 15,
        "text": "y alerta siempre a recibir las lágrimas, que llegan presurosas\n    de los ojos, por los profundos surcos, que labro el misterio.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 15: Macro shot of a single tear rolling down\n    a deep cheek wrinkle, golden rim light."
      },
      {
        "scene": 16,
        "text": "Y en el mentón que indiferente se levanta, se sostienen las\n    ultimas vocales, y consonantes que quedaron vivas.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 16: Low-angle shot of the elder's proud chin\n    held high against a twilight sky."
      },
      {
        "scene": 17,
        "text": "El rostro desolado y quieto, se encierra entre paréntesis, por\n    dos azas cansadas, de escuchar las quejas de los hombres y las falsas\n    ilusiones de los seres.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 17: Side profile shot focusing on the\n    elder's ear, blurred crowd moving in the background."
      },
      {
        "scene": 18,
        "text": "Y adentro muy adentro el yunque y el martillo, prensando\n    palabras que vienen del olvido.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 18: Artistic glowing iron anvil with soft\n    embers drifting in warm ambient darkness."
      },
      {
        "scene": 19,
        "text": "Es el retrato de un rostro compungido, que libro las batallas\n    en todas las galaxias.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 19: Double exposure of the old man's face\n    merged with a deep cosmic galaxy nebula."
      },
      {
        "scene": 20,
        "text": "El cuello, la columna de mármol que sostuviera el mundo con\n    firmeza,",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 20: Close-up of the elder's neck structure\n    transitioning visually to an ancient marble column."
      },
      {
        "scene": 21,
        "text": "es ahora un recuerdo que sostiene de milagro, la cabeza, con\n    las pocas ideas que le quedan, y las exiguas oraciones que persisten.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 21: The old man bowing his head gently in\n    quiet prayer, soft candle glow illuminating forehead."
      },
      {
        "scene": 22,
        "text": "Del cuello nacen los hombros, y de ahí se extienden los brazos,\n    que buscan los horizontes y firmamentos distantes, para sentir meridianos y\n    acariciar la esperanza.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 22: Medium shot of the old man opening his\n    shoulders and extending arms toward a vast sunrise."
      },
      {
        "scene": 23,
        "text": "Que, al bifurcarse los dedos en diez caminos exactos, nos\n    muestran los diez caminos para llegar hasta Dios.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 23: Macro shot of ten aged fingers spreading\n    toward golden sunbeams breaking through clouds."
      },
      {
        "scene": 24,
        "text": "La espalda, curva cansada, de soportar la inclemencia de los\n    soles rutilantes, (tantos soles cansados) y las lunas hechizadas.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 24: Silhouette of the stooped old man\n    walking away under a massive setting sun."
      },
      {
        "scene": 25,
        "text": "De la cintura se extiende, en busca de la corteza, dos piernas\n    ensimismadas por caminos recorridos, y vericuetos vencidos.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 25: Low-angle tracking shot of old leather\n    boots walking steadily along a dirt path."
      },
      {
        "scene": 26,
        "text": "Sin fuerza van empujando, el pedazo de los destinos que quedan\n    por definir.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 26: Back view of the old man's legs moving\n    slowly into soft golden fog."
      },
      {
        "scene": 27,
        "text": "Y de las plantas emergen unas púas acechantes, que aran la\n    tierra estéril donde serán enterrados.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 27: Macro shot of feet stepping on dry\n    autumn leaves over dark fertile soil at dusk."
      },
      {
        "scene": 28,
        "text": "La vejez después de luchas y de guerras extenuantes, es un\n    epílogo triste sin ilusión y esperanza. La vejez es el encuentro con sueños\n    y fantasías, imposibles de cumplir. Es la ansiedad de ver a Dios, porque se\n    murió el espíritu, entre sollozos y amor.",
        "prompt": "Cinematic realistic film, 8k, solemn nostalgic mood, warm golden\n    hour twilight lighting. Character: A 70-year-old dignified Hispanic man,\n    silver-white hair, weathered hands, wearing a dark vintage brown wool vest\n    over a muted linen shirt. Scene 28: Magnificent beam of golden divine\n    sunlight breaking through dark clouds, filling the screen and fading gently\n    to black."
      }
    ],
    "fullText": "La vejez, por Guillermo Baena Restrepo\n\nAnte el avance cruento de los tiempos, el cuerpo desfallece, y\n    el alma se detiene a contemplar, lo que resta de la vida con nostalgia.\n\nY se visten de blanco los cabellos, como si estuvieran\n    cubiertos por la nieve, y el pensamiento fuera un crudo invierno.\n\nUnos surcos profundos, atraviesan la frente, enseñando el\n    camino que le queda a la idea.\n\nSe arriman sigilosos, hasta los párpados, y los dejan caer\n    sobre los ojos,\n\ntejiendo dos ojales, que esconden la luz en los cristales,\n\ny pintan un espejo, donde el alma refleja sus secretos, y\n    enseña sus misterios.\n\nAllí, una visión borrosa que diluye recuerdos del pasado, y\n    muestra estoicamente las premoniciones del futuro.\n\nEs una guerra por creer, en lo que no se puede ver, y rescatar\n    la fe, de la fosa común del increencia.\n\nPero el tiempo, inexorable y crudo, no perdona vejez, menos la\n    muerte, y se asoma a la nariz calladamente, y la hace rugosa y prominente.\n\nUna curva, que cae desde la frente, y se mete en dos fosas\n    gigantescas, donde agoniza el oxígeno indefenso.\n\nPero no cesa el tiempo, de tatuar la vejez en los humanos, y\n    llega hasta la boca, donde habitan los labios en silencio,\n\nporque ya las palabras se extinguieron, y se unieron silentes\n    al espíritu, donde tiene la vejez sus aposentos, y los claustros de Dios en\n    su increencia.\n\nLos labios triangulados callando silencios y nostalgias,\n\ny alerta siempre a recibir las lágrimas, que llegan presurosas\n    de los ojos, por los profundos surcos, que labro el misterio.\n\nY en el mentón que indiferente se levanta, se sostienen las\n    ultimas vocales, y consonantes que quedaron vivas.\n\nEl rostro desolado y quieto, se encierra entre paréntesis, por\n    dos azas cansadas, de escuchar las quejas de los hombres y las falsas\n    ilusiones de los seres.\n\nY adentro muy adentro el yunque y el martillo, prensando\n    palabras que vienen del olvido.\n\nEs el retrato de un rostro compungido, que libro las batallas\n    en todas las galaxias.\n\nEl cuello, la columna de mármol que sostuviera el mundo con\n    firmeza,\n\nes ahora un recuerdo que sostiene de milagro, la cabeza, con\n    las pocas ideas que le quedan, y las exiguas oraciones que persisten.\n\nDel cuello nacen los hombros, y de ahí se extienden los brazos,\n    que buscan los horizontes y firmamentos distantes, para sentir meridianos y\n    acariciar la esperanza.\n\nQue, al bifurcarse los dedos en diez caminos exactos, nos\n    muestran los diez caminos para llegar hasta Dios.\n\nLa espalda, curva cansada, de soportar la inclemencia de los\n    soles rutilantes, (tantos soles cansados) y las lunas hechizadas.\n\nDe la cintura se extiende, en busca de la corteza, dos piernas\n    ensimismadas por caminos recorridos, y vericuetos vencidos.\n\nSin fuerza van empujando, el pedazo de los destinos que quedan\n    por definir.\n\nY de las plantas emergen unas púas acechantes, que aran la\n    tierra estéril donde serán enterrados.\n\nLa vejez después de luchas y de guerras extenuantes, es un\n    epílogo triste sin ilusión y esperanza. La vejez es el encuentro con sueños\n    y fantasías, imposibles de cumplir. Es la ansiedad de ver a Dios, porque se\n    murió el espíritu, entre sollozos y amor."
  },
  {
    "id": "la-memoria",
    "title": "La Memoria",
    "slug": "la-memoria",
    "subtitle": "Que hacia atrás camina y convive con el recuerdo",
    "collection": "Que diría el olvido del último recuerdo",
    "audioUrl": "/audio/la_memoria.mp3",
    "vidsUrl": "https://docs.google.com/videos/d/1Nyntz2nF6zjUesamKDytBywgSG7vgx3IXYfvfkrk26Q/play?usp=sharing",
    "localVideoUrl": "/videos/mas_aca_y_memoria.mp4",
    "hasNotebook": true,
    "notebookPages": [
      "/cuaderno/memoria_p1.jpg",
      "/cuaderno/memoria_p2.jpg",
      "/cuaderno/memoria_p3.jpg",
      "/cuaderno/memoria_p4.jpg"
    ],
    "synopsis": "Una profunda disección lírica sobre el poder de recordar y de olvidar; la memoria como dueña y esclava del tiempo.",
    "fullText": "La memoria\nque hacia atrás camina,\nhuye como una exhalación\nhacia el pasado,\ndonde conviven todos los recuerdos.\nMira hacia atrás\ny retrocede siempre.\nRecupera fugazmente la alegría\ny se queda viviendo en la tristeza\ny en la melancolía.\nUnas veces recrudecen los recuerdos\ny otras resucitan los olvidos.\nEs memoria cuando quiere triunfar\nante sí misma\ny amnesia cuando no quiere recordar de nuevo.\nAtiza la pasión\ncalma el desasosiego\natenúa el cansancio\ny sigue su camino hacia el recuerdo.\n\nEs dueña de sí misma y de su vida\npero esclava del recuerdo\nque amedrenta el espíritu,\ndel recuerdo que desvela y corroe,\ndel recuerdo funesto anquilosado y vivo\nque quema y que desgarra,\nque hiere y que lastima.\nEsclava insomne hacia las profundidades del pasado.\nSu libertad estriba en encontrar un rasgo de alegría\nen los recodos de su travesía.\nNostálgica cuando sueña despierta\nen las vanaglorias del pasado.\nY melancólica cuando arrastra pedazos de recuerdo\nque ya no son y no serán jamás.\n\nElige por instinto los recuerdos\nsin importar dolor o sufrimiento.\nA veces despiadada y fría,\notras veces amorosa y tierna,\nno da tregua al reposo ni en los sueños.\nHabita en el cerebro donde domina inquisitivamente\nvestigios del pasado.\nNunca mira adelante, ignora los presentes y el futuro.\nY allí en la bóveda de todos los misterios\nelabora sus juicios y se evade por los caminos\nde la indiferencia.\nRepetitiva, repetitiva siempre,\nsiempre repetitiva,\nsiempre como el martillo duro de los días.\nRescata y resucita los recuerdos de las ruinas calladas del olvido;\nes tal su poder\nque es capaz de elegir hasta el olvido.\n\nEs memoria,\nes recuerdo\ny es olvido."
  },
  {
    "id": "mas-aca",
    "title": "Más Acá (Más Allá)",
    "slug": "mas-aca",
    "subtitle": "Polvo molecular, arena cósmica y el enigma del ser",
    "collection": "Que diría el olvido del último recuerdo",
    "audioUrl": "/audio/mas_alla.mp3",
    "vidsUrl": "https://docs.google.com/videos/d/1Nyntz2nF6zjUesamKDytBywgSG7vgx3IXYfvfkrk26Q/play?usp=sharing",
    "localVideoUrl": "/videos/mas_aca_y_memoria.mp4",
    "hasNotebook": true,
    "notebookPages": [
      "/cuaderno/mas_aca_p1.jpg",
      "/cuaderno/mas_aca_p2.jpg",
      "/cuaderno/mas_aca_p3.jpg"
    ],
    "synopsis": "Una travesía poética antes del nacimiento: la danza entre la nada finita y el todo infinito en el cosmos de la materia.",
    "fullText": "Antes de nacer\nyacía inerte,\ngiraba en mundos convulsionados y difusos,\nsin destino predicho ni rumbo definido,\nal azar y al garete,\ntentado por oscuros abismos y hondas profundidades.\n\nNo sabía de mí\nmás que la esencia\nde la nada finita y el todo indefinido,\nhundido en universos moleculares,\nconvulsionados,\nque arrastraban pedazos de materia\npor cosmos y por caos.\n\nEstaba allí,\ninconsciente y ajeno,\ndesprovisto de toda voluntad para orientarme hacia el reposo,\nleyenda,\nfantasía\no asombro,\npara saber si iba\no si venía del designio.\n\nEstaba allí en el agreste torbellino\nde la desilusión y del cansancio,\npolvo molecular,\narena cósmica,\ngas astral en la inconsciencia plena,\ngirando en los océanos de la gravitación\ny el magnetismo.\n\nNacido\nun instante cualquiera,\nacechado por fuerzas enigmáticas,\niba y venía\ntras la misma esfera.\n\nSiempre al azar\ny a la deriva siempre,\nsin rumbo definido o metafísica,\nrecorría inmensidades en instantes\nsin encontrar la eternidad jamás.\n\nAntes de nacer\nyacía muerto en las playas del cosmos,\ncon atardeceres rojizos y mañanas gélidas,\nera parte del todo y de la nada,\nlejano al pensamiento y a la idea,\nlejos de la conciencia,\nmuy cercano a la angustia y a la melancolía.\n\nCada giro,\ncada movimiento me ponía cercano a la conciencia\ny contiguo a la sensorialidad y a lo emotivo;\nallí, al borde de un instante, de un sutil movimiento se encontraba la vida,\netéreo espejismo, pétrea emoción,\nbreve estadía aquí en universos plenos\nde ignorancias.\n\nAntes de nacer yacía inerte en el filo del cosmos,\nasediado por noches grises,\nfuerzas cósmicas,\ngiros gravitatorios\ny oscuridades invencibles.\n\nAntes de nacer\nyacía muerto."
  },
  {
    "id": "el-limosnero",
    "title": "El Limosnero",
    "slug": "el-limosnero",
    "subtitle": "No pedía limosna, enseñaba su espíritu transparente",
    "collection": "Que diría el olvido del último recuerdo",
    "audioUrl": "/audio/el_limosnero.mp3",
    "vidsUrl": "https://docs.google.com/videos/d/1dlng-vijbFR0XEn7eC6KQAsbgJ1kM7RpztX-WzEKKfY/play?usp=sharing",
    "hasNotebook": false,
    "notebookPages": [],
    "synopsis": "La estampa de un alma generosa que recorría las calles regalando serenidad y nobleza en cada paso.",
    "scenes": [
      {
        "scene": 1,
        "text": "El limosnero, por Guillermo Baena Restrepo. No pedía limosna, enseñaba su espíritu transparente y sincero,",
        "prompt": "Plano medio cinematográfico de un hombre sabio de edad madura caminando despacio por una calle empedrada al atardecer, luz cálida de hora dorada, estilo poético y nostálgico."
      },
      {
        "scene": 2,
        "text": "recorría las calles con un negro tintero, una pluma de cisne y un viejo cuaderno,",
        "prompt": "Primer plano de unas manos sosteniendo un tintero negro antiguo, una pluma de cisne blanca y un cuaderno de cuero desgastado, luz natural suave."
      },
      {
        "scene": 3,
        "text": "el leal le guardaba todos sus pensamientos, no dejaba que el tiempo se llevara la idea",
        "prompt": "Un cuaderno de notas abierto sobre una mesa de madera, sus páginas giran suavemente con la brisa de una ventana, tinta artesanal iluminada sutilmente."
      },
      {
        "scene": 4,
        "text": "de al instante preciso de nacer, la esculpía y rogaba a los seres que escucharan sus súplicas,",
        "prompt": "Detalle en cámara lenta de una pluma escribiendo poesía sobre papel antiguo, gotas de luz y movimientos de trazo pausado."
      },
      {
        "scene": 5,
        "text": "que sacaran un instante de sus mentes transidas y escucharan las voces que venían del misterio,",
        "prompt": "Multitud de gente caminando acelerada por la ciudad en desenfoque de movimiento (motion blur), mientras el poeta permanece inmóvil contemplando el cielo nocturno."
      },
      {
        "scene": 6,
        "text": "pero pocos le oían sus palabras y sus ruegos, así era la vida del cordial limosnero,",
        "prompt": "Plano general de peatones pasando de largo junto al hombre en una tarde nublada y con niebla tenue, atmósfera introspectiva."
      },
      {
        "scene": 7,
        "text": "que enviaba mensajes a las mentes vacías, de esperanza y de fe,",
        "prompt": "Luz tenue saliendo de las páginas del cuaderno hacia el cielo de la ciudad, creando pequeñas partículas de luz flotantes."
      },
      {
        "scene": 8,
        "text": "así era la vida de ser persistente, regalando energía, impregnando la fuerza,",
        "prompt": "El poeta entregando una nota escrita a mano con una sonrisa serena a un transeúnte, rayo de sol rompiendo entre las sombras."
      },
      {
        "scene": 9,
        "text": "consonando las almas, soportando el destierro y allí en sus palabras se encontraba el secreto",
        "prompt": "Una figura solitaria sentada en la banca de un parque durante el crepúsculo, contemplando el horizonte en calma profunda."
      },
      {
        "scene": 10,
        "text": "de soportar la vida, sin saber el misterio, pero muchos oídos ignoraban sus ecos,",
        "prompt": "Sombras de transeúntes proyectándose y deslizándose rápidamente sobre un muro de piedra antiguo, estilo cinematográfico."
      },
      {
        "scene": 11,
        "text": "se cansó de pedirle que escucharan sus versos y se volvió mendigo de sus propias palabras,",
        "prompt": "Primer plano del rostro del poeta mirando detenidamente su libreta con expresión reflexiva, profunda y melancólica."
      },
      {
        "scene": 12,
        "text": "comprendió que el mensaje que traía su espíritu era un solo secreto de las almas que pasan",
        "prompt": "Plano cenital (desde arriba) de un cruce de calles donde distintas personas caminan despacio trazando caminos que se cruzan."
      },
      {
        "scene": 13,
        "text": "hoy camina sereno, ondeando un cuaderno, donde nace la idea y aflora el pensamiento,",
        "prompt": "El limosnero caminando con paz interior por un sendero arbolado iluminado por el sol, sosteniendo su libreta con elegancia."
      },
      {
        "scene": 14,
        "text": "enseñando a los seres a soportar la vida y a comprender la absurda sentencia de muerte.",
        "prompt": "Atardecer sobre una ciudad antigua, el sol se oculta dejando ver las primeras estrellas, finalizando con un tono de paz trascendental."
      },
      {
        "scene": 1,
        "text": "El limosnero, por Guillermo Baena Restrepo. No pedía limosna, enseñaba su espíritu transparente y sincero,",
        "prompt": "Plano medio cinematográfico de un hombre sabio de edad madura caminando despacio por una calle empedrada al atardecer, luz cálida de hora dorada, estilo poético y nostálgico."
      },
      {
        "scene": 2,
        "text": "recorría las calles con un negro tintero, una pluma de cisne y un viejo cuaderno,",
        "prompt": "Primer plano de unas manos sosteniendo un tintero negro antiguo, una pluma de cisne blanca y un cuaderno de cuero desgastado, luz natural suave."
      },
      {
        "scene": 3,
        "text": "que leal le guardaba todos sus pensamientos, no dejaba que el tiempo se llevara la idea",
        "prompt": "Un cuaderno de notas abierto sobre una mesa de madera, sus páginas giran suavemente con la brisa de una ventana, tinta artesanal iluminada sutilmente."
      },
      {
        "scene": 4,
        "text": "de al instante preciso de nacer, la esculpía y rogaba a los seres que escucharan sus súplicas,",
        "prompt": "Detalle en cámara lenta de una pluma escribiendo poesía sobre papel antiguo, gotas de luz y movimientos de trazo pausado."
      },
      {
        "scene": 5,
        "text": "que sacaran un instante de sus mentes transidas y escucharan las voces que venían del misterio,",
        "prompt": "Multitud de gente caminando acelerada por la ciudad en desenfoque de movimiento (motion blur), mientras el poeta permanece inmóvil contemplando el cielo nocturno."
      },
      {
        "scene": 6,
        "text": "pero pocos le oían sus palabras y sus ruegos, así era la vida del cordial limosnero,",
        "prompt": "Plano general de peatones pasando de largo junto al hombre en una tarde nublada y con niebla tenue, atmósfera introspectiva."
      },
      {
        "scene": 7,
        "text": "que enviaba mensajes a las mentes vacías, de esperanza y de fe,",
        "prompt": "Luz tenue saliendo de las páginas del cuaderno hacia el cielo de la ciudad, creando pequeñas partículas de luz flotantes."
      },
      {
        "scene": 8,
        "text": "así era la vida de ese ser persistente, regalando energía, impregnando la fuerza,",
        "prompt": "El poeta entregando una nota escrita a mano con una sonrisa serena a un transeúnte, rayo de sol rompiendo entre las sombras."
      },
      {
        "scene": 9,
        "text": "consolando las almas, soportando el destierro y allí en sus palabras se encontraba el secreto",
        "prompt": "Una figura solitaria sentada en la banca de un parque durante el crepúsculo, contemplando el horizonte en calma profunda."
      },
      {
        "scene": 10,
        "text": "de soportar la vida, sin saber el misterio, pero muchos oídos ignoraban sus ecos,",
        "prompt": "Sombras de transeúntes proyectándose y deslizándose rápidamente sobre un muro de piedra antiguo, estilo cinematográfico."
      },
      {
        "scene": 11,
        "text": "se cansó de pedirle que escucharan sus versos y se volvió mendigo de sus propias palabras,",
        "prompt": "Primer plano del rostro del poeta mirando detenidamente su libreta con expresión reflexiva, profunda y melancólica."
      },
      {
        "scene": 12,
        "text": "comprendió que el mensaje que traía su espíritu era un solo secreto de las almas que pasan",
        "prompt": "Plano cenital (desde arriba) de un cruce de calles donde distintas personas caminan despacio trazando caminos que se cruzan."
      },
      {
        "scene": 13,
        "text": "hoy camina sereno, ondeando un cuaderno, donde nace la idea y aflora el pensamiento,",
        "prompt": "El limosnero caminando con paz interior por un sendero arbolado iluminado por el sol, sosteniendo su libreta con elegancia."
      },
      {
        "scene": 14,
        "text": "enseñando a los seres a soportar la vida y a comprender la absurda sentencia de muerte.",
        "prompt": "Atardecer sobre una ciudad antigua, el sol se oculta dejando ver las primeras estrellas, finalizando con un tono de paz trascendental."
      }
    ],
    "fullText": "No pedía limosna,\nenseñaba su espíritu\ntransparente y sincero.\n\nRecorría las calles\ncon un negro tintero,\nuna pluma de cisne\ny un viejo cuaderno\nque leal le guardaba\ntodos sus pensamientos.\n\nNo dejaba que el tiempo\nse llevara la idea,\ny al instante preciso de nacer,\nla esculpía.\n\nY rogaba a los seres\nque escucharan sus súplicas,\nque sacaran un instante\nde sus mentes transidas\ny escucharan las voces\nque venían del misterio.\n\nPero pocos le oían\nsus palabras y sus ruegos.\n\nAsí era la vida\ndel cordial limosnero,\nque enviaba mensajes\na las mentes vacías\nde esperanza y de fe.\n\nAsí era la vida\nde ese ser persistente,\nregalando energía,\nimpregnando la fuerza,\nconsolando las almas,\nsoportando el destierro.\n\nY allí, en sus palabras,\nse encontraba el secreto\nde soportar la vida\nsin saber el misterio.\n\nPero muchos oídos\nignoraban sus ecos.\nSe cansó de pedirle\nque escucharan sus versos\ny se volvió mendigo\nde sus propias palabras.\n\nComprendió que el mensaje\nque traía su espíritu\nera un solo secreto\nde las almas que pasan.\n\nHoy camina sereno,\nondeando un cuaderno\ndonde nace la idea\ny aflora el pensamiento,\nenseñando a los seres\na soportar la vida\ny a comprender la absurda\nsentencia de muerte."
  },
  {
    "id": "los-abuelos",
    "title": "Los Abuelos",
    "slug": "los-abuelos",
    "subtitle": "La savia nueva y el renacer del amor",
    "collection": "Que diría el olvido del último recuerdo",
    "audioUrl": "/audio/los_abuelos.mp3",
    "vidsUrl": "https://docs.google.com/videos/d/1ByuDH2qFnbodpG7UWOCkooCUUl_PmE_OXY_Gy4mqpvE/play?usp=sharing",
    "hasNotebook": false,
    "notebookPages": [],
    "synopsis": "Cuando el cuerpo reposaba y el alma estaba serena, se dio la reencarnación y brotaron frutos de amor: la llegada milagrosa de los nietos transformó la quietud en vida, luz y alegría.",
    "scenes": [
      {
        "scene": 1,
        "text": "Cuando el cuerpo reposaba, el alma estaba serena y el espíritu escribía con fe sus últimas páginas, se dio la reencarnación.",
        "prompt": "Cinematic realistic film, 8k, warm intimate twilight light, solemn nostalgic mood. An elderly dignified grandfather sitting peacefully in a sunlit wooden study, serene smile, hands resting on an open vintage journal."
      },
      {
        "scene": 2,
        "text": "Y del árbol de la vida brotaron frutos de amor. Aparecieron los nietos, un milagro que Dios tenía guardado en los libros del privilegio y el don, la más tierna descendencia de dulzura e ilusión.",
        "prompt": "Cinematic realistic film, 8k, warm morning golden light. A majestic lush old oak tree in a sunlit meadow, small young smiling grandchildren running with open arms towards their smiling grandparents, ethereal light particles, emotive and heartwarming."
      },
      {
        "scene": 3,
        "text": "Y al encontrarse los ojos, se conjugaron los tiempos y escribieron sus caminos en un solo corazón.",
        "prompt": "Cinematic realistic film, 8k, golden hour backlighting. Close-up emotional portrait, the weathered kind eyes of an elderly grandfather looking down affectionately into the bright sparkling eyes of his small grandchild, forehead to forehead touch of deep love."
      },
      {
        "scene": 4,
        "text": "La savia nueva llegó y lo que antes era quietud se convirtió en movimiento, lo que antes era estatismo se transformó en energía, lo que ayer era añoranza se revirtió en ilusión, lo que antes era nostalgia se volvió luz y alegría.",
        "prompt": "Cinematic realistic film, 8k, vibrant dynamic morning light. Grandparents laughing joyfully in a vibrant sunlit garden with their grandchildren, colorful wildflowers, sunlight bursting through branches, dynamic movement full of revitalized vitality."
      },
      {
        "scene": 5,
        "text": "La aparición de los nietos en la vida de los abuelos imprimió a su pensamiento un hálito de niñez y deseos de vivir.",
        "prompt": "Cinematic realistic film, 8k, cozy warm afternoon atmosphere. An elderly grandmother and grandfather on a cozy porch, laughing wholeheartedly while holding colorful paper pinwheels spinning in the wind with the children."
      },
      {
        "scene": 6,
        "text": "Con el vuelo de la cometa se levantaron sus párpados, con el juego de las canicas recobraron su visión,",
        "prompt": "Cinematic realistic film, 8k, breezy sunny afternoon, vast blue sky with fluffy white clouds. A grandfather holding the string of a vibrant diamond kite flying high in the wind together with his grandson, both looking up with wide joyful eyes."
      },
      {
        "scene": 7,
        "text": "afinaron sus oídos con gritos y algarabías, mejoraron sus reflejos jugando al escondidijo, fortificaron sus piernas detrás de una pelota,",
        "prompt": "Cinematic realistic film, 8k, golden grass field in late afternoon. Grandfather playfully chasing a bright red ball with his cheerful granddaughter in a grassy park, spontaneous laughter, lively motion blur, warm sun flare."
      },
      {
        "scene": 8,
        "text": "la precisión de sus manos escribiendo las vocales, la movilidad de sus labios con cánticos infantiles, la dimensión de sus brazos enseñando la ternura.",
        "prompt": "Cinematic realistic film, 8k, soft gentle indoor window light. An elderly grandmother gently guiding a little girl's hand with a colored pencil on paper, warm embrace, singing together with tender expressions, deeply touching detail."
      },
      {
        "scene": 9,
        "text": "Y al cambiar radicalmente su letárgica biología, en el corazón del abuelo se empotró un alma de niño y en el alma de la abuela renació el amor de madre.",
        "prompt": "Cinematic realistic film, 8k, glowing twilight terrace. Grandparents sitting with the children wrapped in a soft knitted blanket, gazing at starry skies, expressions of profound rebirth, peace, and maternal radiance."
      },
      {
        "scene": 10,
        "text": "Los abuelos siempre dan sabiduría, consejos ciertos, ternura y amor incondicional; y los nietos les regalan juventud, amor y paz.",
        "prompt": "Cinematic realistic film, 8k, master shot, heavenly golden sunset. Three generations together on a panoramic green hilltop overlooking a serene valley, holding hands in unity, divine sunbeams bathing them in golden warmth, feeling of eternal love, peace and legacy."
      }
    ],
    "fullText": "Cuando el cuerpo reposaba,\nel alma estaba serena\ny el espíritu escribía con fe\nsus últimas páginas,\nse dio la reencarnación.\n\nY del árbol de la vida\nbrotaron frutos de amor.\nAparecieron los nietos,\nun milagro\nque Dios tenía guardado\nen los libros\ndel privilegio y el don,\nla más tierna descendencia\nde dulzura e ilusión.\n\nY al encontrarse los ojos,\nse conjugaron los tiempos\ny escribieron sus caminos\nen un solo corazón.\n\nLa savia nueva llegó\ny lo que antes era quietud\nse convirtió en movimiento,\nlo que antes era estatismo\nse transformó en energía,\nlo que ayer era añoranza\nse revirtió en ilusión,\nlo que antes era nostalgia\nse volvió luz y alegría.\n\nLa aparición de los nietos\nen la vida de los abuelos\nimprimió a su pensamiento\nun hálito de niñez\ny deseos de vivir.\n\nCon el vuelo de la cometa\nse levantaron sus párpados,\ncon el juego de las canicas\nrecobraron su visión,\nafinaron sus oídos\ncon gritos y algarabías,\nmejoraron sus reflejos\njugando al escondidijo,\nfortificaron sus piernas\ndetrás de una pelota,\nla precisión de sus manos\nescribiendo las vocales,\nla movilidad de sus labios\ncon cánticos infantiles,\nla dimensión de sus brazos\nenseñando la ternura.\n\nY al cambiar radicalmente\nsu letárgica biología,\nen el corazón del abuelo\nse empotró un alma de niño\ny en el alma de la abuela\nrenació el amor de madre.\n\nLos abuelos siempre dan\nsabiduría,\nconsejos ciertos,\nternura\ny amor incondicional;\ny los nietos\nles regalan\njuventud,\namor y paz."
  },
  {
    "id": "el-mendigo",
    "title": "El Mendigo",
    "slug": "el-mendigo",
    "subtitle": "Una sombra triste dibujada en la lluvia",
    "collection": "Que diría el olvido del último recuerdo",
    "audioUrl": "/audio/el_mendigo.mp3",
    "vidsUrl": "https://docs.google.com/videos/d/1fptS3KErNIwIzPkDUZV6tCvqTE4kCYlOHXrcRsElmt8/play?usp=sharing",
    "hasNotebook": false,
    "notebookPages": [],
    "synopsis": "Venía del exilio con los ojos llorosos y caminaba sin rumbo por las calles desiertas: la conmovedora elegía a un ser que ignoraba su origen y al que las legiones humanas arrojaban con miedo un mendrugo de pan.",
    "scenes": [
      {
        "scene": 1,
        "text": "Venía del exilio con los ojos llorosos, por el surco de sus ojos descendían sus lágrimas, y en sus labios sedientos murmuraba el cansancio.",
        "prompt": "Cinematic realistic film, 8k, dramatic moody rainy dusk atmosphere, soft street lamp glow. Close-up portrait of an aged solitary wanderer, tears slowly tracing down his weathered wrinkled cheeks, dry parched lips, profound melancholy and endurance."
      },
      {
        "scene": 2,
        "text": "No sabía desde niño qué era el calor humano, y abarcaron sus brazos siempre la soledad.",
        "prompt": "Cinematic realistic film, 8k, cold desaturated blue tones with a sliver of distant warm light. A lonely figure standing with folded arms in an empty twilight alleyway, misty cobblestones, long dark shadows, haunting poetic loneliness."
      },
      {
        "scene": 3,
        "text": "No sabía quién era ni de dónde venía. Le decían un nombre y por instinto miraba. Caminaba sin rumbo por las calles desiertas.",
        "prompt": "Cinematic realistic film, 8k, wide angle shot, deserted nocturnal city square washed by recent rain, reflections on wet stone pavement, solitary traveler in worn dark coat walking slowly into the misty distance."
      },
      {
        "scene": 4,
        "text": "Recorría los espacios con los pies entumidos y tenía mucho tiempo sin que tiempo tuviera.",
        "prompt": "Cinematic realistic film, 8k, low angle tracking shot, bare feet weathered by mud and rain stepping cautiously along a desolate cobblestone street at dawn, faint amber haze on the horizon."
      },
      {
        "scene": 5,
        "text": "Ignoraba su origen y sus antepasados, no sabía de afectos, ni entendía de amores, no tenía en su tacto sensación del calor, no tenía en sus ojos una imagen alegre, ni guardaba en sus oídos una nota feliz, no tenía en sus labios dibujada la risa.",
        "prompt": "Cinematic realistic film, 8k, Rembrandt side lighting, deep shadows. Side profile portrait of the wanderer sitting against a cold stone wall, hands resting on knees, eyes staring into infinity with detached existential depth."
      },
      {
        "scene": 6,
        "text": "Caminaba descalzo como había llegado. Un cigarro en la boca lo ponía a soñar, un periódico viejo abrazaba sus lumbares y un pan avinagrado distraía sus fatigas.",
        "prompt": "Cinematic realistic film, 8k, atmospheric cinematic realism. An old man resting under an arched bridge, a thin wisp of smoke rising from a cigarette between his lips, holding a crust of dry bread in worn hands, vintage papers wrapped around him."
      },
      {
        "scene": 7,
        "text": "Era una sombra triste dibujada en la lluvia, una piel calcinada adherida al sol, con fantasmas antiguos compartía sus noches y temores noctámbulos alertaban su espíritu.",
        "prompt": "Cinematic realistic film, 8k, heavy nocturnal rain falling through street lamps, silhouetted figure walking through glistening puddles, ethereal mist and dreamlike reflections, solemn poetic mood."
      },
      {
        "scene": 8,
        "text": "No sabía quién era ni de dónde venía, solo supo que un día se sintió en el exilio y en un crudo desierto transcurrieron sus días. Le sobraban preguntas y no habían respuestas.",
        "prompt": "Cinematic realistic film, 8k, sweeping landscape, harsh windswept arid twilight desert merging into empty city outskirts, the lone wanderer gazing at an overcast endless sky, existential grandeur."
      },
      {
        "scene": 9,
        "text": "Lo llamaban mendigo las legiones humanas y al sentir que su alma se sentía cercana, le arrojaban con miedo un mendrugo de pan.",
        "prompt": "Cinematic realistic film, 8k, master emotional scene, contrasting crowd of hurried shadowy city pedestrians and the serene, humble presence of the wanderer standing in dignity, a piece of bread offered on the stone ground, glowing golden light breaking through grey clouds."
      }
    ],
    "fullText": "Venía del exilio\ncon los ojos llorosos,\npor el surco de sus ojos\ndescendían sus lágrimas,\ny en sus labios sedientos\nmurmuraba el cansancio.\n\nNo sabía desde niño\nqué era el calor humano,\ny abarcaron sus brazos\nsiempre la soledad.\n\nNo sabía quién era\nni de dónde venía.\nLe decían un nombre\ny por instinto miraba.\nCaminaba sin rumbo\npor las calles desiertas.\n\nRecorría los espacios con los pies entumidos\ny tenía mucho tiempo\nsin que tiempo tuviera.\n\nIgnoraba su origen y sus antepasados,\nno sabía de afectos,\nni entendía de amores,\nno tenía en su tacto sensación del calor,\nno tenía en sus ojos\nuna imagen alegre,\nni guardaba en sus oídos\nuna nota feliz,\nno tenía en sus labios\ndibujada la risa.\n\nCaminaba descalzo como había llegado.\nUn cigarro en la boca lo ponía a soñar,\nun periódico viejo abrazaba sus lumbares\ny un pan avinagrado distraía sus fatigas.\n\nEra una sombra triste\ndibujada en la lluvia,\nuna piel calcinada\nadherida al sol,\ncon fantasmas antiguos compartía sus noches\ny temores noctámbulos alertaban su espíritu.\n\nNo sabía quién era\nni de dónde venía,\nsolo supo que un día\nse sintió en el exilio\ny en un crudo desierto transcurrieron sus días.\n\nLe sobraban preguntas\ny no habían respuestas.\n\nLo llamaban mendigo\nlas legiones humanas\ny al sentir que su alma\nse sentía cercana,\nle arrojaban con miedo\nun mendrugo de pan."
  }
];
