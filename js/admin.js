/**
 * Fin-Plast International — Universal CMS & Admin Controller
 * Manages 100% of website content: Hero, Services, Categories, Workflow, Certificates,
 * Products Catalog, Leads, Contact info, Media assets and Data Persistence.
 */

// Available product and section images preset
const availableMockupImages = [    
  'assets/images/products/finplast_standup_pouch_white.jpg',
  'assets/images/products/finplast_coffee_gusset.jpg',
  'assets/images/products/finplast_bread_clip_pack.jpg',
  'assets/images/products/finplast_wet_wipes_flip.jpg',
  'assets/images/products/finplast_pocket_wipes.jpg',
  'assets/images/products/finplast_flip_top_wipes.jpg',
  'assets/images/products/finplast_wipe_pack_white.jpg',
  'assets/images/products/finplast_sanitary_pack.jpg',
  'assets/images/products/finplast_snack_pillow_chip.jpg',
  'assets/images/products/finplast_pillow_nuts.jpg',
  'assets/images/products/finplast_crisp_bag.jpg',
  'assets/images/products/finplast_duo_pouch.jpg',
  'assets/images/products/finplast_clear_window_bag.jpg',
  'assets/images/products/finplast_snack_metallic.jpg',
  'assets/images/products/finplast_family_pouch.jpg',
  'assets/images/products/finplast_premium_pouch.jpg',
  'assets/images/products/finplast_flowpack_wafer.jpg',
  'assets/images/products/finplast_flowpack_snack.jpg',
  'assets/images/products/finplast_confectionery_bar.jpg',
  'assets/images/products/finplast_wafer_bar.jpg',
  'assets/images/products/finplast_poly_pillow.jpg',
  'assets/images/finplast_direction_transport.jpg',
  'assets/images/finplast_direction_consumer.jpg',
  'assets/images/finplast_direction_chemical.jpg',
  'assets/images/finplast_direction_labels.jpg',
  'assets/images/1.jpg',
  'assets/images/2.png',
  'assets/images/maket.jpg',
  'assets/images/FIN PLAST INTERNATIONAL LLC - 9001.jpg',
  'assets/images/logo.png'
];

// Default CMS Data covering all sections of the site
const defaultSiteCMS = {
  hero: {
    tag: 'SƏNAYE 4.0 STANDARTLI POLİMER & FLEKSOQRAFİYA',
    title: 'Rəflərdə Fərq Yaradan Yüksək Bariyerli Qablaşdırma',
    desc: '1998-ci ildən Sumqayıt sənaye qovşağında fəaliyyət göstərən Fin-Plast International — 8 rəngli Avropa HD flekso çapı, 3 qatlı ekoloji laminasiya və beynəlxalq ISO & AQTA sertifikatlı qida qablaşdırması üzrə innovativ sənaye lideridir.',
    image: 'assets/images/finplast_product_doypack.jpg',
    stat1Val: 'Sumqayıt Sənaye Parkı',
    stat1Lbl: '1998-ci ildən istehsalat',
    stat2Val: '8 Rəngli HD',
    stat2Lbl: 'Mərkəzi Barabanlı Flekso',
    stat3Val: '3 Qat Bariyer',
    stat3Lbl: 'Solventsiz Laminasiya',
    stat4Val: 'ISO 9001 & AQTA',
    stat4Lbl: 'Beynəlxalq Qida Təhlükəsizliyi'
  },
  services: {
    title: 'İxtisaslaşmış Qablaşdırma Xidmətlərimiz',
    subtitle: 'İstər hazır paket, istər avtomat xətlər üçün rulon, istərsə də ekoloji həllər — ən yüksək standartla təqdim edirik.',
    items: [
      {
        id: 'srv-1',
        title: 'Hazır Paketlər',
        icon: 'package',
        desc: 'Doypack, Quadro, 3 tərəfli tikişli, qulplu və alt körüklü hazır paketlərin istehsalı.',
        features: 'Doypack ziperli paketlər\n3 tərəfli hermetik tikiş\nTermoyapışqanlı qulplar'
      },
      {
        id: 'srv-2',
        title: 'Bobin & Rulon Filmlər',
        icon: 'disc',
        desc: 'Avtomatik qablaşdırma dəzgahları üçün yüksək sürətli, yırtılmaya davamlı polimer lentlər.',
        features: '300 m/dəq yüksək sürətli çap\nSolventsiz 3 qatlı laminasiya\nDəqiq milimetrik dilimləmə'
      },
      {
        id: 'srv-3',
        title: 'Ekoloji & Davamlı Həllər',
        icon: 'leaf',
        desc: 'Geri dönüşdürülə bilən, təbiətdə tez həll olan, gübrələşən və orqanik qaynaqlı PE qablaşdırmalar.',
        features: '100% Geri çevrilə bilən polimerlər\nOrqanik qaynaqlı bio-PE\nTəbiətdə tez həll olan qablaşdırma'
      },
      {
        id: 'srv-4',
        title: '8 Rəngli HD Flekso',
        icon: 'printer',
        desc: 'Avropa standartlı müasir çap maşınlarında canlı, dəqiq və qida üçün tam təhlükəsiz boyalarla çap.',
        features: 'Mərkəzi barabanlı Avropa avadanlığı\nCanlı və parlaq rənglər\nQida üçün təhlükəsiz sertifikatlı boyalar'
      }
    ],
    srv1Title: 'Hazır Paketlər',
    srv1Desc: 'Doypack, Quadro, 3 tərəfli tikişli, qulplu və alt körüklü hazır paketlərin istehsalı.',
    srv2Title: 'Bobin & Rulon Filmlər',
    srv2Desc: 'Avtomatik qablaşdırma dəzgahları üçün yüksək sürətli, yırtılmaya davamlı polimer lentlər.',
    srv3Title: 'Ekoloji & Davamlı Həllər',
    srv3Desc: 'Geri dönüşdürülə bilən, təbiətdə tez həll olan, gübrələşən və orqanik qaynaqlı PE qablaşdırmalar.',
    srv4Title: '8 Rəngli HD Flekso',
    srv4Desc: 'Avropa standartlı müasir çap maşınlarında canlı, dəqiq və qida üçün tam təhlükəsiz boyalarla çap.'
  },
  categories: {
    transport: {
      title: 'Nəqliyyat Qablaşdırması',
      tag: 'Sənaye & Logistika',
      desc: 'Yüklərin və məhsulların daşınması, logistika və anbarlanması üçün yüksək dartılmalı streç plyonkalar və qoruyucu lentlər.',
      image: 'assets/images/finplast_direction_transport.jpg'
    },
    consumer: {
      title: 'İstehlakçı Qablaşdırması',
      tag: 'Qida & Gündəlik Tələbat',
      desc: 'Qida, un məmulatları, çərəz və qənnadı üçün 3 qatlı laminasiyalı, yüksək baryerli Doypack və paketlər.',
      image: 'assets/images/finplast_direction_consumer.jpg'
    },
    chemical: {
      title: 'Kimyəvi & Texniki Həllər',
      tag: 'Tikinti & Texniki Polimer',
      desc: 'Sənaye tikintisi, polimer qatqılar, poliuretan/silikon mastikaları və xüsusi dözümlü qablaşdırma həlləri.',
      image: 'assets/images/finplast_direction_chemical.jpg'
    },
    labels: {
      title: 'Etiket & Şrink Həlləri',
      tag: 'Şüşə & PET Brendinqi',
      desc: 'Şüşə və içki qabları üçün 360° termo-şrink (shrink sleeve) plyonkaları, metallizə və özüyapışan etiket materialları.',
      image: 'assets/images/finplast_direction_labels.jpg'
    }
  },
  workflow: [
    { num: '01', title: 'Dizayn və Eskiz', desc: 'Müştərinin tələblərinə uyğun rəf cəlbediciliyi yüksək olan unikal eskiz və qrafik dizayn hazırlanır.' },
    { num: '02', title: 'Çapaqədərki & Qəlib', desc: 'Rəngayırma (color separation) və lazer texnologiyası ilə yüksək dəqiqlikli flekso çap qəlibləri hazırlanır.' },
    { num: '03', title: 'Ekstruziya', desc: 'Keyfiyyətli polimer xammaldan istənilən mikron qalınlığında möhkəm və elastik filmlər çəkilir.' },
    { num: '04', title: '8 Rəngli Flekso Çap', desc: 'Avropa istehsalı son model 8 rəngli mərkəzi barabanlı maşınlarda HD dəqiqliklə canlı çap icra edilir.' },
    { num: '05', title: '3 Qatlı Laminasiya', desc: 'İtaliya istehsalı solventsiz laminatorlarda qida üçün 100% təhlükəsiz çoxqatlı baryer strukturu qurulur.' },
    { num: '06', title: 'Dilimləmə & Kəsim', desc: 'Mikron dəqiqlikli bıçaqlarla avtomat xətlər üçün tələb olunan en ölçüsündə rulonlar kəsilir.' },
    { num: '07', title: 'Paketləmə & Forma', desc: 'Doypack, 3 tərəfli tikişli və ya qulplu hazır paketlər hermetik qaynaqla formalaşdırılır.' },
    { num: '08', title: 'Keyfiyyət Nəzarəti & Təhvil', desc: 'Laboratoriyada hava, nəm və mexaniki dözümlülük testindən keçən hazır məhsul müştəriyə çatdırılır.' }
  ],
  certificates: [
    {
      title: 'ISO 9001:2015 Beynəlxalq Keyfiyyət İdarəetmə Sistemi',
      type: 'İdarəetmə Sertifikatı',
      desc: 'Beynəlxalq akkreditasiyalı sertifikatlaşdırma orqanı tərəfindən verilmiş keyfiyyət menecmenti təsdiqi.',
      img: 'assets/images/FIN PLAST INTERNATIONAL LLC - 9001.jpg',
      doc: 'FIN PLAST INTERNATIONAL LLC - 9001.pdf'
    },
    {
      title: 'Gigiyenik Sertifikat (2026-2027)',
      type: 'Gigiyenik Təhlükəsizlik',
      desc: 'Azərbaycan Respublikası Səhiyyə Nazirliyi Respublika Gigiyena və Epidemiologiya Mərkəzi (17.07.2027-dək).',
      img: 'assets/images/cert_gigiyenik_2026.png',
      doc: 'assets/docs/Gigiyenik Sertifikat 2026.pdf'
    },
    {
      title: 'AQTA Dövlət Qeydiyyatı',
      type: 'Qida Təhlükəsizliyi Qeydiyyat Çıxarışı',
      desc: 'Azərbaycan Qida Təhlükəsizliyi Agentliyinin (AQTA) rəsmi qeydiyyat reyestri.',
      img: 'assets/images/FIN PLAST INTERNATIONAL LLC - 9001.jpg',
      doc: 'Qida Təhlükəsizlik Qeydiyyat.pdf'
    }
  ],
  contact: {
    companyName: 'Fin-Plast International MMC',
    phonePrimary: '+994 12 585 11 91',
    phoneSecondary: '+994 50 251 14 54',
    phoneExport1: '+994 51 252 21 39',
    phoneExport2: '+994 50 251 14 50',
    email: 'office@finplast.az',
    emailSales: 'sales@finplast.az',
    whatsapp: '994502511454',
    address: 'Sumqayıt şəhəri, Sülh küçəsi, İstehsalat Zonası, Azərbaycan',
    workHours: 'B.e. - Şənbə: 09:00 - 18:00 (İstehsalat 24/7)',
    footerCopy: '© 1998 - 2026 “Fin-Plast International” MMC. Bütün hüquqlar qorunur.'
  }
};

