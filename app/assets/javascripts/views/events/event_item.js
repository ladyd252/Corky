Corky.Views.EventItemView = Backbone.View.extend({
  template: JST["events/event_item"],
  className: "tab-pane",

  events:{
    "click .delete-event" : "deleteEvent",
    "dblclick li.title" : "editTitle",
    "dblclick li.date" : "editDate",
    "blur input.title": "saveTitle",
    "blur input.date": "saveDate"
  },

  initialize: function(){
    this.$el.attr("id", this.model.id);
  },

  deleteEvent: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  editTitle: function(){
    var inputBox = JST["events/edit_title_form"]({event: this.model});
    this.$el.find("li.title").html(inputBox);
  },

  saveTitle: function () {
    var title = $("input.title").val();
    this.model.set("title", title);
    this.model.save();
    this.render()
  },

  editDate: function(){
    var inputBox = JST["events/edit_date_form"]({event: this.model});
    this.$el.find("li.date").html(inputBox);
  },

  saveDate: function () {
    var date = $("input.date").val();
    this.model.set("event_date", date);
    this.model.save();
    this.render()
  },


  render: function(){
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
