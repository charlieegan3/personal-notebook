class SharedController < ApplicationController
  def multi_edit
    @notes = Note.where(user: current_user).order(updated_at: :desc)
    @sections = Section.where(user: current_user)
  end
end
