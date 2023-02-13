FROM lukemathwalker/cargo-chef:latest-rust-latest AS chef
WORKDIR app
# additional tools
RUN rustup install nightly
RUN cargo install cargo-udeps --locked

FROM chef AS planner
COPY . .
# plan cache
RUN cargo chef prepare --recipe-path recipe.json

FROM chef
# build cache
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