// Default Catalog Dataset
const defaultCatalogItems = [
  {
    id: 'finplast-transport-stretch',
    title: 'Finplast Super-Stretch 23µm Pallet Plyonkası',
    category: 'transport',
    badge: '300% Dartılma Elastikliyi',
    image: 'assets/images/finplast_direction_transport.jpg',
    desc: 'Avtomat və əl ilə qablaşdırma üçün 300% dartılma elastikliyinə və yüksək deşilmə müqavimətinə malik şəffaf polietilen streç film.',
    specs: ['Qalınlıq: 17 - 23 mikron', 'Material: 100% təmiz LLDPE', 'Dartılma: 300%-ə qədər elastiklik', 'İstifadə: Pallet və daşınma təhlükəsizliyi']
  },
  {
    id: 'finplast-shrink-film',
    title: 'Finplast Sənaye Termo-Şrink Plyonkası (Shrink Film Roll)',
    category: 'transport',
    badge: 'Yüksək Büzüşmə & Möhkəmlik',
    image: 'assets/images/products/finplast_shrink_film_roll.jpg',
    desc: 'Qrup qablaşdırma, içki kasetləri və sənaye mallarının termik büzüşmə ilə etibarlı fiksasiyası üçün çoxqatlı termo-şrink polietilen plyonka rulonu.',
    specs: ['Qalınlıq: 35 - 120 mikron', 'Material: 100% təmiz LDPE / LLDPE', 'Büzüşmə: Eninə 20-30%, Uzununa 60-75%', 'İstifadə: İçki blokları, şüşə/qutu kasetləri, sənaye bağlamaları']
  },
  {
    id: 'finplast-stretch-hood',
    title: 'Finplast Stretch Hood Pallet Qoruyucu Plyonkası',
    category: 'transport',
    badge: '5-Qat Co-Ex Stretch Hood',
    image: 'assets/images/products/finplast_stretch_hood_roll.jpg',
    desc: 'Avtomatlaşdırılmış xətlərdə altlıqların (palletlərin) 5 tərəfdən nəm, toz və atmosfer təsirlərindən monolit hermetik qorunması üçün yüksək elastikli Stretch Hood rulonları.',
    specs: ['Material: 5 Qatlı Koekstruziya EVA / LLDPE', 'Təyinat: Tikinti materialları, sement, kimya və logistika palletləri', 'Xüsusiyyət: İstilik tələb etməyən elastik büzüşmə, 100% hava və su keçirməzlik']
  },
  {
    id: 'finplast-polyethylene-lamination',
    title: 'Finplast Çoxqatlı Polietilen Laminasiya Plyonkası',
    category: 'transport',
    badge: 'Solventsiz Laminasiya Qatı',
    image: 'assets/images/products/finplast_polyethylene_lamination_roll.jpg',
    desc: 'Elastik qablaşdırma istehsalçıları üçün BOPP, PET və Alüminium folqa ilə solventsiz laminasiyaya yararlı xüsusi çoxqatlı polietilen film rulonları.',
    specs: ['Material: Multi-layer Co-Ex PE (Aşağı qaynaq temperaturlu hermetik astar)', 'Qalınlıq: 25 - 100 mikron', 'Tac emalı (Corona): 42-44 dyne/cm stabil yapışma', 'Uyğunluq: Qida və gigiyena üçün 100% sertifikatlı']
  },
  {
    id: 'finplast-flexo-rolls',
    title: 'Finplast Flekso Çap İstehsalat Rulonları',
    category: 'transport',
    badge: '8 Rəngli HD Flekso',
    image: 'assets/images/finplast_direction_transport.jpg',
    desc: 'Avtomatik qablaşdırma dəzgahları üçün yüksək sürətli, dəqiq və sabit çap olunmuş polimer sənaye rulonları.',
    specs: ['Genişlik: 1200 mm-ə qədər', 'Sürət: Dəqiqədə 300 metr stabil çap', 'Material: BOPP / CPP / PE']
  },
  {
    id: 'finplast-poly-pillow',
    title: 'Finplast Sənaye Polimer Yastıq Paketi',
    category: 'transport',
    badge: 'Sənaye Polimer',
    image: 'assets/images/products/finplast_poly_pillow.jpg',
    desc: 'Topdansatış və sənaye xammalının saxlanması üçün möhkəm tikişli polimer yastıq paket.',
    specs: ['Material: Koekstruziya LDPE/HDPE', 'Yükdaşıma: 25 kq-a qədər', 'Müqavimət: Nəm və toz sızdırmaz']
  },
  {
    id: 'finplast-silver-doypack',
    title: 'Finplast Gümüşü Yüksək Baryerli Doypack Zip-Lock',
    category: 'consumer',
    badge: 'Yüksək Baryer & Zip-Lock',
    image: 'assets/images/finplast_product_doypack.jpg',
    desc: 'Qida, qəhvə, çay və quru meyvələr üçün nəm və oksigen baryerli, təkrar bağlanan Zip-Lock kilidli dik duran gümüşü Doypack paket.',
    specs: ['Material: PET / AL / PE 3 Qat', 'Kilid: Təkrar bağlanan Zip-Lock', 'Qoruma: Nəm və oksigenə qarşı 100% baryer']
  },
  {
    id: 'finplast-rice-grain-bag',
    title: 'Finplast Şəffaf Pəncərəli Düyü və Taxıl Qablaşdırması',
    category: 'consumer',
    badge: 'Şəffaf Vitrin Pəncərəsi',
    image: 'assets/images/products/finplast_rice_grain_bag.jpg',
    desc: 'Düyü, paxlalılar, şəkər və dənli bitkilər üçün məhsulu aydın göstərən şəffaf pəncərəli, yan qatlı və zip-lock kilidli dayanıqlı qablaşdırma çantası.',
    specs: ['Material: 3 Qat BOPP / Met-PET / PE', 'Xüsusiyyət: Yüksək yükə və yırtılmaya dözümlü']
  },
  {
    id: 'finplast-mayo-spout-pouch',
    title: 'Finplast Qapaqlı Sous və Mayonez Doypack Paketi (Spout Pouch)',
    category: 'consumer',
    badge: 'Hermetik Plastik Qapaq & Spout',
    image: 'assets/images/products/finplast_mayo_spout_pouch.jpg',
    desc: 'Mayonez, ketçup, qatı souslar, püre və maye qidalar üçün asan tökülən künc qapaqlı (spoutlu) dik dayanan çoxqatlı yüksək baryerli Doypack.',
    specs: ['Material: PET / AL / PE və ya OPA / PE Çoxqatlı Laminasiya', 'Spout Qapaq: 8.5mm - 15mm diametrli sızdırmaz polimer qapaq', 'Baryer: Oksigen və yağ sızmasına qarşı 100% zəmanət']
  },
  {
    id: 'finplast-standup-white',
    title: 'Finplast White & Cyan Doypack Zip-Lock',
    category: 'consumer',
    badge: '3 Qat Baryer + Zip-Lock',
    image: 'assets/images/products/finplast_standup_pouch_white.jpg',
    desc: 'Qida, qəhvə, çay və quru meyvələr üçün nəm və oksigen baryerli dik duran ağ və açıq mavi Doypack.',
    specs: ['Material: PET / AL / PE 3 Qat', 'Kilid: Təkrar bağlanan Zip-Lock', 'Qoruma: Nəm və oksigenə qarşı 100% baryer']
  },
  {
    id: 'finplast-coffee-gusset',
    title: 'Finplast Side-Gusset Qəhvə və Çay Paketi',
    category: 'consumer',
    badge: 'Aroma Qoruyucu',
    image: 'assets/images/products/finplast_coffee_gusset.jpg',
    desc: 'Təbii qəhvə dənələri və elit çaylar üçün aromanı daxildə saxlayan 4 künclü yan qatlı paket.',
    specs: ['Material: Mat BOPP / Met-PET / PE', 'Klapan: Qaz buraxıcı deqazasiya klapanı']
  },
  {
    id: 'finplast-bread-clip',
    title: 'Finplast Çörək və Un Məmulatı Qablaşdırması',
    category: 'consumer',
    badge: 'Qida Təhlükəsizliyi ISO 22000',
    image: 'assets/images/products/finplast_bread_clip_pack.jpg',
    desc: 'Çörək və un məmulatlarının təravətini uzun müddət qoruyan, klipsli və naxışlı şəffaf polimer paket.',
    specs: ['Material: CPP Şəffaf və Çaplı', 'Xüsusiyyət: Nəfəs alan mikro-perforasiya']
  },
  {
    id: 'finplast-wet-wipes-flip',
    title: 'Finplast Qapaqlı Nəm Salfet Qablaşdırması',
    category: 'consumer',
    badge: 'Plastik Qapaqlı Klapan',
    image: 'assets/images/products/finplast_wet_wipes_flip.jpg',
    desc: 'Gigiyenik nəm salfetlərin mayesinin qurumasının qarşısını alan termo-hermetik qapaqlı paket.',
    specs: ['Material: PET / AL / PE Yüksək Baryer', 'Qapaq: Təkrar bağlanan sərt plastik klapan']
  },
  {
    id: 'finplast-pocket-wipes',
    title: 'Finplast Cib Ölçülü Nəm Salfet Paketi',
    category: 'consumer',
    badge: 'Kompakt Format',
    image: 'assets/images/products/finplast_pocket_wipes.jpg',
    desc: 'Gündəlik istifadə və cib formatı üçün yapışqanlı stikerli hermetik nəm salfet paketi.',
    specs: ['Material: PET / PE Yüksək Elastiklik', 'Klapan: Təkrar yapışan qoruyucu lent']
  },
  {
    id: 'finplast-flip-top',
    title: 'Finplast Klapanlı Gigiyenik Salfet Paketi',
    category: 'consumer',
    badge: 'Hermetik Baryer',
    image: 'assets/images/products/finplast_flip_top_wipes.jpg',
    desc: 'Uşaq və ailəvi nəm salfetləri üçün dözümlü, spirt və aromanı itirməyən çoxqatlı qablaşdırma.',
    specs: ['Material: 3 Qat Laminasiya', 'Xüsusiyyət: Sızdırmaz qaynaqlı kənarlar']
  },
  {
    id: 'finplast-wipe-white',
    title: 'Finplast Medikal & Sanitar Nəm Paket',
    category: 'consumer',
    badge: 'Antibakterial Mühafizə',
    image: 'assets/images/products/finplast_wipe_pack_white.jpg',
    desc: 'Tibbi və sanitar məqsədli dezinfeksiya salfetləri üçün antibakterial dözümlü qablaşdırma.',
    specs: ['Material: Spirtə davamlı xüsusi astar', 'Standart: Tibbi gigiyena standartı']
  },
  {
    id: 'finplast-sanitary',
    title: 'Finplast Hermetik Nəm Qablaşdırma',
    category: 'consumer',
    badge: 'Ultra-Sızdırmaz',
    image: 'assets/images/products/finplast_sanitary_pack.jpg',
    desc: 'Kozmetika və fərdi qulluq məhsulları üçün ultra-davamlı hermetik nəm paket.',
    specs: ['Material: Mat Finish PET / PE', 'Çap: 8 Rəngli HD Flekso']
  },
  {
    id: 'finplast-snack-pillow',
    title: 'Finplast Çips və Qəlyanaltı Yastıq Paketi',
    category: 'consumer',
    badge: 'Qaz Doldurma Uyğunluğu',
    image: 'assets/images/products/finplast_snack_pillow_chip.jpg',
    desc: 'Çips, qəlyanaltı və çərəzlərin xırçıltısını qoruyan azot qazı doldurulmasına uyğun yastıq paket.',
    specs: ['Material: Met-BOPP / PE', 'Baryer: Oksigen və işıq keçirməz daxili folqa']
  },
  {
    id: 'finplast-pillow-nuts',
    title: 'Finplast Fıstıq və Qovrulmuş Tum Paketi',
    category: 'consumer',
    badge: 'Yağ və Nəm Baryeri',
    image: 'assets/images/products/finplast_pillow_nuts.jpg',
    desc: 'Yağlı çərəz və qovrulmuş toxumların acılaşmasının qarşısını alan hermetik çoxqatlı paket.',
    specs: ['Material: OPP / Met-OPP / PE', 'Xüsusiyyət: Yağa davamlı daxili qat']
  },
  {
    id: 'finplast-crisp-bag',
    title: 'Finplast Çərəz və Qənnadı Paketi',
    category: 'consumer',
    badge: 'Parlaq Ağ & Mavi',
    image: 'assets/images/products/finplast_crisp_bag.jpg',
    desc: 'Quru meyvə, peçenye və qənnadı məhsulları üçün zərif ağ və göy Finplast dizaynlı paket.',
    specs: ['Material: 3 Qatlı Solventsiz Laminasiya', 'Çap: Yüksək dəqiqlikli HD flekso']
  },
  {
    id: 'finplast-duo-pouch',
    title: 'Finplast İkiqat Qoruyucu Qida Paketi',
    category: 'consumer',
    badge: 'Barkod & İzləmə Sistemi',
    image: 'assets/images/products/finplast_duo_pouch.jpg',
    desc: 'Pərakəndə satış və market şəbəkələri üçün ştrixkodlu, avtomatik qablaşdırmaya uyğun paket.',
    specs: ['Material: BOPP / CPP', 'Standart: ISO 22000 Qida Uyğunluğu']
  },
  {
    id: 'finplast-clear-window',
    title: 'Finplast Pəncərəli Şəffaf Qida Paketi',
    category: 'consumer',
    badge: 'Şəffaf Vitrin Qatı',
    image: 'assets/images/products/finplast_clear_window_bag.jpg',
    desc: 'Alıcının məhsulu birbaşa görməsini təmin edən şəffaf alt hissəli polimer paket.',
    specs: ['Material: Ultra-şəffaf CPP / PE', 'Görünüş: Yüksək optik şəffaflıq']
  },
  {
    id: 'finplast-snack-metallic',
    title: 'Finplast Metallizə Baryerli Qida Paketi',
    category: 'consumer',
    badge: 'Metallizə Qat',
    image: 'assets/images/products/finplast_snack_metallic.jpg',
    desc: 'Uzunömürlü quru ərzaq və dənli bitkilər üçün günəş şüalarından qoruyan metallizə paket.',
    specs: ['Material: PET / AL-FOIL / PE', 'Saxlama: 24 aya qədər təravət']
  },
  {
    id: 'finplast-family-pouch',
    title: 'Finplast Böyük Ailəvi Qida Paketi',
    category: 'consumer',
    badge: 'Böyük Həcm 1-2 kq',
    image: 'assets/images/products/finplast_family_pouch.jpg',
    desc: 'Un, dənli bitkilər, makaron və quru qidalar üçün böyük həcmli dayanıqlı paket.',
    specs: ['Material: Qalınlaşdırılmış PE / PET', 'Yükdaşıma: 3 kq-a qədər']
  },
  {
    id: 'finplast-premium-pouch',
    title: 'Finplast 4 Künclü Premium Doypack',
    category: 'consumer',
    badge: 'Premium Rəf Duruşu',
    image: 'assets/images/products/finplast_premium_pouch.jpg',
    desc: 'Supermarket rəflərində dik dayanan, 4 tərəfdən qaynaqlı estetik ağ-mavi qablaşdırma.',
    specs: ['Material: Mat Soft-Touch / AL / PE', 'Format: Stand-up Quad Seal']
  },
  {
    id: 'finplast-flowpack-wafer',
    title: 'Finplast Vafli və Şokolad Flow-Pack',
    category: 'consumer',
    badge: 'Yüksək Sürətli Flow-Pack',
    image: 'assets/images/products/finplast_flowpack_wafer.jpg',
    desc: 'Avtomat konveyer xətlərində dəqiqədə 500 ədəd sürətlə bükülən vafli və şirniyyat plyonkası.',
    specs: ['Material: Soyuq Yapışqanlı (Cold Seal) BOPP', 'Çap: 8 Rəngli HD Flekso']
  },
  {
    id: 'finplast-flowpack-snack',
    title: 'Finplast Biskvit və Şirniyyat Flow-Pack',
    category: 'consumer',
    badge: 'Hermetik İsti Qaynaq',
    image: 'assets/images/products/finplast_flowpack_snack.jpg',
    desc: 'Quru biskvit, pryanik və bulkalar üçün təravəti qoruyan hermetik bükmə plyonka.',
    specs: ['Material: Termoyapışan Coex OPP', 'Baryer: Rütubət keçirməz']
  },
  {
    id: 'finplast-confectionery-bar',
    title: 'Finplast Batonçik və Desert Paketi',
    category: 'consumer',
    badge: 'Kompakt Flow-Pack',
    image: 'assets/images/products/finplast_confectionery_bar.jpg',
    desc: 'Qoşa və tək batonçiklər, energetik bar və qənnadı üçün estetik qoruyucu qablaşdırma.',
    specs: ['Material: Metalik Parlaq CPP', 'Xüsusiyyət: Asan cırılan kənar dişlər']
  },
  {
    id: 'finplast-wafer-bar',
    title: 'Finplast Şokoladlı Batonçik Qablaşdırması',
    category: 'consumer',
    badge: 'Termo-Dayanıqlı',
    image: 'assets/images/products/finplast_wafer_bar.jpg',
    desc: 'İsti aylarda şokoladın əriməsinin və yağın sızmasının qarşısını alan çoxqatlı qablaşdırma.',
    specs: ['Material: 3 Qat BOPP / Met / PE', 'Görünüş: Parlaq Finplast Brandinqi']
  },
  {
    id: 'finplast-chemical-sealant',
    title: 'Finplast Poliuretan & Silikon Tikinti Mastikası',
    category: 'chemical',
    badge: 'Kimyəvi Dayanıqlıq',
    image: 'assets/images/finplast_direction_chemical.jpg',
    desc: 'Tikinti və sənaye kimyası üçün aqressiv maddələrə, təzyiqə və hava təsirlərinə davamlı polimer lülə kartricləri.',
    specs: ['Material: Yüksək sıxlıqlı HDPE / PP', 'Həcm: 310 ml standart lülə', 'Xüsusiyyət: Hermetik sızdırmaz porşen sistemi']
  },
  {
    id: 'finplast-technical-barrier',
    title: 'Finplast Sənaye Polimer Qatqı və Barrier Plyonkası',
    category: 'chemical',
    badge: 'Texniki Polimer',
    image: 'assets/images/maket.jpg',
    desc: 'Kimyəvi maddələrin, sənaye duzlarının və qranulların saxlanması üçün yüksək sıxlıqlı sənaye astarı.',
    specs: ['Material: Çoxqatlı Koekstruziya Polimer', 'Müqavimət: Turşu və qələvi mühitlərə davamlı']
  },
  {
    id: 'finplast-candy-packaging',
    title: 'Finplast Premium Qənnadı və Konfet Paketləri',
    category: 'confectionery',
    badge: '8 Rəng HD Flekso • Konfet',
    image: 'assets/images/products/finplast_candy_pouch.jpg',
    desc: 'Şokolad, karamel, konfet və unlu qənnadı məhsulları üçün 8 rəngli yüksək keyfiyyətli HD flekso çaplı Doypack və xüsusi hermetik paketlər.',
    specs: ['Material: Çoxqatlı Laminasiyalı BOPP / PE', 'Çap: 8 Rəngli Canlı HD Flekso & Mat/Parlaq Selektiv Lak']
  },
  {
    id: 'finplast-candy-wrappers',
    title: 'Finplast Şokolad və Konfet Kağızları (Twist & Flowpack)',
    category: 'confectionery',
    badge: 'Konfet Kağızları & Twist',
    image: 'assets/images/products/finplast_candy_wrappers.jpg',
    desc: 'Şokolad, praline, karamel və batonlar üçün formanı saxlayan twist-bükmə və axın tipli (flowpack) fərdi brend loqolu parlaq polimer bükümlər.',
    specs: ['Material: Twist BOPP / Metalize / Şəffaf Film', 'Çap: 8 Rəngli Parlaq Zər və UV Laklı Flekso Çap']
  },
  {
    id: 'finplast-water-bottles-sleeve',
    title: 'Finplast 360° Termo-Şrink Su və İçki Şüşəsi Qablaşdırması',
    category: 'labels',
    badge: '360° Su Şüşəsi Sleeve',
    image: 'assets/images/products/finplast_water_bottles_studio.jpg',
    desc: '0.5L, 0.7L və 1.0L plastik və PET mineral su şüşələri üçün formanı 360 dərəcə saran, kondensata və soyuğa dözümlü yüksək parlaqlı termo-şrink sleeve qablaşdırma.',
    specs: ['Material: PET-G / PVC Yüksək Şrink Dərəcəli Film', 'Çap: 8 Rəngli UV Laklı HD Flekso Çap']
  },
  {
    id: 'finplast-labels-shrink',
    title: 'Finplast 360° Termo-Şrink & Şüşə Etiketləri',
    category: 'labels',
    badge: '360° Şrink Sleeve',
    image: 'assets/images/finplast_direction_labels.jpg',
    desc: 'İçki, mineral su, süd və kosmetika qabları üçün formanı tam qucaqlayan canlı rəngli termo-şrink və özüyapışan etiketlər.',
    specs: ['Material: PET-G / PVC Şrink Film', 'Çap: 8 Rəngli UV Flekso', 'Xüsusiyyət: Nəmə, soyuğa və sürtünməyə dözümlü']
  },
  {
    id: 'finplast-dog-food-packaging',
    title: 'Finplast Dəstəkli Quru İt Yemi Paketi (15 kq)',
    category: 'petfood',
    badge: '15 kq Dəstəkli & Zip-Lock',
    image: 'assets/images/products/finplast_dog_food_bag.jpg',
    desc: 'İtlər üçün quru yemlərin 15 kq-a qədər daşınmasına yararlı, gücləndirilmiş plastik dəstəkli, qoxu və nəm sızdırmaz xüsusi zip-lock kilidli iri həcmli çoxqatlı paket.',
    specs: ['Material: Ağır Yükə Davamlı Koekstruziya Multi-Layer Laminasiya', 'Tutumu: 15 kq', 'Konstruksiya: Gücləndirilmiş üst daşıma qulpu']
  },
  {
    id: 'finplast-cat-food-packaging',
    title: 'Finplast Dəstəkli Quru Pişik Yemi Paketi (10 kq)',
    category: 'petfood',
    badge: '10 kq Qoxu Baryeri',
    image: 'assets/images/products/finplast_cat_food_bag.jpg',
    desc: 'Pişiklər üçün premium quru yemlərin təravətini, yağını və dadını aylarla qoruyan, daşıma dəstəkli və çoxqatlı qoruyucu baryerli paket.',
    specs: ['Material: PET / Met-PET / Gücləndirilmiş PE', 'Tutumu: 10 kq', 'Çap: 8 Rəngli Premium HD Flekso']
  },
  {
    id: 'finplast-pet-food-packaging',
    title: 'Finplast İt və Pişik Yemi Yekə Paketləri (10-15 kq)',
    category: 'petfood',
    badge: 'İt & Pişik Yemi Kolleksiyası',
    image: 'assets/images/products/finplast_pet_food.jpg',
    desc: 'Ev heyvanları (it və pişik) quru yemləri üçün 10-15 kq ağırlığa davamlı, qoxunu və təravəti daxildə saxlayan xüsusi möhkəm dəstəkli və zip-lock kilidli çoxqatlı baryer paketlər.',
    specs: ['Material: Ağır Yükə Davamlı Çoxqatlı Laminasiyalı Film', 'Tutumu: 5 kq, 10 kq, 15 kq və 20 kq']
  }
];

