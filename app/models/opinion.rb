class Opinion < ActiveRecord::Base
  attr_accessible :caffe_id, :comment, :rating
  belongs_to :caffe
end
