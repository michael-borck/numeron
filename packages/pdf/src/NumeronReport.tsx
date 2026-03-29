import { Document, Page, Text, View } from '@react-pdf/renderer';
import type {
  NumerologyProfile,
  NumerologySystem,
  ProfileInput,
  NumberResult,
} from '@numeron/core';
import { interpretations, PDF_FOOTER_DISCLAIMER, PDF_COVER_NOTICE } from '@numeron/core';
import { styles } from './styles';

interface ReportProps {
  input: ProfileInput;
  profiles: Record<NumerologySystem, NumerologyProfile>;
  generatedDate: string;
}

function FooterDisclaimer() {
  return (
    <Text style={styles.footer}>
      {PDF_FOOTER_DISCLAIMER} Generated: {new Date().toISOString().split('T')[0]}.
      numeron.retroversestudios.com
    </Text>
  );
}

function NumberRow({
  label,
  result,
  showLenses = true,
}: {
  label: string;
  result: NumberResult;
  showLenses?: boolean;
}) {
  const interp = interpretations[result.value];
  return (
    <View style={styles.numberRow}>
      <Text style={styles.numberLabel}>{label}</Text>
      <Text style={styles.numberValue}>
        {result.value}
        {result.masterNumber && <Text style={styles.numberMaster}> MASTER</Text>}
      </Text>
      <View style={styles.numberInterpretation}>
        {showLenses && interp && (
          <>
            <Text style={styles.lensLabel}>LIGHT</Text>
            <Text style={styles.lensText}>{interp.positive}</Text>
            <Text style={styles.lensLabel}>TRUTH</Text>
            <Text style={styles.lensText}>{interp.neutral}</Text>
            <Text style={styles.lensLabel}>SHADOW</Text>
            <Text style={styles.lensText}>{interp.shadow}</Text>
          </>
        )}
      </View>
    </View>
  );
}

