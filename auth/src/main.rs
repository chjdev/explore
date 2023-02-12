use crate::jwt::JWT;
use crate::mutation::Mutation;
use crate::query::Query;
use actix_web::{get, post, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use async_graphql::extensions::Tracing;
use async_graphql::EmptySubscription;
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

pub mod auth;
pub mod jwt;
pub mod mutation;
pub mod query;

pub type Schema = async_graphql::Schema<Query, Mutation, EmptySubscription>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let schema = Schema::build(Query, Mutation, EmptySubscription)
        .extension(Tracing)
        .enable_federation()
        .finish();

    let port = std::env::var("PORT").unwrap();
    let host = std::env::var("HOST").unwrap();
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(schema.clone()))
            .service(index)
            .service(graphql)
    })
    .bind(format!("{host}:{port}"))?
    .run()
    .await
}

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok()
}

#[post("/")]
async fn graphql(
    schema: web::Data<Schema>,
    req: HttpRequest,
    gql_request: GraphQLRequest,
) -> GraphQLResponse {
    let mut request = gql_request.into_inner();
    let maybe_token = req
        .headers()
        .get("Authorization")
        .and_then(|value| value.to_str().map(|s| JWT(s.to_string())).ok());
    if let Some(token) = maybe_token {
        request = request.data(token);
    }
    schema.execute(request).await.into()
}
