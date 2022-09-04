import {describe, expect, test} from '@jest/globals';
import {generateStamps, getScore} from './main';

type Score = {
    home: number;
    away: number;
};

type Stamp = {
    offset: number;
    score: Score;
};

describe('test getScore', () => {
  test('minus offset: -10', () => {
    const stamps:Stamp[] = generateStamps();
    const resScore:Score = getScore(stamps, -10);
    expect(resScore.home).toBe(0);
  });

  test('big offset: 1000000', () => {
    const stamps:Stamp[] = generateStamps();
    const resScore:Score = getScore(stamps, 1000000);
    expect(resScore.home).toBe(stamps[stamps.length - 1].score.home);
  });

  test('normal offset index: 235', () => {
    const stamps:Stamp[] = generateStamps();
    const resScore:Score = getScore(stamps, stamps[235].offset);
    expect(resScore.home).toBe(stamps[235].score.home);
  });
});
