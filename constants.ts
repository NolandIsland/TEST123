
import { ChecklistItem, SectionType } from './types';

export const ZERO_TOLERANCE_ITEMS: ChecklistItem[] = [
  {
    id: 1,
    section: SectionType.ZERO_TOLERANCE,
    category: 'Zero Tolerance',
    title: 'Unauthorized Items',
    description: 'The presence, use, or sale of any non-approved ingredients, packaging, equipment, or uniforms is strictly prohibited.',
    points: 300
  },
  {
    id: 2,
    section: SectionType.ZERO_TOLERANCE,
    category: 'Zero Tolerance',
    title: 'Expired Materials',
    description: 'The storage or use of expired raw materials, packaging, or consumables is strictly prohibited.',
    points: 300
  },
  {
    id: 3,
    section: SectionType.ZERO_TOLERANCE,
    category: 'Zero Tolerance',
    title: 'Spoiled Food',
    description: 'Fresh produce, toppings, or drinks showing signs of spoilage, including decay, off-odors, or mold growth, must not be stored or used.',
    points: 300
  },
  {
    id: 4,
    section: SectionType.ZERO_TOLERANCE,
    category: 'Zero Tolerance',
    title: 'Overnight Storage',
    description: 'Overnight storage of tea bases, fresh or cut fruits, ice-cream mixes, toppings, finished beverages, or pre-filled cups is strictly prohibited in all store areas.',
    points: 300
  }
];

