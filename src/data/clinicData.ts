export interface OpeningHourEntry {
  day: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  googleHours: string;
  doorNoticeNote: string;
  openHour24: number | null;
  closeHour24: number | null;
}

export interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'Core Specialty' | 'Preventive & General' | 'Restorative & Endodontic';
  verificationStatus: 'Verified Core Specialty' | 'Verified Clinical Offering';
  summary: string;
  heroIntro: string;
  image: string;
  imageAlt: string;
  imageSourceNote: string;
  whatItInvolves: string[];
  whoShouldEnquire: string[];
  assessmentProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  clinicalNotes: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
}

export interface VerifiedReview {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  relativeDate: string;
  isoDate: string;
  publishedLabel: string;
  text: string;
  source: 'Google Maps';
  reviewUrl: string;
  authorProfileUrl: string;
  themes: ('Orthodontics & Braces' | 'Doctor Demeanor' | 'Affordability' | 'Waiting Time & Scheduling')[];
  highlightedQuote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Entrance & Signage' | 'Waiting Area & Reception' | 'Clinical Operatory' | 'Instruments & Sterilization';
  src: string;
  alt: string;
  caption: string;
  attribution: string;
  sourceUrl: string;
  aspectRatio: 'landscape' | 'portrait';
}

export interface FAQItem {
  id: string;
  category: 'Appointments & Timings' | 'Orthodontics & Braces' | 'Location & Fees' | 'General Care';
  question: string;
  answer: string;
}

export const CLINIC_INFO = {
  name: 'HR Sukhia Dental Clinic',
  signageName: 'Dr. H.R. Sukhia Dental Surgery & Orthodontics',
  tagline: 'Specialist Orthodontics, Fixed Braces & Comprehensive Dental Care in Saddar, Karachi',
  placeId: 'ChIJDyfERnI-sz4RXS_cF1qNraU',
  cidUrl: 'https://maps.google.com/?cid=11938353605315931997',
  shortMapsUrl: 'https://maps.app.goo.gl/RGWmGEUgHwFam5qf9',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=24.858541,67.0267195&destination_place_id=ChIJDyfERnI-sz4RXS_cF1qNraU',
  phoneInternational: '+92 333 3770353',
  phoneNational: '0333 3770353',
  phoneTelHref: 'tel:+923333770353',
  historicLandlineNote: '021-35218975 (Historical clinic chart listing; primary active contact is 0333 3770353)',
  facebookUrl: 'http://www.facebook.com/sukhia.dental',
  address: {
    floorAndBuilding: '1st Floor, 101 Abdullah Haroon Road (Near Gulzar Building)',
    area: 'Saddar',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '74400',
    country: 'Pakistan',
    fullFormatted: '1st Floor, 101 Abdullah Haroon Road (Near Gulzar Building), Saddar, Karachi, Sindh, Pakistan',
    googleFormatted:
      'HR Sukhia Dental Clinic, Abdullah Haroon Road Saddar, Karachi, Pakistan',
  },
  coordinates: {
    lat: 24.858541,
    lng: 67.0267195,
  },
  googleRating: {
    score: 4.8,
    count: 127,
    sourceLabel: 'Verified Google Business Profile (Place ID: ChIJDyfERnI-sz4RXS_cF1qNraU)',
    lastVerified: 'October 2026',
  },
  visitorPolicyNotes: [
    'Appointments & Walk-ins: Patients with prior appointments are prioritized ("Patients with Appointment Taken First"). Calling 0333 3770353 before visiting is strongly advised.',
    'Operatory Accompaniment Policy: Per posted clinic safety guidelines, only one accompanying person is permitted inside the clinical operatory with a patient.',
    'Ring Bell if Locked: The clinic entrance on the 1st floor has an attendance bell during afternoon/evening clinical hours.',
  ],
};

export const OPENING_HOURS: OpeningHourEntry[] = [
  {
    day: 'Monday',
    dayIndex: 1,
    googleHours: '3:00 PM – 7:00 PM',
    doorNoticeNote: 'Door notice lists 2:00 PM – 7:00 PM',
    openHour24: 15,
    closeHour24: 19,
  },
  {
    day: 'Tuesday',
    dayIndex: 2,
    googleHours: '3:00 PM – 7:00 PM',
    doorNoticeNote: 'Door notice lists 2:00 PM – 7:00 PM',
    openHour24: 15,
    closeHour24: 19,
  },
  {
    day: 'Wednesday',
    dayIndex: 3,
    googleHours: '3:00 PM – 7:00 PM',
    doorNoticeNote: 'Door notice lists 2:00 PM – 7:00 PM',
    openHour24: 15,
    closeHour24: 19,
  },
  {
    day: 'Thursday',
    dayIndex: 4,
    googleHours: '3:00 PM – 7:00 PM (Confirm by Phone)',
    doorNoticeNote: 'Entrance door plaque notes Thursday closed; please call 0333 3770353 to confirm before visiting',
    openHour24: 15,
    closeHour24: 19,
  },
  {
    day: 'Friday',
    dayIndex: 5,
    googleHours: '3:00 PM – 7:00 PM',
    doorNoticeNote: 'Door notice lists 2:00 PM – 7:00 PM',
    openHour24: 15,
    closeHour24: 19,
  },
  {
    day: 'Saturday',
    dayIndex: 6,
    googleHours: '2:00 PM – 7:00 PM',
    doorNoticeNote: '2:00 PM – 7:00 PM on both Google Profile & door notice',
    openHour24: 14,
    closeHour24: 19,
  },
  {
    day: 'Sunday',
    dayIndex: 0,
    googleHours: 'Closed',
    doorNoticeNote: 'Closed',
    openHour24: null,
    closeHour24: null,
  },
];

