Corky.Collections.Posts = Backbone.Collection.extend({
  url: "/api/posts",
  model: Corky.Models.Post,

  initialize: function(options){
    this.event = options.event;
  }

});
