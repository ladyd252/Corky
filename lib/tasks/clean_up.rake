namespace :clean_up do
  desc "TODO"
  task delete_numbers: :environment do
    Event.all.each do |event|
      if !event.event_date || event.event_date < Date::today
        if event.phone_number
          account_sid = ENV["twilio_account_id"]
          auth_token = ENV["twilio_auth_token"]
          client = Twilio::REST::Client.new account_sid, auth_token

          # Release number
          client.account.incoming_phone_numbers.list({:phone_number => event.phone_number}).each do |n|
            num = client.account.incoming_phone_numbers.get(n.sid)
            num.delete
          end
          #set to nil
          event.update(phone_number: nil)
        end
      end
    end
  end

end
