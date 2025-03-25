use tauri_plugin_http::reqwest;

use crate::global::{FALLBACK_CONFIG, REMOTE_CONFIG_URI};
use crate::types::{Config, Faculty, FacultyOrString};

#[tauri::command]
pub async fn load_config() -> Config {
    let mut config: Config = match reqwest::get(REMOTE_CONFIG_URI).await {
        Ok(c) => match c.text().await {
            Ok(cont) => match toml::from_str(&cont) {
                Ok(conf) => conf,
                Err(_) => toml::from_str(FALLBACK_CONFIG).unwrap()
            },
            Err(_) => toml::from_str(FALLBACK_CONFIG).unwrap(),
        },
        Err(_) => toml::from_str(FALLBACK_CONFIG).unwrap(),
    };

    for voter in config.voters.iter_mut() {
        if let FacultyOrString::String(name) = voter {
            *voter = FacultyOrString::Faculty(Faculty {
                name: name.to_owned(),
                short: None,
                ubg: false
            })
        }
    }

    config
}
