module.exports = {
  verbose: true,
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json"
    }
  },
  "moduleNameMapper": {
  },
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/(?!grafana-sdk-mocks)"
  ],
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest"
  },
  "testRegex": "(\\.|/)(test)\\.ts$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ]
};
