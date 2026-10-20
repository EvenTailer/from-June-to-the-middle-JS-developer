import { htmlCssModule } from './htmlCss';
import { gitModule } from './git';
import { cliModule } from './cli';
import { oopModule } from './oop';
import { httpModule } from './http';
import { jsCoreModule } from './jsCore';
import { tsModule } from './typescript';
import { reactModule } from './react';
import { routerModule } from './reactRouter';
import { nextModule } from './nextjs';
import { reduxModule } from './redux';
import { tasksByModule } from './tasks';
import type { Module } from '../../entities/module/model/types';

const baseModules: Module[] = [
  htmlCssModule,
  gitModule,
  cliModule,
  oopModule,
  httpModule,
  jsCoreModule,
  tsModule,
  reactModule,
  reduxModule,
  routerModule,
  nextModule,
];

export const modules: Module[] = baseModules.map((module) => ({
  ...module,
  tasks: tasksByModule[module.id] ?? [],
}));

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}