// Sample leads
const defaultLeads = [
  {
    id: 'lead-1',
    name: 'Rəşad Əliyev',
    company: 'AzGranata MMC',
    phone: '+994502223344',
    source: 'Finplast Doypack Zip-Lock',
    note: '50,000 ədəd Doypack üçün qiymət və çap müddəti istəyirik.',
    date: '2026-09-07 14:20',
    status: 'Yeni'
  },
  {
    id: 'lead-2',
    name: 'Elmir Qasımov',
    company: 'Sirab ASC',
    phone: '+994553334455',
    source: 'Kalkulyator (Şrink Etiket)',
    note: '0.5L PET şüşələr üçün 360 dərəcə termo-şrink sleeve sifarişi.',
    date: '2026-09-07 11:15',
    status: 'Əlaqə saxlanıldı'
  }
];

// ── Storage Helpers ──
function getStoredCMS() {
  const data = localStorage.getItem('finplast_site_cms');
  if (!data) {
    localStorage.setItem('finplast_site_cms', JSON.stringify(defaultSiteCMS));
    return defaultSiteCMS;
  }
  try {
    const parsed = JSON.parse(data);
    return Object.assign({}, defaultSiteCMS, parsed);
  } catch (e) {
    return defaultSiteCMS;
  }
}

function saveStoredCMS(cms) {
  localStorage.setItem('finplast_site_cms', JSON.stringify(cms));
}

