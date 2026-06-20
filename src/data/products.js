import resinCoasters from "../assets/resin.png";
import toteCharm from "../assets/totebag.png";
import trinketTray from "../assets/tray.png";

export const categories = [
  "crochet",
  "clay art",
  "resin art",
  "pot painting",
  "candles",
  "handmade jewelry",
  "handbags",
  "embroidery",
  "knitted wear",
  "home decor",
  "handmade paintings",
  "handmade gifts",
  "rakhi",
  "scrapbooks",
  "handmade cards",
  "macrame",
  "terracotta",
  "customized gifts",
  "fabric art",
  "handmade toys",
  "handmade stationery",
  "wooden crafts",
  "floral crafts",
  "handwoven products",
  "fashion",
  "men's wear",
  "women's wear",
  "kids wear",
  "ethnic wear",
  "sarees",
  "kurtis",
  "lehengas",
  "footwear",
  "bags",
  "watches",
  "jewellery",
  "home",
  "furniture",
  "lighting",
  "kitchen",
  "electronics",
  "mobile accessories",
  "smart gadgets",
  "beauty",
  "beauty products",
  "personal care",
  "handmade",
  "handicrafts",
  "paintings",
  "pottery",
  "food",
  "homemade snacks",
  "organic products"
];

export const slugifySeller = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const policy = {
  returnAvailable: true,
  exchangeAvailable: true,
  returnDays: 7,
  exchangeDays: 10,
  refundRules: "Return allowed for damaged, defective, or wrong-size products only. Customer-damaged handmade pieces are not eligible."
};

