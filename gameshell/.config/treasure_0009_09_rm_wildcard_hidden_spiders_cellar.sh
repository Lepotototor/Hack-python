export TEXTDOMAIN="basic,09_rm_wildcard_hidden_spiders_cellar"
#!/bin/sh

# NOTE: --literal doesn't exist in freebsd
if ls --literal / >/dev/null 2>/dev/null
then
    alias ls='ls --literal -p'
else
    alias ls='ls -p'
fi
export TEXTDOMAIN=gsh
