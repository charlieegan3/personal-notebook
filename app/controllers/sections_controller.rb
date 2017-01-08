class SectionsController < ApplicationController
  before_action :set_section, only: [:show, :edit, :update, :destroy, :multi_edit]

  # GET /sections/1
  # GET /sections/1.json
  def show
  end

  def multi_edit
    @sections = [@section]
    @notes = @section.notes
  end

  # GET /sections/new
  def new
    @section = Section.new
  end

  # GET /sections/1/edit
  def edit
  end

  # POST /sections
  # POST /sections.json
  def create
    @section = Section.new(section_params)

    respond_to do |format|
      target = @section.parent.present? ? @section.parent : @section

      if @section.save
        format.html { redirect_to target, notice: 'Section was successfully created.' }
        format.json { render :show, status: :created, location: target }
      else
        format.html { render :new }
        format.json { render json: @section.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sections/1
  # PATCH/PUT /sections/1.json
  def update
    respond_to do |format|
      if @section.update(section_params)
        format.html { redirect_to @section, notice: 'Section was successfully updated.' }
        format.json { render :show, status: :ok, location: @section }
      else
        format.html { render :edit }
        format.json { render json: @section.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sections/1
  # DELETE /sections/1.json
  def destroy
    target = @section.parent ? section_path(@section.parent) : root_url
    @section.destroy
    respond_to do |format|
      format.html { redirect_to target, notice: 'Section was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_section
      @section = Section.includes(:children, :notes).order('notes.created_at DESC').find(params[:id])
      redirect_to root_path, notice: 'Nope.' unless @section.user == current_user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def section_params
      params[:section][:user_id] = current_user.id
      params.require(:section).permit(:name, :parent_id, :user_id)
    end
end
