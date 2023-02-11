use async_graphql::scalar;
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize)]
#[serde(transparent)]
pub struct JWT(pub String);

scalar!(JWT);
