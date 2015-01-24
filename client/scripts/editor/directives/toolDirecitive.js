(function() {
  'use strict';

  angular.module('vite.editor')
    .directive('editorTool', [
      function() {
        return {
          restict: 'E',
          scope: {
            info: '='
          },
          replace: true,
          template: [
            '<li ng-class="{\'active\': info.active}">',
              '<span class="{{info.icon}}"></span>',
              '<p>{{info.text}}</p>',
            '</li>'
          ].join('')
        }
      }
    ]);
})();
