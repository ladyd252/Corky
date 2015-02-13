Corky.Views.EventsIndex = Backbone.CompositeView.extend({

  template: JST['events/index'],
  className: "index",

  events: {
    "click .nav-tabs": "resizeWindow",
    "click .nav-tabs > li": "changeCurrentActive"
  },

  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addEventView);
    this.listenTo(this.collection, "remove", this.removeEvent);
    this.addNewEventView();
    this.collection.each(this.addEventView.bind(this));
    this.currentActiveSelector = "new";
    if(options.currentEventId){
      this.currentEventId = options.currentEventId;
    }
  },

  changeTab: function(id){
    this.$("#" + this.currentActiveSelector).removeClass("active");
    this.$("#" + id).addClass("active");
    this.$("." + this.currentActiveSelector).removeClass("active");
    this.$("." + id).addClass("active");
  },

  changeCurrentActive: function(event){
    var selector = $(event.currentTarget);
    var eventId = selector.attr("class");
    Backbone.history.navigate("events/" + eventId, {trigger: true})
  },

  addEventView: function(event){
    this.collection.getOrFetch(event.id)
    var eventItemShow = new Corky.Views.EventItemView({ model: event, collection: this.collection });
    this.addSubview(".tab-content", eventItemShow.render());
    var eventTabShow = new Corky.Views.EventTab({ model: event, collection: this.collection });
    this.addSubview(".events", eventTabShow.render());
  },

  removeEvent: function(event){
    var selector = ".tab-content";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === event} );
    this.removeSubview(selector, subRemove);
    selector = ".events";
    subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === event} );
    this.removeSubview(selector, subRemove);
    var newActive = this.$(".nav-tabs > li")[0]
    var newPanel = this.$(".tab-pane")[0]
    $(newActive).addClass("active")
    $(newPanel).addClass("active")
  },

  addNewEventView: function(){
    var newEventView = new Corky.Views.NewEventView({collection: this.collection});
    this.addSubview(".events", newEventView.render());
    var newEventFormView = new Corky.Views.NewEventFormView({collection: this.collection});
    this.addSubview(".tab-content", newEventFormView.render());
  },

  render: function(){
    var content = this.template({events: this.collection})
    this.$el.html(content);
    this.attachSubviews();
    if(this.currentEventId){
      this.changeTab(this.currentEventId)
    }
    return this;
  },

  resizeWindow: function () {
    $(window).resize();
  }

});
