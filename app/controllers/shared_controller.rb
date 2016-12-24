class SharedController < ApplicationController
  def multi_edit
    @notes = Note.where(user: current_user).order(updated_at: :desc)
    @sections = Section.where(user: current_user)
  end

  def notebook
    @notes = Note.where(user: current_user).order(updated_at: :desc).limit(5)
    @sections = Section.includes(:children, :notes).where(parent_id: nil, user: current_user)
  end
end
