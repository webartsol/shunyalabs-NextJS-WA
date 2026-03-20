#!/usr/bin/env python3
"""
SAML Shorthand to XML Converter

Converts SAML shorthand notation to full SAML/SSML XML documents.

Features:
- Accept shorthand-annotated text files as input
- Output valid SAML/SSML XML documents
- Validate output against the SAML XSD (optional)
- Support batch processing for corpus annotation
- Available as both CLI tool and importable library

Shorthand Syntax Reference:
- Repetitions: ( [R:isyl N] b- b- ) baby, ( [R:syl N] ba- ba- ) baby
- Prolongations: s( [P N] s- )ee
- Blocks: ( [IBC N] ) word, ( [ABC N] ) word, ( [IBV N] ) word, ( [ABV N] ) word
- Unintelligible: {g: word}, {w: 3}, {u: }
- Non-speech: [laughs], [coughs], [sighs], [other:yawn], etc.
- Background: [bg:traffic], [bg:music soft], [bg:other "description"], [bg:traffic moderate +continuous]
- Letters: ~A, ~B
- Overlap: <overlap>, <overlap SPK02>
- Multi-speaker: [SPK01] Text here.

Copyright (c) 2026 Shunya Labs (https://shunyalabs.ai)
SPDX-License-Identifier: W3C-20150513
"""

import re
import argparse
import sys
import html
from pathlib import Path
from typing import Optional, List, Tuple, Dict, Any, Callable
from dataclasses import dataclass, field
from enum import Enum


# SAML Namespace
SAML_NS = "https://shunyalabs.ai/2026/saml"
SSML_NS = "http://www.w3.org/2001/10/synthesis"

# Severity range (from schema)
MIN_SEVERITY = 0
MAX_SEVERITY = 8


class RepetitionType(Enum):
    """Repetition types as defined in schema."""
    INCOMPLETE_SYLLABLE = "incomplete-syllable"
    SYLLABLE = "syllable"
    MIXED = "mixed"


class BlockType(Enum):
    """Block audibility types as defined in schema."""
    AUDIBLE = "audible"
    INAUDIBLE = "inaudible"


class BlockSound(Enum):
    """Block sound types as defined in schema."""
    CONSONANT = "consonant"
    VOWEL = "vowel"


class Position(Enum):
    """Prolongation position types as defined in schema."""
    INITIAL = "initial"
    MEDIAL = "medial"
    FINAL = "final"


class UnintelligibleType(Enum):
    """Unintelligible types as defined in schema."""
    GUESS = "guess"
    COUNT = "count"
    UNKNOWN = "unknown"


class NonSpeechType(Enum):
    """Non-speech sound types as defined in schema."""
    LAUGH = "laugh"
    COUGH = "cough"
    SIGH = "sigh"
    CRY = "cry"
    CLEAR_THROAT = "clear-throat"
    SNIFF = "sniff"
    INHALE = "inhale"
    EXHALE = "exhale"
    OTHER = "other"


# Non-speech sound type mappings (shorthand -> schema type)
NONSPEECH_TYPES: Dict[str, str] = {
    "laughs": NonSpeechType.LAUGH.value,
    "laugh": NonSpeechType.LAUGH.value,
    "coughs": NonSpeechType.COUGH.value,
    "cough": NonSpeechType.COUGH.value,
    "sighs": NonSpeechType.SIGH.value,
    "sigh": NonSpeechType.SIGH.value,
    "cries": NonSpeechType.CRY.value,
    "cry": NonSpeechType.CRY.value,
    "clears-throat": NonSpeechType.CLEAR_THROAT.value,
    "clear-throat": NonSpeechType.CLEAR_THROAT.value,
    "clears throat": NonSpeechType.CLEAR_THROAT.value,
    "sniffs": NonSpeechType.SNIFF.value,
    "sniff": NonSpeechType.SNIFF.value,
    "inhales": NonSpeechType.INHALE.value,
    "inhale": NonSpeechType.INHALE.value,
    "exhales": NonSpeechType.EXHALE.value,
    "exhale": NonSpeechType.EXHALE.value,
}

# Background sound types (must match schema)
BACKGROUND_TYPES = {
    "traffic", "siren", "horn", "aircraft", "train",
    "wind", "rain", "thunder", "birds", "animals", "water",
    "crowd", "conversation", "children", "footsteps",
    "hvac", "appliance", "tv", "music", "phone", "door",
    "static", "hum", "echo", "mic-noise", "other"
}

# Background level types
BACKGROUND_LEVELS = {"soft", "moderate", "loud", "overwhelming"}

# Task types for metadata (from schema)
TASK_TYPES = {"reading", "monologue", "conversation", "phone", "presentation", "spontaneous", "other"}

# Age group types for speaker metadata (from schema)
AGE_GROUPS = {"child", "adolescent", "adult"}

# Severity classifications for speaker (from schema)
SPEAKER_SEVERITY_TYPES = {"mild", "moderate", "severe", "very-severe", "unassessed"}

# Gender types for speaker (from schema)
GENDER_TYPES = {"male", "female", "other", "unspecified"}


@dataclass
class ConversionResult:
    """Result of converting shorthand to XML."""
    success: bool
    xml: str
    warnings: List[str] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)
    statistics: Dict[str, int] = field(default_factory=dict)


@dataclass
class SpeakerMetadata:
    """Speaker metadata attributes."""
    id: str = "SPK01"
    age_group: Optional[str] = None
    severity: Optional[str] = None
    gender: Optional[str] = None


@dataclass
class FileMetadata:
    """File metadata attributes."""
    id: str = "document"
    duration: Optional[int] = None
    task: Optional[str] = None


