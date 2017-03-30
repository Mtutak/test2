// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");


// Helper functions for making API Calls
var helpers = {



    // console.log(location);

    // Figure out the geolocation
  //   var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
  //   return axios.get(queryURL).then(function(response) {
  //     // If get get a result, return that result's formatted address property
  //     if (response.data.results[0]) {
  //       return response.data.results[0].formatted;
  //     }
  //     // If we don't get any results, return an empty string
  //     return "";
  //   });
  // },

  // This function hits our own server to retrieve the record of query results
  getUsersConnections: function() {
    return axios.get("/api/connections");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  },
// This function posts new searches to our database.
  postProject: function(data) {
    console.log('Post Project Helper hit!');
    console.log(data);
    return axios.post("/projects/new", { data });

  },
  getAllProjects: function() {
    console.log('Hit Get All Projects Helper');
    return axios.get("/projects");
  },
  // getUserProfile:function(data) {
  //   console.log('Hit Get User Profile Helper');
  //   return axios.get("/user/data");
  // },
  updateUserProfile: function(id, data) {
    console.log('Hit Update User Helper');
    console.log(data);
    return axios.post(`/user/${id}/update`, { data });
  }

};

// We export the API helper

export { helpers };

