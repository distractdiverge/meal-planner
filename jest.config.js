module.exports = {
    roots: [
        "packages/app/src",
        "packages/infrastructure/src",
    ],
    testMatch: [
        "**/?(*.)+(test).+(ts|tsx|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
};