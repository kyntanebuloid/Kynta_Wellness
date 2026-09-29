import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
	console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
	process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token });

const STABLE_IDS = {
	siteSettings: "siteSettings",
	homepage: "homepage",
	experiencesPage: "experiencesPage",
	locationsPage: "locationsPage",
	aboutPage: "aboutPage",
	hospitalityPage: "hospitalityPage",
	blogPage: "blogPage",
	contactPage: "contactPage",
};

async function upsert(doc: Record<string, unknown>) {
	const { _id, ...rest } = doc;
	await client.createOrReplace({ _id: _id as string, _type: _id as string, ...rest });
	console.log(`  ✓ ${_id}`);
}

// ─── siteSettings ───
const siteSettings = {
	_id: STABLE_IDS.siteSettings,
	title: "Kynta Wellness",
	description: "Bridging ancient Indian restorative therapeutics with modern architectural stillness. Crafted exclusively for world-class hospitality sanctuaries and discerning seekers.",
	contactEmail: "info@kyntawellness.com",
	contactPhone: "+91 7250333494",
	address: "Kynta Wellness Private Limited",
	socialLinks: {
		instagram: "https://instagram.com/kyntawellness",
		facebook: "https://facebook.com/kyntawellness",
		youtube: "https://youtube.com/kyntawellness",
	},
	topBar: {
		partnerText: "Preferred Wellness Partner for 5-Star Hospitality",
		phone: "+91 7250333494",
		b2bLabel: "Partner With Us",
		b2bUrl: "/for-hospitality",
	},
	navigation: [
		{ _key: "nav-home", _type: "navItem", label: "HOME", url: "/" },
		{ _key: "nav-experiences", _type: "navItem", label: "EXPERIENCES", url: "/experiences" },
		{ _key: "nav-locations", _type: "navItem", label: "LOCATIONS", url: "/locations" },
		{ _key: "nav-about", _type: "navItem", label: "ABOUT", url: "/about" },
		{ _key: "nav-hospitality", _type: "navItem", label: "FOR HOSPITALITY", url: "/for-hospitality" },
		{ _key: "nav-blog", _type: "navItem", label: "BLOG", url: "/blog" },
		{ _key: "nav-contact", _type: "navItem", label: "CONTACT", url: "/contact" },
	],
	footer: {
		brandName: "Kynta Wellness",
		brandDescription: "Bridging ancient Indian restorative therapeutics with modern architectural stillness. Crafted exclusively for world-class hospitality sanctuaries and discerning seekers.",
		newsletterHeading: "Sanctuary Gazette",
		newsletterDescription: "Discreet seasonal retreat schedules, botanical dispatches, and hotelier previews.",
		newsletterPlaceholder: "Your email address",
		newsletterButtonLabel: "Inscribe",
		footerNav: [
			{
				_key: "footer-group-explore",
				_type: "footerNavGroup",
				heading: "Explore",
				links: [
					{ _key: "link-rituals", _type: "footerLink", label: "Therapeutic Rituals", url: "/rituals" },
					{ _key: "link-destinations", _type: "footerLink", label: "Destination Spas", url: "/destinations" },
					{ _key: "link-philosophy", _type: "footerLink", label: "The Healing Philosophy", url: "/philosophy" },
					{ _key: "link-journal", _type: "footerLink", label: "Wellness Journal", url: "/journal" },
					{ _key: "link-careers", _type: "footerLink", label: "Careers & Apprentices", url: "/careers" },
				],
			},
			{
				_key: "footer-group-hospitality",
				_type: "footerNavGroup",
				heading: "Hospitality & Desks",
				links: [
					{ _key: "link-turnkey", _type: "footerLink", label: "Turnkey Spa Operations", url: "/turnkey-operations" },
					{ _key: "link-advisory", _type: "footerLink", label: "Resort Design Advisory", url: "/resort-advisory" },
					{ _key: "link-rfp", _type: "footerLink", label: "Owner Inquiries & RFP", url: "/owner-rfp" },
					{ _key: "link-concierge", _type: "footerLink", label: "Guest Concierge Booking", url: "/concierge" },
				],
			},
			{
				_key: "footer-group-legal",
				_type: "footerNavGroup",
				heading: "Legal",
				links: [
					{ _key: "link-privacy", _type: "footerLink", label: "Privacy Policy", url: "/privacy" },
					{ _key: "link-terms", _type: "footerLink", label: "Terms of Service", url: "/terms" },
					{ _key: "link-spa-concierge", _type: "footerLink", label: "Spa Concierge", url: "/concierge" },
				],
			},
		],
	},
};

