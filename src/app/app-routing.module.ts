import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';
import {SorularSayfaComponent} from './sayfalar/sorular-sayfa/sorular-sayfa.component';
import {HesabimSayfaComponent} from './sayfalar/hesabim-sayfa/hesabim-sayfa.component';
import {SorularimSayfaComponent} from './sayfalar/sorularim-sayfa/sorularim-sayfa.component';
import {GirisSayfaComponent} from './sayfalar/giris-sayfa/giris-sayfa.component';
import {KayitSayfaComponent} from './sayfalar/kayit-sayfa/kayit-sayfa.component';
import {SoruDetaySayfaComponent} from './sayfalar/soru-detay-sayfa/soru-detay-sayfa.component';
import {SoruDuzenleSayfaComponent} from './sayfalar/soru-duzenle-sayfa/soru-duzenle-sayfa.component';
import {AdminSayfaComponent} from './sayfalar/admin-sayfa/admin-sayfa.component';

const girisYapilmamissaGiriseGonder = () => redirectUnauthorizedTo(['giris']);
const girisYapilmadiysaSorularaGonder = () => redirectLoggedInTo(['sorular']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sorular',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminSayfaComponent,
    ...canActivate(girisYapilmamissaGiriseGonder)
  },
  {
    path: 'sorular',
    component: SorularSayfaComponent,
  },
  {
    path: 'sorular/:id',
    component: SoruDetaySayfaComponent
  },
  {
    path: 'sorular/:id/duzenle',
    component: SoruDuzenleSayfaComponent,
    ...canActivate(girisYapilmamissaGiriseGonder)
  },
  {
    path: 'hesabim',
    component: HesabimSayfaComponent,
    ...canActivate(girisYapilmamissaGiriseGonder)
  },
  {
    path: 'sorularim',
    component: SorularimSayfaComponent,
    ...canActivate(girisYapilmamissaGiriseGonder)
  },
  {
    path: 'giris',
    component: GirisSayfaComponent,
    ...canActivate(girisYapilmadiysaSorularaGonder)
  },
  {
    path: 'kayit',
    component: KayitSayfaComponent,
    ...canActivate(girisYapilmadiysaSorularaGonder)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
