mod types;
mod global;

use types::Config;

#[tauri::command]
async fn load_remote_config() -> Config {
    Config { voters: vec![] }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![load_remote_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
