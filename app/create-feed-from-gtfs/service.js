import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  feedModel: null,
  createOrFindFeedModel: function() {
    if (this.get('feedModel') == null) {
      var newFeedModel = this.get('store').createRecord('feed', { });
      this.set('feedModel', newFeedModel);
    }
    return this.get('feedModel');
  },
  downloadGtfsArchiveAndParseIntoFeedModel: function(retries) {
    retries = (retries || 60);
    if (retries-- <= 0) {
      throw "Timeout"
    }
    var feedModel = this.createOrFindFeedModel();
    var url = feedModel.get('url');
    var adapter = this.get('store').adapterFor('feeds');
    var fetch_info_url = adapter.urlPrefix()+'/feeds/fetch_info';
    var controller = this;
    var promise = adapter.ajax(fetch_info_url, 'post', {data:{url:url}});
    promise.then(function(response) {
      if (response.status == 'complete') {
        feedModel.set('id', response.feed.onestop_id);
        return response.operators.map(function(operator){feedModel.addOperator(operator)});
      } else if (response.status == 'processing') {
        return Ember.run.later(controller, function(){this.downloadGtfsArchiveAndParseIntoFeedModel(retries)}, 1000);
      }
    });
    return promise
  },
	toChangeset: function() {
    var feedModel = this.createOrFindFeedModel();
    var changes = [];
    changes.push({action:'createUpdate', feed:feedModel.toChange()})
    feedModel.get('operators').map(function(operator){
      changes.push({action:'createUpdate', operator:operator.toChange()})
    });
		var changeset = this.get('store').createRecord('changeset', {
			notes: 'This is a test. TODO put a custom message here.',
			payload: {
				changes: changes
			}
		});
		return changeset;
	}
});