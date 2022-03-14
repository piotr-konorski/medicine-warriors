<template>
    <div>
        <div>
            <GMapMap
                class='map'
                ref="mapReference"
                :center="center"
                :zoom="7"
                :options="{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    gestureHandling: 'cooperative'
                }"
            >

                <GMapCluster
                    :styles="[
                        {'url': '/clustering/blue/m1.png', 'width': '53', 'height': '52', 'textColor':'white', 'textSize':'15', 'anchorText': ['18','0'], 'anchorIcon': ['0', '0']},
                        {'url': '/clustering/blue/m2.png', 'width': '56', 'height': '55', 'textColor':'white', 'textSize':'14', 'anchorText': ['20','0'], 'anchorIcon': ['0', '0']},
                        {'url': '/clustering/blue/m3.png', 'width': '66', 'height': '65', 'textColor':'white', 'textSize':'14', 'anchorText': ['26','0'], 'anchorIcon': ['0', '0']},
                        {'url': '/clustering/blue/m4.png', 'width': '78', 'height': '77', 'textColor':'white', 'textSize':'14', 'anchorText': ['32','0'], 'anchorIcon': ['0', '0']},
                        {'url': '/clustering/blue/m5.png', 'width': '90', 'height': '89', 'textColor':'white', 'textSize':'12', 'anchorText': ['39','0'], 'anchorIcon': ['0', '0']},
                    ]"
                >
                    <GMapMarker
                        :key="index"
                        v-for="(marker, index) in markers"
                        :position="marker.position"
                        :clickable="true"
                        :draggable="false"
                        :icon= '{
                            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                            scaledSize: {width: 40, height: 40},
                            labelOrigin: {x: 16, y: -10}
                        }'
                        @click="openMarker(marker.id)"
                    >

                        <GMapInfoWindow
                            :closeclick="true"
                            @closeclick="openMarker(null)"
                            :opened="openedMarkerID === marker.id"
                            :options=" {
                                pixelOffset: {
                                    width: 0, height: 0
                                },
                                maxWidth: 320,
                                maxHeight: 320,
                            }"
                        >
                            <div>
                                <p><b>{{marker.name}}</b></p>{{marker.address}}
                                <br>
                                Contact: {{marker.contact}}
                            </div>
                        </GMapInfoWindow>
                    </GMapMarker>

                </GMapCluster>
            </GMapMap>
        </div>
    </div>
</template>



<script>
// https://vue-map.netlify.app/components/info-window.html
// https://www.npmjs.com/package/@fawmi/vue-google-maps
// https://www.digitalocean.com/community/tutorials/vuejs-vue-google-maps
// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.gestureHandling
// vue gmaps - blog: https://tighten.com/blog/improving-google-maps-performance-on-large-datasets/
import axios from 'axios'
export default {
    data() {
        return {
            openedMarkerID: null,
            center: { lat: 49.339110578227455, lng: 31.602030139697213 },
            markers: null
        };
    },
    
    methods: {
        openMarker(id) {
            this.openedMarkerID = id
        }
    },
    
    mounted () {
    axios
      .get('http://localhost:5000/pharmacies')
    //   .then(response => console.log(response.data.pharmacies))
      .then(response => (this.markers = response.data.pharmacies))
      .catch(error => console.log(error))
  }
};
</script>


<style>
.map {
  width: 99%;
  height: 700px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

@media (max-width: 1000px) {
  .map {
    width: 99%;
    height: 70vh;
  }
}
</style>