class ShorthandConverter:
    """
    Converts SAML shorthand notation to full XML.
    
    Usage as library:
        converter = ShorthandConverter()
        result = converter.convert("I ( [R:isyl 1] w- w- ) was going.")
        print(result.xml)
    """
    
    def __init__(self, 
                 file_id: str = "document",
                 speaker_id: str = "SPK01",
                 language: str = "en-US",
                 validate: bool = False,
                 schema_path: Optional[str] = None,
                 file_duration: Optional[int] = None,
                 task: Optional[str] = None,
                 speaker_age: Optional[str] = None,
                 speaker_severity: Optional[str] = None,
                 speaker_gender: Optional[str] = None,
                 strict: bool = False):
        """
        Initialize the converter.
        
        Args:
            file_id: File identifier for metadata
            speaker_id: Speaker identifier for metadata
            language: Language code for xml:lang attribute
            validate: Whether to validate output against XSD
            schema_path: Path to SAML XSD file (required if validate=True)
            file_duration: Recording duration in milliseconds
            task: Task type (reading, monologue, conversation, etc.)
            speaker_age: Speaker age group (child, adolescent, adult)
            speaker_severity: Speaker severity level (mild, moderate, severe, very-severe, unassessed)
            speaker_gender: Speaker gender (male, female, other, unspecified)
            strict: If True, reject legacy syntax; if False, accept with warnings
        """
        self.file_metadata = FileMetadata(id=file_id, duration=file_duration, task=task)
        self.speaker_metadata = SpeakerMetadata(
            id=speaker_id, 
            age_group=speaker_age,
            severity=speaker_severity,
            gender=speaker_gender
        )
        self.language = language
        self.validate = validate
        self.schema_path = schema_path
        self.strict = strict
        self.warnings: List[str] = []
        self.errors: List[str] = []
        self.statistics: Dict[str, int] = {}
        
        # Validate metadata options
        self._validate_metadata_options()
        
        # Compile regex patterns
        self._compile_patterns()
    
    def _validate_metadata_options(self) -> None:
        """Validate metadata option values against schema constraints."""
        if self.file_metadata.task and self.file_metadata.task not in TASK_TYPES:
            self.warnings.append(
                f"Invalid task type: '{self.file_metadata.task}'. "
                f"Valid values: {', '.join(sorted(TASK_TYPES))}"
            )
        
        if self.speaker_metadata.age_group and self.speaker_metadata.age_group not in AGE_GROUPS:
            self.warnings.append(
                f"Invalid age group: '{self.speaker_metadata.age_group}'. "
                f"Valid values: {', '.join(sorted(AGE_GROUPS))}"
            )
        
        if self.speaker_metadata.severity and self.speaker_metadata.severity not in SPEAKER_SEVERITY_TYPES:
            self.warnings.append(
                f"Invalid speaker severity: '{self.speaker_metadata.severity}'. "
                f"Valid values: {', '.join(sorted(SPEAKER_SEVERITY_TYPES))}"
            )
        
        if self.speaker_metadata.gender and self.speaker_metadata.gender not in GENDER_TYPES:
            self.warnings.append(
                f"Invalid gender: '{self.speaker_metadata.gender}'. "
                f"Valid values: {', '.join(sorted(GENDER_TYPES))}"
            )
    
    def _compile_patterns(self) -> None:
        """Compile regex patterns for parsing shorthand."""
        
        # Repetition with type: ( [R:type N] units ) word
        self.rep_pattern = re.compile(
            r'\(\s*\[R:(\w+)\s+(\d+)\]\s*([^)]+)\s*\)\s*(\S+)?'
        )
        
        # Repetition without type (legacy): ( [R N] units ) word
        # This is flagged for review per spec
        self.rep_no_type_pattern = re.compile(
            r'\(\s*\[R\s+(\d+)\]\s*([^)]+)\s*\)\s*(\S+)?'
        )
        
        # Prolongation: prefix( [P N] sound- )rest
        # e.g., s( [P 2] s- )ee or ( [P 2] s- )ee
        self.pro_pattern = re.compile(
            r'(\S*?)\(\s*\[P\s+(\d+)\]\s*([^)]+)\s*\)(\S*)'
        )
        
        # Block patterns: ( [IBC/ABC/IBV/ABV/B N] ) word
        self.block_pattern = re.compile(
            r'\(\s*\[(IBC|ABC|IBV|ABV|B)\s+(\d+)\]\s*\)\s*(\S+)'
        )
        
        # Unintelligible guess: {g: word}
        self.unintel_guess_pattern = re.compile(r'\{g:\s*(\S+)\}')
        
        # Unintelligible count: {w: N} (N must be positive)
        self.unintel_count_pattern = re.compile(r'\{w:\s*(\d+)\}')
        
        # Unintelligible unknown: {u: } or {u:}
        self.unintel_unknown_pattern = re.compile(r'\{u:\s*\}')
        
        # Non-speech standard types: [laughs], [coughs], etc.
        nonspeech_names = '|'.join(re.escape(k) for k in NONSPEECH_TYPES.keys())
        self.nonspeech_pattern = re.compile(
            rf'\[({nonspeech_names})\]',
            re.IGNORECASE
        )
        
        # Non-speech "other" type: [other:description] or [ns:description]
        self.nonspeech_other_pattern = re.compile(
            r'\[(?:other|ns):([^\]]+)\]',
            re.IGNORECASE
        )
        
        # Background: [bg:type] or [bg:type level] or [bg:type level "description"]
        # or [bg:type +continuous] or [bg:type level +continuous "description"]
        # Note: [\w-]+ allows hyphenated types like "mic-noise"
        self.background_pattern = re.compile(
            r'\[bg:([\w-]+)(?:\s+([\w+]+))?(?:\s+(\+continuous))?(?:\s+"([^"]+)")?\]',
            re.IGNORECASE
        )
        
        # Letter: ~X
        self.letter_pattern = re.compile(r'~([A-Za-z])')
        
        # Overlap: <overlap> or <overlap speaker>
        self.overlap_pattern = re.compile(r'<overlap(?:\s+(\S+))?>')
        
        # Multi-speaker prefix: [SPK01] at start of line
        # Pattern requires either:
        # - Uppercase letters in the ID (like SPK01, SPEAKER1)  
        # - Or underscore in the ID (like speaker_1)
        # This avoids matching non-speech sounds like [laughs] which are all lowercase
        self.speaker_pattern = re.compile(
            r'^\[([A-Z][A-Za-z0-9_]*|[A-Za-z0-9]*_[A-Za-z0-9_]*)\]\s*(.*)$', 
            re.MULTILINE
        )
    
    def _validate_severity(self, severity_str: str, context: str) -> int:
        """
        Validate and clamp severity value to schema-defined range (0-8).
        
        Args:
            severity_str: The severity value as a string
            context: Context for warning messages (e.g., "repetition", "block")
            
        Returns:
            Valid severity integer (clamped to 0-8 range)
        """
        try:
            severity = int(severity_str)
        except ValueError:
            self.warnings.append(f"Invalid severity '{severity_str}' in {context}, using 0")
            return MIN_SEVERITY
        
        if severity < MIN_SEVERITY or severity > MAX_SEVERITY:
            self.warnings.append(
                f"Severity {severity} in {context} out of range {MIN_SEVERITY}-{MAX_SEVERITY}, "
                f"clamping to {max(MIN_SEVERITY, min(MAX_SEVERITY, severity))}"
            )
            return max(MIN_SEVERITY, min(MAX_SEVERITY, severity))
        
        return severity
    
    def _escape_xml(self, text: str) -> str:
        """
        Escape XML special characters in text.
        
        Args:
            text: Text that may contain XML special characters
            
        Returns:
            Text with &, <, >, ", ' properly escaped
        """
        return html.escape(text, quote=True)
    
    def _increment_stat(self, stat_name: str) -> None:
        """Increment a statistics counter."""
        self.statistics[stat_name] = self.statistics.get(stat_name, 0) + 1
    
    def convert(self, shorthand_text: str, 
                include_metadata: bool = True,
                wrap_in_ssml: bool = True) -> ConversionResult:
        """
        Convert shorthand notation to SAML XML.
        
        Args:
            shorthand_text: Text with shorthand annotations
            include_metadata: Whether to include metadata element
            wrap_in_ssml: Whether to wrap in SSML speak element
            
        Returns:
            ConversionResult with XML string and any warnings/errors
        """
        # Preserve warnings from initialization (e.g., metadata validation)
        init_warnings = self.warnings.copy()
        self.warnings = init_warnings
        self.errors = []
        self.statistics = {}
        
        # Check for empty input
        if not shorthand_text or not shorthand_text.strip():
            self.warnings.append("Input is empty or contains only whitespace")
        
        try:
            # Process the text
            xml_content, speaker_paragraphs = self._process_text(shorthand_text)
            
            # Build the full document
            if wrap_in_ssml:
                xml_doc = self._build_document(xml_content, include_metadata, speaker_paragraphs)
            else:
                xml_doc = xml_content
            
            # Validate if requested
            if self.validate and self.schema_path:
                validation_errors = self._validate_xml(xml_doc)
                self.errors.extend(validation_errors)
            
            return ConversionResult(
                success=len(self.errors) == 0,
                xml=xml_doc,
                warnings=self.warnings,
                errors=self.errors,
                statistics=self.statistics
            )
            
        except ValueError as e:
            self.errors.append(f"Value error: {str(e)}")
            return ConversionResult(
                success=False,
                xml="",
                warnings=self.warnings,
                errors=self.errors,
                statistics=self.statistics
            )
        except re.error as e:
            self.errors.append(f"Regex error: {str(e)}")
            return ConversionResult(
                success=False,
                xml="",
                warnings=self.warnings,
                errors=self.errors,
                statistics=self.statistics
            )
        except Exception as e:
            self.errors.append(f"Conversion failed: {str(e)}")
            return ConversionResult(
                success=False,
                xml="",
                warnings=self.warnings,
                errors=self.errors,
                statistics=self.statistics
            )
    
    def _process_text(self, text: str) -> Tuple[str, List[Tuple[str, str]]]:
        """
        Process shorthand text and convert to XML elements.
        
        Returns:
            Tuple of (processed_text, speaker_paragraphs)
            where speaker_paragraphs is a list of (speaker_id, content) tuples
        """
        # First, check for multi-speaker format
        speaker_paragraphs = self._extract_speaker_paragraphs(text)
        
        if speaker_paragraphs:
            # Process each speaker's content separately
            processed_paragraphs = []
            for speaker_id, content in speaker_paragraphs:
                processed_content = self._process_content(content)
                processed_paragraphs.append((speaker_id, processed_content))
            return "", processed_paragraphs
        else:
            # Single speaker mode - process all content
            result = self._process_content(text)
            return result, []
    
    def _extract_speaker_paragraphs(self, text: str) -> List[Tuple[str, str]]:
        """
        Extract speaker-prefixed paragraphs from text.
        
        Format: [SPK01] Hello, how are you?
        
        Returns:
            List of (speaker_id, content) tuples, or empty list if no speaker prefixes found
        """
        paragraphs = []
        
        for match in self.speaker_pattern.finditer(text):
            speaker_id = match.group(1)
            content = match.group(2).strip()
            if content:  # Only add non-empty paragraphs
                paragraphs.append((speaker_id, content))
        
        return paragraphs
    
    def _process_content(self, text: str) -> str:
        """Process shorthand content and convert to XML elements."""
        result = text
        
        # Process each pattern type in order
        # IMPORTANT: Order matters!
        # - Blocks must be processed FIRST because their pattern captures the "following word"
        #   and we don't want it to accidentally capture XML generated by other conversions.
        # - Prolongations and repetitions should be processed before other elements
        # - Non-speech "other" should be processed before standard non-speech to avoid conflicts
        result = self._convert_blocks(result)
        result = self._convert_repetitions(result)
        result = self._convert_repetitions_no_type(result)
        result = self._convert_prolongations(result)
        result = self._convert_unintelligible(result)
        result = self._convert_nonspeech_other(result)  # Process "other" type first
        result = self._convert_nonspeech(result)
        result = self._convert_background(result)
        result = self._convert_letters(result)
        result = self._convert_overlap(result)
        
        # Escape remaining plain text (text not inside XML tags)
        result = self._escape_text_content(result)
        
        return result
    
    def _escape_text_content(self, text: str) -> str:
        """
        Escape XML special characters in text content, preserving existing XML tags.
        
        This method finds text segments that are NOT inside XML tags and escapes
        special characters (&, <, >) in those segments only.
        """
        # Pattern to match XML tags (including self-closing)
        tag_pattern = re.compile(r'<[^>]+>')
        
        result = []
        last_end = 0
        
        for match in tag_pattern.finditer(text):
            # Text before this tag needs escaping
            if match.start() > last_end:
                plain_text = text[last_end:match.start()]
                result.append(self._escape_xml(plain_text))
            
            # The tag itself should not be escaped
            result.append(match.group())
            last_end = match.end()
        
        # Text after the last tag (or all text if no tags)
        if last_end < len(text):
            plain_text = text[last_end:]
            result.append(self._escape_xml(plain_text))
        
        return ''.join(result)
    
    def _convert_repetitions(self, text: str) -> str:
        """Convert repetition shorthand to XML."""
        
        def replace_rep(match: re.Match) -> str:
            rep_type = match.group(1)  # isyl, syl, mix
            severity_str = match.group(2)
            units_str = match.group(3).strip()
            following_word = match.group(4) or ""
            
            # Validate severity
            severity = self._validate_severity(severity_str, f"repetition [{rep_type}]")
            
            # Map type marker to full type name
            type_map = {
                "isyl": RepetitionType.INCOMPLETE_SYLLABLE.value,
                "syl": RepetitionType.SYLLABLE.value,
                "mix": RepetitionType.MIXED.value,
                # Legacy support (with warnings)
                "snd": RepetitionType.INCOMPLETE_SYLLABLE.value,
                "wrd": RepetitionType.SYLLABLE.value,
            }
            
            if rep_type.lower() not in type_map:
                self.warnings.append(f"Unknown repetition type: {rep_type}")
                full_type = RepetitionType.INCOMPLETE_SYLLABLE.value
            else:
                full_type = type_map[rep_type.lower()]
                if rep_type.lower() in ("snd", "wrd"):
                    if self.strict:
                        self.errors.append(
                            f"Legacy marker '{rep_type}' not allowed in strict mode. "
                            f"Use ':isyl', ':syl', or ':mix'"
                        )
                    else:
                        self.warnings.append(
                            f"Legacy marker '{rep_type}' used. "
                            f"Consider using ':isyl', ':syl', or ':mix'"
                        )
            
            # Parse units (separated by hyphens or spaces)
            units = [u.strip().rstrip('-') for u in re.split(r'[-\s]+', units_str) if u.strip()]
            
            if len(units) < 2:
                self.warnings.append(
                    f"Repetition should have at least 2 units, found {len(units)}"
                )
                # Duplicate to meet minimum
                while len(units) < 2:
                    units.append(units[0] if units else "x")
            
            # Build XML - keep on single line to avoid paragraph splitting
            # Units need escaping since they go inside XML elements
            unit_elements = "".join(
                f'<saml:unit>{self._escape_xml(u)}</saml:unit>' for u in units
            )
            
            # Don't escape following word here - it will be escaped at the end
            # by _escape_text_content()
            xml = (
                f'<saml:repetition type="{full_type}" severity="{severity}" '
                f'count="{len(units)}">{unit_elements}'
                f'</saml:repetition>{following_word}'
            )
            
            # Update statistics
            self._increment_stat("repetitions")
            self._increment_stat(f"repetitions_{full_type.replace('-', '_')}")
            
            return xml
        
        return self.rep_pattern.sub(replace_rep, text)
    
    def _convert_repetitions_no_type(self, text: str) -> str:
        """
        Convert legacy repetition shorthand without type marker.
        
        Per spec Gap #9: [R N] without type marker should be flagged for review.
        """
        
        def replace_rep_no_type(match: re.Match) -> str:
            severity_str = match.group(1)
            units_str = match.group(2).strip()
            following_word = match.group(3) or ""
            
            # Validate severity
            severity = self._validate_severity(severity_str, "repetition [R] (no type)")
            
            # Flag for review
            self.warnings.append(
                f"Generic repetition [R {severity_str}] used without type marker. "
                f"Please review and specify type (:isyl, :syl, or :mix)"
            )
            
            # Default to incomplete-syllable
            full_type = RepetitionType.INCOMPLETE_SYLLABLE.value
            
            # Parse units
            units = [u.strip().rstrip('-') for u in re.split(r'[-\s]+', units_str) if u.strip()]
            
            if len(units) < 2:
                while len(units) < 2:
                    units.append(units[0] if units else "x")
            
            # Units need escaping since they go inside XML elements
            unit_elements = "".join(
                f'<saml:unit>{self._escape_xml(u)}</saml:unit>' for u in units
            )
            
            # Don't escape following word here - it will be escaped at the end
            xml = (
                f'<saml:repetition type="{full_type}" severity="{severity}" '
                f'count="{len(units)}">{unit_elements}'
                f'</saml:repetition>{following_word}'
            )
            
            self._increment_stat("repetitions")
            self._increment_stat("repetitions_flagged_for_review")
            
            return xml
        
        return self.rep_no_type_pattern.sub(replace_rep_no_type, text)
    
    def _convert_prolongations(self, text: str) -> str:
        """Convert prolongation shorthand to XML."""
        
        def replace_pro(match: re.Match) -> str:
            prefix = match.group(1) or ""
            severity_str = match.group(2)
            sound_str = match.group(3).strip().rstrip('-')
            suffix = match.group(4) or ""
            
            # Validate severity
            severity = self._validate_severity(severity_str, "prolongation")
            
            # The sound is the prolonged grapheme
            sound = sound_str[0] if sound_str else "x"
            
            # Determine position based on prefix/suffix
            # prefix = characters before the (
            # suffix = characters after the )
            if prefix and suffix:
                position = Position.MEDIAL.value
            elif prefix:
                position = Position.FINAL.value
            else:
                position = Position.INITIAL.value
            
            # Per Spec Gap #3: Full word should be element content
            # Reconstruct the full word from prefix + sound_str + suffix
            full_word = prefix + sound_str + suffix
            
            # Escape for XML safety
            escaped_sound = self._escape_xml(sound)
            escaped_full_word = self._escape_xml(full_word)
            
            xml = (
                f'<saml:prolongation sound="{escaped_sound}" severity="{severity}" '
                f'position="{position}">{escaped_full_word}</saml:prolongation>'
            )
            
            self._increment_stat("prolongations")
            
            return xml
        
        return self.pro_pattern.sub(replace_pro, text)
    
    def _convert_blocks(self, text: str) -> str:
        """Convert block shorthand to XML."""
        
        def replace_block(match: re.Match) -> str:
            block_type = match.group(1).upper()
            severity_str = match.group(2)
            following_word = match.group(3)
            
            # Validate severity
            severity = self._validate_severity(severity_str, f"block [{block_type}]")
            
            # Map block codes to attributes
            type_map = {
                "IBC": (BlockType.INAUDIBLE.value, BlockSound.CONSONANT.value),
                "ABC": (BlockType.AUDIBLE.value, BlockSound.CONSONANT.value),
                "IBV": (BlockType.INAUDIBLE.value, BlockSound.VOWEL.value),
                "ABV": (BlockType.AUDIBLE.value, BlockSound.VOWEL.value),
                "B": (None, None),  # Generic - needs inference
            }
            
            audibility, sound_type = type_map.get(block_type, (None, None))
            
            if block_type == "B":
                # Try to infer from following word
                first_char = following_word[0].lower() if following_word else ""
                if first_char in "aeiou":
                    sound_type = BlockSound.VOWEL.value
                else:
                    sound_type = BlockSound.CONSONANT.value
                audibility = BlockType.INAUDIBLE.value  # Default assumption
                self.warnings.append(
                    f"Generic block [B] used. Inferred type='{audibility}' "
                    f"sound='{sound_type}'. Consider using specific block types."
                )
            
            # Don't escape following word here - it will be escaped at the end
            # by _escape_text_content()
            xml = (
                f'<saml:block type="{audibility}" sound="{sound_type}" '
                f'severity="{severity}"/>{following_word}'
            )
            
            self._increment_stat("blocks")
            self._increment_stat(f"blocks_{audibility}_{sound_type}")
            
            return xml
        
        return self.block_pattern.sub(replace_block, text)
    
    def _convert_unintelligible(self, text: str) -> str:
        """Convert unintelligible shorthand to XML."""
        
        # Guess type
        def replace_guess(match: re.Match) -> str:
            value = match.group(1)
            escaped_value = self._escape_xml(value)
            self._increment_stat("unintelligible")
            self._increment_stat("unintelligible_guess")
            return f'<saml:unintelligible type="{UnintelligibleType.GUESS.value}" value="{escaped_value}"/>'
        
        text = self.unintel_guess_pattern.sub(replace_guess, text)
        
        # Count type - validate wordCount > 0 (Schema Gap #7)
        def replace_count(match: re.Match) -> str:
            count = int(match.group(1))
            if count < 1:
                self.warnings.append(
                    f"Unintelligible word count must be positive (>= 1), got {count}. Using 1."
                )
                count = 1
            self._increment_stat("unintelligible")
            self._increment_stat("unintelligible_count")
            return f'<saml:unintelligible type="{UnintelligibleType.COUNT.value}" wordCount="{count}"/>'
        
        text = self.unintel_count_pattern.sub(replace_count, text)
        
        # Unknown type
        def replace_unknown(match: re.Match) -> str:
            self._increment_stat("unintelligible")
            self._increment_stat("unintelligible_unknown")
            return f'<saml:unintelligible type="{UnintelligibleType.UNKNOWN.value}"/>'
        
        text = self.unintel_unknown_pattern.sub(replace_unknown, text)
        
        return text
    
    def _convert_nonspeech_other(self, text: str) -> str:
        """
        Convert non-speech 'other' shorthand to XML.
        
        Handles: [other:yawn], [ns:sniffle], etc.
        Output: <saml:nonspeech type="other" description="yawn"/>
        """
        
        def replace_nonspeech_other(match: re.Match) -> str:
            description = match.group(1).strip()
            escaped_description = self._escape_xml(description)
            self._increment_stat("nonspeech")
            self._increment_stat("nonspeech_other")
            return f'<saml:nonspeech type="{NonSpeechType.OTHER.value}" description="{escaped_description}"/>'
        
        return self.nonspeech_other_pattern.sub(replace_nonspeech_other, text)
    
    def _convert_nonspeech(self, text: str) -> str:
        """Convert non-speech shorthand to XML."""
        
        def replace_nonspeech(match: re.Match) -> str:
            sound_name = match.group(1).lower()
            sound_type = NONSPEECH_TYPES.get(sound_name, NonSpeechType.OTHER.value)
            
            if sound_name not in NONSPEECH_TYPES:
                self.warnings.append(
                    f"Unknown non-speech sound: [{sound_name}]. Using type='other'"
                )
                escaped_name = self._escape_xml(sound_name)
                self._increment_stat("nonspeech")
                self._increment_stat("nonspeech_other")
                return f'<saml:nonspeech type="{NonSpeechType.OTHER.value}" description="{escaped_name}"/>'
            
            self._increment_stat("nonspeech")
            self._increment_stat(f"nonspeech_{sound_type.replace('-', '_')}")
            return f'<saml:nonspeech type="{sound_type}"/>'
        
        return self.nonspeech_pattern.sub(replace_nonspeech, text)
    
    def _convert_background(self, text: str) -> str:
        """
        Convert background shorthand to XML.
        
        Supports:
        - [bg:type]
        - [bg:type level]
        - [bg:type +continuous]
        - [bg:type level +continuous]
        - [bg:type "description"]
        - [bg:type level "description"]
        - [bg:type level +continuous "description"]
        """
        
        def replace_background(match: re.Match) -> str:
            bg_type = match.group(1).lower()
            level_or_flag = match.group(2)  # Could be level or None
            continuous_flag = match.group(3)  # +continuous or None
            description = match.group(4)  # Quoted description or None
            
            # Determine level (could be in group 2)
            level = None
            if level_or_flag:
                level_or_flag_lower = level_or_flag.lower()
                if level_or_flag_lower in BACKGROUND_LEVELS:
                    level = level_or_flag_lower
                elif level_or_flag_lower == "+continuous":
                    continuous_flag = level_or_flag
                    level = None
            
            if bg_type not in BACKGROUND_TYPES:
                self.warnings.append(
                    f"Unknown background type: {bg_type}. Using type='other'"
                )
                bg_type = "other"
            
            if level and level not in BACKGROUND_LEVELS:
                self.warnings.append(
                    f"Invalid background level: {level}. Ignoring."
                )
                level = None
            
            # Build attributes
            attrs = [f'type="{bg_type}"']
            
            if level:
                attrs.append(f'level="{level}"')
            
            if continuous_flag:
                attrs.append('continuous="true"')
            
            if description:
                escaped_description = self._escape_xml(description)
                attrs.append(f'description="{escaped_description}"')
            
            self._increment_stat("background")
            
            return f'<saml:background {" ".join(attrs)}/>'
        
        return self.background_pattern.sub(replace_background, text)
    
    def _convert_letters(self, text: str) -> str:
        """Convert letter shorthand to XML."""
        
        def replace_letter(match: re.Match) -> str:
            letter = match.group(1).upper()
            self._increment_stat("letters")
            return f'<saml:letter>{letter}</saml:letter>'
        
        return self.letter_pattern.sub(replace_letter, text)
    
    def _convert_overlap(self, text: str) -> str:
        """Convert overlap shorthand to XML."""
        
        def replace_overlap(match: re.Match) -> str:
            speaker = match.group(1)
            self._increment_stat("overlaps")
            if speaker:
                escaped_speaker = self._escape_xml(speaker)
                return f'<saml:overlap speaker="{escaped_speaker}"/>'
            else:
                return '<saml:overlap/>'
        
        return self.overlap_pattern.sub(replace_overlap, text)
    
    def _build_metadata_xml(self) -> str:
        """Build the metadata XML section."""
        # Build file element attributes
        file_attrs = [f'id="{self._escape_xml(self.file_metadata.id)}"']
        if self.file_metadata.duration is not None:
            file_attrs.append(f'duration="{self.file_metadata.duration}"')
        if self.file_metadata.task:
            file_attrs.append(f'task="{self._escape_xml(self.file_metadata.task)}"')
        
        # Build speaker element attributes
        speaker_attrs = [f'id="{self._escape_xml(self.speaker_metadata.id)}"']
        if self.speaker_metadata.age_group:
            speaker_attrs.append(f'age-group="{self._escape_xml(self.speaker_metadata.age_group)}"')
        if self.speaker_metadata.severity:
            speaker_attrs.append(f'severity="{self._escape_xml(self.speaker_metadata.severity)}"')
        if self.speaker_metadata.gender:
            speaker_attrs.append(f'gender="{self._escape_xml(self.speaker_metadata.gender)}"')
        
        return f'''
    <saml:metadata>
        <saml:file {' '.join(file_attrs)}/>
        <saml:speaker {' '.join(speaker_attrs)}/>
    </saml:metadata>
'''
    
    def _build_document(self, content: str, include_metadata: bool, 
                        speaker_paragraphs: List[Tuple[str, str]]) -> str:
        """Build the full SSML document."""
        
        metadata = ""
        if include_metadata:
            metadata = self._build_metadata_xml()
        
        # Build paragraphs
        if speaker_paragraphs:
            # Multi-speaker format
            paragraphs = []
            for speaker_id, para_content in speaker_paragraphs:
                escaped_speaker = self._escape_xml(speaker_id)
                if para_content and not para_content.startswith('#'):
                    paragraphs.append(f'    <p id="{escaped_speaker}">{para_content}</p>')
            content_block = '\n'.join(paragraphs)
        else:
            # Single speaker format - wrap each non-empty line in <p>
            lines = content.strip().split('\n')
            paragraphs = []
            for line in lines:
                line = line.strip()
                if line and not line.startswith('#'):  # Skip comments
                    paragraphs.append(f'    <p>{line}</p>')
            content_block = '\n'.join(paragraphs)
        
        doc = f'''<?xml version="1.0" encoding="UTF-8"?>
<speak xmlns="http://www.w3.org/2001/10/synthesis"
       xmlns:saml="https://shunyalabs.ai/2026/saml"
       version="1.1"
       xml:lang="{self.language}">{metadata}
{content_block}

</speak>'''
        
        return doc
    
    def _validate_xml(self, xml_str: str) -> List[str]:
        """Validate XML against SAML schema."""
        errors = []
        
        try:
            from lxml import etree
            
            schema_doc = etree.parse(self.schema_path)
            schema = etree.XMLSchema(schema_doc)
            
            doc = etree.fromstring(xml_str.encode())
            
            if not schema.validate(doc):
                for error in schema.error_log:
                    errors.append(f"Line {error.line}: {error.message}")
                    
        except ImportError:
            self.warnings.append(
                "lxml not installed. Skipping schema validation. "
                "Install with: pip install lxml"
            )
        except FileNotFoundError:
            errors.append(f"Schema file not found: {self.schema_path}")
        except Exception as e:
            errors.append(f"Validation error: {str(e)}")
        
        return errors
    
    def get_statistics_report(self) -> str:
        """Generate a human-readable statistics report."""
        if not self.statistics:
            return "No dysfluencies found."
        
        lines = ["Dysfluency Summary:"]
        
        # Repetitions
        rep_total = self.statistics.get("repetitions", 0)
        if rep_total > 0:
            rep_isyl = self.statistics.get("repetitions_incomplete_syllable", 0)
            rep_syl = self.statistics.get("repetitions_syllable", 0)
            rep_mix = self.statistics.get("repetitions_mixed", 0)
            rep_flagged = self.statistics.get("repetitions_flagged_for_review", 0)
            lines.append(f"- Repetitions: {rep_total} (ISR: {rep_isyl}, SR: {rep_syl}, Mixed: {rep_mix})")
            if rep_flagged:
                lines.append(f"  (Flagged for review: {rep_flagged})")
        
        # Prolongations
        pro_total = self.statistics.get("prolongations", 0)
        if pro_total > 0:
            lines.append(f"- Prolongations: {pro_total}")
        
        # Blocks
        block_total = self.statistics.get("blocks", 0)
        if block_total > 0:
            lines.append(f"- Blocks: {block_total}")
        
        # Unintelligible
        unintel_total = self.statistics.get("unintelligible", 0)
        if unintel_total > 0:
            unintel_guess = self.statistics.get("unintelligible_guess", 0)
            unintel_count = self.statistics.get("unintelligible_count", 0)
            unintel_unknown = self.statistics.get("unintelligible_unknown", 0)
            lines.append(f"- Unintelligible: {unintel_total} (guess: {unintel_guess}, count: {unintel_count}, unknown: {unintel_unknown})")
        
        # Non-speech
        nonspeech_total = self.statistics.get("nonspeech", 0)
        if nonspeech_total > 0:
            lines.append(f"- Non-speech sounds: {nonspeech_total}")
        
        # Background
        bg_total = self.statistics.get("background", 0)
        if bg_total > 0:
            lines.append(f"- Background sounds: {bg_total}")
        
        # Letters
        letter_total = self.statistics.get("letters", 0)
        if letter_total > 0:
            lines.append(f"- Letter spellings: {letter_total}")
        
        # Overlaps
        overlap_total = self.statistics.get("overlaps", 0)
        if overlap_total > 0:
            lines.append(f"- Overlaps: {overlap_total}")
        
        return '\n'.join(lines)


