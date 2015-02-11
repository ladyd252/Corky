Corky.Views.SlideshowView = Backbone.CompositeView.extend({
  template: JST["events/slideshow"],
  templateSlideshow: JST['posts/show_big'],
  className: "slideshow-view",

  events:{
    "click .full-screen" : "launchIntoFullscreen",
    "click .start-show" : "startSlideshow"
  },

  initialize: function(){
    this.counter = 0;
    this.collection = this.model.posts();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.posts(), "add", this.addPostView);
    this.collection.each(this.addPostView.bind(this));
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

  startSlideshow: function(){
    setInterval(function(){
      if(this.collection.length>0){
        this.$(".img-slideshow").fadeOut("slow", function(){
          var currentPost = this.collection.models[this.counter];
          var postTemp = this.templateSlideshow({post: currentPost, event: this.model});
          if (this.counter === 0) {
             this.counter += 1;
           } else if (this.counter === this.collection.length-1) {
               this.counter = 0;
           } else {
               this.counter += 1;
           }
           this.$(".img-slideshow").html(postTemp).hide().fadeIn("slow");
        }.bind(this));
      }
    }.bind(this), 4000)
  },

  launchIntoFullscreen: function(event) {
    event.preventDefault();
    // setInterval(function(){
    //   this.$(".img-slideshow").html(slideshowView.render().$el)
    //   }.bind(this), 2000);
    var element = document.getElementsByClassName("img-slideshow")[0];
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
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
    this.$el.html(content)
    this.attachSubviews();
    return this;
  }

})