export const DENTIST_PROFILE = {
  fullName: 'Prof. Dr. H.R. Sukhia',
  fullExpandedName: 'Prof. Dr. Hoshang Rumi Sukhia',
  primaryTitle: 'Professor of Orthodontics & Specialist Dental Surgeon',
  qualificationsString: 'BDS, BSc, DOrth, MS, FDSRCPS (Glasg), FFD (Orth) RCSI, MOrth RCS (Edin)',
  credentialsList: [
    {
      code: 'BDS, BSc',
      institution: 'Bachelor of Dental Surgery & Bachelor of Science',
      type: 'Primary Dental Qualification',
    },
    {
      code: 'DOrth, MS',
      institution: 'Postgraduate Diploma & Master of Surgery in Orthodontics',
      type: 'Specialist Orthodontic Training',
    },
    {
      code: 'FDSRCPS (Glasgow)',
      institution: 'Fellow in Dental Surgery, Royal College of Physicians and Surgeons of Glasgow',
      type: 'Royal College Fellowship',
    },
    {
      code: 'FFD (Orth) RCSI (Ireland)',
      institution: 'Fellow of the Faculty of Dentistry (Orthodontics), Royal College of Surgeons in Ireland',
      type: 'Specialist Royal College Fellowship',
    },
    {
      code: 'MOrth RCS (Edinburgh)',
      institution: 'Membership in Orthodontics, Royal College of Surgeons of Edinburgh',
      type: 'Specialist Orthodontic Membership',
    },
  ],
  academicAndLeadershipRoles: [
    {
      role: 'Professor of Orthodontics & Principal (Dental Section)',
      organization: 'Sir Syed College of Medical Sciences (SSCMS) for Girls, Karachi',
      source: 'Official SSCMS Institutional Profile (sscms.edu.pk)',
    },
    {
      role: 'Former Head of the Department of Orthodontics',
      organization: 'Jinnah Medical & Dental College (JMDC), Karachi',
      source: 'Verified Academic Biography',
    },
    {
      role: 'Founding Member',
      organization: 'Pakistan Association of Orthodontists (PAO)',
      source: 'Academic & Professional Dental Records',
    },
    {
      role: 'Author of Undergraduate & Postgraduate Orthodontic Literature',
      organization: 'Author of "Student Orthodontics: For Complete Viva, Practical and MCQ\'s"',
      source: 'Institutional Curriculum & Dental Publications',
    },
    {
      role: 'Clinical Award Recognition',
      organization: '1st Prize Winner — Aesthetic Dentistry MENA Awards (Orthodontic Category)',
      source: 'CAPP MEA / Academic Records',
    },
  ],
  associatedSpecialistNote:
    'The Sukhia name is closely associated with academic orthodontics in Karachi, including Dr. Rashna Hoshang Sukhia (BDS, FCPS, MSc, FFD Orth RCSI, MOrth RCS Ed — Gold Medalist and Associate Professor / Section Head of Orthodontics at Aga Khan University Hospital).',
  shortBio:
    'Prof. Dr. H.R. Sukhia is one of Karachi’s senior orthodontic educators and clinical specialists. Combining Royal College fellowships from Glasgow, Ireland, and Edinburgh with decades of academic leadership as Principal of the Dental Section at Sir Syed College of Medical Sciences, he leads clinical care at 101 Abdullah Haroon Road with a focus on fixed orthodontic appliances, bite correction, and ethical dental surgery.',
  philosophyPoints: [
    {
      title: 'Evidence-Based Orthodontic Mechanics',
      description:
        'Every fixed braces treatment plan is grounded in anatomical assessment of tooth crowding, overjet, deep bite, and jaw alignment rather than one-size-fits-all cosmetic shortcuts.',
    },
    {
      title: 'Accessible Specialist Care in Central Karachi',
      description:
        'Located in the heart of Saddar on Abdullah Haroon Road, the clinic has remained committed to keeping specialist-led orthodontic treatment financially accessible for families and students.',
    },
    {
      title: 'Long-Term Retention & Stability',
      description:
        'Active tooth movement is followed by structured retainer supervision so that alignment achieved over 18–24 months remains stable over time.',
    },
  ],
};

