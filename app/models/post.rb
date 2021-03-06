# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  body        :string
#  picture_url :string
#  event_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_posts_on_event_id  (event_id)
#

class Post < ActiveRecord::Base
  validates :event_id, presence: true

  belongs_to :event, dependent: :destroy
  has_one :user, through: :event, source: :user

  def picture_url_twilio=(twilio_url)
    url = "https://www.filepicker.io/api/store/S3?key=#{ENV['FILEPICKER_API_KEY']}"
    options = {body: {"url"=> twilio_url}}
    response = HTTParty.post(url.to_s, options)
    self.picture_url = response["url"]
  end

end
