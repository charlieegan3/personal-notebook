class ImportController < ApplicationController
  def form
  end

  def import
    u = current_user

    data = JSON.parse(params[:json])

    sections = data["sections"]
    root_sections = sections.select { |s| s["parent_id"] == 'root' }
    child_sections = sections - root_sections

    saved_sections = {}
    root_sections.each do |root|
      saved_sections[root["id"]] = Section.create(name: root["name"], user: u)
    end

    until child_sections.empty?
      s = child_sections.pop

      if parent = saved_sections[s["parent_id"]]
        saved_sections[s["id"]] =
          Section.create(name: s["name"], parent: parent, user: u)
      else
        child_sections.shift(s)
      end
    end

    data["notes"].each do |note|
      section = saved_sections[note["section_id"]]
      Note.create(
        title: note["title"],
        content: note["content"],
        section: section,
        user: u
      )
    end

    return redirect_to root_path
  end
end