function getStoredProducts() {
  const data = localStorage.getItem('finplast_catalog_items');
  if (!data) {
    localStorage.setItem('finplast_catalog_items', JSON.stringify(defaultCatalogItems));
    return defaultCatalogItems;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultCatalogItems;
  }
}

function saveStoredProducts(items) {
  localStorage.setItem('finplast_catalog_items', JSON.stringify(items));
}

function getStoredLeads() {
  const data = localStorage.getItem('finplast_leads');
  if (!data) {
    localStorage.setItem('finplast_leads', JSON.stringify(defaultLeads));
    return defaultLeads;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultLeads;
  }
}

function saveStoredLeads(leads) {
  localStorage.setItem('finplast_leads', JSON.stringify(leads));
}

// ── State ──
let siteCMS = defaultSiteCMS;
let products = [];
let leads = [];

// ── Document Ready ──
document.addEventListener('DOMContentLoaded', () => {
  siteCMS = getStoredCMS();
  products = getStoredProducts();
  leads = getStoredLeads();

  setupNavigation();
  setupTheme();
  setupLogout();
  setupImagePicker();

  // Initialize all CMS Sections
  loadHeroCMS();
  renderServicesCMS();
  renderCategoriesCMS();
  renderWorkflowCMS();
  renderCertificatesCMS();
  loadContactCMS();
  loadMediaGallery();

  // Initialize Products, Leads & Dashboard
  renderDashboard();
  renderProductsTable();
  renderLeadsTable();

  // Setup Form Submit Handlers
  setupCMSFormHandlers();
  setupBackupHandlers();

  if (window.lucide) window.lucide.createIcons();

  if (window.FinplastAPI && sessionStorage.getItem('finplast_access_token')) {
    window.FinplastAPI.me().then(() => Promise.all([window.FinplastAPI.adminLeads(), window.FinplastAPI.adminProducts()])).then(([remoteLeads, remoteProducts]) => {
      if (Array.isArray(remoteProducts) && remoteProducts.length) {
        products = remoteProducts.map(item => {
          const translation = item.translations.az || Object.values(item.translations)[0] || {};
          return { id: String(item.id), title: translation.title || item.slug, category: String(item.category_id || ''), badge: 'Finplast', image: item.image || '', desc: translation.description || '', specs: translation.specs || [] };
        });
        localStorage.setItem('finplast_catalog_items', JSON.stringify(products));
        renderProductsTable();
      }
      if (!Array.isArray(remoteLeads)) return;
      leads = remoteLeads.map(item => ({
        id: String(item.id), name: item.name, company: item.company, phone: item.phone,
        source: item.source, note: item.note, date: item.created_at, status: item.status === 'contacted' ? 'Əlaqə saxlanıldı' : item.status === 'completed' ? 'Tamamlandı' : 'Yeni'
      }));
      localStorage.setItem('finplast_leads', JSON.stringify(leads));
      renderLeadsTable();
      renderDashboard();
    }).catch(() => {
      sessionStorage.removeItem('finplast_admin_logged');
      localStorage.removeItem('finplast_admin_logged');
      window.location.replace('login.html');
    });
  }
});

// ── Logout ──
function setupLogout() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const finish = () => {
        sessionStorage.removeItem('finplast_admin_logged');
        localStorage.removeItem('finplast_admin_logged');
        window.location.replace('login.html');
      };
      if (window.FinplastAPI) window.FinplastAPI.logout().finally(finish);
      else finish();
    });
  }
}

// ── Dynamic Topbar Action Button Controller ──
function updateContextActionButton(viewId) {
  const btn = document.getElementById('contextActionButton') || document.getElementById('quickAddProductBtn');
  const txt = document.getElementById('contextActionText');
  const icon = document.getElementById('contextActionIcon');
  if (!btn) return;

  btn.onclick = null;

  switch (viewId) {
    case 'productsView':
    case 'dashboardView':
      if (txt) txt.textContent = 'Yeni Məhsul';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openProductModalForNew();
      break;

    case 'servicesCmsView':
      if (txt) txt.textContent = 'Yeni Xidmət';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openServiceModalForNew();
      break;

    case 'categoriesCmsView':
      if (txt) txt.textContent = 'Yeni İstiqamət';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openCategoryModalForNew();
      break;

    case 'workflowCmsView':
      if (txt) txt.textContent = 'Yeni Mərhələ';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openWorkflowModalForNew();
      break;

    case 'certificatesCmsView':
      if (txt) txt.textContent = 'Yeni Sertifikat';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openCertModalForNew();
      break;

    case 'mediaCmsView':
      if (txt) txt.textContent = 'Yeni Şəkil';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openAddMediaModal();
      break;

    case 'leadsView':
      if (txt) txt.textContent = 'Excel/CSV İxrac';
      if (icon) icon.setAttribute('data-lucide', 'download');
      btn.onclick = () => exportLeadsCSV();
      break;

    case 'heroCmsView':
      if (txt) txt.textContent = 'Hero-nu Saxla';
      if (icon) icon.setAttribute('data-lucide', 'save');
      btn.onclick = () => {
        const f = document.getElementById('heroCmsForm');
        if (f) f.requestSubmit();
      };
      break;

    case 'contactCmsView':
      if (txt) txt.textContent = 'Əlaqəni Saxla';
      if (icon) icon.setAttribute('data-lucide', 'save');
      btn.onclick = () => {
        const f = document.getElementById('contactCmsForm');
        if (f) f.requestSubmit();
      };
      break;

    case 'backupView':
      if (txt) txt.textContent = 'JSON Nüsxə';
      if (icon) icon.setAttribute('data-lucide', 'download');
      btn.onclick = () => {
        const b = document.getElementById('exportJsonBtn');
        if (b) b.click();
      };
      break;

    default:
      if (txt) txt.textContent = 'Yeni Məhsul';
      if (icon) icon.setAttribute('data-lucide', 'plus');
      btn.onclick = () => openProductModalForNew();
  }

  if (window.lucide) window.lucide.createIcons();
}

// ── Navigation & Views ──
function setupNavigation() {
  const menuItems = document.querySelectorAll('.sidebar-item');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const viewId = item.getAttribute('data-view');
      switchView(viewId);
    });
  });

  updateContextActionButton('dashboardView');
}

window.switchView = function(viewId) {
  document.querySelectorAll('.sidebar-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-view') === viewId);
  });

  document.querySelectorAll('.admin-view').forEach(v => {
    v.classList.toggle('active', v.id === viewId);
  });

  const titles = {
    dashboardView: 'Ümumi İcmal',
    productsView: 'Məhsul Kataloqunun İdarəsi',
    leadsView: 'Gələn Sifariş & Sorğular',
    heroCmsView: 'Hero & Əsas Şüarların İdarəsi',
    servicesCmsView: 'Xidmətlər və Flekso Həlləri',
    categoriesCmsView: '4 Əsas Biznes İstiqaməti',
    workflowCmsView: '8 İstehsalat Mərhələsi',
    certificatesCmsView: 'Sertifikatlar və Sənədlər',
    mediaCmsView: 'Media Kitabxanası & Şəkillər',
    contactCmsView: 'Əlaqə, Zavod & Footer',
    backupView: 'Ehtiyat Nüsxə & Bərpa'
  };

  const titleEl = document.getElementById('topbarViewTitle');
  if (titleEl && titles[viewId]) titleEl.textContent = titles[viewId];

  if (viewId === 'dashboardView') renderDashboard();
  if (viewId === 'productsView') renderProductsTable();
  if (viewId === 'leadsView') renderLeadsTable();
  if (viewId === 'heroCmsView') loadHeroCMS();
  if (viewId === 'servicesCmsView') renderServicesCMS();
  if (viewId === 'categoriesCmsView') renderCategoriesCMS();
  if (viewId === 'workflowCmsView') renderWorkflowCMS();
  if (viewId === 'certificatesCmsView') renderCertificatesCMS();
  if (viewId === 'mediaCmsView') loadMediaGallery();
  if (viewId === 'contactCmsView') loadContactCMS();

  updateContextActionButton(viewId);

  if (window.lucide) window.lucide.createIcons();
};

