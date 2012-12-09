// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


function getCurrentUsersLocation()
{
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(setMarkerOfUsersPosition);
    }
  else{alert("Geolocation is not supported by this browser.");}
}
function setMarkerOfUsersPosition(position)
{
  Gmaps.map.createMarker(
  	{
  		Lat: position.coords.latitude,
        Lng: position.coords.longitude, 
        rich_marker: null, 
        marker_picture: ""
    });

}
function postCurrentUsersLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(setInputFields);
  }
  else
  {
    alert("Failed to set location!");
  }
}

function setInputFields(position)
{
  $('#latitude').val(position.coords.latitude);
  $('#longitude').val(position.coords.longitude);
}

function updateTopRatedCaffesListBasedOnPosition(){
  if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(getCaffesAroundUsersLocation);
    }
    function getCaffesAroundUsersLocation(position){
      
      $.getJSON("index.json", {latitude: position.coords.latitude, longitude: position.coords.longitude}, function(caffes){
          var yeah = caffes[0];
          var htmlForUpdate = "<ul>";
          $.each(caffes, function(key, caffe){
            htmlForUpdate = htmlForUpdate + 
            "<li class='direction_to'>" + caffe.name + 
            "<div class='hidden lat_to'>"+caffe.latitude+"</div>" +
            "<div class='hidden lng_to'>"+caffe.longitude+"</div></li>";
          })
          htmlForUpdate = htmlForUpdate + "</ul>";
          $("#top-rated").html(htmlForUpdate);
      });
    }
}


