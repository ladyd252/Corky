Corky.Views.PostItemView = Backbone.View.extend({
  template: JST['posts/show'],
  tagName: "a",

  initialize: function(){
    if(this.model.get("picture_url")){
      this.$el.attr("href", this.model.escape("picture_url"))
    }
  },

  render: function(){
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  }

})
