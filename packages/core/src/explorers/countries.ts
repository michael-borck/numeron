import * as pythagorean from '../systems/pythagorean.js';
import type { NumberResult } from '../types.js';

export interface CountryProfile {
  name: string;
  independenceDate?: string;
  continent: string;
  nameExpression: NumberResult;
  foundedLifePath?: NumberResult;
}

interface CountryEntry {
  name: string;
  independenceDate?: string;
  continent: string;
}

const countryData: CountryEntry[] = [
  // Americas
  { name: 'United States of America', independenceDate: '1776-07-04', continent: 'North America' },
  { name: 'Canada', independenceDate: '1867-07-01', continent: 'North America' },
  { name: 'Mexico', independenceDate: '1810-09-16', continent: 'North America' },
  { name: 'Brazil', independenceDate: '1822-09-07', continent: 'South America' },
  { name: 'Argentina', independenceDate: '1816-07-09', continent: 'South America' },
  { name: 'Colombia', independenceDate: '1810-07-20', continent: 'South America' },

  // Europe
  { name: 'United Kingdom', continent: 'Europe' },
  { name: 'France', independenceDate: '1789-07-14', continent: 'Europe' },
  { name: 'Germany', independenceDate: '1871-01-18', continent: 'Europe' },
  { name: 'Italy', independenceDate: '1861-03-17', continent: 'Europe' },
  { name: 'Spain', continent: 'Europe' },
  { name: 'Netherlands', independenceDate: '1581-07-26', continent: 'Europe' },
  { name: 'Sweden', continent: 'Europe' },
  { name: 'Switzerland', independenceDate: '1291-08-01', continent: 'Europe' },
  { name: 'Ireland', independenceDate: '1922-12-06', continent: 'Europe' },
  { name: 'Greece', independenceDate: '1821-03-25', continent: 'Europe' },
  { name: 'Poland', independenceDate: '1918-11-11', continent: 'Europe' },
  { name: 'Ukraine', independenceDate: '1991-08-24', continent: 'Europe' },

  // Asia
  { name: 'China', independenceDate: '1949-10-01', continent: 'Asia' },
  { name: 'Japan', continent: 'Asia' },
  { name: 'India', independenceDate: '1947-08-15', continent: 'Asia' },
  { name: 'South Korea', independenceDate: '1945-08-15', continent: 'Asia' },
  { name: 'Indonesia', independenceDate: '1945-08-17', continent: 'Asia' },
  { name: 'Thailand', continent: 'Asia' },
  { name: 'Vietnam', independenceDate: '1945-09-02', continent: 'Asia' },
  { name: 'Philippines', independenceDate: '1898-06-12', continent: 'Asia' },
  { name: 'Israel', independenceDate: '1948-05-14', continent: 'Asia' },
  { name: 'Saudi Arabia', independenceDate: '1932-09-23', continent: 'Asia' },
  { name: 'Turkey', independenceDate: '1923-10-29', continent: 'Asia' },
  { name: 'Singapore', independenceDate: '1965-08-09', continent: 'Asia' },

  // Africa
  { name: 'Egypt', independenceDate: '1922-02-28', continent: 'Africa' },
  { name: 'South Africa', independenceDate: '1910-05-31', continent: 'Africa' },
  { name: 'Nigeria', independenceDate: '1960-10-01', continent: 'Africa' },
  { name: 'Kenya', independenceDate: '1963-12-12', continent: 'Africa' },
  { name: 'Ethiopia', continent: 'Africa' },
  { name: 'Ghana', independenceDate: '1957-03-06', continent: 'Africa' },

  // Oceania
  { name: 'Australia', independenceDate: '1901-01-01', continent: 'Oceania' },
  { name: 'New Zealand', independenceDate: '1907-09-26', continent: 'Oceania' },

  // Middle East
  { name: 'United Arab Emirates', independenceDate: '1971-12-02', continent: 'Asia' },
  { name: 'Iran', continent: 'Asia' },
];

function profileCountry(entry: CountryEntry): CountryProfile {
  const nameExpression = pythagorean.reduceName(entry.name);
  const foundedLifePath = entry.independenceDate
    ? pythagorean.lifePath(entry.independenceDate)
    : undefined;

  return {
    ...entry,
    nameExpression,
    foundedLifePath,
  };
}

/** All pre-computed country profiles */
export const countryProfiles: CountryProfile[] = countryData.map(profileCountry);

/** Analyse a user-entered country */
export function analyzeCountry(name: string, independenceDate?: string): CountryProfile {
  return profileCountry({
    name,
    independenceDate: independenceDate || undefined,
    continent: 'Custom',
  });
}

/** Group countries by continent */
export function countriesByContinent(): Record<string, CountryProfile[]> {
  const grouped: Record<string, CountryProfile[]> = {};
  for (const c of countryProfiles) {
    if (!grouped[c.continent]) grouped[c.continent] = [];
    grouped[c.continent].push(c);
  }
  return grouped;
}
