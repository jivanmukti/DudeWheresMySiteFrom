// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.

var map;
console.log('In here baby');
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  };
  var bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  var marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: {lat: -34.397, lng: 150.644},
    map: map
  });
  
  var marker2 = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: {lat: -10.397, lng: 110.644},
    map: map
  });
  bounds.extend(marker.getPosition());
  bounds.extend(marker2.getPosition());
  // You can use a LatLng literal in place of a google.maps.LatLng object when
  // creating the Marker object. Once the Marker object is instantiated, its
  // position will be available as a google.maps.LatLng object. In this case,
  // we retrieve the marker's position using the
  // google.maps.LatLng.getPosition() method.
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + marker.getPosition() + '</p>'
  });
  var infowindow2 = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + marker2.getPosition() + '</p>'
  })

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
  google.maps.event.addListener(marker2, 'click', function() {
    infowindow2.open(map, marker2);
  });
  

  google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
    this.setZoom(map.getZoom()-1);

    if (this.getZoom() > 15) {
      this.setZoom(15);
    }
  });
  map.fitBounds(bounds);

}

google.maps.event.addDomListener(window, 'load', initialize);