def convert_file(input_path: str, 
                 output_path: Optional[str] = None,
                 **kwargs) -> ConversionResult:
    """
    Convert a shorthand file to XML.
    
    Args:
        input_path: Path to input file with shorthand notation
        output_path: Path for output XML file (optional)
        **kwargs: Arguments passed to ShorthandConverter
        
    Returns:
        ConversionResult
    """
    input_path = Path(input_path)
    
    if not input_path.exists():
        return ConversionResult(
            success=False,
            xml="",
            warnings=[],
            errors=[f"Input file not found: {input_path}"]
        )
    
    # Read input with encoding detection fallback
    try:
        shorthand_text = input_path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        try:
            shorthand_text = input_path.read_text(encoding='latin-1')
        except Exception as e:
            return ConversionResult(
                success=False,
                xml="",
                warnings=[],
                errors=[f"Failed to read file with utf-8 or latin-1 encoding: {str(e)}"]
            )
    
    # Set file_id from filename if not provided
    if 'file_id' not in kwargs:
        kwargs['file_id'] = input_path.stem
    
    # Convert
    converter = ShorthandConverter(**kwargs)
    result = converter.convert(shorthand_text)
    
    # Write output if successful and path provided
    if result.success and output_path:
        try:
            output_path = Path(output_path)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(result.xml, encoding='utf-8')
        except PermissionError:
            result.errors.append(f"Permission denied writing to: {output_path}")
            result = ConversionResult(
                success=False,
                xml=result.xml,
                warnings=result.warnings,
                errors=result.errors,
                statistics=result.statistics
            )
        except Exception as e:
            result.errors.append(f"Failed to write output: {str(e)}")
            result = ConversionResult(
                success=False,
                xml=result.xml,
                warnings=result.warnings,
                errors=result.errors,
                statistics=result.statistics
            )
    
    return result


