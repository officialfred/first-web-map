mapboxgl.accessToken = 'pk.eyJ1Ijoib2ZmaWNpYWxmcmVkIiwiYSI6ImNremhucWQxajQzYTQydnA0Y2cyaWVlemYifQ.rHit1ma6fsUrAjsxqoxheA'

var map = new mapboxgl.Map({
   container: 'map', // HTML container id
   style: 'mapbox://styles/mapbox/streets-v9', // style URL
   center: [-46.6396, -23.5558], // starting position as [lng, lat]
   zoom: 13
 });

 var popup = new mapboxgl.Popup()
 .setHTML('<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>');

 var marker = new mapboxgl.Marker()
 .setLngLat([-46.6396, -23.5558])
 .setPopup(popup)
 .addTo(map);


 $.getJSON('/data/pizza.json', function(pizzaRows) {
   console.log(pizzaRows)

   pizzaRows.forEach(function(pizzaRow) {
     console.log(pizzaRow.name, pizzaRow.pizzashop)

     var html = `
       <div>
         <h3>${pizzaRow.pizzashop}</h3>
         <div>Submitted by ${pizzaRow.name}</div>
         <div><i>"${pizzaRow.message}"</i></div>
       </div>
     `

     // all non MUP and CUSP will be this color
     var color = 'green'

     if (pizzaRow.program === 'MUP') {
       color = 'purple'
     }

     if (pizzaRow.program === 'CUSP') {
       color = 'orange'
     }

     new mapboxgl.Marker({
       color: color
     })
       .setLngLat([pizzaRow.longitude, pizzaRow.latitude])
       .setPopup(new mapboxgl.Popup().setHTML(html)) // add popup
       .addTo(map);
   })
 })
