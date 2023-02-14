import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import $ from 'jquery';
import {handleCsvFileChange} from "../js/interactions/import";
import {store, retrieve} from "../js/utils/storage";
import customIcon from '../dot.svg'

$(() => {
    var map, infoWindow;

    function initMap() {
        var options =   {
            center: { lat: 43.654, lng: -79.383 },
            zoom: 4.5,
            mapId: "771d24572fd3cc22"
        };

        map = new google.maps.Map(document.getElementById("map"), options)
        infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                var position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                };
            });
        }
    }

    window.initMap = initMap;
    $('#csvFile-insert').on('change', (e) => {
        handleCsvFileChange(e.target.files, (err, filename, contents) => {
            if (err) return $("#csvFile-label").text(err);
            $('#csvEater').hide();
            $('.greenOverlay').hide();

            store('data', contents.data);
            store('fields', contents.fields);

            console.log('data', contents.data);
            console.log('fields', contents.fields);
            initMap();

            var marker, i
            var markers = new Array();

            for (i = 0; i < contents.data.length; i++) {  
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(Number(contents.data[i].Latitude), Number(contents.data[i].Longitude)),
                    map: map,
                    icon: customIcon
                })
                
                const infowindow = new google.maps.InfoWindow({
                    content: contents.data[i].City + '<br>' + Number(contents.data[i].Latitude) + ', ' + Number(contents.data[0].Longitude)
                })

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(this.getMap(), this);
                });

                markers.push(marker)
            }


        })
    });
})