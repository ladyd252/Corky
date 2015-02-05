Corky.Views.EventsIndex = Backbone.CompositeView.extend({

  template: JST['events/index'],
  className: "index",

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addEvent);
    this.listenTo(this.collection, "remove", this.removeEvent)
    this.addNewEventView();
    this.collection.each(this.addEvent.bind(this));
  },

  addEvent: function(event){
    var eventItemShow = new Corky.Views.EventItemView({ model: event });
    this.addSubview(".events", eventItemShow.render());
  },

  removeEvent: function(event){
    var selector = ".events";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === event} );
    this.removeSubview(selector, subRemove);
  },

  addNewEventView: function(){
    var newEventView = new Corky.Views.NewEventView({collection: this.collection});
    this.addSubview(".events", newEventView.render());
  },

  render: function(){
    var content = this.template({events: this.collection})
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }



});
