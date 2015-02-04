# == Schema Information
#
# Table name: events
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  phone_number :string
#  creator_id   :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Event < ActiveRecord::Base
  validates :title, :creator_id, presence: true

  belongs_to :user, class_name: "User", foreign_key: :creator_id, dependent: :destroy

end
