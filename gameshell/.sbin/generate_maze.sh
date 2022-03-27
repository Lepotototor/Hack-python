#!/bin/sh
export MISSION_DIR="$GSH_ROOT/missions/finding_files_maze/00_shared"
export TEXTDOMAIN="finding_files_maze,00_shared"
exec "/home/lepotototor/Téléchargements/gameshell/missions/finding_files_maze/00_shared/sbin/generate_maze.sh" "$@"
