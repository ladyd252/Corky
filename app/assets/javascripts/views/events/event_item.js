Corky.Views.EventItemView = Backbone.View.extend({
  template: JST["events/event_item"],
  tagName: "li",

  events:{
    "click .delete-item" : "deleteEvent",
    "click .link-show" : "showEvent"
  },

  deleteEvent: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
