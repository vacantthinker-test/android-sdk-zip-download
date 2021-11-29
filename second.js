const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')

const build_tools = "build-tools"
const platforms = "platforms"
const sources = "sources"
const tools = "tools"
const emulator = "emulator"
const patcher = "patcher"
const system_images = "system-images"
const storage_sdk_path = path.join('C:', 'Users', 'Public', 'AppData', 'Android', 'Sdk')

function create_sdk_sub_folder() {
	function exec_create_action(create_path) {
		let s = path.join(storage_sdk_path, create_path);
		fs.stat(s, err => {
			if (!err) {
				console.log(`${create_path} 文件夹已存在`)
			} else {
				console.log(`${create_path} 不存在 创建该文件夹`)
				fs.mkdirSync(s)
			}
		});
	}
	
	exec_create_action(build_tools);
	exec_create_action(platforms);
	exec_create_action(sources);
	exec_create_action(tools)
	exec_create_action(emulator)
	exec_create_action(patcher)
	exec_create_action(system_images)
}

create_sdk_sub_folder();

// =============================================================================================
let regExp_system_images = /(x[0-9]+)-([0-9]+)_r[0-9]+/
function system_images_dir_move(item_path){
	if (regExp_system_images.test(item_path)) {
		console.log(item_path)
		let match = item_path.match(regExp_system_images)
		if (match && match.length > 0){
			let arch_v = match[1]
			let android_v = match[2]
			console.log(arch_v, android_v)
			// fs.readdirSync(item_path, )
			let source_dir_path__ = path.join(item_path, arch_v)
			let target_dir_path = path.join(storage_sdk_path, system_images, 'android-' + android_v, 'google_apis_playstore', arch_v)
			// console.log(source_dir_path__);
			// console.log(target_dir_path)
			
			fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
			console.log(`${system_images} ${source_dir_path__} 文件夹移动完成`)
			fs.rmdirSync(item_path)
		}
	}
}
// =============================================================================================

let regExp_build_tools = /build-tools_r([0-9.]+)-windows/
let regExp_dot_dotStr = /[0-9]+.[0-9]+.[0-9]+/
let regExp_dotStr = /[0-9]+.[0-9]+/
let regExp_number = /[0-9]+/

function build_tools_dir_move(item_path) {
	if (regExp_build_tools.test(item_path)) {
		let match = item_path.match(regExp_build_tools);
		if (match && match.length > 0) {
			let sdk_version_name = match[1].toString()
			let sdk_version = ''
			if (regExp_dot_dotStr.test(sdk_version_name)) {
				sdk_version = sdk_version_name
			} else if (regExp_dotStr.test(sdk_version_name)) {
				sdk_version = sdk_version_name + '.0'
			} else if (regExp_number.test(sdk_version_name)) {
				sdk_version = sdk_version_name + '.0.0'
			}
			// console.log('sdk_version', sdk_version)
			// console.log('item_path', item_path)
			let source_dir_name = fs.readdirSync(item_path)[0];
			// console.log(source_dir_name)
			if (source_dir_name !== undefined) {
				let source_dir_path__ = path.join(item_path, source_dir_name)
				// console.log(sdk_version, source_dir_path__);
				let target_dir_path = path.join(storage_sdk_path, build_tools, sdk_version)
				fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
				console.log(`${build_tools} ${source_dir_path__} 文件夹 移动完成 ... `)
				fs.rmdirSync(item_path)
			}
		}
	}
}

//===================================================================
let regExp_platform = /platform-([0-9]+)_|android-([0-9]+)_/

