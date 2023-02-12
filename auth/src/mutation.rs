use crate::auth::Auth;
use crate::jwt::JWT;
use async_graphql::*;
use secrecy::{ExposeSecret, Secret};

pub struct Mutation;

#[Object]
impl Mutation {
    async fn login(&self, username: String, password: Secret<String>) -> Auth {
        let exposed = password.expose_secret();
        Auth {
            token: JWT(format!("{username}:{exposed}")),
        }
    }
}
