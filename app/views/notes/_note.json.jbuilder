json.extract! note, :id, :title, :content, :section_id, :user_id, :created_at, :updated_at
json.url note_url(note, format: :json)