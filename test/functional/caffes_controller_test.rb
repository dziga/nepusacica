require 'test_helper'

class CaffesControllerTest < ActionController::TestCase
  setup do
    @caffe = caffes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:caffes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create caffe" do
    assert_difference('Caffe.count') do
      post :create, caffe: { address: @caffe.address, name: @caffe.name }
    end

    assert_redirected_to caffe_path(assigns(:caffe))
  end

  test "should show caffe" do
    get :show, id: @caffe
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @caffe
    assert_response :success
  end

  test "should update caffe" do
    put :update, id: @caffe, caffe: { address: @caffe.address, name: @caffe.name }
    assert_redirected_to caffe_path(assigns(:caffe))
  end

  test "should destroy caffe" do
    assert_difference('Caffe.count', -1) do
      delete :destroy, id: @caffe
    end

    assert_redirected_to caffes_path
  end
end
