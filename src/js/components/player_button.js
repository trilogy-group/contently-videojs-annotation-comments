/*
    Component main 'annotation toggle' button in the player controls, including notifier for # annotations
*/

const $ = require('jquery');
const PlayerUIComponent = require('./../lib/player_ui_component');

const templateName = 'player_button';

module.exports = class PlayerButton extends PlayerUIComponent {
  constructor(player) {
    super(player);
    this.render();

    this.initAPI(this, 'PlayerButton');

    this.$el.on('click.vac-player-button', () => {
      this.plugin.toggleAnnotationMode();
    });
  }

  // Add button to player
  render() {
    const btn = this.player.getChild('controlBar').addChild('button', {});
    btn.controlText('Toggle Annotations');
    this.$el = $(btn.el());
    this.$el
      .addClass('vac-player-btn')
      .find('.vjs-icon-placeholder')
      .html(this.renderTemplate(templateName));
  }

  // Update the number of annotations displayed in the bubble
  updateNumAnnotations() {
    const num = this.plugin.annotationState.annotations.length;
    const $bubble = this.$el.find('b');
    $bubble.text(num);
    num > 0
      ? $bubble.removeClass(this.UI_CLASSES.hidden)
      : $bubble.addClass(this.UI_CLASSES.hidden);
  }

  // Unbind event listeners on teardown and remove DOM nodes
  teardown() {
    this.$el.off('click.vac-player-button');
    super.teardown();
  }
};
