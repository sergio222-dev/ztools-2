import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>',
});

const config: Config = {
  rootDir: '.',
  testRegex: '.*\\.test\\.ts$',
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/shared/**',
    '!**/coverage/**',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testEnvironment: 'node',
  moduleNameMapper: paths,
};

export default config;
