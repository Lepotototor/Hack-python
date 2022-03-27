#!/bin/sh
export MISSION_DIR="$GSH_ROOT/missions/pipes_merchant_stall/00_shared"
export TEXTDOMAIN="pipes_merchant_stall,00_shared"
exec "/home/lepotototor/Téléchargements/gameshell/missions/pipes_merchant_stall/00_shared/sbin/generate_merchant_stall.sh" "$@"
