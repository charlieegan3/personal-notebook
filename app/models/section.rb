class Section < ApplicationRecord
  belongs_to :user

  belongs_to :parent, class_name: 'Section', required: false
  has_many :children, class_name: 'Section', foreign_key: 'parent_id', dependent: :destroy

  has_many :notes, dependent: :destroy

  validates :name, format: { with: /\A\{/, message: "Encrypted JSON" }

  def note_count
    notes.count
  end

  def child_count
    children.count
  end

  def export_parent_name
    parent ? parent.name : 'root'
  end
end
