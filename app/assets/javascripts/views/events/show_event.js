Corky.Views.EventShow = Backbone.View.extend({
  template: JST['events/show'],
  className: "show-page",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render)
    this.listenTo(this.model.posts(), "sync change", this.render)
    var pusher = new Pusher(PUSHER_APP_ID);
    console.log(PUSHER_APP_ID);
    var channelName = 'event'.concat(this.model.id);
    var channel = pusher.subscribe(channelName);
    console.log(channelName);
    var event = this.model;
    channel.bind('fetchPosts',
      function() {
        event.fetch();
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
