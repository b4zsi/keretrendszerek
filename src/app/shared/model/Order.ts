export interface Order {
  user_id:string,
  shippingAddress: {
    utca: string;
    varos: string;
    megye: string;
    irszam: string;
    orszag: string;
  };
  Termekek: {
    termek_nev: string;
    mennyiseg: number;
    ar: number;
  }[];
  rendelesDatuma: Date;
  osszesen: number;
}
