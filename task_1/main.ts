const TIMESTAMPS_COUNT = 50000;

const PROBABILITY_SCORE_CHANGED = 0.0001;

const PROBABILITY_HOME_SCORE = 0.45;

const OFFSET_MAX_STEP = 3;

type Score = {
    home: number;
    away: number;
};

type Stamp = {
    offset: number;
    score: Score;
};

const emptyScoreStamp: Stamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};

export const generateStamps = (): Stamp[] => {
    const scoreStamps = Array(TIMESTAMPS_COUNT)
        .fill(emptyScoreStamp)
        .map(
            ((acc) => () => {
                const scoreChanged =
                    Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
                const homeScoreChange =
                    scoreChanged && Math.random() < PROBABILITY_HOME_SCORE
                        ? 1
                        : 0;
                const awayScoreChange =
                    scoreChanged && !homeScoreChange ? 1 : 0;
                return {
                    offset: (acc.offset +=
                        Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
                    score: {
                        home: (acc.score.home += homeScoreChange),
                        away: (acc.score.away += awayScoreChange),
                    },
                };
            })(emptyScoreStamp)
        );

    return scoreStamps;
};

export const getScore = (gameStamps: Stamp[], offset: number): Score => {
    const length = gameStamps.length;

    if (gameStamps[length - 1].offset <= offset) {
      return gameStamps[length - 1].score;
    }

    if (gameStamps[0].offset >= offset) {
      return gameStamps[0].offset === offset ? gameStamps[0].score : {home:0, away:0};
    }

    const stampsScore: Stamp[] = gameStamps.filter(stamp => stamp.offset <= offset)
    return stampsScore[stampsScore.length - 1].score;
};
