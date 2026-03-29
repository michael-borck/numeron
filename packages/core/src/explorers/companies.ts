import * as pythagorean from '../systems/pythagorean.js';
import type { NumberResult } from '../types.js';

export interface CompanyProfile {
  name: string;
  ticker?: string;
  foundedDate?: string;
  sector: string;
  nameExpression: NumberResult;
  tickerExpression?: NumberResult;
  foundedLifePath?: NumberResult;
  brandExpression?: NumberResult;
  brandName?: string;
}

export interface CompanyEntry {
  name: string;
  ticker?: string;
  foundedDate?: string;
  sector: string;
  brandName?: string;
}

const companyData: CompanyEntry[] = [
  // Big Tech
  { name: 'Apple Inc', ticker: 'AAPL', foundedDate: '1976-04-01', sector: 'Technology', brandName: 'Apple' },
  { name: 'Microsoft Corporation', ticker: 'MSFT', foundedDate: '1975-04-04', sector: 'Technology', brandName: 'Microsoft' },
  { name: 'Amazon.com Inc', ticker: 'AMZN', foundedDate: '1994-07-05', sector: 'Technology', brandName: 'Amazon' },
  { name: 'Alphabet Inc', ticker: 'GOOGL', foundedDate: '1998-09-04', sector: 'Technology', brandName: 'Google' },
  { name: 'Meta Platforms Inc', ticker: 'META', foundedDate: '2004-02-04', sector: 'Technology', brandName: 'Facebook' },
  { name: 'NVIDIA Corporation', ticker: 'NVDA', foundedDate: '1993-01-01', sector: 'Technology', brandName: 'NVIDIA' },
  { name: 'Tesla Inc', ticker: 'TSLA', foundedDate: '2003-07-01', sector: 'Automotive', brandName: 'Tesla' },
  { name: 'International Business Machines', ticker: 'IBM', foundedDate: '1911-06-16', sector: 'Technology', brandName: 'IBM' },
  { name: 'Intel Corporation', ticker: 'INTC', foundedDate: '1968-07-18', sector: 'Technology', brandName: 'Intel' },
  { name: 'Samsung Electronics', ticker: '005930', foundedDate: '1969-01-13', sector: 'Technology', brandName: 'Samsung' },

  // Big Four Consulting
  { name: 'Deloitte Touche Tohmatsu', ticker: undefined, foundedDate: '1845-01-01', sector: 'Consulting', brandName: 'Deloitte' },
  { name: 'PricewaterhouseCoopers', ticker: undefined, foundedDate: '1998-07-01', sector: 'Consulting', brandName: 'PwC' },
  { name: 'Ernst and Young', ticker: undefined, foundedDate: '1989-01-01', sector: 'Consulting', brandName: 'EY' },
  { name: 'Klynveld Peat Marwick Goerdeler', ticker: undefined, foundedDate: '1987-01-01', sector: 'Consulting', brandName: 'KPMG' },

  // Big Banks
  { name: 'JPMorgan Chase', ticker: 'JPM', foundedDate: '1799-01-01', sector: 'Banking', brandName: 'JPMorgan' },
  { name: 'Goldman Sachs Group', ticker: 'GS', foundedDate: '1869-01-01', sector: 'Banking', brandName: 'Goldman Sachs' },
  { name: 'Bank of America', ticker: 'BAC', foundedDate: '1904-10-17', sector: 'Banking', brandName: 'Bank of America' },
  { name: 'HSBC Holdings', ticker: 'HSBC', foundedDate: '1865-03-03', sector: 'Banking', brandName: 'HSBC' },
  { name: 'Berkshire Hathaway', ticker: 'BRK.A', foundedDate: '1839-01-01', sector: 'Conglomerate', brandName: 'Berkshire Hathaway' },

  // Consumer
  { name: 'The Coca-Cola Company', ticker: 'KO', foundedDate: '1892-01-29', sector: 'Consumer', brandName: 'Coca-Cola' },
  { name: 'The Walt Disney Company', ticker: 'DIS', foundedDate: '1923-10-16', sector: 'Entertainment', brandName: 'Disney' },
  { name: 'Nike Inc', ticker: 'NKE', foundedDate: '1964-01-25', sector: 'Consumer', brandName: 'Nike' },
  { name: 'McDonalds Corporation', ticker: 'MCD', foundedDate: '1955-04-15', sector: 'Food', brandName: 'McDonalds' },
  { name: 'Toyota Motor Corporation', ticker: 'TM', foundedDate: '1937-08-28', sector: 'Automotive', brandName: 'Toyota' },

  // Pharma / Health
  { name: 'Johnson and Johnson', ticker: 'JNJ', foundedDate: '1886-01-01', sector: 'Healthcare', brandName: 'J&J' },
  { name: 'Pfizer Inc', ticker: 'PFE', foundedDate: '1849-01-01', sector: 'Pharma', brandName: 'Pfizer' },

  // Energy
  { name: 'Saudi Arabian Oil Company', ticker: '2222', foundedDate: '1933-05-29', sector: 'Energy', brandName: 'Saudi Aramco' },
  { name: 'Exxon Mobil Corporation', ticker: 'XOM', foundedDate: '1999-11-30', sector: 'Energy', brandName: 'ExxonMobil' },

  // Iconic
  { name: 'SpaceX', ticker: undefined, foundedDate: '2002-03-14', sector: 'Aerospace', brandName: 'SpaceX' },
  { name: 'Netflix Inc', ticker: 'NFLX', foundedDate: '1997-08-29', sector: 'Entertainment', brandName: 'Netflix' },
];

/**
 * Generate a numerological profile for a company.
 */
function profileCompany(entry: CompanyEntry): CompanyProfile {
  const nameExpression = pythagorean.reduceName(entry.name);
  const tickerExpression = entry.ticker ? pythagorean.reduceName(entry.ticker) : undefined;
  const foundedLifePath = entry.foundedDate ? pythagorean.lifePath(entry.foundedDate) : undefined;
  const brandExpression = entry.brandName ? pythagorean.reduceName(entry.brandName) : undefined;

  return {
    ...entry,
    nameExpression,
    tickerExpression,
    foundedLifePath,
    brandExpression,
  };
}

/** All pre-computed company profiles */
export const companyProfiles: CompanyProfile[] = companyData.map(profileCompany);

/** Analyse a user-entered company */
export function analyzeCompany(
  name: string,
  ticker?: string,
  foundedDate?: string,
): CompanyProfile {
  return profileCompany({
    name,
    ticker: ticker || undefined,
    foundedDate: foundedDate || undefined,
    sector: 'Custom',
  });
}

/** Group companies by sector */
export function companiesBySector(): Record<string, CompanyProfile[]> {
  const grouped: Record<string, CompanyProfile[]> = {};
  for (const c of companyProfiles) {
    if (!grouped[c.sector]) grouped[c.sector] = [];
    grouped[c.sector].push(c);
  }
  return grouped;
}
