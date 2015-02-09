Corky.Views.EventItemView = Backbone.View.extend({
  template: JST["events/event_item"],
  className: "tab-pane",

  initialize: function(){
    this.$el.attr("id", this.model.id);
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
