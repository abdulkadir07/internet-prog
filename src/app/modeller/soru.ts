import {Cevap} from './cevap';
import {Observable} from 'rxjs';
import {Kullanici} from './kullanici';
import {Category} from './category';

export class Soru {
  id?: string;
  icerik: string;
  kullaniciId: string;
  kategoriId: string;
  begeniSayisi?: number;

  cevaplar?: Cevap[] | Observable<Cevap[]>;
  uye?: Kullanici;
  kategori?: Category;
}
