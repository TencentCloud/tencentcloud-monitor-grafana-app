module.exports = {
  verbose: true,
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json"
    }
  },
  "moduleNameMapper": {
    'app/core/core_module': '<rootDir>/src/datasource/__mocks__/core_module.ts',
  },
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/(?!grafana-sdk-mocks)"
  ],
  "transform": {
    ".js$": "<rootDir>/node_modules/babel-jest",
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
