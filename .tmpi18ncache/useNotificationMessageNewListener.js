'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useNotificationMessageNewListener = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray'),
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

var _react = require('react');

var _lodash = _interopRequireDefault(require('lodash.uniqby'));

var _context2 = require('../../../context');

var _utils = require('../utils');

// @ts-check

/**
 * @typedef {import('stream-chat').Event} NotificationAddedToChannelEvent
 * @typedef {React.Dispatch<React.SetStateAction<import('stream-chat').Channel[]>>} SetChannels
 * @param {SetChannels} setChannels
 * @param {(setChannels: SetChannels, event: NotificationAddedToChannelEvent) => void} [customHandler]
 */
var useNotificationMessageNewListener = function useNotificationMessageNewListener(
  setChannels,
  customHandler,
) {
  var _useContext = (0, _react.useContext)(_context2.ChatContext),
    client = _useContext.client;

  (0, _react.useEffect)(
    function () {
      /** @param {import('stream-chat').Event} e */
      var handleEvent = /*#__PURE__*/ (function () {
        var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee(e) {
            var _e$channel;

            var channel;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    if (
                      !(customHandler && typeof customHandler === 'function')
                    ) {
                      _context.next = 4;
                      break;
                    }

                    customHandler(setChannels, e);
                    _context.next = 9;
                    break;

                  case 4:
                    if (
                      !(
                        (_e$channel = e.channel) !== null &&
                        _e$channel !== void 0 &&
                        _e$channel.type
                      )
                    ) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 7;
                    return (0, _utils.getChannel)(
                      client,
                      e.channel.type,
                      e.channel.id,
                    );

                  case 7:
                    channel = _context.sent;
                    // move channel to starting position
                    setChannels(function (channels) {
                      return (0,
                      _lodash.default)([channel].concat((0, _toConsumableArray2.default)(channels)), 'cid');
                    });

                  case 9:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        );

        return function handleEvent(_x) {
          return _ref.apply(this, arguments);
        };
      })();

      client.on('notification.message_new', handleEvent);
      return function () {
        client.off('notification.message_new', handleEvent);
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [customHandler],
  );
};

exports.useNotificationMessageNewListener = useNotificationMessageNewListener;
