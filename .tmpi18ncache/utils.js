'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getDisplayImage = exports.getDisplayTitle = exports.getLatestMessagePreview = void 0;

var getLatestMessagePreview = function getLatestMessagePreview(channel, t) {
  var latestMessage = channel.state.messages[channel.state.messages.length - 1];

  if (!latestMessage) {
    return t('Nothing yet...');
  }

  if (latestMessage.deleted_at) {
    return t('Message deleted');
  }

  if (latestMessage.text) {
    return latestMessage.text;
  }

  if (latestMessage.command) {
    return '/'.concat(latestMessage.command);
  }

  if (latestMessage.attachments.length) {
    return t('🏙 Attachment...');
  }

  return t('Empty message...');
};

exports.getLatestMessagePreview = getLatestMessagePreview;

var getDisplayTitle = function getDisplayTitle(channel, currentUser) {
  var title = channel.data.name;
  var members = Object.values(channel.state.members);

  if (!title && members.length === 2) {
    var otherMember = members.find(function (m) {
      return m.user.id !== currentUser.id;
    });
    title = otherMember.user.name;
  }

  return title;
};

exports.getDisplayTitle = getDisplayTitle;

var getDisplayImage = function getDisplayImage(channel, currentUser) {
  var image = channel.data.image;
  var members = Object.values(channel.state.members);

  if (!image && members.length === 2) {
    var otherMember = members.find(function (m) {
      return m.user.id !== currentUser.id;
    });
    image = otherMember.user.image;
  }

  return image;
};

exports.getDisplayImage = getDisplayImage;
