class Caffe < ActiveRecord::Base
  attr_accessible :address, :name, :latitude, :longitude, :gmaps
  acts_as_gmappable

  has_many :opinions

  def gmaps4rails_address
    address
  end

  def gmaps4rails_infowindow
      "<h4>#{name}</h4>"
  end

end
