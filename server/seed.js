const { Workout, Exercise, db } = require('./database')

const yesterday = new Date(Date.now() - 24 * 60 * (60 * 1000))
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * (60 * 1000))

const seedWorkouts = [
  {
    name: "Work the Core",
    date: yesterday,
    exercises: [
      {
        name: 'Bicycling',
        completed: true,
        description: 'Bike 10km along the lakefront',
        duration: 30
      },
      {
        name: 'Weightlifting',
        completed: false,
        description: 'Free weights',
        duration: 200
      },
      {
        name: 'Swimming',
        completed: true,
        description: 'Swim to the edge of the earth',
        duration: 117
      },
    ]
  },
  {
    name: "Leg Day",
    date: nextWeek,
    exercises: [
      {
        name: 'Swimming',
        completed: true,
        description: 'Swim across the canal 37 times',
        duration: 4
      },
      {
        name: 'Dancing',
        completed: false,
        description: 'Swing for me',
        duration: 19
      },
    ]
  },
]

// Remember that we aren't able to use await outside of an async function.
async function seed() {
  try {
    console.log('Seeding the database...')
    await db.sync({ force: true })

    await Workout.create(seedWorkouts[0], {
      include: [ Exercise ]
    })

    await Workout.create(seedWorkouts[1], {
      include: [ Exercise ]
    })

    await db.close()
    console.log('Database was successfully seeded!')
  } catch (err) {
    console.error(err)
  }
}
seed()