// Directly transcribed from the authentic wall chart inside HR Sukhia Dental Clinic (waiting-lounge-chart.jpg)
export const ORTHODONTIC_DIAGNOSTIC_CHART = {
  chartTitle: 'Problem Identification Chart — Do You Need Braces?',
  chartSubtitle:
    'Transcribed directly from the educational diagnostic chart displayed in the waiting lounge at Sukhia Dental Surgery & Orthodontics, guiding parents, adolescents, and adults on common malocclusions treated with fixed braces:',
  conditions: [
    {
      index: '01',
      name: 'Deep Bite',
      clinicalSummary:
        'Upper front teeth excessively overlap the lower front teeth vertically when biting together, which can lead to palatal gum irritation or accelerated lower incisor wear.',
    },
    {
      index: '02',
      name: 'Crowded Teeth',
      clinicalSummary:
        'Insufficient arch space causes teeth to rotate, overlap, or erupt out of alignment, making thorough brushing and flossing between contact points difficult.',
    },
    {
      index: '03',
      name: 'Delayed Eruption of Teeth',
      clinicalSummary:
        'Permanent teeth that fail to emerge on schedule due to arch constriction, retained primary teeth, or impacted eruption paths requiring guided orthodontic space management.',
    },
    {
      index: '04',
      name: 'Underbite',
      clinicalSummary:
        'Lower front teeth sit forward of the upper front teeth when the jaw closes, affecting masticatory balance and facial profile harmony.',
    },
    {
      index: '05',
      name: 'Overlapped Teeth',
      clinicalSummary:
        'Individual incisors or canines slipping across adjacent teeth due to arch length discrepancy, treated with controlled fixed bracket torque and archwire leveling.',
    },
    {
      index: '06',
      name: 'Spacing of Teeth',
      clinicalSummary:
        'Visible gaps (diastemas) between teeth caused by tooth-size/arch-size discrepancies, missing teeth, or labial frenum attachments.',
    },
    {
      index: '07',
      name: 'Open Bite',
      clinicalSummary:
        'Upper and lower front teeth do not make contact when the back molars are closed together, often impacting incisal biting and speech articulation.',
    },
    {
      index: '08',
      name: 'Protruded Teeth',
      clinicalSummary:
        'Upper incisors flare noticeably forward (increased overjet), increasing susceptibility to accidental dental trauma and preventing relaxed lip closure.',
    },
  ],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'orthodontics-fixed-braces',
    number: '01',
    title: 'Orthodontics & Fixed Braces',
    shortTitle: 'Orthodontics & Braces',
    category: 'Core Specialty',
    verificationStatus: 'Verified Core Specialty',
    summary:
      'Specialist-led fixed orthodontic appliance therapy for crowded, protruded, spaced, and malaligned teeth under the direct supervision of Prof. Dr. H.R. Sukhia.',
    heroIntro:
      'Fixed orthodontic treatment is the primary clinical focus of HR Sukhia Dental Clinic. Led by Prof. Dr. H.R. Sukhia (FDSRCPS, FFD Orth RCSI, MOrth RCS Ed), treatment addresses dental crowding, protrusion, deep bites, open bites, and spacing across adolescents and adults.',
    image: '/assets/clinic/waiting-lounge-chart.jpg',
    imageAlt:
      'Authentic waiting area at HR Sukhia Dental Clinic displaying the Orthodontics Problem Identification Chart for parents and children',
    imageSourceNote:
      'Authentic clinic photograph showing the in-clinic "Problem Identification Chart" for fixed orthodontic braces at 101 Abdullah Haroon Road.',
    whatItInvolves: [
      'Clinical examination of dental arches, facial symmetry, and occlusal relationship (overjet, overbite, and midline alignment).',
      'Review of diagnostic dental radiographs (OPG / lateral cephalogram when clinically indicated) and study models.',
      'Pre-orthodontic dental hygiene check (patients are advised to request scaling and polishing prior to bracket bonding if calculus is present).',
      'Precision placement of fixed orthodontic brackets, molar bands, and sequential archwires.',
      'Periodic adjustment and archwire progression visits scheduled every 4 to 6 weeks.',
    ],
    whoShouldEnquire: [
      'Children and teenagers exhibiting crowded teeth, delayed tooth eruption, or protruding front teeth.',
      'Adults seeking structured correction of crooked, overlapped, or spaced teeth.',
      'Patients experiencing biting difficulties due to deep bite, open bite, or underbite malocclusions.',
    ],
    assessmentProcess: [
      {
        step: 'Step 1',
        title: 'Initial Orthodontic Consultation',
        description:
          'Dr. Sukhia evaluates tooth alignment, jaw closure, and arch space to determine whether fixed braces are indicated and when treatment should begin.',
      },
      {
        step: 'Step 2',
        title: 'Diagnostic Records & Pre-Braces Hygiene',
        description:
          'X-rays, impressions, and any required pre-treatment teeth cleaning or restorative fillings are completed before bonding fixed appliances.',
      },
      {
        step: 'Step 3',
        title: 'Active Fixed Appliance Therapy',
        description:
          'Brackets and archwires gently guide teeth into proper alignment over a typical multi-month timeframe, with regular periodic tightenings.',
      },
      {
        step: 'Step 4',
        title: 'Debonding & Retainer Transition',
        description:
          'Once alignment objectives are met, braces are removed and custom retainers are fitted to preserve the result.',
      },
    ],
    clinicalNotes:
      'Treatment duration depends on the complexity of malocclusion, patient age, bone response, and attendance at scheduled adjustment visits. Many patients in public reviews report treatment courses around 18 to 24 months, though individual timelines vary.',
    faqs: [
      {
        question: 'Does Prof. Dr. H.R. Sukhia personally oversee braces treatment?',
        answer:
          'Yes. Prof. Dr. H.R. Sukhia is a specialist orthodontist and Professor of Orthodontics who oversees orthodontic assessments and fixed braces treatment at the Saddar clinic.',
      },
      {
        question: 'Should I get scaling and polishing before my braces are fitted?',
        answer:
          'Yes. Having clean teeth and healthy gums prior to bracket placement is good clinical practice. Please ask the clinical team during your consultation if you require scaling and polishing before bonding.',
      },
      {
        question: 'How much does fixed braces treatment cost?',
        answer:
          'Orthodontic fees vary based on the complexity of the case, arch requirements, and duration. Patient reviews consistently note that the clinic offers reasonable and accessible pricing. Please visit for an in-person clinical evaluation to receive an accurate quotation.',
      },
    ],
    relatedSlugs: ['retainers-alignment-maintenance', 'teeth-scaling-polishing', 'general-dental-care'],
  },
  {
    slug: 'retainers-alignment-maintenance',
    number: '02',
    title: 'Orthodontic Retainers & Post-Braces Care',
    shortTitle: 'Retainers & Maintenance',
    category: 'Core Specialty',
    verificationStatus: 'Verified Core Specialty',
    summary:
      'Post-braces retention appliances and periodic follow-up reviews to stabilize newly aligned teeth and prevent orthodontic relapse.',
    heroIntro:
      'Completing active braces treatment is only part of achieving a lasting smile. Orthodontic retainers hold teeth in their corrected positions while surrounding periodontal fibers and bone adapt.',
    image: '/assets/clinic/sterilization-instruments.jpg',
    imageAlt:
      'Authentic orthodontic pliers, wire instruments, and clinical sterilization trays inside HR Sukhia Dental Clinic',
    imageSourceNote:
      'Authentic clinic photograph of the orthodontic pliers and appliance adjustment station at HR Sukhia Dental Clinic.',
    whatItInvolves: [
      'Debonding assessment and enamel polishing after removal of fixed orthodontic brackets.',
      'Impression taking and fitting of removable (Hawley or clear vacuum-formed) or fixed lingual retainers as clinically appropriate.',
      'Periodic retainer check-ups to verify fit, wire integrity, and stability of tooth alignment.',
      'Guidance on daily wear schedules and hygienic cleaning of removable retainers.',
    ],
    whoShouldEnquire: [
      'Patients completing fixed braces treatment who need structured retention supervision.',
      'Individuals whose existing orthodontic retainer has become loose, cracked, or lost.',
      'Past orthodontic patients noticing minor shifting who wish to evaluate retention options.',
    ],
    assessmentProcess: [
      {
        step: 'Step 1',
        title: 'Alignment Stability Check',
        description:
          'Inspection of occlusal contacts and tooth positions at the conclusion of active braces or during a retention review.',
      },
      {
        step: 'Step 2',
        title: 'Impression & Appliance Fabrication',
        description:
          'Accurate dental impressions are taken to fabricate a comfortable, custom-fitted retainer.',
      },
      {
        step: 'Step 3',
        title: 'Fitting & Wear Instructions',
        description:
          'The retainer is adjusted for passive, comfortable seating and clear instructions are provided on full-time vs. night-time wear.',
      },
      {
        step: 'Step 4',
        title: 'Periodic Follow-Up Checks',
        description:
          'Occasional review visits with your retainer help maintain long-term alignment.',
      },
    ],
    clinicalNotes:
      'Consistent retainer wear as instructed by the orthodontist is essential to prevent natural age-related or periodontal tooth drift after braces.',
    faqs: [
      {
        question: 'Do I need to bring my existing retainer to check-up visits?',
        answer:
          'Yes. Always bring your current retainer in its protective case so the dentist can inspect its fit and make any necessary wire adjustments.',
      },
      {
        question: 'What if I lose or break my retainer?',
        answer:
          'Contact the clinic at 0333 3770353 promptly. Delaying replacement after losing a retainer increases the risk of teeth shifting back toward their original positions.',
      },
    ],
    relatedSlugs: ['orthodontics-fixed-braces', 'teeth-scaling-polishing'],
  },
  {
    slug: 'general-dental-care',
    number: '03',
    title: 'General Dental Care & Diagnostic Consultations',
    shortTitle: 'General Dental Care',
    category: 'Preventive & General',
    verificationStatus: 'Verified Clinical Offering',
    summary:
      'Comprehensive oral examinations, toothache evaluations, dental check-ups, and treatment planning for children, adults, and families.',
    heroIntro:
      'Alongside specialist orthodontics, HR Sukhia Dental Clinic provides general dental consultations and routine clinical dentistry in a clean, air-conditioned environment on Abdullah Haroon Road.',
    image: '/assets/clinic/treatment-operatory-wide.jpg',
    imageAlt:
      'Authentic clinical operatory at HR Sukhia Dental Clinic showing dental chairs, framed Royal College diplomas, and sterilization bay',
    imageSourceNote:
      'Authentic clinic photograph uploaded by HR Sukhia showing the dual-chair clinical operatory and framed Royal College credentials.',
    whatItInvolves: [
      'Detailed visual and tactile inspection of teeth, gums, and oral tissues.',
      'Assessment of tooth sensitivity, dental caries (cavities), gum inflammation, or bite discomfort.',
      'Clear explanation of clinical findings and discussion of practical treatment options.',
      'Coordination between general restorative care and orthodontic treatment when both are required.',
    ],
    whoShouldEnquire: [
      'Patients seeking a routine dental check-up or second opinion in Saddar, Karachi.',
      'Individuals experiencing localized tooth sensitivity, food impaction, or mild dental discomfort.',
      'Parents bringing school-age children for an assessment of developing permanent teeth.',
    ],
    assessmentProcess: [
      {
        step: 'Step 1',
        title: 'Symptom & History Discussion',
        description:
          'You share your primary dental concern, duration of symptoms, and relevant medical history.',
      },
      {
        step: 'Step 2',
        title: 'Chairside Clinical Examination',
        description:
          'Careful intraoral examination under operatory lighting to identify the cause of the concern.',
      },
      {
        step: 'Step 3',
        title: 'Radiographic Review (If Needed)',
        description:
          'Where decay depth or root anatomy must be checked, appropriate dental radiographs are requested.',
      },
      {
        step: 'Step 4',
        title: 'Transparent Treatment Plan',
        description:
          'The dentist outlines recommended procedures, expected visits, and fee estimates before starting treatment.',
      },
    ],
    clinicalNotes:
      'To minimize waiting times during busy afternoon/evening clinic hours, patients are encouraged to call ahead at 0333 3770353 before visiting.',
    faqs: [
      {
        question: 'Can I visit for a general dental check-up even if I do not need braces?',
        answer:
          'Yes. The practice is a Dental Surgery & Orthodontics clinic and evaluates general dental concerns in addition to orthodontic cases.',
      },
      {
        question: 'Are appointments required for consultations?',
        answer:
          'While walk-in consultations are accommodated during afternoon and evening hours, the clinic door notice explicitly states "Patients with Appointment Taken First." Calling 0333 3770353 beforehand helps reduce waiting times.',
      },
    ],
    relatedSlugs: ['teeth-scaling-polishing', 'restorative-dentistry-crowns', 'orthodontics-fixed-braces'],
  },
  {
    slug: 'teeth-scaling-polishing',
    number: '04',
    title: 'Teeth Cleaning, Scaling & Polishing',
    shortTitle: 'Scaling & Polishing',
    category: 'Preventive & General',
    verificationStatus: 'Verified Clinical Offering',
    summary:
      'Professional removal of hardened plaque (calculus), extrinsic surface stains, and gingival debris to support healthy gums before and during dental treatment.',
    heroIntro:
      'Routine professional scaling and polishing removes mineralized tartar buildup that regular toothbrushing cannot reach—an especially important step prior to starting fixed orthodontic braces.',
    image: '/assets/clinic/treatment-bay-window.jpg',
    imageAlt:
      'Authentic clinical bay and equipment station at HR Sukhia Dental Clinic in Saddar, Karachi',
    imageSourceNote:
      'Authentic clinic photograph of the natural-light operatory bay at HR Sukhia Dental Clinic.',
    whatItInvolves: [
      'Periodontal and gingival inspection to locate supragingival and subgingival calculus deposits.',
      'Careful ultrasonic and hand-instrument scaling to remove hardened tartar around the gumline and interdental spaces.',
      'Prophylaxis polishing to smooth enamel surfaces and lift tea, coffee, or everyday surface staining.',
      'Oral hygiene guidance tailored to patients with natural dentition or fixed orthodontic brackets.',
    ],
    whoShouldEnquire: [
      'Patients preparing to have fixed orthodontic braces fitted who want a thorough pre-bonding cleaning.',
      'Individuals noticing bleeding gums during brushing, tartar buildup behind lower front teeth, or persistent surface staining.',
      'Patients due for a routine 6-month preventive hygiene visit.',
    ],
    assessmentProcess: [
      {
        step: 'Step 1',
        title: 'Gum & Tartar Evaluation',
        description:
          'Examination of gingival health and identification of calculus accumulation zones.',
      },
      {
        step: 'Step 2',
        title: 'Ultrasonic & Hand Scaling',
        description:
          'Gentle removal of mineralized plaque deposits from tooth surfaces and along the gum margin.',
      },
      {
        step: 'Step 3',
        title: 'Enamel Polishing',
        description:
          'Smoothing tooth surfaces to remove extrinsic stains and slow subsequent plaque attachment.',
      },
      {
        step: 'Step 4',
        title: 'Home Care Recommendations',
        description:
          'Practical brushing, interdental brush, and mouthrinse advice—especially for orthodontic patients.',
      },
    ],
    clinicalNotes:
      'If you are scheduling fixed braces, we strongly recommend specifically requesting a scaling and polishing session prior to bracket placement so your gums remain healthy throughout orthodontic treatment.',
    faqs: [
      {
        question: 'Why is scaling recommended before getting braces?',
        answer:
          'Fixed brackets and archwires create additional areas where plaque can collect. Starting orthodontic treatment with clean, tartar-free enamel and healthy gums reduces gum inflammation during treatment.',
      },
      {
        question: 'Does scaling weaken tooth enamel?',
        answer:
          'No. Professional scaling removes mineralized calculus and plaque sitting on top of the tooth surface; it does not remove healthy enamel.',
      },
    ],
    relatedSlugs: ['orthodontics-fixed-braces', 'general-dental-care'],
  },
  {
    slug: 'restorative-dentistry-crowns',
    number: '05',
    title: 'Restorative Dentistry, Fillings & Prosthodontics',
    shortTitle: 'Restorative Care',
    category: 'Restorative & Endodontic',
    verificationStatus: 'Verified Clinical Offering',
    summary:
      'Repair of decayed, chipped, or missing teeth using dental fillings, crowns, fixed bridges, and removable dentures.',
    heroIntro:
      'Restorative dental care focuses on preserving natural tooth structure, sealing dental cavities, and replacing missing teeth to restore comfortable chewing function.',
    image: '/assets/clinic/orthodontic-instruments-tray.jpg',
    imageAlt:
      'Authentic chairside dental delivery unit and restorative handpieces at HR Sukhia Dental Clinic',
    imageSourceNote:
      'Authentic clinic photograph of the chairside handpiece unit and clinical tray at HR Sukhia Dental Clinic.',
    whatItInvolves: [
      'Conservative removal of dental caries and placement of durable dental fillings.',
      'Preparation and fitting of protective dental crowns (caps) for structurally weakened or root-treated teeth.',
      'Fixed bridgework or removable partial/complete dentures to replace missing teeth and prevent adjacent teeth from tilting.',
      'Occlusal adjustment so restorations bite comfortably against opposing teeth.',
    ],
    whoShouldEnquire: [
      'Patients with visible cavities, food trapping, or fractured existing fillings.',
      'Patients needing a protective crown following root canal therapy.',
      'Adults looking to replace one or more missing teeth to restore chewing balance.',
    ],
    assessmentProcess: [
      {
        step: 'Step 1',
        title: 'Structural Tooth Assessment',
        description:
          'Evaluation of remaining sound tooth structure, pulp vitality, and bite forces.',
      },
      {
        step: 'Step 2',
        title: 'Caries Removal & Preparation',
        description:
          'Cleaning out decay and shaping the tooth conservatively for a filling or crown.',
      },
      {
        step: 'Step 3',
        title: 'Restoration Placement or Impression',
        description:
          'Direct placement of a dental filling, or precision impression taking for laboratory-crafted crowns, bridges, or dentures.',
      },
      {
        step: 'Step 4',
        title: 'Bite Verification',
        description:
          'Checking contact points and occlusal height for natural comfort.',
      },
    ],
    clinicalNotes:
      'For specialized surgical procedures such as dental implants, please enquire directly with the clinic at 0333 3770353 so the team can confirm specialist availability and radiographic requirements.',
    faqs: [
      {
        question: 'Should cavities be filled before starting braces?',
        answer:
          'Yes. Any active dental decay should be restored with fillings before orthodontic bands or brackets are cemented onto the teeth.',
      },
      {
        question: 'How can I enquire about crowns, dentures, or implants?',
        answer:
          'Call 0333 3770353 to schedule an examination. The dentist will inspect the site and advise on the most appropriate restorative or prosthetic option.',
      },
    ],
    relatedSlugs: ['root-canal-endodontics', 'general-dental-care'],
  },
  {
    slug: 'root-canal-endodontics',
    number: '06',
    title: 'Root Canal Treatment & Dental Extractions',
    shortTitle: 'Root Canal & Surgery',
    category: 'Restorative & Endodontic',
    verificationStatus: 'Verified Clinical Offering',
    summary:
      'Endodontic root canal therapy to relieve deep tooth pain and save infected natural teeth, as well as routine dental extractions when required.',
    heroIntro:
      'When dental decay or trauma reaches the internal pulp tissue of a tooth, root canal treatment cleans and seals the root canals so the natural tooth can be retained rather than extracted. Where a tooth is non-restorable or orthodontic space creation is planned, careful dental extractions are also performed.',
    image: '/assets/clinic/entrance-signage.jpg',
    imageAlt:
      'Entrance signage of Dr. H.R. Sukhia Dental Surgery & Orthodontics at 101 Abdullah Haroon Road, Saddar, Karachi',
    imageSourceNote:
      'Authentic clinic entrance photograph showing the "Dr. H.R. Sukhia Dental Surgery & Orthodontics" signage.',
    whatItInvolves: [
      'Diagnostic evaluation of acute toothache, prolonged thermal sensitivity, or periapical tenderness.',
      'Endodontic access, cleaning, shaping, and obturation (sealing) of infected root canals.',
      'Routine dental extractions for non-restorable teeth or planned orthodontic premolar extractions when clinically indicated for severe crowding/protrusion.',
      'Post-procedure recovery instructions and planning for a final coronal restoration.',
    ],
    whoShouldEnquire: [
      'Patients experiencing persistent throbbing tooth pain or pain when biting down.',
      'Orthodontic patients advised to undergo planned therapeutic extractions to relieve severe dental crowding or protrusion.',
      'Patients with deeply decayed teeth seeking to preserve the natural root.',
    ],
    assessmentProcess: [
      {
        step: 'Step 1',
        title: 'Pain & Radiographic Diagnosis',
        description:
          'Clinical testing and periapical X-ray evaluation to assess root anatomy and infection extent.',
      },
      {
        step: 'Step 2',
        title: 'Local Anesthesia & Comfort',
        description:
          'Careful administration of local anesthesia before initiating endodontic or extraction care.',
      },
      {
        step: 'Step 3',
        title: 'Endodontic Therapy or Extraction',
        description:
          'Multi-step cleaning and sealing of the root canal system, or gentle extraction of the indicated tooth.',
      },
      {
        step: 'Step 4',
        title: 'Final Restoration & Follow-Up',
        description:
          'Placement of a permanent filling or protective crown after root canal completion.',
      },
    ],
    clinicalNotes:
      'Root canal treatment often requires more than one clinical visit depending on root canal anatomy and infection status.',
    faqs: [
      {
        question: 'Are tooth extractions sometimes needed for orthodontic braces?',
        answer:
          'In certain cases of severe dental crowding or significant tooth protrusion, planned extraction of specific teeth may be recommended to create space for aligning the remaining teeth harmoniously. Dr. Sukhia discusses this after reviewing your clinical examination.',
      },
    ],
    relatedSlugs: ['restorative-dentistry-crowns', 'orthodontics-fixed-braces', 'general-dental-care'],
  },
];

