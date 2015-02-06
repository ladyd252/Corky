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
#  event_date   :date
#
# Indexes
#
#  index_events_on_creator_id  (creator_id)
#

class Event < ActiveRecord::Base
  validates :title, :creator_id, presence: true

  belongs_to :user, class_name: "User", foreign_key: :creator_id, dependent: :destroy

  has_many :posts

  attr_accessor :phone_url

  def purchase_num=(val)

    if val == "true"
      account_sid = ENV["twilio_account_id"]
      auth_token = ENV["twilio_auth_token"]
      @client = Twilio::REST::Client.new account_sid, auth_token

      @numbers = @client.account.available_phone_numbers.get('US').local.list(:area_code => "415")

      # Purchase the number
      @number = @numbers[0]
      incoming_number = @client.account.incoming_phone_numbers.create(
        phone_number: @number.phone_number,
        sms_url: "https://corkyapp.herokuapp.com/api/posts",
        sms_method: 'POST'
      )
      # incoming_number.update(sms_url: self.phone_url, sms_method: 'POST')
      self.phone_number = incoming_number.phone_number
    end
  end

end
