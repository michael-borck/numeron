import { describe, it, expect } from 'vitest';
import { companyProfiles, analyzeCompany, companiesBySector } from '../explorers/companies.js';
import {
  countryProfiles,
  analyzeCountry,
  countriesByContinent,
} from '../explorers/countries.js';

describe('company profiles', () => {
  it('has at least 25 pre-loaded companies', () => {
    expect(companyProfiles.length).toBeGreaterThanOrEqual(25);
  });

  it('each company has a valid name expression', () => {
    for (const c of companyProfiles) {
      expect(c.nameExpression.value).toBeGreaterThan(0);
      expect(c.nameExpression.value).toBeLessThanOrEqual(33);
    }
  });

  it('companies with tickers have ticker expressions', () => {
    const withTickers = companyProfiles.filter((c) => c.ticker);
    expect(withTickers.length).toBeGreaterThan(15);
    for (const c of withTickers) {
      expect(c.tickerExpression).toBeDefined();
      expect(c.tickerExpression!.value).toBeGreaterThan(0);
    }
  });

  it('companies with dates have founded life paths', () => {
    const withDates = companyProfiles.filter((c) => c.foundedDate);
    expect(withDates.length).toBeGreaterThan(20);
    for (const c of withDates) {
      expect(c.foundedLifePath).toBeDefined();
      expect(c.foundedLifePath!.value).toBeGreaterThan(0);
    }
  });

  it('includes Big Four consulting firms', () => {
    const bigFour = companyProfiles.filter((c) => c.sector === 'Consulting');
    expect(bigFour.length).toBe(4);
  });

  it('groups by sector', () => {
    const bySector = companiesBySector();
    expect(bySector['Technology']).toBeDefined();
    expect(bySector['Technology'].length).toBeGreaterThan(5);
    expect(bySector['Consulting']?.length).toBe(4);
  });

  it('can analyse a custom company', () => {
    const custom = analyzeCompany('Retroverse Studios', undefined, '2024-01-15');
    expect(custom.nameExpression.value).toBeGreaterThan(0);
    expect(custom.foundedLifePath).toBeDefined();
    expect(custom.sector).toBe('Custom');
  });
});

describe('country profiles', () => {
  it('has at least 35 pre-loaded countries', () => {
    expect(countryProfiles.length).toBeGreaterThanOrEqual(35);
  });

  it('each country has a valid name expression', () => {
    for (const c of countryProfiles) {
      expect(c.nameExpression.value).toBeGreaterThan(0);
      expect(c.nameExpression.value).toBeLessThanOrEqual(33);
    }
  });

  it('countries with independence dates have life paths', () => {
    const withDates = countryProfiles.filter((c) => c.independenceDate);
    expect(withDates.length).toBeGreaterThan(25);
    for (const c of withDates) {
      expect(c.foundedLifePath).toBeDefined();
      expect(c.foundedLifePath!.value).toBeGreaterThan(0);
    }
  });

  it('covers multiple continents', () => {
    const byContinent = countriesByContinent();
    expect(Object.keys(byContinent).length).toBeGreaterThanOrEqual(5);
    expect(byContinent['Europe']?.length).toBeGreaterThan(5);
    expect(byContinent['Asia']?.length).toBeGreaterThan(5);
  });

  it('USA independence is July 4 1776', () => {
    const usa = countryProfiles.find((c) => c.name === 'United States of America');
    expect(usa).toBeDefined();
    expect(usa!.independenceDate).toBe('1776-07-04');
    expect(usa!.foundedLifePath).toBeDefined();
  });

  it('can analyse a custom country', () => {
    const custom = analyzeCountry('Wakanda', '2018-02-16');
    expect(custom.nameExpression.value).toBeGreaterThan(0);
    expect(custom.foundedLifePath).toBeDefined();
  });
});