def batch_convert(input_dir: str,
                  output_dir: str,
                  pattern: str = "*.txt",
                  progress_callback: Optional[Callable[[int, int, str], None]] = None,
                  **kwargs) -> List[Tuple[str, ConversionResult]]:
    """
    Batch convert shorthand files to XML.
    
    Args:
        input_dir: Directory containing input files
        output_dir: Directory for output XML files
        pattern: Glob pattern for input files
        progress_callback: Optional callback(current, total, filename) for progress reporting
        **kwargs: Arguments passed to ShorthandConverter
        
    Returns:
        List of (filename, ConversionResult) tuples
    """
    input_dir = Path(input_dir)
    output_dir = Path(output_dir)
    
    results = []
    files = list(input_dir.glob(pattern))
    total = len(files)
    
    for i, input_path in enumerate(files):
        if progress_callback:
            progress_callback(i, total, input_path.name)
        
        output_path = output_dir / f"{input_path.stem}.xml"
        result = convert_file(
            str(input_path),
            str(output_path),
            **kwargs
        )
        results.append((input_path.name, result))
    
    return results


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Convert SAML shorthand notation to XML",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Convert a single file
  %(prog)s input.txt -o output.xml
  
  # Convert with custom metadata
  %(prog)s input.txt -o output.xml --file-id recording-001 --speaker-id SPK01
  
  # Convert with full metadata
  %(prog)s input.txt -o output.xml --file-id REC001 --file-duration 12300 \\
      --task conversation --speaker-id SPK01 --speaker-age adult \\
      --speaker-severity moderate --speaker-gender male
  
  # Batch convert directory
  %(prog)s --batch input_dir/ output_dir/
  
  # Validate output against schema
  %(prog)s input.txt -o output.xml --validate --schema ../schema/saml.xsd
  
  # Convert from stdin
  echo "I ( [R:isyl 1] w- w- ) was going." | %(prog)s -
  
  # Show statistics
  %(prog)s input.txt --stats

