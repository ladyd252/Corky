Corky.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],

  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
