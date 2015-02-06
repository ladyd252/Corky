Corky.Views.EventShow = Backbone.View.extend({
  template: JST['events/show'],
  className: "show-page",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render)
    this.listenTo(this.model.posts(), "sync change", this.render)
    var pusher = new Pusher(PUSHER_APP_ID);
    var channel = pusher.subscribe('event'.concat(this.id));
    var event = this.model;
    channel.bind('fetchPosts',
      function() {
        event.posts().fetch()
      }
    );
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    // this.attachSubviews();
    return this;
  }

});
