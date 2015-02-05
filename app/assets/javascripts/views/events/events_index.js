Corky.Views.EventsIndex = Backbone.CompositeView.extend({

  template: JST['events/index'],
  className: "index",

  events:{
    "submit .event-form" : "addEvent"
  },

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addEventView);
    this.listenTo(this.collection, "remove", this.removeEvent)
    // this.addNewEventView();
    this.collection.each(this.addEvent.bind(this));
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

  addEventView: function(event){
    var eventItemShow = new Corky.Views.EventItemView({ model: event, collection: this.collection });
    this.addSubview(".events", eventItemShow.render());
  },

  removeEvent: function(event){
    var selector = ".events";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === event} );
    this.removeSubview(selector, subRemove);
  },

  // addNewEventView: function(){
  //   var newEventView = new Corky.Views.NewEventView({collection: this.collection});
  //   this.addSubview(".events", newEventView.render());
  // },

  render: function(){
    var content = this.template({events: this.collection})
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }



});
