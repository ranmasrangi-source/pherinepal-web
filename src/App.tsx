import React, { useEffect, useMemo, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  ShieldCheck,
  Compass,
  MapPin,
  Mountain,
  Sparkles,
  Building2,
  FileCheck2,
  PhoneCall,
  Globe,
  LogIn,
  LogOut,
  Search,
  Star,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Ticket,
  BookOpen,
  X,
  Home,
  ChevronDown,
  Heart,
  Calendar,
  Camera,
  Download,
} from 'lucide-react';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
  SUPER_ADMIN_EMAIL,
  validateFirestoreConnection,
} from './firebase';
import {
  EMERGENCY_DIRECTORY,
  NEPAL_77_DISTRICTS,
  NEPAL_PROVINCES,
  OFFICIAL_LANGUAGES,
  REVENUE_STREAM_BY_CATEGORY,
  ROLE_DEFINITIONS,
} from './data/nepal77Districts';
import { UI_TRANSLATIONS } from './data/i18nTranslations';
import {
  AuditLogEntry,
  BookingInquiryRecord,
  DistrictEntry,
  LanguageCode,
  PartnerKycRecord,
  PartnerListingRecord,
  ProvinceId,
  ServiceCategory,
  SupportCaseRecord,
  TravelerItineraryRecord,
  TravelerReviewRecord,
  UserRoleCode,
  VerificationStatus,
} from './types/pheriNepal';
import { NepalInteractiveMap } from './components/NepalInteractiveMap';
import { AiTripPlannerSection } from './components/AiTripPlannerSection';
import { PartnerWorkspaceSection } from './components/PartnerWorkspaceSection';
import { AdminGovernanceConsole } from './components/AdminGovernanceConsole';
import { BlueprintGovernancePortal } from './components/BlueprintGovernancePortal';

