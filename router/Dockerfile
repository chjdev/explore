FROM ghcr.io/apollographql/router:v1.10.3
COPY router_wrapper_with_secrets.sh /dist/router_wrapper_with_secrets.sh
COPY router.yaml /dist/config/router.yaml
ENTRYPOINT ["/dist/router_wrapper_with_secrets.sh"]