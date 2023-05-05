export interface Order {
  email:string,
  nev:string
  Cim: {
    utca: string;
    varos: string;
    megye: string;
    irszam: string;
  };
  Termekek: {
    termek_nev: string;
    mennyiseg: number;
    ar: number;
  }[];
  rendelesDatuma: Date;
  osszesen: number;
}
