'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useUserPresenceChangedListener = void 0;

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray'),
);

var _react = require('react');

var _context = require('../../../context');

// @ts-check

/**
 * @typedef {React.Dispatch<React.SetStateAction<import('stream-chat').Channel[]>>} SetChannels
 * @param {SetChannels} setChannels
 */
var useUserPresenceChangedListener = function useUserPresenceChangedListener(
  setChannels,
) {
  var _useContext = (0, _react.useContext)(_context.ChatContext),
    client = _useContext.client;

  (0, _react.useEffect)(function () {
    /** @param {import('stream-chat').Event} e */
    var handleEvent = function handleEvent(e) {
      setChannels(function (channels) {
        var newChannels = channels.map(function (channel) {
          var _e$user;

          if (
            !(
              (_e$user = e.user) !== null &&
              _e$user !== void 0 &&
              _e$user.id
            ) ||
            !channel.state.members[e.user.id]
          )
            return channel;
          channel.state.members.setIn([e.user.id, 'user'], e.user);
          return channel;
        });
        return (0, _toConsumableArray2.default)(newChannels);
      });
    };

    client.on('user.presence.changed', handleEvent);
    return function () {
      client.off('user.presence.changed', handleEvent);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

exports.useUserPresenceChangedListener = useUserPresenceChangedListener;
