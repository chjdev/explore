use crate::jwt::JWT;
use async_graphql::*;

#[derive(SimpleObject)]
pub struct Auth {
    pub token: JWT,
}
