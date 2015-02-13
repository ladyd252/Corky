Corky.Views.EventItemView = Backbone.CompositeView.extend({
  template: JST["events/event_item"],
  className: "tab-pane",

  events:{
    "click .delete-event" : "deleteEvent",
    "click .slideshow" : "slideshowLink",
    "dblclick li.title" : "editTitle",
    "dblclick li.date" : "editDate",
    "blur input.title": "saveTitle",
    "blur input.date": "saveDate",
    "click .upload": "upload"
  },

  initialize: function(){
    this.$el.attr("id", this.model.id);
    this.selector = "#slideshow-" + this.model.id;
    this.listenTo(this.model, "sync", this.render);
    this.addSlideshowView();
    this.addEventShowView();
  },

  addSlideshowView: function(){
    this.slideShow = new Corky.Views.SlideshowView({ model: this.model});
    this.addSubview(this.selector, this.slideShow.render());
  },

  addEventShowView: function(){
    var eventShowView = new Corky.Views.EventShow({model: this.model});
    this.addSubview("#posts", eventShowView.render())
  },

  slideshowLink: function(event){
    event.preventDefault();
    var id = "#slideshow-" + this.model.id;
    this.$(id).css("display", "block");
    this.slideShow.startSlideshow();
    var element = document.getElementById("slideshow-" + this.model.id);
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    var that = this;
    this.$(id).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      var event = state ? 'FullscreenOn' : 'FullscreenOff';
      if(event === 'FullscreenOff'){
        that.$(id).css("display", "none");
        window.clearInterval(that.slideShow.intervalId);
        that.render();
      }
    });
  },

  deleteEvent: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  upload: function (){
    var that = this;
    filepicker.pick(function(blob) {
      var newPost = new Corky.Models.Post({
        picture_url: blob.url,
        event_id: that.model.id
      });
      newPost.save({}, {
        success: function () {
          that.$(".upload-success").css("display","block");
          that.model.posts().add(newPost)
          setTimeout(function(){
            that.$(".upload-success").css("display", "none")
          }, 2000)
        },
      })
    })
  },

  editTitle: function(){
    var inputBox = JST["events/edit_title_form"]({event: this.model});
    this.$el.find("li.title").html(inputBox);
  },

  saveTitle: function () {
    var title = $("input.title").val();
    this.model.set("title", title);
    this.model.save();
    this.render()
  },

  editDate: function(){
    var inputBox = JST["events/edit_date_form"]({event: this.model});
    this.$el.find("li.date").html(inputBox);
  },

  saveDate: function () {
    var date = $("input.date").val();
    this.model.set("event_date", date);
    this.model.save();
    this.render()
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    this.$(this.selector).css("display", "none");
    this.attachSubviews();
    return this;
  }
})
