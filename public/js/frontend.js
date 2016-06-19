var array = [];
var marker, lati, longi;
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
  });
  callback();
  //mymap.invalidateSize(false);
});

function addMarker(lat, lng){
  marker = L.marker([lat, lng]).addTo(mymap);
  marker.bindPopup('<p id=\"latitude\">Latitude: ' + lat + '</p><p id=\"longitude\">Longitude: ' + lng + '</p>');
}
function callback() {
  //addMarker(47.253, -122.443);
  // console.log(lati);
  // console.log(longi);
  for(var i = 0; i < array.length; i++){
    var spltLat = array[i].image_metadata.GPSLatitude.split(' ');
    var deg = spltLat[0];
    deg = parseInt(deg, 10);
    var min = spltLat[2].replace(/'/g,"");
    min = parseInt(min, 10);
    var sec = spltLat[3].replace(/"/g,"");
    sec = parseInt(sec, 10);

    var spltLong = array[i].image_metadata.GPSLongitude.split(' ');
    var deg2 = spltLong[0];
    deg2 = parseInt(deg2, 10);
    var min2 = spltLong[2].replace(/'/g,"");
    min2 = parseInt(min2, 10);
    var sec2 = spltLong[3].replace(/"/g,"");
    sec2 = parseFloat(sec2, 10);
    // console.log(min2, sec2, spltLong);
    lati = deg + (min / 60) + (sec / 3600);
    longi = -1 * (deg2 + (min2 / 60) + (sec2 / 3600));
    addMarker(lati, longi);
    // console.log(lati);
    // console.log(longi);
    // addMarker(array[i].long, array[i].lat,array[i].imageUrl,array[i].timeStamp);
  }
  // console.log(array);
}


//addMarker(47.253 ,-122.443,'http://placehold.it/100x50','2014-14-01');
