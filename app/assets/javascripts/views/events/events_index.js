Corky.Views.EventsIndex = Backbone.CompositeView.extend({

  template: JST['events/index'],
  className: "index",

  events:{
    "submit .event-form" : "addEvent"
  },

  initialize: function(){
    this.listenTo(this.collection, "sync add remove", this.render);
    // this.listenTo(this.collection, "add", this.addEventView);
    // this.listenTo(this.collection, "remove", this.removeEvent)
    // this.collection.each(this.addEventView.bind(this));
    // this.addNewEventView();
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
  //
  // addEventView: function(event){
  //   var eventItemShow = new Corky.Views.EventItemView({ model: event, collection: this.collection });
  //   this.addSubview(".tab-content", eventItemShow.render());
  // },
  //
  // removeEvent: function(event){
  //   var selector = ".tab-content";
  //   var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === event} );
  //   this.removeSubview(selector, subRemove);
  // },
  //
  // addNewEventView: function(){
  //   var newEventView = new Corky.Views.NewEventView({collection: this.collection});
  //   this.addSubview(".tab-content", newEventView.render());
  // },

  render: function(){
    var content = this.template({events: this.collection})
    this.$el.html(content);
    // this.attachSubviews();
    return this;
  }



});
