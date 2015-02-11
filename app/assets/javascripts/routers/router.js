Corky.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = new Corky.Collections.Events();
    this.collection.fetch();
  },

  routes: {
    "" : "index",
    "events/new" : "new",
    "events/:id/slideshow" : "slideshow",
    "events/:id" : "slideshow",
  },

  index: function(){
    var indexView = new Corky.Views.EventsIndex({collection: this.collection});
    this._swapView(indexView);
  },

  new: function(){

  },

  show: function(id){
    var eventToShow = this.collection.getOrFetch(id);
    var showView = new Corky.Views.EventShow({model: eventToShow});
    this._swapView(showView);
  },

  slideshow: function(id){
    var eventToShow = this.collection.getOrFetch(id);
    var showView = new Corky.Views.SlideshowView({model: eventToShow});
    this._swapView(showView);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }

});
