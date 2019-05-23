class PicturesController < ApplicationController
  def index
    @pictures = Picture.all
  end

  def show
    @picture = Picture.find(params[:id])
  end

  def new
  end

  def create
    if Picture.create(picture_params)
      redirect_to root_path
    else
      redirect_to new_picture_path
    end
  end

  private
  def picture_params
    params.require(:picture).permit(:user_name, :title, :image, :detail)
  end
end