// ── Theme ──
function setupTheme() {
  const btn = document.getElementById('adminThemeToggle');
  const icon = document.getElementById('adminThemeIcon');
  const saved = localStorage.getItem('finplast_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('finplast_theme', next);
      if (icon) icon.setAttribute('data-lucide', next === 'dark' ? 'sun' : 'moon');
      if (window.lucide) window.lucide.createIcons();
    });
  }
}

// ── Dashboard ──
function renderDashboard() {
  products = getStoredProducts();
  leads = getStoredLeads();

  const totalProd = document.getElementById('dashTotalProducts');
  const totalLeads = document.getElementById('dashTotalLeads');
  const sideProd = document.getElementById('sidebarProductCount');
  const sideLeads = document.getElementById('sidebarLeadsCount');

  if (totalProd) totalProd.textContent = products.length;
  if (sideProd) sideProd.textContent = products.length;
  if (totalLeads) totalLeads.textContent = leads.length;
  if (sideLeads) sideLeads.textContent = leads.filter(l => l.status === 'Yeni').length;

  const recentBody = document.getElementById('dashRecentLeadsBody');
  if (recentBody) {
    if (leads.length === 0) {
      recentBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--admin-text-muted);">Hələ heç bir sorğu daxil olmayıb.</td></tr>`;
      return;
    }

    recentBody.innerHTML = leads.slice(0, 5).map(lead => `
      <tr>
        <td>
          <div style="font-weight:700;">${escapeHtml(lead.name)}</div>
          <div style="font-size:0.75rem; color:var(--admin-text-muted);">${escapeHtml(lead.company || 'Fərdi sifariş')}</div>
        </td>
        <td>
          <a href="tel:${escapeHtml(lead.phone)}" style="color:var(--admin-primary); text-decoration:none; font-weight:600;">
            ${escapeHtml(lead.phone)}
          </a>
        </td>
        <td style="max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          ${escapeHtml(lead.note || lead.source || '—')}
        </td>
        <td style="font-size:0.8rem; color:var(--admin-text-muted);">${lead.date || '—'}</td>
        <td>
          <span class="table-badge ${lead.status === 'Yeni' ? 'badge-blue' : (lead.status === 'Tamamlandı' ? 'badge-green' : 'badge-amber')}">
            ${lead.status}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" target="_blank" class="action-btn" title="WhatsApp ilə yaz" style="color:#10b981;">
              <i data-lucide="message-circle" style="width:16px;height:16px;"></i>
            </a>
            <button class="action-btn delete" onclick="deleteLead('${lead.id}')" title="Sil">
              <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
}

// ── 1. Hero CMS Loader ──
function loadHeroCMS() {
  siteCMS = getStoredCMS();
  const h = siteCMS.hero || defaultSiteCMS.hero;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('cmsHeroTag', h.tag);
  setVal('cmsHeroTitle', h.title);
  setVal('cmsHeroDesc', h.desc);
  setVal('cmsHeroImage', h.image);
  setVal('cmsStat1Val', h.stat1Val);
  setVal('cmsStat1Lbl', h.stat1Lbl);
  setVal('cmsStat2Val', h.stat2Val);
  setVal('cmsStat2Lbl', h.stat2Lbl);
  setVal('cmsStat3Val', h.stat3Val);
  setVal('cmsStat3Lbl', h.stat3Lbl);
  setVal('cmsStat4Val', h.stat4Val);
  setVal('cmsStat4Lbl', h.stat4Lbl);
}

// ── 2. Services CMS ──
function getServicesList() {
  siteCMS = getStoredCMS();
  if (siteCMS.services && Array.isArray(siteCMS.services.items) && siteCMS.services.items.length > 0) {
    return siteCMS.services.items;
  }
  return defaultSiteCMS.services.items;
}

function renderServicesCMS() {
  siteCMS = getStoredCMS();
  const s = siteCMS.services || defaultSiteCMS.services;
  const items = getServicesList();

  const titleInp = document.getElementById('cmsServicesTitle');
  const subInp = document.getElementById('cmsServicesSubtitle');
  if (titleInp) titleInp.value = s.title || defaultSiteCMS.services.title;
  if (subInp) subInp.value = s.subtitle || defaultSiteCMS.services.subtitle;

  const container = document.getElementById('adminServicesList');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--admin-text-muted);">Heç bir xidmət yoxdur. "Yeni Xidmət" düyməsinə klikləyərək əlavə edin.</div>`;
    return;
  }

  container.innerHTML = items.map((srv, idx) => {
    const featList = (srv.features || '').split('\n').map(f => f.trim()).filter(Boolean);
    return `
      <div style="background: var(--admin-bg); border: 1px solid var(--admin-border); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 12px; position: relative;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(0, 98, 255, 0.1); color: var(--admin-primary); display: flex; align-items: center; justify-content: center;">
            <i data-lucide="${escapeHtml(srv.icon || 'package')}" style="width: 22px; height: 22px;"></i>
          </div>
          <div class="action-btns">
            <button class="action-btn" onclick="openServiceModalForEdit(${idx})" title="Redaktə Et">
              <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="action-btn delete" onclick="deleteService(${idx})" title="Sil">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>

        <div>
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--admin-text); margin-bottom: 6px;">${escapeHtml(srv.title)}</h4>
          <p style="font-size: 0.84rem; color: var(--admin-text-muted); line-height: 1.5;">${escapeHtml(srv.desc)}</p>
        </div>

        ${featList.length > 0 ? `
          <ul style="list-style: none; padding: 0; margin-top: auto; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--admin-border); padding-top: 10px;">
            ${featList.map(f => `
              <li style="font-size: 0.78rem; color: var(--admin-text); display: flex; align-items: center; gap: 6px;">
                <i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i>
                <span>${escapeHtml(f)}</span>
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.openServiceModalForNew = function() {
  document.getElementById('serviceModalTitle').textContent = 'Yeni Xidmət Əlavə Et';
  document.getElementById('editServiceIndex').value = '-1';
  document.getElementById('editServiceTitle').value = '';
  document.getElementById('editServiceIcon').value = 'package';
  document.getElementById('editServiceDesc').value = '';
  document.getElementById('editServiceFeatures').value = '';
  document.getElementById('serviceModalOverlay').classList.add('open');
};

window.openServiceModalForEdit = function(idx) {
  const items = getServicesList();
  const srv = items[idx];
  if (!srv) return;

  document.getElementById('serviceModalTitle').textContent = 'Xidməti Redaktə Et';
  document.getElementById('editServiceIndex').value = String(idx);
  document.getElementById('editServiceTitle').value = srv.title || '';
  document.getElementById('editServiceIcon').value = srv.icon || 'package';
  document.getElementById('editServiceDesc').value = srv.desc || '';
  document.getElementById('editServiceFeatures').value = srv.features || '';
  document.getElementById('serviceModalOverlay').classList.add('open');
};

window.closeServiceModal = function() {
  document.getElementById('serviceModalOverlay').classList.remove('open');
};

window.deleteService = function(idx) {
  if (!confirm('Bu xidməti silmək istədiyinizdən əminsiniz?')) return;
  siteCMS = getStoredCMS();
  if (!siteCMS.services) siteCMS.services = { ...defaultSiteCMS.services };
  if (!Array.isArray(siteCMS.services.items)) siteCMS.services.items = [...defaultSiteCMS.services.items];
  siteCMS.services.items.splice(idx, 1);
  syncLegacyServices(siteCMS);
  saveStoredCMS(siteCMS);
  renderServicesCMS();
  showToast('Xidmət uğurla silindi!', 'success');
};

function syncLegacyServices(cms) {
  if (!cms.services || !Array.isArray(cms.services.items)) return;
  const items = cms.services.items;
  cms.services.srv1Title = items[0] ? items[0].title : '';
  cms.services.srv1Desc = items[0] ? items[0].desc : '';
  cms.services.srv2Title = items[1] ? items[1].title : '';
  cms.services.srv2Desc = items[1] ? items[1].desc : '';
  cms.services.srv3Title = items[2] ? items[2].title : '';
  cms.services.srv3Desc = items[2] ? items[2].desc : '';
  cms.services.srv4Title = items[3] ? items[3].title : '';
  cms.services.srv4Desc = items[3] ? items[3].desc : '';
}

// ── 3. Categories CMS ──
function renderCategoriesCMS() {
  siteCMS = getStoredCMS();
  const cats = siteCMS.categories || defaultSiteCMS.categories;
  const container = document.getElementById('adminCategoriesList');
  if (!container) return;

  const entries = Object.entries(cats);
  if (entries.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--admin-text-muted);">Heç bir biznes istiqaməti yoxdur. "Yeni İstiqamət" düyməsinə klikləyərək əlavə edin.</div>`;
    return;
  }

  container.innerHTML = entries.map(([key, cat]) => `
    <div style="background: var(--admin-bg); border: 1px solid var(--admin-border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="height: 140px; overflow: hidden; background: #fff; position: relative;">
        <img src="${cat.image || 'assets/images/finplast_direction_transport.jpg'}" alt="${escapeHtml(cat.title)}" style="width: 100%; height: 100%; object-fit: cover;" />
        <span class="table-badge badge-blue" style="position: absolute; top: 10px; left: 10px; background: rgba(0, 98, 255, 0.85); color: #fff; backdrop-filter: blur(4px);">
          ${escapeHtml(cat.tag || key)}
        </span>
      </div>
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--admin-text);">${escapeHtml(cat.title)}</h4>
            <span style="font-size: 0.72rem; color: var(--admin-text-muted); font-family: monospace;">Açar: ${escapeHtml(key)}</span>
          </div>
          <div class="action-btns">
            <button class="action-btn" onclick="openCategoryModalForEdit('${key}')" title="Redaktə Et">
              <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="action-btn delete" onclick="deleteCategory('${key}')" title="Sil">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>
        <p style="font-size: 0.82rem; color: var(--admin-text-muted); line-height: 1.4; margin-top: auto;">${escapeHtml(cat.desc)}</p>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.openCategoryModalForNew = function() {
  document.getElementById('categoryModalTitle').textContent = 'Yeni Biznes İstiqaməti Əlavə Et';
  document.getElementById('editCategoryOldKey').value = '';
  document.getElementById('editCategoryKey').value = '';
  document.getElementById('editCategoryKey').disabled = false;
  document.getElementById('editCategoryTitle').value = '';
  document.getElementById('editCategoryTag').value = '';
  document.getElementById('editCategoryImage').value = 'assets/images/finplast_direction_transport.jpg';
  document.getElementById('editCategoryDesc').value = '';
  document.getElementById('categoryModalOverlay').classList.add('open');
};

window.openCategoryModalForEdit = function(key) {
  siteCMS = getStoredCMS();
  const cats = siteCMS.categories || defaultSiteCMS.categories;
  const cat = cats[key];
  if (!cat) return;

  document.getElementById('categoryModalTitle').textContent = 'Biznes İstiqamətini Redaktə Et';
  document.getElementById('editCategoryOldKey').value = key;
  document.getElementById('editCategoryKey').value = key;
  document.getElementById('editCategoryKey').disabled = false;
  document.getElementById('editCategoryTitle').value = cat.title || '';
  document.getElementById('editCategoryTag').value = cat.tag || '';
  document.getElementById('editCategoryImage').value = cat.image || '';
  document.getElementById('editCategoryDesc').value = cat.desc || '';
  document.getElementById('categoryModalOverlay').classList.add('open');
};

window.closeCategoryModal = function() {
  document.getElementById('categoryModalOverlay').classList.remove('open');
};

window.deleteCategory = function(key) {
  if (!confirm(`"${key}" istiqamətini silmək istədiyinizdən əminsiniz?`)) return;
  siteCMS = getStoredCMS();
  if (siteCMS.categories && siteCMS.categories[key]) {
    delete siteCMS.categories[key];
    saveStoredCMS(siteCMS);
    renderCategoriesCMS();
    showToast('İstiqamət uğurla silindi!', 'success');
  }
};

// ── 4. Workflow CMS ──
function renderWorkflowCMS() {
  siteCMS = getStoredCMS();
  const list = siteCMS.workflow || defaultSiteCMS.workflow;
  const container = document.getElementById('adminWorkflowStagesList');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--admin-text-muted);">Heç bir istehsalat mərhələsi yoxdur. "Yeni Mərhələ" düyməsinə klikləyərək əlavə edin.</div>`;
    return;
  }

  container.innerHTML = list.map((stg, idx) => `
    <div style="background: var(--admin-bg); padding: 16px 20px; border-radius: 12px; border: 1px solid var(--admin-border); display: flex; align-items: center; justify-content: space-between; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
        <span style="font-size: 1.2rem; font-weight: 800; color: var(--admin-primary); background: rgba(0, 98, 255, 0.1); padding: 6px 14px; border-radius: 8px; font-family: monospace;">
          ${escapeHtml(stg.num)}
        </span>
        <div style="flex: 1;">
          <h4 style="font-size: 1rem; font-weight: 700; color: var(--admin-text); margin-bottom: 4px;">${escapeHtml(stg.title)}</h4>
          <p style="font-size: 0.85rem; color: var(--admin-text-muted); line-height: 1.4;">${escapeHtml(stg.desc)}</p>
        </div>
      </div>
      <div class="action-btns">
        <button class="action-btn" onclick="openWorkflowModalForEdit(${idx})" title="Redaktə Et">
          <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
        </button>
        <button class="action-btn delete" onclick="deleteWorkflowStage(${idx})" title="Sil">
          <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.openWorkflowModalForNew = function() {
  siteCMS = getStoredCMS();
  const list = siteCMS.workflow || defaultSiteCMS.workflow;
  const nextNum = String((list.length || 0) + 1).padStart(2, '0');

  document.getElementById('workflowModalTitle').textContent = 'Yeni İstehsal Mərhələsi Əlavə Et';
  document.getElementById('editWorkflowIndex').value = '-1';
  document.getElementById('editWorkflowNum').value = nextNum;
  document.getElementById('editWorkflowTitle').value = '';
  document.getElementById('editWorkflowDesc').value = '';
  document.getElementById('workflowModalOverlay').classList.add('open');
};

window.openWorkflowModalForEdit = function(idx) {
  siteCMS = getStoredCMS();
  const list = siteCMS.workflow || defaultSiteCMS.workflow;
  const stg = list[idx];
  if (!stg) return;

  document.getElementById('workflowModalTitle').textContent = 'Mərhələni Redaktə Et';
  document.getElementById('editWorkflowIndex').value = String(idx);
  document.getElementById('editWorkflowNum').value = stg.num || '';
  document.getElementById('editWorkflowTitle').value = stg.title || '';
  document.getElementById('editWorkflowDesc').value = stg.desc || '';
  document.getElementById('workflowModalOverlay').classList.add('open');
};

window.closeWorkflowModal = function() {
  document.getElementById('workflowModalOverlay').classList.remove('open');
};

window.deleteWorkflowStage = function(idx) {
  if (!confirm('Bu mərhələni silmək istədiyinizdən əminsiniz?')) return;
  siteCMS = getStoredCMS();
  if (!Array.isArray(siteCMS.workflow)) siteCMS.workflow = [...defaultSiteCMS.workflow];
  siteCMS.workflow.splice(idx, 1);
  siteCMS.workflow.forEach((stg, i) => {
    stg.num = String(i + 1).padStart(2, '0');
  });
  saveStoredCMS(siteCMS);
  renderWorkflowCMS();
  showToast('Mərhələ silindi və nömrələr yeniləndi!', 'success');
};

// ── 5. Certificates CMS ──
function renderCertificatesCMS() {
  siteCMS = getStoredCMS();
  const list = siteCMS.certificates || defaultSiteCMS.certificates;
  const container = document.getElementById('adminCertificatesList');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--admin-text-muted);">Heç bir sertifikat yoxdur. "Yeni Sertifikat" düyməsinə klikləyərək əlavə edin.</div>`;
    return;
  }

  container.innerHTML = list.map((cert, idx) => `
    <div style="background:var(--admin-bg); border:1px solid var(--admin-border); border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:10px; position: relative;">
      <div style="height:140px; border-radius:8px; overflow:hidden; background:#fff; display:flex; align-items:center; justify-content:center;">
        <img src="${cert.img || 'assets/images/FIN PLAST INTERNATIONAL LLC - 9001.jpg'}" alt="${escapeHtml(cert.title)}" style="max-height:100%; max-width:100%; object-fit:contain;" />
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span class="table-badge badge-green">${escapeHtml(cert.type || 'Sertifikat')}</span>
        <div class="action-btns">
          <button class="action-btn" onclick="openCertModalForEdit(${idx})" title="Redaktə Et">
            <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
          </button>
          <button class="action-btn delete" onclick="deleteCert(${idx})" title="Sil">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
      <h4 style="font-size:0.95rem; font-weight:700; color:var(--admin-text);">${escapeHtml(cert.title)}</h4>
      <p style="font-size:0.8rem; color:var(--admin-text-muted); line-height: 1.4;">${escapeHtml(cert.desc)}</p>
      ${cert.doc ? `
        <div style="margin-top:auto; font-size:0.75rem; color:var(--admin-primary); font-weight:600; display: flex; align-items: center; gap: 4px;">
          <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
          <span>${escapeHtml(cert.doc)}</span>
        </div>
      ` : ''}
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.openCertModalForNew = function() {
  document.getElementById('certModalTitle').textContent = 'Yeni Sertifikat Əlavə Et';
  document.getElementById('editCertIndex').value = '-1';
  document.getElementById('editCertTitle').value = '';
  document.getElementById('editCertType').value = 'Beynəlxalq Standart';
  document.getElementById('editCertImage').value = 'assets/images/FIN PLAST INTERNATIONAL LLC - 9001.jpg';
  document.getElementById('editCertDoc').value = '';
  document.getElementById('editCertDesc').value = '';
  document.getElementById('certModalOverlay').classList.add('open');
};

window.openCertModalForEdit = function(idx) {
  siteCMS = getStoredCMS();
  const list = siteCMS.certificates || defaultSiteCMS.certificates;
  const cert = list[idx];
  if (!cert) return;

  document.getElementById('certModalTitle').textContent = 'Sertifikatı Redaktə Et';
  document.getElementById('editCertIndex').value = String(idx);
  document.getElementById('editCertTitle').value = cert.title || '';
  document.getElementById('editCertType').value = cert.type || '';
  document.getElementById('editCertImage').value = cert.img || '';
  document.getElementById('editCertDoc').value = cert.doc || '';
  document.getElementById('editCertDesc').value = cert.desc || '';
  document.getElementById('certModalOverlay').classList.add('open');
};

window.closeCertModal = function() {
  document.getElementById('certModalOverlay').classList.remove('open');
};

window.deleteCert = function(idx) {
  if (!confirm('Bu sertifikatı silmək istədiyinizdən əminsiniz?')) return;
  siteCMS = getStoredCMS();
  if (!Array.isArray(siteCMS.certificates)) siteCMS.certificates = [...defaultSiteCMS.certificates];
  siteCMS.certificates.splice(idx, 1);
  saveStoredCMS(siteCMS);
  renderCertificatesCMS();
  showToast('Sertifikat uğurla silindi!', 'success');
};

// ── 6. Contact CMS Loader ──
function loadContactCMS() {
  siteCMS = getStoredCMS();
  const ct = siteCMS.contact || defaultSiteCMS.contact;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('cmsCompanyName', ct.companyName);
  setVal('cmsPhonePrimary', ct.phonePrimary);
  setVal('cmsPhoneSecondary', ct.phoneSecondary);
  setVal('cmsEmail', ct.email);
  setVal('cmsWhatsApp', ct.whatsapp);
  setVal('cmsAddress', ct.address);
  setVal('cmsWorkHours', ct.workHours);
  setVal('cmsFooterCopy', ct.footerCopy);
}

// ── 7. Media Gallery Loader ──
function loadMediaGallery() {
  const container = document.getElementById('adminMediaGalleryGrid');
  if (!container) return;

  container.innerHTML = availableMockupImages.map(src => {
    const filename = src.split('/').pop();
    return `
      <div style="background:var(--admin-bg); border:1px solid var(--admin-border); border-radius:10px; padding:10px; text-align:center; display:flex; flex-direction:column; gap:8px;">
        <div style="height:110px; background:#fff; border-radius:6px; overflow:hidden; display:flex; align-items:center; justify-content:center; padding:4px;">
          <img src="${src}" alt="${filename}" style="max-height:100%; max-width:100%; object-fit:contain;" loading="lazy" />
        </div>
        <span style="font-size:0.72rem; color:var(--admin-text); word-break:break-all; font-weight:600;">${filename}</span>
        <button class="topbar-btn" style="padding:4px 8px; font-size:0.72rem; justify-content:center;" onclick="copyImagePath('${src}')">
          <i data-lucide="copy" style="width:12px;height:12px;"></i> Kopyala
        </button>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.copyImagePath = function(path) {
  navigator.clipboard.writeText(path).then(() => {
    showToast('Fayl yolu kopyalandı: ' + path, 'info');
  }).catch(() => {
    prompt('Fayl yolunu kopyalayın:', path);
  });
};

window.openAddMediaModal = function() {
  document.getElementById('newMediaPath').value = '';
  document.getElementById('mediaModalOverlay').classList.add('open');
};

window.closeMediaModal = function() {
  document.getElementById('mediaModalOverlay').classList.remove('open');
};

// ── Leads CSV Exporter ──
window.exportLeadsCSV = function() {
  const leads = getStoredLeads();
  if (!leads.length) {
    showToast('İxrac ediləcək sifariş tapılmadı.', 'info');
    return;
  }
  let csv = 'Tarix,Ad,Sirket,Telefon,Menbe,Status,Qeydler\n';
  leads.forEach(l => {
    csv += `"${l.date || ''}","${(l.name||'').replace(/"/g, '""')}","${(l.company||'').replace(/"/g, '""')}","${l.phone||''}","${l.source||''}","${l.status||''}","${(l.note||'').replace(/"/g, '""')}"\n`;
  });
  const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finplast_sifarisler_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Sifarişlər Excel/CSV formatında yükləndi!', 'success');
};

// ── Form Handlers for All CMS Views ──
function setupCMSFormHandlers() {
  // Hero CMS
  const heroForm = document.getElementById('heroCmsForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      siteCMS.hero = {
        tag: document.getElementById('cmsHeroTag').value.trim(),
        title: document.getElementById('cmsHeroTitle').value.trim(),
        desc: document.getElementById('cmsHeroDesc').value.trim(),
        image: document.getElementById('cmsHeroImage').value.trim(),
        stat1Val: document.getElementById('cmsStat1Val').value.trim(),
        stat1Lbl: document.getElementById('cmsStat1Lbl').value.trim(),
        stat2Val: document.getElementById('cmsStat2Val').value.trim(),
        stat2Lbl: document.getElementById('cmsStat2Lbl').value.trim(),
        stat3Val: document.getElementById('cmsStat3Val').value.trim(),
        stat3Lbl: document.getElementById('cmsStat3Lbl').value.trim(),
        stat4Val: document.getElementById('cmsStat4Val').value.trim(),
        stat4Lbl: document.getElementById('cmsStat4Lbl').value.trim()
      };
      saveStoredCMS(siteCMS);
      showToast('Hero bölməsi və şüarlar uğurla yadda saxlanıldı!', 'success');
    });
  }

  // Services Header Form
  const srvHeaderForm = document.getElementById('servicesHeaderForm');
  if (srvHeaderForm) {
    srvHeaderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      if (!siteCMS.services) siteCMS.services = { ...defaultSiteCMS.services };
      siteCMS.services.title = document.getElementById('cmsServicesTitle').value.trim();
      siteCMS.services.subtitle = document.getElementById('cmsServicesSubtitle').value.trim();
      saveStoredCMS(siteCMS);
      showToast('Xidmətlər bölməsinin başlıqları yadda saxlanıldı!', 'success');
    });
  }

  // Service Edit Form Modal
  const srvEditForm = document.getElementById('serviceEditForm');
  if (srvEditForm) {
    srvEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      if (!siteCMS.services) siteCMS.services = { ...defaultSiteCMS.services };
      if (!Array.isArray(siteCMS.services.items)) siteCMS.services.items = [...defaultSiteCMS.services.items];

      const idx = parseInt(document.getElementById('editServiceIndex').value, 10);
      const srvData = {
        id: idx >= 0 && siteCMS.services.items[idx] ? siteCMS.services.items[idx].id : 'srv-' + Date.now(),
        title: document.getElementById('editServiceTitle').value.trim(),
        icon: document.getElementById('editServiceIcon').value,
        desc: document.getElementById('editServiceDesc').value.trim(),
        features: document.getElementById('editServiceFeatures').value.trim()
      };

      if (idx >= 0 && idx < siteCMS.services.items.length) {
        siteCMS.services.items[idx] = srvData;
        showToast('Xidmət yeniləndi!', 'success');
      } else {
        siteCMS.services.items.push(srvData);
        showToast('Yeni xidmət əlavə edildi!', 'success');
      }

      syncLegacyServices(siteCMS);
      saveStoredCMS(siteCMS);
      closeServiceModal();
      renderServicesCMS();
    });
  }

  // Category Edit Form Modal
  const catEditForm = document.getElementById('categoryEditForm');
  if (catEditForm) {
    catEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      if (!siteCMS.categories) siteCMS.categories = { ...defaultSiteCMS.categories };

      const oldKey = document.getElementById('editCategoryOldKey').value.trim();
      const newKey = document.getElementById('editCategoryKey').value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
      const catData = {
        title: document.getElementById('editCategoryTitle').value.trim(),
        tag: document.getElementById('editCategoryTag').value.trim(),
        image: document.getElementById('editCategoryImage').value.trim(),
        desc: document.getElementById('editCategoryDesc').value.trim()
      };

      if (oldKey && oldKey !== newKey) {
        delete siteCMS.categories[oldKey];
      }

      siteCMS.categories[newKey] = catData;
      saveStoredCMS(siteCMS);
      closeCategoryModal();
      renderCategoriesCMS();
      showToast('Biznes istiqaməti yadda saxlanıldı!', 'success');
    });
  }

  // Workflow Edit Form Modal
  const wfEditForm = document.getElementById('workflowEditForm');
  if (wfEditForm) {
    wfEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      if (!Array.isArray(siteCMS.workflow)) siteCMS.workflow = [...defaultSiteCMS.workflow];

      const idx = parseInt(document.getElementById('editWorkflowIndex').value, 10);
      const stageData = {
        num: document.getElementById('editWorkflowNum').value.trim(),
        title: document.getElementById('editWorkflowTitle').value.trim(),
        desc: document.getElementById('editWorkflowDesc').value.trim()
      };

      if (idx >= 0 && idx < siteCMS.workflow.length) {
        siteCMS.workflow[idx] = stageData;
        showToast('Mərhələ yeniləndi!', 'success');
      } else {
        siteCMS.workflow.push(stageData);
        showToast('Yeni mərhələ əlavə edildi!', 'success');
      }

      saveStoredCMS(siteCMS);
      closeWorkflowModal();
      renderWorkflowCMS();
    });
  }

  // Certificate Edit Form Modal
  const certEditForm = document.getElementById('certEditForm');
  if (certEditForm) {
    certEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      if (!Array.isArray(siteCMS.certificates)) siteCMS.certificates = [...defaultSiteCMS.certificates];

      const idx = parseInt(document.getElementById('editCertIndex').value, 10);
      const certData = {
        title: document.getElementById('editCertTitle').value.trim(),
        type: document.getElementById('editCertType').value.trim(),
        img: document.getElementById('editCertImage').value.trim(),
        doc: document.getElementById('editCertDoc').value.trim(),
        desc: document.getElementById('editCertDesc').value.trim()
      };

      if (idx >= 0 && idx < siteCMS.certificates.length) {
        siteCMS.certificates[idx] = certData;
        showToast('Sertifikat yeniləndi!', 'success');
      } else {
        siteCMS.certificates.push(certData);
        showToast('Yeni sertifikat əlavə edildi!', 'success');
      }

      saveStoredCMS(siteCMS);
      closeCertModal();
      renderCertificatesCMS();
    });
  }

  // Media Add Form Modal
  const mediaForm = document.getElementById('mediaAddForm');
  if (mediaForm) {
    mediaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const path = document.getElementById('newMediaPath').value.trim();
      if (!path) return;
      if (!availableMockupImages.includes(path)) {
        availableMockupImages.unshift(path);
      }
      closeMediaModal();
      loadMediaGallery();
      showToast('Şəkil media kitabxanasına əlavə edildi!', 'success');
    });
  }

  // Contact CMS
  const ctForm = document.getElementById('contactCmsForm');
  if (ctForm) {
    ctForm.addEventListener('submit', (e) => {
      e.preventDefault();
      siteCMS = getStoredCMS();
      siteCMS.contact = {
        companyName: document.getElementById('cmsCompanyName').value.trim(),
        phonePrimary: document.getElementById('cmsPhonePrimary').value.trim(),
        phoneSecondary: document.getElementById('cmsPhoneSecondary').value.trim(),
        email: document.getElementById('cmsEmail').value.trim(),
        whatsapp: document.getElementById('cmsWhatsApp').value.trim(),
        address: document.getElementById('cmsAddress').value.trim(),
        workHours: document.getElementById('cmsWorkHours').value.trim(),
        footerCopy: document.getElementById('cmsFooterCopy').value.trim()
      };
      saveStoredCMS(siteCMS);
      showToast('Əlaqə məlumatları və footer yadda saxlanıldı!', 'success');
    });
  }

  // Products CRUD Form
  const prodForm = document.getElementById('productEditForm');
  if (prodForm) {
    prodForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      products = getStoredProducts();

      const editId = document.getElementById('editProductId').value.trim();
      const title = document.getElementById('editTitle').value.trim();
      const category = document.getElementById('editCategory').value;
      const badge = document.getElementById('editBadge').value.trim();
      const image = document.getElementById('editImage').value.trim();
      const desc = document.getElementById('editDesc').value.trim();
      const specsRaw = document.getElementById('editSpecs').value.trim();
      const specs = specsRaw ? specsRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

      const apiProduct = {
        slug: editId || 'finplast-' + Date.now(),
        category_id: null,
        image: image || availableMockupImages[0],
        is_active: true,
        is_featured: false,
        translations: { az: { title: title, description: desc, specs: specs } }
      };
      let savedRemotely = false;
      if (window.FinplastAPI) {
        try {
          if (editId && /^\d+$/.test(editId)) await window.FinplastAPI.adminUpdateProduct(editId, apiProduct);
          else await window.FinplastAPI.adminCreateProduct(apiProduct);
          savedRemotely = true;
        } catch (err) {}
      }

      if (editId) {
        const item = products.find(p => p.id === editId);
        if (item) {
          item.title = title;
          item.category = category;
          item.badge = badge;
          item.image = image;
          item.desc = desc;
          item.specs = specs;
          showToast('Məhsul uğurla yeniləndi!', 'success');
        }
      } else {
        const newId = 'finplast-' + Date.now();
        products.unshift({
          id: newId,
          title,
          category,
          badge: badge || 'Yeni Məhsul',
          image: image || availableMockupImages[0],
          desc,
          specs
        });
        showToast('Yeni məhsul kataloqa əlavə edildi!', 'success');
      }

      saveStoredProducts(products);
      closeProductModal();
      renderProductsTable();
      renderDashboard();
    });
  }

  const searchInput = document.getElementById('adminProductSearch');
  if (searchInput) searchInput.addEventListener('input', () => renderProductsTable());
  const catFilter = document.getElementById('adminProductCategoryFilter');
  if (catFilter) catFilter.addEventListener('change', () => renderProductsTable());
}

