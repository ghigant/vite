(function() {
  'use strict';

  var ID = (function() {
    var id = 0;
    return {
      generate: function() {
        return 'vite-' + (++id);
      }
    }
  })();

  function AsideMenu(el) {
    var self = this;
    self.$el = $(el);

    self.$el.on('click', 'a.close-menu', function() {
      self.hide();
    });

    self.show = function() {
      self.$el.addClass('cbp-spmenu-open');
    }

    self.hide = function() {
      self.$el.removeClass('cbp-spmenu-open');
    }
  }

  function SideMenuItem(el) {
    this.$el = $(el);
    this.$id = ID.generate();
    this.$el.attr('id', this.$id);

    this.$aside = new AsideMenu('#' + this.$el.attr('data-target'));

    this.active = function(status) {
      status = status !== false;
      if(status) {
        this.$el.addClass('active');
        this.$aside.show();
      } else {
        this.$el.removeClass('active');
        this.$aside.hide();
      }

      return this;
    }

    this.isActive = function() {
      return this.$el.hasClass('active');
    }
  }

  var SideMenu = (function() {
    var self = {
      el: null,
      activeEl: null,
      items: {}
    };

    return function(selector, itemSelector, clickCallback) {
      selector = selector || '.tools';
      itemSelector = itemSelector || 'li';

      if(self.el === null) {
        self.el = $(selector);
        self.el.find(itemSelector).each(function(index, el) {
          var item = new SideMenuItem($(el));
          self.items[item.$id] = item;
        });
        self.el.on('click', itemSelector, function(event) {
          var id = $(event.currentTarget).attr('id');

          var item = self.items[id];
          item && item.active(!item.isActive());
          $.each(self.items, function(key, value) {
            if(key !== id) {
              value.active(false);
            }
          });
          clickCallback(item);
        });
      }

      return self;
    };
  })();

  var Vite = {};

  Vite.init = function() {
    SideMenu('.tools', 'li', function(menuItem) {
      // console.log(menuItem);
    });
  };

  $(function() {
    Vite.init();
  });
})();
