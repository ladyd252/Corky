Corky.Views.NewEventView = Backbone.View.extend({
  template: JST["events/new_event"],
  tagName: "li",
  className: "active",

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

})
