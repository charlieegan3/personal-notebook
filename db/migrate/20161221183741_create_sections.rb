class CreateSections < ActiveRecord::Migration[5.0]
  def change
    create_table :sections do |t|
      t.string :name, null: false
      t.references :user, foreign_key: true, null: false
      t.integer :parent_id, foreign_key: true, null: true

      t.timestamps
    end
  end
end
