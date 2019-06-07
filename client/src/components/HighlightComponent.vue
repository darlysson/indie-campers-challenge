<template>
  <div id="highlight-container">
    <h2 class="title">Highlights - REST API</h2>
    <h3 class="subtitle">Find great places on your way, right close to you!</h3>

    <!-- Choice buttons-->
    <h5>Choose by:</h5>
    <div class="buttons-choice">
      <button id="btn-address" name="button" @click="toggle">Address</button>
      <button id="btn-lat-lon" name="button" @click="toggle">Latitude & Longitude</button>
    </div>

    <!-- Form to handle Lat/Long requests -->
    <form class="search" id="form-lat-lon" v-if="IsActive">
      <label>Enter your longitude:</label>
      <input type="text" v-model="longitude" id="longitude" placeholder="Longitude" required />
      <label>Enter your latitude:</label>
      <input type="text" v-model="latitude" id="latitude" placeholder="Latitude" required />

      <input type="submit"  value="Find Touristic Places" @click="handleSubmitLatLong" />
    </form>

    <!-- Form to handle Address requests -->
    <form class="search" id="form-address" v-else>
      <label>Enter your current address:</label>
      <input type="text" v-model="departure" id="departure" placeholder="This is where you are!" required />
      <label>Enter your expected arrival:</label>
      <input type="text" v-model="arrival" id="arrival" placeholder="This is where you are going to!" required />

      <input type="submit"  value="Find Touristic Places" @click="handleSubmitAddress" />
    </form>

    <div>
      <table v-if="seen">
        <thead >
          <tr>
            <th>Attraction</th>
            <th>City</th>
            <th>Description</th>
            <th>Tips</th>
            <th>Lat / Long</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="highlight in highlights" :key="highlight._id">
            <td>{{ highlight.name }}</td>
            <td>{{ highlight.city }}</td>
            <td>{{ highlight.description }}</td>
            <td>{{ highlight.tips }}</td>
            <td>{{ highlight.geometry.coordinates }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HighlightComponent',
  data() {
    return {
      latitude: '',
      longitude: '',
      departure: '',
      arrival: '',
      seen: false,
      IsActive: true,
      highlights: []
    }
  },
  methods: {
    handleSubmitLatLong(e) {
      e.preventDefault();

      const url = `http://localhost:3000/api/highlights?longitude=${this.longitude}&latitude=${this.latitude}`;
      try {
        axios.get(url)
          .then(res => {
            this.highlights = res.data
            this.seen = true;
            this.latitude = '';
            this.longitude = '';
          });
      } catch(err) {
        console.log(err.message);
      }
    },
    handleSubmitAddress(e) {
      e.preventDefault();

      let location = 'Lisbon';

      try {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: location,
            key: 'AIzaSyDS2fniJZskE4hS7ZUOiB_Z9gsd0REbvAw'
          }
        }).then(res =>  {
          //Gets lat & lgt from 'location', in this case, Lisbon.
          console.log(res.data.results[0].geometry.location.lat);
          console.log(res.data.results[0].geometry.location.lng);

        });
      } catch (error) {
        console.log(error.message);
      }
    },
    toggle: function(){
      this.IsActive = !this.IsActive
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  background: #red;
}
body {
  color: #555;
  background-color: #ccc;
  margin: 10px 30px;
  font-family: Raleway;
}

#btn-address, #btn-lat-lon {
  width: 30%;
  height: 50px;
  color: #415162;
  font-size: 20px;
  background: #ccc;
  font-weight: bold;
  border: 1px solid #fff;
}

table {
  width: 100%;
  border-radius: 3px;
  border: 2px solid #555;
  background-color: #fff;
}

th {
  background-color: #555;
  color: rgba(255,255,255,0.66);
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 10px;
}

#highlight-container{
  max-width: 800px;
  margin: 60px auto;
  padding: 10px 20px;
  border-radius: 4px;
  background: #fdfdfd;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
}

input[type="text"]{
  width: 300px;
  padding: 10px;
  display: block;
  margin: 20px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
}

label{
  font-weight: bold;
}

.title{
  color: #555;
  font-size: 48px;
  text-align: center;
}
.subtitle{
  color: #555;
  font-size: 20px;
  text-align: center;
}

#homepage h1{
  text-align: center;
}

form{
  max-width: 350px;
  margin: 30px auto;
}

input[type="submit"]{
   border: 0;
   color: #fff;
   width: 200px;
   padding: 10px;
   margin: 0 auto;
   display: block;
   cursor: pointer;
   font-size: 18px;
   background: #555;
   border-radius: 4px;
 }

</style>
