Character.destroy_all

Character.create!([
  {
    name: "Waldo",
    x_min: 0.60,
    x_max: 0.63,
    y_min: 0.35,
    y_max: 0.42
  },
  {
    name: "Wenda",
    x_min: 0.76,
    x_max: 0.78,
    y_min: 0.38,
    y_max: 0.44
  },
  {
    name: "Odlaw",
    x_min: 0.09,
    x_max: 0.12,
    y_min: 0.33,
    y_max: 0.40
  },

  {
    name: "Wizard",
    x_min: 0.25,
    x_max: 0.28,
    y_min: 0.33,
    y_max: 0.38
  }
])

puts "Seeded #{Character.count} characters"