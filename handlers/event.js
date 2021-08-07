const { readdirSync } = require('fs');
module.exports = client => {
	const load = dirs => {
		const events = readdirSync(`./events/${dirs}/`).filter(d =>
			d.endsWith('js')
		);
		for (let file of events) {
			let evt = require(`../events/${dirs}/${file}`);
			let eName = file.split('.')[0];
			client.on(eName, evt.bind(null, client));
			console.log(`\x1b[36m` + `[${eName} EVENT]: ☑️`);
		}
	};
	['client', 'guild'].forEach(x => load(x));
};
