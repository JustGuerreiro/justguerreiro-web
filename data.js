export const TEST_USERS = {
  "justguerreiro": {
    username: "JustGuerreiro",
    password: "123",
    displayName: "Diogo Guerreiro",
    role: "admin",
    avatar: "JG"
  },
  "amor": {
    username: "Amor",
    password: "123",
    displayName: "Minha Namorada",
    role: "partner",
    avatar: "❤️"
  }
};

export const PROFILE_CONTACT = {
  name: "Diogo Guerreiro",
  handle: "JustGuerreiro",
  location: "Portimão, Portugal",
  role: "Engenharia Informática // Software, Sistemas & Multimédia",
  bio: "Estudante de Engenharia Informática focado no desenvolvimento de aplicações estruturadas, sistemas embebidos com microcontroladores e experiências interativas. Fora do código, dedico-me à fotografia, edição de vídeo/VFX e música.",
  email: "contacto@justguerreiro.dev", // Podes colocar aqui o teu email real
  github: "https://github.com/JustGuerreiro",
  linkedin: "https://linkedin.com/in/",
  instagram: "https://instagram.com/"
};

export const INITIAL_COUPLE_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    caption: "Nós // Momento #01"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    caption: "Aventuras & Planos // #02"
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "OmniVault",
    category: "Arquitetura & Desktop",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    description: "Aplicação desktop focada em segurança e organização modular de dados, com arquitetura escalável e controlo de versões estruturado.",
    problem: "Necessidade de centralizar dados sensíveis e ficheiros locais numa aplicação desktop segura, rápida e independente da cloud.",
    architecture: "Arquitetura em camadas com separação estrita entre UI, lógica de domínio e persistência encriptada, desenhada para escalar em fases.",
    challenges: "Estruturação do roadmap técnico, definição de módulos isolados e configuração do fluxo de trabalho Git para manutenção a longo prazo.",
    stack: ["C#", ".NET", "Arquitetura", "Git"],
    status: "Em Desenvolvimento",
    link: "https://github.com"
  },
  {
    id: 2,
    title: "Arrival Translator",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    description: "Aplicação Android nativa para tradução rápida com interface reativa em Jetpack Compose e suporte a fundos de vídeo dinâmicos.",
    problem: "Criar uma experiência de tradução mobile imediata e visualmente imersiva sem bloquear a thread principal da interface.",
    architecture: "Desenvolvido em Kotlin com Jetpack Compose, utilizando gestão de estado reativa e ciclo de vida otimizado para reprodução de vídeo em background.",
    challenges: "Garantir que o vídeo de fundo em loop não degradava a performance da UI nem o consumo de memória em diferentes dispositivos Android.",
    stack: ["Kotlin", "Jetpack Compose", "Android"],
    status: "Concluído",
    link: "https://github.com"
  },
  {
    id: 3,
    title: "ESP32-CAM Audio System",
    category: "Hardware & Embedded",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Sistema embebido integrando microcontrolador ESP32-CAM e módulo DFPlayer Mini para processamento e reprodução de áudio.",
    problem: "Integrar captura/controlo num microcontrolador compacto com reprodução de áudio dedicada via cartão microSD.",
    architecture: "Comunicação série UART entre o ESP32-CAM (programado em C++) e o descodificador hardware DFPlayer Mini numa breadboard dedicada.",
    challenges: "Estabilização da alimentação elétrica na breadboard para evitar ruído no áudio e gestão de pinos partilhados do ESP32-CAM.",
    stack: ["C++", "ESP32", "Hardware", "UART"],
    status: "Concluído",
    link: "https://github.com"
  },
  {
    id: 4,
    title: "Falling Grid 3D",
    category: "Web Game 3D",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Jogo 3D interativo no browser com física em tempo real, controlo de esfera e plataformas dinâmicas que colapsam.",
    problem: "Construir um jogo 3D fluido diretamente no navegador sem motores pesados externos, mantendo 60 FPS constantes.",
    architecture: "Motor de jogo assente em Three.js (WebGL) com loop de física customizado, deteção de colisões por grelha e estados de queda das plataformas.",
    challenges: "Sincronizar a deteção de contacto da bola com o temporizador de queda de cada bloco individual da grelha.",
    stack: ["Three.js", "JavaScript", "WebGL"],
    status: "Concluído",
    link: "https://github.com"
  }
];

export const INITIAL_SETUP = [
  {
    category: "Workstation // Core",
    icon: "cpu",
    items: [
      { name: "Processador", detail: "Intel Core i7-10700" },
      { name: "Gráfica", detail: "NVIDIA GeForce RTX 2060 Super" },
      { name: "Memória", detail: "16GB RAM DDR4" },
      { name: "Browser", detail: "Opera GX" }
    ]
  },
  {
    category: "Dev // Stack & Tools",
    icon: "terminal",
    items: [
      { name: "IDEs", detail: "VS Code, Android Studio, Visual Studio" },
      { name: "Code", detail: "C, C++, Kotlin, JavaScript, SQL" },
      { name: "Version Control", detail: "Git & GitHub" }
    ]
  },
  {
    category: "Media // Visuals",
    icon: "camera",
    items: [
      { name: "Câmara", detail: "Canon EOS M50 Mark II" },
      { name: "Video & VFX", detail: "DaVinci Resolve & After Effects" },
      { name: "Design", detail: "Adobe Photoshop" }
    ]
  },
  {
    category: "Daily // Gear",
    icon: "smartphone",
    items: [
      { name: "Smartphone", detail: "Poco X7 Pro" },
      { name: "Daily Ride", detail: "VW Polo 1.0 (2001)" }
    ]
  }
];

