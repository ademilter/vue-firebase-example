# Vue Firebase Example
- [Firebase Console](https://console.firebase.google.com/u/0/)'dan yeni bir proje oluşturun.
- Database menüsünden Firestore'u aktifleştirin.
- [config.js](https://github.com/ademilter/vue-firebase-example/blob/master/src/firebase/config.js) dosyasını kendi proje bilgilerinizle güncelleyin.
- terminal'den `npm i -g firebase-tools` komutu ile bilgisayarınıza firebase terminal aracını kurun.
- proje dizinine girin ve `firebase login` komutunu çalıştırarak login olun.
- tekrar proje dizininde `firebase use -add` diyerek projenizi seçin.
- tekrar proje dizininde `npm install` diyerek projeye ait paketleri yükleyin.
- son olarak `npm run deploy` diyerek proje build olur ve firebase'e gönderilir.

## Yapılacaklar
- [ ] Şehire göre filtreleme
- [ ] Uygunluk durumuna göre filtreleme
- [ ] Mesleğe göre filtreleme
