Corky.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],
  className: "show-page",


  initialize: function(){
    this.listenTo(this.model, "sync change", this.render)
    this.listenTo(this.model.posts(), "sync", this.render)
    this.listenTo(this.model.posts(), "add", this.addPostView);
    this.listenTo(this.model.posts(), "remove", this.removePost)
    this.model.posts().each(this.addPostView.bind(this));
    var pusher = new Pusher(PUSHER_APP_ID);
    var channelName = 'event'.concat(this.model.id);
    var channel = pusher.subscribe(channelName);
    var event = this.model;
    this.posts = this.model.posts().models;
    channel.bind('fetchPosts',
      function() {
        event.fetch();
      }
    );
  },

  addPostView: function(post){
    var postItemShow = new Corky.Views.PostItemView({ model: post, collection: this.collection });
    this.addSubview("#posts", postItemShow.render());
  },

  removePost: function(post){
    var selector = "#posts";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === post} );
    this.removeSubview(selector, subRemove);
  },


  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content).hide().fadeIn();
    this.attachSubviews();
    // this.$('#posts').justifiedGallery({
    //   rowHeight: 250,
    //   lastRow: 'nojustify',
    //   margins: 3
    // });
    this.postLength = this.posts.length;
    // setTimeout(this.slideshow.bind(this),3000);
    return this;
  }

});
