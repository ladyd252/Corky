# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!([{email: "me@me.com", password: "password"}, {email: "you@you.com", password: "password"}])

users[1].events.create(title: "Birthday Party")

users[0].events.create(title: "Wedding")
