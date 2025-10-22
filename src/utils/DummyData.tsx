import {IMAGES} from '../assets/images';

export const Weightlifting = [
  {
    id: '1',
    title: 'Beginner',
    description:
      'New to strength training or Olympic lifting. Learning technique, positions, and movement patterns.',
  },
  {
    id: '2',
    title: 'Intermediate',
    description:
      'Consistently training with solid form and increasing loads. Familiar with accessory work and progression cycles.',
  },
  {
    id: '3',
    title: 'Advanced',
    description:
      'High strength base with structured training cycles. May follow sport-specific programs and compete locally.',
  },
  {
    id: '4',
    title: 'Competitive Lifter',
    description:
      'Actively preparing for sanctioned competitions. Meets qualifying standards and targets personal records regularly.',
  },
  {
    id: '5',
    title: 'Elite Lifter',
    description:
      'National or international-level athlete. Top-tier performance benchmarks and advanced periodization.',
  },
];

export const Boxing = [
  {
    id: '1',
    title: 'Novice',
    description:
      'New to striking sports. Learning stance, guard, basic punches or strikes, footwork, and padwork technique.',
  },
  {
    id: '2',
    title: 'Amateur',
    description:
      'Regularly training with solid fundamentals. May participate in controlled sparring or early-level smokers/amateur bouts',
  },
  {
    id: '3',
    title: 'Advanced Amateur',
    description:
      'Experienced gym fighter or competitor with multiple amateur bouts. Comfortable under pressure with tactical awareness and ring fitness.',
  },
  {
    id: '4',
    title: 'Semi-Pro',
    description:
      'High-level striker actively competing or preparing for sanctioned amateur/pro-am fights. Displays refined technique, strategy, and conditioning.',
  },
  {
    id: '5',
    title: 'Pro',
    description:
      'Full-time or professional-level athlete competing in licensed promotions. Elite fight IQ, conditioning, and execution under pressure.',
  },
];

export const Yoga = [
  {
    id: '1',
    title: 'Beginner',
    description:
      'New to Yoga or Pilates. Focused on understanding foundational movements, breathwork, and alignment.',
  },
  {
    id: '2',
    title: 'Intermediate',
    description:
      'Comfortable with flows, sequences, and terminology. Developing strength, flexibility, and mind-body connection.',
  },
  {
    id: '3',
    title: 'Advanced',
    description:
      'Deep practice with strong technique, body awareness, and control. Able to perform complex poses or sequences.',
  },
  {
    id: '4',
    title: 'Instructor',
    description:
      'Leads or assists in teaching. Highly skilled with a deep understanding of technique, sequencing, and practice principles.',
  },
  {
    id: '5',
    title: 'Pro',
    description:
      'Full-time or professional-level athlete competing in licensed promotions. Elite fight IQ, conditioning, and execution under pressure.',
  },
];

export const BJJ = [
  {
    id: '1',
    title: 'White',
    description:
      'Beginner level. Learning core positions, escapes, basic submissions and overall movement fundamentals.',
  },
  {
    id: '2',
    title: 'Blue',
    description:
      'Solid grasp of foundational techniques. Can roll with control, apply submissions and understand basic guard retention and passing.',
  },
  {
    id: '3',
    title: 'Purple',
    description:
      'Intermediate advanced level. Displays strategic understanding, strong transitions and fluid positional control. Often starts mentoring others.',
  },
  {
    id: '4',
    title: 'Brown',
    description:
      'High level practitioner with refined technique and timing. Specialises in key areas and begins developing personal style.',
  },
  {
    id: '5',
    title: 'Black',
    description:
      'Expert level. Deep technical knowledge, teaching ability and mastery of positional flows, submissions and transitions. Leads others in practice and competition.',
  },
];

export const sports = [
  {
    id: '1',
    title: 'Junior',
    description:
      'Beginners or entry-level athletes under 13–15. Focused on fundamentals and fun.',
  },
  {
    id: '2',
    title: 'Junior Elite (or Youth Elite)',
    description:
      'Advanced youth athletes in academies, representative squads, or development pathways.',
  },
  {
    id: '3',
    title: 'Club Level',
    description:
      'Adult athletes or older teens who play regularly in organized teams or social leagues. A step above casual, but not elite.',
  },
  {
    id: '4',
    title: 'Sub Elite',
    description:
      'High-level amateur, academy graduates, or semi-pro athletes training seriously and competing at advanced levels.',
  },
  {
    id: '5',
    title: 'Pro',
    description:
      'Professional athletes and elite competitors. Top-tier benchmarks for performance and skill',
  },
];

export const sportData = [
  {
    category: 'Team Sports',
    data: [
      {
        id: '1',
        name: 'Football',
        image: IMAGES.football,
      },
      {
        id: '4',
        name: 'Rugby league',
        image: IMAGES.rugby,
      },
    ],
  },
  {
    category: 'Combat Sports',
    data: [
      {
        id: '6',
        name: 'Brazilian Jiu Jitsu (BJJ)',
        image: IMAGES.gym,
      },
      {
        id: '7',
        name: 'Boxing',
        image: IMAGES.boxing,
      },
    ],
  },
  {
    category: 'Racquet Sports',
    data: [
      {
        id: '9',
        name: 'Padel',
        image: IMAGES.padel,
      },
    ],
  },
  {
    category: 'Strength Sports',
    data: [
      {
        id: '11',
        name: 'Weightlifting',
        image: IMAGES.weights,
      },
    ],
  },
  {
    category: 'Movement & Recovery',
    data: [
      {
        id: '12',
        name: 'Reformer Pilates',
        image: IMAGES.reformer,
      },
      {
        id: '13',
        name: 'Yoga',
        image: IMAGES.yoga,
      },
    ],
  },
];

export const notifications = [
  {
    id: '1',
    messageKey:
      'Time to submit your performance review for today! Track your progress and stay on to',
    time: '9:35 AM',
  },
  {
    id: '2',
    messageKey:
      'Your teammate requested a review of their recent performance. Share your feedback!',
    time: '8:20 AM',
  },
  {
    id: '3',
    messageKey:
      'Your coach has submitted feedback on your latest performance. Tap to view!',
    time: '10: 30 PM',
  },
  {
    id: '4',
    messageKey:
      'New training session added to your calendar. Get ready to level up!',
    time: '02: 00 PM',
  },
];

export const publicCommunities = [
  {
    id: '1',
    nameKey: 'Elite Athletes Hub',
    descriptionKey:
      'For high-performance athletes to share training tips and progress.',
    image: IMAGES.community1,
  },
  {
    id: '5',
    nameKey: 'Rookie to Pro',
    descriptionKey: 'A space for beginners to learn from experienced athletes.',
    image: IMAGES.community2,
  },
  {
    id: '2',
    nameKey: 'Speed & Agility Squad',
    descriptionKey:
      'For sprinters, footballers, and athletes working on speed drills.',
    image: IMAGES.community3,
  },
];

export const privateCommunities = [
  {
    id: '3',
    nameKey: 'Elite Athletes Hub',
    descriptionKey:
      'For high-performance athletes to share training tips and progress.',
    image: IMAGES.community1,
  },
  {
    id: '4',
    nameKey: 'Rookie to Pro',
    descriptionKey: 'A space for beginners to learn from experienced athletes.',
    image: IMAGES.community2,
  },
];

export const postData = [
  {
    profileImage: IMAGES.profileImage,
    name: 'Nikita Scout',
    timeAgo: '45 Minutes ago',
    description:
      'Explore this insightful post discussing the power of resilience in overcoming challenges.',
    postImage: IMAGES.PostImage,
    likes: '10k',
    comments: '2.8k',
  },
  {
    profileImage: IMAGES.community2,
    name: 'Jordan Miles',
    timeAgo: '1 Hour ago',
    description: 'A glimpse into the latest athletic training techniques.',
    postImage: IMAGES.PostImage,
    likes: '8.2k',
    comments: '1.9k',
  },
  {
    profileImage: IMAGES.community2,
    name: 'Jordan Miles',
    timeAgo: '1 Hour ago',
    description: 'A glimpse into the latest athletic training techniques.',

    likes: '8.2k',
    comments: '1.9k',
  },
];

export const Memberdata = [
  {
    id: '1',
    name: 'Jame John',
    sport: 'Basket Ball',
    level: 'Intermediate',
    profileImage: IMAGES.member1,
    isBJJ: true,
  },
  {
    id: '2',
    name: 'Alex Doe',
    sport: 'Boxing',
    level: 'Beginner',
    profileImage: IMAGES.member2,
    isBJJ: false,
  },
  {
    id: '3',
    name: 'Alex Doe',
    sport: 'Boxing',
    level: 'Beginner',
    profileImage: IMAGES.member3,
    isBJJ: false,
  },
];

