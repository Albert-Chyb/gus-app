import { CompanyReportName, SilosID, TypRegon } from '../classes/company';

export const reports: readonly [TypRegon, SilosID, CompanyReportName][] =
  Object.freeze([
    ['F', '1', 'BIR11OsFizycznaDaneOgolne'],
    ['F', '2', 'BIR11OsFizycznaDzialalnoscCeidg'],
    ['F', '3', 'BIR11OsFizycznaDzialalnoscRolnicza'],

    ['F', '1', 'BIR11OsFizycznaDzialalnoscCeidg'],
    ['F', '2', 'BIR11OsFizycznaDzialalnoscRolnicza'],
    ['F', '3', 'BIR11OsFizycznaDzialalnoscPozostala'],
    ['F', '4', 'BIR11OsFizycznaDzialalnoscSkreslonaDo20141108'],

    ['F', '1', 'BIR11OsFizycznaPkd'],
    ['F', '2', 'BIR11OsFizycznaPkd'],
    ['F', '3', 'BIR11OsFizycznaPkd'],

    ['F', '1', 'BIR11OsFizycznaListaJednLokalnych'],
    ['F', '2', 'BIR11OsFizycznaListaJednLokalnych'],
    ['F', '3', 'BIR11OsFizycznaListaJednLokalnych'],

    ['LF', '1', 'BIR11JednLokalnaOsFizycznej'],
    ['LF', '2', 'BIR11JednLokalnaOsFizycznej'],
    ['LF', '3', 'BIR11JednLokalnaOsFizycznej'],

    ['LF', '1', 'BIR11JednLokalnaOsFizycznejPkd'],
    ['LF', '2', 'BIR11JednLokalnaOsFizycznejPkd'],
    ['LF', '3', 'BIR11JednLokalnaOsFizycznejPkd'],

    ['P', '6', 'BIR11OsPrawna'],
    ['P', '6', 'BIR11OsPrawnaPkd'],
    ['P', '6', 'BIR11OsPrawnaListaJednLokalnych'],

    ['LP', '6', 'BIR11JednLokalnaOsPrawnej'],
    ['LP', '6', 'BIR11JednLokalnaOsPrawnejPkd'],

    ['P', '6', 'BIR11OsPrawnaSpCywilnaWspolnicy'],
    ['P', '6', 'BIR11TypPodmiotu'],
  ]);
