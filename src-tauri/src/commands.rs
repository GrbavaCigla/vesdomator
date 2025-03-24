use tauri_plugin_http::reqwest;

use crate::global::{FALLBACK_CONFIG, REMOTE_CONFIG_URI};
use crate::types::Config;

#[tauri::command]
pub async fn load_config() -> Config {
    let res = match reqwest::get(REMOTE_CONFIG_URI).await {
        Ok(c) => match c.text().await {
            Ok(cont) => cont,
            Err(_) => FALLBACK_CONFIG.to_string(),
        },
        Err(_) => FALLBACK_CONFIG.to_string(),
    };

    toml::from_str(&res).unwrap()
}
