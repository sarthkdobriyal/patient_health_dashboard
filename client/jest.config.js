module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/client/src/**/*.test.(js|jsx|ts|tsx)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.js'],
};