export const performanceTypes = [
  {type: 'Strength', icon: IMAGES.strength},
  {type: 'Power', icon: IMAGES.power},
  {type: 'Speed', icon: IMAGES.speed},
  {type: 'Endurance', icon: IMAGES.heart},
];

export const levels = [
  {
    id: '1',
    header: '1 – Beginner',
    description: 'No Experience: Needs full guidance and coaching.',
  },
  {
    id: '2',
    header: '2 – Very Limited Ability',
    description:
      'Understands the fundamentals but lacks control and consistency.',
  },
  {
    id: '3',
    header: '3 – Developing (Basic Competency)',
    description:
      'Building from fundamentals. Developing control and consistent training.',
  },
  {
    id: '4',
    header: '4 – Below Average:',
    description:
      'Can perform skills in controlled settings but struggles in real scenarios.',
  },
  {
    id: '5',
    header: '5 – Average (Competent but Inconsistent)',
    description: 'Shows some consistency but requires refinement.',
  },
  {
    id: '6',
    header: '6 – Above Average (Consistent & Reliable)',
    description: 'Executes skills well in practice and competition.',
  },
  {
    id: '7',
    header: '7 – Skilled (Strong Performance Level)',
    description: 'Demonstrates solid technique, strategy, and decision-making.',
  },
  {
    id: '8',
    header: '8 – Advanced (Competitive Level)',
    description: 'Competes at a high level with refined skills',
  },
  {
    id: '9',
    header: '9 – Expert (Elite Level Performance)',
    description: 'Executes with near-perfect precision.',
  },
];

export const privacyPolicy = [
  {
    title: 'Introduction',
    des: 'We collect, store, and use your personal data when you use our Prymo Sports App and services. This includes your name, address, email, phone, performance data, and payment information, processed under applicable data protection laws including GDPR.',
  },
  {
    title: 'Types of Personal Information We Collect',
    des: `• Name, address, country, email, phone, age, date of birth
• Social media information
• Height, weight, performance data
• Payment information
• Information from surveys and promotions
• Device information and IP address
• Performance tracking data
• Any other information provided by you`,
  },
  {
    title: 'How We Collect Personal Information',
    des: `• Registering through our app
• Contacting us via website or social platforms
• Email, SMS, or calls
• Using our services
• Using our app and website, cookies and analytics tools`,
  },
  {
    title: 'Use of Your Personal Information',
    des: `• Providing and improving services
• Personalising training and performance tracking
• Sending marketing and updates (with consent)
• Record keeping and administrative purposes
• Legal compliance and dispute resolution`,
  },
  {
    title: 'Sharing Your Data',
    des: `• With users you nominate (coaches, partners)
• With gyms, clubs, or coaches under your membership
• In-app forums or challenges (as per your settings)
• With trusted third-party services like AWS, Stripe, Google Analytics
• Required by law or in business transfers`,
  },
  {
    title: 'Security',
    des: 'We use password protection and technical measures to secure your data, but we cannot guarantee absolute security.',
  },
  {
    title: 'Your Rights',
    des: `• Access, correct, or erase your data
• Object or restrict processing
• Data portability
• Withdraw consent anytime
• File complaints with your local data protection authority`,
  },
  {
    title: 'Cookies and Tracking Technologies',
    des: `• We use SDKs and analytics tools for app performance, security, and personalisation
• We may use Google Firebase, Facebook SDK, and others
• You can disable tracking in-app or via device settings`,
  },
  {
    title: 'Data Retention',
    des: 'We retain your data only as long as necessary for legal and operational purposes and will securely destroy data per applicable laws.',
  },
  {
    title: 'Transfers Outside EEA',
    des: 'Your data may be transferred to countries without the same data protection laws, but we will ensure protection with safeguards and contracts.',
  },
  {
    title: 'Contact Us',
    des: 'For any queries, corrections, or complaints about your data, contact info@prymosports.com.',
  },
];

export const termofUse = [
  {
    title: 'Introduction',
    des: `We are Prymo Sports App Pty Ltd, an Australian company (ABN 19 685 029 476), providing a mobile app for tracking sports and fitness performance. Users can log data, request feedback, and connect with peers or coaches. The app also offers management tools for gyms, clubs, and coaches and is accessible via free and subscription tiers. By using the app, you agree to these Terms. The latest version is available at www.prymosports.com.`,
  },
  {
    title: 'Accepting These Terms',
    des: `By downloading, accessing, or using the app, you agree to these Terms and our Privacy Policy. We may update these Terms, and continued use represents your agreement to the updated Terms.`,
  },
  {
    title: 'Minimum Age Requirement',
    des: `You must be at least 16 years old to use the app. Accounts under 16 may be removed unless parental consent is provided. If you are a parent or guardian of a user under 16 who has shared personal information, please contact us.`,
  },
  {
    title: 'Business Accounts',
    des: `Gyms, coaches, and fitness facilities must provide valid business registration to onboard. Business accounts receive master memberships and user access passes, and are responsible for managing user access, verifying users, and ensuring compliance with these Terms.`,
  },
  {
    title: 'Subscription Duration',
    des: `Monthly and annual subscriptions auto-renew unless cancelled at least 24 hours before renewal via your app store. We will notify you 7 days before renewal with any fee or term changes.`,
  },
  {
    title: 'Using the App',
    des: `Your subscription provides access to app features based on your selected tier. Registration may require accurate personal and payment information. Information provided in the app is general and not professional advice. The app may experience downtime during updates without credit compensation.`,
  },
  {
    title: 'Data Hosting',
    des: `User data is stored on third-party cloud services like AWS, which may be located outside Australia. We use best-effort security but cannot guarantee continuous accessibility or absolute data security.`,
  },
  {
    title: 'User Conduct',
    des: `You must use the app respectfully and lawfully, following our Community Guidelines. You must not harass others, post offensive or illegal content, misuse the app, or share your account. We may suspend your access if you breach these Terms.`,
  },
  {
    title: 'Fees & Payment',
    des: `Subscription fees are charged in advance and are non-refundable, with automatic recurring billing unless cancelled. Payments are processed via third-party providers like Stripe. Fees exclude applicable taxes and may include surcharges.`,
  },
  {
    title: 'Posted Material',
    des: `You are responsible for the legality and accuracy of content you post. By posting content, you grant us a worldwide, royalty-free licence to use and display it. We may remove content that violates our Terms and are not required to review all content before it appears on the app.`,
  },
  {
    title: 'Intellectual Property & Data',
    des: `Prymo owns the app’s content and grants you a licence to use it for app purposes only. By using the app, you grant us a licence to use and process your user data to operate and improve the app, and you are responsible for managing your privacy settings within the app.`,
  },
  {
    title: 'Third-Party Terms',
    des: `The app may rely on third-party services for payments, analytics, and integrations, requiring you to comply with their terms. We are not liable for issues caused by third-party services.`,
  },
  {
    title: 'Confidentiality (Business Accounts)',
    des: `Business account holders may access confidential information and must keep it private, using it only for app-related service delivery.`,
  },
  {
    title: 'Privacy',
    des: `We collect, use, and store personal information in line with our Privacy Policy, including data shared with affiliated gyms, clubs, or coaches, managed through your privacy settings.`,
  },
  {
    title: 'Warranties & Liability',
    des: `The app may experience downtime or contain errors. Prymo’s liability is limited under Australian Consumer Law and capped at fees paid in the last 6 months. We are not liable for indirect or consequential losses or third-party issues.`,
  },
  {
    title: 'Cancellation & Refunds',
    des: `Subscriptions can be cancelled anytime via your app store settings, requiring cancellation at least 24 hours before renewal to avoid charges. Monthly plans are non-refundable. Annual plans are generally non-refundable but may be reviewed on a case-by-case basis.`,
  },
  {
    title: 'General',
    des: `These Terms are governed by New South Wales, Australia laws, with disputes first resolved informally via email. If unresolved within 30 days, either party may proceed with formal legal action. If any part of these Terms is invalid, the rest remain enforceable. These Terms represent the entire agreement between you and Prymo.`,
  },
  {
    title: 'Contact Us',
    des: `For any queries or support regarding these Terms, contact info@prymosports.com.`,
  },
];