type ActiveTab =
  | 'DISCOVER'
  | 'DISTRICTS_77'
  | 'AI_PLANNER'
  | 'TRAVELER_PORTAL'
  | 'PARTNER_DESK'
  | 'ADMIN_CONSOLE'
  | 'BLUEPRINTS_12';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('DISCOVER');
  const [language, setLanguage] = useState<LanguageCode>('L01');
  const [languageNotice, setLanguageNotice] = useState<string | null>(null);

  // Interactive Destination Corridor Command View & Top Navigation Dropdown Menus
  const [activeCorridorDistrict, setActiveCorridorDistrict] =
    useState<DistrictEntry | null>(null);
  const [activeNavMenu, setActiveNavMenu] = useState<
    'DISCOVER' | 'BEFORE' | 'DURING' | 'AFTER' | null
  >(null);
  const [showHeroSearchResults, setShowHeroSearchResults] = useState<boolean>(false);
  const [targetProvinceForTools, setTargetProvinceForTools] =
    useState<ProvinceId>('PR-04');
  const [targetDistrictForTools, setTargetDistrictForTools] =
    useState<string>('Kaski');

  // Auth & Role State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<UserRoleCode>('U01');
  const [authReady, setAuthReady] = useState<boolean>(false);

  // Discovery Filters
  const [selectedProvinceId, setSelectedProvinceId] = useState<ProvinceId | 'ALL'>('ALL');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'ALL'>('ALL');
  const [verifiedOnlyFilter, setVerifiedOnlyFilter] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Live Firestore State
  const [firestoreListings, setFirestoreListings] = useState<PartnerListingRecord[]>([]);
  const [partnerKycList, setPartnerKycList] = useState<PartnerKycRecord[]>([]);
  const [travelerInquiries, setTravelerInquiries] = useState<BookingInquiryRecord[]>([]);
  const [partnerInquiries, setPartnerInquiries] = useState<BookingInquiryRecord[]>([]);
  const [adminAllInquiries, setAdminAllInquiries] = useState<BookingInquiryRecord[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<TravelerItineraryRecord[]>([]);
  const [reviews, setReviews] = useState<TravelerReviewRecord[]>([]);
  const [supportCases, setSupportCases] = useState<SupportCaseRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Inquiry Modal State (M06)
  const [activeInquiryListing, setActiveInquiryListing] =
    useState<PartnerListingRecord | null>(null);
  const [inquiryStartDate, setInquiryStartDate] = useState<string>('2026-10-15');
  const [inquiryEndDate, setInquiryEndDate] = useState<string>('2026-10-20');
  const [inquiryGroupSize, setInquiryGroupSize] = useState<number>(2);
  const [inquiryPhone, setInquiryPhone] = useState<string>('+977-98');
  const [inquiryNotes, setInquiryNotes] = useState<string>(
    'Please confirm availability, TIMS/permit requirements, and pickup details.'
  );
  const [submittingInquiry, setSubmittingInquiry] = useState<boolean>(false);
  const [toastBanner, setToastBanner] = useState<string | null>(null);

  // Review & Support Form State
  const [reviewListingId, setReviewListingId] = useState<string>('');
  const [reviewVcvCode, setReviewVcvCode] = useState<string>('VCV-PN-2026');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [supportSubject, setSupportSubject] = useState<string>('');
  const [supportCategory, setSupportCategory] = useState<
    'EmergencyRouting' | 'InquiryDelay' | 'KycDispute' | 'SafetyConcern' | 'GeneralSupport'
  >('EmergencyRouting');
  const [supportPriority, setSupportPriority] = useState<'Critical' | 'High' | 'Normal'>('High');
  const [supportProvince, setSupportProvince] = useState<string>('PR-01');
  const [supportDistrict, setSupportDistrict] = useState<string>('Solukhumbu');
  const [supportDescription, setSupportDescription] = useState<string>('');

  const isNe = language === 'L02';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.L01;
  const isSuperAdminUser =
    Boolean(currentUser?.emailVerified) &&
    currentUser?.email === SUPER_ADMIN_EMAIL;

  // Validate connection to Firestore on startup
  useEffect(() => {
    validateFirestoreConnection();
  }, []);

  // Auth listener & User Profile bootstrap (/users/{uid} + /users/{uid}/private/info)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        setUserRole('U01');
        setAuthReady(true);
        return;
      }

      const defaultRole: UserRoleCode =
        user.email === SUPER_ADMIN_EMAIL ? 'U09' : 'U02';

      try {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || user.email?.split('@')[0] || 'Traveler',
            roleCode: defaultRole,
            accountStatus: 'Active',
            preferredLanguage: 'L01',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          const privRef = doc(db, 'users', user.uid, 'private', 'info');
          await setDoc(privRef, {
            uid: user.uid,
            email: user.email || 'traveler@pherinepal.org.np',
            phone: '',
            nationality: 'Nepal / International',
            emergencyContact: 'Tourist Police 1144',
            updatedAt: serverTimestamp(),
          });
          setUserRole(defaultRole);
        } else {
          const data = snap.data();
          setUserRole((data.roleCode as UserRoleCode) || defaultRole);
        }
      } catch (err) {
        console.error('Profile sync info:', err);
        setUserRole(defaultRole);
      } finally {
        setAuthReady(true);
      }
    });
    return () => unsub();
  }, []);

  // Live Firestore subscription for genuine partner-submitted listings (Zero pre-verified dummy seed listings)
  useEffect(() => {
    if (!authReady) return;

    const publishedQuery = query(
      collection(db, 'partner_listings'),
      where('listingStatus', '==', 'Published')
    );

    const unsubListings = onSnapshot(
      publishedQuery,
      async (snapshot) => {
        const docs: PartnerListingRecord[] = [];
        const legacySeedIdsToPurge: string[] = [];

        snapshot.forEach((d) => {
          const record = d.data() as PartnerListingRecord;
          const isLegacySeed =
            d.id.startsWith('pn-listing-') ||
            (typeof record.ownerUid === 'string' && record.ownerUid.startsWith('seed-'));

          if (isLegacySeed) {
            legacySeedIdsToPurge.push(d.id);
          } else {
            docs.push(record);
          }
        });

        setFirestoreListings(docs);

        // If Super Admin is signed in, permanently delete any old pre-seeded documents from Firestore
        if (isSuperAdminUser && legacySeedIdsToPurge.length > 0) {
          for (const seedId of legacySeedIdsToPurge) {
            try {
              await deleteDoc(doc(db, 'partner_listings', seedId));
            } catch (e) {
              console.error('Purge legacy seed listing info:', e);
            }
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'partner_listings');
      }
    );

    const publishedReviewsQuery = query(
      collection(db, 'traveler_reviews'),
      where('moderationStatus', '==', 'Published')
    );
    const unsubReviews = onSnapshot(
      publishedReviewsQuery,
      (snapshot) => {
        const list: TravelerReviewRecord[] = [];
        snapshot.forEach((d) => list.push(d.data() as TravelerReviewRecord));
        setReviews(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'traveler_reviews');
      }
    );

    return () => {
      unsubListings();
      unsubReviews();
    };
  }, [authReady, isSuperAdminUser]);

  // Authenticated User Subscriptions (Inquiries, Itineraries, KYC, Support, Audit)
  useEffect(() => {
    if (!authReady || !currentUser) {
      setTravelerInquiries([]);
      setPartnerInquiries([]);
      setAdminAllInquiries([]);
      setSavedItineraries([]);
      setPartnerKycList([]);
      setSupportCases([]);
      setAuditLogs([]);
      return;
    }

    const uid = currentUser.uid;
    const unsubs: Array<() => void> = [];

    // 1. Traveler's own inquiries
    const travInqQuery = query(
      collection(db, 'booking_inquiries'),
      where('travelerUid', '==', uid)
    );
    unsubs.push(
      onSnapshot(
        travInqQuery,
        (snap) => {
          const arr: BookingInquiryRecord[] = [];
          snap.forEach((d) => arr.push(d.data() as BookingInquiryRecord));
          setTravelerInquiries(arr);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'booking_inquiries')
      )
    );

    // 2. Partner's incoming inquiries
    const partInqQuery = query(
      collection(db, 'booking_inquiries'),
      where('partnerUid', '==', uid)
    );
    unsubs.push(
      onSnapshot(
        partInqQuery,
        (snap) => {
          const arr: BookingInquiryRecord[] = [];
          snap.forEach((d) => arr.push(d.data() as BookingInquiryRecord));
          setPartnerInquiries(arr);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'booking_inquiries')
      )
    );

    // 3. Traveler's saved itineraries
    const itinQuery = query(
      collection(db, 'traveler_itineraries'),
      where('ownerUid', '==', uid)
    );
    unsubs.push(
      onSnapshot(
        itinQuery,
        (snap) => {
          const arr: TravelerItineraryRecord[] = [];
          snap.forEach((d) => arr.push(d.data() as TravelerItineraryRecord));
          setSavedItineraries(arr);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'traveler_itineraries')
      )
    );

    // 4. Partner's own KYC records (or all KYC if Super Admin)
    const kycQuery = isSuperAdminUser
      ? query(collection(db, 'partner_kyc'))
      : query(collection(db, 'partner_kyc'), where('partnerUid', '==', uid));
    unsubs.push(
      onSnapshot(
        kycQuery,
        (snap) => {
          const arr: PartnerKycRecord[] = [];
          snap.forEach((d) => arr.push(d.data() as PartnerKycRecord));
          setPartnerKycList(arr);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'partner_kyc')
      )
    );

    // 5. Support Cases
    const supportQuery = isSuperAdminUser
      ? query(collection(db, 'support_cases'))
      : query(collection(db, 'support_cases'), where('reporterUid', '==', uid));
    unsubs.push(
      onSnapshot(
        supportQuery,
        (snap) => {
          const arr: SupportCaseRecord[] = [];
          snap.forEach((d) => arr.push(d.data() as SupportCaseRecord));
          setSupportCases(arr);
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'support_cases')
      )
    );

    // 6. Super Admin Global Queries (All Inquiries & Audit Logs)
    if (isSuperAdminUser) {
      unsubs.push(
        onSnapshot(
          query(collection(db, 'booking_inquiries')),
          (snap) => {
            const arr: BookingInquiryRecord[] = [];
            snap.forEach((d) => arr.push(d.data() as BookingInquiryRecord));
            setAdminAllInquiries(arr);
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'booking_inquiries')
        )
      );

      unsubs.push(
        onSnapshot(
          query(collection(db, 'audit_logs')),
          (snap) => {
            const arr: AuditLogEntry[] = [];
            snap.forEach((d) => arr.push(d.data() as AuditLogEntry));
            setAuditLogs(arr);
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'audit_logs')
        )
      );
    }

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [authReady, currentUser, isSuperAdminUser]);

  // Pure live Firestore listings (Zero pre-verified dummy seed listings)
  const combinedListings = useMemo(() => {
    return firestoreListings;
  }, [firestoreListings]);

  // Keep reviewListingId synced with the first real listing when available
  useEffect(() => {
    if (
      combinedListings.length > 0 &&
      !combinedListings.some((l) => l.id === reviewListingId)
    ) {
      setReviewListingId(combinedListings[0].id);
    } else if (combinedListings.length === 0 && reviewListingId !== '') {
      setReviewListingId('');
    }
  }, [combinedListings, reviewListingId]);

  const listingCountsByProvince = useMemo(() => {
    const counts: Record<string, number> = {};
    NEPAL_PROVINCES.forEach((p) => (counts[p.id] = 0));
    combinedListings.forEach((l) => {
      if (l.verificationStatus === 'Verified') {
        counts[l.provinceId] = (counts[l.provinceId] || 0) + 1;
      }
    });
    return counts;
  }, [combinedListings]);

  const totalVerifiedCount = useMemo(
    () => combinedListings.filter((l) => l.verificationStatus === 'Verified').length,
    [combinedListings]
  );

  const totalPendingCount = useMemo(
    () => combinedListings.filter((l) => l.verificationStatus === 'Pending').length,
    [combinedListings]
  );

  const filteredListings = useMemo(() => {
    return combinedListings.filter((item) => {
      if (selectedProvinceId !== 'ALL' && item.provinceId !== selectedProvinceId) {
        return false;
      }
      if (
        selectedDistrictFilter !== 'ALL' &&
        item.districtName.toLowerCase() !== selectedDistrictFilter.toLowerCase()
      ) {
        return false;
      }
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }
      if (verifiedOnlyFilter && item.verificationStatus !== 'Verified') {
        return false;
      }
      if (searchTerm.trim().length > 0) {
        const q = searchTerm.trim().toLowerCase();
        const matches =
          item.titleEn.toLowerCase().includes(q) ||
          item.titleNe.toLowerCase().includes(q) ||
          item.districtName.toLowerCase().includes(q) ||
          item.municipality.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.summaryEn.toLowerCase().includes(q) ||
          item.summaryNe.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [
    combinedListings,
    selectedProvinceId,
    selectedDistrictFilter,
    selectedCategory,
    verifiedOnlyFilter,
    searchTerm,
  ]);

  // Multi-Language & Alias-Aware 77-District Search Engine
  const matchingSearchDistricts = useMemo(() => {
    const raw = searchTerm.trim().toLowerCase();
    if (!raw) {
      return NEPAL_77_DISTRICTS.filter((d) =>
        ['Kaski', 'Solukhumbu', 'Kathmandu', 'Mustang', 'Chitwan', 'Rupandehi'].includes(
          d.nameEn
        )
      );
    }

    const aliasMap: Record<string, string[]> = {
      Kaski: [
        'pokhara',
        'pokhra',
        'pkr',
        'phewa',
        'fewa',
        'lakeside',
        'sarangkot',
        'annapurna',
        'abc',
        'mardi',
        'ghandruk',
        'begnas',
        'पोखरा',
        'फेवा',
        'अन्नपूर्ण',
        'कास्की',
      ],
      Solukhumbu: [
        'everest',
        'everst',
        'ebc',
        'sagarmatha',
        'khumbu',
        'lukla',
        'namche',
        'gokyo',
        'mera',
        'tengboche',
        'सगरमाथा',
        'एभरेष्ट',
        'लुक्ला',
        'नाम्चे',
        'सोलुखुम्बु',
      ],
      Kathmandu: [
        'ktm',
        'kathmandu',
        'katmandu',
        'thamel',
        'pashupatinath',
        'pashupati',
        'boudhanath',
        'boudha',
        'swayambhu',
        'durbar',
        'heritage',
        'काठमाडौँ',
        'काठमाडौं',
        'पशुपतिनाथ',
        'बौद्ध',
        'स्वयम्भू',
        'ठमेल',
      ],
      Mustang: [
        'mustang',
        'muktinath',
        'jomsom',
        'kagbeni',
        'lo manthang',
        'upper mustang',
        'marpha',
        'मुस्ताङ',
        'मुक्तिनाथ',
        'जोमसोम',
      ],
      Chitwan: [
        'chitwan',
        'sauraha',
        'safari',
        'rhino',
        'jungle',
        'narayani',
        'चितवन',
        'सौराहा',
      ],
      Rupandehi: [
        'lumbini',
        'buddha',
        'maya devi',
        'bhairahawa',
        'butwal',
        'लुम्बिनी',
        'बुद्ध',
        'रुपन्देही',
      ],
      Mugu: ['rara', 'rara lake', 'रारा', 'मुगु'],
      Rasuwa: ['langtang', 'gosaikunda', 'kyanjin', 'लाङटाङ', 'गोसाइँकुण्ड', 'रसुवा'],
      Gorkha: ['manaslu', 'tsum', 'gorkha', 'मनास्लु', 'गोरखा'],
      Manang: ['manang', 'tilicho', 'thorong', 'मनाङ', 'तिलिचो'],
      Myagdi: ['poon hill', 'ghorepani', 'tatopani', 'dhaulagiri', 'म्याग्दी', 'पुनहिल'],
      Lalitpur: ['patan', 'lalitpur', 'पाटन', 'ललितपुर'],
      Bhaktapur: ['bhaktapur', 'nagarkot', 'bhadgaon', 'भक्तपुर', 'नगरकोट'],
      Dhanusha: ['janakpur', 'janaki', 'जनकपुर', 'जानकी', 'धनुषा'],
      Ilam: ['ilam', 'illam', 'kanyam', 'tea', 'antudada', 'इलाम', 'कन्याम'],
      Taplejung: ['pathibhara', 'kanchenjunga', 'ताप्लेजुङ', 'पाथीभरा', 'कञ्चनजङ्घा'],
      Tanahun: ['bandipur', 'दमौली', 'बन्दीपुर', 'तनहुँ'],
      Bardiya: ['bardiya', 'bardia', 'tiger', 'बर्दिया'],
      Dolpa: ['dolpa', 'dolpo', 'phoksundo', 'shey', 'डोल्पा', 'फोक्सुण्डो'],
      Doti: ['khaptad', 'खप्तड', 'डोटी'],
    };

    const genericTourismTerms = [
      'hotel',
      'resort',
      'homestay',
      'lodge',
      'guide',
      'trek',
      'trekking',
      'tour',
      'nepal',
      'mountain',
      'lake',
      'temple',
      'होटल',
      'होमस्टे',
      'गाइड',
      'पदयात्रा',
      'ट्रेकिङ',
      'नेपाल',
    ];
    if (genericTourismTerms.includes(raw)) {
      return NEPAL_77_DISTRICTS.filter((d) => d.tier === 'Tier A');
    }

    return NEPAL_77_DISTRICTS.filter((d) => {
      const prov = NEPAL_PROVINCES.find((p) => p.id === d.provinceId);
      const aliases = aliasMap[d.nameEn] || [];
      const matchesAlias = aliases.some(
        (a) => a.includes(raw) || raw.includes(a)
      );
      const matchesProvince =
        prov &&
        (prov.nameEn.toLowerCase().includes(raw) ||
          prov.nameNe.toLowerCase().includes(raw) ||
          prov.id.toLowerCase() === raw);

      return (
        matchesAlias ||
        Boolean(matchesProvince) ||
        d.id.toLowerCase() === raw ||
        d.nameEn.toLowerCase().includes(raw) ||
        raw.includes(d.nameEn.toLowerCase()) ||
        d.nameNe.toLowerCase().includes(raw) ||
        d.headquartersEn.toLowerCase().includes(raw) ||
        d.headquartersNe.toLowerCase().includes(raw) ||
        d.keyHighlightsEn.some((h) => h.toLowerCase().includes(raw)) ||
        d.keyHighlightsNe.some((h) => h.toLowerCase().includes(raw)) ||
        d.permitsRequired.some((p) => p.toLowerCase().includes(raw))
      );
    });
  }, [searchTerm]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setToastBanner(
        isNe
          ? 'सफलतापूर्वक साइन-इन भयो! वास्तविक Firestore खाता सक्रिय छ।'
          : 'Signed in with Google! Live Firestore session active.'
      );
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setToastBanner(isNe ? 'साइन-आउट सम्पन्न भयो।' : 'Signed out.');
  };

  const handleRoleSwitch = async (targetRole: 'U02' | 'U03') => {
    if (!currentUser) {
      await handleGoogleSignIn();
      return;
    }
    if (isSuperAdminUser) {
      setUserRole(targetRole);
      return;
    }
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        roleCode: targetRole,
        updatedAt: serverTimestamp(),
      });
      setUserRole(targetRole);
      setToastBanner(`Active workspace switched to ${ROLE_DEFINITIONS[targetRole].labelEn}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  const handleLanguageChange = (code: LanguageCode) => {
    const entry = OFFICIAL_LANGUAGES.find((l) => l.code === code);
    if (!entry) return;
    setLanguage(code);
    setLanguageNotice(null);
    const pack = UI_TRANSLATIONS[code] || UI_TRANSLATIONS.L01;
    setToastBanner(
      `${entry.code} (${entry.nameEn} • ${entry.nativeName}) — ${pack.heroHeadlinePrefix} ${pack.heroHeadlineHighlight}`
    );
  };

  const openCorridorCommandByDistrictName = (districtNameEn: string) => {
    const found =
      NEPAL_77_DISTRICTS.find(
        (d) => d.nameEn.toLowerCase() === districtNameEn.toLowerCase()
      ) || NEPAL_77_DISTRICTS[0];
    setSelectedProvinceId(found.provinceId);
    setSelectedDistrictFilter(found.nameEn);
    setTargetProvinceForTools(found.provinceId);
    setTargetDistrictForTools(found.nameEn);
    setActiveCorridorDistrict(found);
    setActiveNavMenu(null);
  };

  const handleOpenAiPlannerForDistrict = (
    provinceId: ProvinceId,
    districtNameEn: string
  ) => {
    setTargetProvinceForTools(provinceId);
    setTargetDistrictForTools(districtNameEn);
    setActiveCorridorDistrict(null);
    setActiveNavMenu(null);
    setShowHeroSearchResults(false);
    setActiveTab('AI_PLANNER');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPartnerDeskForDistrict = (
    provinceId: ProvinceId,
    districtNameEn: string
  ) => {
    setTargetProvinceForTools(provinceId);
    setTargetDistrictForTools(districtNameEn);
    setActiveCorridorDistrict(null);
    setActiveNavMenu(null);
    setShowHeroSearchResults(false);
    setActiveTab('PARTNER_DESK');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadCorridorSurvivalPack = (dist: DistrictEntry) => {
    const prov = NEPAL_PROVINCES.find((p) => p.id === dist.provinceId);
    const content = `========================================================================
PHERI NEPAL — OFFLINE CORRIDOR & SAFETY SURVIVAL PACK (FR-033 / DC-017)
Tagline: Discover Nepal. Travel with Confidence. Return Again.
========================================================================
Corridor / District: ${dist.nameEn} (${dist.nameNe}) — ID: ${dist.id}
Province: ${dist.provinceId} ${prov ? `${prov.nameEn} (${prov.nameNe})` : ''}
Headquarters: ${dist.headquartersEn} (${dist.headquartersNe})
Readiness Tier: ${dist.tier}
Maximum Altitude Profile: ${dist.maxAltitudeMeters}m (${
      dist.maxAltitudeMeters >= 3000
        ? 'AI-009 High-Altitude Guardrail ACTIVE: <=500m/day sleeping elevation gain above 3,000m'
        : 'Standard Elevation Corridor'
    })
Realistic Nepal Mountain Road Speed: ${dist.highwaySpeedKmh} km/h
Best Travel Seasons: ${dist.bestSeasons.join(', ')}

MANDATORY PERMITS & CHECKPOINTS:
- ${dist.permitsRequired.join('\n- ')}

SIGNATURE CORRIDOR HIGHLIGHTS:
- EN: ${dist.keyHighlightsEn.join(' • ')}
- NE: ${dist.keyHighlightsNe.join(' • ')}

24/7 EMERGENCY & RESCUE DIRECTORY (CACHE OFFLINE):
- Local Corridor Emergency Hub: ${dist.emergencyHubEn}
- Nepal Tourist Police 24/7 Hotline: 1144 / +977-1-4247041
- Nepal Police Emergency Control: 100
- Himalayan Rescue Association (HRA): +977-1-4440292
- NTB Crisis Cell: +977-1-4256909

DC-017 STATUTORY DISCLAIMER:
Emergency contacts, elevation limits, and road speeds are informational for offline
preparedness. Always contact Nepal Tourist Police (1144) or HRA directly during emergencies.
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PHERI-NEPAL-${dist.nameEn}-Corridor-Survival-Pack.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToastBanner(
      `Downloaded Offline Corridor Survival Pack (FR-033) for ${dist.nameEn} (${dist.nameNe})!`
    );
  };

  // M06 Submit Inquiry-First Booking Request with Anti-Leakage VCV Code
  const handleSubmitBookingInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      await handleGoogleSignIn();
      return;
    }
    if (!activeInquiryListing) return;

    setSubmittingInquiry(true);
    const inquiryId = `inq-${Date.now()}`;
    const vcvRandom = Math.random().toString(36).substring(2, 6).toUpperCase();
    const vcvCode = `VCV-${activeInquiryListing.provinceId.replace('PR-0', 'P')}-${vcvRandom}`;

    const stream = REVENUE_STREAM_BY_CATEGORY[activeInquiryListing.category] || {
      code: 'R01',
      ratePercent: 10,
    };
    const quotedTotalNpr =
      Number(activeInquiryListing.priceNpr) * Math.max(1, Number(inquiryGroupSize));
    const expectedCommissionNpr = Math.round(
      (quotedTotalNpr * stream.ratePercent) / 100
    );

    try {
      await setDoc(doc(db, 'booking_inquiries', inquiryId), {
        id: inquiryId,
        travelerUid: currentUser.uid,
        travelerName: (
          currentUser.displayName ||
          currentUser.email?.split('@')[0] ||
          'Traveler'
        ).slice(0, 120),
        travelerEmail: (currentUser.email || 'traveler@pherinepal.org.np').slice(0, 160),
        travelerPhone: inquiryPhone.trim().slice(0, 40),
        partnerUid: activeInquiryListing.ownerUid,
        listingId: activeInquiryListing.id,
        listingTitle: activeInquiryListing.titleEn.slice(0, 160),
        listingCategory: activeInquiryListing.category,
        provinceId: activeInquiryListing.provinceId,
        districtName: activeInquiryListing.districtName.slice(0, 80),
        preferredStartDate: inquiryStartDate.slice(0, 40),
        preferredEndDate: inquiryEndDate.slice(0, 40),
        groupSize: Math.max(1, Math.min(100, Number(inquiryGroupSize))),
        travelerNotes: inquiryNotes.trim().slice(0, 1000),
        partnerResponseNotes: '',
        quotedTotalNpr,
        commissionRatePercent: stream.ratePercent,
        expectedCommissionNpr,
        revenueStreamCode: stream.code,
        vcvCode,
        inquiryStatus: 'Submitted',
        arrangementStatus: 'Pending',
        paymentStatus: 'Inactive',
        commissionStatus: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setActiveInquiryListing(null);
      setToastBanner(
        `Inquiry Submitted to Firestore! Anti-Leakage Verified Check-In Voucher: ${vcvCode} (PaymentStatus: Inactive)`
      );
      setActiveTab('TRAVELER_PORTAL');
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.CREATE,
        `booking_inquiries/${inquiryId}`
      );
    } finally {
      setSubmittingInquiry(false);
    }
  };

  // Partner creates listing + isolated KYC submission (Strictly starts VerificationStatus = Pending, 0 reviews)
  const handleCreatePartnerListingAndKyc = async (
    listingPayload: Omit<
      PartnerListingRecord,
      | 'id'
      | 'ownerUid'
      | 'verificationStatus'
      | 'listingStatus'
      | 'isFeatured'
      | 'isSponsored'
      | 'ratingAvg'
      | 'reviewCount'
    >,
    kycPayload: {
      businessLegalName: string;
      authorityName:
        | 'DOT'
        | 'NTB'
        | 'TAAN'
        | 'NMA'
        | 'CompanyRegistrar'
        | 'LocalMunicipality';
      licenseNumber: string;
      panVatNumber: string;
      licenseExpiryDate: string;
      contactPhone: string;
      contactEmail: string;
      documentSummary: string;
    }
  ) => {
    if (!currentUser) return;
    const listingId = `lst-${Date.now()}`;
    const kycId = `kyc-${Date.now()}`;

    try {
      await setDoc(doc(db, 'partner_listings', listingId), {
        ...listingPayload,
        titleEn: listingPayload.titleEn.slice(0, 160),
        titleNe: listingPayload.titleNe.slice(0, 160),
        summaryEn: listingPayload.summaryEn.slice(0, 1200),
        summaryNe: listingPayload.summaryNe.slice(0, 1200),
        municipality: listingPayload.municipality.slice(0, 100),
        registrationNumber: listingPayload.registrationNumber.slice(0, 80),
        panVatNumber: listingPayload.panVatNumber.slice(0, 80),
        permitsRequired: listingPayload.permitsRequired.slice(0, 300),
        imageUrl: listingPayload.imageUrl.slice(0, 500),
        id: listingId,
        ownerUid: currentUser.uid,
        verificationStatus: 'Pending',
        listingStatus: 'Published',
        isFeatured: false,
        isSponsored: false,
        ratingAvg: 0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await setDoc(doc(db, 'partner_kyc', kycId), {
        ...kycPayload,
        businessLegalName: kycPayload.businessLegalName.slice(0, 160),
        licenseNumber: kycPayload.licenseNumber.slice(0, 80),
        panVatNumber: kycPayload.panVatNumber.slice(0, 80),
        contactPhone: kycPayload.contactPhone.slice(0, 40),
        contactEmail: kycPayload.contactEmail.slice(0, 160),
        documentSummary: kycPayload.documentSummary.slice(0, 600),
        id: kycId,
        listingId,
        partnerUid: currentUser.uid,
        verificationStatus: 'Pending',
        reviewerNotes: 'Awaiting U05 Verification Officer inspection (<= 48h SLA).',
        reviewedByUid: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.CREATE,
        `partner_listings/${listingId}`
      );
    }
  };

  // Partner responds / confirms / declines inquiry
  const handleRespondToInquiry = async (
    inquiryId: string,
    action: 'Responded' | 'Confirmed' | 'Declined',
    responseNotes: string,
    quotedTotalNpr: number,
    commissionRatePercent: number
  ) => {
    const expectedCommissionNpr = Math.round(
      (Number(quotedTotalNpr) * Number(commissionRatePercent)) / 100
    );
    const arrangementStatus =
      action === 'Confirmed'
        ? 'ConfirmedByPartner'
        : action === 'Declined'
        ? 'Cancelled'
        : 'Pending';
    const commissionStatus =
      action === 'Confirmed'
        ? 'Eligible'
        : action === 'Declined'
        ? 'Waived'
        : 'Pending';

    try {
      await updateDoc(doc(db, 'booking_inquiries', inquiryId), {
        partnerResponseNotes: responseNotes.slice(0, 1000),
        quotedTotalNpr: Number(quotedTotalNpr),
        expectedCommissionNpr,
        inquiryStatus: action,
        arrangementStatus,
        commissionStatus,
        updatedAt: serverTimestamp(),
      });
      setToastBanner(
        `Inquiry ${inquiryId} updated to InquiryStatus=${action}, ArrangementStatus=${arrangementStatus}`
      );
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `booking_inquiries/${inquiryId}`
      );
    }
  };

  // Traveler cancels own non-terminal inquiry
  const handleTravelerCancelInquiry = async (inquiryId: string) => {
    try {
      await updateDoc(doc(db, 'booking_inquiries', inquiryId), {
        inquiryStatus: 'Cancelled',
        arrangementStatus: 'Cancelled',
        travelerNotes: 'Cancelled by traveler prior to check-in.',
        updatedAt: serverTimestamp(),
      });
      setToastBanner(`Inquiry ${inquiryId} cancelled.`);
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `booking_inquiries/${inquiryId}`
      );
    }
  };

  // Save AI Itinerary to Firestore
  const handleSaveItinerary = async (payload: {
    title: string;
    provinceId: string;
    durationDays: number;
    budgetTier: 'Budget' | 'Standard' | 'Comfort' | 'Luxury';
    maxElevationMeters: number;
    acclimatizationCompliant: boolean;
    permitsChecklist: string;
    planMarkdown: string;
  }) => {
    if (!currentUser) return;
    const id = `itin-${Date.now()}`;
    try {
      await setDoc(doc(db, 'traveler_itineraries', id), {
        id,
        ownerUid: currentUser.uid,
        title: payload.title.slice(0, 160),
        provinceId: payload.provinceId.slice(0, 20),
        durationDays: Math.max(1, Math.min(90, Number(payload.durationDays))),
        budgetTier: payload.budgetTier,
        maxElevationMeters: Math.max(50, Math.min(8849, Number(payload.maxElevationMeters))),
        acclimatizationCompliant: Boolean(payload.acclimatizationCompliant),
        permitsChecklist: payload.permitsChecklist.slice(0, 500),
        planMarkdown: payload.planMarkdown.slice(0, 7900),
        offlinePackReady: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.CREATE,
        `traveler_itineraries/${id}`
      );
    }
  };

  // Submit Verified Review (ENT-035)
  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      await handleGoogleSignIn();
      return;
    }
    if (!reviewListingId) return;
    const reviewId = `rev-${Date.now()}`;
    try {
      await setDoc(doc(db, 'traveler_reviews', reviewId), {
        id: reviewId,
        listingId: reviewListingId,
        authorUid: currentUser.uid,
        authorName: (
          currentUser.displayName ||
          currentUser.email?.split('@')[0] ||
          'Traveler'
        ).slice(0, 100),
        vcvCode: reviewVcvCode.trim().slice(0, 40),
        rating: Math.max(1, Math.min(5, Number(reviewRating))),
        comment: reviewComment.trim().slice(0, 1200),
        moderationStatus: 'Published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setReviewComment('');
      setToastBanner('Verified Traveler Review (ENT-035) published to Firestore!');
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.CREATE,
        `traveler_reviews/${reviewId}`
      );
    }
  };

  // Submit Support / Emergency Escalation Case (ENT-036)
  const handleCreateSupportCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      await handleGoogleSignIn();
      return;
    }
    const caseId = `case-${Date.now()}`;
    try {
      await setDoc(doc(db, 'support_cases', caseId), {
        id: caseId,
        reporterUid: currentUser.uid,
        reporterName: (
          currentUser.displayName ||
          currentUser.email?.split('@')[0] ||
          'Traveler'
        ).slice(0, 100),
        category: supportCategory,
        priority: supportPriority,
        provinceId: supportProvince.slice(0, 20),
        districtName: supportDistrict.slice(0, 80),
        subject: supportSubject.trim().slice(0, 160),
        description: supportDescription.trim().slice(0, 1500),
        resolutionNotes: 'Queued for U08 Support & Emergency Officer response.',
        caseStatus: 'Open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSupportSubject('');
      setSupportDescription('');
      setToastBanner('Support & Safety Ticket (ENT-036) created in Firestore!');
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.CREATE,
        `support_cases/${caseId}`
      );
    }
  };

  // Admin KYC Decision + Immutable Audit Log (ENT-038)
  const handleAdminKycDecision = async (
    listingId: string,
    kycId: string | null,
    newStatus: VerificationStatus,
    reviewerNotes: string
  ) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, 'partner_listings', listingId), {
        verificationStatus: newStatus,
        listingStatus: newStatus === 'Suspended' ? 'Suspended' : 'Published',
        updatedAt: serverTimestamp(),
      });

      if (kycId) {
        await updateDoc(doc(db, 'partner_kyc', kycId), {
          verificationStatus: newStatus,
          reviewerNotes: reviewerNotes.slice(0, 600),
          reviewedByUid: currentUser.uid,
          updatedAt: serverTimestamp(),
        });
      }

      const logId = `audit-${Date.now()}`;
      await setDoc(doc(db, 'audit_logs', logId), {
        id: logId,
        actorUid: currentUser.uid,
        actorEmail: (currentUser.email || SUPER_ADMIN_EMAIL).slice(0, 160),
        actorRole: 'U09',
        actionType: `KYC_DECISION_${newStatus.toUpperCase()}`,
        targetEntityType: 'PartnerListing',
        targetEntityId: listingId,
        reason: (reviewerNotes || `KYC status transitioned to ${newStatus}`).slice(0, 600),
        createdAt: serverTimestamp(),
      });

      setToastBanner(
        `KYC Verification updated to ${newStatus} and logged in immutable ENT-038 Audit Trail!`
      );
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `partner_listings/${listingId}`
      );
    }
  };

  // Super Admin Delete Listing + Immutable Audit Log
  const handleAdminDeleteListing = async (listingId: string) => {
    if (!currentUser || !isSuperAdminUser) return;
    try {
      await deleteDoc(doc(db, 'partner_listings', listingId));
      const logId = `audit-${Date.now()}`;
      await setDoc(doc(db, 'audit_logs', logId), {
        id: logId,
        actorUid: currentUser.uid,
        actorEmail: (currentUser.email || SUPER_ADMIN_EMAIL).slice(0, 160),
        actorRole: 'U09',
        actionType: 'DELETE_LISTING',
        targetEntityType: 'PartnerListing',
        targetEntityId: listingId,
        reason: 'Listing removed from Firestore by U09 Super Admin.',
        createdAt: serverTimestamp(),
      });
      setToastBanner(`Listing ${listingId} deleted from Firestore.`);
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.DELETE,
        `partner_listings/${listingId}`
      );
    }
  };

  // Admin Commission Status Transition + Immutable Audit Log
  const handleAdminCommissionAction = async (
    inquiryId: string,
    newCommissionStatus: 'Eligible' | 'Invoiced' | 'Settled' | 'Waived'
  ) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, 'booking_inquiries', inquiryId), {
        commissionStatus: newCommissionStatus,
        updatedAt: serverTimestamp(),
      });

      const logId = `audit-${Date.now()}`;
      await setDoc(doc(db, 'audit_logs', logId), {
        id: logId,
        actorUid: currentUser.uid,
        actorEmail: currentUser.email || SUPER_ADMIN_EMAIL,
        actorRole: 'U07',
        actionType: `COMMISSION_STATUS_${newCommissionStatus.toUpperCase()}`,
        targetEntityType: 'BookingInquiry',
        targetEntityId: inquiryId,
        reason: `U07 Finance Officer transitioned commission ledger to ${newCommissionStatus} (13% VAT + 1.5% TDS applied).`,
        createdAt: serverTimestamp(),
      });

      setToastBanner(`Commission status updated to ${newCommissionStatus}.`);
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `booking_inquiries/${inquiryId}`
      );
    }
  };

  // Admin Support Case Resolution
  const handleAdminResolveSupportCase = async (
    caseId: string,
    resolutionNotes: string,
    newStatus: 'InProgress' | 'Resolved' | 'Closed'
  ) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, 'support_cases', caseId), {
        resolutionNotes,
        caseStatus: newStatus,
        updatedAt: serverTimestamp(),
      });
      setToastBanner(`Support Case ${caseId} marked ${newStatus}.`);
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `support_cases/${caseId}`
      );
    }
  };

  return (
    <div
      dir={t.isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#15324B]"
    >
      {/* =====================================================================
          TOP NAVIGATION BAR (Exact 3-Zone White Header from User Screenshot)
      ===================================================================== */}
      <header className="bg-white text-[#15324B] sticky top-0 z-30 shadow-xs border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left Zone: Mountain Peak Emblem (Navy + Crimson Peak) + PHERI NEPAL */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('DISCOVER');
                setActiveNavMenu(null);
                setActiveCorridorDistrict(null);
              }}
              className="flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <svg
                viewBox="0 0 64 36"
                className="w-11 h-6 shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Left & Center Navy Mountain Ridges */}
                <path
                  d="M4 32L22 10L34 24L44 13L58 32H4Z"
                  stroke="#15324B"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 10L26 20L17 24"
                  stroke="#15324B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right Crimson/Red Accent Peak */}
                <path
                  d="M37 21L46 9L60 32"
                  stroke="#C83E2B"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-sans font-extrabold text-lg sm:text-xl tracking-wide text-[#15324B] whitespace-nowrap">
                PHERI NEPAL
              </span>
            </button>

            <span className="hidden md:inline-block h-6 w-px bg-slate-200" />

            {/* Center Zone: Home Icon + Journey Navigation Links (Discover ▾, Before You Go ▾, During Your Trip ▾, After Your Trip ▾) */}
            <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-[#15324B]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('DISCOVER');
                  setActiveNavMenu(null);
                }}
                aria-label="Home"
                className={`py-5 border-b-2 transition cursor-pointer flex items-center ${
                  activeTab === 'DISCOVER' && !activeNavMenu
                    ? 'border-[#C85A28] text-[#15324B]'
                    : 'border-transparent text-slate-600 hover:text-[#15324B]'
                }`}
              >
                <Home className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveNavMenu((prev) =>
                    prev === 'DISCOVER' ? null : 'DISCOVER'
                  )
                }
                className={`py-5 border-b-2 transition cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${
                  activeNavMenu === 'DISCOVER' || activeTab === 'DISTRICTS_77'
                    ? 'border-[#C85A28] text-[#15324B]'
                    : 'border-transparent text-slate-700 hover:text-[#15324B]'
                }`}
              >
                <span>{t.navDiscover}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition ${
                    activeNavMenu === 'DISCOVER' ? 'rotate-180 text-[#C85A28]' : ''
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveNavMenu((prev) =>
                    prev === 'BEFORE' ? null : 'BEFORE'
                  )
                }
                className={`py-5 border-b-2 transition cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${
                  activeNavMenu === 'BEFORE' || activeTab === 'AI_PLANNER'
                    ? 'border-[#C85A28] text-[#15324B]'
                    : 'border-transparent text-slate-700 hover:text-[#15324B]'
                }`}
              >
                <span>{t.navBeforeYouGo}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition ${
                    activeNavMenu === 'BEFORE' ? 'rotate-180 text-[#C85A28]' : ''
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveNavMenu((prev) =>
                    prev === 'DURING' ? null : 'DURING'
                  )
                }
                className={`py-5 border-b-2 transition cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${
                  activeNavMenu === 'DURING'
                    ? 'border-[#C85A28] text-[#15324B]'
                    : 'border-transparent text-slate-700 hover:text-[#15324B]'
                }`}
              >
                <span>{t.navDuringYourTrip}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition ${
                    activeNavMenu === 'DURING' ? 'rotate-180 text-[#C85A28]' : ''
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveNavMenu((prev) =>
                    prev === 'AFTER' ? null : 'AFTER'
                  )
                }
                className={`py-5 border-b-2 transition cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${
                  activeNavMenu === 'AFTER' || activeTab === 'TRAVELER_PORTAL'
                    ? 'border-[#C85A28] text-[#15324B]'
                    : 'border-transparent text-slate-700 hover:text-[#15324B]'
                }`}
              >
                <span>{t.navAfterYourTrip}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition ${
                    activeNavMenu === 'AFTER' ? 'rotate-180 text-[#C85A28]' : ''
                  }`}
                />
              </button>
            </nav>
          </div>

          {/* Right Zone: Language Selector (Globe + L01-L12 ▾) & "Plan your trip →" CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#15324B] bg-slate-100 hover:bg-slate-200/70 rounded-full px-2.5 py-1.5 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-[#15324B]" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                aria-label="Language selector L01 to L12"
                className="bg-transparent text-[#15324B] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                {OFFICIAL_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code === 'L01'
                      ? 'EN — English'
                      : `${lang.code}: ${lang.nativeName} (${lang.nameEn})`}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveNavMenu(null);
                setActiveTab('AI_PLANNER');
              }}
              className="px-4 py-2 rounded-full bg-[#C85A28] hover:bg-[#B24B1E] text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              {t.ctaPlanYourTrip}
            </button>
          </div>
        </div>

        {/* Interactive Dropdown Action Drawer for Discover ▾, Before You Go ▾, During Your Trip ▾, After Your Trip ▾ */}
        {activeNavMenu && (
          <div className="bg-white border-t border-slate-200 shadow-lg px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code font-bold text-[#C85A28] uppercase">
                  {activeNavMenu === 'DISCOVER' &&
                    `${t.navDiscover} • 7 PROVINCES & 77 DISTRICTS CORRIDORS`}
                  {activeNavMenu === 'BEFORE' &&
                    `${t.navBeforeYouGo} • AI TRIP PLANNER, PERMITS & HIGH-ALTITUDE SAFETY`}
                  {activeNavMenu === 'DURING' &&
                    `${t.navDuringYourTrip} • VERIFIED PARTNERS, VCV INQUIRIES & 24/7 SOS (1144)`}
                  {activeNavMenu === 'AFTER' &&
                    `${t.navAfterYourTrip} • VCV VOUCHERS, VERIFIED REVIEWS & PARTNER/ADMIN GOVERNANCE`}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveNavMenu(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-[#15324B] flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>

              {activeNavMenu === 'DISCOVER' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => openCorridorCommandByDistrictName('Kaski')}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">{t.cardPokharaTitle}</div>
                    <div className="text-xs opacity-75">
                      {t.cardPokharaSubtitle} • PR-04 Kaski (ACAP/TIMS)
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => openCorridorCommandByDistrictName('Solukhumbu')}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">{t.cardEverestTitle}</div>
                    <div className="text-xs opacity-75">
                      {t.cardEverestSubtitle} • PR-01 Solukhumbu (8,849m)
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => openCorridorCommandByDistrictName('Kathmandu')}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">{t.cardKathmanduTitle}</div>
                    <div className="text-xs opacity-75">
                      {t.cardKathmanduSubtitle} • PR-03 Bagmati UNESCO
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('DISTRICTS_77');
                    }}
                    className="p-3 rounded-xl bg-[#C85A28] text-white text-left transition hover:bg-[#B24B1E] cursor-pointer"
                  >
                    <div className="font-bold text-sm">{t.pillar77Districts} →</div>
                    <div className="text-xs text-white/90">
                      Browse all 7 Provinces & 77 Districts Registry
                    </div>
                  </button>
                </div>
              )}

              {activeNavMenu === 'BEFORE' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenAiPlannerForDistrict('PR-04', 'Kaski')
                    }
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      {t.stageBeforeTitle} — AI Trip Planner
                    </div>
                    <div className="text-xs opacity-75">
                      Generate &lt;=500m/day acclimatization & realistic highway speed plans
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => openCorridorCommandByDistrictName('Mustang')}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      TIMS, ACAP & Restricted Area Permits
                    </div>
                    <div className="text-xs opacity-75">
                      Inspect mandatory Nepal trekking & national park checkpoints
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const solukhumbu =
                        NEPAL_77_DISTRICTS.find(
                          (d) => d.nameEn === 'Solukhumbu'
                        ) || NEPAL_77_DISTRICTS[0];
                      handleDownloadCorridorSurvivalPack(solukhumbu);
                      setActiveNavMenu(null);
                    }}
                    className="p-3 rounded-xl bg-[#15324B] text-white text-left transition hover:bg-[#194A6E] cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      {t.btnDownloadSurvivalPack} (FR-033)
                    </div>
                    <div className="text-xs text-white/85">
                      Instant offline trekking & emergency hotline cache (.txt)
                    </div>
                  </button>
                </div>
              )}

              {activeNavMenu === 'DURING' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('DISCOVER');
                      setTimeout(() => {
                        const el = document.getElementById('live-partner-directory');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      {t.pillarVerifiedServices} ({totalVerifiedCount} Verified)
                    </div>
                    <div className="text-xs opacity-75">
                      Browse live Firestore partners & issue VCV booking inquiries
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('TRAVELER_PORTAL');
                    }}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      24/7 Tourist Police (1144) & HRA Mountain Rescue
                    </div>
                    <div className="text-xs opacity-75">
                      Open emergency hotlines & submit U08 safety escalation tickets
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('PARTNER_DESK');
                    }}
                    className="p-3 rounded-xl bg-[#C85A28] text-white text-left transition hover:bg-[#B24B1E] cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      {t.btnRegisterPartnerHere}
                    </div>
                    <div className="text-xs text-white/90">
                      Onboard a real hotel, homestay, or guide with DOT/NTB/PAN KYC
                    </div>
                  </button>
                </div>
              )}

              {activeNavMenu === 'AFTER' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('TRAVELER_PORTAL');
                    }}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">
                      {t.stageAfterTitle} — VCV Vouchers & Verified Reviews
                    </div>
                    <div className="text-xs opacity-75">
                      Track your booking inquiries ({travelerInquiries.length}) & post ENT-035 reviews
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('ADMIN_CONSOLE');
                    }}
                    className="p-3 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200 text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-sm">{t.tab6AdminConsole}</div>
                    <div className="text-xs opacity-75">
                      Inspect & approve pending KYC evidence + 13% VAT / 1.5% TDS ledger
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavMenu(null);
                      setActiveTab('BLUEPRINTS_12');
                    }}
                    className="p-3 rounded-xl bg-[#15324B] text-white text-left transition hover:bg-[#194A6E] cursor-pointer"
                  >
                    <div className="font-bold text-sm">{t.tab7Blueprints}</div>
                    <div className="text-xs text-white/85">
                      Inspect all 12 official v2.0 project blueprint documents
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step-by-Step Master Blueprint Role & Workspace Sub-Bar + 1-Click 12-Language Switcher Chips */}
        <div className="bg-[#15324B] text-white/90 text-xs py-2 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('DISCOVER')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'DISCOVER'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab1Explore}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('DISTRICTS_77')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'DISTRICTS_77'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab2Districts}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('AI_PLANNER')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'AI_PLANNER'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab3AiPlanner}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('TRAVELER_PORTAL')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'TRAVELER_PORTAL'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab4TravelerPortal} ({travelerInquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('PARTNER_DESK')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'PARTNER_DESK'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab5PartnerDesk}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ADMIN_CONSOLE')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'ADMIN_CONSOLE'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab6AdminConsole}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('BLUEPRINTS_12')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'BLUEPRINTS_12'
                      ? 'bg-[#C85A28] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.tab7Blueprints}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="hidden xl:inline-flex items-center gap-1 text-[#F3B33D] font-mono-code">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Tourist Police: 1144
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[#F3B33D] font-mono-code font-semibold text-[11px]">
                  {userRole}:{' '}
                  {isNe
                    ? ROLE_DEFINITIONS[userRole].labelNe
                    : ROLE_DEFINITIONS[userRole].labelEn}
                </span>
                {currentUser ? (
                  <div className="flex items-center gap-2">
                    {!isSuperAdminUser && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRoleSwitch(userRole === 'U03' ? 'U02' : 'U03')
                        }
                        className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono-code text-white cursor-pointer"
                      >
                        Switch to {userRole === 'U03' ? 'U02 Traveler' : 'U03 Partner'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="px-2.5 py-0.5 rounded bg-white/15 hover:bg-white/25 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>{isNe ? 'साइन आउट' : 'Sign Out'}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="px-2.5 py-0.5 rounded bg-[#F3B33D] text-[#15324B] font-bold text-xs hover:bg-[#f5be58] transition flex items-center gap-1 cursor-pointer"
                  >
                    <LogIn className="w-3 h-3" />
                    <span>{isNe ? 'Google साइन इन' : 'Sign In'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 1-Click 12-Language Instant Switcher Bar (L01 through L12) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-white/10 text-[11px]">
              <span className="text-[#F3B33D] font-mono-code font-bold shrink-0">
                12 LANGUAGES (L01–L12):
              </span>
              {OFFICIAL_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-2 py-0.5 rounded font-mono-code transition cursor-pointer shrink-0 ${
                    language === lang.code
                      ? 'bg-[#F3B33D] text-[#15324B] font-bold'
                      : 'bg-white/10 text-white/85 hover:bg-white/20'
                  }`}
                >
                  {lang.code}: {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications / Language Phase Banner */}
      {(toastBanner || languageNotice) && (
        <div className="max-w-7xl mx-auto w-full px-4 pt-3 space-y-2">
          {toastBanner && (
            <div className="p-3 rounded-lg bg-[#15324B] text-white text-xs font-semibold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F3B33D]" />
                <span>{toastBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastBanner(null)}
                className="text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          FULL-WIDTH PANORAMIC HERO BANNER (Exact Match to User Photo + 12 Languages)
      ===================================================================== */}
      {activeTab === 'DISCOVER' && (
        <section className="relative w-full min-h-[390px] sm:min-h-[450px] flex items-center bg-[#153B5E]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/src/assets/images/hero_find_your_nepal_1795864711925.jpg"
              alt="Panoramic Himalayan sunset over snow-capped peaks and traditional Nepali pagoda temple with prayer flags"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Measured Atmospheric Blue Scrim on Left for High-Contrast Typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#133252]/92 via-[#1A436B]/68 to-transparent" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
            <div className="max-w-xl space-y-4">
              {/* Kicker with Horizontal Line */}
              <div className="flex items-center gap-3 text-white/90 text-xs tracking-[0.2em] uppercase font-medium">
                <span>{t.heroKicker}</span>
                <span className="w-16 h-px bg-white/60 inline-block" />
              </div>

              {/* Main Display Headline: "Find your Nepal." dynamically rendered in L01-L12 */}
              <h1 className="text-4xl sm:text-6xl font-serif-display font-bold tracking-tight text-white leading-[1.08]">
                {t.heroHeadlinePrefix}{' '}
                <span className="text-[#F3B33D]">{t.heroHeadlineHighlight}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* White Capsule Search Bar with Embedded Terracotta "Search" Button + Live Instant Results Dropdown */}
              <div className="pt-2 max-w-lg relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowHeroSearchResults(true);
                    if (
                      searchTerm.trim().length > 0 &&
                      matchingSearchDistricts.length === 1
                    ) {
                      openCorridorCommandByDistrictName(
                        matchingSearchDistricts[0].nameEn
                      );
                    } else {
                      setTimeout(() => {
                        const panel = document.getElementById(
                          'hero-search-results-panel'
                        );
                        if (panel) {
                          panel.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }
                      }, 60);
                    }
                  }}
                >
                  <div className="bg-white rounded-full p-1.5 pl-4 shadow-xl flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={searchTerm}
                        onFocus={() => setShowHeroSearchResults(true)}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowHeroSearchResults(true);
                        }}
                        placeholder={t.searchPlaceholder}
                        className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none"
                      />
                      {searchTerm.trim().length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSearchTerm('')}
                          aria-label="Clear search"
                          className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#C85A28] hover:bg-[#B24B1E] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0"
                    >
                      {t.searchButton}
                    </button>
                  </div>
                </form>

                {/* Instant Autocomplete Dropdown right under the Search Bar when typing */}
                {searchTerm.trim().length > 0 && (
                  <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 text-[#15324B] space-y-2 max-h-80 overflow-y-auto">
                    <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 px-1">
                      <span>
                        {matchingSearchDistricts.length} MATCHING CORRIDORS FOR "
                        {searchTerm.trim()}"
                      </span>
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="text-[#C85A28] font-bold hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>

                    {matchingSearchDistricts.length > 0 ? (
                      matchingSearchDistricts.slice(0, 5).map((dist) => (
                        <div
                          key={dist.id}
                          onClick={() =>
                            openCorridorCommandByDistrictName(dist.nameEn)
                          }
                          className="p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#15324B] hover:text-white border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 transition cursor-pointer group"
                        >
                          <div>
                            <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#C85A28] group-hover:text-[#F3B33D]" />
                              <span>
                                {dist.nameEn} ({dist.nameNe}) —{' '}
                                {dist.headquartersEn}
                              </span>
                              <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-200/70 group-hover:bg-white/15">
                                {dist.provinceId} • Max {dist.maxAltitudeMeters}m
                              </span>
                            </div>
                            <div className="text-[11px] opacity-75 pl-5">
                              {dist.keyHighlightsEn.join(' • ')}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openCorridorCommandByDistrictName(dist.nameEn);
                              }}
                              className="px-2.5 py-1 rounded bg-[#15324B] group-hover:bg-white group-hover:text-[#15324B] text-white text-[11px] font-bold cursor-pointer"
                            >
                              {t.btnOpenCorridor}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenAiPlannerForDistrict(
                                  dist.provinceId,
                                  dist.nameEn
                                );
                              }}
                              className="px-2.5 py-1 rounded bg-[#C85A28] text-white text-[11px] font-bold cursor-pointer"
                            >
                              {t.btnPlanCorridorAi}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          No exact district named "{searchTerm.trim()}". Click to
                          open the AI Trip Planner or browse all 77 Districts:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveTab('AI_PLANNER')}
                            className="px-2.5 py-1 rounded bg-[#C85A28] text-white font-bold text-[11px] cursor-pointer"
                          >
                            {t.btnPlanCorridorAi}
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('DISTRICTS_77')}
                            className="px-2.5 py-1 rounded bg-[#15324B] text-white font-bold text-[11px] cursor-pointer"
                          >
                            {t.pillar77Districts}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 1-Click Quick Destination Search Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[11px] text-white/90">
                  <span className="text-white/70 font-mono-code">Popular:</span>
                  {[
                    { label: 'Pokhara', district: 'Kaski' },
                    { label: 'Everest', district: 'Solukhumbu' },
                    { label: 'Kathmandu', district: 'Kathmandu' },
                    { label: 'Mustang', district: 'Mustang' },
                    { label: 'Lumbini', district: 'Rupandehi' },
                    { label: 'Chitwan', district: 'Chitwan' },
                    { label: 'Rara Lake', district: 'Mugu' },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => {
                        setSearchTerm(chip.label);
                        setShowHeroSearchResults(true);
                        openCorridorCommandByDistrictName(chip.district);
                      }}
                      className="px-2 py-0.5 rounded-full bg-white/15 hover:bg-[#F3B33D] hover:text-[#15324B] text-white font-medium transition cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Trust Pillars Row: 77 Districts | Verified Services | Travel with Confidence */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/95 font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('DISTRICTS_77')}
                  className="inline-flex items-center gap-2 hover:text-[#F3B33D] transition cursor-pointer"
                >
                  <Mountain className="w-4 h-4 text-white" />
                  <span>{t.pillar77Districts}</span>
                </button>
                <span className="text-white/40">|</span>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('live-partner-directory');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 hover:text-[#F3B33D] transition cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>{t.pillarVerifiedServices}</span>
                </button>
                <span className="text-white/40">|</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('AI_PLANNER')}
                  className="inline-flex items-center gap-2 hover:text-[#F3B33D] transition cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                  <span>{t.pillarTravelConfidence}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Search Results Panel when searching from Hero Capsule */}
      {activeTab === 'DISCOVER' &&
        (showHeroSearchResults || searchTerm.trim().length > 0) && (
          <section
            id="hero-search-results-panel"
            className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6"
          >
            <div className="bg-white rounded-2xl border-2 border-[#15324B]/20 p-5 shadow-lg space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs font-mono-code font-bold text-[#C85A28] uppercase">
                    LIVE 77-DISTRICT & FIRESTORE DIRECTORY SEARCH RESULTS (
                    {matchingSearchDistricts.length} DISTRICTS •{' '}
                    {filteredListings.length} PARTNER SERVICES)
                  </span>
                  <h3 className="text-lg font-serif-display font-bold text-[#15324B]">
                    {searchTerm.trim()
                      ? `Search Results for "${searchTerm.trim()}"`
                      : 'Featured Nepal Corridors (Click any destination to open full interactive guide)'}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {searchTerm.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-xs font-bold text-amber-950 cursor-pointer"
                    >
                      Reset Query
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShowHeroSearchResults(false);
                      setSearchTerm('');
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#15324B] flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close Search</span>
                  </button>
                </div>
              </div>

              {matchingSearchDistricts.length === 0 ? (
                <div className="p-5 rounded-xl bg-[#FAF8F4] border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#15324B]">
                      No exact district found matching "{searchTerm.trim()}"
                    </div>
                    <p className="text-xs text-slate-600">
                      Try searching for any of Nepal&apos;s 77 districts (e.g., Pokhara,
                      Everest, Solukhumbu, Kathmandu, Mustang, Lumbini, Chitwan, Rara,
                      Ilam) or click below to generate a custom AI Trip Plan.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('AI_PLANNER')}
                      className="px-4 py-2 rounded-lg bg-[#C85A28] text-white text-xs font-bold hover:bg-[#B24B1E] cursor-pointer"
                    >
                      {t.btnPlanCorridorAi}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('DISTRICTS_77')}
                      className="px-4 py-2 rounded-lg bg-[#15324B] text-white text-xs font-bold hover:bg-[#194A6E] cursor-pointer"
                    >
                      Browse All 77 Districts
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {matchingSearchDistricts.slice(0, 9).map((dist) => (
                    <div
                      key={dist.id}
                      onClick={() => openCorridorCommandByDistrictName(dist.nameEn)}
                      className="p-3.5 rounded-xl bg-[#FAF8F4] hover:border-[#C85A28] border border-slate-200 flex flex-col justify-between gap-3 cursor-pointer transition"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono-code text-[#15324B]">
                          <span className="font-bold">
                            {dist.id} • {dist.provinceId} ({dist.tier})
                          </span>
                          <span>Max {dist.maxAltitudeMeters}m</span>
                        </div>
                        <h4 className="font-serif-display font-bold text-base text-[#15324B] mt-0.5">
                          {dist.nameEn} ({dist.nameNe}) — {dist.headquartersEn}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {dist.keyHighlightsEn.join(' • ')}
                        </p>
                        <div className="text-[11px] font-mono-code text-emerald-800 mt-1.5">
                          Permits: {dist.permitsRequired.join(', ')}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCorridorCommandByDistrictName(dist.nameEn);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#15324B] text-white text-xs font-semibold hover:bg-[#194A6E] cursor-pointer"
                        >
                          {t.btnOpenCorridor}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenAiPlannerForDistrict(
                              dist.provinceId,
                              dist.nameEn
                            );
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#C85A28] text-white text-xs font-semibold hover:bg-[#B24B1E] cursor-pointer"
                        >
                          {t.btnPlanCorridorAi}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-10">
        {/* ===================================================================
            TAB 1: DISCOVER NEPAL (Exact "Explore Nepal" + 3-Stage Journey Bar + Live Directory)
        =================================================================== */}
        {activeTab === 'DISCOVER' && (
          <div className="space-y-10">
            {/* EXPLORE NEPAL SHOWCASE SECTION (Exact Match to User Photo — Every Card Opens Full Interactive Corridor View) */}
            <section className="space-y-6">
              {/* Centered Heading with Flanking Lines */}
              <div className="text-center space-y-1.5">
                <div className="flex items-center justify-center gap-4">
                  <span className="hidden sm:inline-block w-28 h-px bg-slate-300" />
                  <h2 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#15324B]">
                    {t.exploreNepalTitle}
                  </h2>
                  <span className="hidden sm:inline-block w-28 h-px bg-slate-300" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t.exploreNepalSubtitle}
                </p>
              </div>

              {/* 3 Signature Destination Cards: Pokhara, Everest Region, Kathmandu (Interactive Corridor + AI Plan + Partner Register) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Pokhara (Kaski / PR-04) */}
                <div
                  onClick={() => openCorridorCommandByDistrictName('Kaski')}
                  className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-[#15324B] border border-slate-200/60"
                >
                  <img
                    src="/src/assets/images/card_pokhara_lakeside_1795864713788.jpg"
                    alt="Pokhara — Beautiful Lakeside City with colorful boats on Phewa Lake and Annapurna peaks"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs text-[#F3B33D] font-mono-code text-[11px] font-bold">
                      PR-04 • Kaski • ACAP
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#F3B33D] fill-[#F3B33D] shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                          {t.cardPokharaTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-white/85 pl-5">
                        {t.cardPokharaSubtitle}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCorridorCommandByDistrictName('Kaski');
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/95 hover:bg-white text-[#15324B] font-bold text-[11px] transition cursor-pointer"
                      >
                        {t.btnOpenCorridor}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAiPlannerForDistrict('PR-04', 'Kaski');
                        }}
                        className="px-2.5 py-1 rounded-md bg-[#C85A28] hover:bg-[#B24B1E] text-white font-bold text-[11px] transition cursor-pointer"
                      >
                        {t.btnPlanCorridorAi}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2: Everest Region (Solukhumbu / PR-01) */}
                <div
                  onClick={() => openCorridorCommandByDistrictName('Solukhumbu')}
                  className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-[#15324B] border border-slate-200/60"
                >
                  <img
                    src="/src/assets/images/card_everest_region_1795864714106.jpg"
                    alt="Everest Region — The Ultimate Trekking Adventure in Sagarmatha Solukhumbu"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs text-[#F3B33D] font-mono-code text-[11px] font-bold">
                      PR-01 • Solukhumbu • 8,849m
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#F3B33D] fill-[#F3B33D] shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                          {t.cardEverestTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-white/85 pl-5">
                        {t.cardEverestSubtitle}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCorridorCommandByDistrictName('Solukhumbu');
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/95 hover:bg-white text-[#15324B] font-bold text-[11px] transition cursor-pointer"
                      >
                        {t.btnOpenCorridor}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAiPlannerForDistrict('PR-01', 'Solukhumbu');
                        }}
                        className="px-2.5 py-1 rounded-md bg-[#C85A28] hover:bg-[#B24B1E] text-white font-bold text-[11px] transition cursor-pointer"
                      >
                        {t.btnPlanCorridorAi}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3: Kathmandu (Kathmandu / PR-03) */}
                <div
                  onClick={() => openCorridorCommandByDistrictName('Kathmandu')}
                  className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-[#15324B] border border-slate-200/60"
                >
                  <img
                    src="/src/assets/images/card_kathmandu_heritage_1795864715532.jpg"
                    alt="Kathmandu — Heritage & Culture Durbar Square pagoda temples"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs text-[#F3B33D] font-mono-code text-[11px] font-bold">
                      PR-03 • Kathmandu • UNESCO
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#F3B33D] fill-[#F3B33D] shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                          {t.cardKathmanduTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-white/85 pl-5">
                        {t.cardKathmanduSubtitle}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCorridorCommandByDistrictName('Kathmandu');
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/95 hover:bg-white text-[#15324B] font-bold text-[11px] transition cursor-pointer"
                      >
                        {t.btnOpenCorridor}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAiPlannerForDistrict('PR-03', 'Kathmandu');
                        }}
                        className="px-2.5 py-1 rounded-md bg-[#C85A28] hover:bg-[#B24B1E] text-white font-bold text-[11px] transition cursor-pointer"
                      >
                        {t.btnPlanCorridorAi}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-STAGE JOURNEY BAR: BEFORE — Plan | DURING — Travel | AFTER — Remember */}
              <div className="bg-[#F2EFE9] border border-slate-200/90 rounded-2xl px-6 py-5 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Stage 1: BEFORE — Plan */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('AI_PLANNER')}
                    className="flex items-center gap-3.5 text-left group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#194A6E] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#C85A28] transition">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-serif-display font-bold text-sm sm:text-base text-[#15324B] group-hover:text-[#C85A28] transition">
                        {t.stageBeforeTitle}
                      </div>
                      <div className="text-xs text-slate-600">
                        {t.stageBeforeSubtitle}
                      </div>
                    </div>
                    <span className="hidden md:block w-12 h-px bg-slate-300" />
                  </button>

                  {/* Stage 2: DURING — Travel */}
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('live-partner-directory');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3.5 text-left group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#194A6E] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#C85A28] transition">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-serif-display font-bold text-sm sm:text-base text-[#15324B] group-hover:text-[#C85A28] transition">
                        {t.stageDuringTitle}
                      </div>
                      <div className="text-xs text-slate-600">
                        {t.stageDuringSubtitle}
                      </div>
                    </div>
                    <span className="hidden md:block w-12 h-px bg-slate-300" />
                  </button>

                  {/* Stage 3: AFTER — Remember */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('TRAVELER_PORTAL')}
                    className="flex items-center gap-3.5 text-left group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#194A6E] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#C85A28] transition">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-serif-display font-bold text-sm sm:text-base text-[#15324B] group-hover:text-[#C85A28] transition">
                        {t.stageAfterTitle}
                      </div>
                      <div className="text-xs text-slate-600">
                        {t.stageAfterSubtitle}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Centered Trust Seal Line + Blue Mountain & Pine Forest Silhouette Divider */}
              <div className="pt-1 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#15324B]">
                  <ShieldCheck className="w-4 h-4 text-[#194A6E] shrink-0" />
                  <span>{t.trustSealText}</span>
                </div>

                {/* Layered Blue Himalayan Ridge & Pine Silhouette Banner matching bottom of User Photo */}
                <div className="w-full overflow-hidden rounded-xl border border-[#194A6E]/15">
                  <svg
                    viewBox="0 0 1440 90"
                    className="w-full h-14 sm:h-20 block"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect width="1440" height="90" fill="#EBF2F7" />
                    {/* Distant Blue Mountain Range */}
                    <path
                      d="M0 65L120 32L240 52L380 20L520 48L680 18L840 46L980 24L1140 50L1290 22L1440 48V90H0V65Z"
                      fill="#7BA4C4"
                      opacity="0.55"
                    />
                    {/* Midground Deep Mountain Ridges */}
                    <path
                      d="M0 72L90 46L210 64L340 36L490 66L620 38L770 62L920 34L1080 62L1220 38L1360 58L1440 44V90H0V72Z"
                      fill="#35688E"
                      opacity="0.75"
                    />
                    {/* Foreground Dark Alpine Forest & Ridge */}
                    <path
                      d="M0 80L60 58L140 74L260 54L390 76L530 56L670 78L810 54L960 76L1110 56L1260 75L1380 54L1440 68V90H0V80Z"
                      fill="#153B5E"
                    />
                  </svg>
                </div>
              </div>
            </section>

            {/* Interactive Official Constitutional Map of Nepal (7 Provinces, 77 Districts & All Tourist Destinations) */}
            <NepalInteractiveMap
              selectedProvinceId={selectedProvinceId}
              onSelectProvince={(prov) => {
                setSelectedProvinceId(prov);
                setSelectedDistrictFilter('ALL');
              }}
              language={language}
              listingCountsByProvince={listingCountsByProvince}
              selectedDistrictName={selectedDistrictFilter}
              onSelectDistrict={(distName) => {
                setSelectedDistrictFilter(distName);
              }}
              onOpenDistrictGuide={(distName) => {
                openCorridorCommandByDistrictName(distName);
              }}
              onPlanAiTrip={(provId, distName) => {
                handleOpenAiPlannerForDistrict(provId, distName);
              }}
            />

            {/* Filter & Search Toolbar (M02 / M05) */}
            <section
              id="live-partner-directory"
              className="bg-white rounded-xl border border-[#123D32]/15 p-5 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono-code text-[#123D32] uppercase font-semibold">
                      M05 LIVE PARTNER DIRECTORY • DC-009 EVIDENCE-BASED TRUST BADGES
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono-code text-[11px] font-bold">
                      {totalVerifiedCount} KYC Verified
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono-code text-[11px] font-bold">
                      {totalPendingCount} Pending U05 Review
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif-display font-bold text-[#123D32] mt-1">
                    {isNe
                      ? 'होटल, होमस्टे, ट्रेकिङ एजेन्सी र गाइडहरू (वास्तविक Firestore निर्देशिका)'
                      : 'Hotels, Homestays, Mountain Guides & Expedition Partners (Live Firestore)'}
                  </h2>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#123D32] bg-[#F7F5EF] px-3 py-2 rounded-lg border border-[#123D32]/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnlyFilter}
                    onChange={(e) => setVerifiedOnlyFilter(e.target.checked)}
                    className="accent-[#123D32]"
                  />
                  <span>
                    {isNe
                      ? 'सरकारी प्रमाणित (Verified) मात्र देखाउनुहोस्'
                      : 'Show Government KYC Verified Only'}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-[#263746]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={
                      isNe
                        ? 'होटल, जिल्ला, वा पदमार्ग खोज्नुहोस्...'
                        : 'Search lodge, district, or trail...'
                    }
                    className="w-full pl-9 pr-8 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs"
                  />
                  {searchTerm.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear directory search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <select
                  value={selectedProvinceId}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value as ProvinceId | 'ALL');
                    setSelectedDistrictFilter('ALL');
                  }}
                  className="px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-medium"
                >
                  <option value="ALL">All 7 Provinces</option>
                  {NEPAL_PROVINCES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id}: {p.nameEn} ({p.nameNe})
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDistrictFilter}
                  onChange={(e) => setSelectedDistrictFilter(e.target.value)}
                  className="px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-medium"
                >
                  <option value="ALL">All 77 Districts</option>
                  {NEPAL_77_DISTRICTS.filter(
                    (d) =>
                      selectedProvinceId === 'ALL' || d.provinceId === selectedProvinceId
                  ).map((d) => (
                    <option key={d.id} value={d.nameEn}>
                      {d.nameEn} ({d.nameNe}) — {d.tier}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as ServiceCategory | 'ALL')
                  }
                  className="px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-medium"
                >
                  <option value="ALL">All Service Categories (R01–R06)</option>
                  <option value="Hotel">Hotels & Heritage Lodges (R01)</option>
                  <option value="Resort">Eco-Resorts & Wildlife Lodges (R01)</option>
                  <option value="Homestay">Community Homestays (R02)</option>
                  <option value="TrekkingAgency">Trekking Agencies (R03)</option>
                  <option value="TourPackage">Tour & Expedition Packages (R03)</option>
                  <option value="Guide">Licensed Mountain & Cultural Guides (R04)</option>
                  <option value="Transport">Tourist Transport (R05)</option>
                  <option value="AdventureActivity">Adventure Activities (R06)</option>
                </select>
              </div>

              {/* Matching 77-District Corridors when searching in the Directory Search Bar */}
              {searchTerm.trim().length > 0 && matchingSearchDistricts.length > 0 && (
                <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#15324B]/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code font-bold text-[#C85A28] uppercase">
                      MATCHING NEPAL DISTRICTS & CORRIDORS FOR "{searchTerm.trim()}" (
                      {matchingSearchDistricts.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="text-xs font-bold text-[#15324B] underline cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {matchingSearchDistricts.slice(0, 6).map((dist) => (
                      <div
                        key={dist.id}
                        onClick={() => openCorridorCommandByDistrictName(dist.nameEn)}
                        className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#C85A28] flex flex-col justify-between gap-2 cursor-pointer transition"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono-code text-[#15324B]">
                            <span className="font-bold">
                              {dist.id} • {dist.provinceId}
                            </span>
                            <span>Max {dist.maxAltitudeMeters}m</span>
                          </div>
                          <div className="font-bold text-sm text-[#15324B] mt-0.5">
                            {dist.nameEn} ({dist.nameNe}) — {dist.headquartersEn}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {dist.keyHighlightsEn.join(' • ')}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCorridorCommandByDistrictName(dist.nameEn);
                            }}
                            className="px-2.5 py-1 rounded bg-[#15324B] text-white text-[11px] font-bold cursor-pointer"
                          >
                            {t.btnOpenCorridor}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAiPlannerForDistrict(
                                dist.provinceId,
                                dist.nameEn
                              );
                            }}
                            className="px-2.5 py-1 rounded bg-[#C85A28] text-white text-[11px] font-bold cursor-pointer"
                          >
                            {t.btnPlanCorridorAi}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Listings Cards Grid or Honest Zero-Seed Empty State */}
              {filteredListings.length === 0 ? (
                <div className="p-8 rounded-xl bg-[#F7F5EF] border border-[#123D32]/20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#123D32] text-[#C6A15B] flex items-center justify-center mx-auto">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 max-w-2xl mx-auto">
                    <div className="text-xs font-mono-code font-bold text-[#123D32] uppercase">
                      ZERO PRE-VERIFIED DUMMY LISTINGS • 100% REAL ONBOARDING LIFECYCLE
                    </div>
                    <h3 className="text-xl font-serif-display font-bold text-[#123D32]">
                      {isNe
                        ? 'अहिलेसम्म कुनै पनि सेवा सूचीकृत वा प्रमाणित (Verified) गरिएको छैन'
                        : 'No Partner Services Listed or Verified Yet in This View'}
                    </h3>
                    <p className="text-xs text-[#263746]/85 leading-relaxed">
                      {isNe
                        ? 'PHERI NEPAL मा कुनै पनि नक्कली वा पूर्व-प्रमाणित (Pre-Verified) सूची राखिएको छैन। वास्तविक प्रक्रिया अनुसार: (१) पहिले साझेदारले "Partner Desk (U03)" बाट आफ्नो व्यवसाय र सरकारी दर्ता (DOT/NTB/TAAN/NMA) तथा PAN/VAT विवरण पेश गर्छन् (जुन सुरुमा "Pending" हुन्छ), र (२) त्यसपछि "Admin Console (U05–U09)" बाट कागजात जाँच गरी "Verify" गरेपछि मात्र "KYC VERIFIED" ब्याज प्राप्त हुन्छ।'
                        : 'PHERI NEPAL strictly prohibits fake or pre-verified dummy listings. Every listing must follow the real two-step governance lifecycle: (1) Submit a real service and DOT/NTB/TAAN/NMA + PAN/VAT evidence in Partner Desk (U03) — which enters Firestore as VerificationStatus = "Pending" — and (2) Inspect and approve it in Admin Console (U05–U09) to grant the "KYC VERIFIED" badge.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('PARTNER_DESK')}
                      className="px-4 py-2.5 rounded-lg bg-[#123D32] text-[#F7F5EF] text-xs font-bold hover:bg-[#0D2E25] transition flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-[#C6A15B]" />
                      <span>
                        {isNe
                          ? '१. Partner Desk (U03) मा वास्तविक सेवा दर्ता गर्नुहोस्'
                          : '1. Register Real Service & KYC in Partner Desk (U03)'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ADMIN_CONSOLE')}
                      className="px-4 py-2.5 rounded-lg bg-[#C6A15B] text-[#123D32] text-xs font-bold hover:bg-[#DFC286] transition flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        {isNe
                          ? '२. Admin Console (U05–U09) बाट KYC प्रमाणित गर्नुहोस्'
                          : '2. Inspect & Verify KYC in Admin Console (U05–U09)'}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                  {filteredListings.map((item) => {
                    const stream = REVENUE_STREAM_BY_CATEGORY[item.category];
                    return (
                      <article
                        key={item.id}
                        className="bg-[#F7F5EF]/70 rounded-xl border border-[#123D32]/15 overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#C6A15B] transition"
                      >
                        <div>
                          <div className="relative h-48 overflow-hidden bg-[#123D32]">
                            <img
                              src={item.imageUrl}
                              alt={item.titleEn}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                              {/* DC-009 Verification Status Badge (Strictly independent of commercial badges) */}
                              {item.verificationStatus === 'Verified' ? (
                                <span className="px-2.5 py-1 rounded-md bg-emerald-900/95 text-[#F7F5EF] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                                  KYC VERIFIED ({item.registrationNumber})
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-md bg-amber-800/95 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
                                  KYC {item.verificationStatus.toUpperCase()} (Awaiting U05 Review)
                                </span>
                              )}
                            </div>

                            {/* Separate Commercial Promotion Disclosure Label (Document 02 / Document 11) */}
                            {(item.isSponsored || item.isFeatured) && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-0.5 rounded bg-[#C6A15B] text-[#123D32] font-mono-code font-bold text-[10px] uppercase">
                                  {item.isSponsored ? '[Sponsored R08]' : '[Featured R07]'}
                                </span>
                              </div>
                            )}

                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                              <span className="font-mono-code">
                                {item.provinceId} • {item.districtName}
                              </span>
                              <span className="font-mono-code">
                                Max {item.maxElevationMeters}m
                              </span>
                            </div>
                          </div>

                          <div className="p-4 space-y-2.5">
                            <div className="flex items-center justify-between text-xs text-[#263746]/75">
                              <span className="font-mono-code font-semibold text-[#123D32]">
                                {item.category} • {stream?.code}
                              </span>
                              <span className="inline-flex items-center gap-1 font-bold text-[#123D32]">
                                <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                                {item.reviewCount > 0
                                  ? `${item.ratingAvg} (${item.reviewCount})`
                                  : isNe
                                  ? 'नयाँ (० समीक्षा)'
                                  : 'New (0 Reviews)'}
                              </span>
                            </div>

                            <h3 className="text-lg font-serif-display font-bold text-[#123D32] leading-snug">
                              {isNe ? item.titleNe : item.titleEn}
                            </h3>

                            <p className="text-xs text-[#263746]/75 font-mono-code">
                              📍 {item.municipality}
                            </p>

                            <p className="text-xs text-[#263746] line-clamp-3 leading-relaxed">
                              {isNe ? item.summaryNe : item.summaryEn}
                            </p>

                            <div className="text-[11px] bg-white p-2 rounded border border-[#123D32]/10 text-[#263746]/85">
                              <span className="font-semibold text-[#123D32]">Permits:</span>{' '}
                              {item.permitsRequired}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 pt-0 space-y-3">
                          <div className="flex items-baseline justify-between border-t border-[#123D32]/10 pt-3">
                            <div>
                              <div className="text-lg font-mono-code font-bold text-[#123D32]">
                                NPR {item.priceNpr.toLocaleString()}
                              </div>
                              <div className="text-[11px] font-mono-code text-[#263746]/70">
                                ~USD ${item.priceUsdEstimate} /{' '}
                                {item.pricingUnit.replace('per_', '')}
                              </div>
                            </div>
                            <div className="text-right text-[11px] font-mono-code text-emerald-800 font-semibold">
                              <Clock className="w-3 h-3 inline mr-1" />
                              SLA &lt;={item.responseSlaHours}h
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveInquiryListing(item)}
                            className="w-full py-2.5 px-4 rounded-lg bg-[#123D32] text-[#F7F5EF] font-semibold text-xs hover:bg-[#0D2E25] transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5 text-[#C6A15B]" />
                            <span>
                              {isNe
                                ? 'बुकिङ सोधपुछ पठाउनुहोस् (VCV कोड)'
                                : 'Send Booking Inquiry (Issue VCV Code)'}
                            </span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ===================================================================
            TAB 2: ALL 7 PROVINCES & 77 DISTRICTS DIRECTORY (M02 / M09)
        =================================================================== */}
        {activeTab === 'DISTRICTS_77' && (
          <div className="space-y-6">
            <div className="bg-[#123D32] text-[#F7F5EF] rounded-xl p-6 border border-[#C6A15B]/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono-code text-[#C6A15B] uppercase font-semibold">
                    DOCUMENT 01 SECTION 29.1 • COMPLETE 7-PROVINCE & 77-DISTRICT REGISTRY
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-bold mt-1">
                    {isNe
                      ? 'नेपालका सबै ७ प्रदेश र ७७ जिल्लाको आधिकारिक पर्यटन र पर्मिट निर्देशिका'
                      : 'Complete 7-Province & 77-District Tourism, Altitude & Permit Directory'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedProvinceId}
                    onChange={(e) =>
                      setSelectedProvinceId(e.target.value as ProvinceId | 'ALL')
                    }
                    className="px-3 py-2 bg-[#0D2E25] text-[#F7F5EF] border border-[#C6A15B]/40 rounded-lg text-xs font-mono-code"
                  >
                    <option value="ALL">All 7 Provinces (77 Districts)</option>
                    {NEPAL_PROVINCES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id}: {p.nameEn} ({p.districtCount} Districts)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <NepalInteractiveMap
              selectedProvinceId={selectedProvinceId}
              onSelectProvince={(prov) => {
                setSelectedProvinceId(prov);
                setSelectedDistrictFilter('ALL');
              }}
              language={language}
              listingCountsByProvince={listingCountsByProvince}
              selectedDistrictName={selectedDistrictFilter}
              onSelectDistrict={(distName) => {
                setSelectedDistrictFilter(distName);
              }}
              onOpenDistrictGuide={(distName) => {
                openCorridorCommandByDistrictName(distName);
              }}
              onPlanAiTrip={(provId, distName) => {
                handleOpenAiPlannerForDistrict(provId, distName);
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEPAL_77_DISTRICTS.filter(
                (d) =>
                  selectedProvinceId === 'ALL' || d.provinceId === selectedProvinceId
              ).map((dist) => (
                <div
                  key={dist.id}
                  className="bg-white rounded-xl border border-[#123D32]/15 p-4 space-y-2.5 shadow-xs hover:border-[#C6A15B] transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-[#123D32] text-[#F7F5EF] font-mono-code text-xs font-semibold">
                      {dist.id} • {dist.provinceId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono-code text-xs font-bold ${
                        dist.tier === 'Tier A'
                          ? 'bg-emerald-100 text-emerald-900'
                          : dist.tier === 'Tier B'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {dist.tier}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif-display font-bold text-[#123D32]">
                      {dist.nameEn}{' '}
                      <span className="font-devanagari text-base text-[#263746]">
                        ({dist.nameNe})
                      </span>
                    </h3>
                    <div className="text-xs text-[#263746]/75 font-mono-code">
                      HQ: {dist.headquartersEn} ({dist.headquartersNe}) • Max Alt:{' '}
                      {dist.maxAltitudeMeters}m • Avg Road: {dist.highwaySpeedKmh} km/h
                    </div>
                  </div>

                  <div className="text-xs text-[#263746]">
                    <span className="font-semibold text-[#123D32]">Signature Highlights:</span>{' '}
                    {(isNe ? dist.keyHighlightsNe : dist.keyHighlightsEn).join(' • ')}
                  </div>

                  <div className="text-[11px] bg-[#F7F5EF] p-2 rounded border border-[#123D32]/10 font-mono-code text-[#123D32]">
                    Permits: {dist.permitsRequired.join(', ')}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-[#263746]/75">
                      Best: {dist.bestSeasons.join(', ')}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openCorridorCommandByDistrictName(dist.nameEn)}
                        className="px-2.5 py-1 rounded bg-[#123D32] text-[#F7F5EF] text-[11px] font-bold hover:bg-[#0D2E25] cursor-pointer"
                      >
                        {t.btnOpenCorridor}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenAiPlannerForDistrict(dist.provinceId, dist.nameEn)
                        }
                        className="px-2.5 py-1 rounded bg-[#C85A28] text-white text-[11px] font-bold hover:bg-[#B24B1E] cursor-pointer"
                      >
                        {t.btnPlanCorridorAi}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: GROUNDED AI TRIP PLANNER & OFFLINE SURVIVAL PACK (M08)
        =================================================================== */}
        {activeTab === 'AI_PLANNER' && (
          <AiTripPlannerSection
            language={language}
            currentUserUid={currentUser?.uid || null}
            verifiedListings={combinedListings.filter(
              (l) => l.verificationStatus === 'Verified'
            )}
            savedItineraries={savedItineraries}
            initialProvinceId={targetProvinceForTools}
            initialDistrictName={targetDistrictForTools}
            onSaveItinerary={handleSaveItinerary}
            onRequireSignIn={handleGoogleSignIn}
          />
        )}

        {/* ===================================================================
            TAB 4: TRAVELER PORTAL (INQUIRIES, VCV VOUCHERS, REVIEWS & SUPPORT)
        =================================================================== */}
        {activeTab === 'TRAVELER_PORTAL' && (
          <div className="space-y-6">
            <div className="bg-[#123D32] text-[#F7F5EF] rounded-xl p-6 border border-[#C6A15B]/30">
              <span className="text-xs font-mono-code text-[#C6A15B] uppercase font-semibold">
                U02 REGISTERED TRAVELER WORKSPACE • ENT-023 INQUIRIES • ENT-035 REVIEWS • ENT-036 SUPPORT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-display font-bold mt-1">
                {isNe
                  ? 'तपाईंका बुकिङ सोधपुछहरू (VCV कोड), समीक्षा र आपतकालीन सहायता केन्द्र'
                  : 'Your Inquiry-First Bookings (VCV Vouchers), Verified Reviews & Emergency Desk'}
              </h2>
            </div>

            {/* Active Traveler Inquiries */}
            <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-4 shadow-xs">
              <h3 className="text-lg font-serif-display font-bold text-[#123D32]">
                {isNe
                  ? `तपाईंका बुकिङ सोधपुछ र VCV भौचरहरू (${travelerInquiries.length})`
                  : `Your Submitted Booking Inquiries & Verified Check-In Vouchers (${travelerInquiries.length})`}
              </h3>

              {travelerInquiries.length === 0 ? (
                <div className="p-6 bg-[#F7F5EF] rounded-lg border border-[#123D32]/10 text-center space-y-2">
                  <p className="text-xs text-[#263746]">
                    {isNe
                      ? 'तपाईंले अहिलेसम्म कुनै बुकिङ सोधपुछ पठाउनुभएको छैन।'
                      : 'You have not submitted any booking inquiries yet. Browse verified listings to issue your first Inquiry-First VCV request.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('DISCOVER')}
                    className="px-4 py-2 rounded-lg bg-[#123D32] text-[#F7F5EF] text-xs font-semibold cursor-pointer"
                  >
                    Explore Verified Partners
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {travelerInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-[#F7F5EF] border border-[#123D32]/20 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-[#123D32] text-[#F7F5EF] font-mono-code text-xs font-bold">
                          {inq.vcvCode}
                        </span>
                        <span className="text-xs font-mono-code font-bold text-[#123D32]">
                          Inquiry: {inq.inquiryStatus} • Arrangement: {inq.arrangementStatus}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-[#123D32]">
                        {inq.listingTitle}
                      </h4>
                      <div className="text-xs font-mono-code text-[#263746]/80">
                        {inq.provinceId} / {inq.districtName} • Dates: {inq.preferredStartDate}{' '}
                        to {inq.preferredEndDate} ({inq.groupSize} pax)
                      </div>
                      <div className="text-xs font-mono-code text-[#123D32] font-semibold">
                        Quoted Total: NPR {inq.quotedTotalNpr.toLocaleString()} • PaymentGate:{' '}
                        {inq.paymentStatus}
                      </div>
                      {inq.partnerResponseNotes && (
                        <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                          <span className="font-bold">Partner Response:</span>{' '}
                          {inq.partnerResponseNotes}
                        </div>
                      )}
                      {!['Declined', 'Expired', 'Cancelled'].includes(inq.inquiryStatus) && (
                        <button
                          type="button"
                          onClick={() => handleTravelerCancelInquiry(inq.id)}
                          className="px-3 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 text-xs font-semibold hover:bg-rose-200 cursor-pointer"
                        >
                          Cancel Inquiry
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Verified Review (ENT-035) & Emergency / Support Ticket (ENT-036) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Review Form */}
              <form
                onSubmit={handleCreateReview}
                className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-3 shadow-xs"
              >
                <h3 className="text-lg font-serif-display font-bold text-[#123D32]">
                  {isNe
                    ? 'प्रमाणित यात्रु समीक्षा पोस्ट गर्नुहोस् (ENT-035)'
                    : 'Post Verified VCV Traveler Review (ENT-035)'}
                </h3>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Select Partner Listing
                  </label>
                  <select
                    value={reviewListingId}
                    onChange={(e) => setReviewListingId(e.target.value)}
                    disabled={combinedListings.length === 0}
                    className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs disabled:opacity-60"
                  >
                    {combinedListings.length === 0 ? (
                      <option value="">
                        No partner listings registered yet — register in Partner Desk (U03)
                      </option>
                    ) : (
                      combinedListings.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.titleEn} ({l.districtName} • KYC: {l.verificationStatus})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      VCV Check-In Code
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewVcvCode}
                      onChange={(e) => setReviewVcvCode(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Rating (1 to 5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Your Experience & Safety Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    minLength={6}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share hospitality quality, guide professionalism, and trail accuracy..."
                    className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={combinedListings.length === 0}
                  className="w-full py-2.5 rounded-lg bg-[#123D32] text-[#F7F5EF] text-xs font-semibold hover:bg-[#0D2E25] cursor-pointer disabled:opacity-50"
                >
                  Publish Verified Review to Firestore
                </button>

                {reviews.length > 0 && (
                  <div className="pt-3 border-t border-[#123D32]/10 space-y-2">
                    <div className="text-xs font-bold text-[#123D32]">
                      Recent Published Reviews ({reviews.length})
                    </div>
                    {reviews.slice(0, 3).map((r) => (
                      <div
                        key={r.id}
                        className="p-2.5 rounded bg-[#F7F5EF] border border-[#123D32]/10 text-xs"
                      >
                        <div className="flex items-center justify-between font-mono-code">
                          <span className="font-bold text-[#123D32]">{r.authorName}</span>
                          <span>
                            ★ {r.rating}/5 • {r.vcvCode}
                          </span>
                        </div>
                        <p className="text-[#263746] mt-1">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </form>

              {/* Emergency Directory & Support Ticket Form (ENT-036 / DC-017) */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-[#123D32]/15 p-5 space-y-3 shadow-xs">
                  <h3 className="text-lg font-serif-display font-bold text-[#123D32]">
                    {isNe
                      ? '२४/७ आपतकालीन उद्धार र पर्यटक प्रहरी सम्पर्क (M09)'
                      : '24/7 Nepal Emergency & Tourist Police Directory (M09)'}
                  </h3>
                  <div className="space-y-2">
                    {EMERGENCY_DIRECTORY.map((emg) => (
                      <div
                        key={emg.code}
                        className="p-3 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-xs text-[#123D32]">
                            {isNe ? emg.authorityNe : emg.authorityEn}
                          </div>
                          <div className="text-[11px] text-[#263746]/75">
                            {emg.coverageEn}
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-[#123D32] text-[#C6A15B] font-mono-code font-bold text-xs shrink-0">
                          {emg.hotline}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleCreateSupportCase}
                  className="bg-white rounded-xl border border-[#123D32]/15 p-5 space-y-3 shadow-xs"
                >
                  <h4 className="text-base font-serif-display font-bold text-[#123D32]">
                    {isNe
                      ? 'U08 सहायता वा ४८-घण्टा ढिलो सोधपुछ टिकट दर्ता (ENT-036)'
                      : 'Open U08 Support or Emergency Routing Ticket (ENT-036)'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={supportCategory}
                      onChange={(e) =>
                        setSupportCategory(
                          e.target.value as
                            | 'EmergencyRouting'
                            | 'InquiryDelay'
                            | 'KycDispute'
                            | 'SafetyConcern'
                            | 'GeneralSupport'
                        )
                      }
                      className="px-3 py-1.5 bg-[#F7F5EF] border border-[#123D32]/20 rounded text-xs"
                    >
                      <option value="EmergencyRouting">Emergency Routing Assistance</option>
                      <option value="InquiryDelay">48h Inquiry Response Escalation</option>
                      <option value="SafetyConcern">Trail / Weather Safety Concern</option>
                      <option value="KycDispute">Partner Verification Dispute</option>
                      <option value="GeneralSupport">General Traveler Support</option>
                    </select>
                    <select
                      value={supportPriority}
                      onChange={(e) =>
                        setSupportPriority(
                          e.target.value as 'Critical' | 'High' | 'Normal'
                        )
                      }
                      className="px-3 py-1.5 bg-[#F7F5EF] border border-[#123D32]/20 rounded text-xs"
                    >
                      <option value="Critical">Critical Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Normal">Normal Priority</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    required
                    minLength={4}
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                    placeholder="Subject (e.g., Need alternative verified lodge in Namche)"
                    className="w-full px-3 py-1.5 bg-[#F7F5EF] border border-[#123D32]/20 rounded text-xs"
                  />
                  <textarea
                    rows={2}
                    required
                    minLength={6}
                    value={supportDescription}
                    onChange={(e) => setSupportDescription(e.target.value)}
                    placeholder="Provide location, VCV code, or assistance needed..."
                    className="w-full px-3 py-1.5 bg-[#F7F5EF] border border-[#123D32]/20 rounded text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#C6A15B] text-[#123D32] font-bold text-xs hover:bg-[#DFC286] cursor-pointer"
                  >
                    Submit Ticket to U08 Support Queue
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: PARTNER WORKSPACE (U03 ONBOARDING, KYC & INQUIRY RESPONSE)
        =================================================================== */}
        {activeTab === 'PARTNER_DESK' && (
          <PartnerWorkspaceSection
            language={language}
            currentUserUid={currentUser?.uid || null}
            currentUserEmail={currentUser?.email || null}
            partnerListings={combinedListings.filter(
              (l) => currentUser && l.ownerUid === currentUser.uid
            )}
            partnerKycList={partnerKycList}
            partnerInquiries={partnerInquiries}
            initialProvinceId={targetProvinceForTools}
            initialDistrictName={targetDistrictForTools}
            onCreatePartnerListingAndKyc={handleCreatePartnerListingAndKyc}
            onRespondToInquiry={handleRespondToInquiry}
            onRequireSignIn={handleGoogleSignIn}
          />
        )}

        {/* ===================================================================
            TAB 6: ADMIN GOVERNANCE CONSOLE (U05–U09 KYC, TAX & AUDIT LOG)
        =================================================================== */}
        {activeTab === 'ADMIN_CONSOLE' && (
          <AdminGovernanceConsole
            language={language}
            isSuperAdminUser={isSuperAdminUser}
            allListings={combinedListings}
            allKycSubmissions={partnerKycList}
            allInquiries={
              isSuperAdminUser ? adminAllInquiries : travelerInquiries
            }
            allSupportCases={supportCases}
            auditLogs={auditLogs}
            onAdminKycDecision={handleAdminKycDecision}
            onAdminDeleteListing={handleAdminDeleteListing}
            onAdminCommissionAction={handleAdminCommissionAction}
            onAdminResolveSupportCase={handleAdminResolveSupportCase}
          />
        )}

        {/* ===================================================================
            TAB 7: 12 OFFICIAL BLUEPRINTS REGISTRY (VERSION 2.0)
        =================================================================== */}
        {activeTab === 'BLUEPRINTS_12' && (
          <BlueprintGovernancePortal language={language} />
        )}
      </main>

      {/* =====================================================================
          INTERACTIVE DESTINATION CORRIDOR & PERMIT COMMAND PAGE MODAL (M02 / M09)
          Opens when clicking Pokhara, Everest Region, Kathmandu, or any of the 77 Districts!
      ===================================================================== */}
      {activeCorridorDistrict && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#15324B]/20 max-w-4xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#15324B] text-[#F3B33D] font-mono-code text-xs font-bold">
                    {activeCorridorDistrict.id} • {activeCorridorDistrict.provinceId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono-code text-xs font-bold">
                    {activeCorridorDistrict.tier}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono-code text-xs font-bold">
                    Max Altitude: {activeCorridorDistrict.maxAltitudeMeters}m
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#15324B] mt-1.5">
                  {activeCorridorDistrict.nameEn} ({activeCorridorDistrict.nameNe}) —{' '}
                  {activeCorridorDistrict.headquartersEn} Corridor
                </h2>
                <p className="text-xs text-slate-600 font-mono-code mt-0.5">
                  Headquarters: {activeCorridorDistrict.headquartersEn} (
                  {activeCorridorDistrict.headquartersNe}) • Realistic Nepal Mountain Road
                  Speed: {activeCorridorDistrict.highwaySpeedKmh} km/h • Best Seasons:{' '}
                  {activeCorridorDistrict.bestSeasons.join(', ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCorridorDistrict(null)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-[#15324B] hover:text-white text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Key Telemetry & Safety Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-slate-200 space-y-1.5">
                <div className="text-xs font-mono-code font-bold text-[#C85A28] uppercase">
                  1. SIGNATURE HIGHLIGHTS & HERITAGE CORRIDORS
                </div>
                <div className="text-sm font-bold text-[#15324B]">
                  {activeCorridorDistrict.keyHighlightsEn.join(' • ')}
                </div>
                <div className="text-xs text-slate-600 font-devanagari">
                  {activeCorridorDistrict.keyHighlightsNe.join(' • ')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-slate-200 space-y-1.5">
                <div className="text-xs font-mono-code font-bold text-[#15324B] uppercase">
                  2. MANDATORY PERMITS & CHECKPOINTS (DOC 01 / DOC 08)
                </div>
                <div className="text-sm font-bold text-[#15324B]">
                  {activeCorridorDistrict.permitsRequired.join(' • ')}
                </div>
                <div className="text-xs text-slate-600">
                  {activeCorridorDistrict.maxAltitudeMeters >= 3000
                    ? 'AI-009 High-Altitude Guardrail ACTIVE: Sleeping elevation gain must not exceed 500m/day above 3,000m.'
                    : 'Standard elevation profile. Carry valid ID/Passport and VCV voucher.'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-slate-200 space-y-1.5">
                <div className="text-xs font-mono-code font-bold text-emerald-800 uppercase">
                  3. 24/7 EMERGENCY & RESCUE HUB (M09 / DC-017)
                </div>
                <div className="text-xs font-bold text-[#15324B]">
                  {activeCorridorDistrict.emergencyHubEn}
                </div>
                <div className="text-xs font-mono-code text-slate-600">
                  Tourist Police: 1144 • Nepal Police: 100 • HRA: +977-1-4440292
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-slate-200 space-y-2">
                <div className="text-xs font-mono-code font-bold text-[#15324B] uppercase">
                  4. DIRECT CORRIDOR ACTIONS
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenAiPlannerForDistrict(
                        activeCorridorDistrict.provinceId,
                        activeCorridorDistrict.nameEn
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#C85A28] hover:bg-[#B24B1E] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.btnPlanCorridorAi}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadCorridorSurvivalPack(activeCorridorDistrict)
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#15324B] hover:bg-[#194A6E] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.btnDownloadSurvivalPack}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenPartnerDeskForDistrict(
                        activeCorridorDistrict.provinceId,
                        activeCorridorDistrict.nameEn
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{t.btnRegisterPartnerHere}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Firestore Partner Services Registered in this District */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-serif-display font-bold text-[#15324B]">
                  Live Firestore Partner Services in {activeCorridorDistrict.nameEn} (
                  {
                    combinedListings.filter(
                      (l) =>
                        l.districtName.toLowerCase() ===
                        activeCorridorDistrict.nameEn.toLowerCase()
                    ).length
                  }
                  )
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenPartnerDeskForDistrict(
                      activeCorridorDistrict.provinceId,
                      activeCorridorDistrict.nameEn
                    )
                  }
                  className="text-xs font-bold text-[#C85A28] underline cursor-pointer"
                >
                  + {t.btnRegisterPartnerHere}
                </button>
              </div>

              {combinedListings.filter(
                (l) =>
                  l.districtName.toLowerCase() ===
                  activeCorridorDistrict.nameEn.toLowerCase()
              ).length === 0 ? (
                <div className="p-4 rounded-xl bg-[#FAF8F4] border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-700 max-w-xl">
                    <strong>0 services currently registered in {activeCorridorDistrict.nameEn}.</strong>{' '}
                    Because PHERI NEPAL has zero fake or pre-verified dummy listings, you can register the first real hotel, homestay, or guide in {activeCorridorDistrict.nameEn} via Partner Desk (U03) and approve its KYC in Admin Console (U05–U09).
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenPartnerDeskForDistrict(
                        activeCorridorDistrict.provinceId,
                        activeCorridorDistrict.nameEn
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-[#15324B] text-white text-xs font-bold hover:bg-[#194A6E] cursor-pointer shrink-0"
                  >
                    {t.btnRegisterPartnerHere}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {combinedListings
                    .filter(
                      (l) =>
                        l.districtName.toLowerCase() ===
                        activeCorridorDistrict.nameEn.toLowerCase()
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-[#FAF8F4] border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.verificationStatus === 'Verified'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              KYC: {item.verificationStatus}
                            </span>
                            <span className="text-xs font-mono-code text-slate-500">
                              {item.category} • NPR {item.priceNpr.toLocaleString()}
                            </span>
                          </div>
                          <div className="font-bold text-sm text-[#15324B] mt-1">
                            {isNe ? item.titleNe : item.titleEn}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCorridorDistrict(null);
                            setActiveInquiryListing(item);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#123D32] text-white text-xs font-bold hover:bg-[#0D2E25] cursor-pointer shrink-0"
                        >
                          Send VCV Inquiry
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INQUIRY-FIRST BOOKING MODAL (M06 / ENT-023 / VCV PROTOCOL)
      ===================================================================== */}
      {activeInquiryListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#123D32]/20 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-[#123D32]/10 pb-3">
              <div>
                <span className="text-xs font-mono-code font-bold text-[#123D32] uppercase">
                  M06 INQUIRY-FIRST BOOKING • VCV VOUCHER GENERATOR
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#123D32] mt-0.5">
                  {activeInquiryListing.titleEn}
                </h3>
                <p className="text-xs text-[#263746]/75 font-mono-code">
                  {activeInquiryListing.provinceId} • {activeInquiryListing.districtName} •
                  NPR {activeInquiryListing.priceNpr.toLocaleString()} /{' '}
                  {activeInquiryListing.pricingUnit.replace('per_', '')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveInquiryListing(null)}
                className="p-1.5 rounded-lg bg-[#F7F5EF] text-[#263746] hover:bg-[#123D32] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950">
              <span className="font-bold">Inquiry-First Guarantee (Document 02 & 03):</span>{' '}
              Submitting this form creates a live inquiry (`InquiryStatus = Submitted`, `ArrangementStatus = Pending`, `PaymentStatus = Inactive`) and issues an anti-leakage **Verified Check-In Voucher (`VCV`)** code. It is NOT an instant charge; the verified partner will respond within &lt;={activeInquiryListing.responseSlaHours} hours.
            </div>

            <form onSubmit={handleSubmitBookingInquiry} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Preferred Check-In / Start *
                  </label>
                  <input
                    type="date"
                    required
                    value={inquiryStartDate}
                    onChange={(e) => setInquiryStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Preferred Check-Out / End *
                  </label>
                  <input
                    type="date"
                    required
                    value={inquiryEndDate}
                    onChange={(e) => setInquiryEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Group Size (Travelers) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={inquiryGroupSize}
                    onChange={(e) => setInquiryGroupSize(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Special Requests, Dietary Needs, or Permit Questions *
                </label>
                <textarea
                  rows={3}
                  required
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-xs"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 flex items-center justify-between text-xs font-mono-code">
                <span>Estimated Base Quote ({inquiryGroupSize} pax):</span>
                <span className="font-bold text-sm text-[#123D32]">
                  NPR{' '}
                  {(
                    activeInquiryListing.priceNpr * Math.max(1, inquiryGroupSize)
                  ).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveInquiryListing(null)}
                  className="px-4 py-2 rounded-lg bg-[#F7F5EF] text-[#263746] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="px-5 py-2.5 rounded-lg bg-[#123D32] text-[#F7F5EF] text-xs font-bold hover:bg-[#0D2E25] cursor-pointer disabled:opacity-60"
                >
                  {submittingInquiry
                    ? 'Writing to Firestore...'
                    : 'Submit Inquiry & Generate VCV Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer (DC-002 & DC-017 Statutory Liability Disclaimer) */}
      <footer className="bg-[#123D32] text-[#F7F5EF] border-t border-[#C6A15B]/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <div className="font-serif-display font-bold text-xl text-[#C6A15B]">
                PHERI NEPAL • फेरी नेपाल
              </div>
              <p className="text-[#F7F5EF]/80 leading-relaxed">
                Nepal’s Trusted Tourism Ecosystem uniting all 7 provinces and 77 districts with evidence-based KYC verification and Inquiry-First booking integrity.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono-code font-bold text-[#C6A15B] uppercase">
                7 Provinces Coverage
              </div>
              <p className="text-[#F7F5EF]/80">
                PR-01 Koshi (14) • PR-02 Madhesh (8) • PR-03 Bagmati (13) • PR-04 Gandaki (11) • PR-05 Lumbini (12) • PR-06 Karnali (10) • PR-07 Sudurpashchim (9)
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono-code font-bold text-[#C6A15B] uppercase">
                Blueprint Governance
              </div>
              <p className="text-[#F7F5EF]/80">
                Governed by Documents 01–12 (Version 2.0 Audit-Resolved • 17,076 lines). Zero-Trust Firestore ABAC rules & Nepal 13% VAT / TDS ledger compliance.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono-code font-bold text-[#C6A15B] uppercase">
                24/7 Emergency Hotlines
              </div>
              <p className="text-[#F7F5EF]/80 font-mono-code">
                Tourist Police: 1144 • Nepal Police: 100 • HRA Mountain Rescue: +977-1-4440292
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 text-[11px] text-[#F7F5EF]/75 flex flex-wrap items-center justify-between gap-2">
            <div>
              <strong>DC-017 Statutory Disclaimer:</strong> Emergency contacts, altitude limits, and permit matrices are provided for traveler safety preparedness. Always verify live trail conditions with Nepal Tourism Board and Tourist Police (1144).
            </div>
            <div className="font-mono-code text-[#C6A15B]">
              ENABLE_LIVE_PAYMENTS = false • Phase 1 Inquiry-First Active
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
