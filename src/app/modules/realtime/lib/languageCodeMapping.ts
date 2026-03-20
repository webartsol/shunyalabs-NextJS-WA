/**
 * Language code mapping for WebSocket initialization
 * Based on the backend's LANGUAGE_CODE_TO_KEY_MAPPING from main.py
 * This maps UI language codes to the codes expected by the WebSocket service
 */

export const LANGUAGE_CODE_TO_WEBSOCKET_CODE: Record<string, string> = {
  // English variants - all map to 'en'
  en: 'en',
  'en-GB': 'en',
  'en-US': 'en',
  'en-IN': 'en',
  'en-AU': 'en',
  'en-CA': 'en',
  'en-ZA': 'en',
  'en-NZ': 'en',
  'en-IE': 'en',
  'medical-en': 'medical-en', // Special medical English code

  // Bengali variants
  bn: 'bn',
  'bn-IN': 'bn',
  'bn-BD': 'bn',

  // Hindi and Devanagari script languages
  hi: 'hi',
  awa: 'hi', // Awadhi
  bho: 'hi', // Bhojpuri
  brx: 'hi', // Bodo
  hne: 'hi', // Chhattisgarhi
  doi: 'hi', // Dogri
  gon: 'hi', // Gondi
  bgc: 'hi', // Haryanvi
  ks: 'hi', // Kashmiri
  kxv: 'hi', // Khond
  kok: 'hi', // Konkani
  mag: 'hi', // Magahi
  mai: 'hi', // Maithili
  mwr: 'hi', // Marwari
  unr: 'hi', // Mundari
  raj: 'hi', // Rajasthani
  sat: 'hi', // Santali
  bfy: 'hi', // Bagheli

  // Marathi
  mr: 'mr',

  // Nepali
  ne: 'ne',

  // Tamil
  ta: 'ta',

  // Telugu
  te: 'te',

  // Other Indic languages - send as is or map to 'auto'
  as: 'as', // Assamese
  gu: 'gu', // Gujarati
  kn: 'kn', // Kannada
  ml: 'ml', // Malayalam
  or: 'or', // Odia
  pa: 'pa', // Punjabi
  ur: 'ur', // Urdu
  sd: 'sd', // Sindhi
  si: 'si', // Sinhala
  mni: 'mni', // Manipuri
  tcy: 'tcy', // Tulu
  mup: 'mup', // Malvi

  // European languages
  fr: 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
  'fr-BE': 'fr',
  'fr-CH': 'fr',
  'fr-AF': 'fr',

  es: 'es',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  'es-CO': 'es',
  'es-CL': 'es',

  pt: 'pt',
  'pt-BR': 'pt',
  'pt-PT': 'pt',
  'pt-AF': 'pt',

  de: 'de',
  it: 'it',
  ru: 'ru',
  pl: 'pl',
  nl: 'nl',
  sv: 'sv',
  no: 'no',
  da: 'da',
  fi: 'fi',
  hu: 'hu',
  cs: 'cs',
  sk: 'sk',
  sl: 'sl',
  hr: 'hr',
  sr: 'sr',
  bg: 'bg',
  ro: 'ro',
  el: 'el',
  tr: 'tr',
  uk: 'uk',
  be: 'be',
  ca: 'ca',
  eu: 'eu',
  gl: 'gl',
  cy: 'cy',
  ga: 'ga',
  sq: 'sq',
  mk: 'mk',
  is: 'is',
  lt: 'lt',
  lv: 'lv',
  et: 'et',
  mt: 'mt',

  // Asian languages
  zh: 'zh',
  'zh-CN': 'zh',
  'zh-HK': 'zh',
  wuu: 'zh',
  nan: 'zh',
  hak: 'zh',
  gan: 'zh',
  hsn: 'zh',

  ja: 'ja',
  ko: 'ko',
  th: 'th',
  vi: 'vi',
  id: 'id',
  ms: 'ms',
  tl: 'tl',
  my: 'my',
  km: 'km',
  lo: 'lo',
  mn: 'mn',
  bo: 'bo',
  dz: 'dz',

  // Arabic variants
  ar: 'ar',
  'ar-EG': 'ar',
  'ar-AE': 'ar',
  'ar-LB': 'ar',
  'ar-MA': 'ar',
  'ar-SD': 'ar',
  'ar-IQ': 'ar',
  'ar-TD': 'ar',

  // African languages
  sw: 'sw',
  am: 'am',
  ha: 'ha',
  yo: 'yo',
  ig: 'ig',
  zu: 'zu',
  xh: 'xh',
  af: 'af',
  so: 'so',

  // Middle Eastern languages
  he: 'he',
  fa: 'fa',
  ckb: 'ckb',
  kmr: 'kmr',
  ps: 'ps',
  ku: 'ku',
  hy: 'hy',
  ka: 'ka',
  az: 'az',
  kk: 'kk',
  ky: 'ky',
  uz: 'uz',
  tk: 'tk',
  tg: 'tg',
  ug: 'ug',
  ce: 'ce',

  // Americas languages
  qu: 'qu',
  gn: 'gn',
  ht: 'ht',
  jam: 'jam',
  nah: 'nah',
  quc: 'quc',
  kek: 'kek',
  ay: 'ay',

  // Default/auto-detect
  '': 'auto',
  auto: 'auto',
};

/**
 * Get the WebSocket language code for a given UI language code
 * Falls back to the original code if no mapping exists
 */
export function getWebSocketLanguageCode(uiCode: string): string {
  return LANGUAGE_CODE_TO_WEBSOCKET_CODE[uiCode] || uiCode || 'auto';
}
