'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.initialState = exports.channelReducer = void 0;

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty'),
);

var _seamlessImmutable = _interopRequireDefault(require('seamless-immutable'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

/** @type {import('./types').ChannelStateReducer} */
var channelReducer = function channelReducer(state, action) {
  switch (action.type) {
    case 'initStateFromChannel': {
      var channel = action.channel;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          messages: channel.state.messages,
          pinnedMessages: channel.state.pinnedMessages,
          read: channel.state.read,
          watchers: channel.state.watchers,
          members: channel.state.members,
          watcherCount: channel.state.watcher_count,
          loading: false,
        },
      );
    }

    case 'copyStateFromChannelOnEvent': {
      var _channel = action.channel;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          messages: _channel.state.messages,
          pinnedMessages: _channel.state.pinnedMessages,
          read: _channel.state.read,
          watchers: _channel.state.watchers,
          members: _channel.state.members,
          typing: _channel.state.typing,
          watcherCount: _channel.state.watcher_count,
        },
      );
    }

    case 'setThread': {
      var message = action.message;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          thread: message,
        },
      );
    }

    case 'loadMoreFinished': {
      var hasMore = action.hasMore,
        messages = action.messages;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          loadingMore: false,
          hasMore,
          messages,
        },
      );
    }

    case 'setLoadingMore': {
      var loadingMore = action.loadingMore;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          loadingMore,
        },
      );
    }

    case 'copyMessagesFromChannel': {
      var _channel2 = action.channel,
        parentId = action.parentId;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          messages: _channel2.state.messages,
          pinnedMessages: _channel2.state.pinnedMessages,
          threadMessages: parentId
            ? _channel2.state.threads[parentId] ||
              (0, _seamlessImmutable.default)([])
            : state.threadMessages,
        },
      );
    }

    case 'updateThreadOnEvent': {
      var _state$thread;

      var _channel3 = action.channel,
        _message = action.message;
      if (!state.thread) return state;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          threadMessages:
            (_state$thread = state.thread) !== null &&
            _state$thread !== void 0 &&
            _state$thread.id
              ? _channel3.state.threads[state.thread.id] ||
                (0, _seamlessImmutable.default)([])
              : (0, _seamlessImmutable.default)([]),
          thread:
            (_message === null || _message === void 0
              ? void 0
              : _message.id) === state.thread.id
              ? _channel3.state.messageToImmutable(_message)
              : state.thread,
        },
      );
    }

    case 'openThread': {
      var _message2 = action.message,
        _channel4 = action.channel;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          thread: _message2,
          threadMessages: _message2.id
            ? _channel4.state.threads[_message2.id] ||
              (0, _seamlessImmutable.default)([])
            : (0, _seamlessImmutable.default)([]),
        },
      );
    }

    case 'startLoadingThread': {
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          threadLoadingMore: true,
        },
      );
    }

    case 'loadMoreThreadFinished': {
      var threadHasMore = action.threadHasMore,
        threadMessages = action.threadMessages;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          threadHasMore,
          threadMessages,
          threadLoadingMore: false,
        },
      );
    }

    case 'closeThread': {
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          thread: null,
          threadMessages: (0, _seamlessImmutable.default)([]),
          threadLoadingMore: false,
        },
      );
    }

    case 'setError': {
      var error = action.error;
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          error,
        },
      );
    }

    default:
      return state;
  }
};
/** @type {import('./types').ChannelState} */

exports.channelReducer = channelReducer;
var initialState = {
  error: null,
  loading: true,
  loadingMore: false,
  hasMore: true,
  messages: (0, _seamlessImmutable.default)([]),
  pinnedMessages: (0, _seamlessImmutable.default)([]),
  typing: (0, _seamlessImmutable.default)(
    /** @type {any} infer from ChannelState */
    {},
  ),
  members: (0, _seamlessImmutable.default)(
    /** @type {any} infer from ChannelState */
    {},
  ),
  watchers: (0, _seamlessImmutable.default)(
    /** @type {any} infer from ChannelState */
    {},
  ),
  watcherCount: 0,
  read: (0, _seamlessImmutable.default)(
    /** @type {any} infer from ChannelState */
    {},
  ),
  thread: null,
  threadMessages: (0, _seamlessImmutable.default)([]),
  threadLoadingMore: false,
  threadHasMore: true,
};
exports.initialState = initialState;
