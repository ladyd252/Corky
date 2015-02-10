Corky.Views.EventItemView = Backbone.View.extend({
  template: JST["events/event_item"],
  className: "tab-pane",

  events:{
    "click .delete-event" : "deleteEvent"
  },

  initialize: function(){
    this.$el.attr("id", this.model.id);
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
