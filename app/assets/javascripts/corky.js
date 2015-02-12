window.Corky = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Corky.pusher = new Pusher(PUSHER_APP_ID);
    new Corky.Routers.Router({
      "$rootEl" : $("#content")
    });
    Backbone.history.start()
  }
};
