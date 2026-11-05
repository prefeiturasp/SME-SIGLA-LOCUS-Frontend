module.exports = {
  testEnvironment: "jsdom",
 
  testTimeout: 10000,
  maxWorkers: 4,
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|jpg|jpeg|png|gif)(\\?.*)?$": "<rootDir>/__mocks__/fileMock.cjs",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  coverageReporters: ["text", "html", "lcov"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/rotas/",
    "<rootDir>/src/app/",
    "<rootDir>/src/paginas/NaoEncontrado/",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!antd|@ant-design|rc-.*|@babel/runtime)",
  ],
};
