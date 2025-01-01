# View latest logs in real time
tail -f combined.log

# View last 100 logs
tail -n 100 combined.log

# Search for specific logs
grep "error" combined.log
