"use client";

export default function LanguagesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
        <h1 className="text-3xl font-semibold mb-6">Languages</h1>

        <p className="mb-6">
          ShunyaLabs supports <b>207 languages</b> with 18 more coming soon. Use
          these language codes with the{" "}
          <code className="bg-gray-200 px-1 rounded text-red-600">
            language_code
          </code>{" "}
          parameter.
        </p>

        {/* ==== Indic Languages ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Indic Languages (32 available)
        </h2>
        <LanguageTable
          data={[
            ["Awadhi", "अवधी", "awa"],
            ["Bagheli", "बघेली", "bgh"],
            ["Bengali (Bangladesh)", "বাংলা", "bn-BD"],
            ["Bengali (India)", "বাংলা", "bn-IN"],
            ["Bhojpuri", "भोजपुरी", "bho"],
            ["Bodo", "बड़ो", "brx"],
            ["Chhattisgarhi", "छत्तीसगढ़ी", "hne"],
            ["Dogri", "डोगरी", "doi"],
            ["Garo", "गारो", "grt"],
            ["Gondi", "गोदी", "gon"],
            ["Haryanvi", "हरियाणवी", "bgc"],
            ["Hindi", "हिन्दी", "hi"],
            ["Ho", "हो", "hoc"],
            ["Kannada", "ಕನ್ನಡ", "kn"],
            ["Kashmiri", "कश्मीरी", "ks"],
            ["Khasi", "खासी", "kha"],
            ["Khond", "खोंड", "kov"],
            ["Konkani", "कोंकणी", "kok"],
            ["Magahi", "मगही", "mag"],
            ["Maithili", "मैथिली", "mai"],
            ["Malvi", "मालवी", "mup"],
            ["Marathi", "मराठी", "mr"],
            ["Marwari", "मारवाड़ी", "mwr"],
            ["Mizo", "मिजो", "lus"],
            ["Mundari", "मुंडारी", "unr"],
            ["Nepali", "नेपाली", "ne"],
            ["Rajasthani", "राजस्थानी", "raj"],
            ["Santali", "संताली", "sat"],
            ["Sindhi", "سندھی", "sd"],
            ["Tamil", "தமிழ்", "ta"],
            ["Tulu", "ತುಳು", "tcy"],
            ["Urdu", "اردو", "ur"],
          ]}
        />
        <p className="mt-3 text-sm text-gray-600">
          <b>Coming Soon:</b> Assamese (<code>as</code>), Gujarati (
          <code>gu</code>), Malayalam (<code>ml</code>), Manipuri (
          <code>mni</code>), Odia (<code>or</code>), Punjabi (<code>pa</code>),
          Telugu (<code>te</code>)
        </p>

        {/* ==== European Languages ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          European Languages (58 available)
        </h2>
        <LanguageTable
          data={[
            ["Albanian", "Albanian", "sq"],
            ["Basque", "Euskera", "eu"],
            ["Bavarian", "Boarisch", "bar"],
            ["Belarusian", "Беларуская", "be"],
            ["Bulgarian", "Български", "bg"],
            ["Catalan", "Català", "ca"],
            ["Croatian", "Hrvatski", "hr"],
            ["Czech", "Čeština", "cs"],
            ["Danish", "Dansk", "da"],
            ["Dutch", "Nederlands", "nl"],
            ["English (Global)", "English", "en"],
            ["English (UK)", "English UK", "en-GB"],
            ["English (US)", "English US", "en-US"],
            ["English (Australia)", "English Australia", "en-AU"],
            ["English (Canada)", "English Canada", "en-CA"],
            ["English (South Africa)", "English South Africa", "en-ZA"],
            ["English (Ireland)", "English Ireland", "en-IE"],
            ["Finnish", "Suomi", "fi"],
            ["French (Global)", "Français", "fr"],
            ["French (France)", "Français (France)", "fr-FR"],
            ["French (Canada)", "Français (Canada)", "fr-CA"],
            ["French (Switzerland)", "Français (Suisse)", "fr-CH"],
            ["German", "Deutsch", "de"],
            ["Greek", "Ελληνικά", "el"],
            ["Hungarian", "Magyar", "hu"],
            ["Italian", "Italiano", "it"],
            ["Polish", "Polski", "pl"],
            ["Portuguese (Global)", "Português", "pt"],
            ["Portuguese (Africa)", "Português (African)", "pt-AF"],
            ["Portuguese (Brazil)", "Português (Brasil)", "pt-BR"],
            ["Romanian", "Română", "ro"],
            ["Russian", "Русский", "ru"],
            ["Serbian", "Srpski", "sr"],
            ["Slovak", "Slovenčina", "sk"],
            ["Slovenian", "Slovenščina", "sl"],
            ["Spanish (Spain)", "Español (España)", "es-ES"],
            ["Spanish (Global)", "Español", "es"],
            ["Swedish", "Svenska", "sv"],
            ["Ukrainian", "Українська", "uk"],
            ["Welsh", "Cymraeg", "cy"],
          ]}
        />

        {/* ==== Asian Languages ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Asian Languages (28 available)
        </h2>
        <LanguageTable
          data={[
            ["Acehnese", "Acehnese", "ace"],
            ["Bugis", "Bugis", "bug"],
            ["Cebuano", "Cebuano", "ceb"],
            ["Chinese (Mandarin)", "中文", "zh-CN"],
            ["Chinese (Cantonese)", "廣東話", "zh-HK"],
            ["Japanese", "日本語", "ja"],
            ["Korean", "한국어", "ko"],
            ["Malay", "Bahasa Melayu", "ms"],
            ["Thai", "ไทย", "th"],
            ["Vietnamese", "Tiếng Việt", "vi"],
            ["Indonesian", "Bahasa Indonesia", "id"],
            ["Tagalog", "Tagalog", "tl"],
            ["Javanese", "Javanese", "jv"],
            ["Burmese", "မြန်မာ", "my"],
            ["Khmer", "ខ្មែរ", "km"],
            ["Lao", "ລາວ", "lo"],
            ["Tibetan", "བོད་", "bo"],
          ]}
        />
        <p className="mt-3 text-sm text-gray-600">
          <b>Coming Soon:</b> Lao (<code>lo</code>), Khmer (<code>km</code>),
          Burmese (<code>my</code>), Shan (<code>shn</code>), Tibetan (
          <code>bo</code>), Sinhala (<code>si</code>), Dzongkha (<code>dz</code>)
        </p>

        {/* ==== African Languages ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          African Languages (41 available)
        </h2>
        <LanguageTable
          data={[
            ["Afrikaans", "Afrikaans", "af"],
            ["Akan", "Akan", "ak"],
            ["Arabic (Maghrebi)", "Arabic (Maghrebi)", "ar-MA"],
            ["Arabic (Chadian)", "Arabic (Chadian)", "ar-TD"],
            ["Bambara", "Bambara", "bm"],
            ["Berber", "Tamazight", "ber"],
            ["Chichewa", "Nyanja", "ny"],
            ["Ewe", "Ewe", "ee"],
            ["Fulani", "Fulani", "ff"],
            ["Ga", "Ga", "gaa"],
            ["Hausa", "Hausa", "ha"],
            ["Igbo", "Igbo", "ig"],
            ["Lingala", "Lingála", "ln"],
            ["Kinyarwanda", "Kinyarwanda", "rw"],
            ["Swahili", "Kiswahili", "sw"],
            ["Wolof", "Wolof", "wo"],
            ["Xhosa", "Xhosa", "xh"],
            ["Yoruba", "Yoruba", "yo"],
            ["Zulu", "Zulu", "zu"],
          ]}
        />
        <p className="mt-3 text-sm text-gray-600">
          <b>Coming Soon:</b> Amharic (<code>am</code>), Tigrinya (
          <code>ti</code>)
        </p>

        {/* ==== Middle Eastern ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Middle Eastern Languages (23 available)
        </h2>
        <LanguageTable
          data={[
            ["Arabic (Global)", "العربية", "ar"],
            ["Arabic (Egyptian)", "العربية المصرية", "ar-EG"],
            ["Arabic (Gulf)", "العربية الخليجية", "ar-AE"],
            ["Arabic (Levantine)", "العربية الشامية", "ar-LB"],
            ["Arabic (Iraqi)", "العربية العراقية", "ar-IQ"],
            ["Hebrew", "עברית", "he"],
            ["Persian", "فارسی", "fa"],
            ["Turkish", "Türkçe", "tr"],
            ["Kurdish (Kurmanji)", "Kurdî", "ku"],
            ["Kurdish (Sorani)", "کوردی", "ckb"],
            ["Pashto", "پښتو", "ps"],
            ["Urdu", "اردو", "ur"],
          ]}
        />
        <p className="mt-3 text-sm text-gray-600">
          <b>Coming Soon:</b> Georgian (<code>ka</code>)
        </p>

        {/* ==== South American ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          South American Languages (14 available)
        </h2>
        <LanguageTable
          data={[
            ["Aymara", "Aymara", "ay"],
            ["Guarani", "Guarani", "gn"],
            ["Haitian Creole", "Kreyòl Ayisyen", "ht"],
            ["Maya (K'iche)", "Maya K'iche'", "quc"],
            ["Maya (Q'eqchi)", "Maya Q'eqchi'", "kek"],
            ["Portuguese (Brazil)", "Português (Brasil)", "pt-BR"],
            ["Spanish (Argentina)", "Español (Argentina)", "es-AR"],
            ["Spanish (Chilean)", "Español (Chileno)", "es-CL"],
            ["Spanish (Colombian)", "Español (Colombiano)", "es-CO"],
            ["Spanish (Global)", "Español", "es"],
          ]}
        />

        {/* ==== North American ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          North American Languages (11 available)
        </h2>
        <LanguageTable
          data={[
            ["English (Global)", "English", "en"],
            ["English (US)", "English US", "en-US"],
            ["English (Canada)", "English Canada", "en-CA"],
            ["French (Canada)", "Français (Canada)", "fr-CA"],
            ["Guarani", "Guarani", "gn"],
            ["Haitian Creole", "Kreyòl Ayisyen", "ht"],
            ["Maya (K'iche)", "Maya K'iche'", "quc"],
            ["Maya (Q'eqchi)", "Maya Q'eqchi'", "kek"],
            ["Nahuatl", "Nahuatl", "nah"],
            ["Spanish (Mexican)", "Español (Mexicano)", "es-MX"],
          ]}
        />

        {/* ==== Summary ==== */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Summary by Region
        </h2>
        <SummaryTable
          data={[
            ["Indic", "32", "7"],
            ["European", "58", "0"],
            ["Asian", "28", "7"],
            ["African", "41", "2"],
            ["Middle Eastern", "23", "1"],
            ["South American", "14", "0"],
            ["North American", "11", "0"],
            ["Total", "207", "18"],
          ]}
        />
      </div>
    </div>
  );
}

/* ===== Reusable Tables ===== */
function LanguageTable({ data }: { data: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th className="border px-3 py-2 text-left">Language</th>
            <th className="border px-3 py-2 text-left">Native Name</th>
            <th className="border px-3 py-2 text-left">Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([lang, native, code]) => (
            <tr key={lang}>
              <td className="border px-3 py-2">{lang}</td>
              <td className="border px-3 py-2">{native}</td>
              <td className="border px-3 py-2 font-mono text-red-600">
                {code}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SummaryTable({ data }: { data: string[][] }) {
  return (
    <div className="overflow-x-auto mb-20">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th className="border px-3 py-2 text-left">Region</th>
            <th className="border px-3 py-2 text-left">Available Languages</th>
            <th className="border px-3 py-2 text-left">Coming Soon</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([region, available, coming]) => (
            <tr key={region}>
              <td className="border px-3 py-2">{region}</td>
              <td className="border px-3 py-2">{available}</td>
              <td className="border px-3 py-2">{coming}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
