declare module '*.csv' {
  const value: string;
  export default value;
}

// ✅ Fix DOMPurify import types
declare module 'dompurify' {
  import DOMPurify from 'dompurify';
  export = DOMPurify;
}

// ✅ Fix tailwind-merge typing
declare module 'tailwind-merge' {
  export function twMerge(...classLists: (string | undefined | null | false)[]): string;
}