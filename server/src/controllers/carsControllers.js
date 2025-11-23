let cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    pricePerDay: 40,
    imageURL: "https://i.blogs.es/e5d8bc/toyota-corolla-2020_/1366_2000.jpg",
  },
  {
    id: 2,
    make: "Ford",
    model: "Mustang",
    year: 2021,
    pricePerDay: 60,
    imageURL:
      "https://media.ed.edmunds-media.com/ford/mustang/2021/ns/2021_ford_mustang_f34_ns_506211_1600.jpg",
  },
  {
    id: 3,
    make: "Chevrolet",
    model: "Camaro",
    year: 2019,
    pricePerDay: 50,
    imageURL:
      "https://di-uploads-pod1.dealerinspire.com/mikeandersonchevychicagoredesign/uploads/2019/04/2019-Camaro-1LT.png",
  },
];

const getAllCars = (req, res) => {
  res.json({ cars });
};

export { getAllCars };
