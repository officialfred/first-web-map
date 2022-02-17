$.getJSON('data/toilets.json', function(parkToilets) {
  // console.log(parkToilets)

  mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

  // lngLat for the fountain in Washington Square Park
  var wspCenter = [-73.997456, 40.730831]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: wspCenter, // starting position as [lng, lat]
    zoom: 11,
    // minZoom: 9,
    // maxZoom: 14
  });

  // now add markers for our favorite pizza shops
  parkToilets.forEach(function(toilet) {
    var streetAddress = toilet.Location.replaceAll(' ', '%20')
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + streetAddress + ".json?proximity=-74.0060,40.7128&limit=1&access_token=pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A"
    let coord = fetch(url)
    $.getJSON(url, function(geocode){
      mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'
      var coord = geocode.features[0]['center']


    var popup = new mapboxgl.Popup({ offset: 40 })
      .setHTML(`
        <p><strong>${toilet.Name}</strong></p>
      `);

    // default is red for Inaccessible
    var color = 'red'

    if (toilet.HandicapAccessible === 'Yes') {
      color = 'green'
    }

    new mapboxgl.Marker({
      color: color
    })


      .setLngLat(coord)
      .setPopup(popup)
      .addTo(map);
    })
  })
})
