var array = [];
var marker;
var mymap = L.map('mapid').setView([47.253, -122.444], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'shaallfar.0eb9fkin',
  accessToken: 'pk.eyJ1Ijoic2hhYWxsZmFyIiwiYSI6ImNpcGo0M3BhMTAxdG10Y21kZDR5YTI1bXEifQ.1gzubePc_utj9EgK6sK-sQ'
}).addTo(mymap);

var config = {
  apiKey: 'AIzaSyCsWqdmhM8CGtprWuwhde2aQxrAD-RMecw',
  authDomain: 'test-8436c.firebaseapp.com',
  databaseURL: 'https://test-8436c.firebaseio.com',
  storageBucket: 'test-8436c.appspot.com'
};

firebase.initializeApp(config);
var database = firebase.database();
var test = firebase.database().ref('imageMetaData');
test.on('value',function(snapshot){
  snapshot.forEach(function(obj){
    array.push(obj.exportVal());
    console.log(array);
  });
  callback();
});
function callback() {
  for(var i = 0; i < array.length; i++){
    addMarker(array[i].long, array[i].lat,array[i].imageUrl,array[i].timeStamp);
  }
  // console.log(array);
  mymap.invalidateSize(false);
}
function addMarker(lng, lat, photoUrl,timeStamp){
  marker = L.marker([lng, lat]).addTo(mymap);
  marker.bindPopup('<img src=\"' + photoUrl + '\"alt=\"img\"><p id=\"latitude\">Latitude: ' + lat + '</p><p id=\"longitude\">Longitude: ' + lng + '</p><p id=\"timestamp\">' + timeStamp + '</p>');
}

//addMarker(47.253,-122.443,'http://placehold.it/100x50','2014-14-01');
//addMarker(47.253 ,-122.443,'http://placehold.it/100x50','2014-14-01');
