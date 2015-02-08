Corky.Views.EventShow = Backbone.View.extend({
  template: JST['events/show'],
  className: "show-page",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render)
    this.listenTo(this.model.posts(), "sync", this.render)
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
  //
  // slideshow: function () {
  //     var counter = 0;
  //     var slides = this.$(".posts");
  //     var slidesLen = slides.length - 1;
  //     return function () {
  //       setInterval(function () {
  //           if (counter === 0) {
  //             slides.eq(slidesLen).addClass("col-md-4");
  //             slides.eq(slidesLen).removeClass("on-display");
  //             slides.eq(counter).removeClass("col-md-4");
  //             slides.eq(counter).addClass("on-display");
  //             counter += 1;
  //           } else if (counter === slidesLen) {
  //               slides.eq(counter-1).addClass("col-md-4");
  //               slides.eq(counter-1).removeClass("on-display");
  //               slides.eq(counter).removeClass("col-md-4");
  //               slides.eq(counter).addClass("on-display");
  //               counter = 0;
  //           } else {
  //             slides.eq(counter-1).addClass("col-md-4");
  //             slides.eq(counter-1).removeClass("on-display");
  //             slides.eq(counter).removeClass("col-md-4");
  //             slides.eq(counter).addClass("on-display");
  //             counter += 1;
  //           }
  //       }, 2000);
  //     };
  // },


  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    // var slide = this.slideshow();
    // slide();
    return this;
  }

});
