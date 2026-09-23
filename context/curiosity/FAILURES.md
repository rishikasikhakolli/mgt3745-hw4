# FAILURES.md

The most honest file in any repository and the rarest. What went wrong,
what the agent got wrong, what you almost shipped. Copilot offering
string-concatenated SQL is a fine first entry. Optional.

* Matched local photo/location-name data to server entries by array position instead of by id. Worked in casual testing, then photos/names started showing on the wrong review card. Fixed by keying on the server's actual entry id instead.
