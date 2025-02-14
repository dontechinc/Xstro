const { tiny } = require('xstro');
const { handler, commands, runtime, getBuffer } = require('../lib');

handler(
 {
  pattern: 'menu',
  description: 'Show All Commands',
  dontAddCommandList: true,
 },
 async (message) => {
  if (!message.mode) return;
  if (message.isban) return message.reply(ban);
  const { prefix, sender } = message;
  const currentTime = new Date().toLocaleTimeString('en-IN', {
   timeZone: process.env.TZ,
  });
  const currentDay = new Date().toLocaleDateString('en-US', {
   weekday: 'long',
  });
  const currentDate = new Date().toLocaleDateString('en-IN', {
   timeZone: process.env.TZ,
  });
  let menuText = `\`\`\`╭─ xstro-md ───
│ Prefix: ${prefix}
│ User: ${sender}
│ Plugins: ${commands.length}
│ Runtime: ${runtime(process.uptime())}
│ Time: ${currentTime}
│ Day: ${currentDay}
│ Date: ${currentDate}
│ Version: ${require('../package.json').version}
╰────────────────\`\`\`\n`;

  let commandCounter = 1;
  const categorized = commands
   .filter((cmd) => cmd.pattern && !cmd.dontAddCommandList)
   .map((cmd) => ({
    name: cmd.pattern.toString().split(/\W+/)[2],
    category: cmd.type?.toLowerCase() || 'misc',
   }))
   .reduce((acc, { name, category }) => {
    acc[category] = (acc[category] || []).concat(name);
    return acc;
   }, {});

  Object.keys(categorized).forEach((category) => {
   menuText += tiny(`\n╭── *${category}* ────\n`);
   categorized[category].forEach((cmd) => {
    menuText += tiny(`│ *_${commandCounter}. ${cmd}_*\n`);
    commandCounter++;
   });
   menuText += tiny(`╰──────────────\n`);
  });
  return await message.send(menuText);
 }
);

handler(
 {
  pattern: 'list',
  description: 'Show All Commands',
  dontAddCommandList: true,
 },
 async (message) => {
  if (!message.mode) return;
  if (message.isban) return message.reply(ban);
  let commandListText = '*about commands*\n\n';
  const commandList = [];
  commands.forEach((command) => {
   if (command.pattern && !command.dontAddCommandList) {
    const commandName = command.pattern.toString().split(/\W+/)[2];
    const description = command.desc || command.info || 'No description available';
    commandList.push({
     name: commandName,
     description,
    });
   }
  });
  commandList.sort((a, b) => a.name.localeCompare(b.name));
  commandList.forEach(({ name, description }, index) => {
   commandListText += `\`\`\`${index + 1}. ${name.trim()}\`\`\`\n`;
   commandListText += `Use: \`\`\`${description}\`\`\`\n\n`;
  });
  return await message.reply(tiny(commandListText));
 }
);

handler(
 {
  pattern: 'help',
  desc: 'xstro support',
  type: 'user',
 },
 async (message) => {
  const name = tiny(`astro`),
   title = tiny(`xstro support`),
   number = '2348039607375',
   body = tiny(`fx astro`);
  const image = 'https://avatars.githubusercontent.com/u/183214515?v=4',
   sourceUrl = 'https://github.com/AstroX10/Xstro';
  const logo = await getBuffer(image);
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG: made by astro;\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`;
  const info = { title, body, thumbnail: logo, mediaType: 1, mediaUrl: sourceUrl, sourceUrl, showAdAttribution: true, renderLargerThumbnail: false };
  await message.client.sendMessage(message.jid, { contacts: { displayName: name, contacts: [{ vcard }] }, contextInfo: { externalAdReply: info } }, { quoted: message });
 }
);
