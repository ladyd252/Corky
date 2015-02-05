Corky.Views.NewEventView = Backbone.View.extend({
  template: JST["events/new_event"],
  tagName: "li",

  events:{
    "submit .event-form" : "addEvent"
  },

  addEvent: function(event){
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var newEvent = new Corky.Models.Event();
    var collection = this.collection;
    newEvent.save(params, {
      success: function(){
        collection.add(newEvent);
      }
      // error do something with form
    })
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

})
