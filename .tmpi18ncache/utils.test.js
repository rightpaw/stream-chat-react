'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

require('@testing-library/jest-dom');

var _uuid = require('uuid');

var _mockBuilders = require('mock-builders');

var _utils = require('../utils');

describe('ChannelPreview utils', function () {
  var clientUser = (0, _mockBuilders.generateUser)();
  var chatClient;

  var getQueriedChannelInstance = /*#__PURE__*/ (function () {
    var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/ _regenerator.default.mark(function _callee(c) {
        var channel;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                // eslint-disable-next-line react-hooks/rules-of-hooks
                (0, _mockBuilders.useMockedApis)(chatClient, [
                  (0, _mockBuilders.getOrCreateChannelApi)(c),
                ]);
                channel = chatClient.channel('messaging');
                _context.next = 4;
                return channel.watch();

              case 4:
                return _context.abrupt('return', channel);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    return function getQueriedChannelInstance(_x) {
      return _ref.apply(this, arguments);
    };
  })();

  beforeEach(
    /*#__PURE__*/ (0, _asyncToGenerator2.default)(
      /*#__PURE__*/ _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2;
                return (0, _mockBuilders.getTestClientWithUser)(clientUser);

              case 2:
                chatClient = _context2.sent;

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2);
      }),
    ),
  );
  describe('getLatestMessagePreview', function () {
    var channelWithEmptyMessage = (0, _mockBuilders.generateChannel)();
    var customMessage = (0, _mockBuilders.generateMessage)();
    var channelWithTextMessage = (0, _mockBuilders.generateChannel)({
      messages: [customMessage],
    });
    var channelWithDeletedMessage = (0, _mockBuilders.generateChannel)({
      messages: [
        (0, _mockBuilders.generateMessage)({
          deleted_at: new Date(),
        }),
      ],
    });
    var channelWithAttachmentMessage = (0, _mockBuilders.generateChannel)({
      messages: [
        (0, _mockBuilders.generateMessage)({
          text: undefined,
          attachments: [(0, _mockBuilders.generateImageAttachment)()],
        }),
      ],
    });
    it.each([
      ['Nothing yet...', 'channelWithEmptyMessage', channelWithEmptyMessage],
      [
        'Message deleted',
        'channelWithDeletedMessage',
        channelWithDeletedMessage,
      ],
      [
        '🏙 Attachment...',
        'channelWithAttachmentMessage',
        channelWithAttachmentMessage,
      ],
      [customMessage.text, 'channelWithTextMessage', channelWithTextMessage],
    ])(
      'should return %s for %s',
      /*#__PURE__*/ (function () {
        var _ref3 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee3(
            expectedValue,
            testCaseName,
            c,
          ) {
            var t, channel;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    t = function t(text) {
                      return text;
                    };

                    _context3.next = 3;
                    return getQueriedChannelInstance(c);

                  case 3:
                    channel = _context3.sent;
                    expect(
                      (0, _utils.getLatestMessagePreview)(channel, t),
                    ).toBe(expectedValue);

                  case 5:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3);
          }),
        );

        return function (_x2, _x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      })(),
    );
  });
  describe('getDisplayTitle', function () {
    it(
      'should return channel name, if it exists',
      /*#__PURE__*/ (0, _asyncToGenerator2.default)(
        /*#__PURE__*/ _regenerator.default.mark(function _callee4() {
          var name, channel;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  name = (0, _uuid.v4)();
                  _context4.next = 3;
                  return getQueriedChannelInstance(
                    (0, _mockBuilders.generateChannel)({
                      channel: {
                        name,
                      },
                    }),
                  );

                case 3:
                  channel = _context4.sent;
                  expect(
                    (0, _utils.getDisplayTitle)(channel, chatClient.user),
                  ).toBe(name);

                case 5:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4);
        }),
      ),
    );
    it(
      'should return name of other member of conversation if only 2 members and channel name doesnot exist',
      /*#__PURE__*/ (0, _asyncToGenerator2.default)(
        /*#__PURE__*/ _regenerator.default.mark(function _callee5() {
          var otherUser, channel;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  otherUser = (0, _mockBuilders.generateUser)();
                  _context5.next = 3;
                  return getQueriedChannelInstance(
                    (0, _mockBuilders.generateChannel)({
                      members: [
                        (0, _mockBuilders.generateMember)({
                          user: otherUser,
                        }),
                        (0, _mockBuilders.generateMember)({
                          user: clientUser,
                        }),
                      ],
                    }),
                  );

                case 3:
                  channel = _context5.sent;
                  expect(
                    (0, _utils.getDisplayTitle)(channel, chatClient.user),
                  ).toBe(otherUser.name);

                case 5:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5);
        }),
      ),
    );
  });
  describe('getDisplayImage', function () {
    it(
      'should return channel image, if it exists',
      /*#__PURE__*/ (0, _asyncToGenerator2.default)(
        /*#__PURE__*/ _regenerator.default.mark(function _callee6() {
          var image, channel;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  image = (0, _uuid.v4)();
                  _context6.next = 3;
                  return getQueriedChannelInstance(
                    (0, _mockBuilders.generateChannel)({
                      channel: {
                        image,
                      },
                    }),
                  );

                case 3:
                  channel = _context6.sent;
                  expect(
                    (0, _utils.getDisplayImage)(channel, chatClient.user),
                  ).toBe(image);

                case 5:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6);
        }),
      ),
    );
    it(
      'should return picture of other member of conversation if only 2 members and channel name doesnot exist',
      /*#__PURE__*/ (0, _asyncToGenerator2.default)(
        /*#__PURE__*/ _regenerator.default.mark(function _callee7() {
          var otherUser, channel;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  otherUser = (0, _mockBuilders.generateUser)();
                  _context7.next = 3;
                  return getQueriedChannelInstance(
                    (0, _mockBuilders.generateChannel)({
                      members: [
                        (0, _mockBuilders.generateMember)({
                          user: otherUser,
                        }),
                        (0, _mockBuilders.generateMember)({
                          user: clientUser,
                        }),
                      ],
                    }),
                  );

                case 3:
                  channel = _context7.sent;
                  expect(
                    (0, _utils.getDisplayImage)(channel, chatClient.user),
                  ).toBe(otherUser.image);

                case 5:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7);
        }),
      ),
    );
  });
});