// Genuine, verbatim Google Reviews retrieved from Google Places API (Place ID: ChIJDyfERnI-sz4RXS_cF1qNraU)
export const VERIFIED_GOOGLE_REVIEWS: VerifiedReview[] = [
  {
    id: 'rev-syed-shahiq-ibrahim',
    reviewerName: 'Syed Shahiq Ibrahim',
    reviewerInitials: 'SI',
    rating: 5,
    relativeDate: '2 months ago',
    isoDate: '2026-08-22',
    publishedLabel: 'August 2026',
    text: "Me and my sister had our braces done from Dr sukhia. We had a great experience.  Dr guided us throughout our treatment.  The staff's were also very cooperative .",
    source: 'Google Maps',
    reviewUrl:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2tKaFREUklVV2RHTmsxM2JWOUdRMWhGU1dVemQxRRAB!2m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    authorProfileUrl: 'https://www.google.com/maps/contrib/106380405799724214375/reviews',
    themes: ['Orthodontics & Braces', 'Doctor Demeanor'],
    highlightedQuote: 'Me and my sister had our braces done from Dr sukhia. We had a great experience. Dr guided us throughout our treatment.',
  },
  {
    id: 'rev-muntaha-25',
    reviewerName: 'Muntaha Muntaha25',
    reviewerInitials: 'MM',
    rating: 5,
    relativeDate: '10 months ago',
    isoDate: '2025-12-08',
    publishedLabel: 'December 2025',
    text: 'Dr. Sukhia is a very good person. He makes patients feel very comfortable and provides excellent service at a very reasonable price.',
    source: 'Google Maps',
    reviewUrl:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2toVllsSXRUblpOUTBsSExWWlNYMGsxTjFCdmIxRRAB!2m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    authorProfileUrl: 'https://www.google.com/maps/contrib/116980766811077611896/reviews',
    themes: ['Doctor Demeanor', 'Affordability'],
    highlightedQuote: 'He makes patients feel very comfortable and provides excellent service at a very reasonable price.',
  },
  {
    id: 'rev-zoya-ahmed',
    reviewerName: 'Zoya Ahmed',
    reviewerInitials: 'ZA',
    rating: 5,
    relativeDate: '3 years ago',
    isoDate: '2023-07-14',
    publishedLabel: 'July 2023',
    text: 'Truly amazing dentist. He straightened and perfected my teeth under 2 years by braces. Occasional check ups with my retainer has helped to maintain them.\nOverall, the clinic is clean, comfortable and air conditioned. Procedures are done on a timely basis.\nDr Sukhia himself is very hospitable and professional. He listens to any and every problem carefully and delivers results accordingly. I highly recommend visiting him if you require a reliable and efficient dentist.',
    source: 'Google Maps',
    reviewUrl:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sChdDSUhNMG9nS0VJQ0FnSURKaXJfU2pnRRAB!2m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    authorProfileUrl: 'https://www.google.com/maps/contrib/106315013123644135409/reviews',
    themes: ['Orthodontics & Braces', 'Doctor Demeanor'],
    highlightedQuote: 'He straightened and perfected my teeth under 2 years by braces. Occasional check ups with my retainer has helped to maintain them.',
  },
  {
    id: 'rev-ayesha-mushtaq',
    reviewerName: 'ayesha mushtaq',
    reviewerInitials: 'AM',
    rating: 5,
    relativeDate: '5 years ago',
    isoDate: '2020-12-30',
    publishedLabel: 'December 2020',
    text: 'Good for dental fixed braces. Me and school friends are having treatment done at Dr He Sukhia . Very good hand and results of my friends and me. Very highly qualified dentist. Only problem is lot of waiting period in clinic due to patient rush. Recommended for orthodontics treatment anytime.',
    source: 'Google Maps',
    reviewUrl:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sChdDSUhNMG9nS0VJQ0FnSURTOGE3WXhnRRAB!2m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    authorProfileUrl: 'https://www.google.com/maps/contrib/112305197394938732709/reviews',
    themes: ['Orthodontics & Braces', 'Waiting Time & Scheduling'],
    highlightedQuote: 'Good for dental fixed braces... Very highly qualified dentist. Only problem is lot of waiting period in clinic due to patient rush.',
  },
  {
    id: 'rev-talha-d',
    reviewerName: 'Talha D',
    reviewerInitials: 'TD',
    rating: 1,
    relativeDate: '2 months ago',
    isoDate: '2026-07-30',
    publishedLabel: 'July 2026',
    text: "They lost my orthodontic file, which was the first major red flag.\n\nThe clinic also doesn't seem to have a proper appointment system, which often resulted in long wait times and wasted visits.\n\nWhile Dr. Sukhia may be affordable, he appears to take on a very high volume of patients. As a result, appointments often felt rushed, with little to no progress tracking or discussion about how the treatment was progressing.\n\nLooking back, one thing that stands out is that I wasn't given a scaling and polishing before getting braces fitted, which I later learned is commonly recommended.\n\nNow that I've switched orthodontists, I have a much better understanding of what a well-managed orthodontic practice looks like. The difference in organization, communication, treatment planning, and overall patient experience has been significant.\n\nUnfortunately, comparing the two experiences has made me realize how poor my previous experience really was.",
    source: 'Google Maps',
    reviewUrl:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2toUlNVMUxjMmRpZVdNMmIxRlFhV1ZTVWtGUGRuYxAB!2m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    authorProfileUrl: 'https://www.google.com/maps/contrib/106157345932582116936/reviews',
    themes: ['Waiting Time & Scheduling', 'Affordability', 'Orthodontics & Braces'],
    highlightedQuote: 'While Dr. Sukhia may be affordable, he appears to take on a very high volume of patients... often resulted in long wait times.',
  },
];

