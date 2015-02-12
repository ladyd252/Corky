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
    this.listenTo(this.model.posts(), "add sync", this.render);
    // this.model.posts().each(this.addPostView.bind(this));
    this.listenTo(this.model, "sync", this.render);
  },

  slideshowLink: function(event){
    event.preventDefault;
    Backbone.history.navigate('/events/'+ this.model.id + '/slideshow', {trigger:true})
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


  // addPostView: function(post){
  //   var postItemShow = new Corky.Views.PostItemView({ model: post, collection: this.model.posts() });
  //   this.addSubview("#posts", postItemShow.render());
  //   $(window).resize();
  // },
  //
  // removePost: function(post){
  //   var selector = "#posts";
  //   var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === post} );
  //   this.removeSubview(selector, subRemove);
  // },



  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    // this.attachSubviews();
    this.$("#posts").gridalicious({
    });
    return this;
  }
})
