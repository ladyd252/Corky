Corky.Views.EventShow = Backbone.View.extend({
  template: JST['events/show'],
  className: "show-page",


  initialize: function(){
    this.listenTo(this.model.posts(), "sync add", this.render)
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content).hide().fadeIn();
    return this;
  }

});