Shorthand Reference:
  Repetitions:      ( [R:isyl N] b- b- ) baby
                    ( [R:syl N] ba- ba- ) baby
                    ( [R:mix N] t- t- to- ) toffee
  Prolongations:    s( [P N] s- )ee
  Blocks:           ( [IBC N] ) word, ( [ABC N] ) word
                    ( [IBV N] ) word, ( [ABV N] ) word
  Unintelligible:   {g: word}, {w: 3}, {u: }
  Non-speech:       [laughs], [coughs], [sighs], [other:yawn]
  Background:       [bg:traffic], [bg:music soft], [bg:other "dog barking"]
                    [bg:traffic moderate +continuous]
  Letters:          ~A ~B ~C
  Overlap:          <overlap>, <overlap SPK02>
  Multi-speaker:    [SPK01] Hello, how are you?
                    [SPK02] I'm doing well.
"""
    )
    
    parser.add_argument(
        'input',
        nargs='?',
        help="Input file (use '-' for stdin)"
    )
    
    parser.add_argument(
        '-o', '--output',
        help="Output XML file"
    )
    
    parser.add_argument(
        '--batch',
        nargs=2,
        metavar=('INPUT_DIR', 'OUTPUT_DIR'),
        help="Batch convert directory"
    )
    
    # File metadata options
    parser.add_argument(
        '--file-id',
        default="document",
        help="File identifier for metadata (default: document)"
    )
    
    parser.add_argument(
        '--file-duration',
        type=int,
        metavar='MS',
        help="Recording duration in milliseconds"
    )
    
    parser.add_argument(
        '--task',
        choices=sorted(TASK_TYPES),
        help="Task type for metadata"
    )
    
    # Speaker metadata options
    parser.add_argument(
        '--speaker-id',
        default="SPK01",
        help="Speaker identifier for metadata (default: SPK01)"
    )
    
    parser.add_argument(
        '--speaker-age',
        choices=sorted(AGE_GROUPS),
        help="Speaker age group"
    )
    
    parser.add_argument(
        '--speaker-severity',
        choices=sorted(SPEAKER_SEVERITY_TYPES),
        help="Speaker severity level"
    )
    
    parser.add_argument(
        '--speaker-gender',
        choices=sorted(GENDER_TYPES),
        help="Speaker gender"
    )
    
    # Other options
    parser.add_argument(
        '--language',
        default="en-US",
        help="Language code (default: en-US)"
    )
    
    parser.add_argument(
        '--no-metadata',
        action='store_true',
        help="Exclude metadata element from output"
    )
    
    parser.add_argument(
        '--validate',
        action='store_true',
        help="Validate output against SAML XSD"
    )
    
    parser.add_argument(
        '--schema',
        help="Path to SAML XSD file (for validation)"
    )
    
    parser.add_argument(
        '--strict',
        action='store_true',
        help="Reject legacy syntax (error instead of warning)"
    )
    
    parser.add_argument(
        '--stats',
        action='store_true',
        help="Show dysfluency statistics"
    )
    
    parser.add_argument(
        '-q', '--quiet',
        action='store_true',
        help="Suppress warnings"
    )
    
    args = parser.parse_args()
    
    # Build converter kwargs
    converter_kwargs = {
        'file_id': args.file_id,
        'speaker_id': args.speaker_id,
        'language': args.language,
        'validate': args.validate,
        'schema_path': args.schema,
        'file_duration': args.file_duration,
        'task': args.task,
        'speaker_age': args.speaker_age,
        'speaker_severity': args.speaker_severity,
        'speaker_gender': args.speaker_gender,
        'strict': args.strict,
    }
    
    # Handle batch mode
    if args.batch:
        input_dir, output_dir = args.batch
        
        def progress_callback(current: int, total: int, filename: str) -> None:
            if not args.quiet:
                print(f"Processing [{current + 1}/{total}]: {filename}")
        
        results = batch_convert(
            input_dir,
            output_dir,
            progress_callback=progress_callback if not args.quiet else None,
            **converter_kwargs
        )
        
        success_count = sum(1 for _, r in results if r.success)
        print(f"Converted {success_count}/{len(results)} files")
        
        for filename, result in results:
            if not result.success:
                print(f"  FAILED: {filename}")
                for error in result.errors:
                    print(f"    - {error}")
            elif result.warnings and not args.quiet:
                print(f"  WARNING: {filename}")
                for warning in result.warnings:
                    print(f"    - {warning}")
        
        sys.exit(0 if success_count == len(results) else 1)
    
    # Handle single file or stdin
    if not args.input:
        parser.error("Input file required (or use --batch for directory)")
    
    if args.input == '-':
        shorthand_text = sys.stdin.read()
        converter = ShorthandConverter(**converter_kwargs)
        result = converter.convert(
            shorthand_text,
            include_metadata=not args.no_metadata
        )
    else:
        result = convert_file(
            args.input,
            args.output,
            **converter_kwargs
        )
    
    # Output results
    if result.success:
        if args.output and args.input != '-':
            # File was already written by convert_file
            if not args.quiet:
                print(f"Written to: {args.output}")
        elif args.output and args.input == '-':
            # stdin mode - write manually
            Path(args.output).write_text(result.xml, encoding='utf-8')
            if not args.quiet:
                print(f"Written to: {args.output}")
        else:
            print(result.xml)
        
        if args.stats:
            converter = ShorthandConverter(**converter_kwargs)
            converter.statistics = result.statistics
            print("\n" + converter.get_statistics_report(), file=sys.stderr)
        
        if result.warnings and not args.quiet:
            print("\nWarnings:", file=sys.stderr)
            for warning in result.warnings:
                print(f"  - {warning}", file=sys.stderr)
    else:
        print("Conversion failed:", file=sys.stderr)
        for error in result.errors:
            print(f"  - {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
