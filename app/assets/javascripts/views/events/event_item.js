Corky.Views.EventItemView = Backbone.View.extend({
  template: JST["events/event_item"],
  tagName: "li",

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
