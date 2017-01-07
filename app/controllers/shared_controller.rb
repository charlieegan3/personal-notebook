class SharedController < ApplicationController
  def multi_edit
    @notes = Note.where(user: current_user).order(updated_at: :desc)
    @sections = Section.where(user: current_user)
  end

  def notebook
    all_notes = Note.where(user: current_user).order(updated_at: :desc)
    @notes = all_notes.limit(5)
    @sections = Section.includes(:children, :notes).where(parent_id: nil, user: current_user)

    @insecure_sections = @sections.select { |s| s.name[0] != "{" }.size
    @insecure_notes = all_notes.select { |n| n.title[0] != "{" || n.content[0] != "{" }.size
  end
end
