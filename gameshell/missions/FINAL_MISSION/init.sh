#!/bin/sh

if [ "$GSH_MODE" = DEBUG ]
then
  color_echo green "$(eval_gettext "CONGRATULATION, you've finished the game!")"
  echo
  gsh stat
  gsh exit
else
  parchment -B Twinkle "$(eval_gettext '$MISSION_DIR/msg/en.txt')"
fi
