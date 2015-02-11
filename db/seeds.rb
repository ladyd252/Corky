# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# user1 = User.find_or_create_by({email: "me@me.com", password: "password"})
# user2 = User.find_or_create_by({email: "you@you.com", password: "password"})

e1 = User.first.events.find_or_create_by(title: "Birthday Party")

e2 = User.second.events.find_or_create_by(title: "Wedding")

p1 = e1.posts.find_or_create_by(body: "Happy Birthday!", picture_url: "https://s-media-cache-ak0.pinimg.com/236x/86/bd/0a/86bd0afa2d404c52465e8edb14c6daab.jpg")

p2 = e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "http://printbindaas.com/TemplatePath/1611/1611Design.jpg")

p3 = e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "http://www.articlesweb.org/blog/wp-content/gallery/most-fabulous-wedding-card/most-fabulous-wedding-card-01.jpg")

p4 = e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "http://fashionhandsome.com/wp-content/uploads/2014/05/wedding-card-2014.jpg")

p5 = e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "http://assets.mochithings.com/products/happy_wedding_card/photos/11444/extra_large_happy_wedding_card.png")


e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "http://thumbs.dreamstime.com/z/vintage-design-wedding-card-27671771.jpg")

e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "http://thumbs.dreamstime.com/z/wedding-card-bride-groom-invitation-32772885.jpg")

e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "https://media.twiliocdn.com/ACff75e6d517c964d90ccfc1be4570a926/b9bed0944d8be559e849e2ef21ecdafb?Expires=1423598149&AWSAccessKeyId=0BEFPVCP30D65040M6G2&Signature=oKRnikjfGiexIXgbebyosCGcTWo%3D")

e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "https://api.twilio.com/2010-04-01/Accounts/ACff75e6d517c964d90ccfc1be4570a926/Messages/MM9cefc09f3d1a4a05164f5213a6be8a6a/Media/ME24a75a85ec22ee632aba61893f5119f3")

e2.posts.find_or_create_by(body: "Congrats to both of you!", picture_url: "https://media.twiliocdn.com/ACff75e6d517c964d90ccfc1be4570a926/b1c2e14823951a22fc85f442aa43db2f?Expires=1423604365&AWSAccessKeyId=0BEFPVCP30D65040M6G2&Signature=dokDFkh36vIUIwQ6bqsBf0ta9dM%3D")
