class Note < ApplicationRecord
  belongs_to :section
  belongs_to :user

  def field_value
    title == 'Note' ? '' : title
  end
end