export const OPERATIONAL_ITEMS: ChecklistItem[] = [
  // 5-17 Exterior & Interior
  { id: 5, section: SectionType.OTHER, category: 'Dining Area', title: 'Exterior Cleanliness', description: 'Storefront signage, door pillars, and outdoor seating must be clean; entrance ground area within 2m free from litter.', points: 5 },
  { id: 6, section: SectionType.OTHER, category: 'Dining Area', title: 'Exterior Lighting & Audio', description: 'All exterior signage and entrance lighting operational; audio within noise limits.', points: 3 },
  { id: 7, section: SectionType.OTHER, category: 'Dining Area', title: 'Storefront Glass', description: 'Storefront glass must be crystal-clear; free from fingerprints, stains, and dust.', points: 3 },
  { id: 8, section: SectionType.OTHER, category: 'Dining Area', title: 'Indoor Lighting', description: 'All interior lighting switched on and clean.', points: 5 },
  { id: 9, section: SectionType.OTHER, category: 'Dining Area', title: 'Entrance Displays & Promotions', description: 'Approved recruitment and promotional materials only; clean and orderly.', points: 3 },
  { id: 10, section: SectionType.OTHER, category: 'Dining Area', title: 'Air Conditioning', description: 'Effective at 24°C ±1°C; vents and units clean.', points: 3 },
  { id: 11, section: SectionType.OTHER, category: 'Dining Area', title: 'Seating Areas', description: 'Indoor and outdoor seating clean and orderly.', points: 3 },
  { id: 12, section: SectionType.OTHER, category: 'Dining Area', title: 'Interior Décor & Walls', description: 'Decorations, partitions, and walls clean; no dust or cobwebs.', points: 3 },
  { id: 13, section: SectionType.OTHER, category: 'Dining Area', title: 'Plants & Displays', description: 'Well-maintained plants; clean, orderly product displays.', points: 3 },
  { id: 14, section: SectionType.OTHER, category: 'Dining Area', title: 'Ceiling & Fixtures', description: 'Ceilings and light fixtures clean; free from stains and cobwebs.', points: 3 },
  { id: 15, section: SectionType.OTHER, category: 'Dining Area', title: 'Floors & Corners', description: 'Floors clean and dry; corners free from dust.', points: 3 },
  { id: 16, section: SectionType.OTHER, category: 'Dining Area', title: 'Washrooms', description: 'Clean, dry, odor-free; no mold or stains.', points: 3 },
  { id: 17, section: SectionType.OTHER, category: 'Dining Area', title: 'Store Odor Control', description: 'Free from abnormal odors; no strong chemicals.', points: 5 },

  // 18-25 Cashier
  { id: 18, section: SectionType.OTHER, category: 'Cashier', title: 'Customer Greeting', description: 'Customers greeted immediately with approved greeting.', points: 3 },
  { id: 19, section: SectionType.OTHER, category: 'Cashier', title: 'Product Recommendation', description: 'Active recommendation of signature or new products.', points: 3 },
  { id: 20, section: SectionType.OTHER, category: 'Cashier', title: 'Customer Farewell', description: 'Acknowledged verbally upon departure.', points: 3 },
  { id: 21, section: SectionType.OTHER, category: 'Cashier', title: 'Staffing & Service', description: 'Cashier stations continuously staffed; professional delivery.', points: 3 },
  { id: 22, section: SectionType.OTHER, category: 'Cashier', title: 'Cashier Cleanliness', description: 'Counters and screens free from stains/dust.', points: 5 },
  { id: 23, section: SectionType.OTHER, category: 'Cashier', title: 'Equipment & Cup Holders', description: 'Receipt printers, trays, and cup holders clean/stocked.', points: 3 },
  { id: 24, section: SectionType.OTHER, category: 'Cashier', title: 'Media & Audio Content', description: 'Menus/screens display current approved content.', points: 3 },
  { id: 25, section: SectionType.OTHER, category: 'Cashier', title: 'Cup Sealing Machine', description: 'Clean, functional, no sugar residue or mold.', points: 5 },

  // 26-45 Front Counter
  { id: 26, section: SectionType.OTHER, category: 'Front Counter', title: 'Thermal Dispensers & Tools', description: 'Tea/hot water within expiry; measuring tools clean.', points: 5 },
  { id: 27, section: SectionType.OTHER, category: 'Front Counter', title: 'Daily Topping Check', description: 'Checked daily for freshness/validity.', points: 5 },
  { id: 28, section: SectionType.OTHER, category: 'Front Counter', title: 'Pre-filled Cups', description: 'Stored in freezer; protected from open-air.', points: 3 },
  { id: 29, section: SectionType.OTHER, category: 'Front Counter', title: 'Ice Bin Management', description: 'Clean; ice ≥ 50% capacity; hygienic scoops.', points: 3 },
  { id: 30, section: SectionType.OTHER, category: 'Front Counter', title: 'Tools & Containers', description: 'Stored by category; cleaned immediately after use.', points: 3 },
  { id: 31, section: SectionType.OTHER, category: 'Front Counter', title: 'Sink & Tap Hygiene', description: 'Clean sinks and taps; no residue or mold.', points: 3 },
  { id: 32, section: SectionType.OTHER, category: 'Front Counter', title: 'Water Heater', description: 'Clean internally and externally; no stains.', points: 3 },
  { id: 33, section: SectionType.OTHER, category: 'Front Counter', title: 'Refrigeration Control', description: 'Logged, covered, ≤4°C; no frost accumulation.', points: 3 },
  { id: 34, section: SectionType.OTHER, category: 'Front Counter', title: 'Ice Cream Quality', description: 'Within shelf life; free from spoilage.', points: 8 },
  { id: 35, section: SectionType.OTHER, category: 'Front Counter', title: 'Ice Cream Machine Hygiene', description: 'Machine and area clean; no residue or mold.', points: 5 },
  { id: 36, section: SectionType.OTHER, category: 'Front Counter', title: 'Cone Storage', description: 'Clean bins; dry and free from crumbs/mold.', points: 3 },
  { id: 37, section: SectionType.OTHER, category: 'Front Counter', title: 'Pest Control', description: 'Devices operational; monitoring materials current.', points: 3 },
  { id: 38, section: SectionType.OTHER, category: 'Front Counter', title: 'Utensils & Stainless Cups', description: 'Utensils clean; soaking water replaced every 2hrs.', points: 5 },
  { id: 39, section: SectionType.OTHER, category: 'Front Counter', title: 'Topping Containers', description: 'Sealed, clean, correctly labeled.', points: 5 },
  { id: 40, section: SectionType.OTHER, category: 'Front Counter', title: 'Post-Preparation Cleaning', description: 'Workstations cleaned immediately after use.', points: 3 },
  { id: 41, section: SectionType.OTHER, category: 'Front Counter', title: 'Hand Hygiene & PPE', description: 'Handwashing; gloves and hair nets mandatory.', points: 5 },
  { id: 42, section: SectionType.OTHER, category: 'Front Counter', title: 'Recipe Accuracy', description: 'Mandatory weighing; strictly follow recipes.', points: 8 },
  { id: 43, section: SectionType.OTHER, category: 'Front Counter', title: 'Pre-Serving Check', description: 'Visual inspection; zero foreign matter allowed.', points: 8 },
  { id: 44, section: SectionType.OTHER, category: 'Front Counter', title: 'Sugar Dispenser Accuracy', description: 'Dispense within ±1g of programmed setting.', points: 3 },
  { id: 45, section: SectionType.OTHER, category: 'Front Counter', title: 'Waste Management (Front)', description: 'Covered; emptied at 80% capacity; no overnight waste.', points: 5 },

  // 46-58 Kitchen
  { id: 46, section: SectionType.OTHER, category: 'Kitchen', title: 'Food-Contact Utensils', description: 'Labeled, stored correctly, and kept clean.', points: 5 },
  { id: 47, section: SectionType.OTHER, category: 'Kitchen', title: 'Towel Management', description: 'Color-coded; disinfected according to procedure.', points: 5 },
  { id: 48, section: SectionType.OTHER, category: 'Kitchen', title: 'Equipment Placement', description: 'Stored in designated, labeled locations.', points: 3 },
  { id: 49, section: SectionType.OTHER, category: 'Kitchen', title: 'Handwashing Facilities', description: 'Soap supplied; stations functional and clean.', points: 5 },
  { id: 50, section: SectionType.OTHER, category: 'Kitchen', title: 'Back-Area Cleanliness', description: 'Surfaces, sinks, and floors orderly.', points: 3 },
  { id: 51, section: SectionType.OTHER, category: 'Kitchen', title: 'Ice Maker Hygiene', description: 'No residue or scale buildup.', points: 5 },
  { id: 52, section: SectionType.OTHER, category: 'Kitchen', title: 'Opened Materials Control', description: 'Sealed, labeled with expiry, stored neatly.', points: 8 },
  { id: 53, section: SectionType.OTHER, category: 'Kitchen', title: 'Duplicate Opened Materials', description: 'Multiple open packages of same material prohibited.', points: 8 },
  { id: 54, section: SectionType.OTHER, category: 'Kitchen', title: 'Semi-Finished Products', description: 'Off-floor storage; expiry clearly recorded.', points: 5 },
  { id: 55, section: SectionType.OTHER, category: 'Kitchen', title: 'Thermal Dispensers (Back)', description: 'Clean; free from residue or mold.', points: 3 },
  { id: 56, section: SectionType.OTHER, category: 'Kitchen', title: 'Waste Management (Back)', description: 'Bin lid covered. Garbage timely disposal, cleaning tools in designated area, no overnight garbage.', points: 3 },
  { id: 57, section: SectionType.OTHER, category: 'Kitchen', title: 'Back-Area Floors & Walls', description: 'Clean, dry, free from cobwebs.', points: 3 },
  { id: 58, section: SectionType.OTHER, category: 'Kitchen', title: 'Curtains', description: 'Clean and free from residue or mold.', points: 5 },

  // 59-67 Storage
  { id: 59, section: SectionType.OTHER, category: 'Storage Area', title: 'Material Labeling', description: 'Location labels; within quantity limits.', points: 5 },
  { id: 60, section: SectionType.OTHER, category: 'Storage Area', title: 'Storage Conditions', description: 'Dry, clean, and odor-free environment.', points: 3 },
  { id: 61, section: SectionType.OTHER, category: 'Storage Area', title: 'FIFO Management', description: 'Stock managed using First-In-First-Out.', points: 3 },
  { id: 62, section: SectionType.OTHER, category: 'Storage Area', title: 'Floor Contact Prohibited', description: 'No food or packaging on floors.', points: 3 },
  { id: 63, section: SectionType.OTHER, category: 'Storage Area', title: '6-2-1 Storage Rule', description: 'Clearance from floor (15cm), wall (5cm), items.', points: 3 },
  { id: 64, section: SectionType.OTHER, category: 'Storage Area', title: 'Storage Racks', description: 'Clean; personal items separate.', points: 3 },
  { id: 65, section: SectionType.OTHER, category: 'Storage Area', title: 'Weight-Based Stacking', description: 'Light-to-heavy from top to bottom.', points: 3 },
  { id: 66, section: SectionType.OTHER, category: 'Storage Area', title: 'Fresh Fruit Quality', description: 'No browning, mold, or frost damage.', points: 3 },
  { id: 67, section: SectionType.OTHER, category: 'Storage Area', title: 'Chemical Control', description: 'Segregated; no prohibited insecticides/coils.', points: 3 },

  // 68-72 Integrated Security
  { id: 68, section: SectionType.OTHER, category: 'Operations', title: 'CCTV Review', description: 'Reviews performed for key periods.', points: 3 },
  { id: 69, section: SectionType.OTHER, category: 'Operations', title: 'CCTV Operation', description: '24/7 operation; coverage of critical areas.', points: 5 },
  { id: 70, section: SectionType.OTHER, category: 'Operations', title: 'Facility Condition', description: 'Maintained well; damages reported promptly.', points: 3 },
  { id: 71, section: SectionType.OTHER, category: 'Operations', title: 'Cashier Drawer & Tools', description: 'Clean, organized, and labeled.', points: 5 },
  { id: 72, section: SectionType.OTHER, category: 'Operations', title: 'Notice Compliance', description: 'Directives implemented correctly.', points: 3 },

  // 73-78 Staff Grooming
  { id: 73, section: SectionType.OTHER, category: 'Staff Hygiene', title: 'Uniform Standards', description: 'Company uniforms only; hair covered.', points: 8 },
  { id: 74, section: SectionType.OTHER, category: 'Staff Hygiene', title: 'Uniform Cleanliness', description: 'Clean and free from stains.', points: 5 },
  { id: 75, section: SectionType.OTHER, category: 'Staff Hygiene', title: 'Personal Hygiene', description: 'Good hygiene; no body odor.', points: 3 },
  { id: 76, section: SectionType.OTHER, category: 'Staff Hygiene', title: 'Access Control', description: 'Only attired staff in work areas.', points: 5 },
  { id: 77, section: SectionType.OTHER, category: 'Staff Hygiene', title: 'Grooming Rules', description: 'No jewelry, long nails, polish, or perfume.', points: 5 },
  { id: 78, section: SectionType.OTHER, category: 'Staff Hygiene', title: 'Service Attitude', description: 'Positive, proactive service attitude.', points: 3 },
];
