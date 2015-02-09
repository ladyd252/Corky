Corky.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],
  templatePost: JST['posts/show_big'],
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
    this.postCount = 0;
    // this.slides = this.$(".post");
    // this.postLength = this.slides.length - 1;
    channel.bind('fetchPosts',
      function() {
        event.fetch();
      }
    );
  },


  addPostView: function(post){
    var postItemShow = new Corky.Views.PostItemView({ model: post, collection: this.collection });
    this.addSubview(".posts", postItemShow.render());
  },

  removePost: function(post){
    var selector = ".posts";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === post} );
    this.removeSubview(selector, subRemove);
  },


  slideshow: function () {
    this.$(".posts").fadeOut("slow", function(){
      var postTemp;
      var currentPost;
      currentPost = this.posts[this.postCount];
      postTemp = this.templatePost({post: currentPost});
      this.$el.html(postTemp).hide().fadeIn()
      if (this.postCount === 0) {
        this.postCount += 1;
      } else if (this.postCount === this.postLength-1) {
          this.postCount = 0;
      } else {
          this.postCount += 1;
      }
      setTimeout(function(){
        this.$(".on-display").fadeOut("slow", this.render.bind(this))
      }.bind(this), 6000)
    }.bind(this));

  },


  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content).hide().fadeIn();
    this.attachSubviews();
    this.postLength = this.posts.length;
    setTimeout(this.slideshow.bind(this),3000);
    return this;
  }

});
