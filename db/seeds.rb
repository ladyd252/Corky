# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!([{email: "me@me.com", password: "password"}, {email: "you@you.com", password: "password"}])

e1 = users[1].events.create(title: "Birthday Party")

e2 = users[0].events.create(title: "Wedding")

p1 = e1.posts.create(body: "Happy Birthday!", picture_url: "https://s-media-cache-ak0.pinimg.com/236x/86/bd/0a/86bd0afa2d404c52465e8edb14c6daab.jpg")

p2 = e2.posts.create(body: "Congrats to both of you!", picture_url: "https://img0.etsystatic.com/006/0/6118686/il_340x270.365377162_e03v.jpg")
