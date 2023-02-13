ARG BASE_IMAGE
ARG BIN

FROM ${BASE_IMAGE} as builder
ENV BIN ${BIN}
COPY . .
RUN cargo install --locked --path $BIN

FROM ubuntu:latest
ENV BIN ${BIN}
ENV PORT 8080
ENV HOST 0.0.0.0
COPY --from=builder ~/.cargo/bin /usr/local/bin
CMD $BIN