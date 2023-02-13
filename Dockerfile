ARG BASE_IMAGE

FROM ${BASE_IMAGE} as builder
ARG BIN
ENV BIN ${BIN}
COPY . .
RUN cargo install --locked --path "$BIN"

FROM ubuntu:latest
ARG BIN
ENV BIN ${BIN}
ENV PORT 8080
ENV HOST 0.0.0.0
COPY --from=builder /usr/local/cargo/bin/$BIN /usr/local/$BIN
CMD $BIN