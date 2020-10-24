echo fetching lavalink version...
version=$(cat $(pwd)/lavalink/version)

if [[ $(ls $(pwd)/lavalink/lavalink.jar) ]]
then
  echo installed lavalink v$version
else
  echo installing lavalink v$version
  wget https://github.com/Frederikam/Lavalink/releases/download/$version/Lavalink.jar -O $(pwd)/lavalink/lavalink.jar
fi
