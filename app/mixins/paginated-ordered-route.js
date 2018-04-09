import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    offset: {
      refreshModel: true
    },
    sort_order: {
      refreshModel: true
    },
    sort_key: {
      refreshModel: true
    }
  }
});
