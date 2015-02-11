Corky.Views.PostItemView = Backbone.View.extend({
  template: JST['posts/show'],
  tagName: "a",

  initialize: function(){
    if(this.model.get("picture_url")){
      this.$el.attr("href", this.model.escape("picture_url"))
    }else{
      this.$el.attr("href", "https://www.solidbackgrounds.com/images/1152x864/1152x864-cream-solid-color-background.jpg")
    }
  },

  render: function(){
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  }

})
