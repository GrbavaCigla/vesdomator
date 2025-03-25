use serde::{Deserialize, Serialize};

const fn _false() -> bool {
    false
}

const fn _none() -> Option<String> {
    None
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Faculty {
    pub name: String,

    #[serde(default = "_none")]
    pub short: Option<String>,

    #[serde(default = "_false")]
    pub ubg: bool,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum FacultyOrString {
    Faculty(Faculty),
    String(String)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    pub voters: Vec<FacultyOrString>,
}
