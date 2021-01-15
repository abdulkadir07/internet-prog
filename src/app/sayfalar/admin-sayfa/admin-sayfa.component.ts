import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Cevap} from '../../modeller/cevap';
import {Category} from '../../modeller/category';
import {Router} from '@angular/router';
import {AuthService} from '../../servisler/auth.service';
import {Kullanici} from '../../modeller/kullanici';
import {map} from 'rxjs/operators';
import {Soru} from '../../modeller/soru';

@Component({
  selector: 'app-admin-sayfa',
  templateUrl: './admin-sayfa.component.html',
})
export class AdminSayfaComponent implements OnInit {
  public kategori: string;
  kategoriler: Observable<Category[]>;
  kategorilerRef: AngularFireList<Category>;
  sorular: Observable<Soru[]>;
  sorularRef: AngularFireList<Soru>;

  suankiKategori: Category = new Category();

  constructor(
    public db: AngularFireDatabase,
    public authServis: AuthService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.kategorilerRef = this.db.list<Category>('kategori');
    this.kategoriler = this.kategorilerRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        return {
          id: c.key,
          ...c.payload.val()
        };
      });
    }));
    this.sorularRef = this.db.list<Soru>('soru');
    this.sorular = this.sorularRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        return {
          id: c.key,
          ...c.payload.val()
        };
      });
    }));

    this.db.list<Kullanici>('uye', ref => ref.orderByChild('kullaniciId').equalTo(this.authServis.kullanici.uid)).snapshotChanges().subscribe(changes => {
      const uye = changes[0].payload.val() as Kullanici;

      if (uye.rol !== 'admin') {
        this.router.navigate(['sorular']);
      }
    });
  }

  KategoriOlustur() {
    return this.kategorilerRef.push({
      adi: this.kategori
    });
  }

  KategoriSil(id: string) {
    if (confirm('Emin misiniz?')) {
      return this.db.object<Category>('kategori/' + id).remove();
    }

  }

  GuncellenecekKategori(kategori: Category) {
    this.suankiKategori = {...kategori};
  }

  GuncellencekKategoriyiGuncelle() {
    return this.db.object<Category>('kategori/' + this.suankiKategori.id).update({
      adi: this.suankiKategori.adi
    });
  }

  SoruSil(soruId: string) {
    if (confirm('Emin misiniz?')) {
      this.sorularRef.remove(soruId).then(() => {
        return this.db.list<Cevap>('cevap', ref => ref.orderByChild('soruId').equalTo(soruId))
          .snapshotChanges()
          .subscribe(changes => {
            changes.forEach(c => {
              return this.db.object<Cevap>('cevap/' + c.key).remove();
            });
          });
      });
    }
  }

}
