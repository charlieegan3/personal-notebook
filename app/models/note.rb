class Note < ApplicationRecord
  belongs_to :section
  belongs_to :user

  validates :title, format: { with: /\A\{/, message: "Encrypted JSON" }
  validates :content, format: { with: /\A\{/, message: "Encrypted JSON" }

  def field_value
    title == 'Note' ? '' : title
  end
end