function platform_dir_move(item_path) {
	// console.log('item_path', item_path)
	if (regExp_platform.test(item_path)) {
		let match = item_path.match(regExp_platform);
		// console.log('match', match)
		if (match && match.length > 0) {
			let platform_version = match[1] || match[2]
			if (platform_version) {
				console.log('platform_version',platform_version)
				let source_dir_path__ = path.join(item_path, fs.readdirSync(item_path)[0])
				let target_dir_path = path.join(storage_sdk_path, platforms, 'android-' + platform_version)
				// console.log('source_dir_path__', source_dir_path__)
				// console.log('target_dir_path', target_dir_path)
				fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
				console.log(`${platforms} ${source_dir_path__} 文件夹移动完成 ... `)
				fs.rmdirSync(item_path)
				
			}
		}
	}
}

//===================================================================
let regExp_sources = /sources-([0-9]+)_/

function sources_dir_move(item_path) {
	if (regExp_sources.test(item_path)) {
		// console.log('item_path', item_path)
		let match = item_path.match(regExp_sources);
		if (match && match.length > 0) {
			let version = match[1]
			// console.log('version',version)
			let sub_name = fs.readdirSync(item_path)[0];
			if (sub_name) {
				// console.log(sub_name)
				let source_dir_path__ = path.join(item_path, sub_name)
				let target_dir_path = path.join(storage_sdk_path, sources, 'android-' + version)
				// console.log('source_dir_path__', source_dir_path__)
				// console.log('target_dir_path', target_dir_path)
				fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
				console.log(`${sources} ${source_dir_path__} 文件夹移动完成 ... `)
				fs.rmdirSync(item_path)
			}
		}
	}
}

//===================================================================
let regExp_tools = /sdk-tools-windows-[0-9]+/

function tools_dir_move(item_path) {
	if (regExp_tools.test(item_path)) {
		// console.log('tools', item_path)
		let sub_name = fs.readdirSync(item_path)[0]
		// console.log(sub_name);
		let source_dir_path__ = path.join(item_path, sub_name)
		let target_dir_path = path.join(storage_sdk_path, tools)
		fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
		console.log(`${tools} ${source_dir_path__} 文件夹移动完成`)
		fs.rmdirSync(item_path)
	}
}

//===================================================================
let regExp_emulator = /emulator-windows_x64-[0-9]+/
function emulator_dir_move(item_path){
	if (regExp_emulator.test(item_path)) {
		// console.log('tools', item_path)
		let sub_name = fs.readdirSync(item_path)[0]
		// console.log(sub_name);
		let source_dir_path__ = path.join(item_path, sub_name)
		let target_dir_path = path.join(storage_sdk_path, emulator)
		fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
		console.log(`${emulator} ${source_dir_path__} 文件夹移动完成`)
		fs.rmdirSync(item_path)
	}
}
//===================================================================
let regExp_patcher = /sdk-patcher/
let regExp_patcher_version = /v[0-9]+/
function patcher_dir_move(item_path){
	if (regExp_patcher.test(item_path)) {
		// console.log('tools', item_path)
		let sub_name = fs.readdirSync(item_path)[0]
		if (sub_name) {
			// console.log(sub_name);
			let version_path = path.join(item_path, sub_name, "source.properties")
			let buffer = String(fs.readFileSync(version_path));
			let match = buffer.match(regExp_patcher_version);
			if (match && match.length > 0){
				let version = match[0]
				let source_dir_path__ = path.join(item_path, sub_name)
				let target_dir_path = path.join(storage_sdk_path, patcher, version)
				// console.log(source_dir_path__);
				// console.log(target_dir_path)
				
				fse.moveSync(source_dir_path__, target_dir_path, {overwrite: true})
				console.log(`${patcher} ${source_dir_path__} 文件夹移动完成`)
				fs.rmdirSync(item_path)
			}
		}
	}
}
//===================================================================
//===================================================================
//===================================================================
//===================================================================
function move_extract_folder(item_path) {
	
	build_tools_dir_move(item_path);
	platform_dir_move(item_path)
	sources_dir_move(item_path)
	tools_dir_move(item_path)
	emulator_dir_move(item_path)
	patcher_dir_move(item_path)
	system_images_dir_move(item_path)
}

module.exports = move_extract_folder
