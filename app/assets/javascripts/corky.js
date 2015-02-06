window.Corky = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Corky.Routers.Router({
      "$rootEl" : $("#content")
    });
    Backbone.history.start()
  }
};
