module.exports = {
  testEnvironment: "jsdom",
  testTimeout: 30000,
  maxWorkers: "50%",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|jpg|jpeg|png|gif)(\\?.*)?$": "<rootDir>/__mocks__/fileMock.cjs",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  coverageReporters: ["text", "html"],
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
