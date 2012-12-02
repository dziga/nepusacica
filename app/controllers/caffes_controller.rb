class CaffesController < ApplicationController
  # GET /caffes
  # GET /caffes.json
  

  def index
    range = 0.01
    
    if !params[:latitude].blank? and !params[:longitude].blank?

      latitude =  params[:latitude].to_f/10000000
      longitude = params[:longitude].to_f/10000000
      @caffes = Caffe.find(:all, :conditions=> ["latitude > ? and latitude < ? and longitude > ? and longitude < ?", latitude - range, latitude + range, longitude - range, longitude + range]) 
    
    else
      @caffes = Caffe.all
    end

    @caffes_json = @caffes.to_gmaps4rails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @caffes}

    end
  end

  def search
    range = 0.01
    
    if !params[:address].blank?

      address_results = Gmaps4rails.geocode(params[:address])
      latitude =  address_results[0][:lat]
      longitude = address_results[0][:lng]
      @caffes = Caffe.find(:all, :conditions=> ["latitude > ? and latitude < ? and longitude > ? and longitude < ?", latitude - range, latitude + range, longitude - range, longitude + range]) 
    
    else
      @caffes = Caffe.all
    end

    @caffes_json = @caffes.to_gmaps4rails
    
    respond_to do |format|
      format.html
      format.json {render json: @caffes_json}
    end
  end

  # GET /caffes/1
  # GET /caffes/1.json
  def show
    @caffe = Caffe.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @caffe }
    end
  end

  # GET /caffes/new
  # GET /caffes/new.json
  def new
    @caffe = Caffe.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @caffe }
    end
  end

  # GET /caffes/1/edit
  def edit
    @caffe = Caffe.find(params[:id])
  end

  # POST /caffes
  # POST /caffes.json
  def create
    @caffe = Caffe.new(params[:caffe])

    respond_to do |format|
      if @caffe.save
        format.html { redirect_to @caffe, notice: 'Caffe was successfully created.' }
        format.json { render json: @caffe, status: :created, location: @caffe }
      else
        format.html { render action: "new" }
        format.json { render json: @caffe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /caffes/1
  # PUT /caffes/1.json
  def update
    @caffe = Caffe.find(params[:id])

    respond_to do |format|
      if @caffe.update_attributes(params[:caffe])
        format.html { redirect_to @caffe, notice: 'Caffe was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @caffe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /caffes/1
  # DELETE /caffes/1.json
  def destroy
    @caffe = Caffe.find(params[:id])
    @caffe.destroy

    respond_to do |format|
      format.html { redirect_to caffes_url }
      format.json { head :no_content }
    end
  end
end