export const PATIENT_CHOICE_THEMES = [
  {
    number: '01',
    title: 'Specialist Fixed Braces Expertise',
    summary:
      'Patients and families frequently choose the clinic specifically for fixed orthodontic braces, citing Prof. Dr. H.R. Sukhia’s Royal College qualifications and long-standing orthodontic experience.',
    evidenceNote: 'Supported by recurring review mentions of sibling and school-friend referrals for braces and retainers.',
  },
  {
    number: '02',
    title: 'Hospitable, Reassuring Clinical Manner',
    summary:
      'Reviews consistently describe Dr. Sukhia as polite, hospitable, and attentive to patient concerns—helping nervous patients feel comfortable in the chair.',
    evidenceNote: 'Highlighted in verified reviews by Zoya Ahmed, Muntaha Muntaha25, and Syed Shahiq Ibrahim.',
  },
  {
    number: '03',
    title: 'Accessible & Reasonable Treatment Fees',
    summary:
      'Compared with corporate dental chains, patients note that specialist orthodontic care at HR Sukhia Dental Clinic is offered at reasonable, family-accessible rates.',
    evidenceNote: 'Noted across both positive and critical patient feedback as a key reason for high patient demand.',
  },
  {
    number: '04',
    title: 'Candid Guidance on Peak Rush & Waiting Times',
    summary:
      'Because of high afternoon/evening patient volume and affordable fees, waiting times can be lengthy during peak hours. Calling ahead (0333 3770353) and arriving prepared with your questions and hygiene requests helps ensure a smoother visit.',
    evidenceNote: 'Directly addresses feedback in reviews by ayesha mushtaq and Talha D regarding clinic rush and scheduling.',
  },
];

