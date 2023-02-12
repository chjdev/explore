use crate::auth::Auth;
use crate::jwt::JWT;
use async_graphql::*;

pub struct Query;

#[Object]
impl Query {
    async fn auth(&self, ctx: &Context<'_>) -> Result<Auth> {
        let token = ctx.data::<JWT>()?.clone();
        Ok(Auth { token })
    }
}
