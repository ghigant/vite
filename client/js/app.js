(function() {
  'use strict';

  /**************** UTILS ******************/
  function ucfirst(str) {
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
  }

  function isFn(fn) {
    return typeof fn === 'function';
  }

  function classExists(className) {
    return isFn(className);
  }

  /************** END UTILS ****************/

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

    this.$aside = new AsideMenu(this.$el.attr('data-target'));

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
          isFn(clickCallback) && clickCallback(item);
        });
      }

      return self;
    };
  })();
  var Elements = {};

  function ContentElement(parent) {
    this.$id = ID.generate();
    this.$parentCt = $(parent).get(0);

    this.$template = null;
    this.$el = null;
  }

  ContentElement.prototype._init = function() {
    if(this.$template) {
      this.$el = $(this.$template).attr('id', this.$id).get(0);
      $(this.$el).appendTo($(this.$parentCt));
    }
  }

  function HeadingElement() {
    ContentElement.apply(this, arguments);
    this.$template = '<h1>H1 Element</h1>';
    this._init();
  }

  HeadingElement.prototype = Object.create(ContentElement.prototype);
  HeadingElement.prototype.constructor = HeadingElement;
  Elements.HeadingElement = HeadingElement;

  // init dnd
  (function() {
    var body = $('body').get(0),
      dropArea = $('#drop-area').get(0),
      droppableArr = [],
      dropAreaTimeout;

    $('#drop-area .drop-area__item').each(function() {
        var el = this;
        droppableArr.push( new Droppable(el, {
  				onDrop : function( instance, draggableEl ) {
  					$(instance.el).addClass('drop-feedback');
            clearTimeout(instance.checkmarkTimeout);
  					instance.checkmarkTimeout = setTimeout( function() {
  						$(instance.el).removeClass('drop-feedback');
  					}, 800);
            var type = $(draggableEl).attr('data-type'),
              className = ucfirst(type) + 'Element';

            if(classExists(Elements[className])) {
              var element = new Elements[className]($(instance.el));
              // console.log(element);
            }

            // var className = draggable.getType();
            // if(classExists(Elements[className])) {
            //   var element = new Elements[className]($('#drop-area .drop-area__item'));
            //   console.log(element);
            // }
        	}
  			}));
    });

    $('.draggable').each(function() {
      var el = this,
        draggable = new Draggable( el, droppableArr, {
  			draggabilly : { containment: body },
  			onStart : function() {
  				// add class 'drag-active' to body
          $(body).addClass('drag-active');
          // clear timeout: dropAreaTimeout (toggle drop area)
  				clearTimeout( dropAreaTimeout );
  				// show dropArea
          $(dropArea).addClass('show');
  			},
  			onEnd : function( wasDropped ) {
  				var afterDropFn = function() {
  					// hide dropArea
            $(dropArea).removeClass('show');
  					// remove class 'drag-active' from body
  					$(body).removeClass('drag-active');
          };

  				if( !wasDropped ) {
  					afterDropFn();
  				}
  				else {
  					// after some time hide drop area and remove class 'drag-active' from body
  					clearTimeout( dropAreaTimeout );
  					dropAreaTimeout = setTimeout( afterDropFn, 400 );
          }
  			}
  		});
    });
  })();

  var Vite = {};

  Vite.init = function() {
    SideMenu('.tools', 'li');
  };

  $(function() {
    Vite.init();
  });
})();
