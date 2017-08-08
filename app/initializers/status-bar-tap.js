export function initialize(/* application */) {
  window.addEventListener('statusTap', function() {
    $('html,body').animate({ scrollTop: 0 }, 'fast');
  });
}

export default {
  name: 'status-bar-tap',
  initialize
};
