// type: "car" | "motorcycle"
// images: array of photo paths — first one is the card thumbnail, all are shown
//   in the click-to-open gallery (with prev/next and zoom).
// available: true once it's actually in stock (shows the price); leave false/omitted
//   for "Coming Soon" stock (no price shown).
// price: a number (formatted as £) or a string like "Price on Request".
// specs: optional pills shown above the description, { mileage, gearbox, fuel }.
// description: shown in the gallery view once written; leave "" until ready.
const VEHICLES = [
  {
    id: "c1",
    type: "car",
    name: "1969 Ferrari 365 GT 2+2",
    available: true,
    price: "Price on Request",
    specs: { mileage: "70,128 miles", gearbox: "Manual", fuel: "Petrol" },
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
    id: "c2",
    type: "car",
    name: "BMW 635 CSi - Race Spec",
    available: true,
    price: "Price on Request",
    images: [
      "images/cars/bmw-635-csi/bmw-635-csi-01.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-03.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-07.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-05.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-06.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-08.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-09.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-10.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-11.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-12.jpg",
      "images/cars/bmw-635-csi/bmw-635-csi-13.jpg"
    ]
  },
  {
    id: "c3",
    type: "car",
    name: "1969 Jaguar E-Type Series 2 Coupe",
    available: true,
    price: "Price on Request",
    specs: { mileage: "59,296 miles", gearbox: "Manual", fuel: "Petrol" },
    description: "This 1969 Jaguar E-Type Series 2 FHC presents an accessible opportunity to own one of the most beautiful cars ever produced.\n\nFinished in its original, yet imperfect, factory Burgundy paintwork, this E-Type has retained much of its authenticity and classic charm.\n\nThe car was resprayed in 2015 and fitted with new chrome spoke wheels and tyres. Its original interior is in relatively good condition, but the car has stood idle for some time. As a result, the paintwork requires some attention and the car will benefit from a thorough service which may include an alternator replacement and brake service.\n\nThe iconic 4.2-litre straight-six engine runs beautifully and with the necessary attention, this E-Type still has many more miles of joy to give its future owner.\n\nThis E-Type is looking for love and care and is priced accordingly.",
    images: [
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-01.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-02.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-03.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-04.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-05.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-06.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-07.jpg",
      "images/cars/jaguar-e-type-series-2/jaguar-e-type-series-2-08.jpg"
    ]
  },
  {
    id: "c4",
    type: "car",
    name: "1966 Sunbeam Tiger Convertible",
    available: true,
    price: "Price on Request",
    specs: { mileage: "6,214 miles", gearbox: "Manual", fuel: "Petrol" },
    description: "This 1965 Sunbeam Alpine 260 is one of just 72 Tigers assembled at National Motor Assemblies in Alberton. These were the only Tigers assembled outside the UK and they are sought-after by collectors. They were imported as Semi-Knocked-Down (SKD) units in 6 batches of 12 cars each and were given the unique 948 chassis identification sequence.\n\nThe Tiger is authentic in every detail, including verification of the Body and Chassis modifications by Jensen Motors to accommodate the Ford V8 Engine and Drivetrain. The car has its original seats and instruments. The braking, cooling and fueling systems have all been restored, a high capacity alternator has been fitted and the car wears a new set of tyres. The paintwork is good, but showing its age.\n\nThe Tiger conversion to accommodate the Ford 260 V8 was designed by Carroll Shelby, which adds to the heritage of this unique and special collector car. This is a \"pocket rocket\" that starts and drives well and is priced for further improvement.\n\nCaution: The Sunbeam Tiger is a classic car and does not have the passenger and system safety characteristics of modern vehicles. It is reliable, can be driven regularly and will always attract attention at Shows and Car Meets.",
    images: [
      "images/cars/sunbeam-tiger/sunbeam-tiger-01.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-02.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-03.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-04.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-05.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-06.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-07.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-08.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-09.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-10.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-11.jpg",
      "images/cars/sunbeam-tiger/sunbeam-tiger-12.jpg"
    ]
  },
  {
    id: "c6",
    type: "car",
    name: "1960 Austin Healey 3000 BT7 Mark 1",
    available: true,
    price: "Price on Request",
    specs: { mileage: "46,603 miles", gearbox: "Manual", fuel: "Petrol" },
    description: "The Austin Healey range of stylish sports cars were produced in five series' between 1953 and 1967. The earliest 2-seater roadsters were powered by a 2.6-litre 4-cylinder engine that was progressively upgraded to 3.0 litres in straight six format, finally in 2+2 convertible style with improved suspension.\n\nThe vehicle has its original Hood and Tonneau with Seats in Navy Blue. As a CKD it has no factory colour, but navy blue was only installed in cars painted in Healey Blue. It was stripped to bare metal in 2013 and resprayed in Healey Blue over Old English White. All its original components were preserved and the engine was rebuilt. It must be noted that Blackheath did not always follow the Build Sheet detail and this vehicle did not receive its factory allocated engine when assembled.\n\nOver the past 10 years, the braking, cooling and fueling systems were restored, as were the starter motor, dynamo and regulator. An original factory Hardtop has been fitted as well as replica Mini Lite Wheels with new tyres. The Healey participated in the 2022 National Tour in the Southern Cape. It was on loan to a senior club member whose own BT7 Healey had broken down. He credited the car as one of the best Healey's he had ever driven.\n\nCaution: This Austin Healey BT7 is a 65 year old classic car that does not have the passenger and system safety characteristics of modern vehicles. It is solid and loves to be driven regularly, especially on out-runs, to car shows and Cars@Coffee meets.",
    images: [
      "images/cars/austin-healey-3000/austin-healey-3000-01.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-02.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-03.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-04.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-05.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-06.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-07.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-08.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-09.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-10.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-11.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-12.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-13.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-14.jpg",
      "images/cars/austin-healey-3000/austin-healey-3000-15.jpg"
    ]
  },
  {
    id: "c5",
    type: "car",
    name: "1959 Riley One-Point-Five - Series 1",
    available: true,
    price: "Price on Request",
    specs: { mileage: "31,069 miles", gearbox: "Manual", fuel: "Petrol" },
    description: "This 1959 Riley One-Point-Five is ideal as a classic \"Town Car\" and will always draw attention. The Riley starts and runs very well. Over the past 10 years, the braking, cooling and fueling systems have all been restored, as have the starter motor, dynamo and regulator. Some minimal rust on the body was sorted and the vehicle repainted. The car wears a new set of tyres.\n\nCaution: The Riley is a classic car and does not have the passenger and system safety characteristics of modern vehicles. But it's solid and can be driven regularly. It is more than just a weekend driver.",
    images: [
      "images/cars/riley-1-5/riley-1-5-01.jpg",
      "images/cars/riley-1-5/riley-1-5-02.jpg",
      "images/cars/riley-1-5/riley-1-5-03.jpg",
      "images/cars/riley-1-5/riley-1-5-04.jpg",
      "images/cars/riley-1-5/riley-1-5-05.jpg",
      "images/cars/riley-1-5/riley-1-5-06.jpg",
      "images/cars/riley-1-5/riley-1-5-07.jpg",
      "images/cars/riley-1-5/riley-1-5-08.jpg",
      "images/cars/riley-1-5/riley-1-5-09.jpg"
    ]
  },
  {
    id: "m7",
    type: "motorcycle",
    name: "1989 Suzuki GSXR1100 Slingshot",
    available: true,
    price: "Price on Request",
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
    price: "Price on Request",
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