export const challengesData = [
  {
    title: '1km Time Trial',
    description: 'Run 1km as fast as possible — test speed endurance.',
    levels: [
      {
        coin: 'Bronze:',
        label: 'Under 6:00',
        image: IMAGES.coin1,
      },
      {
        coin: 'Silver:',
        label: 'Under 5:00',
        image: IMAGES.coin2,
      },
      {
        coin: 'Gold:',
        label: 'Under 4:30',
        image: IMAGES.coin3,
      },
      {
        coin: 'Platinum:',
        label: 'Under 4:00',
        image: IMAGES.coin4,
      },
    ],
  },
  {
    title: '5km Run Challenge',
    description: 'Complete a 5km run — build aerobic endurance..',
    levels: [
      {
        coin: 'Bronze:',
        label: 'Under 35:00',
        image: IMAGES.coin1,
      },
      {
        coin: 'Silver:',
        label: 'Under 5:00',
        image: IMAGES.coin2,
      },
      {
        coin: 'Gold:',
        label: 'Under 25:00',
        image: IMAGES.coin3,
      },
      {
        coin: 'Platinum:',
        label: 'Under 4:00',
        image: IMAGES.coin4,
      },
    ],
  },
  {
    title: '10km Run Challenge',
    description: 'Complete a 10km run — build endurance — base.',
    levels: [
      {
        coin: 'Bronze:',
        label: 'Under 35:00',
        image: IMAGES.coin1,
      },
      {
        coin: 'Silver:',
        label: 'Under 5:00',
        image: IMAGES.coin2,
      },
      {
        coin: 'Gold:',
        label: 'Under 25:00',
        image: IMAGES.coin3,
      },
      {
        coin: 'Platinum:',
        label: 'Under 4:00',
        image: IMAGES.coin4,
      },
    ],
  },
  {
    title: 'Sprint Repeat Challenge (10 × 100m)',
    description:
      'Sprint 100m, rest, and repeat — improve anaerobic conditioning.',
    levels: [
      {
        coin: 'Bronze:',
        label: 'Under 35:00',
        image: IMAGES.coin5,
      },
      {
        coin: 'Silver:',
        label: 'Under 5:00',
        image: IMAGES.coin2,
      },
      {
        coin: 'Gold:',
        label: 'Under 25:00',
        image: IMAGES.coin3,
      },
      {
        coin: 'Platinum:',
        label: 'Under 4:00',
        image: IMAGES.coin4,
      },
    ],
  },
  {
    title: 'Distance Goal Run',
    description: 'Accumulate running distance across a week.',
    levels: [
      {
        coin: 'Bronze:',
        label: 'Under 35:00',
        image: IMAGES.coin5,
      },
      {
        coin: 'Silver:',
        label: 'Under 5:00',
        image: IMAGES.coin2,
      },
      {
        coin: 'Gold:',
        label: 'Under 25:00',
        image: IMAGES.coin3,
      },
      {
        coin: 'Platinum:',
        label: 'Under 4:00',
        image: IMAGES.coin4,
      },
    ],
  },
];

export const ActiveChallengesData = [
  {
    title: '1km Time Trial',
    description: 'Run 1km at max effort - push your speed endurance limit.',
    levels: [
      {coin: 'Bronze:', label: 'Under 6:00', image: IMAGES.coin1},
      {coin: 'Silver:', label: 'Under 5:00', image: IMAGES.coin2},
      {coin: 'Gold:', label: 'Under 4:30', image: IMAGES.coin3},
      {coin: 'Platinum:', label: 'Under 4:00', image: IMAGES.coin4},
    ],
  },
];

export const CompletedChallengesData = [
  {
    title: '1km Time Trial',
    description: 'Run 1km at max effort - push your speed endurance limit.',
    levels: [{coin: 'Bronze:', label: 'Under 6:00', image: IMAGES.coin1}],
  },
];

export const challengeData = [
  {
    id: 1,
    image: IMAGES.challenge1,
    title: '7-Day Gym Streak',
    subtitle: 'Squat',
    progress: 3,
    total: 7,
    daysLeft: '4 Days Left',
    status: 'active',
  },
  {
    id: 4,
    image: IMAGES.challenge2,
    title: '7-Day Gym Streak',
    subtitle: 'Deadlift',
    progress: 3,
    total: 7,
    daysLeft: '4 Days Left',
    status: 'active',
  },
  {
    id: 2,
    image: IMAGES.challenge2,
    title: 'Yoga Month',
    subtitle: 'Deadlift',
    progress: 20,
    total: 20,
    daysLeft: '0 Days Left',
    status: 'completed',
  },
  {
    id: 3,
    image: IMAGES.challenge3,
    title: 'Morning Run',
    subtitle: 'Squat',
    progress: 2,
    total: 10,
    daysLeft: 'Missed',
    status: 'cancelled',
  },
  {
    id: 5,
    image: IMAGES.challenge4,
    title: '7-Day Gym Streak',
    subtitle: 'Squat',
    progress: 3,
    total: 7,
    daysLeft: '4 Days Left',
    status: 'Incomplete',
  },
];

export const badgeSections = [
  {
    title: 'Daily Usage & Streaks',
    iconName: 'badges1',
    progress: 0.5,
    progressMin: 2,
    progressMax: 4,
    badges: [
      {
        title: 'Bronze',
        description: '3-Day Streak – Logged training 3 days in a row',
        iconName: 'coin1',
        checked: true,
      },
      {
        title: 'Silver',
        description: '7-Day Streak – One week of daily activity',
        iconName: 'silvar',
        checked: true,
      },
      {
        title: 'Gold',
        description: '30-Day Streak – One full month of daily logs',
        iconName: 'gold',
        checked: false,
      },
      {
        title: 'Platinum',
        description: '100-Day Streak – 100 consecutive training days',
        iconName: 'platinum',
        checked: false,
      },
    ],
  },
  {
    title: 'Training Consistency (Weekly)',
    iconName: 'badges2',
    progress: 0.7,
    progressMin: 1,
    progressMax: 5,
    badges: [
      {
        title: 'Bronze',
        description: '2 Weeks Consistent – Trained 4+ days/week for 2 weeks',
        iconName: 'coin1',
        checked: true,
      },
      {
        title: 'Silver',
        description: '4 Weeks Consistent',
        iconName: 'silvar',
        checked: false,
      },
      {
        title: 'Gold',
        description: '12 Weeks Consistent',
        iconName: 'gold',
        checked: false,
      },
      {
        title: 'Platinum',
        description: '52 Weeks Consistent – A full year of weekly training',
        iconName: 'platinum',
        checked: false,
      },
    ],
  },
  {
    title: 'Goal Completion',
    iconName: 'gold',
    progress: 0.3,
    progressMin: 3,
    progressMax: 10,
    badges: [
      {
        title: 'Bronze',
        description: 'First Goal Crushed',
        iconName: 'coin1',
        checked: false,
      },
      {
        title: 'Silver',
        description: '5 Goals Completed',
        iconName: 'silvar',
        checked: false,
      },
      {
        title: 'Gold',
        description: '10 Goals Completed',
        iconName: 'gold',
        checked: false,
      },
      {
        title: 'Platinum',
        description: '20 Goals Completed',
        iconName: 'platinum',
        checked: false,
      },
    ],
  },
];

export const requestData = [
  {
    id: '1',
    sport: 'Rugby',
    date: '13 July 2025',
    message: "Hey Coach, I've completed today's challenge in 30 seconds....",
  },
  {
    id: '2',
    sport: 'Rugby',
    date: '13 July 2025',
    message: "Hey Coach, I've completed today's challenge in 30 seconds....",
  },
];

export const communityGuide = [
  {
    id: '1',
    header: 'Prymo Community Guidelines',
    description:
      'To keep our community safe, fair and motivating for everyone, we ask all users to follow these basic rules:',
  },
  {
    id: '2',
    header: 'Respect Others',
    description:
      'Treat all users: athletes, coaches, gyms or clubs with respect. No harassment, bullying or hate speech.',
  },
  {
    id: '3',
    header: 'Developing (Basic Competency)',
    description:
      'Building from fundamentals. Developing control and consistent training.',
  },
  {
    id: '4',
    header: 'Keep It Clean',
    description:
      'Don’t post offensive, violent, explicit or misleading content. This includes profile pics, usernames, and videos.',
  },
  {
    id: '5',
    header: 'Feedback, Not Abuse',
    description:
      'Use reviews and feedback constructively. No targeted insults, aggression or negative personal attacks.',
  },
  {
    id: '6',
    header: 'Use Real Content',
    description:
      'Only upload content you have the right to share. Don’t impersonate others or use copyrighted material.',
  },
  {
    id: '7',
    header: 'Fair Play First',
    description:
      'Don’t cheat in challenges or misrepresent performance. Keep Prymo honest and competitive.',
  },
  {
    id: '8',
    header: '',
    description:
      'If you break these rules, your account may be suspended or removed. If you see something that violates these guidelines, report it to us at',
  },
];

