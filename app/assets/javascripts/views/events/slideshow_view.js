Corky.Views.SlideshowView = Backbone.View.extend({
  template: JST["events/slideshow"],
  templateSlideshow: JST['posts/show_big'],
  className: "slideshow-view",

  initialize: function(){
    this.counter = 0;
    this.collection = this.model.posts();
    this.listenTo(this.model, "sync", this.render);
    this.channelName = 'event'.concat(this.model.id);
    var channel = Corky.pusher.subscribe(this.channelName);
    var event = this.model;
    this.posts = this.model.posts().models;
    var that = this;
    channel.bind('fetchPosts',
      function(post_data) {
        var post = new Corky.Models.Post(post_data);
        that.collection.add(post)
        that.counter = that.collection.indexOf(post);
      }
    );
  },

  startSlideshow: function(){
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
    var element = document.getElementsByClassName("whole-show")[0];
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


  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content)
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    Corky.pusher.unsubscribe(this.channelName);
  }

})
