Corky.Views.EventShow = Backbone.View.extend({
  template: JST['events/show'],
  className: "show-page",


  initialize: function(){
    this.listenTo(this.model.posts(), "add", this.render)
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    this.$(".post-grid").gridalicious({
    });
    return this;
  }

});