export const INITIAL_COUPLE_DATA = {
  viagens: [
    {
      id: 101,
      title: "Escócia (Edimburgo & Highlands)",
      meta: "Março 2027",
      notes: "Ver castelos, Loch Ness e paisagens das terras altas",
      mapsUrl: "",
      done: false,
      createdAt: 1710000001,
      checklist: [
        { id: 1, text: "Comprar voos de ida e volta", done: true },
        { id: 2, text: "Reservar alojamento em Edimburgo", done: false },
        { id: 3, text: "Planear tour às Highlands / Loch Ness", done: false },
        { id: 4, text: "Tratar de seguro / documentos", done: false }
      ]
    },
    {
      id: 102,
      title: "Londres, Reino Unido",
      meta: "Setembro 2027",
      notes: "Camden Town, museus, mercados de rua e West End",
      mapsUrl: "",
      done: false,
      createdAt: 1710000002,
      checklist: [
        { id: 1, text: "Confirmar passaportes e ETA UK", done: false },
        { id: 2, text: "Escolher zona do hotel", done: false },
        { id: 3, text: "Listar pontos principais por dia", done: false }
      ]
    },
    {
      id: 103,
      title: "Roadtrip Costa Vicentina",
      meta: "Fim de semana",
      notes: "Praias, falésias e pôr do sol",
      mapsUrl: "",
      done: true,
      createdAt: 1710000000,
      checklist: [
        { id: 1, text: "Atestar depósito e playlist pronta", done: true },
        { id: 2, text: "Paragem em Odeceixe e Arrifana", done: true }
      ]
    }
  ],
  restaurantes: [
    { id: 201, title: "Ramen Tradicional & Gyozas", meta: "Japonês", notes: "Pedir caldo tonkotsu picante", mapsUrl: "https://maps.google.com/?q=Ramen+Restaurante", done: false, createdAt: 1710000005 },
    { id: 202, title: "Steakhouse Maturada", meta: "Carnes", notes: "Jantar especial a dois", mapsUrl: "https://maps.google.com/?q=Steakhouse", done: false, createdAt: 1710000004 },
    { id: 203, title: "Tapas & Petiscos", meta: "Ibérico", notes: "Ambiente brutal ao final da tarde", mapsUrl: "https://maps.google.com/?q=Tapas+Portimao", done: true, createdAt: 1710000003 }
  ],
  filmes: [
    { id: 301, title: "Dune: Part Two", meta: "Sci-Fi", notes: "Sessão épica", mapsUrl: "", done: true, createdAt: 1710000006 },
    { id: 302, title: "Interstellar (Rewatch)", meta: "Sci-Fi", notes: "Ver num serão de chuva", mapsUrl: "", done: false, createdAt: 1710000008 },
    { id: 303, title: "Severance", meta: "Série Thriller", notes: "Maratonar temporada", mapsUrl: "", done: false, createdAt: 1710000009 },
    { id: 304, title: "The Batman", meta: "Noir / Action", notes: "Sessão de sofá à noite", mapsUrl: "", done: false, createdAt: 1710000007 }
  ],
  jogos: [
    { id: 401, title: "It Takes Two", meta: "PC // Co-op", notes: "Obrigatório terminar a dois", mapsUrl: "", done: false, createdAt: 1710000012 },
    { id: 402, title: "Overcooked! All You Can Eat", meta: "Co-op Caótico", notes: "Tentar não incendiar a cozinha", mapsUrl: "", done: true, createdAt: 1710000010 },
    { id: 403, title: "A Way Out", meta: "Split-screen", notes: "Fuga da prisão", mapsUrl: "", done: false, createdAt: 1710000011 },
    { id: 404, title: "Portal 2 (Co-op)", meta: "Puzzles", notes: "Testar sinergia e raciocínio", mapsUrl: "", done: false, createdAt: 1710000013 }
  ]
};

// Biblioteca Cultural com Capa (cover) e Estado de Consumo (status: 'active' | 'completed')
export const INITIAL_SHELF_DATA = {
  jogos: [
    {
      id: 501,
      title: "Counter-Strike 2",
      meta: "PC // FPS Tático",
      status: "active",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
      review: "Competitivo tático de eleição."
    },
    {
      id: 502,
      title: "Pokémon Champions",
      meta: "Competitivo // Estratégia",
      status: "active",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=600&q=80",
      review: "Team building e leitura de metagame."
    }
  ],
  filmes: [
    {
      id: 601,
      title: "Oppenheimer",
      meta: "IMAX // 2023",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
      review: "Banda sonora e fotografia absurdas."
    },
    {
      id: 602,
      title: "Fight Club",
      meta: "Clássico Cult",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
      review: "Guião e reviravolta intemporais."
    }
  ],
  series: [
    {
      id: 701,
      title: "Breaking Bad",
      meta: "5 Temporadas",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80",
      review: "Obra-prima do início ao fim."
    },
    {
      id: 702,
      title: "Mr. Robot",
      meta: "Cyber / Thriller",
      status: "active",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      review: "A melhor representação de hacking e estética dark."
    }
  ],
  concertos: [
    {
      id: 801,
      title: "Slipknot // Evil Live",
      meta: "Lisboa",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80",
      review: "Energia brutal ao vivo, mosh do início ao fim."
    },
    {
      id: 802,
      title: "Metallica // WorldWired",
      meta: "Estádio do Restelo",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
      review: "Setlist lendária e produção gigante."
    }
  ]
};