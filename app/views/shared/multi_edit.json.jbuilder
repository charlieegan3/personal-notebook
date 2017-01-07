require 'digest/sha1'

json.sections do
  json.array! @sections do |section|
    json.id Digest::SHA1.hexdigest(section.id.to_s)
    json.name section.name
    json.parent_id section.export_parent_string
  end
end

json.notes do
  json.array! @notes do |note|
    json.id Digest::SHA1.hexdigest(note.id.to_s)
    json.title note.title
    json.content note.content
    json.section_id Digest::SHA1.hexdigest(note.section.id.to_s)
  end
end