export const products = [
  {
    id: 1,
    title: "Pastel Crochet Shoulder Bag",
    category: "crochet",
    price: 999,
    discount: 12,
    trend: true,
    eventTags: ["Raksha Bandhan", "Friendship Day"],
    description: "Soft handmade crochet bag in pastel cotton yarn with sturdy handles and a roomy everyday shape.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=900&q=80"
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    colors: ["Blue", "Pink", "Mint"],
    sizes: ["Mini", "Regular"],
    handmadeDetails: "Hand-crocheted with cotton yarn, lined by hand, and finished in small batches.",
    estimatedDelivery: "4-7 days",
    policy,
    shipping: { base: 69, regions: ["All India"], pincodePricing: { "411": 49, "400": 59, "110": 79 } },
    seller: {
      name: "Thread & Bloom Studio",
      location: "Pune, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Started from a college desk and now ships crochet flowers across India.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.9,
    reviews: [
      { user: "Anaya", rating: 5, text: "The stitching is neat and it feels very premium.", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=300&q=80" },
      { user: "Meera", rating: 4.6, text: "Exactly the pastel look I wanted." }
    ]
  },
  {
    id: 2,
    title: "Terracotta Aroma Diffuser Set",
    category: "terracotta",
    price: 699,
    discount: 8,
    trend: true,
    eventTags: ["Diwali Sale", "Wedding Season"],
    description: "Leaf-cut terracotta aroma diffusers handmade by Indian potters for festive home styling.",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Natural Clay", "Whitewash"],
    sizes: ["Set of 2", "Set of 4"],
    handmadeDetails: "Wheel-finished terracotta, hand-carved leaf vents, sun-dried and kiln-fired.",
    estimatedDelivery: "5-8 days",
    policy,
    shipping: { base: 89, regions: ["West", "North", "South"], pincodePricing: { "411": 59, "302": 49, "560": 89 } },
    seller: {
      name: "Mitti Mahal",
      location: "Jaipur, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "A family pottery studio creating terracotta decor inspired by Indian courtyards.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.8,
    reviews: [{ user: "Riya", rating: 5, text: "Perfect for my Diwali decor and packed safely." }]
  },
  {
    id: 3,
    title: "Pastel Clay Trinket Tray",
    category: "clay art",
    price: 599,
    discount: 10,
    trend: true,
    eventTags: ["Mother's Day", "Handmade Gifts"],
    description: "Hand-shaped air-dry clay tray with a glossy finish for rings, earrings, and tiny keepsakes.",
    images: [
      trinketTray,
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Blush", "Lilac", "Ivory"],
    sizes: ["Round", "Oval"],
    handmadeDetails: "Hand-shaped, painted, sealed, and cured for everyday tabletop use.",
    estimatedDelivery: "3-6 days",
    policy,
    shipping: { base: 59, regions: ["All India"], pincodePricing: { "400": 39, "411": 49 } },
    seller: {
      name: "Clay Cloud Co.",
      location: "Mumbai, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "Creates playful clay accessories, keepsakes, and desk decor in soft pastel palettes.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.7,
    reviews: [{ user: "Riya", rating: 5, text: "The colors are even prettier in person." }]
  },
  {
    id: 4,
    title: "Mint Hand-Painted Terracotta Pot",
    category: "pot painting",
    price: 749,
    discount: 15,
    trend: false,
    eventTags: ["Wedding Season", "New Year"],
    description: "Terracotta planter painted with mint florals and sealed for long-lasting indoor charm.",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Mint", "Marigold", "Indigo"],
    sizes: ["Small", "Medium", "Large"],
    handmadeDetails: "Painted by hand on terracotta with floral folk-inspired detailing.",
    estimatedDelivery: "5-9 days",
    policy,
    shipping: { base: 99, regions: ["All India"], pincodePricing: { "302": 59, "110": 89 } },
    seller: {
      name: "Pottery Palette",
      location: "Jaipur, India",
      verified: false,
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
      story: "Paints terracotta planters and home accents inspired by Indian floral motifs.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.6,
    reviews: [{ user: "Tara", rating: 4, text: "Great finish and quick shipping." }]
  },
  {
    id: 5,
    title: "Lavender Soy Wax Candle",
    category: "candles",
    price: 899,
    discount: 10,
    trend: true,
    eventTags: ["Diwali Sale", "Christmas", "New Year"],
    description: "Slow-poured soy candle with lavender notes, dried flowers, and a reusable glass jar.",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602526432604-029a709e131c?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Lavender", "Rose", "Sandalwood"],
    sizes: ["120g", "200g"],
    handmadeDetails: "Small-batch soy wax candle poured by hand with dried florals.",
    estimatedDelivery: "3-5 days",
    policy,
    shipping: { base: 59, regions: ["All India"], pincodePricing: { "560": 39, "400": 49 } },
    seller: {
      name: "Glow Nest Candles",
      location: "Bengaluru, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "Turns calming scents and reusable jars into small-batch candle collections.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.8,
    reviews: [{ user: "Nisha", rating: 5, text: "Soft scent and beautiful jar." }]
  },
  {
    id: 6,
    title: "Pressed Flower Resin Coasters",
    category: "resin art",
    price: 799,
    discount: 5,
    trend: false,
    eventTags: ["Housewarming", "Wedding Season"],
    description: "Clear resin coaster set with pressed flowers and gold flakes for premium handmade gifting.",
    images: [
      resinCoasters,
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Clear Gold", "Pink Bloom", "Blue Bloom"],
    sizes: ["Set of 2", "Set of 4"],
    handmadeDetails: "Layered resin artwork with dried botanicals, hand-sanded edges, and glossy finish.",
    estimatedDelivery: "6-10 days",
    policy,
    shipping: { base: 79, regions: ["All India"], pincodePricing: { "440": 49, "400": 59 } },
    seller: {
      name: "Tiny Spark Studio",
      location: "Nagpur, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.5,
      story: "Designs personalized resin gifts, charms, and everyday accessories.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.5,
    reviews: [{ user: "Kavya", rating: 5, text: "Adorable gift for my sister." }]
  },
  {
    id: 7,
    title: "Pearl Bead Choker Necklace",
    category: "handmade jewelry",
    price: 999,
    discount: 18,
    trend: true,
    eventTags: ["Mother's Day", "Wedding Season"],
    description: "Hand-strung pearl and pastel bead choker with an adjustable gold-plated clasp.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Pearl", "Rose Gold", "Gold"],
    sizes: ["14 inch", "16 inch", "Adjustable"],
    handmadeDetails: "Hand-strung freshwater-inspired pearls and pastel beads with adjustable clasp.",
    estimatedDelivery: "3-6 days",
    policy,
    shipping: { base: 49, regions: ["All India"], pincodePricing: { "110": 39, "400": 39 } },
    seller: {
      name: "Luna Beads",
      location: "Delhi, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Creates delicate handmade jewelry for everyday outfits and special moments.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.9,
    reviews: [{ user: "Sara", rating: 5, text: "Premium quality and so elegant." }]
  },
  {
    id: 8,
    title: "Crochet Daisy Tote Charm",
    category: "crochet",
    price: 449,
    discount: 7,
    trend: false,
    eventTags: ["Friendship Day", "Handmade Gifts"],
    description: "A soft crochet daisy charm for totes, backpacks, and keys.",
    images: [
      toteCharm,
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Daisy", "Sunflower", "Rose"],
    sizes: ["Single", "Pair"],
    handmadeDetails: "Hand-crocheted charm with keyring hardware and soft yarn petals.",
    estimatedDelivery: "3-5 days",
    policy,
    shipping: { base: 39, regions: ["All India"], pincodePricing: { "411": 29 } },
    seller: {
      name: "Thread & Bloom Studio",
      location: "Pune, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Started from a college desk and now ships crochet flowers across India.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.4,
    reviews: [{ user: "Isha", rating: 4, text: "Very cute and lightweight." }]
  },
  {
    id: 9,
    title: "Blush Floral Hoop Earrings",
    category: "handmade jewelry",
    price: 699,
    discount: 11,
    trend: true,
    eventTags: ["Mother's Day", "Wedding Season"],
    description: "Lightweight floral hoop earrings made with polymer clay petals and hypoallergenic hooks.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Blush", "Ivory", "Lilac"],
    sizes: ["Small", "Medium"],
    handmadeDetails: "Polymer clay petals shaped and assembled by hand with hypoallergenic hooks.",
    estimatedDelivery: "4-7 days",
    policy,
    shipping: { base: 49, regions: ["All India"], pincodePricing: { "400": 29, "110": 39 } },
    seller: {
      name: "Clay Cloud Co.",
      location: "Mumbai, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "Creates playful clay accessories, keepsakes, and desk decor in soft pastel palettes.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.7,
    reviews: [{ user: "Diya", rating: 5, text: "Comfortable and exactly my style." }]
  },
  {
    id: 10,
    title: "Macrame Wall Hanging Decor",
    category: "macrame",
    price: 1199,
    discount: 14,
    trend: true,
    eventTags: ["New Year", "Wedding Season"],
    description: "Boho macrame wall decor knotted with cotton cord and natural wooden dowel.",
    images: [
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Ivory", "Beige", "Rust"],
    sizes: ["18 inch", "24 inch"],
    handmadeDetails: "Hand-knotted cotton cord with symmetrical macrame patterns.",
    estimatedDelivery: "5-8 days",
    policy,
    shipping: { base: 99, regions: ["All India"], pincodePricing: { "560": 79, "411": 69 } },
    seller: {
      name: "Knot Kala Studio",
      location: "Bengaluru, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Modern macrame decor made by women-led craft circles.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.8,
    reviews: [{ user: "Leena", rating: 4.8, text: "Beautiful texture and very neatly knotted." }]
  },
  {
    id: 11,
    title: "Hand-Embroidered Cushion Cover",
    category: "embroidery",
    price: 899,
    discount: 9,
    trend: false,
    eventTags: ["Diwali Sale", "New Year"],
    description: "Cotton cushion cover with hand embroidery inspired by Indian garden motifs.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Ivory", "Peach", "Sage"],
    sizes: ["16 x 16", "18 x 18"],
    handmadeDetails: "Hand embroidery on cotton fabric with concealed zip closure.",
    estimatedDelivery: "5-7 days",
    policy,
    shipping: { base: 69, regions: ["All India"], pincodePricing: { "110": 49, "302": 49 } },
    seller: {
      name: "Sui Dhaaga Collective",
      location: "Lucknow, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      story: "A collective preserving slow embroidery and soft home textiles.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.6,
    reviews: [{ user: "Pooja", rating: 4.4, text: "Looks handcrafted and premium." }]
  },
  {
    id: 12,
    title: "Handmade Wooden Toy Train",
    category: "handmade toys",
    price: 1299,
    discount: 16,
    trend: false,
    eventTags: ["Christmas", "New Year"],
    description: "Child-safe wooden toy train polished by hand with non-toxic colors.",
    images: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Natural", "Pastel"],
    sizes: ["3 coach", "5 coach"],
    handmadeDetails: "Hand-cut wooden pieces, sanded edges, and non-toxic finish.",
    estimatedDelivery: "6-9 days",
    policy,
    shipping: { base: 99, regions: ["All India"], pincodePricing: { "560": 89, "400": 79 } },
    seller: {
      name: "Woodland Khel",
      location: "Mysuru, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
      story: "Safe handmade toys crafted from responsibly sourced wood.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.5,
    reviews: [{ user: "Harini", rating: 4.7, text: "My nephew loved it, and the finish is smooth." }]
  }
];

const dummyProductTitles = [
  ["Handwoven Saree", "sarees", 2499, 18],
  ["Cotton Kurti", "kurtis", 899, 5],
  ["Brass Diya", "handicrafts", 399, 42],
  ["Wooden Temple", "furniture", 5499, 3],
  ["Handmade Painting", "paintings", 1899, 7],
  ["Leather Bag", "bags", 2199, 11],
  ["Silver Jewellery Set", "jewellery", 1599, 24],
  ["Bamboo Basket", "handicrafts", 499, 31],
  ["Organic Honey", "organic products", 349, 16],
  ["Handmade Soap", "beauty products", 249, 55],
  ["Block Print Dupatta", "ethnic wear", 799, 14],
  ["Jaipuri Mojari", "footwear", 1299, 9],
  ["Kids Cotton Frock", "kids wear", 999, 12],
  ["Men's Linen Kurta", "men's wear", 1499, 8],
  ["Kundan Earrings", "jewellery", 699, 19],
  ["Terracotta Planter", "pottery", 649, 22],
  ["Handmade Rakhi Box", "handmade gifts", 599, 28],
  ["Macrame Lamp Shade", "lighting", 1799, 6],
  ["Banarasi Lehenga", "lehengas", 6999, 2],
  ["Copper Water Bottle", "kitchen", 999, 27],
  ["Phone Charm Set", "mobile accessories", 299, 44],
  ["Ayurvedic Hair Oil", "personal care", 449, 21],
  ["Smart LED Diya", "smart gadgets", 799, 13],
  ["Handcrafted Wall Clock", "watches", 1299, 0],
  ["Phulkari Cushion", "home decor", 749, 17],
  ["Millet Laddoo Box", "homemade snacks", 399, 25],
  ["Chikankari Top", "women's wear", 1199, 10],
  ["Wooden Serving Tray", "home", 1099, 4],
  ["Beaded Sling Bag", "handbags", 899, 15],
  ["Natural Lip Balm Set", "beauty", 299, 34],
  ["Madhubani Bookmark Set", "handmade", 199, 38],
  ["Jute Storage Basket", "home decor", 849, 6]
];

const dummyImages = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
];

products.push(
  ...dummyProductTitles.map(([title, category, price, stock], index) => ({
    id: 100 + index,
    title,
    category,
    price,
    stock,
    discount: index % 4 === 0 ? 15 : index % 3 === 0 ? 10 : 6,
    trend: index < 8,
    eventTags: ["Made in India", "Small Business"],
    description: `${title} from an Indian small business seller, made for everyday marketplace shopping and gifting.`,
    images: [dummyImages[index % dummyImages.length], dummyImages[(index + 2) % dummyImages.length], dummyImages[(index + 4) % dummyImages.length]],
    colors: ["Natural", "Festive", "Classic"],
    sizes: ["Regular"],
    handmadeDetails: "Curated handmade or small-batch product with seller-verified details.",
    estimatedDelivery: "3-7 days",
    policy,
    shipping: { base: 69, regions: ["All India"], pincodePricing: { "110": 59, "400": 49, "560": 69 } },
    seller: {
      name: ["Akriti Karigar Hub", "Desi Kala Store", "Utsav Handmade", "Bazaar Bloom"][index % 4],
      location: ["Jaipur, India", "Surat, India", "Lucknow, India", "Kochi, India"][index % 4],
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      rating: 4.4 + (index % 5) / 10,
      story: "A small Indian seller bringing craft, fashion, home, and food products online.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.3 + (index % 6) / 10,
    reviews: [{ user: "Akriti Buyer", rating: 4.6, text: "Good quality and neatly packed." }]
  }))
);

export const sellers = Array.from(
  products.reduce((map, product) => {
    if (!map.has(product.seller.name)) {
      map.set(product.seller.name, {
        ...product.seller,
        slug: slugifySeller(product.seller.name),
        cover: product.images[0],
        productsCount: 0
      });
    }
    map.get(product.seller.name).productsCount += 1;
    return map;
  }, new Map()).values()
);

export const testimonials = [
  { name: "Aarohi", role: "Customer", text: "Akriti makes discovering handmade gifts feel joyful and personal.", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
  { name: "Saanvi", role: "Seller", text: "The seller dashboard feels simple enough for a small business owner to manage daily.", rating: 5, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" },
  { name: "Priya", role: "Customer", text: "A premium shopping experience with useful product details and maker stories.", rating: 4.7, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" }
];

export const festiveEvents = [
  { name: "Diwali Sale", date: "2026-11-08", offer: "Up to 35% off handmade decor", categories: ["candles", "terracotta", "pot painting"] },
  { name: "Raksha Bandhan", date: "2026-08-28", offer: "Personalized gifts and rakhi specials", categories: ["crochet", "handmade gifts", "rakhi"] },
  { name: "Mother's Day", date: "2027-05-09", offer: "Jewelry, candles, and keepsakes", categories: ["handmade jewelry", "candles", "clay art"] },
  { name: "Friendship Day", date: "2026-08-02", offer: "Cute crochet and customized gifts", categories: ["crochet", "customized gifts"] },
  { name: "Wedding Season", date: "2026-12-01", offer: "Premium artisan favors and decor", categories: ["macrame", "resin art", "handmade jewelry"] },
  { name: "Christmas", date: "2026-12-25", offer: "Handmade toys and cozy gifting", categories: ["handmade toys", "candles"] },
  { name: "New Year", date: "2027-01-01", offer: "Fresh home decor drops", categories: ["home decor", "embroidery", "wooden crafts"] }
];

export const sellerStories = [
  {
    name: "Thread & Bloom Studio",
    slug: "thread-bloom-studio",
    story: "Started from a college desk and now ships crochet flowers across India.",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=700&q=80",
    rating: 4.9,
    verified: true
  },
  {
    name: "Glow Nest Candles",
    slug: "glow-nest-candles",
    story: "Turns calming scents and reusable jars into small-batch candle collections.",
    image: "https://images.unsplash.com/photo-1602526432604-029a709e131c?auto=format&fit=crop&w=700&q=80",
    rating: 4.8,
    verified: true
  },
  {
    name: "Luna Beads",
    slug: "luna-beads",
    story: "Creates delicate handmade jewelry for everyday outfits and special moments.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
    rating: 4.9,
    verified: true
  }
];
