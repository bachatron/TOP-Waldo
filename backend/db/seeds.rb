Character.destroy_all

Character.create!([
  {
    name: "Waldo",
    x_min: 0.40,
    x_max: 0.44,
    y_min: 0.30,
    y_max: 0.36
  },
  {
    name: "Wilma",
    x_min: 0.62,
    x_max: 0.66,
    y_min: 0.55,
    y_max: 0.61
  },
  {
    name: "Wizard",
    x_min: 0.21,
    x_max: 0.25,
    y_min: 0.70,
    y_max: 0.76
  }
])

puts "Seeded #{Character.count} characters"