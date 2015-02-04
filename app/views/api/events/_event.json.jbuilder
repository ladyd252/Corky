json.extract! event, :id, :title, :phone_number, :event_date

json.posts do
  json.array! event.posts, :id, :body, :picture_url, :event_id
end