export const beltLevels = [
  {
    label: 'White',
    color: '#FFFFFF',
    description:
      'Beginner level. Learning core positions, escapes, basic submissions and overall movement fundamentals.',
  },
  {
    label: 'Blue',
    color: '#0000FF',
    description:
      'Solid grasp of foundational techniques. Can roll with control, apply submissions and understand basic guard retention and passing.',
  },
  {
    label: 'Purple',
    color: '#800080',
    description:
      'Intermediate advanced level. Displays strategic understanding, strong transitions and fluid positional control. Often starts mentoring others.',
  },
  {
    label: 'Brown',
    color: '#8B4513',
    description:
      'High level practitioner with refined technique and timing. Specialises in key areas and begins developing personal style.',
  },
  {
    label: 'Black',
    color: '#000000',
    description:
      'Expert level. Deep technical knowledge, teaching ability and mastery of positional flows, submissions and transitions. Leads others in practice and competition',
  },
];

export const skillDescriptions: Record<
  string,
  {title: string; desc: string; tip: string}
> = {
  'Osoto Gari (Collar/Sleeve Grip)': {
    title: 'Osoto Gari (Collar/Sleeve Grip)',
    desc: 'A classic outer reap takedown using collar and sleeve grips to off-balance the opponent and drive them backward over your leg',
    tip: 'Step across the centre line and drive your chest forward as you reap – timing the reap with their backward shift is key.',
  },
  'Ouchi Gari': {
    title: 'Ouchi Gari',
    desc: 'An inner leg trip targeting the opponents near leg while pulling them diagonally off balance.',
    tip: 'Pull their sleeve across their body as you step in deep with your reaping leg – keep your posture upright for power.',
  },
  'Ippon Seoi Nage': {
    title: 'Ippon Seoi Nage',
    desc: 'A single-shoulder throw where you pivot under the opponent’s arm and use your legs to launch them forward over your back.',
    tip: 'Get your hips low and tight under their centre of gravity – your legs do the lifting not your arms.',
  },
  'Collar Drag': {
    title: 'Collar Drag',
    desc: 'A quick snap-pull using the collar grip to off-balance the opponent forward and expose their back or force a fall.',
    tip: 'Pull across and drop your weight backward as they step – angle out fast to attack the back.',
  },
  'Lapel Pull to Trip': {
    title: 'Lapel Pull to Trip',
    desc: 'Control the lapel to break posture and initiate a forward trip or off-balance into a throw.',
    tip: 'Use the lapel grip to draw them forward and angle your body – foot traps work best when their weight is loaded',
  },
  'Tomoe Nage (Sacrifice Throw)': {
    title: 'Tomoe Nage',
    desc: 'A sacrifice throw from standing guard grips where you fall backward and elevate them overhead with your foot.',
    tip: 'Commit to falling under them – kick high on their belt or hip and stay connected to roll through the throw.',
  },
  'Grip Break to Takedown Entry': {
    title: 'Grip Break to Takedown Entry',
    desc: 'Clear grips with strong movement to open the path for a quick takedown like a double leg, inside trip or snap down.',
    tip: 'Don’t pause after breaking grips – flow directly into your try while they’re resetting.',
  },
  'One-handed Pick-up': {
    title: 'One-handed Pick-up',
    desc: 'Clear grips with strong movement to open the path for a quick takedown like a double leg, inside trip or snap down.',
    tip: 'Don’t pause after breaking grips – flow directly into your try while they’re resetting.',
  },
  'Two-handed Pick-up': {
    title: 'Two-handed Pick-up',
    desc: 'Clear grips with strong movement to open the path for a quick takedown like a double leg, inside trip or snap down.',
    tip: 'Don’t pause after breaking grips – flow directly into your try while they’re resetting.',
  },
};

export const friendsData = [
  {
    id: '1',
    name: 'Jame John',
    sport: 'Basket Ball',
    level: 'Intermediate',
    profileImage: IMAGES.member1,
    isBJJ: true,
  },
  {
    id: '2',
    name: 'Alex Doe',
    sport: 'Boxing',
    level: 'Beginner',
    profileImage: IMAGES.member2,
    isBJJ: false,
  },
  {
    id: '3',
    name: 'Alex Doe',
    sport: 'Boxing',
    level: 'Beginner',
    profileImage: IMAGES.member3,
    isBJJ: false,
  },
];

export const requestsData = [
  {
    id: '5',
    name: 'Jame John',
    sport: 'Basket Ball',
    level: 'Intermediate',
    profileImage: IMAGES.member1,
    isBJJ: true,
  },
  {
    id: '6',
    name: 'Alex Doe',
    sport: 'Boxing',
    level: 'Beginner',
    profileImage: IMAGES.member2,
    isBJJ: false,
  },
  {
    id: '7',
    name: 'Alex Doe',
    sport: 'Boxing',
    level: 'Beginner',
    profileImage: IMAGES.member3,
    isBJJ: false,
  },
];

export const selectedSport = [
  {
    id: '1',
    name: 'Football',
    image: IMAGES.football,
  },
  {
    id: '4',
    name: 'Rugby league',
    image: IMAGES.rugby,
  },
  {
    id: '6',
    name: 'Bjj',
    image: IMAGES.gym,
  },
  {
    id: '7',
    name: 'Boxing',
    image: IMAGES.boxing,
  },

  {
    id: '9',
    name: 'Padel',
    image: IMAGES.padel,
  },
  {
    id: '11',
    name: 'Weightlifting',
    image: IMAGES.weights,
  },
  {
    id: '12',
    name: 'Reformer Pilates',
    image: IMAGES.reformer,
  },
  {
    id: '13',
    name: 'Yoga',
    image: IMAGES.yoga,
  },
];

