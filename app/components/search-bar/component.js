import Ember from 'ember';
import iso31662 from 'npm:iso-3166-2';
import _ from 'npm:lodash';

export default Ember.Component.extend({
  placeOrName: null,
  placesAndNames: [],
  multipleOperators: Ember.computed.gte('totalOperators', 2),

  actions: {
    findPlacesAndNames: function(){
      this.sendAction('findPlacesAndNames');
      var data = this.model.get('firstObject');
      var placesAndNames = [];
      Object.keys(data.get('country')).forEach(function(isocode) {
        if (Ember.isPresent(isocode)) {
          placesAndNames.push({
            value: isocode,
            display: iso31662.country(isocode).name,
            type: 'país'
          });
        }
      });
      Object.keys(data.get('state')).forEach(function(isocode) {
        if (Ember.isPresent(isocode)) {
          placesAndNames.push({
            value: isocode,
            display: iso31662.subdivision(isocode).name,
            type: 'distrito/região'
          });
        }
      });
      Object.keys(data.get('metro')).forEach(function(metro) {
        if (Ember.isPresent(metro)) {
          placesAndNames.push({
            value: metro,
            display: metro,
            type: 'concelho'
          });
        }
      });
      Object.keys(data.get('name')).forEach(function(name) {
        if (Ember.isPresent(name)) {
          placesAndNames.push({
            value: name,
            display: name,
            type: 'nome'
          });
        }
      });
      Object.keys(data.get('short_name')).forEach(function(shortName) {
        if (Ember.isPresent(shortName)) {
          placesAndNames.push({
            value: shortName,
            display: shortName,
            type: 'sigla/acrónimo'
          });
        }
      });
      placesAndNames = _.sortBy(placesAndNames, 'display');
      this.set('placesAndNames', placesAndNames);
    },

    setPlaceOrName: function(placeOrName){
      this.sendAction('filterByPlaceOrName', placeOrName.value, placeOrName.type);
    }
  }
});
