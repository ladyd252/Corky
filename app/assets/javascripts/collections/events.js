Corky.Collections.Events = Backbone.Collection.extend({
  url: "/api/events",
  model: Corky.Models.Event,

  getOrFetch: function(id){
    var event = this.get(id);
    if(!event){
      event = new Corky.Models.Event({id: id});
    }
    var events = this;
    event.fetch({
      success: function(){
        events.add(event)
      }
    })
    return event
  }

});
