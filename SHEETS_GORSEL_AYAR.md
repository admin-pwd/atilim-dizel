# Hizmet Görselleri – Google Sheets Ayarı

Sitedeki hizmet kartlarında **doğru görselin** çıkması için görsellerin Sheets’te **link (URL) olarak** bir sütunda bulunması gerekir.

## Neden link olmalı?

Google Sheets’te **hücreye doğrudan eklenen görseller** (Ekle → Görsel → Hücrede görsel) sadece tabloda görünür. Sayfa **CSV olarak dışa aktarıldığında** bu görseller dahil edilmez; CSV yalnızca **metin** içerir. Bu yüzden sitede kullanılan veri kaynağı (CSV) içinde görsel **URL’si metin olarak** yer almalı.

## Ne yapmalısınız?

İki pratik yol var:

### 1) Ayrı bir “link” sütunu eklemek (önerilen)

- Hizmetler sekmesinde **yeni bir sütun** açın (örn. **Foto linki** veya **photo_url**).
- Her satırda, o hizmete ait görselin **internet adresini (URL)** yazın.
- Görseli nereden alırsınız?
  - **Google Drive:** Dosyayı yükleyin → Sağ tık → “Bağlantıyı al” → “Bağlantıya sahip olan herkes görüntüleyebilir” seçin → Linki kopyalayıp bu sütuna yapıştırın.
  - Görsel zaten bir sitede (örn. imgur, kendi siteniz) ise, görsele sağ tıklayıp “Görsel adresini kopyala” ile linki alıp aynı sütuna yapıştırabilirsiniz.

Böylece:
- İsterseniz mevcut sütunda **hücrede görsel** olarak kalmaya devam edebilir (sadece tabloda görmek için).
- Sitenin kullandığı görsel adresleri ise **Foto linki / photo_url** sütunundan okunur.

### 2) Hücrede formül kullanmak

- Görselin **public (herkese açık) URL’si** varsa, hücrede şu formülü kullanabilirsiniz:  
  `=IMAGE("buraya_gorsel_url_yapistirin")`
- Bu hem hücrede görseli gösterir hem de CSV’de formül metni gider; sitemiz bu metinden URL’yi çıkarıp kullanır.

**Özet:** Görselleri hücrede tutabilirsiniz; sitede doğru görselin çıkması için ayrıca **bir sütunda mutlaka görsel linki (URL)** olmalı (düz metin veya `=IMAGE("url")` formülü ile).
