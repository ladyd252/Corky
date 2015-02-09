Corky.Views.EventTab = Backbone.View.extend({
  template: JST["events/event_tab"],
  tagName: "li",

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
