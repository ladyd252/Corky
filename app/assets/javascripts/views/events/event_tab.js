Corky.Views.EventTab = Backbone.View.extend({
  template: JST["events/event_tab"],
  tagName: "li",

  initialize: function(){
    this.listenTo(this.model, "change", this.render)
    this.$el.attr("class", this.model.id);
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
