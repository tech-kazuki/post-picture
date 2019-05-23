class Picture < ApplicationRecord
  validates :image, presence: true
  validates :user_name, presence: true
  validates :title, presence: true
end
