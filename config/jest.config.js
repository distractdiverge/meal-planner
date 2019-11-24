module.exports = {
    roots: [
        "src",
    ],
    testMatch: [
        "**/?(*.)+(test).+(ts|tsx|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
};