#!/bin/sh
# rrotor on one machine, with HTTPS: the public image ghcr.io/glyphh-ai/rrotor and Caddy in front of it.
#
#   curl -fsSL https://glyphh.ai/install.sh | \
#     RROTOR_RUNTIME_ID=... RROTOR_RUNTIME_TOKEN=... RROTOR_PUBLIC_HOST=rrotor.example.com sh
#
# The platform (https://platform.glyphh.ai, Getting started) shows this line filled in when you register a runtime.
# Point the host's DNS at this machine first, so Caddy can get the certificate. Needs Docker with Compose.
# It writes ./rrotor (docker-compose.yml, Caddyfile, .env) and starts it. Run it again to update the settings.
# Docs: https://docs.glyphh.ai/docker-compose
set -eu

FILES="https://raw.githubusercontent.com/glyphh-ai/glyphh/main/deploy/compose"
DIR="${RROTOR_DIR:-rrotor}"

fail() { echo "rrotor: $*" >&2; exit 1; }

[ -n "${RROTOR_RUNTIME_ID:-}" ] || fail "set RROTOR_RUNTIME_ID (the platform's Getting started gives it)"
[ -n "${RROTOR_RUNTIME_TOKEN:-}" ] || fail "set RROTOR_RUNTIME_TOKEN (the platform's Getting started gives it)"
[ -n "${RROTOR_PUBLIC_HOST:-}" ] || fail "set RROTOR_PUBLIC_HOST, the host it answers at, such as rrotor.example.com"
command -v docker >/dev/null 2>&1 || fail "Docker is not installed: https://docs.docker.com/engine/install/"
docker compose version >/dev/null 2>&1 || fail "Docker Compose is not installed: https://docs.docker.com/compose/install/"
command -v curl >/dev/null 2>&1 || fail "curl is not installed"

# The size: small 1 CPU and 1g, medium 2 and 4g, large 2 and 8g.
case "${RROTOR_SIZE:-small}" in
  small) cpus=1; memory=1g ;;
  medium) cpus=2; memory=4g ;;
  large) cpus=2; memory=8g ;;
  *) fail "RROTOR_SIZE is small, medium or large" ;;
esac

mkdir -p "$DIR"
cd "$DIR"
curl -fsSL "$FILES/docker-compose.yml" -o docker-compose.yml
curl -fsSL "$FILES/Caddyfile" -o Caddyfile

umask 077
{
  echo "RROTOR_RUNTIME_ID=$RROTOR_RUNTIME_ID"
  echo "RROTOR_RUNTIME_TOKEN=$RROTOR_RUNTIME_TOKEN"
  echo "RROTOR_PUBLIC_HOST=$RROTOR_PUBLIC_HOST"
  echo "RROTOR_VERSION=${RROTOR_VERSION:-latest}"
  echo "RROTOR_CPUS=${RROTOR_CPUS:-$cpus}"
  echo "RROTOR_MEMORY=${RROTOR_MEMORY:-$memory}"
  # Anything else set for rrotor, such as a licence key for an air-gapped node or an OpenTelemetry drain.
  env | grep -E '^(GLYPHH_LICENSE_KEY|RROTOR_SERVER|RROTOR_DRAIN_[A-Z_]+|RROTOR_LOG_PAYLOADS|RROTOR_SERVER_LOGS|RROTOR_AUDIT_[A-Z_]+|OTEL_[A-Z_]+)=' || true
} > .env

docker compose pull --quiet
docker compose up -d

echo
echo "rrotor is starting at https://$RROTOR_PUBLIC_HOST (in $(pwd))."
echo "  Check it:        curl https://$RROTOR_PUBLIC_HOST/healthz"
echo "  Connect Claude:  https://$RROTOR_PUBLIC_HOST/mcp as a custom connector"
echo "  Logs:            cd $(pwd) && docker compose logs -f rrotor"
