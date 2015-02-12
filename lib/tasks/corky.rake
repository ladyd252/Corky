namespace :corky do
  desc "TODO"
  task update_images: :environment do
    Post.all.each do |post|
      if post.picture_url && post.picture_url.include?("twilio")
        post.picture_url_twilio = post.picture_url
        post.save
      end
    end
  end

end
