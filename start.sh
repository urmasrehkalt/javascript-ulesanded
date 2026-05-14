#!/usr/bin/env bash
set -euo pipefail

PORT=8001
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$ROOT_DIR/.server.pid"
LOG_FILE="$ROOT_DIR/.server.log"

if [[ -f "$PID_FILE" ]]; then
  OLD_PID="$(<"$PID_FILE")"

  if [[ -n "$OLD_PID" ]] && kill -0 "$OLD_PID" 2>/dev/null; then
    printf 'Stopping existing server on port %s (PID %s)...\n' "$PORT" "$OLD_PID"
    kill "$OLD_PID"

    for _ in {1..20}; do
      if ! kill -0 "$OLD_PID" 2>/dev/null; then
        break
      fi
      sleep 0.1
    done
  fi
fi

printf 'Starting server at http://localhost:%s ...\n' "$PORT"
cd "$ROOT_DIR"
python3 -m http.server "$PORT" >"$LOG_FILE" 2>&1 &
NEW_PID=$!
printf '%s\n' "$NEW_PID" >"$PID_FILE"

sleep 0.3

if ! kill -0 "$NEW_PID" 2>/dev/null; then
  printf 'Server failed to start. Check %s\n' "$LOG_FILE" >&2
  exit 1
fi

printf 'Server running in background. PID: %s\n' "$NEW_PID"
printf 'Log file: %s\n' "$LOG_FILE"
