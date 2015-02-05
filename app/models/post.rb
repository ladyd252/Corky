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

  belongs_to :event
  has_one :user, through: :event, source: :user
end
