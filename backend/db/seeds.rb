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
    image_url: "https://banner2.cleanpng.com/20180218/cxq/kisspng-briefcase-stock-xchng-leather-clip-art-open-suitcase-clipart-5a8a242cc70b44.2234702215190026688153.jpg",
  },
  {
    title: "Education",
    image_url: "https://banner2.cleanpng.com/20180203/tpe/kisspng-book-clip-art-textbooks-cliparts-5a762dd31d54f7.3012080915176944191202.jpg",
  },
  {
    title: "Fitness",
    image_url: "https://banner2.cleanpng.com/20180317/ihe/kisspng-dumbbell-barbell-weight-training-clip-art-dumbbell-cliparts-5aad8396251186.0065234615213208541518.jpg",
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
