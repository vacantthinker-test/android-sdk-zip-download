const move_extract_folder = require("./second");
const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')

// ==========================================================================================
const zips_path = path.dirname(__dirname)
// console.log(zips_path);
const ext_zip = ".zip"
function unzip_and_move_folder() {
	// execSync(`SETX PATH "C:\\Program Files\\7-Zip;%PATH%"`)
	execSync(`SETX ANDROID_HOME C:\\Users\\Public\\AppData\\Android\\Sdk`)
	console.log('开始工作')
	fs.readdirSync(zips_path).forEach((item_name) => {
		if (item_name.endsWith(ext_zip)) {
			let item_path = path.join(zips_path, item_name)
			// console.log(item_path);
			
			let extract_path = item_path.substring(0, item_path.indexOf(ext_zip))
			fs.stat(extract_path, err => {
				if (!err) {
					move_extract_folder(extract_path)
				} else {
					// 7z 命令行 解压缩 所有zip文件 同步方式
					execSync(`7z x ${item_path} -o${extract_path} -y`)
					move_extract_folder(extract_path)
				}
			});
		}
	})
}

unzip_and_move_folder();
