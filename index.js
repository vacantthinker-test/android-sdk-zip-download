const {create_sdk_sub_folder, unzip_and_move_folder} = require("./second");

// 请安装7z 并且添加7z文件夹至用户环境变量PATH中

// =========================================================

// 创建存放Android sdk的文件夹
// 如果想修改 请在second.js 第20行 storage_sdk_path 变量 修改这个
create_sdk_sub_folder();
// 解压缩 && 移动文件夹
unzip_and_move_folder();
