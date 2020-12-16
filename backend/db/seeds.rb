user = User.create!({
  email: "fake@email.com",
  password: "password",
  password_confirmation: "password",
  first_name: "Dennis",
  last_name: "Yin"
})

categories = Category.create!([
  {
    title: "Career",
    user_id: user.id
  },
  {
    title: "Education",
    user_id: user.id
  },
  {
    title: "Fitness",
    user_id: user.id
  },
])

goals = Goal.create!([
  {
    description: "Get that promotion",
    category_id: 1,
    complete: false,
    user_id: 1
  },
  {
    description: "Get that degree",
    category_id: 2,
    complete: true,
    user_id: 1
  },
  {
    description: "Do 1000 pushups",
    category_id: 3,
    complete: false,
    user_id: 1
  },
  {
    description: "Do 1000 squats",
    category_id: 3,
    complete: false,
    user_id: 1
  },
  {
    description: "Deadlift 1000 pounds",
    category_id: 3,
    complete: false,
    user_id: 1
  },
])