export function NumeronReport({ input, profiles, generatedDate }: ReportProps) {
  const profile = profiles.pythagorean;
  const systems: NumerologySystem[] = [
    'pythagorean',
    'chaldean',
    'kabbalistic',
    'loshu',
    'abjad',
  ];
  const systemLabels: Record<NumerologySystem, string> = {
    pythagorean: 'Pyth.',
    chaldean: 'Chald.',
    kabbalistic: 'Kabb.',
    loshu: 'Lo Shu',
    abjad: 'Abjad',
  };

  return (
    <Document>
      {/* Cover page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Text style={styles.coverTitle}>NUMERON</Text>
          <Text style={styles.coverTagline}>The Ancient Science of Numbers, Decoded.</Text>
          <Text style={styles.coverName}>{input.fullBirthName}</Text>
          <Text style={styles.coverDate}>Date of Birth: {input.dateOfBirth}</Text>
          <Text style={styles.coverDate}>Generated: {generatedDate}</Text>

          <View style={styles.coverNotice}>
            <Text style={styles.coverNoticeTitle}>{PDF_COVER_NOTICE.heading}</Text>
            <Text style={styles.coverNoticeBody}>{PDF_COVER_NOTICE.body}</Text>
          </View>
        </View>
        <FooterDisclaimer />
      </Page>

      {/* Core numbers */}
      <Page size="A4" style={styles.page}>
        <View style={styles.ornamentTop} />
        <Text style={styles.sectionTitle}>CORE NUMBERS (Pythagorean)</Text>
        <NumberRow label="Life Path" result={profile.lifePath} />
        <NumberRow label="Expression" result={profile.expression} />
        <NumberRow label="Soul Urge" result={profile.soulUrge} />
        <NumberRow label="Personality" result={profile.personality} />
        <FooterDisclaimer />
      </Page>

      {/* Timing & Correspondences */}
      <Page size="A4" style={styles.page}>
        <View style={styles.ornamentTop} />
        <Text style={styles.sectionTitle}>CURRENT TIMING</Text>
        <NumberRow label="Personal Year" result={profile.personalYear} showLenses={false} />
        <NumberRow label="Personal Month" result={profile.personalMonth} showLenses={false} />
        <NumberRow label="Personal Day" result={profile.personalDay} showLenses={false} />
        <NumberRow label="Birthday" result={profile.birthdayNumber} showLenses={false} />
        <NumberRow label="Maturity" result={profile.maturity} showLenses={false} />

        {profile.houseNumber && (
          <>
            <Text style={styles.sectionTitle}>HOUSE NUMBER</Text>
            <NumberRow label="House" result={profile.houseNumber} showLenses={false} />
          </>
        )}

        <Text style={styles.sectionTitle}>CORRESPONDENCES</Text>
        {(() => {
          const interp = interpretations[profile.lifePath.value];
          if (!interp) return null;
          return (
            <View>
              {[
                { label: 'Planet', value: interp.planet },
                { label: 'Tarot', value: interp.tarotCard },
                { label: 'Element', value: interp.element },
                { label: 'Musical Note', value: interp.musicalNote },
                { label: 'Color', value: interp.color },
              ]
                .filter((c) => c.value)
                .map((c) => (
                  <View key={c.label} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.tableHeader]}>{c.label}</Text>
                    <Text style={styles.tableCell}>{c.value}</Text>
                  </View>
                ))}
            </View>
          );
        })()}
        <FooterDisclaimer />
      </Page>

      {/* System comparison */}
      <Page size="A4" style={styles.page}>
        <View style={styles.ornamentTop} />
        <Text style={styles.sectionTitle}>SYSTEM COMPARISON</Text>
        <Text style={{ fontSize: 8, color: '#3d2b0a', marginBottom: 8, fontStyle: 'italic' }}>
          These systems produce different results for the same input. There is no agreed method to
          determine which (if any) is correct.
        </Text>

        {/* Header row */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader, { flex: 1.5 }]}> </Text>
          {systems.map((s) => (
            <Text key={s} style={[styles.compCol, styles.tableHeader]}>
              {systemLabels[s]}
            </Text>
          ))}
        </View>

        {/* Data rows */}
        {(
          [
            { key: 'lifePath', label: 'Life Path' },
            { key: 'expression', label: 'Expression' },
            { key: 'soulUrge', label: 'Soul Urge' },
            { key: 'personality', label: 'Personality' },
          ] as const
        ).map((field) => (
          <View key={field.key} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>{field.label}</Text>
            {systems.map((s) => {
              const val = profiles[s][field.key];
              return (
                <Text key={s} style={styles.compCol}>
                  {val && val.value > 0 ? val.value : '—'}
                  {val?.masterNumber ? '*' : ''}
                </Text>
              );
            })}
          </View>
        ))}

        {/* Karma & Master */}
        {(profile.karmaDebt.length > 0 || profile.masterNumbers.length > 0) && (
          <>
            <Text style={styles.sectionTitle}>KARMA DEBT & MASTER NUMBERS</Text>
            {profile.masterNumbers.length > 0 && (
              <Text style={{ fontSize: 9, color: '#3d2b0a', marginBottom: 4 }}>
                Master Numbers: {profile.masterNumbers.join(', ')}
              </Text>
            )}
            {profile.karmaDebt.length > 0 && (
              <Text style={{ fontSize: 9, color: '#3d2b0a', marginBottom: 4 }}>
                Karma Debt: {profile.karmaDebt.join(', ')}
              </Text>
            )}
            <Text style={{ fontSize: 7, color: '#a0845c', fontStyle: 'italic' }}>
              &quot;Karma debt&quot; is a metaphor used in some numerology traditions. It is not a
              statement about your moral character or past lives.
            </Text>
          </>
        )}

        <FooterDisclaimer />
      </Page>

      {/* Disclaimer page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.ornamentTop} />
        <Text style={styles.sectionTitle}>DISCLAIMER</Text>
        <Text style={{ fontSize: 9, color: '#3d2b0a', lineHeight: 1.6 }}>
          {PDF_FOOTER_DISCLAIMER}
        </Text>
        <Text style={{ fontSize: 9, color: '#3d2b0a', lineHeight: 1.6, marginTop: 20 }}>
          Generated by NUMERON v0.1.0 — Retroverse Studios{'\n'}
          numeron.retroversestudios.com
        </Text>
        <FooterDisclaimer />
      </Page>
    </Document>
  );
}
