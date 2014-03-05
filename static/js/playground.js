/*var data = {
		app_id: this.appId,
		email: this.email,
		hashed_pswd: this.getPasswordHash(),
		machine_id: ids.machine_id,
		installer_id: ids.installer_id
	};*/

	function getAuthKey(email, password) {
		return CryptoJS.SHA512(password + email).toString();
	}

	function getSign(token, data) {
		return CryptoJS.SHA1(
			[
				CryptoJS.MD5(data || '[]').toString(),
				CryptoJS.MD5(token).toString()
			].join('')
		).toString();
	}

	function getKey(email, password) {
		var hash = password;
		for(var i=0; i<1000; ++i) {
			hash += password;
			if((i%5) === 0) {
				hash += email;
			}
			hash = CryptoJS.SHA512(hash).toString();
		}
		return hash;
	}

	var em = 'CryptoJStest2@test.com';
	var ps = 'Password';

	$(function() {
		$.get('/api/get_connection/', {
			email: em,
			hashed_pswd: getAuthKey(em, ps),
			machine_id: '',
			installer_id: ''
		}, function(res) {
			$('body').text(res);

			var res = window.res = JSON.parse(res);
			ws = new WebSocket('wss://syncpass.safer.com:8443/websocket?auth_key=' + res.auth_key);
			
			ws.onopen = function() {
				// console.log('OPPENED, PROFIT, FUCK YEAH, IT WORKS, ROCK THIS SHIT')
				ws.send(JSON.stringify({
					timestamp: 0,
					sign: getSign(res.sign_key),
					action: 'get_updates'
				}));
			}

			// ws.onerror = function() {
			// 	alert('ERROR :(');
			// }

			ws.onclose = function() {
				alert('CLOSED :(');
			}

			var key = 'a5b8cd181054cd714d31bb1fa6219b088328661f6b44a94c31be701c95120ba56299d5f5b20eb2fe76ce596904e3f497836336c5c7bfe1ae53bcd3e61013ec62'; 

			ws.onmessage = function(e) {
				var data = JSON.parse(e.data);
				var k = CryptoJS.enc.Latin1.parse(getKey(em, ps));
				records = data.records.map(function(arr) {
					var d = [arr[0]]
					var res = {};
					if(e) {
						try {
							iv = CryptoJS.enc.Hex.parse('');
							var data = JSON.parse(CryptoJS.AES.decrypt({
							 iv: iv,
							 key: k,
							 ciphertext: CryptoJS.enc.Base64.parse(arr[1])
							}, k, {
							   iv: iv
							}).toString(CryptoJS.enc.Utf8));
							d.push(data);
						}
						catch(e){
							d.push('');
						}
					}
					return d;
					// return {
					// 	id: arr[0],
					// 	data: CryptoJS.
					// }
				});

				// console.log('Records decrypted')
				document.body.innerHTML += '<br><br>' + JSON.stringify(e.data);
			}
		});
	});