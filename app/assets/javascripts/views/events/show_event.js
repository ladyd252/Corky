Corky.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],
  className: "show-page",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render)
    this.listenTo(this.model.posts(), "sync", this.render)
    this.listenTo(this.model.posts(), "remove", this.removePost)
    this.listenTo(this.model.posts(), "add", this.addPostView);
    var pusher = new Pusher(PUSHER_APP_ID);
    var channelName = 'event'.concat(this.model.id);
    var channel = pusher.subscribe(channelName);
    var event = this.model;
    channel.bind('fetchPosts',
      function() {
        event.fetch();
      }
    );
  },

    //
    // initialize: function(){
    //   this.listenTo(this.collection, "sync", this.render);
    //   this.listenTo(this.collection, "add", this.addEventView);
    //   this.listenTo(this.collection, "remove", this.removeEvent)
    //   this.collection.each(this.addEventView.bind(this));
    // },
    //
    // addPost: function(post){
    //
    // },

  addPostView: function(post){
    var postItemShow = new Corky.Views.PostItemView({ model: post });
    this.addSubview(".posts", postItemShow.render());
  },

  removePost: function(post){
    var selector = ".posts";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === post} );
    this.removeSubview(selector, subRemove);
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