export const AUTHENTIC_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-entrance-signage',
    title: 'Clinic Entrance & Original Signage',
    category: 'Entrance & Signage',
    src: '/assets/clinic/entrance-signage.jpg',
    alt: 'Entrance door of Dr. H.R. Sukhia Dental Surgery & Orthodontics showing metallic signage and daily timing notice',
    caption:
      '1st Floor entrance at 101 Abdullah Haroon Road featuring the original "Dr. H.R. Sukhia Dental Surgery & Orthodontics" signboard and clinic contact notice (0333 3770353).',
    attribution: 'Uploaded by HR Sukhia Dental Clinic on Google Maps',
    sourceUrl: 'https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDG7be4Jg!2e10!4m2!3m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-waiting-chart',
    title: 'Waiting Lounge & Orthodontic Problem Identification Chart',
    category: 'Waiting Area & Reception',
    src: '/assets/clinic/waiting-lounge-chart.jpg',
    alt: 'Air-conditioned waiting room at HR Sukhia Dental Clinic with tufted seating and the Problem Identification Chart for braces',
    caption:
      'The air-conditioned waiting area featuring black tufted lounge seating, clinic notice board, and the signature "Problem Identification Chart" illustrating 8 orthodontic conditions treated with fixed braces.',
    attribution: 'Google Business Profile Clinic Gallery (Fahim Baloch)',
    sourceUrl: 'https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDc7bz4Ag!2e10!4m2!3m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-operatory-wide',
    title: 'Clinical Operatory & Framed Royal College Fellowships',
    category: 'Clinical Operatory',
    src: '/assets/clinic/treatment-operatory-wide.jpg',
    alt: 'Main dental operatory at HR Sukhia Dental Clinic showing dual treatment chairs, framed Royal College diplomas, and orthodontic case binders',
    caption:
      'Main treatment room showing dual dental units, framed Royal College fellowship diplomas on the left wall, patient orthodontic record binders on the right, and the central sterilization station.',
    attribution: 'Uploaded by HR Sukhia on Google Maps',
    sourceUrl: 'https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDE-aXdDg!2e10!4m2!3m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-waiting-corridor',
    title: 'Reception Seating & Operatory Entrance Doors',
    category: 'Waiting Area & Reception',
    src: '/assets/clinic/waiting-area-seating.jpg',
    alt: 'Reception seating and frosted operatory entrance doors at Sukhia Dental Surgery & Orthodontics',
    caption:
      'View toward the operatory entrance doors displaying the clinic policy: "Only One Person Per Patient Allowed Inside — Patients with Appointment Taken First."',
    attribution: 'Google Business Profile Clinic Gallery',
    sourceUrl: 'https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDc7bz4uAE!2e10!4m2!3m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-sterilization-instruments',
    title: 'Orthodontic Plier Rack & Sterilization Trays',
    category: 'Instruments & Sterilization',
    src: '/assets/clinic/sterilization-instruments.jpg',
    alt: 'Stainless steel sterilization trays and orthodontic archwire pliers rack inside HR Sukhia Dental Clinic',
    caption:
      'Central clinical cabinetry housing orthodontic wire-bending pliers, stainless steel instrument trays, and examination supplies.',
    attribution: 'Google Business Profile Clinic Gallery',
    sourceUrl: 'https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDc7bKXfg!2e10!4m2!3m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-treatment-bay-window',
    title: 'Secondary Operatory Bay & Clinical Credentials',
    category: 'Clinical Operatory',
    src: '/assets/clinic/treatment-bay-window.jpg',
    alt: 'Secondary dental unit and window bay at HR Sukhia Dental Clinic in Saddar',
    caption:
      'Secondary clinical bay with natural window light, dental unit spittoon, and framed academic credentials.',
    attribution: 'Google Business Profile Clinic Gallery',
    sourceUrl: 'https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDc7bz4BA!2e10!4m2!3m1!1s0x3eb33e7246c4270f:0xa5ad8d5a17dc2f5d',
    aspectRatio: 'landscape',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments & Timings',
    question: 'How can I book an appointment or confirm clinic timings?',
    answer:
      'Please call +92 333 3770353 (0333 3770353) during afternoon hours or submit an Appointment Enquiry on this website. While walk-in consultations are accepted, the clinic door notice specifies that patients with appointments are taken first.',
  },
  {
    id: 'faq-2',
    category: 'Appointments & Timings',
    question: 'What are the verified opening hours, and is the clinic open on Thursdays?',
    answer:
      'Google Business Profile lists Monday–Friday 3:00 PM – 7:00 PM and Saturday 2:00 PM – 7:00 PM (Sunday Closed). However, the physical notice on the clinic entrance door lists 2:00 PM – 7:00 PM and notes Thursday & Sunday Closed. We strongly recommend calling 0333 3770353 before travelling on a Thursday or public holiday.',
  },
  {
    id: 'faq-3',
    category: 'Orthodontics & Braces',
    question: 'What orthodontic conditions are treated at HR Sukhia Dental Clinic?',
    answer:
      'As shown on the clinic’s in-house Problem Identification Chart, Prof. Dr. H.R. Sukhia treats deep bite, crowded teeth, delayed eruption of teeth, underbite, overlapped teeth, spacing of teeth, open bite, and protruded teeth using fixed orthodontic braces and retainers.',
  },
  {
    id: 'faq-4',
    category: 'Location & Fees',
    question: 'How can I ask about braces treatment costs and payment options?',
    answer:
      'Because orthodontic fees depend on the complexity of tooth movement, whether upper and lower arches are both treated, and total duration, exact quotations are provided in person after Dr. Sukhia examines your teeth. Patient reviews consistently highlight that the clinic’s fees are reasonable.',
  },
  {
    id: 'faq-5',
    category: 'Appointments & Timings',
    question: 'How can I avoid long waiting times at the clinic?',
    answer:
      'Patient reviews note that afternoon and evening rushes can lead to waiting periods. To reduce wait times: (1) call 0333 3770353 ahead of time to arrange your slot, (2) arrive near the start of clinic hours, and (3) note the clinic policy that only one accompanying person is allowed inside the operatory per patient.',
  },
  {
    id: 'faq-6',
    category: 'General Care',
    question: 'What should I bring to my first orthodontic or dental consultation?',
    answer:
      'Bring any recent dental X-rays (such as an OPG panoramic radiograph or lateral cephalogram if you already have them), your current retainer or dental appliances if applicable, and a list of any medications you take. Also ask the dentist during your initial braces assessment if you should schedule a scaling and polishing session prior to bracket bonding.',
  },
  {
    id: 'faq-7',
    category: 'Location & Fees',
    question: 'Where exactly is the clinic located in Saddar, Karachi?',
    answer:
      'The clinic is located on the 1st Floor at 101 Abdullah Haroon Road, near Gulzar Building, in Saddar, Karachi (Coordinates: 24.858541, 67.0267195). Look for the "Dr. H.R. Sukhia Dental Surgery & Orthodontics" signboard above the entrance door and ring the bell if the door is locked during clinic hours.',
  },
];

