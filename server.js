const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	if(req.url === '/') {
		return fs.readFile('./main.html', (err, data) => {
			if(err) throw err;
			res.end(data);
		});
	} else if(req.url.startsWith('/time/')) {
		const sp = req.url.split('/');
		if(req.url == '/time/') {
			return fs.readFile('404.html', (err, data) => {
				if(err) throw err;
				res.end(data);
			});
		} else if(sp.length < 5) {
			let q = '';
			let loopcount = 5 - sp.length;
			for(let i=0; i<loopcount; i++)
				q += '/0';
			return res.end(`<script type="text/javascript">location.href+="${q}";</script>`);
		} else if (sp.length === 5 || (sp.length == 6 && sp[5] == '')) {
			return fs.readFile('./time.html', (err, data) => {
				if(err) throw err;
				res.end(data);
			});
		} return fs.readFile('404.html', (err, data) => {
			if(err) throw err;
			res.end(data);
		});
	} else if(req.url.startsWith('/query?') && req.url.split('?').length === 2) {
		const query = req.url.split('?')[1].split('&');
		let q = '/time';
		for(let i=0; i<query.length; i++)
			q += '/' + query[i].split('=')[1];
		return res.end(`<script type="text/javascript">location.href="${q}";</script>`);
	} return fs.readFile('404.html', (err, data) => {
		if(err) throw err;
		res.end(data);
	});
}).listen(80, () => {
	console.log('Server Running At Port 80');
});