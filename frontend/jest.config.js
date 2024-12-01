module.exports = {
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: [
      "<rootDir>/__tests__/setupTests.js"
    ],
  };
  