const { enhanceImage } = require('xstro');
const { handler } = require('../lib');

handler(
 {
  pattern: 'upscale',
  alias: 'enhance',
  desc: 'enchnace image quality',
  type: 'ai',
 },
 async (message) => {
  if (!message.mode) return;
  if (message.isban) return await message.reply(ban);
  if (!message.reply_message?.image) return message.reply('_Reply An Image_');
  const req = await message.download(message.reply_message.data);
  const res = await enhanceImage(req.buffer, 'enhance');
  return await message.send(res);
 }
);

handler(
 {
  pattern: 'recolor',
  desc: 'Recolors Dead Images',
  type: 'ai',
 },
 async (message) => {
  if (!message.mode) return;
  if (message.isban) return await message.reply(ban);
  if (!message.reply_message?.image) return message.reply('_Reply An Image_');
  const req = await message.download(message.reply_message.data);
  const res = await enhanceImage(req.buffer, 'recolor');
  return await message.send(res);
 }
);

handler(
 {
  pattern: 'dehaze',
  desc: 'Add dehaze effect to an image',
  type: 'ai',
 },
 async (message) => {
  if (!message.mode) return;
  if (message.isban) return await message.reply(ban);
  if (!message.reply_message?.image) return message.reply('_Reply An Image_');
  const req = await message.download(message.reply_message.data);
  const res = await enhanceImage(req.buffer, 'dehaze');
  return await message.send(res);
 }
);