export const TRANSPARENCY_DOCUMENTATION = {
  verifiedFacts: [
    'Business Name: HR Sukhia Dental Clinic / Dr. H.R. Sukhia Dental Surgery & Orthodontics (Google Place ID: ChIJDyfERnI-sz4RXS_cF1qNraU).',
    'Location: 1st Floor, 101 Abdullah Haroon Road (Near Gulzar Building), Saddar, Karachi, Sindh, Pakistan.',
    'Phone: +92 333 3770353 (0333 3770353).',
    'Rating: 4.8 out of 5 stars across 127 Google reviews (verified via Google Places API v1).',
    'Dentist Credentials: Prof. Dr. Hoshang Rumi Sukhia — BDS, BSc, DOrth, MS, FDSRCPS (Glasgow), FFD (Orth) RCSI (Ireland), MOrth RCS (Edinburgh); Professor & Principal (Dental Section) at Sir Syed College of Medical Sciences.',
    'Official Social Media: facebook.com/sukhia.dental.',
  ],
  ownerConfirmationNeeded: [
    'Thursday Operating Schedule Reconciliation: Google Business Profile lists Thursday 3:00 PM – 7:00 PM, whereas the printed door notice on the clinic entrance states "Open Daily 2.pm to 7.pm (Thursday & Sunday Closed)".',
    'Official WhatsApp Business Confirmation: Confirm whether +92 333 3770353 is actively monitored on WhatsApp for patient messages in addition to direct voice calls.',
    'High-Resolution Studio Portrait & Vector Logo: Supply an authorized studio portrait of Prof. Dr. H.R. Sukhia and original vector artwork of the clinic letterhead.',
    'Authorized Before-and-After Case Photographs: Supply signed patient-consented clinical case photographs before publishing identifiable before/after tooth transformations.',
  ],
};
