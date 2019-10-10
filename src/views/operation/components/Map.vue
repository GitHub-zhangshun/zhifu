<template>
  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :default="address">
    </el-amap-search-box>
    <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
      <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
    </el-amap>
  </div>
</template>

<style lang="scss">
  .amap-page-container {
    // border: 1px solid;
    height: 100%;
    position: relative;
  }

  .amap-demo {
    /* height: 300px; */
    margin-top: -45px;
  }

  .search-box {
    position: absolute;
    top: 25px;
    left: 20px;
  }

</style>

<script>
  export default {
    name: 'map-vue',
    props: {
      value: String,
      address: ''
    },
    data: function () {
      return {
        markers: [
          [121.59996, 31.197646],
          [121.40018, 31.197622],
          [121.69991, 31.207649]
        ],
        searchOption: {
          city: '全国',
          citylimit: false
        },
        mapCenter: [104.06866869999999, 30.495587499999992]
      }
    },
    created () {
      if(this.value) {
        this.mapCenter = this.value.split(',')
      }
    },
    methods: {
      addMarker: function () {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
        this.markers.push([lng, lat]);
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {
              lng,
              lat
            } = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.mapCenter = [center.lng, center.lat];
          const str = `${this.mapCenter[0]},${this.mapCenter[1]}`
          this.$emit('input', str)
        }
      }
    }
  }

</script>
