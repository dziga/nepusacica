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
      
      

      $.getJSON("caffes/index.json", {latitude: position.coords.latitude, longitude: position.coords.longitude}, function(caffes){
          var yeah = caffes[0];
          var htmlForUpdate = "<ul>";
          $.each(caffes, function(key, caffe){
            createMarker(caffe.latitude, caffe.longitude);
            htmlForUpdate = htmlForUpdate + 
            "<li class='direction_to'>" + caffe.name + 
            "<div class='hidden lat_to'>"+caffe.latitude+"</div>" +
            "<div class='hidden lng_to'>"+caffe.longitude+"</div></li>";
            
          })
          htmlForUpdate = htmlForUpdate + "</ul>";
          $("#top-rated").html(htmlForUpdate);
          //Gmaps.map.initialize();
          //Gmaps.map.markers = [{"description":"Bezec","lat":,"lng":},{"description":"The pub","lat":45.2479267,"lng":19.8354265},{"description":"Lazino tele","lat":45.2568717,"lng":19.844985800000018},{"description":"Cirpanova","lat":45.2527058,"lng":19.8337672},{"description":"Doza","lat":45.24616109999999,"lng":19.8307461}];
          
          //  Gmaps.map.markers = JSON.stringify(caffes);
          //Gmaps.map.create_markers();

      });
    }
}

function createMarker(lat, lng){
  Gmaps.map.createMarker(
  {
    Lat: lat,
    Lng: lng, 
    rich_marker: null, 
    marker_picture: ""
  });
}

function fillInSearchBox(text){
  $("#search-suggestions").val(text);
}


//LISTENERS

$(".direction_to").live('click', function(e){
  e.preventDefault;
  var clickedOn = $(this);  
  if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(setDirectionsToCaffe);
    }
    function setDirectionsToCaffe(position){
      var lat_to = clickedOn.find(".lat_to").text();
      var lng_to = clickedOn.find(".lng_to").text();
      var lat_from = position.coords.latitude;
      var lng_from = position.coords.longitude
      Gmaps.map.initialize();
      Gmaps.map.direction_conf.origin = new google.maps.LatLng(lat_from, lng_from);
      Gmaps.map.direction_conf.destination =  new google.maps.LatLng(lat_to, lng_to);
      Gmaps.map.direction_conf.travelMode = "WALKING";
      //Gmaps.map.direction_conf.language = 'sr';
      Gmaps.map.create_direction(); 

    }
});





