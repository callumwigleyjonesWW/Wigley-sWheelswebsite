// type: "car" | "motorcycle"
// images: array of photo paths — first one is the card thumbnail, all are shown
//   in the click-to-open gallery (with prev/next and zoom).
// available: true once it's actually in stock (shows the price); leave false/omitted
//   for "Coming Soon" stock (no price shown).
// price: a number (formatted as £) or a string like "POA".
// description: shown in the gallery view once written; leave "" until ready.
const VEHICLES = [
  {
    id: "c1",
    type: "car",
    name: "1969 Ferrari 365 GT 2+2",
    available: true,
    price: "POA",
    description: "Launched at the 1966 Geneva Motor Show, the 365 GT 2+2 was Ferrari's top-selling model of its era, with 801 built over four years — only 52 in right-hand-drive. As a luxury Grand Tourer it offered leather upholstery, electric windows, optional air conditioning, and was the first Ferrari fitted with power steering, alongside self-levelling independent rear suspension.\n\nThis particular right-hand-drive example left Maranello in 1969 and was delivered new to South Africa via the United Kingdom, first registered in 1970. Well-known enthusiast Stuart Bromfield and his friend Bill Brennan acquired the car in 1976, though it saw little use. Belgian national Robert Kriek purchased it in 1986 and, in the late 1990s, commissioned a full body-off restoration through Ferrari importer TAK Motors, with the car returned to him in 1999. It was then held as a long-term investment asset in storage.\n\nFollowing an 18-month commission by Carlo Viglietti at Pablo Clark Racing, this 365 GT 2+2 now presents close to 100-point perfection.",
    fit: "contain",
    images: [
      "images/cars/ferrari-365-gt/ferrari-365-gt-02.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-01.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-03.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-04.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-05.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-06.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-07.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-08.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-09.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-10.jpg",
      "images/cars/ferrari-365-gt/ferrari-365-gt-11.jpg"
    ]
  },
  {
    id: "m7",
    type: "motorcycle",
    name: "1989 Suzuki GSXR1100 Slingshot",
    available: true,
    price: "POA",
    description: "In excellent condition, having covered 30,000 miles.",
    images: [
      "images/bikes/suzuki-gsxr1100-slingshot/suzuki-gsxr1100-01.webp",
      "images/bikes/suzuki-gsxr1100-slingshot/suzuki-gsxr1100-02.webp",
      "images/bikes/suzuki-gsxr1100-slingshot/suzuki-gsxr1100-03.webp",
      "images/bikes/suzuki-gsxr1100-slingshot/suzuki-gsxr1100-04.jpg",
      "images/bikes/suzuki-gsxr1100-slingshot/suzuki-gsxr1100-05.jpg",
      "images/bikes/suzuki-gsxr1100-slingshot/suzuki-gsxr1100-06.jpg"
    ]
  },
  {
    id: "m8",
    type: "motorcycle",
    name: "1977 Yamaha XT500",
    available: true,
    price: "POA",
    description: "Papers in order",
    images: [
      "images/bikes/yamaha-xt500/yamaha-xt500-01.webp",
      "images/bikes/yamaha-xt500/yamaha-xt500-02.webp",
      "images/bikes/yamaha-xt500/yamaha-xt500-03.webp",
      "images/bikes/yamaha-xt500/yamaha-xt500-04.webp",
      "images/bikes/yamaha-xt500/yamaha-xt500-05.webp",
      "images/bikes/yamaha-xt500/yamaha-xt500-06.webp"
    ]
  },
  {
    id: "m9",
    type: "motorcycle",
    name: "1980 Honda XR80",
    fit: "cover",
    images: ["images/bikes/honda-xr80.webp"]
  },
  {
    id: "m1",
    type: "motorcycle",
    name: "1976 Honda CB750 K2",
    fit: "cover",
    images: ["images/bikes/honda-cb750-k2.webp"]
  },
  {
    id: "m2",
    type: "motorcycle",
    name: "1982 Suzuki GSX-1100 Katana",
    images: ["images/bikes/suzuki-gsx1100-katana.jpeg"]
  },
  {
    id: "m3",
    type: "motorcycle",
    name: "1980 Kawasaki Z1000 Z1-R",
    images: ["images/bikes/kawasaki-z1000-z1r.jpg"]
  },
  {
    id: "m4",
    type: "motorcycle",
    name: "1980 Yamaha RD350LC",
    images: ["images/bikes/yamaha-rd350lc.jpg"]
  },
  {
    id: "m5",
    type: "motorcycle",
    name: "1977 Honda CB400F",
    images: ["images/bikes/honda-cb400f.jpg"]
  },
  {
    id: "m6",
    type: "motorcycle",
    name: "1988 Suzuki GSX-R750",
    images: ["images/bikes/suzuki-gsxr750.jpg"]
  }
];