// ─── homepage ───
const homepage = {
	_id: STABLE_IDS.homepage,
	hero: {
		eyebrow: "KYNTA WELLNESS GROUP",
		headline: "Where hospitality meets holistic wellness.",
		subtitle: "Institutional-grade Ayurvedic sanctuaries engineered for five-star hospitality partners across India.",
		ctaText: "Explore Experiences",
		ctaUrl: "/experiences",
	},
	introSection: {
		eyebrow: "Holistic Gravitas • Hotelier Precision",
		heading: "Where hospitality meets holistic wellness.",
		description: "Kynta merges ancient Indian restorative therapeutics with modern architectural stillness, delivering measurable yield uplift for luxury hotel partners.",
		stats: [
			{ _key: "intro-stat-1", _type: "stat", value: "14+", label: "Sanctuaries Curated" },
			{ _key: "intro-stat-2", _type: "stat", value: "100%", label: "Wild & Organic Harvest" },
			{ _key: "intro-stat-3", _type: "stat", value: "120+", label: "Master Vaidyas & Healers" },
			{ _key: "intro-stat-4", _type: "stat", value: "5.0", label: "Guest Excellence Rating" },
		],
	},
	pillarsSection: {
		eyebrow: "The Four Architectural Pillars",
		heading: "Institutional discipline meets classical restorative lineage.",
		description: "Our four pillars ensure every guest interaction delivers measurable wellness outcomes and yield optimization.",
		pillars: [
			{ _key: "pillar-shield", _type: "pillar", icon: "shield", title: "Master Therapists", description: "Every Kynta practitioner undergoes 400+ hours of rigorous residential curriculum via the Kynta Wellness Academy, certified in authentic marma stimulation and anatomical ergonomics." },
			{ _key: "pillar-sliders", _type: "pillar", icon: "sliders", title: "120-Point Protocol", description: "Uncompromising standardization across thermal temperatures, cold-chain botanical oil freshness, ambient acoustic parameters, and five-star linen hygiene audits." },
			{ _key: "pillar-calibrate", _type: "pillar", icon: "calibrate", title: "Dosha Calibration", description: "No generic treatments. Each session commences with our sensory diagnostics questionnaire and pulse check, dynamically tailoring thermal oil infusions and touch pressure." },
			{ _key: "pillar-trendUp", _type: "pillar", icon: "trendUp", title: "Yield Elevation", description: "Designed for luxury hotel P&Ls. We maximize RevPASH (Revenue Per Available Spa Hour) through dynamic booking orchestration, experiential retail, and elevated guest retention." },
		],
	},
	treatmentsSection: {
		eyebrow: "Apothecary & Therapies",
		heading: "Signature rituals conceived for deep restorative release.",
		description: "Each treatment is a curated journey through ancient Ayurvedic wisdom, delivered with institutional precision.",
		treatments: [
			{ _key: "treatment-spa-sojourns", _type: "homepageTreatmentItem", title: "SPA SOJOURNS", description: "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centered, and completely at ease.", duration: "75 / 90 Mins", sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver" },
			{ _key: "treatment-massage", _type: "homepageTreatmentItem", title: "MASSAGE SELECTIONS", description: "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.", duration: "60 / 90 Mins", sensoryNote: "Brahmi • Ashwagandha • Sandalwood" },
			{ _key: "treatment-glamour", _type: "homepageTreatmentItem", title: "GLAMOUR GLOW", description: "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.", duration: "60 Mins", sensoryNote: "Floral Jasmine • Mineral Crisp • Sweet Neroli" },
		],
	},
	destinationsSection: {
		eyebrow: "Verified Hospitality Partnerships",
		heading: "Destinations of restorative distinction across India.",
		description: "Partner properties across India's most coveted destinations.",
		destinations: [
			{
				_key: "dest-heritage",
				_type: "destination",
				name: "Kynta at The Heritage Retreat",
				address: "Amer Palace Road, Kukas Valley, Jaipur 302028",
				hours: "08:00 – 21:00 Daily",
				phone: "+91 141 267 1234",
				email: "heritage@kyntawellness.com",
				tags: ["Hydrotherapy Plunge", "Herbal Steam Cavern", "Couples Royal Pavilion", "Acupressure Walk"],
				services: ["Signature Bodywork", "Hydrotherapy", "Couples Treatments"],
			},
			{
				_key: "dest-glenwood",
				_type: "destination",
				name: "Kynta at Glenwood Manor & Spa",
				address: "Mashobra Ridge Forest Reserve, Shimla 171007",
				hours: "07:30 – 21:00 Daily",
				phone: "+91 177 266 1234",
				email: "glenwood@kyntawellness.com",
				tags: ["Forest View Hot Tub", "Pine Sauna", "Pranayama Deck", "Heated Stone Beds"],
				services: ["Alpine Hydro-Therapy", "Forest Bathing", "Sound Therapy"],
			},
		],
	},
	guestPathSection: {
		eyebrow: "The Fivefold Guest Path",
		heading: "An choreographed immersion in sensory stillness.",
		description: "Every guest journey follows our five-step protocol for complete restoration.",
		steps: [
			{ _key: "step-01", _type: "step", number: "01", title: "ARRIVE & UNCLUTTER", description: "Warm kansa floral footbath with crushed marigolds and a chilled adaptogenic vetiver-cardamom infusion." },
			{ _key: "step-02", _type: "step", number: "02", title: "DIAGNOSTIC", description: "In-depth consultation covering current dosha state, emotional fatigue, tension maps, and botanical scent preferences." },
			{ _key: "step-03", _type: "step", number: "03", title: "THERAPEUTIC TOUCH", description: "Customized organic botanical oils warmed to exact skin temperature, delivered with deliberate marma flow." },
			{ _key: "step-04", _type: "step", number: "04", title: "STILLNESS LOUNGE", description: "Post-treatment quietude in our silent solarium with freshly brewed Kashmiri kahwa and dry figs." },
			{ _key: "step-05", _type: "step", number: "05", title: "INTEGRATIVE CARE", description: "Home wellness prescription, circadian breathwork exercises, and customized botanical oil dispensaries." },
		],
		faq: [
			{ _key: "faq-booking", _type: "faqItem", question: "How do I book a session?", answer: "Contact our concierge team via WhatsApp or our booking form. We recommend booking 48 hours in advance for optimal preparation." },
			{ _key: "faq-wear", _type: "faqItem", question: "What should I wear?", answer: "We provide luxurious kimonos and slippers. Wear whatever is comfortable for your journey." },
			{ _key: "faq-ages", _type: "faqItem", question: "Are treatments suitable for all ages?", answer: "Our treatments are designed for adults. We offer specialized programs for different age groups upon request." },
		],
		stats: [
			{ _key: "guest-stat-1", _type: "stat", value: "18+", label: "Destination Spas" },
			{ _key: "guest-stat-2", _type: "stat", value: "9", label: "Indian Cities & Retreats" },
			{ _key: "guest-stat-3", _type: "stat", value: "140+", label: "Certified Therapists" },
			{ _key: "guest-stat-4", _type: "stat", value: "85k+", label: "Rituals Delivered" },
			{ _key: "guest-stat-5", _type: "stat", value: "98.4%", label: "Guest Satisfaction Index" },
		],
	},
	partnershipSection: {
		eyebrow: "Institutional Hospitality Management",
		heading: "A turnkey wellness operation built for five-star hospitality.",
		description: "Complete wellness operations management for luxury hotel partners.",
		services: [
			{ _key: "service-spatial", _type: "homepageServiceItem", icon: "spatial", title: "Spatial Concept & Flow", description: "Advisory on wet/dry zoning, MEP requirements, acoustic buffering, treatment room ergonomics, and thermal water circuits." },
			{ _key: "service-management", _type: "homepageServiceItem", icon: "management", title: "Turnkey Daily Management", description: "100% outsourced operations: reservation desk management, luxury service standards, inventory, linen stewardship, and safety audits." },
			{ _key: "service-sourcing", _type: "homepageServiceItem", icon: "sourcing", title: "Academy Therapist Sourcing", description: "Certified residential recruitment pipeline. We absorb therapist payroll, ongoing certification, medical compliance, and retention risk." },
			{ _key: "service-formulation", _type: "homepageServiceItem", icon: "formulation", title: "Apothecary Formulation", description: "Exclusive single-estate herbal formulations and custom hotel-branded apothecary lines packaged in sustainable apothecary glass." },
			{ _key: "service-revpash", _type: "homepageServiceItem", icon: "revpash", title: "RevPASH Optimization", description: "Proprietary yield algorithms driving treatment room utilization across peak and non-peak hours, increasing overall property ADR." },
			{ _key: "service-brand", _type: "homepageServiceItem", icon: "brand", title: "Brand Asset Elevation", description: "Enhance your luxury hotel credentials. Partner properties report immediate boosts in Condé Nast and TripAdvisor wellness ratings." },
		],
	},
	journalSection: {
		eyebrow: "The Kynta Gazette",
		heading: "Dispatches on botanical science, architecture & hotel yield.",
		description: "Insights from our practitioners and hospitality partners.",
		articles: [
			{ _key: "article-herbal", _type: "article", title: "The Science of Warm Herbal Compresses in High-Stress Recovery", excerpt: "How thermotherapy combined with lipid-soluble terpene botanicals penetrates deep myofascial barriers to regulate cortisol spikes.", category: "Therapeutic Science", readTime: "6 Min Read", author: "Dr. Harish Namboodiri" },
			{ _key: "article-spa-design", _type: "article", title: "Designing Spa Sanctuaries: The Convergence of Biophilia and Ayurveda", excerpt: "An inquiry into how tactile raw stone, micro-acoustics, and natural light rhythms induce involuntary parasympathetic downregulation.", category: "Design & Space", readTime: "8 Min Read", author: "Devendra Sengupta" },
			{ _key: "article-revpash", _type: "article", title: "Optimizing Hotel RevPASH Through Integrated Wellness Programming", excerpt: "Why luxury resort developers are transforming passive spa square footage into high-yield restorative hubs that augment overall property yield.", category: "Hospitality Economics", readTime: "5 Min Read", author: "Ananya Varma" },
		],
	},
	reservationSection: {
		eyebrow: "Priority Spa Concierge",
		heading: "Request a Curated Experience",
		description: "Whether reserving a standalone afternoon somatic session or coordinating a multi-day private sanctuary retreat, our Ayurvedic concierge team personalizes every botanical parameter.",
		infoCards: [
			{ _key: "info-clock", _type: "infoCard", icon: "clock", title: "Unhurried Reservations", description: "We limit daily reservations per sanctuary to preserve tranquil acoustics and zero-congestion hydrothermal access." },
			{ _key: "info-shield", _type: "infoCard", icon: "shield", title: "Confidential Discretion", description: "Special dietary preferences, high-privacy transit, and private hydro-suite arrangements catered with utmost discretion." },
		],
		contactPhone: "+91 7250333494",
		contactEmail: "info@kyntawellness.com",
		contactAddress: "Kynta Wellness Private Limited",
	},
};

// ─── experiencesPage ───
const experiencesPage = {
	_id: STABLE_IDS.experiencesPage,
	hero: {
		eyebrow: "CURATED RITUALS & SANCTUARIES",
		heading: "Experiences of Restorative Distinction",
		subheading: "Each experience is a choreographed immersion in sensory stillness, designed to restore vitality and deepen inner awareness.",
	},
	filters: [
		{ _key: "filter-all", _type: "filter", label: "All Experiences", value: "all" },
		{ _key: "filter-signature", _type: "filter", label: "Signature Rituals", value: "signature-rituals" },
		{ _key: "filter-hydro", _type: "filter", label: "Hydrothermal & Thermal Baths", value: "hydrothermal" },
		{ _key: "filter-multiday", _type: "filter", label: "Multi-Day Retreats", value: "multi-day" },
		{ _key: "filter-couples", _type: "filter", label: "Couples & Duets", value: "couples" },
		{ _key: "filter-sound", _type: "filter", label: "Sound & Meditative Immersion", value: "sound" },
	],
	experiences: [
		{ _key: "exp-spa-sojourns", _type: "experienceCard", title: "SPA SOJOURNS", description: "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe.", category: "Signature Rituals", duration: "75 / 90 Mins", price: "₹8,500" },
		{ _key: "exp-massage", _type: "experienceCard", title: "MASSAGE SELECTIONS", description: "Step into a world of deep relaxation with our curated Full Body Massage selections.", category: "Signature Rituals", duration: "60 / 90 Mins", price: "₹6,500" },
		{ _key: "exp-glamour", _type: "experienceCard", title: "GLAMOUR GLOW", description: "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin.", category: "Signature Rituals", duration: "60 Mins", price: "₹5,500" },
		{ _key: "exp-hydro", _type: "experienceCard", title: "HYDROTHERAPY PLUNGE", description: "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration.", category: "Hydrothermal & Thermal Baths", duration: "45 Mins", price: "₹4,500" },
		{ _key: "exp-couples", _type: "experienceCard", title: "COUPLES SANCTUARY", description: "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals.", category: "Couples & Duets", duration: "120 Mins", price: "₹18,000" },
		{ _key: "exp-sound", _type: "experienceCard", title: "SOUND IMMERSION", description: "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states.", category: "Sound & Meditative Immersion", duration: "60 Mins", price: "₹5,000" },
	],
	pillars: {
		eyebrow: "The Four Pillars of Kynta",
		heading: "Institutional discipline meets classical restorative lineage.",
		description: "Our four pillars ensure every guest interaction delivers measurable wellness outcomes.",
		cards: [
			{ _key: "pillar-flask", _type: "pillar", icon: "flask", title: "Botanical Sourcing", description: "Single-estate hand-pressed oils, wild-harvested Himalayan cedar, high-altitude saffron, and sacred white lotus distilled under lunar cycles." },
			{ _key: "pillar-pulse", _type: "pillar", icon: "pulse", title: "Precision Diagnostics", description: "Comprehensive Nadi Pariksha (pulse assessment), somatic tissue mapping, and doshic constitutional calibration before ritual touch initiates." },
			{ _key: "pillar-building", _type: "pillar", icon: "building", title: "Hydrothermal Architecture", description: "Hyper-dilute magnesium saline flotation pools, herb-infused steam grottos, and stepped thermal plunge baths designed with acoustic isolation." },
			{ _key: "pillar-hourglass", _type: "pillar", icon: "hourglass", title: "Unhurried Cadence", description: "A minimum 90-minute immersion window ensuring full parasympathetic nervous down-regulation, zero transition rush, and profound cellular stillness." },
		],
	},
	treatmentsSection: {
		eyebrow: "Apothecary & Therapies",
		heading: "Signature rituals conceived for deep restorative release.",
		description: "Each treatment is a curated journey through ancient Ayurvedic wisdom.",
		cards: [
			{ _key: "tcard-spa", _type: "treatmentCard", title: "SPA SOJOURNS", slug: "spa-sojourns", description: "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation.", duration: "75 / 90 Mins", sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver" },
			{ _key: "tcard-massage", _type: "treatmentCard", title: "MASSAGE SELECTIONS", slug: "massage-selections", description: "Step into a world of deep relaxation with our curated Full Body Massage selections.", duration: "75 / 90 Mins", sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver" },
			{ _key: "tcard-glamour", _type: "treatmentCard", title: "GLAMOUR GLOW", slug: "glamour-glow", description: "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate.", duration: "75 / 90 Mins", sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver" },
		],
	},
	protocolSection: {
		eyebrow: "The Five-Step Protocol",
		heading: "A choreographed immersion in sensory stillness.",
		description: "Every experience follows our five-step protocol for complete restoration.",
		steps: [
			{ _key: "proto-01", _type: "step", number: "01", title: "Arrival & Unclutter", description: "Warm botanical foot soak with freshly crushed marigold, rock salt, and cardamom infusion to ground bodily static." },
			{ _key: "proto-02", _type: "step", number: "02", title: "Diagnostic Consultation", description: "Pulse reading by Vaidya, thermal chamber calibration, and bespoke botanical scent harmonization for your bio-energy." },
			{ _key: "proto-03", _type: "step", number: "03", title: "Therapeutic Core Touch", description: "Customized rhythmic strokes, heated river stone gliding, and single-estate cold-pressed oil absorption." },
			{ _key: "proto-04", _type: "step", number: "04", title: "Stillness Lounge", description: "Acoustic relaxation in sound-dampened lime plaster grottos with restorative warm herbal tonics and organic dry fruits." },
			{ _key: "proto-05", _type: "step", number: "05", title: "Home Integration", description: "Custom apothecary formulations, dosha-specific nutrition guidelines, and circadian sleep rituals sent to your private portal." },
		],
	},
};

// ─── locationsPage ───
const locationsPage = {
	_id: STABLE_IDS.locationsPage,
	hero: {
		eyebrow: "DESTINATION SANCTUARIES",
		heading: "Our Locations",
		subheading: "Discover Kynta sanctuaries across India's most coveted destinations.",
	},
	locations: [
		{ _key: "loc-dharamshala-1", _type: "location", name: "Indraprastha Resort Dharamshala", price: "$220 / NIGHT", imagePath: "/location-indraprastha.jpg", slug: "indraprastha-dharamshala", detailsUrl: "/locations/indraprastha-dharamshala", address: "Dharamshala, Himachal Pradesh", region: "himalayan", hours: "08:00 – 21:00 Daily", phone: "+91 1892 221 234", email: "dharamshala@kyntawellness.com", services: ["spa", "dining", "pool", "wifi", "suite"] },
		{ _key: "loc-dharamshala-2", _type: "location", name: "Asia Spa & Resort- Dharamshala", price: "$200 / NIGHT", imagePath: "/location-asia-spa.jpg", slug: "asia-spa-dharamshala", detailsUrl: "/locations/asia-spa-dharamshala", address: "Dharamshala, Himachal Pradesh", region: "himalayan", hours: "08:00 – 21:00 Daily", phone: "+91 1892 222 345", email: "asiaspa@kyntawellness.com", services: ["spa", "dining", "pool", "wifi", "suite"] },
		{ _key: "loc-dalhousie", _type: "location", name: "Indraprastha spa Resorts - Dalhousie", price: "$250 / NIGHT", imagePath: "/location-dalhousie.jpg", slug: "indraprastha-dalhousie", detailsUrl: "/locations/indraprastha-dalhousie", address: "Dalhousie, Himachal Pradesh", region: "himalayan", hours: "08:00 – 21:00 Daily", phone: "+91 1899 223 456", email: "dalhousie@kyntawellness.com", services: ["spa", "dining", "pool", "wifi", "suite"] },
		{ _key: "loc-bhanjwar", _type: "location", name: "Bhanwar Singh Palace Rajasthan", price: "$300 / NIGHT", imagePath: "/location-bhanjwar.jpg", slug: "bhanjwar-palace", detailsUrl: "/locations/bhanjwar-palace", address: "Rajasthan", region: "rajasthan", hours: "08:00 – 21:00 Daily", phone: "+91 141 224 567", email: "bhanjwar@kyntawellness.com", services: ["spa", "dining", "pool", "wifi", "suite"] },
		{ _key: "loc-rawai", _type: "location", name: "Rawai Luxury Tents - Pushkar", price: "$190 / NIGHT", imagePath: "/location-rawai-tents.jpg", slug: "rawai-tents", detailsUrl: "/locations/rawai-tents", address: "Pushkar, Rajasthan", region: "rajasthan", hours: "08:00 – 21:00 Daily", phone: "+91 145 225 678", email: "rawai@kyntawellness.com", services: ["spa", "dining", "pool", "wifi", "suite"] },
		{ _key: "loc-infinitea", _type: "location", name: "Infinte Sports Club & Tea Garden Resort, Palampur", price: "$300 / NIGHT", imagePath: "/location-infinitea.jpg", slug: "infinitea-palampur", detailsUrl: "/locations/infinitea-palampur", address: "Palampur, Himachal Pradesh", region: "himalayan", hours: "08:00 – 21:00 Daily", phone: "+91 1894 226 789", email: "infinitea@kyntawellness.com", services: ["spa", "dining", "pool", "wifi", "suite"] },
	],
	ctaSection: {
		heading: "Ready to Experience Kynta?",
		description: "Connect with our sanctuary curators for retreat reservations and consultations.",
		ctaText: "Book a Consultation",
		ctaUrl: "/contact",
	},
};

// ─── aboutPage ───
const aboutPage = {
	_id: STABLE_IDS.aboutPage,
	hero: {
		eyebrow: "OUR STORY",
		heading: "Where Ancient Wisdom Meets Modern Precision",
		description: "Kynta was born from an experimental organic herb farm in Wayanad, Kerala. Today, we manage 14+ elite wellness destination properties across India.",
		stats: [
			{ _key: "about-hero-stat-1", _type: "stat", value: "14+", label: "Sanctuaries Curated" },
			{ _key: "about-hero-stat-2", _type: "stat", value: "100%", label: "Wild & Organic Harvest" },
			{ _key: "about-hero-stat-3", _type: "stat", value: "120+", label: "Master Vaidyas & Healers" },
			{ _key: "about-hero-stat-4", _type: "stat", value: "5.0", label: "Guest Excellence Rating" },
		],
	},
	triadSection: {
		eyebrow: "The Kynta Triad",
		heading: "Three principles define every Kynta experience.",
		description: "Our triad ensures authenticity, precision, and measurable outcomes.",
		cards: [
			{ _key: "triad-vedic", _type: "triadCard", title: "Vedic Authenticity & Pure Formulations", description: "We reject synthetic binders, parabens, and diluted carrier bases. Our oils are simmered for 72 consecutive hours over slow red-sand furnaces in Kerala using ancient taila-paka methods, aligning formulations with regional doshic seasons." },
			{ _key: "triad-spatial", _type: "triadCard", title: "Sensory & Spatial Architecture", description: "A restorative experience is governed by spatial biology. Our treatment suites feature low reverberation acoustics (<24dB), natural lime-wash walls that breathe, hand-turned teakwood joinery, and circadian warmth illumination that restores melatonin rhythm." },
			{ _key: "triad-touch", _type: "triadCard", title: "Masterful Human Touch", description: "Touch is an energetic transmission, not a mechanical routine. Kynta therapists undergo over 1,200 hours of somatic alignment, breath synchronization, and nadi pressure point training. We enforce deliberate, unhurried 90 to 120-minute therapeutic cadences." },
		],
	},
	timelineSection: {
		eyebrow: "Our Journey",
		heading: "Milestones of Restorative Excellence",
		description: "From a Kerala herb farm to India's premier wellness hospitality partner.",
		milestones: [
			{ _key: "milestone-2018", _type: "milestone", year: "2018", title: "The Genesis & The Kerala Pharmacopeia", description: "Kynta was born out of an experimental organic herb farm in Wayanad, Kerala. Here, master botanists formulated 18 foundational tailams (herbal oils), verifying therapeutic bioavailability and shelf-stability without chemical stabilizers." },
			{ _key: "milestone-2020", _type: "milestone", year: "2020", title: "The Architectural Blueprint", description: "Partnering with biophilic architects, Kynta codified the first 'Sanctuary Protocol' — a comprehensive spatial blueprint for five-star hotels encompassing hydro-circuit temperature profiling, private contemplation gardens, and allergen-neutral ventilation." },
			{ _key: "milestone-2022", _type: "milestone", year: "2022", title: "Palace & Coastal Deployments", description: "Kynta assumed turnkey operational leadership for seven flagship resort sanctuaries in Udaipur, Goa, and Rishikesh. Operating with unbroken 99.4% guest satisfaction scores and setting new benchmarks for luxury wellness yield." },
			{ _key: "milestone-2024", _type: "milestone", year: "2024", title: "Alpine Corridors & Global Reach", description: "Adapting classical Vedic thermotherapy to sub-zero and alpine climates, launching flagship sanctuaries across high-altitude Himalayan corridors and European wellness retreats with climate-synchronized thermal circuits." },
			{ _key: "milestone-today", _type: "milestone", year: "Today & The Future", title: "Global Restorative Hospitality", description: "Managing 14+ elite wellness destination properties, expanding bespoke apothecary laboratories, and training the next generation of Vaidyas in cross-disciplinary therapeutic architecture." },
		],
	},
	leadershipSection: {
		eyebrow: "Leadership",
		heading: "The Architects of Kynta",
		description: "Visionaries blending ancient wisdom with modern precision.",
		members: [
			{ _key: "leader-ananya", _type: "member", name: "Ananya Varma", role: "FOUNDER & MANAGING DIRECTOR", bio: "Former director of luxury resort developments across Southeast Asia and Switzerland. Dedicated the last 15 years to institutionalizing traditional Indian healing into seamless five-star operational frameworks." },
			{ _key: "leader-harish", _type: "member", name: "Dr. Harish Namboodiri, BAMS", role: "CHIEF AYURVEDIC VAIDYA", bio: "Descendant of an illustrious Malabar healing family. Dr. Namboodiri oversees Kynta's botanical pharmacopeia, pulse diagnostic diagnostics, and therapist marma certification curriculum." },
			{ _key: "leader-devendra", _type: "member", name: "Devendra Sengupta", role: "HEAD OF SPATIAL ARCHITECTURE", bio: "Specialist in sensorial acoustic design and biophilic thermal circuits. Curates soundscapes, stone stratification, and micro-climates inside our sanctuary treatment pavilions." },
		],
	},
	stewardshipSection: {
		eyebrow: "Stewardship",
		heading: "Our Commitment to the Earth",
		description: "Sustainability is not an initiative — it is our operating system.",
		features: [
			{ _key: "steward-fairtrade", _type: "feature", title: "Direct Fair-Trade Foraging Alliances", description: "Supporting 240+ tribal farming families with stable year-round honorariums." },
			{ _key: "steward-zero", _type: "feature", title: "100% Zero Single-Use Synthetics", description: "All vessel packaging is hand-blown amber glass or unglazed terracotta earthenware." },
			{ _key: "steward-hydro", _type: "feature", title: "Closed-Loop Hydro Systems", description: "Thermal suites utilize mineral stone filtering to recycle 94% of restorative water." },
		],
		images: [],
	},
	accreditationsSection: {
		eyebrow: "Accreditations",
		heading: "Recognized Excellence",
		description: "Certified by global wellness and hospitality authorities.",
		awards: [
			{ _key: "award-gwi", _type: "award", title: "Global Wellness Institute", organization: "CHARTER SPA MEMBER", year: "2024", description: "Charter membership recognizing institutional contributions to global wellness hospitality." },
			{ _key: "award-apb", _type: "award", title: "Ayurvedic Pharmacopoeia Board", organization: "CERTIFIED 100% PURE ORIGIN", year: "2024", description: "Certification for 100% pure botanical origin and traditional processing methods." },
			{ _key: "award-lsa", _type: "award", title: "Luxury Spa Awards", organization: "BEST HOLISTIC CONCEPT 2024", year: "2024", description: "Award for best holistic wellness concept in luxury hospitality." },
			{ _key: "award-ess", _type: "award", title: "Eco-Sanctuary Standard", organization: "ZERO SINGLE-USE PLASTIC", year: "2024", description: "Certification for zero single-use plastics across all sanctuary operations." },
		],
	},
};

// ─── hospitalityPage ───
const hospitalityPage = {
	_id: STABLE_IDS.hospitalityPage,
	hero: {
		eyebrow: "INSTITUTIONAL HOSPITALITY & SANCTUARY PARTNERSHIPS",
		heading: "Elevating Luxury Hospitality Through Restorative Architecture.",
		description: "We convert underutilized hotel square footage into high-yield, brand-defining sanctuaries of unhurried restorative stillness and clinical Ayurvedic excellence.",
		stats: [
			{ _key: "hosp-hero-stat-1", _type: "stat", value: "+38%", label: "REVPAR & SPA CAPTURE" },
			{ _key: "hosp-hero-stat-2", _type: "stat", value: "14+", label: "SANCTUARIES MANAGED" },
			{ _key: "hosp-hero-stat-3", _type: "stat", value: "1,200h", label: "CLINICAL RIGOR STANDARD" },
			{ _key: "hosp-hero-stat-4", _type: "stat", value: "0%", label: "NET HYDRO WASTE" },
		],
	},
	statsSection: {
		eyebrow: "Performance Metrics",
		heading: "Measurable Impact on Your Bottom Line",
		description: "Our track record speaks through numbers.",
		metrics: [
			{ _key: "metric-revpar", _type: "metric", value: "+38%", label: "REVPAR & SPA CAPTURE", description: "Direct guest spend accretion" },
			{ _key: "metric-sanctuaries", _type: "metric", value: "14+", label: "SANCTUARIES MANAGED", description: "Flagship resorts & heritage estates" },
			{ _key: "metric-rigor", _type: "metric", value: "1,200h", label: "CLINICAL RIGOR STANDARD", description: "Certified Vaidya somatic training" },
			{ _key: "metric-waste", _type: "metric", value: "0%", label: "NET HYDRO WASTE", description: "Closed-loop thermal recirculation" },
		],
	},
	modelsSection: {
		eyebrow: "FLEXIBLE INTEGRATION",
		heading: "Three Bespoke Partnership Models",
		description: "Calibrated to ownership governance, development stage, and target capital efficiency.",
		models: [
			{ _key: "model-turnkey", _type: "model", title: "Full Turnkey Management", description: "Autonomous operational stewardship spanning certified talent, botanical provisioning, and full P&L governance.", features: ["Full P&L custodianship & transparent ledger reporting", "Proprietary Vaidya somatic staffing pipeline", "Forbes 5–Star spa readiness protocols"] },
			{ _key: "model-masterplanning", _type: "model", title: "Spatial & Acoustic Masterplanning", description: "Architectural co-creation, hydrothermal circuit engineering, circadian lighting, and sub-24dB sound isolation.", features: ["Sub-24dB acoustic decoupling blueprints", "Circadian photobiology & hydrothermal zoning", "Biophilic local stone & timber integration"] },
			{ _key: "model-licensing", _type: "model", title: "White-Label Sanctuary Licensing", description: "Wild-harvested herbal formulation lines under your resort's banner, backed by Kynta curative standards.", features: ["Co-branded organic apothecary formulations", "Certified 28-day restorative ritual menus", "Quarterly somatic audits & masterclasses"] },
		],
	},
	viabilitySection: {
		eyebrow: "COMMERCIAL VIABILITY",
		heading: "Tangible Asset Enhancement",
		description: "Transforming spatial footprint into predictable, premium-yielding hospitality assets.",
		stats: [
			{ _key: "viab-stat-1", _type: "stat", value: "+2.4 Days", label: "LENGTH OF STAY", description: "Curated curative retreat programs convert overnight guests to extended-stay wellness patrons." },
			{ _key: "viab-stat-2", _type: "stat", value: "62%", label: "OFF-SEASON RESILIENCE", description: "Monsoon panchakarma and seasonal thermal therapies maintain high occupancy through shoulder months." },
			{ _key: "viab-stat-3", _type: "stat", value: "42%", label: "RETAIL ATTACHMENT", description: "Hand-crafted tisanes, dosha oils, and wellness lifestyle wares generating top-tier retail gross margins." },
			{ _key: "viab-stat-4", _type: "stat", value: "Tier-1", label: "GLOBAL ACCREDITATIONS", description: "Immediate readiness for Condé Nast Johansens, Tatler Spa Awards, and Global Wellness Institute benchmarks." },
		],
	},
	transformationsSection: {
		eyebrow: "PROVEN TRANSFORMATIONS",
		heading: "Sanctuaries Across Diverse Terrains",
		description: "Each sanctuary is uniquely contextualized to geographic topology, indigenous flora, and native architecture.",
		transformations: [
			{ _key: "transform-udaipur", _type: "transformation", title: "The Royal Stepped Reservoir", before: "16,000 sq ft subterranean stepped reservoir", after: "Cavernous hydrothermal suites and acoustic salt-immersion grottos", description: "Heritage palace conversion in Udaipur, Rajasthan." },
			{ _key: "transform-shimla", _type: "transformation", title: "The Pine Canopy Pavilion", before: "Glass-enclosed cedar structure", after: "Hydro-sanctuary with altitude-acclimatizing herbal steam circuits", description: "Alpine biophilic hydrotherapy in Shimla, Himalayas." },
			{ _key: "transform-goa", _type: "transformation", title: "The Coconut Grove Hermitage", before: "Woven bamboo open-air pavilions", after: "Warm sea-salt hydro pools integrating Marma point bodywork", description: "Coastal wellness sanctuary in North Goa." },
		],
	},
	assuranceSection: {
		eyebrow: "INSTITUTIONAL ASSURANCE",
		heading: "Uncompromising Operational Rigor",
		description: "Statutory clinical compliance, ecological safeguards, and seamless technical integration to protect your property's brand equity.",
		pillars: [
			{ _key: "assure-certified", _type: "pillar", icon: "certified", title: "NABH & Ayush Certified", description: "100% adherence to statutory clinical benchmarks and wild-harvested botanicals with zero synthetics." },
			{ _key: "assure-housing", _type: "pillar", icon: "housing", title: "Fair-Wage & Housing", description: "Dedicated staff accommodation, ethical remuneration, and continuous career mastery ensuring 94% retention." },
			{ _key: "assure-closedloop", _type: "pillar", icon: "closed-loop", title: "Zero-Plastic Closed-Loop", description: "Closed-loop graywater botanical regeneration and zero single-use plastics throughout all treatment grottos." },
			{ _key: "assure-pms", _type: "pillar", icon: "pms", title: "Seamless PMS Integration", description: "Native synchronization with Oracle Opera Cloud, Infor HMS, Protel, and enterprise CRS ledgers." },
		],
	},
};

// ─── blogPage ───
const blogPage = {
	_id: STABLE_IDS.blogPage,
	hero: {
		eyebrow: "THE KYNTA SANCTUARY GAZETTE — VOL. IV",
		heading: "Treatises on Stillness, Botanical Formulations & Restorative Space.",
		subheading: "Dispatches from our Ayurvedic practitioners, spatial masterplanners, and apothecary artisans exploring the intersection of Vedic healing, circadian biology, and contemporary architecture.",
	},
	filters: [
		{ _key: "blog-filter-all", _type: "filter", label: "ALL ESSAYS", value: "all" },
		{ _key: "blog-filter-botanical", _type: "filter", label: "BOTANICAL APOTHECARY", value: "botanical" },
		{ _key: "blog-filter-architecture", _type: "filter", label: "SANCTUARY ARCHITECTURE", value: "architecture" },
		{ _key: "blog-filter-circadian", _type: "filter", label: "CIRCADIAN SOMATICS", value: "circadian" },
		{ _key: "blog-filter-ayurvedic", _type: "filter", label: "AYURVEDIC SCIENCE", value: "ayurvedic" },
		{ _key: "blog-filter-cases", _type: "filter", label: "VAIDYA CASE STUDIES", value: "case-studies" },
	],
	inquiriesSection: {
		eyebrow: "PEER-REVIEWED FIELDWORK",
		heading: "Recent Inquiries & Protocols",
		description: "REFLECTING 2024–2025 SANCTUARY TRIALS",
		articles: [
			{ _key: "inquiry-acoustic", _type: "article", title: "Acoustic Silence and Sub-24dB Spatial Attenuation in Luxury Sanctuaries", excerpt: "How porous limestone, stepped courtyards, and subterranean water circuits recalibrate autonomic nervous system reactivity.", category: "ARCHITECTURE", readTime: "6 MIN READ" },
			{ _key: "inquiry-circadian", _type: "article", title: "Circadian Chronobiology & The Art of the Evening Abhyanga", excerpt: "Aligning therapeutic pressure sequences with pituitary gland melatonin cycles for deep regenerative sleep.", category: "AYURVEDIC SCIENCE", readTime: "7 MIN READ" },
			{ _key: "inquiry-thermal", _type: "article", title: "Thermal Transitions: The Physiological Protocol of Salt Grottos", excerpt: "Balancing hot vapor rooms with cold mineral plunge immersion to stimulate lymphatic vascular flushing.", category: "HYDROTHERAPY", readTime: "5 MIN READ" },
		],
	},
	compendiumSection: {
		eyebrow: "SPECIAL MONOGRAPH COLLECTION",
		heading: "The 2025 Integrative Longevity Compendium",
		description: "Download our 64-page peer-reviewed monograph examining clinical data from over 14,000 guest retreat journeys across our Indian and overseas sanctuaries.",
		chapters: [
			{ _key: "chapter-1", _type: "chapter", title: "Chapter I: Microbiome Restoration via Triphala Protocols", description: "Biomarker shifts over 21 days of continuous botanical assimilation in high-altitude environments.", chapterNumber: "I", author: "Dr. Harish Namboodiri" },
			{ _key: "chapter-2", _type: "chapter", title: "Chapter II: Thermal Shock Proteins in Somatic Healing", description: "Vascular remodeling observed through alternating cedar sweat lodges and copper ice plunge cycles.", chapterNumber: "II", author: "Dr. Harish Namboodiri" },
			{ _key: "chapter-3", _type: "chapter", title: "Chapter III: Spatial Biophilic Engineering in Heritage Palaces", description: "Integrating Vaastu architectural orientations with calibrated acoustic damping for cortisol reduction.", chapterNumber: "III", author: "Devendra Sengupta" },
		],
		practitionerNotes: [
			{ _key: "note-bramha", _type: "note", title: "On the Sacred Stillness of Bramha Muhurta", author: "Vaidya Suresh Nair", role: "Kumarakom Retreat", excerpt: "The ninety minutes prior to sunrise possess a rarefied electromagnetic rhythm." },
			{ _key: "note-sesame", _type: "note", title: "The Micro-Dosing of Warm Sesame Vata Oils", author: "Master Healer Mira Patel", role: "Himalayan High Sanctuaries", excerpt: "It is not the quantity of oil poured, but the continuous cadence of friction on key marma points." },
			{ _key: "note-water", _type: "note", title: "Water Temperature as Emotional Architecture", author: "Acharya Devraj", role: "Udaipur Lake Sanctuary", excerpt: "Immersing the spine in 34–degree spring water mirrors uterine thermal equilibrium." },
		],
	},
	philosophySection: {
		eyebrow: "LIVING PHILOSOPHY",
		heading: "Practitioner Field Notes",
		description: "Concise reflections on daily mindfulness, prana containment, and herbal decoctions by resident Vaidyas.",
		fieldNotes: [
			{ _key: "fieldnote-bramha", _type: "fieldNote", title: "On the Sacred Stillness of Bramha Muhurta", excerpt: "The ninety minutes prior to sunrise possess a rarefied electromagnetic rhythm. When meditating before ambient light saturates the courtyard, cellular metabolic tension settles into genuine rest.", category: "MINDFULNESS", author: "Vaidya Suresh Nair" },
			{ _key: "fieldnote-sesame", _type: "fieldNote", title: "The Micro-Dosing of Warm Sesame Vata Oils", excerpt: "It is not the quantity of oil poured, but the continuous cadence of friction on key marma points that gently disarms chronic muscular resistance.", category: "BOTANICAL", author: "Master Healer Mira Patel" },
			{ _key: "fieldnote-water", _type: "fieldNote", title: "Water Temperature as Emotional Architecture", excerpt: "Immersing the spine in 34–degree spring water mirrors uterine thermal equilibrium, instantly softening the sympathetic nervous flight response.", category: "HYDROTHERAPY", author: "Acharya Devraj" },
		],
		audioTracks: [
			{ _key: "audio-rudra", _type: "track", title: "Rudra Veena Harmonics & Rainfall in Coorg", duration: "18 Min Duration", category: "Acoustic Chamber Vol. 3", audioUrl: "https://kyntawellness.com/audio/rudra-veena.mp3" },
			{ _key: "audio-nadi", _type: "track", title: "Guided Nadi Shodhana for Circadian Sunset Transition", duration: "24 Min Duration", category: "Voiced by Dr. Ananya Varma", audioUrl: "https://kyntawellness.com/audio/nadi-shodhana.mp3" },
			{ _key: "audio-water", _type: "track", title: "Subterranean Water Flow & Tibetan Bell Resonances", duration: "45 Min Immersion", category: "Hydrothermal Room Binaural", audioUrl: "https://kyntawellness.com/audio/water-flow.mp3" },
		],
	},
};

// ─── contactPage ───
const contactPage = {
	_id: STABLE_IDS.contactPage,
	hero: {
		eyebrow: "SANCTUARY LIAISON & CONCIERGE",
		heading: "Connect With Our Sanctuary Desks",
		subheading: "Connect with our sanctuary curators for retreat reservations, clinical Vaidya consultations, and institutional advisory. Our team responds with ancestral precision and unyielding discretion.",
	},
	tabs: [
		{ _key: "tab-private", _type: "tab", label: "PRIVATE GUEST BOOKING", value: "private" },
		{ _key: "tab-hospitality", _type: "tab", label: "HOSPITALITY & TURNKEY", value: "hospitality" },
		{ _key: "tab-vaidya", _type: "tab", label: "VAIDYA CONSULTATION", value: "vaidya" },
	],
	contactInfo: {
		email: "info@kyntawellness.com",
		phone: "+91 7250333494",
		address: "Kynta Wellness Private Limited",
		workingHours: "07:00 – 22:00 IST",
	},
	locationCards: [
		{ _key: "card-kumarakom", _type: "locationCard", name: "Kumarakom Retreat", address: "Kumarakom, Kerala", phone: "+91 481 234 5678", hours: "08:00 – 21:00 Daily" },
		{ _key: "card-udaipur", _type: "locationCard", name: "Udaipur Lake Sanctuary", address: "Udaipur, Rajasthan", phone: "+91 294 234 5678", hours: "08:00 – 21:00 Daily" },
		{ _key: "card-shimla", _type: "locationCard", name: "Himalayan High Sanctuaries", address: "Shimla, Himachal Pradesh", phone: "+91 177 234 5678", hours: "08:00 – 21:00 Daily" },
		{ _key: "card-goa", _type: "locationCard", name: "Mandrem Coconut Grove", address: "North Goa", phone: "+91 832 234 5678", hours: "08:00 – 21:00 Daily" },
		{ _key: "card-bhanjwar", _type: "locationCard", name: "Bhanjwar Estate", address: "Kangra Valley, Himachal Pradesh", phone: "+91 1892 234 5678", hours: "08:00 – 21:00 Daily" },
	],
	formFields: {
		nameLabel: "PRINCIPAL GUEST / EXECUTIVE NAME *",
		emailLabel: "CONFIDENTIAL EMAIL ADDRESS *",
		phoneLabel: "DIRECT TELEPHONE / WHATSAPP",
		serviceLabel: "SANCTUARY OF RESONANCE *",
		messageLabel: "SOMATIC SENSITIVITIES, DIETARY PRINCIPLES, OR PROJECT SPECIFICATIONS",
		submitButtonLabel: "TRANSMIT CONCIERGE FOLIO",
	},
};

// ─── Helper: Portable Text block ───
function ptBlock(text: string, key = "block-1") {
	return {
		_key: key,
		_type: "block",
		style: "normal",
		children: [{ _key: "span-1", _type: "span", text }],
	};
}

// ─── Services (B2B Partnership Services) ───
const services = [
	{
		_id: "service-spatial",
		_type: "service",
		title: "Spatial Concept & Flow",
		slug: { _type: "slug", current: "spatial-concept-flow" },
		shortDescription: "Advisory on wet/dry zoning, MEP requirements, acoustic buffering, treatment room ergonomics, and thermal water circuits.",
		description: [ptBlock("Advisory on wet/dry zoning, MEP requirements, acoustic buffering, treatment room ergonomics, and thermal water circuits.", "desc-spatial")],
	},
	{
		_id: "service-management",
		_type: "service",
		title: "Turnkey Daily Management",
		slug: { _type: "slug", current: "turnkey-daily-management" },
		shortDescription: "100% outsourced operations: reservation desk management, luxury service standards, inventory, linen stewardship, and safety audits.",
		description: [ptBlock("100% outsourced operations: reservation desk management, luxury service standards, inventory, linen stewardship, and safety audits.", "desc-management")],
	},
	{
		_id: "service-sourcing",
		_type: "service",
		title: "Academy Therapist Sourcing",
		slug: { _type: "slug", current: "academy-therapist-sourcing" },
		shortDescription: "Certified residential recruitment pipeline. We absorb therapist payroll, ongoing certification, medical compliance, and retention risk.",
		description: [ptBlock("Certified residential recruitment pipeline. We absorb therapist payroll, ongoing certification, medical compliance, and retention risk.", "desc-sourcing")],
	},
	{
		_id: "service-formulation",
		_type: "service",
		title: "Apothecary Formulation",
		slug: { _type: "slug", current: "apothecary-formulation" },
		shortDescription: "Exclusive single-estate herbal formulations and custom hotel-branded apothecary lines packaged in sustainable apothecary glass.",
		description: [ptBlock("Exclusive single-estate herbal formulations and custom hotel-branded apothecary lines packaged in sustainable apothecary glass.", "desc-formulation")],
	},
	{
		_id: "service-revpash",
		_type: "service",
		title: "RevPASH Optimization",
		slug: { _type: "slug", current: "revpash-optimization" },
		shortDescription: "Proprietary yield algorithms driving treatment room utilization across peak and non-peak hours, increasing overall property ADR.",
		description: [ptBlock("Proprietary yield algorithms driving treatment room utilization across peak and non-peak hours, increasing overall property ADR.", "desc-revpash")],
	},
	{
		_id: "service-brand",
		_type: "service",
		title: "Brand Asset Elevation",
		slug: { _type: "slug", current: "brand-asset-elevation" },
		shortDescription: "Enhance your luxury hotel credentials. Partner properties report immediate boosts in Condé Nast and TripAdvisor wellness ratings.",
		description: [ptBlock("Enhance your luxury hotel credentials. Partner properties report immediate boosts in Condé Nast and TripAdvisor wellness ratings.", "desc-brand")],
	},
];

// ─── Treatments ───
const treatments = [
	{
		_id: "treatment-spa-sojourns",
		_type: "treatment",
		title: "Spa Sojourns",
		slug: { _type: "slug", current: "spa-sojourns" },
		service: { _type: "reference", _ref: "service-spatial" },
		shortDescription: "Immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe.",
		description: [ptBlock("Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centered, and completely at ease.", "desc-spa")],
	},
	{
		_id: "treatment-massage",
		_type: "treatment",
		title: "Massage Selections",
		slug: { _type: "slug", current: "massage-selections" },
		service: { _type: "reference", _ref: "service-spatial" },
		shortDescription: "Curated Full Body Massage selections designed to release tension, improve circulation, and restore inner harmony.",
		description: [ptBlock("Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.", "desc-massage")],
	},
	{
		_id: "treatment-glamour-glow",
		_type: "treatment",
		title: "Glamour Glow",
		slug: { _type: "slug", current: "glamour-glow" },
		service: { _type: "reference", _ref: "service-formulation" },
		shortDescription: "Luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin.",
		description: [ptBlock("Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing.", "desc-glamour")],
	},
	{
		_id: "treatment-hydrotherapy",
		_type: "treatment",
		title: "Hydrotherapy Plunge",
		slug: { _type: "slug", current: "hydrotherapy-plunge" },
		service: { _type: "reference", _ref: "service-management" },
		shortDescription: "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration.",
		description: [ptBlock("Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration. Our hydrotherapy protocols combine heated mineral pools with cold plunge immersion for maximum therapeutic benefit.", "desc-hydro")],
	},
	{
		_id: "treatment-couples",
		_type: "treatment",
		title: "Couples Sanctuary",
		slug: { _type: "slug", current: "couples-sanctuary" },
		service: { _type: "reference", _ref: "service-management" },
		shortDescription: "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals.",
		description: [ptBlock("A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals. Designed for partners seeking a communal path to deep relaxation.", "desc-couples")],
	},
	{
		_id: "treatment-sound",
		_type: "treatment",
		title: "Sound Immersion",
		slug: { _type: "slug", current: "sound-immersion" },
		service: { _type: "reference", _ref: "service-formulation" },
		shortDescription: "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states.",
		description: [ptBlock("Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states. Experience the resonant frequencies of Tibetan singing bowls, crystal bowls, and traditional Indian instruments.", "desc-sound")],
	},
];

// ─── Blog Posts ───
const blogPosts = [
	{
		_id: "blogpost-herbal-compress",
		_type: "blogPost",
		title: "The Science of Warm Herbal Compresses in High-Stress Recovery",
		slug: { _type: "slug", current: "science-of-warm-herbal-compresses" },
		excerpt: "How thermotherapy combined with lipid-soluble terpene botanicals penetrates deep myofascial barriers to regulate cortisol spikes.",
		author: "Dr. Harish Namboodiri",
		category: "wellness",
		publishedAt: "2025-01-15T00:00:00Z",
		content: [
			ptBlock("How thermotherapy combined with lipid-soluble terpene botanicals penetrates deep myofascial barriers to regulate cortisol spikes.", "content-1"),
		],
	},
	{
		_id: "blogpost-spa-sanctuaries",
		_type: "blogPost",
		title: "Designing Spa Sanctuaries: The Convergence of Biophilia and Ayurveda",
		slug: { _type: "slug", current: "designing-spa-sanctuaries" },
		excerpt: "An inquiry into how tactile raw stone, micro-acoustics, and natural light rhythms induce involuntary parasympathetic downregulation.",
		author: "Devendra Sengupta",
		category: "lifestyle",
		publishedAt: "2025-02-10T00:00:00Z",
		content: [
			ptBlock("An inquiry into how tactile raw stone, micro-acoustics, and natural light rhythms induce involuntary parasympathetic downregulation.", "content-1"),
		],
	},
	{
		_id: "blogpost-revpash",
		_type: "blogPost",
		title: "Optimizing Hotel RevPASH Through Integrated Wellness Programming",
		slug: { _type: "slug", current: "optimizing-hotel-revpash" },
		excerpt: "Why luxury resort developers are transforming passive spa square footage into high-yield restorative hubs that augment overall property yield.",
		author: "Ananya Varma",
		category: "lifestyle",
		publishedAt: "2025-03-05T00:00:00Z",
		content: [
			ptBlock("Why luxury resort developers are transforming passive spa square footage into high-yield restorative hubs that augment overall property yield.", "content-1"),
		],
	},
	{
		_id: "blogpost-acoustic-silence",
		_type: "blogPost",
		title: "Acoustic Silence and Sub-24dB Spatial Attenuation in Luxury Sanctuaries",
		slug: { _type: "slug", current: "acoustic-silence-spatial-attenuation" },
		excerpt: "How porous limestone, stepped courtyards, and subterranean water circuits recalibrate autonomic nervous system reactivity.",
		author: "Devendra Sengupta",
		category: "lifestyle",
		publishedAt: "2025-04-12T00:00:00Z",
		content: [
			ptBlock("How porous limestone, stepped courtyards, and subterranean water circuits recalibrate autonomic nervous system reactivity.", "content-1"),
		],
	},
	{
		_id: "blogpost-circadian",
		_type: "blogPost",
		title: "Circadian Chronobiology & The Art of the Evening Abhyanga",
		slug: { _type: "slug", current: "circadian-chronobiology-evening-abhyanga" },
		excerpt: "Aligning therapeutic pressure sequences with pituitary gland melatonin cycles for deep regenerative sleep.",
		author: "Dr. Harish Namboodiri",
		category: "ayurveda",
		publishedAt: "2025-05-20T00:00:00Z",
		content: [
			ptBlock("Aligning therapeutic pressure sequences with pituitary gland melatonin cycles for deep regenerative sleep.", "content-1"),
		],
	},
	{
		_id: "blogpost-thermal-transitions",
		_type: "blogPost",
		title: "Thermal Transitions: The Physiological Protocol of Salt Grottos",
		slug: { _type: "slug", current: "thermal-transitions-salt-grottos" },
		excerpt: "Balancing hot vapor rooms with cold mineral plunge immersion to stimulate lymphatic vascular flushing.",
		author: "Dr. Harish Namboodiri",
		category: "wellness",
		publishedAt: "2025-06-18T00:00:00Z",
		content: [
			ptBlock("Balancing hot vapor rooms with cold mineral plunge immersion to stimulate lymphatic vascular flushing.", "content-1"),
		],
	},
];

// ─── Testimonials ───
const testimonials = [
	{
		_id: "testimonial-ananya",
		_type: "testimonial",
		clientName: "Ananya Singhania",
		clientTitle: "Stayed at Glenwood Manor, Shimla",
		quote: "The Kynta Prana Herbal Compress restored my body after grueling weeks of corporate travel. The precision of the therapist's touch and the organic cedar oil aroma made it one of the finest spas in Asia.",
		rating: 5,
		service: { _type: "reference", _ref: "service-spatial" },
	},
	{
		_id: "testimonial-vikramjit",
		_type: "testimonial",
		clientName: "Vikramjit Oberoi-Mehra",
		clientTitle: "Managing Director, Heritage Palace Properties",
		quote: "As resort owners, outsourcing our spa to Kynta was the most profitable operational move we made in 2024. Revenue per treatment room jumped 38%, and guest mentions of the spa doubled.",
		rating: 5,
		service: { _type: "reference", _ref: "service-management" },
	},
	{
		_id: "testimonial-claire",
		_type: "testimonial",
		clientName: "Claire Beauchamp",
		clientTitle: "Guest at Kynta Palms Resort, Goa",
		quote: "The Kumkumadi Golden Radiance facial left my complexion luminous for days. It didn't feel like a transactional hotel appointment, but an ancient restorative intuition.",
		rating: 5,
		service: { _type: "reference", _ref: "service-formulation" },
	},
];

// ─── FAQs ───
const faqs = [
	{
		_id: "faq-booking",
		_type: "faq",
		question: "How do I book a session?",
		answer: [ptBlock("Contact our concierge team via WhatsApp or our booking form. We recommend booking 48 hours in advance for optimal preparation.", "faq-booking-answer")],
		category: "booking",
		order: 1,
	},
	{
		_id: "faq-wear",
		_type: "faq",
		question: "What should I wear?",
		answer: [ptBlock("We provide luxurious kimonos and slippers. Wear whatever is comfortable for your journey.", "faq-wear-answer")],
		category: "general",
		order: 2,
	},
	{
		_id: "faq-ages",
		_type: "faq",
		question: "Are treatments suitable for all ages?",
		answer: [ptBlock("Our treatments are designed for adults. We offer specialized programs for different age groups upon request.", "faq-ages-answer")],
		category: "general",
		order: 3,
	},
];

// ─── Experiences (Dynamic Detail Pages) ───
const experiences = [
	{
		_id: "experience-spa-sojourns",
		_type: "experience",
		title: "Spa Sojourns",
		slug: { _type: "slug", current: "spa-sojourns" },
		eyebrow: "SACRED HEALING SERIES",
		description: "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centered, and completely at ease.",
		category: "Signature Bodywork",
		duration: "75 / 90 Mins",
		sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver",
		price: "₹8,500",
		priceAmount: 8500,
		currency: "INR",
		primaryCta: { label: "EXPLORE MASSAGES", url: "/experiences/massage-selections" },
		secondaryCta: { label: "CONCIERGE SCHEDULING", url: "/contact" },
		gallery: {
			mainCard: { tag: "RITUAL BASELINE", title: "Traditional Abhyanga & Tailam", badge: "01 / MASTER RITUAL" },
			topRightCard: { tag: "THERAPEUTIC HEAT", title: "Herbal Potli Kizhi Compress" },
			bottomRightCard: { tag: "SANCTUARY SUITES", title: "Private Stone & Teak Pavilions" },
		},
		footerNote: "Curated full-body therapies with cold-pressed botanical infusions",
		highlights: ["TAILORED PRESSURE", "AROMA ELIXIRS", "PRIVATE SUITES"],
	},
	{
		_id: "experience-massage-selections",
		_type: "experience",
		title: "Massage Selections",
		slug: { _type: "slug", current: "massage-selections" },
		eyebrow: "THERAPEUTIC RESTORATIVE SERIES",
		description: "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.",
		category: "Signature Bodywork",
		duration: "60 / 90 Mins",
		sensoryNote: "Brahmi • Ashwagandha • Sandalwood",
		price: "₹6,500",
		priceAmount: 6500,
		currency: "INR",
		primaryCta: { label: "RESERVE THERAPY", url: "/contact" },
		secondaryCta: { label: "CONCIERGE SCHEDULING", url: "/contact" },
		gallery: {
			mainCard: { tag: "SOMATIC MASTERY", title: "Deep Somatic Tissue & Marma Release", badge: "02 / RESTORATIVE" },
			topRightCard: { tag: "THERMAL RELEASE", title: "Warm Herbal Compresses" },
			bottomRightCard: { tag: "SANCTUARY SUITES", title: "Himalayan Cedar Suites" },
		},
		footerNote: "Ancient nadi pressure release synchronized with slow rhythmic breathing",
		highlights: ["DEEP TISSUE FLOW", "WARM CEDAR OILS", "MARMA BALANCE"],
	},
	{
		_id: "experience-glamour-glow",
		_type: "experience",
		title: "Glamour Glow",
		slug: { _type: "slug", current: "glamour-glow" },
		eyebrow: "BOTANICAL RADIANCE SERIES",
		description: "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.",
		category: "Signature Bodywork",
		duration: "60 Mins",
		sensoryNote: "Floral Jasmine • Mineral Crisp • Sweet Neroli",
		price: "₹5,500",
		priceAmount: 5500,
		currency: "INR",
		primaryCta: { label: "EXPLORE RITUALS", url: "/experiences/spa-sojourns" },
		secondaryCta: { label: "CONCIERGE SCHEDULING", url: "/contact" },
		gallery: {
			mainCard: { tag: "BOTANICAL FACIAL", title: "Kumkumadi & Gold Saffron Elixir", badge: "03 / RADIANCE" },
			topRightCard: { tag: "GENTLE BUFFING", title: "Crushed Walnut & Rose Exfoliation" },
			bottomRightCard: { tag: "SANCTUARY SUITES", title: "Sunlit Marble Grooming Lounges" },
		},
		footerNote: "Single-estate lunar-harvested saffron with pure botanical lipids",
		highlights: ["CELLULAR POLISH", "KUMKUMADI INFUSION", "LUMINOUS FINISH"],
	},
	{
		_id: "experience-hydrotherapy-plunge",
		_type: "experience",
		title: "Hydrotherapy Plunge",
		slug: { _type: "slug", current: "hydrotherapy-plunge" },
		eyebrow: "AQUATIC THERMAL SERIES",
		description: "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration. Our hydrotherapy protocols combine heated mineral pools with cold plunge immersion for maximum therapeutic benefit.",
		category: "Hydrothermal & Thermal Baths",
		duration: "45 Mins",
		price: "₹4,500",
		priceAmount: 4500,
		currency: "INR",
		primaryCta: { label: "EXPLORE CIRCUITS", url: "/experiences" },
		secondaryCta: { label: "CONCIERGE SCHEDULING", url: "/contact" },
		gallery: {
			mainCard: { tag: "HYDRO CIRCUIT", title: "Stepped Magnesium Flotation Pool", badge: "04 / HYDROTHERMAL" },
			topRightCard: { tag: "VAPOR CHAMBER", title: "Herbal Steam Cavern" },
			bottomRightCard: { tag: "CRYOTHERAPY", title: "Glacial Mineral Plunge" },
		},
		footerNote: "Closed-loop thermodynamic mineral recirculation with zero hydro waste",
		highlights: ["THERMAL SHOCK", "SALINE FLOTATION", "LYMPHATIC RESET"],
	},
	{
		_id: "experience-couples-sanctuary",
		_type: "experience",
		title: "Couples Sanctuary",
		slug: { _type: "slug", current: "couples-sanctuary" },
		eyebrow: "DUET CONTEMPLATION SERIES",
		description: "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals. Designed for partners seeking a communal path to deep relaxation and cellular renewal.",
		category: "Couples & Duets",
		duration: "120 Mins",
		price: "₹18,000",
		priceAmount: 18000,
		currency: "INR",
		primaryCta: { label: "RESERVE DUET", url: "/contact" },
		secondaryCta: { label: "CONCIERGE SCHEDULING", url: "/contact" },
		gallery: {
			mainCard: { tag: "SHARED STILLNESS", title: "Synchronized Dual Abhyanga", badge: "05 / DUET" },
			topRightCard: { tag: "BATH RITUAL", title: "Copper Basin Floral Bath" },
			bottomRightCard: { tag: "PRIVATE RETREAT", title: "Forest View Teak Pavilion" },
		},
		footerNote: "Intimate seclusion with private botanical steam and open garden verandas",
		highlights: ["SYNCHRONIZED TOUCH", "DUAL TEAK BEDS", "PRIVATE VERANDAH"],
	},
	{
		_id: "experience-sound-immersion",
		_type: "experience",
		title: "Sound Immersion",
		slug: { _type: "slug", current: "sound-immersion" },
		eyebrow: "SONIC VIBRATION SERIES",
		description: "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states. Experience the resonant frequencies of Tibetan singing bowls, crystal bowls, and traditional Rudra Veena harmonics.",
		category: "Sound & Meditative Immersion",
		duration: "60 Mins",
		price: "₹5,000",
		priceAmount: 5000,
		currency: "INR",
		primaryCta: { label: "EXPLORE SOUNDSCAPES", url: "/blog" },
		secondaryCta: { label: "CONCIERGE SCHEDULING", url: "/contact" },
		gallery: {
			mainCard: { tag: "ACOUSTIC CHAMBER", title: "Singing Bowls & Rudra Veena Harmonics", badge: "06 / SONIC" },
			topRightCard: { tag: "VIBRATIONAL HEALING", title: "Sub-24dB Porous Stone Acoustics" },
			bottomRightCard: { tag: "MEDITATION VAULT", title: "Lime Plaster Resonance Grottos" },
		},
		footerNote: "Calibrated spatial soundscapes engineered for deep parasympathetic alignment",
		highlights: ["THETA HARMONICS", "TIBETAN BELLS", "ACOUSTIC SILENCE"],
	},
];

// ─── Run seed ───
async function main() {
	console.log("🌱 Seeding Sanity CMS...\n");

	// Singleton page documents
	await upsert(siteSettings);
	await upsert(homepage);
	await upsert(experiencesPage);
	await upsert(locationsPage);
	await upsert(aboutPage);
	await upsert(hospitalityPage);
	await upsert(blogPage);
	await upsert(contactPage);

	// Collection documents: Services
	console.log("\n📋 Seeding Services...");
	for (const service of services) {
		await upsert(service);
	}

	// Collection documents: Treatments (depend on Services)
	console.log("\n💆 Seeding Treatments...");
	for (const treatment of treatments) {
		await upsert(treatment);
	}

	// Collection documents: Experiences (Dynamic Detail Pages)
	console.log("\n🌿 Seeding Experiences...");
	for (const experienceItem of experiences) {
		await upsert(experienceItem);
	}

	// Collection documents: Blog Posts
	console.log("\n📝 Seeding Blog Posts...");
	for (const post of blogPosts) {
		await upsert(post);
	}

	// Collection documents: Testimonials (depend on Services)
	console.log("\n💬 Seeding Testimonials...");
	for (const testimonial of testimonials) {
		await upsert(testimonial);
	}

	// Collection documents: FAQs
	console.log("\n❓ Seeding FAQs...");
	for (const faq of faqs) {
		await upsert(faq);
	}

	console.log("\n✅ Seed complete!");
	console.log("   8 singleton documents + 6 services + 6 treatments + 6 experiences + 6 blog posts + 3 testimonials + 3 FAQs");
}

main().catch((err) => {
	console.error("❌ Seed failed:", err);
	process.exit(1);
});
