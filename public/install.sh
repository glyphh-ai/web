#!/bin/sh
# rrotor on one machine, with HTTPS: the public image ghcr.io/glyphh-ai/rrotor and Caddy in front of it.
#
#   curl -fsSL https://glyphh.ai/install.sh | \
#     RROTOR_RUNTIME_ID=... RROTOR_RUNTIME_TOKEN=... RROTOR_PUBLIC_HOST=rrotor.example.com sh
#
# The platform (https://platform.glyphh.ai, Runtimes, Add a runtime) shows this line filled in when you register a runtime.
# Point the host's DNS at this machine first, so Caddy can get the certificate. Needs Docker with Compose.
# With RROTOR_PUBLIC_HOST=127.0.0.1 (or localhost, or an IP address) it runs on this computer instead: the image
# alone on port 7777, plain HTTP, no Compose; enough to try it with the SDKs.
# It writes ./rrotor (docker-compose.yml, Caddyfile, .env) and starts it. Run it again to update the settings.
# Docs: https://docs.glyphh.ai/docker-compose
set -eu

FILES="https://raw.githubusercontent.com/glyphh-ai/glyphh/main/deploy/compose"
DIR="${RROTOR_DIR:-rrotor}"

fail() { echo "rrotor: $*" >&2; exit 1; }

[ -n "${RROTOR_RUNTIME_ID:-}" ] || fail "set RROTOR_RUNTIME_ID (the platform gives it: Runtimes, Add a runtime)"
[ -n "${RROTOR_RUNTIME_TOKEN:-}" ] || fail "set RROTOR_RUNTIME_TOKEN (the platform gives it: Runtimes, Add a runtime)"
[ -n "${RROTOR_PUBLIC_HOST:-}" ] || fail "set RROTOR_PUBLIC_HOST, the host it answers at, such as rrotor.example.com"
command -v docker >/dev/null 2>&1 || fail "Docker is not installed: https://docs.docker.com/get-docker/"
docker info >/dev/null 2>&1 || fail "Docker is not running: start Docker Desktop (or the Docker service) and run this again"
command -v curl >/dev/null 2>&1 || fail "curl is not installed"

# On this computer (localhost, 127.0.0.1 or an IP address): no certificate can be had for it, so no Caddy and no
# Compose, just the image on port 7777. Claude's connector needs a public HTTPS host; the SDKs and REST work here.
case "$RROTOR_PUBLIC_HOST" in
  localhost | 127.* ) local_only=1; bind=127.0.0.1: ;;
  *.*[!0-9.:]* | *[!0-9.:]*.* ) local_only=0; bind= ;;
  # A name with no dot (my-mac) is this computer's too: no public certificate can be had for it.
  * ) local_only=1; bind= ;;
esac
if [ "$local_only" = 1 ]; then
  mkdir -p "$DIR"
  umask 077
  {
    echo "RROTOR_MODE=self"
    echo "RROTOR_RUNTIME_ID=$RROTOR_RUNTIME_ID"
    echo "RROTOR_RUNTIME_TOKEN=$RROTOR_RUNTIME_TOKEN"
    echo "RROTOR_PUBLIC_HOST=$RROTOR_PUBLIC_HOST"
    env | grep -E '^(GLYPHH_LICENSE_KEY|RROTOR_SERVER|RROTOR_DRAIN_[A-Z_]+|RROTOR_LOG_PAYLOADS|RROTOR_SERVER_LOGS|OTEL_[A-Z_]+)=' || true
  } > "$DIR/.env"
  docker rm -f rrotor >/dev/null 2>&1 || true
  docker run -d --name rrotor --restart unless-stopped \
    --security-opt seccomp=unconfined --security-opt apparmor=unconfined --security-opt systempaths=unconfined \
    --read-only --tmpfs /tmp:exec,mode=1777 -v rrotor-data:/data -p "${bind}7777:7777" \
    --env-file "$DIR/.env" "ghcr.io/glyphh-ai/rrotor:${RROTOR_VERSION:-latest}" >/dev/null
  echo
  echo "rrotor is starting on this computer at http://$RROTOR_PUBLIC_HOST:7777 (no HTTPS)."
  echo "  Check it:   curl http://$RROTOR_PUBLIC_HOST:7777/healthz"
  echo "  Your code:  GLYPHH_RUNTIME_URL=http://$RROTOR_PUBLIC_HOST:7777 and a runtime key from the platform's API Keys"
  echo "  Claude:     needs a public HTTPS host; run this on a server with a DNS name for that"
  echo "  Logs:       docker logs -f rrotor    Stop: docker rm -f rrotor"
  exit 0
fi

docker compose version >/dev/null 2>&1 || fail "Docker Compose is not installed. Install the Compose plugin (https://docs.docker.com/compose/install/linux/), or use Docker Desktop, then run this again"

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
