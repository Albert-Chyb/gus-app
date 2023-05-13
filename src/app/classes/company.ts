import { reports } from '../constants/company-reports';

export type TypRegon = 'P' | 'F' | 'LP' | 'LF';
export type SilosID = '1' | '2' | '3' | '4' | '6';

export interface CompanyData {
  regon: string;
  nip: string;
  statusNip: string;
  nazwa: string;
  wojewodztwo: string;
  powiat: string;
  gmina: string;
  miejscowosc: string;
  kodPocztowy: string;
  ulica: string;
  nrNieruchomosci: string;
  nrLokalu: string;
  typ: TypRegon;
  silosID: SilosID;
  dataZakonczeniaDzialalnosci: string;
  miejscowoscPoczty: string;
}

export type CompanyReportName =
  | 'BIR11OsFizycznaDaneOgolne'
  | 'BIR11OsFizycznaDzialalnoscCeidg'
  | 'BIR11OsFizycznaDzialalnoscRolnicza'
  | 'BIR11OsFizycznaDzialalnoscPozostala'
  | 'BIR11OsFizycznaDzialalnoscSkreslonaDo20141108'
  | 'BIR11OsFizycznaPkd'
  | 'BIR11OsFizycznaListaJednLokalnych'
  | 'BIR11JednLokalnaOsFizycznej'
  | 'BIR11JednLokalnaOsFizycznejPkd'
  | 'BIR11OsPrawna'
  | 'BIR11OsPrawnaPkd'
  | 'BIR11OsPrawnaListaJednLokalnych'
  | 'BIR11JednLokalnaOsPrawnej'
  | 'BIR11JednLokalnaOsPrawnejPkd'
  | 'BIR11OsPrawnaSpCywilnaWspolnicy'
  | 'BIR11TypPodmiotu';

export class Company implements CompanyData {
  regon: string;
  nip: string;
  statusNip: string;
  nazwa: string;
  wojewodztwo: string;
  powiat: string;
  gmina: string;
  miejscowosc: string;
  kodPocztowy: string;
  ulica: string;
  nrNieruchomosci: string;
  nrLokalu: string;
  typ: TypRegon;
  silosID: SilosID;
  dataZakonczeniaDzialalnosci: string;
  miejscowoscPoczty: string;
  availableReports: CompanyReportName[];

  constructor(initialData: CompanyData) {
    const {
      regon,
      nip,
      statusNip,
      nazwa,
      wojewodztwo,
      powiat,
      gmina,
      miejscowosc,
      kodPocztowy,
      ulica,
      nrNieruchomosci,
      nrLokalu,
      typ,
      silosID,
      dataZakonczeniaDzialalnosci,
      miejscowoscPoczty,
    } = initialData;

    this.regon = regon;
    this.nip = nip;
    this.statusNip = statusNip;
    this.nazwa = nazwa;
    this.wojewodztwo = wojewodztwo;
    this.powiat = powiat;
    this.gmina = gmina;
    this.miejscowosc = miejscowosc;
    this.kodPocztowy = kodPocztowy;
    this.ulica = ulica;
    this.nrNieruchomosci = nrNieruchomosci;
    this.nrLokalu = nrLokalu;
    this.typ = typ;
    this.silosID = silosID;
    this.dataZakonczeniaDzialalnosci = dataZakonczeniaDzialalnosci;
    this.miejscowoscPoczty = miejscowoscPoczty;

    this.availableReports = Company.availableReports(this);
  }

  /**
   * Returns a description for the value of the 'typ' field
   * @returns {string} description of the 'typ' field
   */
  getTypeDescription(): string {
    switch (this.typ) {
      case 'P':
        return 'Jednostka prawna';
      case 'F':
        return 'Jednostka fizyczna';
      case 'LP':
        return 'Jednostka lokalna jednostki prawnej';
      case 'LF':
        return 'Jednostka lokalna jednostki fizycznej';
      default:
        return 'Nieznany';
    }
  }

  /**
   * Returns a description for the value of the 'silosID' field
   * @returns {string} description of 'silosID' field
   */
  getSilosIDDescription(): string {
    switch (this.silosID) {
      case '1':
        return 'Miejsce prowadzenia działalności podlegającą wpisowi do CEIDG.';
      case '2':
        return 'Miejsce prowadzenia działalności rolniczej';
      case '3':
        return 'Miejsce prowadzenia działalności pozostałej';
      case '4':
        return 'Miejsce prowadzenia działalności skreślonej z rejestru REGON przed 2014.11.08';
      case '6':
        return 'Miejsce prowadzenia działalności jednostki prawnej';
      default:
        return 'Nieznany';
    }
  }

  static availableReports(company: Company): CompanyReportName[] {
    return reports
      .filter(
        ([type, silosID]) => type === company.typ && silosID === company.silosID
      )
      .map(([, , reportName]) => reportName);
  }
}
