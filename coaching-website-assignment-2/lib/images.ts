export const images = {
  // Hero/Banner Images
  hero: {
    lolCharacters: "/images/lol-hero.jpg", // Main hero image with LoL characters
    coachingSession: "/images/coaching.jpg", // Coach working with student
  },

  // Coach Profile Images
  coaches: {
    alex: "/images/coaches/ryu.jpg", // Alex 'Faker Jr' Chen
    sarah: "/images/coaches/kesha.jpg", // Sarah 'ADCQueen' Johnson
    marcus: "/images/coaches/baus.jpg", // Marcus 'JungleKing' Rodriguez
    emily: "/images/coaches/faker.jpg", // Emily 'SupportGod' Kim
    david: "/images/coaches/nemesis.jpeg", // David 'TopDiff' Williams
    lisa: "/images/coaches/ninja.jpg", // Lisa 'MidGap' Zhang
  },

  // Testimonial Images
  testimonials: {
    john: "/images/testimonials/tyler1.jpg", // John Doe testimonial
    jane: "/images/testimonials/moe.jpeg", // Jane Smith testimonial
    mike: "/images/testimonials/dantes.jpg", // Mike Johnson testimonial
  },

  // Logo and Branding
  branding: {
    logo: "/placeholder.svg?height=48&width=48", // Main LOLCoachUp logo
    logoSmall: "/placeholder.svg?height=32&width=32", // Small version for footer
  },

  // Role Icons (for coach specialties)
  roles: {
    top: "/placeholder.svg?height=24&width=24",
    jungle: "/placeholder.svg?height=24&width=24",
    mid: "/placeholder.svg?height=24&width=24",
    adc: "/placeholder.svg?height=24&width=24",
    support: "/placeholder.svg?height=24&width=24",
  },

  // Rank Icons
  ranks: {
    iron: "/placeholder.svg?height=32&width=32",
    bronze: "/placeholder.svg?height=32&width=32",
    silver: "/placeholder.svg?height=32&width=32",
    gold: "/placeholder.svg?height=32&width=32",
    platinum: "/placeholder.svg?height=32&width=32",
    diamond: "/placeholder.svg?height=32&width=32",
    master: "/placeholder.svg?height=32&width=32",
    grandmaster: "/placeholder.svg?height=32&width=32",
    challenger: "/placeholder.svg?height=32&width=32",
  },
} as const

// Coach data with centralized image references
export const coachesData = [
  {
    id: 1,
    name: "Alex 'Faker Jr' Chen",
    team: "Team Liquid Academy",
    role: "Mid Lane",
    rank: "Challenger 1,200 LP",
    image: images.coaches.alex,
    specialties: ["Assassins", "Control Mages", "Roaming"],
    price: "$50/hour",
  },
  {
    id: 2,
    name: "WE 'ROLLL' ING",
    team: "Cloud9 White",
    role: "ADC",
    rank: "Grandmaster 800 LP",
    image: images.coaches.sarah,
    specialties: ["Positioning", "Team Fighting", "Laning"],
    price: "$45/hour",
  },
  {
    id: 3,
    name: "Marcus 'JungleKing' Rodriguez",
    team: "TSM Academy",
    role: "Jungle",
    rank: "Challenger 900 LP",
    image: images.coaches.marcus,
    specialties: ["Pathing", "Ganking", "Objective Control"],
    price: "$55/hour",
  },
  {
    id: 4,
    name: "John 'knee' Sinz",
    team: "100 Thieves Next",
    role: "Support",
    rank: "Grandmaster 750 LP",
    image: images.coaches.emily,
    specialties: ["Vision Control", "Engage Timing", "Peel"],
    price: "$40/hour",
  },
  {
    id: 5,
    name: "David 'TopDiff' Williams",
    team: "FlyQuest Red",
    role: "Top Lane",
    rank: "Challenger 1,100 LP",
    image: images.coaches.david,
    specialties: ["Split Pushing", "Tank Play", "TP Usage"],
    price: "$48/hour",
  },
  {
    id: 6,
    name: "Fort 'MidGap' Nite",
    team: "Evil Geniuses Academy",
    role: "Mid Lane",
    rank: "Grandmaster 850 LP",
    image: images.coaches.lisa,
    specialties: ["Wave Management", "Roaming", "Scaling"],
    price: "$42/hour",
  },
]

// Testimonials data with centralized image references
export const testimonialsData = [
  {
    name: "John Doe",
    location: "South Africa",
    image: images.testimonials.john,
    testimonial:
      "LOLCoachUp helped me climb from Silver to Platinum in just 3 weeks! The coaching was incredible and really opened my eyes to advanced strategies.",
  },
  {
    name: "Jane Smith",
    location: "USA",
    image: images.testimonials.jane,
    testimonial:
      "Amazing coaching service! My ADC mechanics improved dramatically and I finally understand proper positioning in team fights.",
  },
  {
    name: "Mike Johnson",
    location: "Nigeria",
    image: images.testimonials.mike,
    testimonial:
      "Best investment I've made for my League gameplay. Went from Gold to Diamond with their help. Highly recommend!",
  },
]