// ── Products Table ──
function renderProductsTable() {
  products = getStoredProducts();
  const tbody = document.getElementById('adminProductsTableBody');
  const searchInput = document.getElementById('adminProductSearch');
  const catFilter = document.getElementById('adminProductCategoryFilter');
  if (!tbody) return;

  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cat = catFilter ? catFilter.value : 'all';

  const filtered = products.filter(p => {
    const matchesCat = cat === 'all' || p.category === cat;
    const matchesQ = !q || p.title.toLowerCase().includes(q) || (p.badge && p.badge.toLowerCase().includes(q)) || p.id.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--admin-text-muted);">Axtarışa uyğun heç bir məhsul tapılmadı.</td></tr>`;
    return;
  }

  const categoryLabels = {
    consumer: 'İstehlakçı & Qida',
    transport: 'Nəqliyyat & Sənaye',
    chemical: 'Kimyəvi Həllər',
    labels: 'Etiket & Şrink'
  };

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div class="table-product-cell">
          <img src="${encodeURI(p.image)}" alt="${escapeHtml(p.title)}" class="table-product-img" />
          <div class="table-product-info">
            <h4>${escapeHtml(p.title)}</h4>
            <span>SKU: ${p.id}</span>
          </div>
        </div>
      </td>
      <td>
        <span class="table-badge badge-blue">${categoryLabels[p.category] || p.category}</span>
      </td>
      <td>
        <span style="font-size:0.82rem; font-weight:600; color:var(--admin-text);">${escapeHtml(p.badge || '—')}</span>
      </td>
      <td>
        <div style="font-size:0.78rem; color:var(--admin-text-muted); max-width:280px;">
          ${p.specs ? p.specs.slice(0, 2).map(s => escapeHtml(s)).join('<br>') : '—'}
        </div>
      </td>
      <td>
        <div class="action-btns">
          <a href="product.html?id=${p.id}" target="_blank" class="action-btn" title="Saytda Bax">
            <i data-lucide="external-link" style="width:16px;height:16px;"></i>
          </a>
          <button class="action-btn edit" onclick="openProductModalForEdit('${p.id}')" title="Redaktə Et">
            <i data-lucide="edit-3" style="width:16px;height:16px;"></i>
          </button>
          <button class="action-btn delete" onclick="deleteProduct('${p.id}')" title="Sil">
            <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function setupImagePicker() {
  const container = document.getElementById('quickImagePicker');
  const imgInput = document.getElementById('editImage');
  if (!container || !imgInput) return;

  container.innerHTML = availableMockupImages.slice(0, 21).map(src => `
    <img src="${src}" style="width:46px; height:46px; object-fit:contain; border-radius:8px; border:2px solid var(--admin-border); cursor:pointer; background:#fff; padding:2px;" 
         onclick="selectMockupImage('${src}')" title="Bu şəkli seç" />
  `).join('');
}

window.selectMockupImage = function(src) {
  const imgInput = document.getElementById('editImage');
  if (imgInput) imgInput.value = src;
  showToast('Şəkil seçildi: ' + src.split('/').pop(), 'info');
};

window.openProductModalForNew = function() {
  const modal = document.getElementById('productModalOverlay');
  const title = document.getElementById('productModalTitle');
  const form = document.getElementById('productEditForm');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('editProductId').value = '';
  document.getElementById('editImage').value = availableMockupImages[0];
  title.textContent = 'Yeni Finplast Məhsulu Əlavə Et';
  modal.classList.add('open');
};

window.openProductModalForEdit = function(id) {
  products = getStoredProducts();
  const item = products.find(p => p.id === id);
  if (!item) return;

  const modal = document.getElementById('productModalOverlay');
  const title = document.getElementById('productModalTitle');
  if (!modal) return;

  document.getElementById('editProductId').value = item.id;
  document.getElementById('editTitle').value = item.title;
  document.getElementById('editCategory').value = item.category;
  document.getElementById('editBadge').value = item.badge || '';
  document.getElementById('editImage').value = item.image;
  document.getElementById('editDesc').value = item.desc || '';
  document.getElementById('editSpecs').value = item.specs ? item.specs.join('\n') : '';

  title.textContent = 'Məhsulu Redaktə Et: ' + item.title;
  modal.classList.add('open');
};

window.closeProductModal = function() {
  const modal = document.getElementById('productModalOverlay');
  if (modal) modal.classList.remove('open');
};

window.deleteProduct = async function(id) {
  if (!confirm('Bu məhsulu kataloqdan tam silmək istədiyinizə əminsiniz?')) return;
  if (window.FinplastAPI && /^\d+$/.test(id)) {
    try { await window.FinplastAPI.adminDeleteProduct(id); } catch (error) { showToast('Məhsul serverdə silinə bilmədi.', 'error'); return; }
  }
  products = getStoredProducts();
  products = products.filter(p => p.id !== id);
  saveStoredProducts(products);
  renderProductsTable();
  renderDashboard();
  showToast('Məhsul uğurla silindi!', 'success');
};

// ── Leads Table ──
function renderLeadsTable() {
  leads = getStoredLeads();
  const tbody = document.getElementById('adminLeadsTableBody');
  if (!tbody) return;

  if (leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:40px; color:var(--admin-text-muted);">Hələ heç bir sifariş və ya sorğu qeydə alınmayıb.</td></tr>`;
    return;
  }

  tbody.innerHTML = leads.map(l => `
    <tr>
      <td style="font-size:0.8rem; color:var(--admin-text-muted);">${l.date || '—'}</td>
      <td>
        <div style="font-weight:700;">${escapeHtml(l.name)}</div>
        <div style="font-size:0.75rem; color:var(--admin-text-muted);">${escapeHtml(l.company || 'Fərdi')}</div>
      </td>
      <td>
        <a href="tel:${escapeHtml(l.phone)}" style="font-weight:700; color:var(--admin-primary); text-decoration:none;">
          ${escapeHtml(l.phone)}
        </a>
      </td>
      <td style="font-size:0.82rem; font-weight:600;">
        ${escapeHtml(l.source || 'Veb sayt')}
      </td>
      <td style="max-width:240px; font-size:0.82rem; color:var(--admin-text-muted);">
        ${escapeHtml(l.note || '—')}
      </td>
      <td>
        <select onchange="updateLeadStatus('${l.id}', this.value)" style="padding:4px 8px; border-radius:6px; font-size:0.75rem; border:1px solid var(--admin-border); background:var(--admin-card-bg); color:var(--admin-text);">
          <option value="Yeni" ${l.status === 'Yeni' ? 'selected' : ''}>Yeni</option>
          <option value="Əlaqə saxlanıldı" ${l.status === 'Əlaqə saxlanıldı' ? 'selected' : ''}>Əlaqə saxlanıldı</option>
          <option value="Tamamlandı" ${l.status === 'Tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
        </select>
      </td>
      <td>
        <div class="action-btns">
          <a href="https://wa.me/${l.phone.replace(/[^0-9]/g, '')}" target="_blank" class="action-btn" title="WhatsApp-da cavabla" style="color:#10b981;">
            <i data-lucide="message-circle" style="width:16px;height:16px;"></i>
          </a>
          <button class="action-btn delete" onclick="deleteLead('${l.id}')" title="Sil">
            <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.updateLeadStatus = async function(id, newStatus) {
  const statusMap = { 'Yeni': 'new', 'Əlaqə saxlanıldı': 'contacted', 'Tamamlandı': 'completed' };
  if (window.FinplastAPI && /^\d+$/.test(id)) {
    try { await window.FinplastAPI.adminUpdateLeadStatus(id, statusMap[newStatus] || 'new'); } catch (error) { showToast('Status serverdə yenilənmədi.', 'error'); return; }
  }
  leads = getStoredLeads();
  const item = leads.find(l => l.id === id);
  if (item) {
    item.status = newStatus;
    saveStoredLeads(leads);
    showToast('Sorğu statusu yeniləndi: ' + newStatus, 'info');
    renderDashboard();
  }
};

window.deleteLead = async function(id) {
  if (!confirm('Bu sorğunu silmək istəyirsiniz?')) return;
  if (window.FinplastAPI && /^\d+$/.test(id)) {
    try { await window.FinplastAPI.adminDeleteLead(id); } catch (error) { showToast('Sorğu serverdə silinə bilmədi.', 'error'); return; }
  }
  leads = getStoredLeads();
  leads = leads.filter(l => l.id !== id);
  saveStoredLeads(leads);
  renderLeadsTable();
  renderDashboard();
  showToast('Sorğu silindi!', 'success');
};

// ── Backup Handlers ──
function setupBackupHandlers() {
  const exportCsvBtn = document.getElementById('exportLeadsCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      leads = getStoredLeads();
      if (leads.length === 0) {
        showToast('İxrac üçün heç bir sorğu yoxdur.', 'info');
        return;
      }
      let csvContent = 'data:text/csv;charset=utf-8,ID,Tarix,Müştəri,Şirkət,Telefon,Məhsul/Mənbə,Qeyd,Status\n';
      leads.forEach(l => {
        csvContent += `"${l.id}","${l.date || ''}","${l.name}","${l.company || ''}","${l.phone}","${l.source || ''}","${(l.note || '').replace(/"/g, '""')}","${l.status}"\n`;
      });
      const link = document.createElement('a');
      link.setAttribute('href', encodeURI(csvContent));
      link.setAttribute('download', `finplast_leads_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Sorğular CSV formatında yükləndi!', 'success');
    });
  }

  const exportJsonBtn = document.getElementById('exportJsonBtn');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const backupData = {
        siteCMS: getStoredCMS(),
        catalogItems: getStoredProducts(),
        leads: getStoredLeads(),
        exportedAt: new Date().toISOString()
      };
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const link = document.createElement('a');
      link.setAttribute('href', dataStr);
      link.setAttribute('download', `finplast_universal_cms_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Bütün saytın CMS bazası JSON formatında yükləndi!', 'success');
    });
  }

  const importInput = document.getElementById('importJsonInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.siteCMS) saveStoredCMS(imported.siteCMS);
          if (imported.catalogItems && Array.isArray(imported.catalogItems)) saveStoredProducts(imported.catalogItems);
          if (imported.leads && Array.isArray(imported.leads)) saveStoredLeads(imported.leads);

          loadHeroCMS();
          loadServicesCMS();
          loadCategoriesCMS();
          loadWorkflowCMS();
          loadCertificatesCMS();
          loadContactCMS();
          renderDashboard();
          renderProductsTable();
          renderLeadsTable();
          showToast('Bütün saytın kontenti JSON faylından uğurla bərpa edildi!', 'success');
        } catch (err) {
          showToast('Fayl oxunarkən xəta baş verdi!', 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  const resetBtn = document.getElementById('resetDefaultsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Bütün sayt mətnlərini, şəkillərini və məhsullarını ilkin vəziyyətinə qaytarmaq istəyirsiniz?')) {
        localStorage.removeItem('finplast_site_cms');
        localStorage.removeItem('finplast_catalog_items');
        siteCMS = getStoredCMS();
        products = getStoredProducts();
        loadHeroCMS();
        loadServicesCMS();
        loadCategoriesCMS();
        loadWorkflowCMS();
        loadContactCMS();
        renderDashboard();
        renderProductsTable();
        showToast('Bütün sayt məlumatları ilkin standartlara sıfırlandı!', 'success');
      }
    });
  }
}

// ── Toast Helper ──
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconName = type === 'success' ? 'check-circle' : (type === 'error' ? 'alert-triangle' : 'info');
  toast.innerHTML = `
    <i data-lucide="${iconName}" style="width:18px;height:18px;"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Close Modals on Backdrop Click & ESC Key ──
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});