export const powerChallengesData = {
  ClassicPowerPack: [
    {
      title: 'Trap Bar Jump Shrug Load Challenge',
      description:
        'Load the hips and explode vertically - full-body shrug under load for explosive power.',
      tip: 'Focus on triple extension. Keep the bar close and finish tall with a powerful shrug.',
      levels: [
        {coin: 'Bronze:', label: '30% bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '50% bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '70% bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '90% bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Hang Power Clean Challenge',
      description:
        'Explosively pull the barbell from hang position into standing rack - classic Olympic lift.',
      tip: 'Keep elbows fast and high. Dip just enough to load the legs before the violent pull.',
      levels: [
        {
          coin: 'Bronze:',
          label: '50% bodyweight x 3 reps',
          image: IMAGES.coin1,
        },
        {
          coin: 'Silver:',
          label: '70% bodyweight x 3 reps',
          image: IMAGES.coin2,
        },
        {coin: 'Gold:', label: '90% bodyweight x 3 reps', image: IMAGES.coin3},
        {
          coin: 'Platinum:',
          label: '100% bodyweight x 3 reps',
          image: IMAGES.coin4,
        },
      ],
    },
    {
      title: 'Push Press Challenge',
      description:
        'Drive the barbell overhead with leg power and upper body coordination.',
      tip: 'Dip vertically, explode upward and lock out strong. Don’t overarch the back.',
      levels: [
        {
          coin: 'Bronze:',
          label: '50% bodyweight x 5 reps',
          image: IMAGES.coin1,
        },
        {
          coin: 'Silver:',
          label: '70% bodyweight x 5 reps',
          image: IMAGES.coin2,
        },
        {coin: 'Gold:', label: '90% bodyweight x 5 reps', image: IMAGES.coin3},
        {
          coin: 'Platinum:',
          label: '100% bodyweight x 5 reps',
          image: IMAGES.coin4,
        },
      ],
    },
    {
      title: 'Split Jerk Challenge',
      description:
        'Maximise force transfer with dip drive and aggressive split landing under the bar.',
      tip: 'Punch the bar overhead as you drop. Recover front foot first then back.',
      levels: [
        {coin: 'Bronze:', label: '50% bodyweight x 1 rep', image: IMAGES.coin1},
        {coin: 'Silver:', label: '70% bodyweight x 1 rep', image: IMAGES.coin2},
        {coin: 'Gold:', label: '90% bodyweight x 1 rep', image: IMAGES.coin3},
        {
          coin: 'Platinum:',
          label: '100% bodyweight x 1 rep',
          image: IMAGES.coin4,
        },
      ],
    },
    {
      title: 'Barbell Thruster Challenge',
      description:
        'Combine front squat depth with overhead press explosiveness – total body power.',
      tip: 'Accelerate out of the squat into the press. Use the momentum to drive the bar overhead.',
      levels: [
        {
          coin: 'Bronze:',
          label: '30% bodyweight x 8 reps',
          image: IMAGES.coin1,
        },
        {
          coin: 'Silver:',
          label: '50% bodyweight x 8 reps',
          image: IMAGES.coin2,
        },
        {coin: 'Gold:', label: '70% bodyweight x 8 reps', image: IMAGES.coin3},
        {
          coin: 'Platinum:',
          label: '90% bodyweight x 8 reps',
          image: IMAGES.coin4,
        },
      ],
    },
  ],

  KettlebellPowerPack: [
    {
      title: 'Kettlebell Snatch Power Challenge',
      description:
        'Test explosive hip drive and shoulder lockout - complete kettlebell snatches for reps.',
      tip: 'Keep the bell close to avoid looping. Punch through at the top with a tight lockout.',
      levels: [
        {coin: 'Bronze:', label: '20 reps (12kg)', image: IMAGES.coin1},
        {coin: 'Silver:', label: '30 reps (16kg)', image: IMAGES.coin2},
        {coin: 'Gold:', label: '40 reps (20kg)', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '50 reps (24kg)', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Heavy Swing Challenge',
      description:
        'Maximise posterior chain explosiveness with heavy kettlebell swings.',
      tip: 'Hinge hard. Snap hips forward and let the kettlebell float - don’t muscle it up.',
      levels: [
        {coin: 'Bronze:', label: '16kg x 20 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '24kg x 20 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '32kg x 20 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '40kg x 20 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Clean Thruster Challenge',
      description:
        'Explosive clean into front squat and overhead drive - full-body power in one flow.',
      tip: 'Let the kettlebell roll around the wrist not over it. Time the drive from the bottom of the squat',
      levels: [
        {
          coin: 'Bronze:',
          label: '12kg x 5 reps each side',
          image: IMAGES.coin1,
        },
        {coin: 'Silver:', label: '16kg x 5 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg x 5 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg x 5 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell High Pull Challenge',
      description:
        'Hip powered kettlebell pulls to high elbow position - rapid force transfer.',
      tip: 'Lead with the elbow not the hand. Keep core tight and avoid over rotation',
      levels: [
        {coin: 'Bronze:', label: '16kg x 15 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '24kg x 15 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '32kg x 15 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '40kg x 15 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Double Kettlebell Snatch Challenge',
      description:
        'Perform synchronised snatches with two kettlebells - pure full body explosive power.',
      tip: 'Keep timing tight. Punch overhead and lockout hard with both arms.',
      levels: [
        {coin: 'Bronze:', label: '12kg pair x 5 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg pair x 5 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg pair x 5 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg pair x 5 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Jerk Challenge',
      description:
        'Dip and drive explosively overhead - maximise vertical force transfer.',
      tip: 'Short dip with fast hips. Drop under the bell with locked arms and a firm base.',
      levels: [
        {
          coin: 'Bronze:',
          label: '12kg x 5 reps each side',
          image: IMAGES.coin1,
        },
        {coin: 'Silver:', label: '16kg x 5 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg x 5 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg x 5 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Swing High Pull Combo Challenge',
      description:
        'Chain explosive swing force into sharp high pull - fluid ballistic power transition.',
      tip: 'Perform 10 swings followed immediately by 10 high pulls. Reset grip between if needed.',
      levels: [
        {
          coin: 'Bronze:',
          label: '16kg x 10 swings + 10 high pulls',
          image: IMAGES.coin1,
        },
        {coin: 'Silver:', label: '24kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '32kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '40kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Overhead Lunge Challenge',
      description:
        'Maintain shoulder stability and dynamic control while lunging under load.',
      tip: 'Lock the kettlebell directly overhead. Keep chest tall and hips square.',
      levels: [
        {coin: 'Bronze:', label: '12kg x 10 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg x 10 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg x 10 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg x 10 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Push Press Challenge',
      description:
        'Explosive dip drive and overhead lockout - pure pressing ballistic force.',
      tip: 'Dip fast and drive harder. Lock out fully and avoid pressing too early.',
      levels: [
        {
          coin: 'Bronze:',
          label: '12kg x 8 reps each side',
          image: IMAGES.coin1,
        },
        {coin: 'Silver:', label: '16kg x 8 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg x 8 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg x 8 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell High Rep Push Press Challenge',
      description:
        'Build upper body explosive endurance with rapid overhead kettlebell presses.',
      tip: 'Maintain rhythm and breathing. Keep elbows close and reset after each rep if needed.',
      levels: [
        {coin: 'Bronze:', label: '12kg x 20 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg x 20 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg x 20 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg x 20 reps', image: IMAGES.coin4},
      ],
    },
  ],

  CalisthenicsPowerPack: [
    {
      title: 'Clap Push Up Challenge',
      description:
        'Perform explosive push ups where your hands leave the ground for a full clap.',
      tip: 'Lower under control, explode up fast and keep elbows tucked to avoid flaring.',
      levels: [
        {coin: 'Bronze:', label: '5 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '10 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '15 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '20 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Chest to Bar Pull Up Challenge',
      description:
        'Pull explosively until your chest touches or clears the bar.',
      tip: 'Lead with the chest, keep a tight core and pull through the elbows.',
      levels: [
        {coin: 'Bronze:', label: '5 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '8 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '10 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '12 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Strict Muscle Up Challenge',
      description: 'Perform muscle ups with strict form - no kipping.',
      tip: 'Pull high and transition early - wrists over the bar before the dip phase.',
      levels: [
        {coin: 'Bronze:', label: '1 rep', image: IMAGES.coin1},
        {coin: 'Silver:', label: '3 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '5 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '8 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Explosive Dip Challenge',
      description:
        'Perform dips with aggressive upward drive - elbows lock out with speed.',
      tip: 'Keep shoulders packed, lower fully and explode to full extension.',
      levels: [
        {coin: 'Bronze:', label: '10 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '15 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '25 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Plyo Pistol Squat Challenge',
      description:
        'Perform single leg pistol squats with an explosive push off at the top.',
      tip: 'Control the descent then explode upwards with full foot contact.',
      levels: [
        {coin: 'Bronze:', label: '3 reps per leg', image: IMAGES.coin1},
        {coin: 'Silver:', label: '5 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '8 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '10 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Wall Handstand Push Up Challenge',
      description: 'Perform explosive handstand push ups against a wall.',
      tip: 'Keep the core tight, elbows under wrists and kick up with control.',
      levels: [
        {coin: 'Bronze:', label: '3 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '5 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '8 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '12 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Explosive Split Squat Challenge',
      description:
        'Perform Bulgarian split squats with an explosive drive from the lead leg.',
      tip: 'Keep chest upright, descend under control and drive through the front heel.',
      levels: [
        {coin: 'Bronze:', label: '5 reps per leg', image: IMAGES.coin1},
        {coin: 'Silver:', label: '8 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '10 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '12 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Depth Push Up Rebound Challenge',
      description:
        'Drop from a low surface and rebound instantly into a push up.',
      tip: 'Absorb the drop with elbows bent then react instantly with explosive force.',
      levels: [
        {coin: 'Bronze:', label: '5 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '8 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '10 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '12 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Tuck Planche Push Up Challenge',
      description: 'Perform explosive push ups from a tucked planche position.',
      tip: 'Tuck knees tight, keep shoulders forward, and push vertically without sagging.',
      levels: [
        {coin: 'Bronze:', label: '1 rep', image: IMAGES.coin1},
        {coin: 'Silver:', label: '2 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '3 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '5 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Jump Muscle Up Challenge',
      description:
        'Use jump assisted muscle ups to train the explosive transition.',
      tip: 'Use a controlled jump, keep your feet light and focus on a smooth bar transition.',
      levels: [
        {coin: 'Bronze:', label: '3 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '5 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '8 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '10 reps', image: IMAGES.coin4},
      ],
    },
  ],
};

export const strengthChallengesData = {
  ClassicStrengthPack: [
    {
      title: 'Deadlift Bodyweight Ratio',
      description:
        'Test your ultimate pulling strength by lifting a multiple of your own bodyweight.',
      tip: 'Keep the bar close, brace your core and drive through the heels.',
      levels: [
        {coin: 'Bronze:', label: '1.5x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1.75x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '2x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '2.25x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Squat Bodyweight Ratio',
      description:
        'Build unstoppable lower body strength. Squat heavy with clean technique.',
      tip: 'Push knees out, keep chest up and break parallel with control.',
      levels: [
        {coin: 'Bronze:', label: '1.25x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1.5x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '1.75x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '2x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Bench Press Bodyweight Ratio',
      description:
        'Pure upper body pressing strength - push your own bodyweight and beyond.',
      tip: 'Plant your feet, brace your lats and drive the bar up with power.',
      levels: [
        {coin: 'Bronze:', label: '0.75x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '1.25x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '1.5x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Strict Overhead Press Challenge',
      description:
        'Shoulder and core pressing strength under strict conditions of no momentum.',
      tip: 'Lock in your core, squeeze your glutes and drive the bar straight overhead.',
      levels: [
        {coin: 'Bronze:', label: '0.5x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '0.75x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '1x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '1.25x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: '5RM Deadlift Challenge',
      description:
        'Pull heavy for five strict reps - testing max strength and endurance.',
      tip: 'Reset between each rep and stay tight through your lats and core.',
      levels: [
        {
          coin: 'Bronze:',
          label: '5 reps @ 1.25x bodyweight',
          image: IMAGES.coin1,
        },
        {
          coin: 'Silver:',
          label: '5 reps @ 1.5x bodyweight',
          image: IMAGES.coin2,
        },
        {
          coin: 'Gold:',
          label: '5 reps @ 1.75x bodyweight',
          image: IMAGES.coin3,
        },
        {
          coin: 'Platinum:',
          label: '5 reps @ 2x bodyweight',
          image: IMAGES.coin4,
        },
      ],
    },
    {
      title: 'Trap Bar Deadlift Max',
      description:
        'Explosive posterior chain strength using the safer trap bar deadlift.',
      tip: 'Stay centred in the handles and drive evenly through your feet.',
      levels: [
        {coin: 'Bronze:', label: '1.5x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1.75x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '2x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '2.25x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Front Squat Strength Test',
      description:
        'Quad dominant squat strength under front loaded positioning.',
      tip: 'Keep elbows high and torso vertical throughout the lift.',
      levels: [
        {coin: 'Bronze:', label: '1x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1.25x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '1.5x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '1.75x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Strict Barbell Row Challenge',
      description:
        'Build a strong back with strict horizontal pulling - no momentum.',
      tip: 'Brace hard through the core, control the bar off the floor and pull to the lower chest with power and control.',
      levels: [
        {coin: 'Bronze:', label: '0.75x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '1.25x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '1.5x bodyweight', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Barbell Hip Thrust Max Load',
      description:
        'Build explosive glute strength and hip drive with a heavy barbell hip thrust.',
      tip: 'Brace through your core and drive hard through the heels - lift with control and finish strong at full extension.',
      levels: [
        {coin: 'Bronze:', label: '1x bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '1.5x bodyweight', image: IMAGES.coin2},
        {coin: 'Gold:', label: '2x bodyweight', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '2.5x bodyweight', image: IMAGES.coin4},
      ],
    },
  ],

  KettlebellStrengthPack: [
    {
      title: 'Kettlebell Swing Power Challenge',
      description:
        'Build explosive hip extension and posterior chain strength with powerful swings.',
      tip: 'Drive powerfully from the hips - not the knees. Keep your lats tight, core braced and snap into each rep with purpose.',
      levels: [
        {coin: 'Bronze:', label: '50 reps @ 16kg', image: IMAGES.coin1},
        {coin: 'Silver:', label: '50 reps @ 20kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '50 reps @ 24kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '50 reps @ 28kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Turkish Get Up Strength Challenge',
      description:
        'Full body control moving under a loaded kettlebell from ground to standing.',
      tip: 'Move slowly and with precision - keep your eyes on the bell and control each transition.',
      levels: [
        {coin: 'Bronze:', label: '12kg per side', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Clean & Press Challenge',
      description:
        'Explosive clean to strict overhead press with a kettlebell.',
      tip: 'Rack the bell with a soft catch then drive it up with a tight core and vertical press.',
      levels: [
        {coin: 'Bronze:', label: '12kg × 5 reps per side', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Goblet Squat Challenge',
      description:
        'Deep, upright squats loaded with a kettlebell at chest level.',
      tip: 'Keep elbows inside knees and heels grounded - pause at the bottom to build control.',
      levels: [
        {coin: 'Bronze:', label: '16kg × 10 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '24kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '32kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '40kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Double Kettlebell Deadlift Challenge',
      description:
        'Posterior chain strength tested with twin kettlebell deadlifts.',
      tip: 'Set a wide stance and grip both bells like a suitcase - stay upright on the lift.',
      levels: [
        {coin: 'Bronze:', label: '24kg pair', image: IMAGES.coin1},
        {coin: 'Silver:', label: '32kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '40kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '48kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Windmill Strength Challenge',
      description:
        'Shoulder stability and hip rotation strength with a kettlebell.',
      tip: 'Lock the overhead arm, hinge at the hip and keep eyes on the bell throughout.',
      levels: [
        {coin: 'Bronze:', label: '12kg × 1 rep per side', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Sumo Deadlift High Pull Challenge',
      description:
        'Full body explosive pull from hips to shoulders with a kettlebell.',
      tip: 'Drive through the hips and finish with high elbows - keep shoulders away from ears.',
      levels: [
        {coin: 'Bronze:', label: '16kg × 10 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '24kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '32kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '40kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Single Arm Kettlebell Strict Press Challenge',
      description: 'Strict one arm overhead pressing strength.',
      tip: 'Tighten the core and glutes, press with a vertical path and avoid leaning back.',
      levels: [
        {coin: 'Bronze:', label: '12kg × 3 reps per side', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Double Kettlebell Front Squat Challenge',
      description:
        'Deep squat strength under heavy twin kettlebell front load.',
      tip: 'Elbows high, stay upright and control both descent and drive up.',
      levels: [
        {coin: 'Bronze:', label: '16kg × 8 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '24kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '32kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '40kg pair', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Kettlebell Dead Clean Challenge',
      description:
        'Pull the kettlebell explosively into rack position with minimal swing.',
      tip: 'Use the hips for power and catch softly - keep the arc close to the body.',
      levels: [
        {coin: 'Bronze:', label: '12kg × 5 reps per side', image: IMAGES.coin1},
        {coin: 'Silver:', label: '16kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '20kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '24kg', image: IMAGES.coin4},
      ],
    },
  ],

  CalisthenicsStrengthPack: [
    {
      title: 'Max Pull Ups',
      description: 'Strict bodyweight pulling strength against gravity.',
      tip: 'Pull chest to bar with control, avoid swinging, and fully extend arms at the bottom.',
      levels: [
        {coin: 'Bronze:', label: '5 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '10 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '15 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '20 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Max Push Ups in 2 Minutes',
      description:
        'Pushing endurance and chest strength under timed conditions.',
      tip: 'Keep elbows at 45°, lock out at the top and pace your breathing.',
      levels: [
        {coin: 'Bronze:', label: '30 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '40 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '50 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '60 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Max Dips in 2 Minutes',
      description: 'Pushing strength endurance through dips under fatigue.',
      tip: 'Control the descent, go deep below parallel and drive tall with locked arms.',
      levels: [
        {coin: 'Bronze:', label: '20 reps', image: IMAGES.coin1},
        {coin: 'Silver:', label: '30 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '40 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '50 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Weighted Pull Up Challenge',
      description: 'Pull your body and additional weight over the bar cleanly.',
      tip: 'Don’t kip - aim for strict form and full extension at the bottom.',
      levels: [
        {coin: 'Bronze:', label: 'Bodyweight', image: IMAGES.coin1},
        {coin: 'Silver:', label: '+5kg', image: IMAGES.coin2},
        {coin: 'Gold:', label: '+10kg', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '+15kg', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Muscle Up Mastery',
      description:
        'Explosive pulling power over the bar - complete a muscle up.',
      tip: 'Use a powerful hip pop and fast transition - wrists must flip over the bar.',
      levels: [
        {coin: 'Bronze:', label: '1 rep', image: IMAGES.coin1},
        {coin: 'Silver:', label: '3 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '5 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '8 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Pistol Squat Max',
      description: 'Deep single leg squat strength balancing full control.',
      tip: 'Extend the free leg forward, control the descent and use arms for balance.',
      levels: [
        {coin: 'Bronze:', label: '5 reps per leg', image: IMAGES.coin1},
        {coin: 'Silver:', label: '10 reps', image: IMAGES.coin2},
        {coin: 'Gold:', label: '15 reps', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '20 reps', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Wall Handstand Hold',
      description:
        'Time your isometric upper body and core strength in a wall supported handstand.',
      tip: 'Push through the shoulders, brace the core and maintain a stacked body line.',
      levels: [
        {coin: 'Bronze:', label: '15 seconds', image: IMAGES.coin1},
        {coin: 'Silver:', label: '30 seconds', image: IMAGES.coin2},
        {coin: 'Gold:', label: '45 seconds', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '60+ seconds', image: IMAGES.coin4},
      ],
    },
  ],
};

export const speedChallengesDataMap = {
  SprintChallenges: [
    {
      title: '20m Sprint',
      description:
        'Sprint 20 metres from a standing start - measure short burst acceleration.',
      tip: 'Drive your knees, stay low for the first 5 steps and explode forward with quick ground contact.',
      levels: [
        {coin: 'Bronze:', label: '<4.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<3.5s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<3.2s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<3.0s', image: IMAGES.coin4},
      ],
    },
    {
      title: '40m Sprint',
      description:
        'Sprint 40 metres at full speed - test acceleration and top end speed.',
      tip: 'Accelerate smoothly through 20m then shift to upright sprinting with relaxed arms and high knees.',
      levels: [
        {coin: 'Bronze:', label: '<7.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<6.0s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<5.5s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<5.0s', image: IMAGES.coin4},
      ],
    },
    {
      title: '60m Sprint',
      description: 'Sprint 60 metres - early top-speed development challenge.',
      tip: 'Push for max velocity around the 30–40m mark. Stay tall and punch your knees and arms through',
      levels: [
        {coin: 'Bronze:', label: '<10.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<9.0s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<8.0s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<7.0s', image: IMAGES.coin4},
      ],
    },
  ],

  AgilityChallenges: [
    {
      title: '5-10-5 Shuttle Run',
      description:
        'Sprint 5m, 10m, and 5m - rapid directional change and acceleration test.',
      tip: 'Stay low and plant hard. Push off laterally with power and drive back into the turn',
      levels: [
        {coin: 'Bronze:', label: '<6.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<5.5s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<5.0s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<4.5s', image: IMAGES.coin4},
      ],
    },
    {
      title: 'T Test Agility',
      description:
        'Sprint, shuffle and backpedal in a T pattern - full-body agility challenge.',
      tip: 'Keep your hips low during shuffles and pivot fast at the cones. Sprint out the final leg.',
      levels: [
        {coin: 'Bronze:', label: '<12.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<11.0s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<10.0s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<9.0s', image: IMAGES.coin4},
      ],
    },
    {
      title: 'L Drill Agility',
      description:
        'Sprint around an L shaped 3 cone setup - quickness and cornering test.',
      tip: 'Stay compact around the cones, drop your hips through the turns and accelerate out of cuts.',
      levels: [
        {coin: 'Bronze:', label: '<10.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<9.0s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<8.0s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<7.0s', image: IMAGES.coin4},
      ],
    },
  ],

  AccelerationReactionChallenges: [
    {
      title: '10m Flying Sprint',
      description:
        'Accelerate and sprint full speed over a 10m timed zone - measure pure top end sprint burst.',
      tip: 'Use a gradual build up over 15m then explode through the 10m zone with maximum intent',
      levels: [
        {coin: 'Bronze:', label: '<2.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<1.8s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<1.6s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<1.4s', image: IMAGES.coin4},
      ],
    },
    {
      title: '10m Acceleration Sprint',
      description:
        'Sprint 10 metres from a standing start - pure explosive start ability.',
      tip: 'Lean forward, use short explosive steps and maintain a 45 degree body angle out of the gate.',
      levels: [
        {coin: 'Bronze:', label: '<2.5s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<2.2s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<2.0s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<1.8s', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Reaction Sprint',
      description:
        'Sprint 5m immediately after a visual or audio cue - test start reaction speed.',
      tip: 'Focus your eyes or ears sharply before the signal. React without overthinking - just launch.',
      levels: [
        {coin: 'Bronze:', label: '<2.0s', image: IMAGES.coin1},
        {coin: 'Silver:', label: '<1.8s', image: IMAGES.coin2},
        {coin: 'Gold:', label: '<1.6s', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '<1.4s', image: IMAGES.coin4},
      ],
    },
  ],
};

export const enduranceChallengesDataMap = {
  RunningEndurancePack: [
    {
      title: '1km Time Trial',
      description: 'Run 1km at max effort - push your speed endurance limit.',
      tip: 'Drive hard from the start and hold form - focus on turnover and posture in the final 200m.',
      levels: [
        {coin: 'Bronze:', label: 'Under 6:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 5:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 4:30', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 4:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '5km Run Challenge',
      description: 'Complete a 5km run - test your aerobic engine and grit.',
      tip: 'Lock in a steady pace early - finish strong with a push over the last kilometre.',
      levels: [
        {coin: 'Bronze:', label: 'Under 35:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 28:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 24:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 20:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '10km Run Challenge',
      description: 'Go the distance - build your endurance base over 10km.',
      tip: 'Hold even pacing and avoid early surges - aim for a negative split.',
      levels: [
        {coin: 'Bronze:', label: 'Under 70:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 60:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 50:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 45:00', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Half Marathon Challenge',
      description:
        'Go long - complete 21.1 km (13.1 miles) to test your race readiness and endurance grit.',
      tip: 'Stick to your target pace, fuel early and stay relaxed through the first 10km.',
      levels: [
        {coin: 'Bronze:', label: 'Over 2:30:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 2:15:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 2:00:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 1:40:00', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Marathon Challenge',
      description:
        'The ultimate run - conquer 42.2 km (26.2 miles) and log your marathon time.',
      tip: 'Break the race into 10km blocks - control pace, stay fuelled and stay focused through the final stretch.',
      levels: [
        {coin: 'Bronze:', label: 'Over 5:00:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 4:30:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 4:00:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 3:30:00', image: IMAGES.coin4},
      ],
    },
    {
      title: 'VO₂ Max Estimation Challenge',
      description:
        'Run as far as you can in 12 minutes - test your aerobic engine and estimate VO₂ max manually.',
      tip: 'Start controlled, build momentum and empty the tank in the final 2 minutes.',
      levels: [
        {coin: 'Bronze:', label: 'Under 2.00 km', image: IMAGES.coin1},
        {coin: 'Silver:', label: '2.00–2.39 km', image: IMAGES.coin2},
        {coin: 'Gold:', label: '2.40–2.79 km', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '2.80+ km', image: IMAGES.coin4},
      ],
    },
  ],
  RowingEndurancePack: [
    {
      title: '500m Row Sprint',
      description: 'Row 500m as fast as possible - power endurance blend.',
      tip: 'Go out hard for the first 100m, settle into a strong pace then finish with a final burst.',
      levels: [
        {coin: 'Bronze:', label: 'Under 2:20', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 2:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 1:45', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 1:30', image: IMAGES.coin4},
      ],
    },
    {
      title: '2km Row Challenge',
      description: 'Complete a 2km row - test aerobic power.',
      tip: 'Maintain a controlled pace for the first 1000m then increase your intensity every 500m.',
      levels: [
        {coin: 'Bronze:', label: 'Under 10:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 8:30', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 7:30', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 7:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '5km Row Challenge',
      description: 'Row 5km at steady pace - build endurance.',
      tip: 'Focus on consistent strokes per minute. Keep posture strong and avoid early fatigue.',
      levels: [
        {coin: 'Bronze:', label: 'Under 25:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 22:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 20:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 18:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '10km Row Challenge',
      description:
        'Complete a 10km row - develop long range stamina and discipline.',
      tip: 'Break the row into 2.5km quarters. Stay efficient with long, powerful strokes.',
      levels: [
        {coin: 'Bronze:', label: 'Under 55:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 50:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 45:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 40:00', image: IMAGES.coin4},
      ],
    },
    {
      title: 'Half Marathon Row',
      description: 'Row 21,097m - a true test of endurance, focus and pacing.',
      tip: 'Use a sustainable pace and track splits every 5km. Fuel and hydrate before starting.',
      levels: [
        {coin: 'Bronze:', label: 'Under 1:50:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 1:40:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 1:30:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 1:20:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '30 minute Row Distance Challenge',
      description: 'Row as far as possible in 30 minutes.',
      tip: 'Find your rhythm early. Split your effort into 3 segments and hold consistent stroke rate.',
      levels: [
        {coin: 'Bronze:', label: '6000m', image: IMAGES.coin1},
        {coin: 'Silver:', label: '7000m', image: IMAGES.coin2},
        {coin: 'Gold:', label: '7500m', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '8000m', image: IMAGES.coin4},
      ],
    },
  ],

  AssaultBikeEndurancePack: [
    {
      title: '1 minute Max Calorie Sprint',
      description: 'Sprint all out for 1 minute - max calories burned.',
      tip: 'Stay explosive but steady. Use full body drive and keep a high but sustainable cadence.',
      levels: [
        {coin: 'Bronze:', label: '12 cal', image: IMAGES.coin1},
        {coin: 'Silver:', label: '18 cal', image: IMAGES.coin2},
        {coin: 'Gold:', label: '24 cal', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '30+ cal', image: IMAGES.coin4},
      ],
    },
    {
      title: '5 minute Max Calorie Ride',
      description: 'Ride hard for 5 minutes - lactic threshold challenge.',
      tip: 'Pace the first 2 minutes then ramp up intensity. Stay upright and drive through the legs.',
      levels: [
        {coin: 'Bronze:', label: '50 cal', image: IMAGES.coin1},
        {coin: 'Silver:', label: '70 cal', image: IMAGES.coin2},
        {coin: 'Gold:', label: '90 cal', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '110 cal', image: IMAGES.coin4},
      ],
    },
    {
      title: '10 minute Max Distance Ride',
      description: 'Ride for maximum distance in 10 minutes.',
      tip: 'Find a sustainable cadence early. Use deep breathing and maintain constant RPMs.',
      levels: [
        {coin: 'Bronze:', label: '4km', image: IMAGES.coin1},
        {coin: 'Silver:', label: '5km', image: IMAGES.coin2},
        {coin: 'Gold:', label: '6km', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '7km', image: IMAGES.coin4},
      ],
    },
    {
      title: '20 minute Max Distance Ride',
      description:
        'Ride as far as possible in 20 minutes - test pacing and aerobic stamina.',
      tip: 'Break it into 4×5 minute segments. Build intensity in the final 5. Stay smooth and controlled early.',
      levels: [
        {coin: 'Bronze:', label: '7km', image: IMAGES.coin1},
        {coin: 'Silver:', label: '8.5km', image: IMAGES.coin2},
        {coin: 'Gold:', label: '10km', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '11.5km', image: IMAGES.coin4},
      ],
    },
    {
      title: '10km Assault Bike Time Trial',
      description:
        'Ride 10km as fast as possible - test power endurance and pacing.',
      tip: 'Break it into thirds. Steady start, hold your pace then empty the tank in the last 2km.',
      levels: [
        {coin: 'Bronze:', label: 'Under 20:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 16:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 14:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 12:00', image: IMAGES.coin4},
      ],
    },
  ],

  StationaryBikeEndurancePack: [
    {
      title: '5km Bike Time Trial',
      description: 'Ride 5km as fast as possible - test pacing and speed.',
      tip: 'Start at 80% effort and build each kilometre. Finish with a strong push in the final 500m.',
      levels: [
        {coin: 'Bronze:', label: 'Under 12:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 10:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 8:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 7:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '10km Bike Ride',
      description:
        'Complete a 10km steady state ride - build aerobic capacity.',
      tip: 'Keep cadence steady between 80–100 RPM. Relax your upper body and stay consistent.',
      levels: [
        {coin: 'Bronze:', label: 'Under 30:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 25:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 22:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 20:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '20km Time Trial',
      description: 'Ride 20km for time - endurance meets pacing strategy.',
      tip: 'Set a strong baseline pace for the first 10km then aim to increase power output every 5km.',
      levels: [
        {coin: 'Bronze:', label: 'Under 50:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 45:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 40:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 35:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '40km Time Trial',
      description:
        'Ride 40km at your best sustainable pace - the ultimate cycling test.',
      tip: 'Break it into 4 × 10km targets. Keep breathing controlled, hydrate beforehand and avoid early burnout.',
      levels: [
        {coin: 'Bronze:', label: 'Under 95:00', image: IMAGES.coin1},
        {coin: 'Silver:', label: 'Under 85:00', image: IMAGES.coin2},
        {coin: 'Gold:', label: 'Under 75:00', image: IMAGES.coin3},
        {coin: 'Platinum:', label: 'Under 65:00', image: IMAGES.coin4},
      ],
    },
    {
      title: '10 minute Max Distance Ride',
      description:
        'Ride for maximum distance in 10 minutes - aerobic threshold effort.',
      tip: 'Push hard from the start, hold high RPMs and keep your power consistent.',
      levels: [
        {coin: 'Bronze:', label: '4km', image: IMAGES.coin1},
        {coin: 'Silver:', label: '5km', image: IMAGES.coin2},
        {coin: 'Gold:', label: '6km', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '7km', image: IMAGES.coin4},
      ],
    },
    {
      title: '20 minute Max Distance Ride',
      description:
        'Ride as far as possible in 20 minutes - test aerobic stamina and mental focus.',
      tip: 'Use 5 minute effort blocks. Set a target pace and adjust only in the final 5 minutes.',
      levels: [
        {coin: 'Bronze:', label: '8km', image: IMAGES.coin1},
        {coin: 'Silver:', label: '10km', image: IMAGES.coin2},
        {coin: 'Gold:', label: '12km', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '14km', image: IMAGES.coin4},
      ],
    },
    {
      title: '60 minute Bike Distance Challenge',
      description:
        'Complete maximum distance in a 1 hour ride - endurance and pacing mastery.',
      tip: 'Start at 75-85 RPM and hold. Hydrate and check posture every 10 minutes to avoid fatigue.',
      levels: [
        {coin: 'Bronze:', label: '20km', image: IMAGES.coin1},
        {coin: 'Silver:', label: '24km', image: IMAGES.coin2},
        {coin: 'Gold:', label: '28km', image: IMAGES.coin3},
        {coin: 'Platinum:', label: '32km', image: IMAGES.coin4},
      ],
    },
  ],
};

export const ActiveSpeedData = [
  {
    title: '40m Sprint',
    description:
      'Sprint 40 metres at full speed - test acceleration and top end speed.',
    levels: [
      {coin: 'Bronze:', label: '<7.0s', image: IMAGES.coin1},
      {coin: 'Silver:', label: '<6.0s', image: IMAGES.coin2},
      {coin: 'Gold:', label: '<5.5s', image: IMAGES.coin3},
      {coin: 'Platinum:', label: '<5.0s', image: IMAGES.coin4},
    ],
  },
];

export const CompletedSpeedData = [
  {
    title: '40m Sprint',
    description:
      'Sprint 40 metres at full speed - test acceleration and top end speed.',
    levels: [{coin: 'Bronze:', label: '<7.0s', image: IMAGES.coin1}],
  },
];

export const ActiveStrengthData = [
  {
    title: '5RM Deadlift Challenge',
    description:
      'Pull heavy for five strict reps - testing max strength and endurance.',
    levels: [
      {
        coin: 'Bronze:',
        label: '5 reps @ 1.25x bodyweight',
        image: IMAGES.coin1,
      },
      {
        coin: 'Silver:',
        label: '5 reps @ 1.5x bodyweight',
        image: IMAGES.coin2,
      },
      {
        coin: 'Gold:',
        label: '5 reps @ 1.75x bodyweight',
        image: IMAGES.coin3,
      },
      {
        coin: 'Platinum:',
        label: '5 reps @ 2x bodyweight',
        image: IMAGES.coin4,
      },
    ],
  },
];

export const CompletedStrengthData = [
  {
    title: '5RM Deadlift Challenge',
    description:
      'Pull heavy for five strict reps - testing max strength and endurance.',
    levels: [
      {
        coin: 'Bronze:',
        label: '5 reps @ 1.25x bodyweight',
        image: IMAGES.coin1,
      },
    ],
  },
];

export const ActivePowerData = [
  {
    title: '10km Run Challenge',
    description: 'Complete a 10km run — build endurance — base.',
    levels: [
      {coin: 'Bronze:', label: 'Under 35:00', image: IMAGES.coin1},
      {coin: 'Silver:', label: 'Under 5:00', image: IMAGES.coin2},
      {coin: 'Gold:', label: 'Under 25:00', image: IMAGES.coin3},
      {coin: 'Platinum:', label: 'Under 4:00', image: IMAGES.coin4},
    ],
  },
];

export const CompletedPowerData = [
  {
    title: '10km Run Challenge',
    description: 'Complete a 10km run — build endurance — base.',
    levels: [{coin: 'Bronze:', label: 'Under 35:00', image: IMAGES.coin1}],
  },
];
