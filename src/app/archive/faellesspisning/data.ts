import { EventData, OtherEvent } from '../../../types/event';

export const faellesspisningData: EventData = {
  title: "Faellespisgning night",
  year: 2023,
  status: "Past",
  city: "Denmark",
  date: "2023.12.10",
  time: "10:00 - 22:00",
  location: "Kraft Werket https://kraftwerket.kk.dk/en",
  mapUrl: "https://maps.app.goo.gl/oFHHhRYHMUcRGRA49", 
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2250.5847045253167!2d12.515927077356848!3d55.66143187305057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652538c3746dec5%3A0x72ec5cf48afc1867!2zVmFsZ8OlcmRzdmVqIDIsIDI1MDAgS8O4YmVuaGF2biwg44OH44Oz44Oe44O844Kv!5e0!3m2!1sja!2sjp!4v1785377587914!5m2!1sja!2sjp", 
  imageUrl: "/faellesspisning.png", 
  statement: `“Faellesspisning” の精神\n— 食材を選び、調理し、同じテーブルを囲む。そのすべての時間を共にする、デンマークの豊かな食文化。\n食を探求し、創り出し、分かち合う過程を通じて、日本とデンマークの文化が心地よく溶け合う場を目指して。\nさらに、その体験をより深める豊かなエッセンスとして、アート展示やダンスパフォーマンス、映画上映などの多様なカルチャーを交差させていきます。`,
  
  statementImages: [
    "/images/faellesspisning/statement.jpg"
  ],

  // 🌟 修正: artists配列を使って複数人登録できる構造に変更
  artistIntroductions: [
    {
      artists: [
        { title: "Dance Performance", name: "Mirika Ishida" }
        // 複数いる場合はここに { title: "...", name: "..." } を追加
      ],
      description: "",
      images: [
        "/images/faellesspisning/artist-1-1.jpg",
        "/images/faellesspisning/artist-1-2.jpg",
      ],
    },
    {
      artists: [
        { title: "Washi Artwork", name: "Zenia Ekdal" }
      ],
      description: "",
      images: [
        "/images/faellesspisning/artist-2-1.jpg",
        "/images/faellesspisning/artist-2-2.jpg",
        "/images/faellesspisning/artist-2-3.jpg",
      ],
    },
    {
      artists: [
        { title: "Graphic Illustration", name: "Moe Miyahara" }
      ],
      description: "",
      images: [
        "/images/faellesspisning/artist-3-1.jpg",
        "/images/faellesspisning/artist-3-2.jpg",
      ],
    },
    {
      artists: [
        { title: "Ike-Yasai", name: "Izumi Kanesaka" }
      ],
      description: "",
      images: [
        "/images/faellesspisning/artist-4-1.jpg",
        "/images/faellesspisning/artist-4-2.jpg",
      ],
    },
    {
      artists: [
        { title: "Dinner Session", name: "Minaka Ono & SAITO" },
        { title: "Tea Ceremony", name: "Yukihiro Takano" },
        { title: "Dialogue & Hygge Time", name: "Toshiki Narushima" },
        { title: "Content Creation", name: "Yoshinori" },
        { title: "VJ Session", name: "Izumi Kanesaka" }
      ],
      description: "",
      images: [
        "/images/faellesspisning/artist-5-1.jpg",
        "/images/faellesspisning/artist-5-2.jpg",
        "/images/faellesspisning/artist-5-3.jpg",
        "/images/faellesspisning/artist-5-4.jpg",
        "/images/faellesspisning/artist-5-5.jpg",
        "/images/faellesspisning/artist-5-6.jpg",
      ],
    }
  ],
  organizer: [],
  cooperation: [],
  support: [
    { name: "【協賛・後援団体名 1】", logoUrl: "" },
    { name: "【協賛・後援団体名 2】", logoUrl: "" }
  ],
};

export const otherEventsData: OtherEvent[] = [
  { id: "trace-trash", title: "Trace/Trash", year: 2026, image: "/trace-trash.jpg" },
  { id: "blur-stir", title: "Blur/Stir", year: 2024, image: "/blur-stir.png" },
  { id: "hazama", title: "HAZAMA", year: 2023, image: "/hazama.png" },
  { id: "trouvaille", title: "Trouvaille", year: 2023, image: "/Trouvaille.png" },
];