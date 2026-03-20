# SAML Landing Page

Landing page for SAML (Stuttering Annotation Markup Language) specification.

## Structure

```
landing_page/
├── index.html                  # Main landing page
├── saml-specification.pdf      # Downloadable paper
├── readme.md                   # This file
│
├── guidelines/
│   └── index.html              # Annotator guidelines (5-min overview, tag/don't tag, severity)
│
├── examples/
│   └── index.html              # Example SAML documents and conversions
│
├── training/
│   └── index.html              # Practice exercises with answers
│
├── faq/
│   └── index.html              # Frequently asked questions
│
├── glossary/
│   └── index.html              # Terms and definitions
│
├── tests/
│   └── index.html              # Validation test suite documentation
│
├── integrations/
│   └── index.html              # Audacity & Praat setup guides
│
├── 2026/
│   └── saml/
│       ├── index.html          # Schema documentation (namespace URL)
│       └── saml.xsd            # XML Schema Definition
│
└── tools/
    ├── index.html              # Tools documentation
    └── converter.py            # Shorthand converter (Python)
```

## Pages

### Main Page (`index.html`)

- **Navigation:** Original Shunya Labs menu (unmodified)
- **Hero:** SAML title, subtitle, human-centered description (70M people who stutter)
- **CTAs:** Get Started | View Schema | Read Paper (PDF download)
- **Impact Section:** "Why This Matters" - tells the human story of the haves/have-nots gap in stuttering research, statistics (1% of population, 5x employment discrimination, 80% begin before age 5), emphasizes open source accessibility
- **Features:** "Built by clinicians, for clinicians" - 6-card grid of practical features
- **Example:** "Write naturally, export to standard format" - shorthand to XML demo
- **Tools:** "Simple tools that just work" - links to Converter and Schema
- **Resources:** "Everything you need, nothing behind a paywall" - 9-card grid linking to all SAML sub-pages
- **Quick Start:** "Start contributing today" - 4-step guide

### Guidelines Page (`guidelines/index.html`)

Comprehensive annotator reference:
- **5-Minute Overview** - What is SAML, what do annotators do, core workflow
- **Tag / Don't Tag Table** - Quick decision reference for all scenarios
- **Severity Scale (0-8)** - Duration-based rating with memory aids
- **Repetition Type Guide** - ISR vs SR vs Mixed decision flow
- **Block Classification** - IBC/ABC/IBV/ABV explained
- **Best Practices** - Do's and Don'ts checklist

### Examples Page (`examples/index.html`)

- **Complete Sample Document** - Full SAML XML with all annotation types
- **Shorthand to XML Conversion** - Side-by-side examples for ISR, SR, P, Block
- **Common Errors** - Invalid XML examples with explanations
- **Test Suite Overview** - Links to validation test cases

### Training Page (`training/index.html`)

Practice exercises extracted from the specification:
- **Beginner Exercises** - Single dysfluency types (repetitions, prolongations, blocks)
- **Intermediate Exercises** - Mixed types, ISR vs Mixed decisions, intentional vs involuntary
- **Show/Hide Answers** - Click to reveal solutions with explanations

### FAQ Page (`faq/index.html`)

Extracted from specification Section 15:
- **General Questions** - Dysfluency vs disfluency, SSML knowledge, language support
- **Classification Questions** - How to classify specific patterns
- **Severity Questions** - Boundary values, measurement precision
- **Process Questions** - Shorthand vs XML, overlapping speech, chunking
- **Edge Cases** - Stuttering on fillers, covert stuttering, noisy environments

### Glossary Page (`glossary/index.html`)

- **Alphabetical Terms** - All SAML terminology defined
- **Quick Jump Navigation** - Jump to letter sections
- **Abbreviations Table** - ISR, SR, IBC, ABC, etc.

### Tests Page (`tests/index.html`)

Schema validation documentation:
- **How to Validate** - xmllint, Python, Java, Converter examples
- **Test Categories** - All types and valid values
- **Valid Test Cases** - 11 files listed with descriptions
- **Invalid Test Cases** - 17 files with error descriptions

### Integrations Page (`integrations/index.html`)

Tool configuration guides:
- **Audacity Setup** - Installation, settings, labels, duration measurement
- **Praat Setup** - Installation, TextGrid structure, annotation workflow
- **Recommended Display Settings** - Comparison table for both tools

### Schema Page (`2026/saml/index.html`)

Serves as the namespace URL: `https://shunyalabs.ai/2026/saml`

- Schema version, extends, license info
- Elements reference (Dysfluency, Transcription, Sound)
- Severity scale table (0-8)
- Full XSD preview with syntax highlighting
- Usage example
- Download button for `saml.xsd`

### Tools Page (`tools/index.html`)

- Shorthand Converter download
- CLI quick start examples
- Shorthand syntax reference
- Python library usage examples
- Full CLI options table

## Downloads

| File | Description |
|------|-------------|
| `saml-specification.pdf` | SAML specification paper (76 pages) |
| `2026/saml/saml.xsd` | XML Schema Definition |
| `tools/converter.py` | Shorthand to XML converter |

## Design

**Colors:**
- Background: `#0B0A0F` (dark)
- Primary accent: `#8B52D9` (purple)
- Secondary accent: `#172062` (blue)
- Gold accent: `#d69e2e`
- Success: `#4ade80` (green)
- Error: `#f87171` (red)

**Font:** Inter (Google Fonts)

**Theme:** Matches Shunya Labs website styling with:
- Dark background with blur orbs
- Glass-morphism cards
- Gradient buttons and headers
- Consistent navigation across all pages

## Navigation

**Main page (`index.html`):**
- Original Shunya Labs navigation (Product, Models, Solutions, Resources, Documentation, About Us, Pricing)
- SAML-specific pages are linked via the "Resources" section in the body
- No modifications to the standard Shunya Labs header

**Sub-pages (guidelines, examples, etc.):**
- Simplified navigation with SAML-specific links
- Links to: SAML Home | Guidelines | Examples | Schema | Tools | FAQ
- Get Started CTA

## Deployment

These static HTML files can be served from any web server. The schema should be accessible at `https://shunyalabs.ai/2026/saml` for proper namespace resolution.

## Content Sources

Most content is extracted from the main SAML Specification paper:
- Guidelines: Sections 2, 6, 7, 8
- FAQ: Section 15
- Training: Section 14
- Integrations: Section 16
- Glossary: Section 16/17

## License

Copyright (c) 2026 Shunya Labs  
SPDX-License-Identifier: W3C-20150513
