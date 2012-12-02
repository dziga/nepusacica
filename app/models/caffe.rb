class Caffe < ActiveRecord::Base
  acts_as_gmappable

  def gmaps4rails_address
    address
  end

  def gmaps4rails_infowindow
      "<h4>#{name}</h4>"
  end

  attr_accessible :address, :name, :latitude, :longitude, :gmaps
end
