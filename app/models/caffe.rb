class Caffe < ActiveRecord::Base
  attr_accessible :address, :name, :latitude, :longitude, :gmaps
  acts_as_gmappable

  has_many :opinions do
    def total_rating
      sum(:rating)
    end
  end

  def gmaps4rails_address
    address
  end

  def gmaps4rails_infowindow
      "#{name}"
  end

end
